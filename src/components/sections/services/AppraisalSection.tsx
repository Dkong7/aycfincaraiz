import React from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, FileText, TrendingUp, CheckCircle2 } from "lucide-react";
// CORRECCIÓN DE RUTA: 3 Niveles hacia arriba
import { useLanguage } from "../../../context/LanguageContext";

export const AppraisalSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      {/* Fondo Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-green-200 to-transparent"></div>
        <div className="absolute left-10 top-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Contenido Texto */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest">
              <BadgeCheck size={16} /> {t.services.appraisalBadge}
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
              {t.services.appraisalTitlePart1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                {t.services.appraisalTitlePart2}
              </span>
            </h2>
            
            <p className="text-lg text-slate-500 leading-relaxed">
              {t.services.appraisalDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* SOLUCIÓN TS: Tipado explícito para 'item' */}
               {t.services.appraisalItems.map((item: string, i: number) => (
                 <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors">
                    <CheckCircle2 className="text-green-500 shrink-0" size={18}/>
                    <span className="text-sm font-bold text-slate-700">{item}</span>
                 </div>
               ))}
            </div>

            <Link to="/contacto" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-slate-900 text-white font-black uppercase tracking-wide hover:bg-green-600 hover:shadow-lg hover:shadow-green-200 transition-all duration-300 transform hover:-translate-y-1">
              {t.services.appraisalBtn}
            </Link>
          </div>

          {/* Imagen / Visual Dinámico */}
          <div className="lg:w-1/2 relative group">
            <div className="relative h-[500px] w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white">
               <img 
                 src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop" 
                 alt="Perito Avaluador" 
                 className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2000ms]"
               />
               
               {/* Tarjeta Flotante 1 */}
               <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 animate-bounce-slow">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-green-100 rounded-full text-green-600"><TrendingUp size={24}/></div>
                     <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">{t.services.appraisalCard1Label}</p>
                        <p className="text-xl font-black text-slate-800">+12.5% {t.services.appraisalCard1Value}</p>
                     </div>
                  </div>
               </div>

               {/* Tarjeta Flotante 2 (Certificado) */}
               <div className="absolute top-10 right-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10 text-white">
                  <div className="flex items-center gap-3">
                     <FileText className="text-green-400" size={20}/>
                     <div className="text-xs">
                        <p className="font-bold uppercase tracking-wider opacity-70">{t.services.appraisalCard2Label}</p>
                        <p className="font-black text-sm">{t.services.appraisalCard2Value}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};