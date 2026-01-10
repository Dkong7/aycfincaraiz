// src/components/property/ContactSidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { User, Calendar, CheckCircle } from "lucide-react";
import { useApp } from "../../context/AppContext";

export default function ContactSidebar({ prop }: any) {
  const { t } = useApp();
  
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
        <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-green-100"><User size={32} className="text-green-600"/></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Agente Responsable</p>
            <h3 className="text-xl font-black text-gray-900">AyC Inmobiliaria</h3>
        </div>

        <div className="space-y-3">
            <a href={`https://wa.me/573134663832?text=Hola, estoy interesado en el inmueble ${prop.ayc_id} (${prop.title})`} target="_blank" 
                className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-4 rounded-xl text-center transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-3">
                {t('det_whatsapp')}
            </a>
            
            <button className="block w-full bg-[#0A192F] hover:bg-[#112] text-white font-bold py-4 rounded-xl text-center transition-all shadow-lg flex items-center justify-center gap-2">
                <Calendar size={18}/> {t('Agendar Visita')}
            </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={18}/>
                <div>
                    <h4 className="font-bold text-sm text-green-800">¿Necesitas Crédito?</h4>
                    <p className="text-xs text-green-700 mt-1 leading-relaxed">Tenemos aliados financieros para ayudarte a conseguir este inmueble.</p>
                    <Link to="/servicios" className="text-xs font-black text-green-800 underline mt-2 block hover:text-green-900">Ver Aliados</Link>
                </div>
            </div>
        </div>
    </div>
  );
}