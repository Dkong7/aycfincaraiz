import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faVrCardboard, faArrowRight, faFilm, faMusic } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// NO importamos Navbar/Footer para evitar duplicados
import { useLanguage } from "../../context/LanguageContext";

const Audiovisual = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans selection:bg-emerald-500 selection:text-white">
       
       {/* 1. HERO CINEMA - Degradado Esmeralda/Navy */}
       <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Fondo Video/Imagen con Overlay Gradiente */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A192F]/90 via-[#0A192F]/80 to-emerald-900/80 backdrop-blur-sm"></div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-in fade-in zoom-in duration-1000">
             <div className="inline-block px-4 py-1 mb-6 border border-emerald-500/50 rounded-full text-emerald-400 text-xs font-black uppercase tracking-[0.3em]">
                {t.services.mediaBadge}
             </div>
             <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 tracking-tighter drop-shadow-2xl">
                {t.services.mediaTitlePart1} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                   {t.services.mediaTitlePart2}
                </span>
             </h1>
             <p className="text-xl md:text-2xl text-slate-300 font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
                {t.services.mediaDesc}
             </p>
          </div>
       </div>

       {/* 2. VIDEO REEL & STATS */}
       <div className="max-w-6xl mx-auto py-24 px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
             
             {/* Stats Izquierda */}
             <div className="space-y-8 lg:text-right order-2 lg:order-1">
                <div className="group">
                   <p className="text-5xl font-black text-emerald-500 mb-1 group-hover:scale-110 transition-transform origin-right">{t.services.mediaStat1}</p>
                   <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{t.services.mediaStat1Label}</p>
                </div>
                <div className="w-full h-px bg-slate-800"></div>
                <div className="group">
                   <p className="text-5xl font-black text-blue-500 mb-1 group-hover:scale-110 transition-transform origin-right">{t.services.mediaStat2}</p>
                   <p className="text-sm font-bold uppercase tracking-widest text-slate-400">{t.services.mediaStat2Label}</p>
                </div>
             </div>

             {/* Video Central */}
             <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="aspect-video bg-slate-900 rounded-3xl border border-slate-800 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex items-center justify-center overflow-hidden relative group hover:border-emerald-500/30 transition-colors duration-500">
                   <iframe 
                     className="w-full h-full transform scale-105 group-hover:scale-100 transition-transform duration-700" 
                     src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&mute=1&loop=1&playlist=xcsI00fi5_s" 
                     title="Demo Reel" 
                     allowFullScreen
                   ></iframe>
                   {/* Overlay decorativo */}
                   <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(10,25,47,0.8)]"></div>
                </div>
             </div>
          </div>
       </div>

       {/* 3. CARACTERÍSTICAS (Grid Tech) */}
       <div className="bg-gradient-to-b from-slate-950 to-[#051e2e] py-24 border-t border-slate-800/50">
          <div className="max-w-6xl mx-auto px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Feature 1 */}
                <div className="bg-slate-900/50 p-10 rounded-[2rem] border border-slate-800 hover:border-emerald-500/50 transition-all group hover:-translate-y-2">
                   <FontAwesomeIcon icon={faPlane} className="text-emerald-500 text-4xl mb-6 group-hover:scale-110 transition-transform" />
                   <h3 className="text-2xl font-bold mb-3 text-white">{t.services.mediaFeat1T}</h3>
                   <p className="text-slate-400 leading-relaxed">{t.services.mediaFeat1D}</p>
                </div>

                {/* Feature 2 */}
                <div className="bg-slate-900/50 p-10 rounded-[2rem] border border-slate-800 hover:border-blue-500/50 transition-all group hover:-translate-y-2">
                   <FontAwesomeIcon icon={faVrCardboard} className="text-blue-500 text-4xl mb-6 group-hover:scale-110 transition-transform" />
                   <h3 className="text-2xl font-bold mb-3 text-white">{t.services.mediaFeat2T}</h3>
                   <p className="text-slate-400 leading-relaxed">{t.services.mediaFeat2D}</p>
                </div>

                {/* Feature 3 */}
                <div className="bg-slate-900/50 p-10 rounded-[2rem] border border-slate-800 hover:border-purple-500/50 transition-all group hover:-translate-y-2">
                   <FontAwesomeIcon icon={faFilm} className="text-purple-500 text-4xl mb-6 group-hover:scale-110 transition-transform" />
                   <h3 className="text-2xl font-bold mb-3 text-white">{t.services.mediaFeat3T}</h3>
                   <p className="text-slate-400 leading-relaxed">{t.services.mediaFeat3D}</p>
                </div>

                {/* Feature 4 */}
                <div className="bg-slate-900/50 p-10 rounded-[2rem] border border-slate-800 hover:border-orange-500/50 transition-all group hover:-translate-y-2">
                   <FontAwesomeIcon icon={faMusic} className="text-orange-500 text-4xl mb-6 group-hover:scale-110 transition-transform" />
                   <h3 className="text-2xl font-bold mb-3 text-white">{t.services.mediaFeat4T}</h3>
                   <p className="text-slate-400 leading-relaxed">{t.services.mediaFeat4D}</p>
                </div>

             </div>
          </div>
       </div>

       {/* 4. CTA FINAL */}
       <div className="relative py-24 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-blue-900/20"></div>
          <div className="relative z-10 px-6">
             <h2 className="text-4xl md:text-5xl font-black mb-8">{t.services.mediaFinalCTA}</h2>
             <Link to="/contacto" className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-950 font-black uppercase tracking-widest rounded-full hover:bg-emerald-400 transition-all transform hover:scale-105 shadow-2xl shadow-emerald-500/20">
                {t.services.mediaFinalBtn} <FontAwesomeIcon icon={faArrowRight} />
             </Link>
          </div>
       </div>

    </div>
  );
};

export default Audiovisual;