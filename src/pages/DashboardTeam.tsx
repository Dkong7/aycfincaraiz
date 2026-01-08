import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { pb } from "../api";
import { 
  LayoutGrid, Users, Shield, PlusCircle, Trash, Edit, 
  Home, PenTool, Search, LogOut, ArrowLeft, Save, X, Lock, Menu, BookOpen
} from "lucide-react";

export default function DashboardTeam() {
  const navigate = useNavigate();
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Estado menú móvil
  
  // Stats en tiempo real
  const [stats, setStats] = useState<any>({});

  const { register, handleSubmit, reset, setValue } = useForm();
  
  const theme = localStorage.getItem("ayc_theme") || "agent";
  const currentUser = pb.authStore.model;
  
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

  // --- SEGURIDAD: SOLO ADMINS ---
  useEffect(() => {
    if (currentUser?.role !== "admin" && currentUser?.role !== "Alfonso" && currentUser?.role !== "Claudia") {
       alert("Acceso denegado. Zona exclusiva de Gerencia.");
       navigate("/dashboard/inventario");
    }
    loadTeam();
  }, []);

  // --- CARGAR EQUIPO Y MÉTRICAS ---
  const loadTeam = async () => {
    setLoading(true);
    try {
      const records = await pb.collection("users").getFullList({ sort: '-created' });
      setAgents(records);

      const newStats: any = {};
      
      await Promise.all(records.map(async (user) => {
          const props = await pb.collection("properties").getList(1, 1, { 
              filter: `agent = "${user.id}"`, 
              fields: 'id' 
          });
          
          const posts = await pb.collection("posts").getList(1, 1, { 
              filter: `agent = "${user.id}"`,
              fields: 'id'
          });

          newStats[user.id] = {
              properties: props.totalItems,
              posts: posts.totalItems
          };
      }));

      setStats(newStats);

    } catch (e) {
      console.error("Error cargando equipo", e);
    } finally {
      setLoading(false);
    }
  };

  // --- ESTILOS VISUALES (TEMA) ---
  const s = ((t) => {
      if (t === "alfonso") return { 
          mainBg: "bg-[#F4F1EA]", sidebar: "bg-[#2C1B18] border-[#3E2723]", sidebarText: "text-[#D7CCC8]", 
          activeBtn: "bg-[#3E2C20] text-[#FFB74D] border border-[#5D4037]", 
          card: "bg-[#FDFBF7] border-[#8D6E63] text-[#3E2723]", 
          btn: "bg-[#5D4037] hover:bg-[#3E2723] text-white"
      };
      if (t === "claudia") return {
          mainBg: "bg-[#FFF0F5]", sidebar: "bg-white border-pink-100", sidebarText: "text-pink-600",
          activeBtn: "bg-pink-100 text-pink-700",
          card: "bg-white border-pink-100 text-gray-800",
          btn: "bg-pink-600 hover:bg-pink-700 text-white"
      };
      return { mainBg: "bg-gray-100", sidebar: "bg-[#0A192F]", sidebarText: "text-white", activeBtn: "bg-blue-600", card: "bg-white", btn: "bg-blue-600 text-white" };
  })(theme);

  // --- ACCIONES ---
  const openModal = (agent?: any) => {
      setEditingAgent(agent || null);
      if(agent) {
          setValue("name", agent.name);
          setValue("email", agent.email);
          setValue("role", agent.role);
      } else {
          reset();
          setValue("role", "agent");
      }
      setShowModal(true);
      setIsMobileMenuOpen(false);
  };

  const onSaveAgent = async (data: any) => {
      try {
          const payload: any = {
              name: data.name,
              email: data.email,
              role: data.role,
          };

          if (data.password) {
              payload.password = data.password;
              payload.passwordConfirm = data.password;
          } else if (!editingAgent) {
              alert("La contraseña es obligatoria para nuevos agentes.");
              return;
          }

          if (editingAgent) {
              await pb.collection("users").update(editingAgent.id, payload);
          } else {
              await pb.collection("users").create(payload);
          }
          
          setShowModal(false);
          loadTeam();
      } catch (err: any) {
          alert("Error: " + err.message);
      }
  };

  const onDeleteAgent = async (id: string) => {
      if (confirm("¿Estás seguro? Esto no borrará sus inmuebles, pero perderán acceso.")) {
          try {
              await pb.collection("users").delete(id);
              loadTeam();
          } catch (error: any) {
              alert("Error al eliminar: " + error.message);
          }
      }
  };

  const handleLogout = () => {
      pb.authStore.clear();
      localStorage.removeItem("ayc_theme");
      navigate("/agentes");
  };

  return (
    <div className={`flex flex-col md:flex-row font-sans transition-colors duration-500 ${s.mainBg} min-h-screen md:h-screen md:overflow-hidden`}>
      
      {/* --- HEADER MÓVIL (Sticky) --- */}
      <header className={`md:hidden flex justify-between items-center p-4 border-b transition-colors duration-500 bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50`}>
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#0A192F] rounded flex items-center justify-center text-white font-black text-xs">AYC</div>
             <h1 className="font-black text-lg tracking-tighter text-[#0A192F]">EQUIPO</h1>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-[#0A192F] p-2 hover:bg-gray-100 rounded-lg transition-colors">
             <Menu size={24} />
          </button>
      </header>

      {/* --- BACKDROP MÓVIL --- */}
      {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-[60] md:hidden backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* --- SIDEBAR (DRAWER EN MOBILE) --- */}
      <aside className={`
          fixed md:relative inset-y-0 left-0 z-[70] 
          w-72 md:w-64 flex flex-col py-6 border-r shadow-2xl md:shadow-none
          transition-transform duration-300 ease-out transform 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          ${s.sidebar}
      `}>
         <div className="md:hidden absolute top-4 right-4">
            <button onClick={() => setIsMobileMenuOpen(false)} className={`${s.sidebarText} opacity-70 hover:opacity-100 p-2`}>
                <X size={24}/>
            </button>
         </div>

         <div className="px-6 mb-10 mt-2 md:mt-0">
            <h1 className={`font-black text-2xl tracking-tighter ${s.sidebarText}`}>AYC GESTIÓN</h1>
            <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1 text-gray-400">GERENCIA</p>
         </div>
         <nav className="px-3 space-y-1 flex-1">
            <button onClick={() => navigate("/dashboard/inventario")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}>
               <ArrowLeft size={18}/> Volver a Inventario
            </button>
            <div className="h-px bg-white/10 my-2 mx-4"></div>
            <button className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${s.activeBtn}`}>
               <Users size={18}/> Gestión de Equipo
            </button>
         </nav>

         <div className="px-6 mt-auto">
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors w-full p-4 bg-red-50 md:bg-transparent rounded-xl justify-center md:justify-start">
                <LogOut size={16}/> CERRAR SESIÓN
            </button>
         </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-4 md:p-8 w-full relative z-0 md:overflow-y-auto">
         
         <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
             <div>
                 <h2 className="text-2xl md:text-3xl font-black uppercase text-gray-800">Equipo de Agentes</h2>
                 <p className="text-gray-500 text-sm mt-1">Administra accesos y monitorea rendimiento.</p>
             </div>
             <button onClick={() => openModal()} className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-transform active:scale-95 ${s.btn}`}>
                 <PlusCircle size={20}/> NUEVO AGENTE
             </button>
         </div>

         {/* GRID DE AGENTES */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 md:pb-0">
             {agents.map(agent => (
                 <div key={agent.id} className={`p-6 rounded-2xl shadow-sm border relative group transition-all hover:shadow-md ${s.card}`}>
                     
                     {/* Badge de Rol */}
                     <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-1 rounded-full uppercase ${agent.role === 'admin' || agent.role === 'Alfonso' || agent.role === 'Claudia' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                         {agent.role === 'admin' ? 'Gerencia' : 'Agente'}
                     </span>

                     <div className="flex items-center gap-4 mb-6">
                         <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                             {agent.avatar ? (
                                 <img src={`${PB_URL}/api/files/${agent.collectionId}/${agent.id}/${agent.avatar}`} className="w-full h-full object-cover"/>
                             ) : (
                                 <Users size={24} className="opacity-30"/>
                             )}
                         </div>
                         <div className="min-w-0">
                             <h3 className="font-bold text-lg leading-tight truncate">{agent.name || "Sin Nombre"}</h3>
                             <p className="text-xs opacity-60 font-mono truncate">{agent.email}</p>
                         </div>
                     </div>

                     {/* MÉTRICAS */}
                     <div className="grid grid-cols-2 gap-4 mb-6">
                         <div className="bg-black/5 p-3 rounded-xl text-center">
                             <div className="flex items-center justify-center gap-1 text-gray-400 mb-1"><Home size={14}/><span className="text-[10px] font-bold uppercase">Inmuebles</span></div>
                             <span className="text-2xl font-black text-gray-800">{stats[agent.id]?.properties || 0}</span>
                         </div>
                         <div className="bg-black/5 p-3 rounded-xl text-center">
                             <div className="flex items-center justify-center gap-1 text-gray-400 mb-1"><PenTool size={14}/><span className="text-[10px] font-bold uppercase">Blogs</span></div>
                             <span className="text-2xl font-black text-gray-800">{stats[agent.id]?.posts || 0}</span>
                         </div>
                     </div>

                     {/* ACCIONES */}
                     <div className="flex gap-2">
                         <button onClick={() => openModal(agent)} className="flex-1 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors">
                             <Edit size={14}/> EDITAR
                         </button>
                         {currentUser?.id !== agent.id && (
                             <button onClick={() => onDeleteAgent(agent.id)} className="px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs transition-colors">
                                 <Trash size={14}/>
                             </button>
                         )}
                     </div>
                 </div>
             ))}
         </div>
      </main>

      {/* --- MODAL AGREGAR / EDITAR (FULLSCREEN EN MOBILE) --- */}
      {showModal && (
          <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-0 md:p-4 animate-in fade-in">
              <div className="bg-white w-full h-full md:h-auto md:max-w-md md:rounded-2xl shadow-2xl overflow-hidden flex flex-col md:block">
                  <div className="p-6 border-b flex justify-between items-center bg-gray-50 sticky top-0 z-10 md:static">
                      <h3 className="font-black text-lg uppercase text-gray-800">{editingAgent ? "Editar Perfil" : "Nuevo Agente"}</h3>
                      <button onClick={() => setShowModal(false)}><X className="text-gray-400 hover:text-red-500"/></button>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto md:overflow-visible p-6">
                      <form onSubmit={handleSubmit(onSaveAgent)} className="space-y-4">
                          <div>
                              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nombre Completo</label>
                              <input {...register("name", {required: true})} className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white outline-none focus:ring-2 ring-current transition-all" placeholder="Ej: Juan Pérez"/>
                          </div>

                          <div>
                              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Correo Electrónico</label>
                              <input {...register("email", {required: true})} type="email" className="w-full p-3 rounded-lg border bg-gray-50 focus:bg-white outline-none focus:ring-2 ring-current transition-all" placeholder="agente@ayc.com"/>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Rol</label>
                                  <select {...register("role")} className="w-full p-3 rounded-lg border bg-gray-50 outline-none">
                                      <option value="agent">Agente</option>
                                      <option value="admin">Administrador</option>
                                      <option value="Alfonso">Alfonso</option>
                                      <option value="Claudia">Claudia</option>
                                  </select>
                              </div>
                              <div className="relative">
                                  <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Contraseña</label>
                                  <div className="relative">
                                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                                    <input {...register("password")} type="password" className="w-full pl-9 p-3 rounded-lg border bg-gray-50 focus:bg-white outline-none" placeholder={editingAgent ? "******" : "Requerida"}/>
                                  </div>
                              </div>
                          </div>

                          {editingAgent && <p className="text-[10px] text-gray-400 text-center">* Dejar contraseña en blanco para no cambiarla.</p>}

                          <button className={`w-full py-4 rounded-xl font-bold text-white shadow-lg mt-4 ${s.btn}`}>
                              GUARDAR DATOS
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
}