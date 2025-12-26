import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCustom = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    { id: 1, title: 'EXPERIENCIA PREMIUM', subtitle: 'Encuentra tu lugar ideal', img: 'https://images.unsplash.com/photo-1600596542815-22b5c1275efb?q=80&w=1600&auto=format&fit=crop', color: '#39FF14' },
    { id: 2, title: 'BODEGAS INDUSTRIALES', subtitle: 'Logística de alto nivel', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop', color: '#FF007F' },
  ];

  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1));
  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1));

  return (
    <div className="relative h-[85vh] w-full bg-black text-white pt-20 overflow-hidden font-sans">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img src={slides[current].img} className="w-full h-full object-cover opacity-50 transition-all duration-700" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <span className="text-[#39FF14] tracking-[0.3em] font-bold mb-4 animate-pulse uppercase">AYC Finca Raíz</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase mb-6 tracking-tighter">{slides[current].title}</h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl">{slides[current].subtitle}</p>
        
        <div className="mt-10 flex gap-4">
          <button className="px-8 py-3 bg-[#39FF14] text-black font-bold rounded hover:bg-white transition-colors uppercase tracking-wider">Ver Propiedades</button>
          <button className="px-8 py-3 border border-white text-white font-bold rounded hover:bg-white/10 transition-colors uppercase tracking-wider">Contáctanos</button>
        </div>
      </div>

      {/* CONTROLS */}
      <button onClick={prev} className="absolute left-4 top-1/2 z-20 p-2 border border-white/30 rounded-full hover:bg-white/10 text-white"><ChevronLeft /></button>
      <button onClick={next} className="absolute right-4 top-1/2 z-20 p-2 border border-white/30 rounded-full hover:bg-white/10 text-white"><ChevronRight /></button>

      {/* CURVA INFERIOR */}
      <div className="absolute bottom-0 w-full overflow-hidden leading-[0] z-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px]">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#0a0a0a]"></path>
        </svg>
      </div>
    </div>
  );
};
export default HeroCustom;
