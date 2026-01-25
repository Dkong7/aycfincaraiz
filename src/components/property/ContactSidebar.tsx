import React from "react";
import { Calendar, MessageCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ContactSidebar({ prop }: any) {
  const { t } = useApp();
  
  // Datos del Agente y Propiedad
  const agentName = prop?.owner_name || "AyC Inmobiliaria";
  const propertyCode = prop?.ayc_id || prop?.id || "N/A";
  const propertyTitle = prop?.title || "Propiedad";
  
  // Teléfono Central (Oculto en la UI, solo para el link)
  const mainPhone = "573134663832";

  // Mensaje automático
  const whatsappMsg = `Hola, estoy interesado en: ${propertyTitle} (Cód: ${propertyCode}).`;
  const whatsappLink = `https://wa.me/${mainPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  // Link para Agendar (Mismo número, diferente intención)
  const scheduleLink = `https://wa.me/${mainPhone}?text=${encodeURIComponent("Hola, quisiera agendar una visita para ver: " + propertyTitle)}`;

  return (
    <div className="sticky top-24 font-sans animate-in fade-in slide-in-from-right-4 duration-700">
        
        {/* TARJETA DE CONTACTO EJECUTIVA */}
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/40 border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
            
            {/* Header Sutil */}
            <div className="text-center mb-8 border-b border-slate-100 pb-6">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                    {t('agent_title')}
                </p>
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                    {agentName}
                </h3>
                {prop?.ayc_id && (
                    <div className="mt-3 inline-flex items-center justify-center px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full border border-slate-200">
                        {t('code')}: {prop.ayc_id}
                    </div>
                )}
            </div>

            {/* Acciones */}
            <div className="space-y-4">
                
                {/* 1. WHATSAPP (Principal) */}
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
                
                {/* 2. AGENDAR VISITA (Secundario) */}
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

            {/* Decoración Inferior */}
            <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                <p className="text-[10px] text-slate-400 font-medium">
                    Respuesta inmediata en horario de oficina.
                </p>
            </div>
        </div>

    </div>
  );
}