import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Maximize, ArrowRight } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import { useTRM } from '../../hooks/useTRM';

const HeroSection = () => {
  const { t, lang } = useLanguage();
  const trm = useTRM();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [activeImage, setActiveImage] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      // Ordenamos por hero_order para respetar el orden de Alfonso
      const { data } = await supabase.from('properties').select('*').eq('is_hero', true).order('hero_order', { ascending: true });
      if (data && data.length > 0) { 
          setSlides(data); 
          // Aseguramos que cargue la imagen del primero
          setActiveImage(data[0].main_media_url);
      }
    };
    fetchHero();
  }, []);

  const changeSlide = (dir) => {
    if (animating || !slides.length) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 500);
    
    let next = dir === 'next' ? (current === slides.length - 1 ? 0 : current + 1) : (current === 0 ? slides.length - 1 : current - 1);
    setCurrent(next);
    setActiveImage(slides[next].main_media_url);
  };

  if (!slides.length) return <div className="h-[90vh] bg-[#0A192F] flex items-center justify-center text-white">Cargando Portafolio...</div>;
  
  const p = slides[current];
  const gallery = [p.main_media_url, ...(p.gallery_images || [])].slice(0, 5);

  return (
    <div className="relative h-[90vh] w-full bg-[#0A192F] overflow-hidden group">
      {/* FONDO */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${animating ? 'opacity-50' : 'opacity-100'}`}>
        <img src={activeImage} className="w-full h-full object-cover" alt="Hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/30 to-transparent" />
      </div>

      {/* TEXTO + CTA */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-24 max-w-6xl h-full pb-20">
         <div className={`transition-all duration-500 ${animating ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`}>
            <div className={`px-4 py-1 rounded mb-6 bg-tag-${p.property_type} w-fit text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-2`}>
               <Maximize size={12}/> {lang === 'es' ? p.property_type : (p.property_type === 'Apartamento' ? 'Apartment' : 'House')}
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase leading-[0.9] mb-4 tracking-tighter drop-shadow-2xl text-white">
               {p.address_visible}
            </h1>
            <div className="flex items-center gap-6 text-2xl md:text-3xl font-bold text-white mt-4 mb-8">
               <span className="flex items-center gap-2 text-gray-300 text-lg"><MapPin className="text-[var(--ayc-emerald)]"/> {p.real_address}</span>
               <div className="h-6 w-px bg-white/50"></div>
               {lang === 'es' ? (
                 <span>${new Intl.NumberFormat('es-CO').format(p.price_cop)}</span>
               ) : (
                 <span>USD ${new Intl.NumberFormat('en-US').format((p.price_cop / trm).toFixed(0))}</span>
               )}
            </div>

            {/* CTA BUTTON */}
            <Link to={`/inmuebles/${p.ayc_id}`} className="inline-flex items-center gap-3 bg-[var(--ayc-emerald)] hover:bg-[#166534] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,155,77,0.4)]">
               {lang === 'es' ? 'Ver Inmueble' : 'View Property'} <ArrowRight size={20}/>
            </Link>
         </div>
      </div>

      {/* CONTROLES */}
      <button onClick={() => changeSlide('prev')} className="absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/20 hover:bg-[var(--ayc-emerald)] hover:border-transparent transition-all z-30 text-white backdrop-blur-sm group-hover:opacity-100 opacity-0"><ChevronLeft size={32}/></button>
      <button onClick={() => changeSlide('next')} className="absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-full border border-white/20 hover:bg-[var(--ayc-emerald)] hover:border-transparent transition-all z-30 text-white backdrop-blur-sm group-hover:opacity-100 opacity-0"><ChevronRight size={32}/></button>

      {/* MINIATURAS */}
      <div className="absolute bottom-24 right-6 md:right-24 z-30 flex gap-4">
         {gallery.map((img, idx) => (
            <div key={idx} onClick={() => setActiveImage(img)} 
                 className={`w-24 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover:-translate-y-1 shadow-lg ${activeImage === img ? 'border-[var(--ayc-emerald)] scale-110' : 'border-white/30 opacity-70'}`}>
               <img src={img} className="w-full h-full object-cover" />
            </div>
         ))}
      </div>

      {/* CURVA BLANCA */}
      <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden leading-[0]">
         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[80px] md:h-[120px]">
             <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-white transform rotate-180 origin-center translate-y-full"></path>
         </svg>
      </div>
    </div>
  );
};
export default HeroSection;