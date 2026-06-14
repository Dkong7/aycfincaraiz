import React from "react";
import { Calendar, MessageCircle, Hash } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ContactSidebar({ prop }: any) {
  const { t } = useApp();
  
  const propertyCode = prop?.ayc_id || prop?.id || "N/A";
  const propertyTitle = prop?.title || "Propiedad";
  
  // Teléfono actualizado
  const mainPhone = "573224822840";

  // Etiquetas [WEB] para segmentación en el Bot
  const whatsappMsg = `[WEB] Hola, estoy interesado en: ${propertyTitle} (Cód: ${propertyCode}). Vengo de la página web.`;
  const whatsappLink = `https://wa.me/${mainPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  const scheduleLink = `https://wa.me/${mainPhone}?text=${encodeURIComponent("[WEB] Hola, quisiera agendar una visita para ver: " + propertyTitle + " (Cód: " + propertyCode + ")")}`;

  return (
    <div className="sticky top-24 font-sans animate-in fade-in slide-in-from-right-4 duration-700">
        
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            
            {/* CABECERA CORPORATIVA (Cero datos privados) */}
            <div className="text-center mb-6 border-b border-slate-100 pb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">
                    Contacta a un agente de
                </p>
                <h3 className="text-2xl font-black text-[#0A192F] tracking-tight">
                    AyC FINCA RAÍZ
                </h3>
            </div>

            {/* CÓDIGO AYC CON MÁXIMA JERARQUÍA */}
            <div className="mb-6 bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-center shadow-inner relative overflow-hidden">
                <Hash size={64} className="absolute -right-4 -top-4 text-slate-200/50 rotate-12" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 relative z-10">Código del Inmueble</p>
                <p className="text-3xl font-black text-green-600 tracking-tighter relative z-10">{propertyCode}</p>
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="space-y-4">
                <a 
                    href={whatsappLink}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-100 hover:shadow-green-200 hover:-translate-y-0.5"
                >
                    <div className="absolute left-0 w-1 h-full bg-black/10 rounded-l-xl"></div>
                    <MessageCircle size={20} className="fill-white/20 stroke-[2]"/> 
                    <span className="tracking-wide">{t('btn_whatsapp')}</span>
                </a>
                
                <a 
                    href={scheduleLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                    <Calendar size={18} className="text-slate-400 group-hover:text-white transition-colors"/> 
                    <span className="tracking-wide">{t('appraisal_final_btn')}</span>
                </a>
            </div>

            {/* FOOTER SUTIL */}
            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                    Respuesta inmediata en horario de oficina.
                </p>
            </div>
        </div>

    </div>
  );
}