import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Maximize, ArrowUpRight } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { useLanguage } from '../../context/LanguageContext';

const HeroSection = () => {
  const { t, lang } = useLanguage();
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const { data } = await supabase.from('properties').select('*').eq('is_hero', true).order('hero_order', { ascending: true }).limit(5);
      if (data && data.length > 0) {
        setSlides(data);
        setActiveImage(data[0].main_media_url);
      } else {
        // Fallback
        setSlides([{ id: 1, property_type: 'Apartamento', address_visible: 'Penthouse Rosales', price_cop: 1250000000, main_media_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c', gallery_images: [] }]);
        setActiveImage('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c');
      }
    };
    fetchHero();
  }, []);

  const changeSlide = (dir) => {
    if (animating || slides.length === 0) return;
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    
    let nextIndex = (dir === 'next') 
      ? (current === slides.length - 1 ? 0 : current + 1)
      : (current === 0 ? slides.length - 1 : current - 1);
    
    setCurrent(nextIndex);
    setActiveImage(slides[nextIndex].main_media_url);
  };

  if (slides.length === 0) return null;
  const activeProp = slides[current];
  const currentGallery = [activeProp.main_media_url, ...(activeProp.gallery_images || [])].slice(0, 5);

  return (
    <div className="relative h-[85vh] w-full bg-[#0A192F] overflow-hidden font-sans text-white group mt-0">
      {/* FONDO */}
      <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${animating ? 'opacity-50' : 'opacity-100'}`}>
          <img src={activeImage} className="w-full h-full object-cover transform scale-105" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A192F]/95 via-[#0A192F]/40 to-transparent" />
      </div>

      {/* TEXTO */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-24 max-w-5xl h-full pb-20">
        <div className={`flex items-center gap-2 px-4 py-1.5 w-fit rounded shadow-lg mb-6 bg-tag-${activeProp.property_type}`}>
          <Maximize size={14} className="text-white"/><span className="font-black text-xs tracking-[0.2em] uppercase text-white">{activeProp.property_type}</span>
        </div>
        <h1 className={`text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-6 drop-shadow-2xl transition-all duration-500 delay-100 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          {activeProp.address_visible}
        </h1>
        <div className={`flex items-center gap-4 text-lg transition-all duration-500 delay-200 ${animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <MapPin className="text-[#15803d]" /> <span className="font-medium">{activeProp.real_address || 'Bogotá'}</span>
          <div className="w-px h-6 bg-gray-600 mx-2"></div>
          <div className="text-3xl font-bold flex items-center gap-2">
            {lang === 'es' ? `$${new Intl.NumberFormat('es-CO').format(activeProp.price_cop)}` : `USD $${new Intl.NumberFormat('en-US').format(activeProp.price_usd || 0)}`}
          </div>
        </div>
      </div>

      {/* CONTROLES */}
      <div className="absolute top-1/2 right-4 md:right-10 z-30 flex flex-col gap-4 -translate-y-1/2">
        <button onClick={() => changeSlide('prev')} className="p-4 border border-white/20 rounded-full hover:bg-[#15803d] hover:border-transparent transition-all"><ChevronLeft size={24}/></button>
        <button onClick={() => changeSlide('next')} className="p-4 border border-white/20 rounded-full hover:bg-[#15803d] hover:border-transparent transition-all"><ChevronRight size={24}/></button>
      </div>

      {/* MINIATURAS (GALERÍA) */}
      <div className="absolute bottom-24 left-6 md:left-24 z-30 hidden md:flex gap-4">
        {currentGallery.map((img, idx) => (
          <div key={idx} onClick={() => setActiveImage(img)} className={`relative h-20 w-32 cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:-translate-y-1 ${activeImage === img ? 'border-[#15803d] scale-105' : 'border-white/20 opacity-60 hover:opacity-100'}`}>
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      
      {/* CURVA */}
      <div className="absolute bottom-0 w-full z-20 leading-[0]">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] md:h-[100px]">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};
export default HeroSection;