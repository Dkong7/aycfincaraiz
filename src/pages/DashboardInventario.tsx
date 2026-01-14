import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../api"; 
import { LayoutGrid, PlusCircle, LogOut, Edit, Trash, Star, Crown, Zap, BookOpen, Users, Menu, X, AlertCircle, FilePlus } from "lucide-react";
import CreatePropertyForm from "../components/dashboard/CreatePropertyForm";
import SmartModal, { ModalConfig } from "../components/ui/SmartModal"; 

// IMPORTAMOS LA CONFIGURACIÓN DE COLORES
import { PROPERTY_TYPES_THEME, getFieldIcon } from "../config/propertyConfig";
import { formatCurrency } from "../utils/formatters";

export default function DashboardInventario() {
  const [view, setView] = useState("INVENTORY");
  const [editingProp, setEditingProp] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // DETECCIÓN DE TEMA
  const storedTheme = localStorage.getItem("ayc_theme") || "agent";
  const modalTheme = storedTheme.includes("claudia") ? "pink" : "blue";

  // ESTADO MODAL
  const [modalState, setModalState] = useState<{ isOpen: boolean; config: ModalConfig }>({
    isOpen: false,
    config: { type: 'info', title: '', msg: '' }
  });
  
  const navigate = useNavigate();
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";
  const currentUser = pb.authStore.model;
  const isManager = ["Alfonso", "Claudia", "admin"].includes(currentUser?.role || "");

  // HELPER MODAL
  const showModal = (config: ModalConfig) => {
      setModalState({
          isOpen: true,
          config: { ...config, theme: modalTheme }
      });
  };

  // --- LÓGICA HERO (FIFO) ---
  const heroItems = properties
      .filter(p => p.is_hero)
      .sort((a, b) => new Date(a.updated).getTime() - new Date(b.updated).getTime());

  const getHeroIndex = (id: string) => {
    const index = heroItems.findIndex(h => h.id === id);
    return index !== -1 ? index + 1 : null;
  };

  // --- CONTADORES ---
  const counts = {
      hero: heroItems.length,
      reina: properties.filter(p => p.is_opportunity).length,
      fav: properties.filter(p => p.is_ayc_favorite).length
  };

  const remaining = {
      hero: Math.max(0, 5 - counts.hero),
      reina: Math.max(0, 1 - counts.reina),
      fav: Math.max(0, 10 - counts.fav)
  };

  // --- ESTILOS ---
  const s = ((t) => {
      if (t === "claudia") return { mainBg: "bg-[#FFF0F5]", sidebar: "bg-white border-pink-100", sidebarText: "text-pink-600", activeBtn: "bg-pink-100 text-pink-700", tableHeader: "bg-pink-50 text-pink-400" };
      if (t === "alfonso") return { mainBg: "bg-[#F4F1EA]", sidebar: "bg-[#1F1612] border-[#3E2C20]", sidebarText: "text-[#E8DCCA]", activeBtn: "bg-[#3E2C20] text-[#D97706] shadow-inner", tableHeader: "bg-[#261C16] text-[#E8DCCA]" };
      return { mainBg: "bg-gray-100", sidebar: "bg-[#0A192F] border-white/10", sidebarText: "text-gray-300", activeBtn: "bg-[#009B4D] text-white shadow-lg", tableHeader: "bg-[#0A192F] text-gray-400" };
  })(storedTheme);

  useEffect(() => { loadInventory(); }, []);

  const loadInventory = async () => {
    try {
       setIsLoading(true);
       const res = await pb.collection("properties").getList(1, 100, { sort: "-created" });
       
       // ORDENAMIENTO PERSONALIZADO: Borradores arriba
       const sorted = res.items.sort((a, b) => {
           const isDraftA = a.status === 'borrador' || !a.title ? 1 : 0;
           const isDraftB = b.status === 'borrador' || !b.title ? 1 : 0;
           
           if (isDraftA !== isDraftB) return isDraftB - isDraftA;
           return new Date(b.created).getTime() - new Date(a.created).getTime();
       });

       setProperties(sorted);
    } catch (e) { console.error(e); } finally { setIsLoading(false); }
  };

  // --- CORRECCIÓN: YA NO CREA NADA EN DB, SOLO ABRE EL FORM ---
  const handleOpenNewForm = () => {
      setEditingProp(null); // Limpiamos para que sea un formulario nuevo
      setView("NEW");
      setIsMobileMenuOpen(false);
  };

  const handleEdit = (prop: any) => { 
      setEditingProp(prop); 
      setView("NEW"); 
      setIsMobileMenuOpen(false); 
  };

  const confirmDelete = (id: string) => {
      showModal({
          type: 'confirm',
          title: "¿Eliminar?",
          msg: "El borrador o inmueble desaparecerá permanentemente.",
          onConfirm: () => handleDelete(id)
      });
  };

  const handleDelete = async (id: string) => {
      try {
          await pb.collection("properties").delete(id);
          setProperties(prev => prev.filter(p => p.id !== id));
          if(editingProp?.id === id) {
              setEditingProp(null);
              setView("INVENTORY");
          }
          showModal({ type: 'success', title: "Eliminado", msg: "Registro borrado." });
      } catch(e:any) {
          showModal({ type: 'error', title: "Error", msg: "No se pudo eliminar." });
      }
  };

  const toggle = async (id: string, field: string, currentVal: boolean) => {
      if (!currentVal) {
        if (field === "is_opportunity" && remaining.reina <= 0) return showModal({ type: 'error', title: "Límite Reina", msg: "Solo 1 Reina permitida." });
        if (field === "is_hero" && remaining.hero <= 0) return showModal({ type: 'error', title: "Límite Hero", msg: "Carrusel lleno (Max 5)." });
        if (field === "is_ayc_favorite" && remaining.fav <= 0) return showModal({ type: 'error', title: "Límite Favoritos", msg: "Máximo 10 favoritos." });
      }

      try {
        await pb.collection("properties").update(id, { [field]: !currentVal });
        await loadInventory(); 
      } catch (e) {
        showModal({ type: 'error', title: "Error", msg: "No se pudo actualizar." });
      }
  };

  const handleLogout = () => {
      pb.authStore.clear();
      localStorage.removeItem("ayc_theme");
      navigate("/agentes");
  };

  const handleNavClick = (viewName: string) => {
      if (viewName === "NEW") {
          handleOpenNewForm(); // Usamos la nueva función que NO crea borradores
      } else {
          setView(viewName);
          setEditingProp(null);
          loadInventory(); 
      }
      setIsMobileMenuOpen(false);
  };

  const handleSuccessSave = () => {
      showModal({ type: 'success', title: "Guardado", msg: "Propiedad publicada exitosamente." });
      // Volvemos al inventario para ver el nuevo item creado
      setView("INVENTORY");
      setEditingProp(null);
      loadInventory(); 
  };

  return (
    <div className={`flex flex-col md:flex-row font-sans transition-colors duration-500 ${s.mainBg} min-h-screen md:h-screen md:overflow-hidden`}>
      
      <SmartModal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        config={modalState.config}
      />

      {/* HEADER MÓVIL */}
      <header className={`md:hidden flex justify-between items-center p-4 border-b transition-colors duration-500 bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50`}>
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-black text-xs">AYC</div>
             <h1 className="font-black text-lg tracking-tighter text-[#0A192F]">DASHBOARD</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#0A192F] p-2 hover:bg-gray-100 rounded-lg transition-colors">
             <Menu size={24} />
          </button>
      </header>

      {/* BACKDROP */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-[60] md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>}

      {/* SIDEBAR */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-[70] w-72 md:w-64 flex flex-col py-6 border-r shadow-2xl md:shadow-none transition-transform duration-300 ease-out transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${s.sidebar}`}>
         <div className="md:hidden absolute top-4 right-4">
            <button onClick={() => setIsMobileMenuOpen(false)} className={`${s.sidebarText} opacity-70 hover:opacity-100 p-2`}><X size={24}/></button>
         </div>
         <div className="px-6 mb-8 mt-2 md:mt-0">
            <h1 className={`font-black text-2xl tracking-tighter ${s.sidebarText}`}>AYC PANEL</h1>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1 text-gray-400">{storedTheme}</p>
         </div>
         <nav className="px-3 space-y-2 flex-1">
            <button onClick={() => handleNavClick("INVENTORY")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${view === "INVENTORY" ? s.activeBtn : `hover:opacity-80 ${s.sidebarText}`}`}>
               <LayoutGrid size={18}/> Inventario
            </button>
            
            {/* BOTÓN NUEVO CORREGIDO */}
            <button onClick={() => handleOpenNewForm()} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${view === "NEW" ? s.activeBtn : `hover:opacity-80 ${s.sidebarText}`}`}>
               <PlusCircle size={18}/> 
               {editingProp ? "Editando..." : "Nuevo Inmueble"}
            </button>

            <button onClick={() => { navigate("/dashboard/blog"); setIsMobileMenuOpen(false); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}>
               <BookOpen size={18}/> Blog / Noticias
            </button>
            {isManager && (
                <button onClick={() => { navigate("/dashboard/equipo"); setIsMobileMenuOpen(false); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}>
                   <Users size={18}/> Gestión de Equipo
                </button>
            )}
         </nav>
         <div className="px-6 mt-auto">
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors w-full p-4 bg-red-50 md:bg-transparent rounded-xl justify-center md:justify-start">
                <LogOut size={16}/> CERRAR SESIÓN
            </button>
         </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 w-full relative z-0 md:overflow-y-auto">
         {view === "INVENTORY" ? (
            <div className="bg-white md:rounded-xl shadow-none md:shadow-lg border-t md:border border-gray-100 overflow-hidden flex flex-col h-auto md:h-full -mx-4 md:mx-0 rounded-none">
               
               <div className="p-4 md:p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
                  <h2 className="font-black text-lg md:text-xl text-gray-800 uppercase flex items-center gap-2">
                      <LayoutGrid className="md:hidden" size={20}/> Inventario
                  </h2>
                  <div className="flex gap-2">
                      <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500">{properties.length} Props</span>
                      <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">{properties.filter(p => p.status === 'borrador').length} Borradores</span>
                  </div>
               </div>
               
               <div className="flex-1 bg-gray-50 md:bg-white p-4 md:p-0 overflow-y-auto">
                  {/* TABLA DESKTOP */}
                  <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                         <thead className={`${s.tableHeader} text-[10px] font-bold uppercase transition-colors duration-500 sticky top-0 z-10 shadow-sm`}>
                            <tr>
                               <th className="p-4">Propiedad</th>
                               <th className="p-4 text-center">Tipo</th>
                               <th className="p-4 text-center">Estado</th>
                               <th className="p-4 text-center">Precio</th>
                               <th className={`p-4 text-center ${remaining.hero === 0 ? "text-red-400" : "text-blue-400"}`}>Hero ({remaining.hero})</th>
                               <th className={`p-4 text-center ${remaining.reina === 0 ? "text-red-400" : "text-yellow-400"}`}>Reina ({remaining.reina})</th>
                               <th className={`p-4 text-center ${remaining.fav === 0 ? "text-red-400" : "text-green-400"}`}>Fav ({remaining.fav})</th>
                               <th className="p-4 text-right">Acciones</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100 text-gray-600">
                            {properties.map((p) => {
                               const heroOrder = getHeroIndex(p.id); 
                               const themeConfig = PROPERTY_TYPES_THEME[p.property_type] || PROPERTY_TYPES_THEME["default"];
                               const isDraft = p.status === "borrador" || !p.title;

                               return (
                               <tr key={p.id} className={`hover:bg-gray-50 transition-colors ${isDraft ? "bg-yellow-50/60" : ""}`}>
                                  <td className="p-4 flex items-center gap-3">
                                     <div className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border relative ${isDraft ? "border-yellow-300 bg-yellow-100" : "border-gray-100 bg-gray-200"}`}>
                                        {p.images?.[0] ? (
                                            <img src={`${PB_URL}/api/files/${p.collectionId}/${p.id}/${p.images[0]}`} className={`w-full h-full object-cover ${isDraft ? "grayscale opacity-60" : ""}`}/>
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-[8px] font-bold"><AlertCircle size={14}/></div>
                                        )}
                                     </div>
                                     <div>
                                        <div className={`font-bold text-sm line-clamp-1 max-w-[200px] ${isDraft ? "text-yellow-800 italic" : "text-gray-800"}`}>
                                            {p.title || "Nuevo Borrador..."}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-mono">{p.ayc_id || "..."}</div>
                                     </div>
                                  </td>
                                  <td className="p-4 text-center">
                                     <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase whitespace-nowrap flex items-center justify-center gap-1 w-fit mx-auto ${themeConfig.bgLight} ${themeConfig.text} ${themeConfig.border}`}>
                                        {getFieldIcon(p.property_type)} {p.property_type || "N/A"}
                                     </span>
                                  </td>
                                  <td className="p-4 text-center">
                                     {isDraft ? (
                                         <span className="text-[10px] bg-yellow-200 border border-yellow-300 text-yellow-800 font-black px-2 py-1 rounded-full uppercase flex items-center justify-center gap-1 animate-pulse">
                                             <FilePlus size={10} /> Borrador
                                         </span>
                                     ) : (
                                         <span className="text-[10px] bg-green-100 border border-green-200 text-green-700 font-bold px-2 py-1 rounded-full uppercase flex items-center justify-center gap-1">
                                             <Zap size={10} /> Publicado
                                         </span>
                                     )}
                                  </td>
                                  <td className="p-4 text-center font-mono text-xs font-bold text-green-600">
                                     {p.price_cop ? formatCurrency(p.price_cop) : <span className="text-gray-400">--</span>}
                                  </td>
                                  <td className="p-4 text-center">
                                     <button onClick={() => toggle(p.id, "is_hero", p.is_hero)} disabled={isDraft} className={`relative flex items-center justify-center mx-auto w-10 h-10 rounded-full transition-all ${isDraft ? "opacity-20 cursor-not-allowed" : p.is_hero ? "bg-blue-100 ring-2 ring-blue-300 scale-110 shadow-sm" : "hover:bg-gray-100 text-gray-300"}`}>
                                        {p.is_hero ? <><Zap size={24} className="text-blue-300 absolute" fill="currentColor"/><span className="relative z-10 text-sm font-black text-blue-900">{heroOrder}</span></> : <Zap size={20}/>}
                                     </button>
                                  </td>
                                  <td className="p-4 text-center">
                                     <button onClick={() => toggle(p.id, "is_opportunity", p.is_opportunity)} disabled={isDraft} className={`p-1.5 rounded-full transition-all ${isDraft ? "opacity-20 cursor-not-allowed" : p.is_opportunity ? "bg-yellow-100 text-yellow-500 ring-2 ring-yellow-200 shadow-lg scale-110" : "text-gray-300 hover:bg-gray-100"}`}><Crown size={16} fill={p.is_opportunity ? "currentColor" : "none"}/></button>
                                  </td>
                                  <td className="p-4 text-center">
                                     <button onClick={() => toggle(p.id, "is_ayc_favorite", p.is_ayc_favorite)} disabled={isDraft} className={`p-1.5 rounded-full transition-all ${isDraft ? "opacity-20 cursor-not-allowed" : p.is_ayc_favorite ? "bg-green-100 text-green-500 ring-2 ring-green-200 scale-110" : "text-gray-300 hover:bg-gray-100"}`}><Star size={16} fill={p.is_ayc_favorite ? "currentColor" : "none"}/></button>
                                  </td>
                                  <td className="p-4 text-right flex justify-end gap-2">
                                     <button onClick={() => handleEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors" title={isDraft ? "Completar Borrador" : "Editar"}><Edit size={16}/></button>
                                     <button onClick={() => confirmDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors" title="Borrar para siempre"><Trash size={16}/></button>
                                  </td>
                               </tr>
                               );
                            })}
                         </tbody>
                      </table>
                  </div>
                  
                  {/* MOBILE CARDS */}
                  <div className="md:hidden space-y-4 pb-24">
                      {properties.map(p => {
                          const themeConfig = PROPERTY_TYPES_THEME[p.property_type] || PROPERTY_TYPES_THEME["default"];
                          const isDraft = p.status === "borrador" || !p.title;

                          return (
                            <div key={p.id} className={`rounded-2xl p-4 shadow-sm border relative ${isDraft ? "bg-yellow-50 border-yellow-200" : "bg-white border-gray-100"}`}>
                                <div className="flex gap-4">
                                   <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                                      {p.images?.[0] && <img src={`${PB_URL}/api/files/${p.collectionId}/${p.id}/${p.images[0]}`} className={`w-full h-full object-cover ${isDraft ? "grayscale opacity-50" : ""}`}/>}
                                   </div>
                                   <div>
                                        {isDraft && <span className="mb-1 inline-block text-[8px] bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded font-black uppercase">Borrador</span>}
                                        <span className={`block text-[10px] font-bold px-2 py-0.5 rounded w-fit ${themeConfig.bgLight} ${themeConfig.text}`}>{p.property_type || "N/A"}</span>
                                        <h3 className={`font-bold text-sm mt-1 ${isDraft ? "text-gray-400 italic" : ""}`}>{p.title || "Sin Título"}</h3>
                                        <p className="text-green-600 font-bold text-xs">{p.price_cop ? formatCurrency(p.price_cop) : "--"}</p>
                                   </div>
                                </div>
                                <div className="flex justify-end gap-2 mt-3 border-t pt-3">
                                    <button onClick={() => handleEdit(p)} className="text-xs font-bold text-blue-600 flex items-center gap-1"><Edit size={14}/> {isDraft ? "COMPLETAR" : "EDITAR"}</button>
                                    <button onClick={() => confirmDelete(p.id)} className="text-xs font-bold text-red-600 flex items-center gap-1"><Trash size={14}/> BORRAR</button>
                                </div>
                            </div>
                          )
                      })}
                  </div>

               </div>
            </div>
         ) : (
            <CreatePropertyForm 
                initialData={editingProp} 
                onSuccess={handleSuccessSave} 
            />
         )}
      </main>
    </div>
  );
}