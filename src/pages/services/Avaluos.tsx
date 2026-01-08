import React from "react";
import { BadgeCheck, FileText, TrendingUp, CheckCircle2, ChevronRight, Scale, Calculator, FileSignature } from "lucide-react";
// ELIMINADOS Navbar y Footer para evitar duplicidad
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

const Avaluos = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-green-100 selection:text-green-900">
       
       {/* 1. HERO SECTION - Diseño Asimétrico con Imagen */}
       <div className="relative bg-[#0A192F] text-white pt-40 pb-24 overflow-hidden">
          {/* Elementos Decorativos de Fondo */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-green-900/20 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center gap-12">
             <div className="lg:w-1/2 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-black uppercase tracking-widest animate-fade-in-up">
                   <BadgeCheck size={16} /> {t.services.appraisalBadge}
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight">
                   {t.services.appraisalTitlePart1} <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
                      {t.services.appraisalTitlePart2}
                   </span>
                </h1>
                <p className="text-xl text-slate-300 max-w-lg leading-relaxed">
                   {t.services.appraisalDesc}
                </p>
                
                <div className="pt-4 flex flex-wrap gap-4">
                   <Link to="/contacto" className="inline-flex items-center justify-center px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/50 hover:-translate-y-1">
                      {t.services.appraisalBtn}
                   </Link>
                </div>
             </div>

             {/* Imagen / Visual Abstracto */}
             <div className="lg:w-1/2 relative">
                <div className="relative z-10 bg-slate-800 p-2 rounded-3xl shadow-2xl border border-slate-700 transform rotate-2 hover:rotate-0 transition-all duration-700">
                   <img 
                     src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop" 
                     alt="Perito Avaluador Bogotá" 
                     className="rounded-2xl w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                   />
                   <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                      <p className="text-xs font-bold uppercase tracking-wider opacity-80">Bogotá & La Sabana</p>
                      <p className="text-lg font-black">+15 Años de Experiencia</p>
                   </div>
                </div>
                <div className="absolute -inset-4 bg-green-500/20 rounded-[2.5rem] blur-xl -z-10"></div>
             </div>
          </div>
       </div>

       {/* 2. CARDS DE BENEFICIO (Why Us) */}
       <div className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-4">{t.services.appraisalWhyTitle}</h2>
                <div className="h-1 w-24 bg-green-600 mx-auto rounded-full"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { icon: <Scale size={40}/>, t: t.services.appraisalWhy1T, d: t.services.appraisalWhy1D },
                   { icon: <FileText size={40}/>, t: t.services.appraisalWhy2T, d: t.services.appraisalWhy2D },
                   { icon: <TrendingUp size={40}/>, t: t.services.appraisalWhy3T, d: t.services.appraisalWhy3D }
                ].map((item, i) => (
                   <div key={i} className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 hover:border-green-100">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0A192F] group-hover:bg-green-600 group-hover:text-white transition-colors duration-300 mb-6">
                         {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-700 transition-colors">{item.t}</h3>
                      <p className="text-slate-500 leading-relaxed">{item.d}</p>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* 3. PROCESO (Timeline Vertical / Steps) */}
       <div className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                   <span className="text-green-600 font-bold uppercase tracking-widest text-sm mb-2 block">Paso a Paso</span>
                   <h2 className="text-4xl font-black text-[#0A192F] mb-8">{t.services.appraisalProcessTitle}</h2>
                   
                   <div className="space-y-8">
                      {[
                         { step: "01", title: t.services.appraisalStep1, desc: t.services.appraisalStep1Desc, icon: <CheckCircle2 /> },
                         { step: "02", title: t.services.appraisalStep2, desc: t.services.appraisalStep2Desc, icon: <Calculator /> },
                         { step: "03", title: t.services.appraisalStep3, desc: t.services.appraisalStep3Desc, icon: <FileSignature /> }
                      ].map((s, i) => (
                         <div key={i} className="flex gap-6 group">
                            <div className="flex flex-col items-center">
                               <div className="w-12 h-12 rounded-full border-2 border-slate-200 group-hover:border-green-600 bg-white flex items-center justify-center text-slate-400 group-hover:text-green-600 font-black transition-all z-10">
                                  {s.step}
                               </div>
                               {i !== 2 && <div className="w-0.5 h-full bg-slate-100 group-hover:bg-green-100 transition-colors my-2"></div>}
                            </div>
                            <div className="pb-8">
                               <h4 className="text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors flex items-center gap-2">
                                  {s.title}
                               </h4>
                               <p className="text-slate-500 mt-2">{s.desc}</p>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
                
                {/* Imagen Contextual del Proceso */}
                <div className="lg:w-1/2 relative">
                   <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden relative shadow-inner">
                      <img 
                        src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop" 
                        alt="Proceso Avalúo" 
                        className="w-full h-full object-cover opacity-80 mix-blend-multiply hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent flex items-end p-10">
                         <div className="text-white">
                            <p className="font-bold text-lg">Normativa Vigente 2026</p>
                            <p className="text-sm opacity-80">Cumplimiento estricto de ley de vivienda.</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* 4. CTA FINAL (Elegante y Discreto) */}
       <div className="bg-[#0A192F] border-t border-white/10 py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-green-900/10 blur-3xl"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-serif italic">
                "{t.services.appraisalFinalCTA}"
             </h2>
             <Link to="/contacto" className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-white/30 hover:border-green-500 hover:bg-green-500/10 text-white rounded-full transition-all duration-300">
                <span className="font-bold uppercase tracking-widest text-sm">{t.services.appraisalFinalBtn}</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform"/>
             </Link>
          </div>
       </div>
       
    </div>
  );
};

export default Avaluos;