import React from "react";
import { Scale, Shield, FileSearch, Gavel, Scroll, Landmark, ChevronRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext"; // 1. CAMBIO: NUEVO CONTEXTO
import Navbar from "../../components/Navbar";

const Juridico = () => {
  // 2. USAR EL NUEVO HOOK
  const { t } = useApp();

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
       <Navbar /> 
       
       {/* 1. HERO SECTION */}
       <div className="relative min-h-[80vh] flex items-center bg-[#0A192F] overflow-hidden pt-20">
          <div className="absolute inset-0 z-0">
             <img 
               src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop" 
               alt="Blindaje Jurídico Inmobiliario" 
               className="w-full h-full object-cover opacity-20"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F] via-[#0A192F]/90 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-12">
             <div className="md:w-3/5 space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-widest">
                   <Shield size={16} /> {t('legal_badge') || "Blindaje Total"}
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                   {t('legal_title_1') || "Seguridad"} <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-200">
                      {t('legal_title_2') || "Jurídica Inmobiliaria"}
                   </span>
                </h1>
                
                <p className="text-xl text-slate-300 max-w-xl leading-relaxed border-l-4 border-blue-600 pl-6">
                   {t('legal_desc') || "Protegemos su patrimonio con estudios de títulos rigurosos, saneamiento predial y contratos blindados contra todo riesgo."}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                   <Link to="/contacto" className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 hover:-translate-y-1">
                      {t('legal_btn') || "Consultar Caso"}
                   </Link>
                </div>
             </div>

             {/* Estadísticas */}
             <div className="md:w-2/5 grid grid-cols-1 gap-6 animate-in slide-in-from-right-10 duration-1000 delay-300">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl hover:bg-white/10 transition-colors">
                   <p className="text-4xl font-black text-blue-400 mb-2">+500</p>
                   <p className="text-slate-300 font-bold uppercase text-sm tracking-wider">Títulos Estudiados</p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl hover:bg-white/10 transition-colors">
                   <p className="text-4xl font-black text-green-400 mb-2">100%</p>
                   <p className="text-slate-300 font-bold uppercase text-sm tracking-wider">Tasa de Éxito en Saneamiento</p>
                </div>
             </div>
          </div>
       </div>

       {/* 2. ÁREAS DE PRÁCTICA */}
       <div className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-20">
                <Scale className="mx-auto text-blue-600 mb-4" size={48}/>
                <h2 className="text-4xl font-black text-[#0A192F] uppercase">{t('legal_expertise_title') || "Áreas de Práctica"}</h2>
                <div className="h-1 w-24 bg-blue-600 mx-auto mt-6 rounded-full"></div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FileSearch size={120} />
                   </div>
                   <div className="relative z-10">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                         <FileSearch size={28}/>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">{t('legal_card_1_t') || "Estudio de Títulos"}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{t('legal_card_1_d') || "Análisis profundo de la tradición del inmueble (20+ años) para detectar gravámenes, embargos o vicios ocultos."}</p>
                   </div>
                </div>

                {/* Card 2 */}
                <div className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Landmark size={120} />
                   </div>
                   <div className="relative z-10">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                         <Landmark size={28}/>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">{t('legal_card_2_t') || "Saneamiento Predial"}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{t('legal_card_2_d') || "Resolución de sucesiones ilíquidas, levantamiento de hipotecas, corrección de áreas y linderos."}</p>
                   </div>
                </div>

                {/* Card 3 */}
                <div className="group bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Gavel size={120} />
                   </div>
                   <div className="relative z-10">
                      <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                         <Gavel size={28}/>
                      </div>
                      <h3 className="text-xl font-black text-slate-900 mb-3">{t('legal_card_3_t') || "Contratos Blindados"}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{t('legal_card_3_d') || "Elaboración de promesas de compraventa y contratos de arrendamiento con cláusulas de protección robustas."}</p>
                   </div>
                </div>
             </div>

             {/* Servicios Adicionales */}
             <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                   { t: "Reglamentos de P.H.", d: "Modificación y constitución." },
                   { t: "Licencias de Construcción", d: "Trámite ante curaduría." },
                   { t: "Procesos de Pertenencia", d: "Saneamiento por posesión." },
                ].map((item, i) => (
                   <div key={i} className="flex gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-100 hover:bg-white hover:shadow-md transition-all">
                      <div className="mt-1 text-blue-600"><CheckCircle2 size={20}/></div>
                      <div>
                         <h4 className="font-bold text-slate-900 text-sm mb-1">{item.t}</h4>
                         <p className="text-xs text-slate-500">{item.d}</p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* 3. PROCESO */}
       <div className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <h2 className="text-3xl font-black text-[#0A192F] max-w-md">{t('legal_process_title') || "Metodología Jurídica"}</h2>
                <p className="text-slate-400 font-medium">Transparencia y rigor en cada paso.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Línea conectora */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                {[
                   { step: "01", t: "Diagnóstico", d: "Revisión inicial de documentos (CTL, Escrituras).", icon: <FileSearch/> },
                   { step: "02", t: "Plan de Acción", d: "Estrategia jurídica y cotización de honorarios.", icon: <Scroll/> },
                   { step: "03", t: "Ejecución", d: "Radicación de trámites y seguimiento hasta resolución.", icon: <Gavel/> },
                ].map((s, i) => (
                   <div key={i} className="group relative bg-white pt-8">
                      <div className="w-24 h-24 bg-[#0A192F] text-white rounded-2xl flex items-center justify-center text-3xl font-black mb-8 shadow-xl group-hover:-translate-y-2 transition-transform duration-500 relative z-10 mx-auto md:mx-0">
                         {s.icon}
                         <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                            {s.step}
                         </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{s.t}</h3>
                      <p className="text-slate-500 leading-relaxed text-sm">{s.d}</p>
                   </div>
                ))}
             </div>
          </div>
       </div>

       {/* 4. CTA FINAL */}
       <div className="bg-[#0A192F] py-20 border-t border-white/10 relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">
                {t('legal_final_cta') || "¿Su inmueble tiene problemas legales?"}
             </h2>
             <Link to="/contacto" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[#0A192F] font-black uppercase tracking-widest rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl">
                {t('legal_final_btn') || "Agendar Consulta Gratuita"} <ChevronRight size={18}/>
             </Link>
          </div>
          {/* Decoración */}
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
       </div>

    </div>
  );
};

export default Juridico;