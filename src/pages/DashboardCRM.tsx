import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../api";
import { 
  LayoutGrid, LogOut, BookOpen, Users, Menu, X, Map as MapIcon, 
  MessageCircle, Phone, Clock, Send, Calendar, Save, Trash2, ChevronLeft, ExternalLink
} from "lucide-react";
import SmartModal, { ModalConfig } from "../components/ui/SmartModal";

export default function DashboardCRM() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<any[]>([]);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [newNote, setNewNote] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [modalState, setModalState] = useState<{ isOpen: boolean; config: ModalConfig }>({
    isOpen: false, config: { type: 'info', title: '', msg: '' }
  });

  const currentUser = pb.authStore.model;
  const isManager = ["Alfonso", "Claudia", "admin"].includes(currentUser?.role || "");
  const storedTheme = localStorage.getItem("ayc_theme") || "agent";

  const showModal = (config: ModalConfig) => {
      setModalState({ isOpen: true, config: { ...config, theme: "blue" } });
  };

  const s = ((t) => {
      if (t === "claudia") return { mainBg: "bg-[#FFF0F5]", sidebar: "bg-white border-pink-100", sidebarText: "text-pink-600", activeBtn: "bg-pink-100 text-pink-700 shadow-inner", card: "bg-white border-pink-100" };
      if (t === "alfonso") return { mainBg: "bg-[#F4F1EA]", sidebar: "bg-[#1F1612] border-[#3E2C20]", sidebarText: "text-[#E8DCCA]", activeBtn: "bg-[#3E2C20] text-[#D97706] shadow-inner", card: "bg-[#FDFBF7] border-[#8D6E63]" };
      return { mainBg: "bg-gray-100", sidebar: "bg-[#0A192F] border-white/10", sidebarText: "text-gray-300", activeBtn: "bg-[#009B4D] text-white shadow-lg", card: "bg-white border-gray-200" };
  })(storedTheme);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const data = await pb.collection("leads").getFullList({ sort: "-updated" });
      setLeads(data);
    } catch (error) {
      console.error("Error cargando leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleLogout = () => { pb.authStore.clear(); localStorage.removeItem("ayc_theme"); navigate("/agentes"); };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await pb.collection("leads").update(id, { status: newStatus });
      fetchLeads();
      if (selectedLead?.id === id) setSelectedLead({ ...selectedLead, status: newStatus });
    } catch (error) { console.error(error); }
  };

  const confirmDeleteLead = (id: string) => {
      showModal({ 
          type: 'confirm', 
          title: "¿Eliminar Requerimiento?", 
          msg: "Esto borrará el contacto y toda su bitácora. No se puede deshacer.", 
          onConfirm: () => deleteLead(id) 
      });
  };

  const deleteLead = async (id: string) => {
      try {
          await pb.collection("leads").delete(id);
          setLeads(prev => prev.filter(l => l.id !== id));
          if(selectedLead?.id === id) setSelectedLead(null);
          showModal({ type: 'success', title: "Eliminado", msg: "Requerimiento borrado del sistema." });
      } catch(e:any) { 
          showModal({ type: 'error', title: "Error", msg: "No se pudo eliminar el requerimiento." }); 
      }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !selectedLead) return;
    try {
      const dateStr = new Date().toLocaleString("es-CO", { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' });
      const addedText = `\n[${dateStr}] ${currentUser?.name || 'Asesor'}: ${newNote}`;
      const updatedNotes = (selectedLead.notes || "") + addedText;
      
      await pb.collection("leads").update(selectedLead.id, { notes: updatedNotes });
      setNewNote("");
      fetchLeads();
      setSelectedLead({ ...selectedLead, notes: updatedNotes });
    } catch (error) {
      console.error("Error guardando nota:", error);
      showModal({ type: 'error', title: "Error", msg: "Asegúrate de que la colección 'leads' en PocketBase tenga el campo 'notes' de tipo texto." });
    }
  };

  const formatWhatsAppLink = (phone: string) => {
      const cleanNum = phone.replace(/\D/g, '');
      return `https://wa.me/${cleanNum}`;
  };

  return (
    <div className={`flex flex-col md:flex-row font-sans transition-colors duration-500 ${s.mainBg} min-h-screen md:h-screen md:overflow-hidden`}>
      <SmartModal isOpen={modalState.isOpen} onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))} config={modalState.config} />

      <header className={`md:hidden flex justify-between items-center p-4 border-b bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50`}>
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-black text-xs">CRM</div><h1 className="font-black text-lg text-[#0A192F]">REQUERIMIENTOS</h1></div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2"><Menu size={24} /></button>
      </header>

      <aside className={`fixed md:relative inset-y-0 left-0 z-[70] w-72 md:w-64 flex flex-col py-6 border-r transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${s.sidebar}`}>
         <div className="md:hidden absolute top-4 right-4"><button onClick={() => setIsMobileMenuOpen(false)} className={`${s.sidebarText}`}><X size={24}/></button></div>
         <div className="px-6 mb-8 mt-2 md:mt-0"><h1 className={`font-black text-2xl tracking-tighter ${s.sidebarText}`}>AYC PANEL</h1><p className="text-[10px] font-bold opacity-50 uppercase tracking-widest mt-1 text-gray-400">{storedTheme}</p></div>
         
         <nav className="px-3 space-y-2 flex-1">
            <button onClick={() => navigate("/dashboard/mapa")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><MapIcon size={18}/> Centro de Mando</button>
            <button className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${s.activeBtn}`}><MessageCircle size={18}/> Requerimientos</button>
            <button onClick={() => navigate("/dashboard/inventario")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><LayoutGrid size={18}/> Inventario</button>
            <button onClick={() => navigate("/dashboard/blog")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><BookOpen size={18}/> Blog</button>
            {isManager && (<button onClick={() => navigate("/dashboard/equipo")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><Users size={18}/> Equipo</button>)}
         </nav>
         
         <div className="px-6 mt-auto"><button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 w-full p-4 justify-center md:justify-start"><LogOut size={16}/> SALIR</button></div>
      </aside>

      <main className="flex-1 p-0 md:p-6 flex flex-col md:flex-row gap-0 md:gap-6 overflow-hidden h-[calc(100vh-64px)] md:h-full relative z-0">
          
          {/* BANDEJA (Oculta en móvil si hay un lead seleccionado) */}
          <div className={`w-full md:w-1/3 flex flex-col h-full md:rounded-2xl md:shadow-lg md:border overflow-hidden bg-white ${selectedLead ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
                  <h2 className="font-black text-lg uppercase text-gray-800">Inbox</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">{leads.length}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar bg-gray-50/30">
                  {isLoading ? <p className="text-center text-sm text-gray-400 mt-10">Cargando...</p> : leads.map(lead => (
                      <div 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className={`p-4 rounded-xl cursor-pointer border-b md:border transition-all ${selectedLead?.id === lead.id ? 'md:border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:bg-gray-50'}`}
                      >
                          <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-sm text-gray-800 truncate pr-2">{lead.name || "Sin nombre"}</h4>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${lead.status === 'calificado' ? 'bg-green-100 text-green-700' : lead.status === 'atendido' ? 'bg-blue-100 text-blue-700' : lead.status === 'descartado' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                  {lead.status || "NUEVO"}
                              </span>
                          </div>
                          <p className="text-xs text-gray-500 font-mono mb-2"><Phone size={10} className="inline mr-1"/>{lead.phone}</p>
                          <p className="text-xs text-gray-600 italic line-clamp-2">"{lead.intent_summary || "Sin requerimiento"}"</p>
                      </div>
                  ))}
              </div>
          </div>

          {/* DETALLE Y BITÁCORA */}
          <div className={`w-full md:w-2/3 flex flex-col h-full md:rounded-2xl md:shadow-lg md:border overflow-hidden bg-white ${!selectedLead ? 'hidden md:flex' : 'flex'}`}>
              {selectedLead ? (
                  <>
                      {/* Cabecera Responsiva */}
                      <div className="p-4 md:p-6 border-b bg-white flex flex-col gap-4 shadow-sm z-10">
                          <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                  <button onClick={() => setSelectedLead(null)} className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg"><ChevronLeft size={24}/></button>
                                  <div>
                                      <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase">{selectedLead.name || "Cliente Prospecto"}</h2>
                                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs md:text-sm text-gray-600 font-mono">
                                          <span className="flex items-center gap-1"><Phone size={14}/> {selectedLead.phone}</span>
                                          <span className="flex items-center gap-1 text-gray-400"><Calendar size={14}/> {new Date(selectedLead.created).toLocaleDateString()}</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 md:gap-3 items-center mt-2">
                              <select 
                                value={selectedLead.status || "nuevo"} 
                                onChange={(e) => updateStatus(selectedLead.id, e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold uppercase p-2 md:p-2.5 outline-none focus:ring-2 focus:ring-blue-500 flex-1 md:flex-none cursor-pointer"
                              >
                                  <option value="nuevo">🟠 Nuevo</option>
                                  <option value="atendido">🔵 Atendido</option>
                                  <option value="calificado">🟢 Calificado</option>
                                  <option value="descartado">🔴 Descartado</option>
                              </select>
                              
                              <a href={formatWhatsAppLink(selectedLead.phone)} target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-2 md:px-4 md:py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-green-600 transition-colors">
                                  <MessageCircle size={16}/> <span className="hidden md:inline">Contactar</span>
                              </a>

                              <button onClick={() => confirmDeleteLead(selectedLead.id)} className="bg-red-50 text-red-600 p-2 md:px-4 md:py-2.5 rounded-lg flex items-center justify-center gap-2 text-xs font-bold hover:bg-red-100 transition-colors md:ml-auto">
                                  <Trash2 size={16}/> <span className="hidden md:inline">Borrar</span>
                              </button>
                          </div>
                      </div>

                      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6 bg-gray-50/50">
                          
                          <div className="bg-blue-50/50 p-4 md:p-5 rounded-2xl border border-blue-100 shadow-sm">
                              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-800 mb-3 flex items-center gap-2"><MessageCircle size={14}/> Requerimiento Inicial</h3>
                              <p className="text-sm text-gray-700 font-medium whitespace-pre-wrap leading-relaxed">{selectedLead.intent_summary || "Sin datos."}</p>
                          </div>

                          <div className="flex-1 flex flex-col h-full min-h-[300px]">
                              <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2"><Clock size={14}/> Bitácora Comercial</h3>
                              
                              <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 md:p-5 mb-4 overflow-y-auto whitespace-pre-wrap text-sm text-gray-600 font-mono leading-relaxed shadow-inner">
                                  {selectedLead.notes ? selectedLead.notes.trim() : <span className="text-gray-300 italic">No hay historial comercial. Agrega una nota abajo.</span>}
                              </div>

                              <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                                    placeholder="Llamada realizada, programó visita para el jueves..." 
                                    className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  <button onClick={handleAddNote} className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 rounded-xl font-bold transition-transform active:scale-95 flex items-center justify-center gap-2">
                                      <Save size={18}/> <span className="hidden md:inline">Guardar</span>
                                  </button>
                              </div>
                          </div>
                      </div>
                  </>
              ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"><MessageCircle size={32} className="opacity-50"/></div>
                      <p className="font-bold text-sm uppercase text-gray-500">Bandeja de CRM</p>
                      <p className="text-xs mt-2 max-w-xs">Selecciona un prospecto de la lista para ver su historial, agendar visitas o actualizar su estado.</p>
                  </div>
              )}
          </div>

      </main>
    </div>
  );
}