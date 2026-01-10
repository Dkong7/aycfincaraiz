import React from 'react';
import { X, CheckCircle, MapPin, DollarSign, Youtube, User } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { PROPERTY_TYPES_THEME, getFieldIcon, getFieldKey } from "../../config/propertyConfig";
import { formatCurrency, formatValue } from "../../utils/formatters";

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
  // Fallback a "Casa" si el tipo no existe en el tema
  const theme = PROPERTY_TYPES_THEME[activeType] || PROPERTY_TYPES_THEME["Casa"];

  // Helper local para extraer ID de video
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Construir lista mixta (Video va primero si existe)
  const finalPreviewList = [
      ...(data?.video_url && getYoutubeId(data.video_url) ? [{ type: 'video', id: getYoutubeId(data.video_url) }] : []),
      ...sortedPreviewUrls.map((url: string) => ({ type: 'image', url }))
  ];

  // Campos a mostrar en los iconos resumen (Deben coincidir con lo que definimos en propertyConfig)
  const summaryFields = ['habs', 'baths', 'garages', 'area_built', 'kitchen', 'stratum', 'admin'];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
           <div><h3 className="text-xl font-black uppercase text-gray-800">Confirmar Datos</h3><p className="text-xs opacity-70">Verificación final antes de publicar</p></div>
           <button onClick={onClose} className="p-2 hover:bg-black/10 rounded-full transition-colors"><X size={20}/></button>
        </div>

        {/* Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-700">
             
             {/* Título y Precio */}
             <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                 <div>
                    <h4 className="font-black text-2xl md:text-3xl text-gray-900 leading-tight mb-2">{data.title || "Sin Título"}</h4>
                    <div className="flex gap-2">
                        <span className={`text-xs uppercase px-3 py-1 rounded-full font-bold text-white ${theme.color}`}>{activeType}</span>
                        <div className="flex items-center gap-1 text-gray-500 text-xs px-2"><MapPin size={14}/> {data.neighborhood}</div>
                    </div>
                 </div>
                 <div className="text-left md:text-right">
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Precio de Venta</p>
                    <div className="flex items-center gap-1 text-green-600 font-black text-2xl md:text-3xl">
                      <DollarSign size={24}/> {formatCurrency(data.price_cop)}
                    </div>
                    {data.price_usd > 0 && <p className="text-xs text-gray-400 font-medium">USD {formatCurrency(data.price_usd)}</p>}
                 </div>
             </div>

             {/* Resumen de Iconos (Automatizado con Config) */}
             <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold uppercase text-gray-400 mb-3">Características Principales</p>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                   {summaryFields.map(key => {
                       // Buscamos el valor en la raíz (ej: data.price) o en data.specs
                       const val = data[key] || (data.specs ? data.specs[key] : null);
                       if (!val) return null;
                       
                       return (
                          <div key={key} className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg w-20 h-20 shrink-0 shadow-sm">
                             <div className={`mb-1 ${theme.text}`}>{getFieldIcon(key)}</div>
                             <span className="block font-black text-gray-800 text-sm">{formatValue(val)}</span>
                             {/* Traducimos la etiqueta usando la key del config */}
                             <span className="text-[9px] text-gray-400 uppercase tracking-tight">{t(getFieldKey(key))}</span>
                          </div>
                       );
                   })}
                </div>
             </div>

             {/* Descripción */}
             {data.description && (
                <div>
                   <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Descripción del Anuncio</p>
                   <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
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
                           <div key={i} className={`relative w-28 h-20 shrink-0 rounded-lg overflow-hidden border-2 ${i===0 ? "border-green-500 ring-2 ring-green-100" : "border-gray-200"}`}>
                              {item.type === 'video' ? (
                                 <>
                                   <img src={`https://img.youtube.com/vi/${item.id}/default.jpg`} className="w-full h-full object-cover" alt="video"/>
                                   <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><Youtube size={24} className="text-white"/></div>
                                   <div className="absolute bottom-0 w-full bg-red-600 text-white text-[8px] px-1 font-bold text-center">VIDEO</div>
                                 </>
                              ) : (
                                 <img src={item.url} className="w-full h-full object-cover" alt="preview"/>
                              )}
                              <div className="absolute top-0 left-0 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg">{i === 0 ? "PORTADA" : `#${i+1}`}</div>
                           </div>
                       ))}
                    </div>
                 </div>
             )}

             {/* Datos Privados */}
             <div className="border-t pt-4 mt-2 bg-red-50/50 p-4 rounded-xl border-red-100">
                 <p className="text-[10px] font-bold uppercase text-red-500 mb-2 flex items-center gap-2"><User size={12}/> Datos Privados (Solo Interno)</p>
                 <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                     <div><span className="font-bold text-gray-800">Propietario:</span> {data.owner_name || "No registrado"}</div>
                     <div><span className="font-bold text-gray-800">Teléfono:</span> {data.owner_phone || "No registrado"}</div>
                     <div className="col-span-2"><span className="font-bold text-gray-800">Dirección Exacta:</span> {data.address_private || "No registrada"}</div>
                 </div>
             </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-white flex justify-end gap-3 z-10">
             <button onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors uppercase text-xs">Corregir</button>
             <button onClick={onConfirm} disabled={loading} className="px-8 py-3 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg transition-transform active:scale-95 flex items-center gap-2 uppercase text-xs">
                 {loading ? "Subiendo..." : <><CheckCircle size={16}/> Confirmar y Publicar</>}
             </button>
        </div>

      </div>
    </div>
  );
}