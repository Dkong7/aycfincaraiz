import React from "react";
import { X, CheckCircle, MapPin, DollarSign, Youtube, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { PROPERTY_TYPES_THEME } from "../../config/propertyConfig";
import { formatCurrency } from "../../utils/formatters";

// --- IMPORTACIÓN DE PREVIEWS MODULARES ---
import HousePreview from "../../modules/house/HousePreview";
import ApartmentPreview from "../../modules/apartment/ApartmentPreview";
import BodegaPreview from "../../modules/bodega/BodegaPreview";
import RuralPreview from "../../modules/rural/RuralPreview";
import LotePreview from "../../modules/lote/LotePreview";
import LocalPreview from "../../modules/local/LocalPreview";
import OficinaPreview from "../../modules/oficina/OficinaPreview";

interface ModalProps {
  data: any;
  activeType: string;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  sortedPreviewUrls: string[];
}

export default function PropertyPreviewModal({ data, activeType, onClose, onConfirm, loading, sortedPreviewUrls }: ModalProps) {
  const { t } = useApp();
  
  // Tema Visual según el tipo
  const theme = PROPERTY_TYPES_THEME[activeType] || PROPERTY_TYPES_THEME["default"];

  // Helper local para extraer ID de video
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Construir lista visual (Video primero, luego imágenes)
  const finalPreviewList = [
      ...(data?.video_url && getYoutubeId(data.video_url) ? [{ type: 'video', id: getYoutubeId(data.video_url) }] : []),
      ...sortedPreviewUrls.map((url: string) => ({ type: 'image', url }))
  ];

  // --- RENDERIZADO DEL CONTENIDO ESPECÍFICO ---
  const renderSpecificContent = () => {
      switch (activeType) {
          case 'Casa': 
              return <HousePreview data={data} />;
          
          case 'Apartamento': 
              return <ApartmentPreview data={data} />;
          
          case 'Bodega': 
              return <BodegaPreview data={data} />;
          
          // CASO RURAL / FINCA (Soporta nombre de BD 'CasaCampo')
          case 'Finca': 
          case 'Rural': 
          case 'CasaCampo':
          case 'Casa Campestre': 
              return <RuralPreview data={data} />;
          
          // CASO LOTE / TERRENO
          case 'Lote': 
          case 'Terreno': 
              return <LotePreview data={data} />;
          
          case 'Local': 
              return <LocalPreview data={data} />;
          
          case 'Oficina': 
              return <OficinaPreview data={data} />;
          
          default:
              return (
                  <div className="p-4 border border-dashed border-gray-300 rounded text-center text-gray-500 italic text-xs bg-gray-50">
                      Vista previa genérica (Tipo no configurado o desconocido: {activeType})
                      <pre className="mt-2 text-[10px] text-left overflow-auto max-h-20 bg-white p-2 border rounded">
                          {JSON.stringify(data.specs, null, 2)}
                      </pre>
                  </div>
              );
      }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
           <div>
               <h3 className="text-xl font-black uppercase text-gray-800">Confirmar Datos</h3>
               <p className="text-xs opacity-70">Verificación final antes de publicar</p>
           </div>
           <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors text-gray-500 hover:text-black">
               <X size={20}/>
           </button>
        </div>

        {/* Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-700 bg-white custom-scrollbar">
              
              {/* Título y Precio */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div>
                      <h4 className="font-black text-2xl md:text-3xl text-gray-900 leading-tight mb-2 uppercase">{data.title || "Sin Título"}</h4>
                      <div className="flex gap-2 items-center">
                          <span className={`text-xs uppercase px-3 py-1 rounded-full font-bold text-white ${theme?.color || 'bg-gray-500'}`}>
                              {activeType}
                          </span>
                          <div className="flex items-center gap-1 text-gray-500 text-xs px-2 font-medium">
                              <MapPin size={14}/> {data.municipality}, {data.neighborhood || "Sin Barrio"}
                          </div>
                      </div>
                  </div>
                  <div className="text-left md:text-right bg-green-50 px-4 py-2 rounded-xl border border-green-100">
                      <p className="text-[10px] text-green-600 font-bold uppercase mb-1">Precio de Venta</p>
                      <div className="flex items-center md:justify-end gap-1 text-green-700 font-black text-2xl md:text-3xl">
                        <DollarSign size={24} strokeWidth={3}/> {formatCurrency(data.price_cop)}
                      </div>
                      {data.price_usd && Number(data.price_usd) > 0 && (
                         <p className="text-xs text-green-500 font-bold mt-1">USD {formatCurrency(data.price_usd)}</p>
                      )}
                  </div>
              </div>

              {/* --- AQUÍ SE INYECTA EL PREVIEW MODULAR (Card Específica) --- */}
              <div className="animate-in slide-in-from-bottom-2">
                  {renderSpecificContent()}
              </div>

              {/* Descripción */}
              {data.description && (
                 <div>
                    <p className="text-[10px] font-bold uppercase text-gray-400 mb-2 flex items-center gap-2">
                        <FileTextIcon size={12}/> Descripción Pública
                    </p>
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                       {data.description}
                    </div>
                 </div>
              )}

              {/* Galería Visual */}
              {finalPreviewList.length > 0 && (
                  <div>
                      <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Galería ({finalPreviewList.length} elementos)</p>
                      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin">
                         {finalPreviewList.map((item: any, i: number) => (
                             <div key={i} className={`relative w-28 h-20 shrink-0 rounded-lg overflow-hidden border-2 shadow-sm transition-transform hover:scale-105 ${i===0 ? "border-green-500 ring-2 ring-green-100" : "border-gray-100"}`}>
                                {item.type === 'video' ? (
                                   <>
                                     <img src={`https://img.youtube.com/vi/${item.id}/default.jpg`} className="w-full h-full object-cover opacity-80" alt="video"/>
                                     <div className="absolute inset-0 flex items-center justify-center"><div className="bg-red-600 rounded-full p-1 shadow-lg"><Youtube size={16} className="text-white"/></div></div>
                                   </>
                                ) : (
                                   <img src={item.url} className="w-full h-full object-cover" alt="preview"/>
                                )}
                                <div className="absolute top-0 left-0 bg-black/60 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-br-lg backdrop-blur-sm">
                                    {i === 0 ? "PORTADA" : `#${i+1}`}
                                </div>
                             </div>
                         ))}
                      </div>
                  </div>
              )}

              {/* Datos Privados (Solo Admin) */}
              <div className="border-t border-red-100 pt-4 mt-4 bg-red-50/30 p-4 rounded-xl">
                  <p className="text-[10px] font-bold uppercase text-red-500 mb-3 flex items-center gap-2">
                      <User size={14}/> Datos Privados (No visibles al público)
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-700 bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-gray-400 font-bold">Propietario</span>
                          <span className="font-bold text-sm">{data.owner_name || "No registrado"}</span>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[10px] uppercase text-gray-400 font-bold">Teléfono</span>
                          <span className="font-bold text-sm font-mono">{data.owner_phone || "No registrado"}</span>
                      </div>
                      <div className="md:col-span-2 flex flex-col border-t border-gray-100 pt-2 mt-1">
                          <span className="text-[10px] uppercase text-gray-400 font-bold">Dirección Exacta</span>
                          <span className="font-medium">{data.address_private || "No registrada"}</span>
                      </div>
                      {data.specs?.private_notes && (
                          <div className="md:col-span-2 pt-2 border-t border-red-100 italic bg-red-50 p-2 rounded text-red-700">
                              <span className="font-bold text-[10px] uppercase block mb-1">Notas Internas:</span> 
                              {data.specs.private_notes}
                          </div>
                      )}
                  </div>
              </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-white flex justify-end gap-3 z-10 sticky bottom-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
             <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors uppercase text-xs tracking-wider">
                 Seguir Editando
             </button>
             <button 
                onClick={onConfirm} 
                disabled={loading}
                className="px-8 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200 transition-all hover:translate-y-[-1px] active:scale-95 flex items-center gap-2 uppercase text-xs tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
             >
                 {loading ? (
                     <>
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Publicando...
                     </>
                 ) : (
                     <><CheckCircle size={16}/> Confirmar y Publicar</>
                 )}
             </button>
        </div>

      </div>
    </div>
  );
}

// Icono Helper
function FileTextIcon({size}:any) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>}