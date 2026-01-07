import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../api"; 
import { LayoutGrid, PlusCircle, LogOut, Edit, Trash, Star, Crown, Zap, BookOpen, Users, AlertTriangle, Play } from "lucide-react";
import CreatePropertyForm from "../components/dashboard/CreatePropertyForm";

export default function DashboardInventario() {
  const [view, setView] = useState("INVENTORY");
  const [editingProp, setEditingProp] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [alertInfo, setAlertInfo] = useState<{show: boolean, title: string, msg: string} | null>(null);
  
  const navigate = useNavigate();
  const theme = localStorage.getItem("ayc_theme") || "agent";
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";
  const currentUser = pb.authStore.model;
  const isManager = ["Alfonso", "Claudia", "admin"].includes(currentUser?.role || "");

  // --- HELPER: Obtener ID de YouTube ---
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // --- CÁLCULO DE ÍNDICES HERO (1-5) ---
  const heroItems = properties.filter(p => p.is_hero);
  const getHeroIndex = (id: string) => {
    const index = heroItems.findIndex(h => h.id === id);
    return index !== -1 ? index + 1 : null;
  };

  // --- CÁLCULO DE CUPOS DISPONIBLES ---
  const counts = {
      hero: heroItems.length,
      reina: properties.filter(p => p.is_opportunity).length,
      fav: properties.filter(p => p.is_ayc_favorite).length
  };

  const limits = { hero: 5, reina: 1, fav: 10 };
  const remaining = {
      hero: Math.max(0, limits.hero - counts.hero),
      reina: Math.max(0, limits.reina - counts.reina),
      fav: Math.max(0, limits.fav - counts.fav)
  };

  const s = ((t) => {
      if (t === "claudia") return { mainBg: "bg-[#FFF0F5]", sidebar: "bg-white border-pink-100", sidebarText: "text-pink-600", activeBtn: "bg-pink-100 text-pink-700", tableHeader: "bg-pink-50 text-pink-400" };
      if (t === "alfonso") return { mainBg: "bg-[#F4F1EA]", sidebar: "bg-[#1F1612] border-[#3E2C20]", sidebarText: "text-[#E8DCCA]", activeBtn: "bg-[#3E2C20] text-[#D97706] shadow-inner", tableHeader: "bg-[#261C16] text-[#E8DCCA]" };
      return { mainBg: "bg-gray-100", sidebar: "bg-[#0A192F] border-white/10", sidebarText: "text-gray-300", activeBtn: "bg-[#009B4D] text-white shadow-lg", tableHeader: "bg-[#0A192F] text-gray-400" };
  })(theme);

  useEffect(() => { loadInventory(); }, []);

  const loadInventory = async () => {
    try {
       const res = await pb.collection("properties").getList(1, 100, { sort: "-created" });
       setProperties(res.items);
    } catch (e) { console.error(e); }
  };

  const handleEdit = (prop: any) => { setEditingProp(prop); setView("NEW"); };

  const handleDelete = async (id: string) => {
      if(confirm("¿Eliminar definitivamente?")) {
        try {
            await pb.collection("properties").delete(id);
            setProperties(prev => prev.filter(p => p.id !== id));
        } catch(e:any) {
            setAlertInfo({ show: true, title: "Error", msg: "No tienes permiso para eliminar este inmueble." });
        }
      }
  };

  const toggle = async (id: string, field: string, currentVal: boolean) => {
      if (!currentVal) {
        if (field === "is_opportunity" && remaining.reina <= 0) {
            return setAlertInfo({ show: true, title: "Límite Alcanzado", msg: "Solo puede existir 1 Reina (Corona Dorada)." });
        }
        if (field === "is_hero" && remaining.hero <= 0) {
            return setAlertInfo({ show: true, title: "Límite Alcanzado", msg: "Solo 5 inmuebles pueden estar en el Hero." });
        }
        if (field === "is_ayc_favorite" && remaining.fav <= 0) {
            return setAlertInfo({ show: true, title: "Límite Alcanzado", msg: "Solo 10 inmuebles pueden ser Favoritos." });
        }
      }

      try {
        await pb.collection("properties").update(id, { [field]: !currentVal });
        const updatedList = properties.map(p => p.id === id ? { ...p, [field]: !currentVal } : p);
        setProperties(updatedList);
      } catch (e) {
        setAlertInfo({ show: true, title: "Error", msg: "No se pudo actualizar." });
      }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Casa': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Apartamento': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Bodega': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Lote': return 'bg-gray-200 text-gray-700 border-gray-300';
      case 'Terreno': return 'bg-gray-200 text-gray-700 border-gray-300';
      case 'Finca': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Rural': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Oficina': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Local': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-500 border-gray-200';
    }
  };

  const handleLogout = () => {
      pb.authStore.clear();
      localStorage.removeItem("ayc_theme");
      navigate("/agentes");
  };

  return (
    <div className={`fixed inset-0 z-[100] flex font-sans transition-colors duration-500 ${s.mainBg}`}>
      
      {/* SIDEBAR */}
      <aside className={`w-64 flex flex-col py-6 border-r transition-colors duration-500 ${s.sidebar}`}>
         <div className="px-6 mb-10">
            <h1 className={`font-black text-2xl tracking-tighter ${s.sidebarText}`}>DASHBOARD</h1>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1 text-gray-400">{theme}</p>
         </div>
         <nav className="px-3 space-y-1 flex-1">
            <button onClick={() => { setView("INVENTORY"); setEditingProp(null); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${view === "INVENTORY" ? s.activeBtn : `hover:opacity-80 ${s.sidebarText}`}`}>
               <LayoutGrid size={18}/> Inventario
            </button>
            <button onClick={() => { setView("NEW"); setEditingProp(null); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${view === "NEW" ? s.activeBtn : `hover:opacity-80 ${s.sidebarText}`}`}>
               <PlusCircle size={18}/> {editingProp ? "Editando..." : "Nuevo Inmueble"}
            </button>
            <button onClick={() => navigate("/dashboard/blog")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}>
               <BookOpen size={18}/> Blog / Noticias
            </button>
            <div className="h-px bg-white/10 my-2 mx-4 opacity-50"></div>
            {isManager && (
                <button onClick={() => navigate("/dashboard/equipo")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}>
                   <Users size={18}/> Gestión de Equipo
                </button>
            )}
         </nav>
         <div className="px-6 mt-auto">
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors"><LogOut size={14}/> CERRAR SESIÓN</button>
         </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 overflow-y-auto">
         {view === "INVENTORY" ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
               <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-black text-xl text-gray-800 uppercase">Inventario Maestro</h2>
                  <span className="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-500">{properties.length} Items</span>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className={`${s.tableHeader} text-[10px] font-bold uppercase transition-colors duration-500`}>
                        <tr>
                           <th className="p-4">Propiedad</th>
                           <th className="p-4 text-center">Tipo</th>
                           <th className="p-4 text-center">Precio</th>
                           <th className={`p-4 text-center ${remaining.hero === 0 ? "text-red-400" : "text-blue-400"}`}>Hero ({remaining.hero} disp.)</th>
                           <th className={`p-4 text-center ${remaining.reina === 0 ? "text-red-400" : "text-yellow-400"}`}>Reina ({remaining.reina} disp.)</th>
                           <th className={`p-4 text-center ${remaining.fav === 0 ? "text-red-400" : "text-green-400"}`}>Fav ({remaining.fav} disp.)</th>
                           <th className="p-4 text-right">Acciones</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 text-gray-600">
                        {properties.map((p) => {
                           const heroOrder = getHeroIndex(p.id); 
                           const videoId = getYoutubeId(p.video_url); // Detectamos video

                           return (
                           <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 flex items-center gap-3">
                                 <div className="w-12 h-12 rounded bg-gray-200 overflow-hidden shrink-0 border border-gray-100 relative">
                                    {/* LÓGICA DE PORTADA: VIDEO PRIMERO, LUEGO FOTO */}
                                    {videoId ? (
                                        <>
                                            <img src={`https://img.youtube.com/vi/${videoId}/default.jpg`} className="w-full h-full object-cover"/>
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20"><Play size={16} className="text-white fill-white"/></div>
                                        </>
                                    ) : p.images?.[0] ? (
                                       <img src={`${PB_URL}/api/files/${p.collectionId}/${p.id}/${p.images[0]}`} className="w-full h-full object-cover"/>
                                    ) : (
                                       <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">N/A</div>
                                    )}
                                 </div>
                                 <div>
                                    <div className="font-bold text-sm text-gray-800 line-clamp-1 max-w-[200px]">{p.title}</div>
                                    <div className="text-[10px] text-gray-400 font-mono">{p.ayc_id}</div>
                                 </div>
                              </td>
                              <td className="p-4 text-center">
                                <span className={`px-2 py-1 rounded border text-[10px] font-bold uppercase whitespace-nowrap ${getTypeColor(p.property_type)}`}>{p.property_type}</span>
                              </td>
                              <td className="p-4 text-center font-mono text-xs font-bold text-green-600">
                                 {p.price_cop ? `$${Number(p.price_cop).toLocaleString("es-CO")}` : '$0'}
                              </td>
                              
                              <td className="p-4 text-center">
                                 <button 
                                    onClick={() => toggle(p.id, "is_hero", p.is_hero)} 
                                    className={`relative flex items-center justify-center mx-auto w-10 h-10 rounded-full transition-all ${p.is_hero ? "bg-blue-100 ring-2 ring-blue-300 scale-110 shadow-sm" : "hover:bg-gray-100"}`}
                                 >
                                    {p.is_hero ? (
                                        <>
                                            <Zap size={24} className="text-blue-300 absolute" fill="currentColor" strokeWidth={0} />
                                            <Zap size={24} className="text-blue-500 absolute opacity-50" />
                                            <span className="relative z-10 text-sm font-black text-blue-900 drop-shadow-sm">{heroOrder}</span>
                                        </>
                                    ) : (
                                        <Zap size={20} className="text-gray-300"/>
                                    )}
                                 </button>
                              </td>

                              <td className="p-4 text-center">
                                 <button onClick={() => toggle(p.id, "is_opportunity", p.is_opportunity)} className={`p-1.5 rounded-full transition-all ${p.is_opportunity ? "bg-yellow-100 text-yellow-500 ring-2 ring-yellow-200 shadow-lg scale-110" : "text-gray-300 hover:bg-gray-100"}`}><Crown size={16} fill={p.is_opportunity ? "currentColor" : "none"}/></button>
                              </td>
                              <td className="p-4 text-center">
                                 <button onClick={() => toggle(p.id, "is_ayc_favorite", p.is_ayc_favorite)} className={`p-1.5 rounded-full transition-all ${p.is_ayc_favorite ? "bg-green-100 text-green-600 ring-2 ring-green-200 scale-110" : "text-gray-300 hover:bg-gray-100"}`}><Star size={16} fill={p.is_ayc_favorite ? "currentColor" : "none"}/></button>
                              </td>
                              <td className="p-4 text-right flex justify-end gap-2">
                                 <button onClick={() => handleEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded transition-colors"><Edit size={16}/></button>
                                 <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"><Trash size={16}/></button>
                              </td>
                           </tr>
                        );
                        })}
                     </tbody>
                  </table>
               </div>
            </div>
         ) : (
            <CreatePropertyForm theme={theme} initialData={editingProp} onSuccess={() => { setView("INVENTORY"); loadInventory(); }} />
         )}
      </main>

      {alertInfo && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-300 scale-100">
                  <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500 shadow-inner"><AlertTriangle size={32} /></div>
                      <h3 className="text-xl font-black text-red-600 uppercase tracking-tight">{alertInfo.title}</h3>
                  </div>
                  <div className="p-8 text-center bg-white">
                      <p className="text-gray-600 font-medium text-base leading-relaxed">{alertInfo.msg}</p>
                      <button onClick={() => setAlertInfo(null)} className="mt-8 w-full py-4 bg-gray-900 text-white font-black rounded-xl hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-xs">ENTENDIDO</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}