import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pb } from "../api";
import { 
  LayoutGrid, LogOut, BookOpen, Users, Menu, X, MapPin, Map as MapIcon, 
  MessageCircle, User, Edit
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { formatCurrency } from "../utils/formatters";

const PB_URL = window.location.origin;

// Función para mapear colores exactos por tipo de inmueble
const getPropertyColor = (type: string) => {
  const t = type?.toLowerCase() || "";
  if (t.includes("casa")) return "#D97706"; // Ambar/Amarillo oscuro
  if (t.includes("apartamento") || t.includes("apto")) return "#2563EB"; // Azul
  if (t.includes("bodega")) return "#9A3412"; // Marrón/Naranja oscuro
  if (t.includes("lote") || t.includes("terreno")) return "#059669"; // Verde
  if (t.includes("local")) return "#DB2777"; // Magenta/Rosa
  if (t.includes("oficina")) return "#0D9488"; // Verde azulado (Teal)
  if (t.includes("rural") || t.includes("finca")) return "#7C3AED"; // Morado
  return "#4B5563"; // Gris por defecto
};

// Generador de pines dinámicos
const createCustomIcon = (color: string) => L.divIcon({
  className: "custom-pin",
  html: `<div style="background-color: ${color}; width: 22px; height: 22px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.5); transition: transform 0.2s;"></div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});

export default function DashboardMap() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = pb.authStore.model;
  const isManager = ["Alfonso", "Claudia", "admin"].includes(currentUser?.role || "");
  const storedTheme = localStorage.getItem("ayc_theme") || "agent";

  const s = ((t) => {
      if (t === "claudia") return { mainBg: "bg-[#FFF0F5]", sidebar: "bg-white border-pink-100", sidebarText: "text-pink-600", activeBtn: "bg-pink-100 text-pink-700 shadow-inner", card: "bg-white border-pink-100" };
      if (t === "alfonso") return { mainBg: "bg-[#F4F1EA]", sidebar: "bg-[#1F1612] border-[#3E2C20]", sidebarText: "text-[#E8DCCA]", activeBtn: "bg-[#3E2C20] text-[#D97706] shadow-inner", card: "bg-[#FDFBF7] border-[#8D6E63]" };
      return { mainBg: "bg-gray-100", sidebar: "bg-[#0A192F] border-white/10", sidebarText: "text-gray-300", activeBtn: "bg-[#009B4D] text-white shadow-lg", card: "bg-white border-gray-200" };
  })(storedTheme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const props = await pb.collection("properties").getFullList({ sort: "-created" });
        setProperties(props);
      } catch (error) { console.error(error); } finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  const handleLogout = () => { pb.authStore.clear(); localStorage.removeItem("ayc_theme"); navigate("/agentes"); };

  const mappedProps = properties.filter(p => p.lat && p.lng);
  const unmappedCount = properties.length - mappedProps.length;

  return (
    <div className={`flex flex-col md:flex-row font-sans transition-colors duration-500 ${s.mainBg} min-h-screen md:h-screen md:overflow-hidden`}>
      
      <style>{`
        .leaflet-popup-content-wrapper { padding: 0 !important; border-radius: 1rem !important; overflow: hidden !important; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important; border: none !important; }
        .leaflet-popup-content { margin: 0 !important; width: 260px !important; }
        .leaflet-popup-close-button { color: white !important; text-shadow: 0 1px 3px black; z-index: 10; right: 8px !important; top: 8px !important; background: rgba(0,0,0,0.3); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; }
        .leaflet-popup-close-button:hover { background: rgba(0,0,0,0.6); }
      `}</style>

      {/* HEADER MÓVIL */}
      <header className={`md:hidden flex justify-between items-center p-4 border-b bg-white/95 backdrop-blur shadow-sm sticky top-0 z-50`}>
          <div className="flex items-center gap-2"><div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center text-white font-black text-xs">AYC</div><h1 className="font-black text-lg text-[#0A192F]">MAPA</h1></div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2"><Menu size={24} /></button>
      </header>

      {/* SIDEBAR NEGRO */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-[70] w-72 md:w-64 flex flex-col py-6 border-r shadow-2xl md:shadow-none transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${s.sidebar}`}>
         <div className="md:hidden absolute top-4 right-4"><button onClick={() => setIsMobileMenuOpen(false)} className={`${s.sidebarText}`}><X size={24}/></button></div>
         <div className="px-6 mb-8 mt-2 md:mt-0"><h1 className={`font-black text-2xl tracking-tighter ${s.sidebarText}`}>AYC PANEL</h1></div>
         
         <nav className="px-3 space-y-2 flex-1">
            <button className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all ${s.activeBtn}`}><MapIcon size={18}/> Centro de Mando</button>
            <button onClick={() => navigate("/dashboard/crm")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><MessageCircle size={18}/> Seguimiento CRM</button>
            <button onClick={() => navigate("/dashboard/inventario")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><LayoutGrid size={18}/> Inventario</button>
            <button onClick={() => navigate("/dashboard/blog")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><BookOpen size={18}/> Blog</button>
            {isManager && (<button onClick={() => navigate("/dashboard/equipo")} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-all hover:opacity-80 ${s.sidebarText}`}><Users size={18}/> Equipo</button>)}
         </nav>
         
         <div className="px-6 mt-auto"><button onClick={handleLogout} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 w-full p-4 justify-center md:justify-start"><LogOut size={16}/> SALIR</button></div>
      </aside>

      {/* CONTENIDO PRINCIPAL: MAPA FULL WIDTH */}
      <main className="flex-1 p-4 md:p-6 w-full relative z-0 md:overflow-hidden flex flex-col h-[calc(100vh-64px)] md:h-full">
          
          <div className={`flex-1 flex flex-col w-full rounded-2xl shadow-xl border overflow-hidden ${s.card} relative z-0`}>
              <div className="p-4 border-b flex justify-between items-center bg-white/95 backdrop-blur-md z-10 absolute top-0 left-0 right-0 shadow-sm">
                  <h2 className="font-black text-lg text-gray-800 uppercase flex items-center gap-2">
                      <MapPin className="text-green-600"/> Ubicación de Inmuebles
                  </h2>
                  <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                          <span className="text-[10px] font-bold bg-green-100 text-green-700 px-3 py-1.5 rounded-md shadow-sm">{mappedProps.length} Mapeados</span>
                          {unmappedCount > 0 && <span className="text-[10px] font-bold bg-red-100 text-red-600 px-3 py-1.5 rounded-md shadow-sm">{unmappedCount} Sin Ubicación</span>}
                      </div>
                  </div>
              </div>
              
              <div className="flex-1 bg-gray-100 relative mt-[64px]">
                {isLoading && (
                   <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                      <span className="font-bold text-gray-500 animate-pulse">Cargando mapa...</span>
                   </div>
                )}
                
                {/* LEYENDA DE COLORES */}
                <div className="absolute bottom-6 left-4 z-[400] bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border border-gray-200 hidden md:block">
                   <p className="text-[10px] font-black uppercase text-gray-500 mb-2">Tipos de Inmueble</p>
                   <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#D97706"}}></div><span className="text-xs font-bold text-gray-700">Casa</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#2563EB"}}></div><span className="text-xs font-bold text-gray-700">Apto</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#9A3412"}}></div><span className="text-xs font-bold text-gray-700">Bodega</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#059669"}}></div><span className="text-xs font-bold text-gray-700">Lote</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#DB2777"}}></div><span className="text-xs font-bold text-gray-700">Local</span></div>
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{backgroundColor: "#0D9488"}}></div><span className="text-xs font-bold text-gray-700">Oficina</span></div>
                   </div>
                </div>

                <MapContainer center={[4.6097, -74.0817]} zoom={12} className="w-full h-full z-0" zoomControl={false}>
                  <ZoomControl position="bottomright" />
                  <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
                  {mappedProps.map((prop) => {
                    const pinColor = getPropertyColor(prop.property_type);
                    return (
                      <Marker key={prop.id} position={[prop.lat, prop.lng]} icon={createCustomIcon(pinColor)}>
                        <Popup closeButton={true}>
                          <div className="flex flex-col h-full bg-white">
                            <div className="h-36 w-full relative bg-gray-200">
                               {prop.images?.[0] ? (
                                 <img src={`${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${prop.images[0]}`} className="w-full h-full object-cover"/>
                               ) : (
                                 <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs">Sin Foto</div>
                               )}
                               
                               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
                               
                               <div className="absolute bottom-3 left-3 text-white font-black text-lg drop-shadow-md">
                                  {formatCurrency(prop.price_cop)}
                               </div>
                               <div className="absolute top-3 left-3 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-sm" style={{backgroundColor: pinColor}}>
                                  {prop.property_type}
                               </div>
                            </div>
                            
                            <div className="p-4">
                               <div className="flex justify-between items-start gap-2 mb-1">
                                  <h3 className="font-bold text-sm leading-tight text-gray-800 line-clamp-2">{prop.title}</h3>
                               </div>
                               <p className="text-[10px] font-mono text-gray-400 mb-2">{prop.ayc_id}</p>
                               <p className="text-[11px] text-gray-500 mb-3 flex items-center gap-1 font-medium"><MapPin size={12} className="text-gray-400"/> {prop.neighborhood || prop.municipality}</p>
                               
                               <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 mb-4">
                                  <p className="text-[9px] font-black uppercase text-slate-500 mb-1.5 flex items-center gap-1"><User size={10}/> Propietario / Agente</p>
                                  <p className="text-xs font-bold text-gray-800 truncate">{prop.owner_name || "Sin nombre asignado"}</p>
                                  <p className="text-[11px] text-gray-600 font-mono mt-0.5">{prop.owner_phone || "Sin teléfono"}</p>
                               </div>
                               
                               <button 
                                  onClick={() => navigate("/dashboard/inventario", { state: { editPropertyId: prop.id } })} 
                                  className="w-full bg-[#0A192F] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-md"
                               >
                                  Editar Inmueble <Edit size={14}/>
                               </button>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              </div>
          </div>
      </main>
    </div>
  );
}
