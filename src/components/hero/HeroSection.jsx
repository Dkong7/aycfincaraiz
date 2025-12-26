import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Maximize, ArrowUpRight } from 'lucide-react';

const HERO_DATA = [
  { id: 1, type: 'Apartamento', title: 'PENTHOUSE ROSALES', location: 'Bogotá, Rosales', price: '$1.250M', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop' },
  { id: 2, type: 'Casa', title: 'MANSIÓN LA CALERA', location: 'La Calera', price: '$3.500M', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop' },
  { id: 3, type: 'Bodega', title: 'HUB ZONA FRANCA', location: 'Fontibón', price: '$25M / Mes', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop' },
  { id: 4, type: 'CasaCampo', title: 'FINCA LLANOGRANDE', location: 'Antioquia', price: '$4.200M', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2000&auto=format&fit=crop' },
  { id: 5, type: 'Lote', title: 'LOTE SOPÓ', location: 'Cundinamarca', price: '$800M', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop' },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const changeSlide = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    
    if (dir === 'next') setCurrent(curr => (curr === HERO_DATA.length - 1 ? 0 : curr + 1));
    else setCurrent(curr => (curr === 0 ? HERO_DATA.length - 1 : curr - 1));
  };

  const active = HERO_DATA[current];

  return (
    <div className="relative h-[85vh] w-full bg-[#0A192F] overflow-hidden font-sans text-white group mt-0">
      
      {/* 1. SLIDER BACKGROUND */}
      {HERO_DATA.map((slide, idx) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img src={slide.img} className="w-full h-full object-cover transform scale-105" alt={slide.title} />
          {/* Capas de gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/90 via-[#0A192F]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-90" />
        </div>
      ))}

      {/* 2. CONTENIDO TEXTO */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-24 max-w-5xl h-full pb-20">
        
        {/* Tag Tipo */}
        <div className={`flex items-center gap-2 px-4 py-1.5 w-fit rounded shadow-lg mb-6 transition-all duration-500 ${'bg-tag-' + active.type} ${animating ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
          <Maximize size={14} className={active.type === 'Lote' || active.type === 'Bodega' ? 'text-black' : 'text-white'}/>
          <span className="font-black text-xs tracking-[0.2em] uppercase">
            {active.type === 'CasaCampo' ? 'CASA CAMPO' : active.type}
          </span>
        </div>

        {/* Título Principal */}
        <h1 className={`text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6 drop-shadow-2xl transition-all duration-500 delay-100 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {active.title}
        </h1>

        {/* Meta Info */}
        <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-lg transition-all duration-500 delay-200 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-center gap-2 text-gray-300">
            <MapPin className="text-[var(--ayc-emerald)]" />
            <span className="font-medium tracking-wide">{active.location}</span>
          </div>
          
          <div className="hidden md:block w-px h-6 bg-gray-600"></div>
          
          <div className="text-3xl font-bold text-white flex items-center gap-2">
            {active.price}
            <ArrowUpRight className="text-[var(--ayc-emerald)]" size={20} />
          </div>
        </div>
      </div>

      {/* 3. NAVEGACIÓN */}
      <div className="absolute top-1/2 right-4 md:right-10 z-30 flex flex-col gap-4 -translate-y-1/2">
        <button 
          onClick={() => changeSlide('prev')} 
          className="p-4 border border-white/20 rounded-full hover:bg-[var(--ayc-emerald)] hover:border-[var(--ayc-emerald)] hover:scale-110 transition-all group backdrop-blur-sm"
        >
          <ChevronLeft size={24} className="group-hover:text-white" />
        </button>
        <button 
          onClick={() => changeSlide('next')} 
          className="p-4 border border-white/20 rounded-full hover:bg-[var(--ayc-emerald)] hover:border-[var(--ayc-emerald)] hover:scale-110 transition-all group backdrop-blur-sm"
        >
          <ChevronRight size={24} className="group-hover:text-white" />
        </button>
      </div>

      {/* 4. MINIATURAS */}
      <div className="absolute bottom-24 left-6 md:left-24 z-30 hidden md:flex gap-4">
        {HERO_DATA.map((slide, idx) => (
          <div 
            key={slide.id}
            onClick={() => setCurrent(idx)}
            className={`relative h-20 w-32 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:-translate-y-1 ${idx === current ? 'border-[var(--ayc-emerald)] shadow-[0_10px_20px_rgba(0,0,0,0.5)] scale-105' : 'border-white/20 opacity-50 hover:opacity-100'}`}
          >
            <img src={slide.img} className="w-full h-full object-cover" alt="thumb" />
            {idx === current && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--ayc-emerald)] animate-wiggle" />
            )}
          </div>
        ))}
      </div>

      {/* 5. CURVA SVG */}
      <div className="absolute bottom-0 w-full z-20 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
