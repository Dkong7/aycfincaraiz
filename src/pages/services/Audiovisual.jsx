import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Play } from 'lucide-react';

const Audiovisual = () => {
  const { t } = useLanguage();
  return (
    <div className="pt-24 bg-[#050505] min-h-screen font-sans text-white">
      {/* HERO VIDEO */}
      <div className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-60">
           <img src="https://images.unsplash.com/photo-1574359611959-b55a61b6727c?q=80&w=2000" className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
           <span className="text-[var(--ayc-emerald)] font-bold tracking-[0.3em] uppercase mb-4 block animate-pulse">Inmersión Total</span>
           <h1 className="text-5xl md:text-8xl font-black uppercase leading-none mb-6">
             Cinema <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ayc-emerald)] to-blue-500">A&C</span>
           </h1>
           <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto">
             {t.av.subtitle}
           </p>
        </div>
      </div>

      {/* VIDEO EMBED */}
      <div className="max-w-6xl mx-auto px-6 py-20">
         <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(21,128,61,0.3)] border border-gray-800 relative group">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&controls=1&rel=0" 
              title="Cinema A&C" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
         </div>
      </div>

      {/* TEXTO DESCRIPTIVO */}
      <div className="max-w-4xl mx-auto px-6 text-center pb-32">
         <h2 className="text-3xl font-bold mb-6">El valor entra por los ojos</h2>
         <p className="text-gray-400 text-lg leading-relaxed">
            {t.av.desc} Utilizamos drones FPV, cámaras de cine y edición profesional para contar la historia de tu propiedad. No es solo mostrar paredes, es transmitir la emoción de vivir ahí.
         </p>
         <button className="mt-10 bg-[var(--ayc-emerald)] text-white px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Solicitar Producción
         </button>
      </div>
    </div>
  );
};
export default Audiovisual;
