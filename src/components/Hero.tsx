import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bed, Bath, Car, Ruler, MapPin, Play } from "lucide-react";
import { useApp } from "../context/AppContext"; // 1. CAMBIO: CONTEXTO NUEVO

// Interfaces
interface PropertyDB {
  id: string;
  ayc_id?: string;
  collectionId: string;
  title: string;
  property_type: string;
  listing_type: string;
  price_cop: number;
  price_usd?: number;
  municipality: string;
  neighborhood?: string;
  address?: string;
  images: string[];
  video_url?: string;
  specs?: any;
}

interface HeroProps {
  properties: PropertyDB[];
  currency: "COP" | "USD";
  exchangeRate: number;
}

interface MediaItem {
  type: 'video' | 'image';
  src: string;
  thumb?: string;
}

const Hero: React.FC<HeroProps> = ({ properties, currency, exchangeRate }) => {
  // 2. USAR EL NUEVO CONTEXTO
  // En lugar de translateDynamic, usamos 't' que ya viene conectado
  const { t } = useApp(); 

  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";
  
  const [propIndex, setPropIndex] = useState(0); 
  const [mediaIndex, setMediaIndex] = useState(0); 

  const list = Array.isArray(properties) && properties.length > 0 ? properties : [];
  
  const activeProp = list[propIndex] || { 
    id: "", collectionId: "", title: "CARGANDO...", 
    price_cop: 0, images: [], property_type: "", listing_type: "", video_url: ""
  };

  // Resetear índice de media al cambiar de propiedad
  useEffect(() => { setMediaIndex(0); }, [propIndex]);

  const nextProperty = () => setPropIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  const prevProperty = () => setPropIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));

  // --- LÓGICA AUTO-PLAY (7 SEGUNDOS) ---
  useEffect(() => {
    if (list.length <= 1) return;
    const interval = setInterval(() => { nextProperty(); }, 7000); 
    return () => clearInterval(interval); 
  }, [list.length]);

  let specs: any = {};
  try { specs = typeof activeProp.specs === "string" ? JSON.parse(activeProp.specs) : activeProp.specs || {}; } catch(e) { specs = {}; }

  // --- DATOS VISUALES (TRADUCIDOS CON 't') ---
  // Nota: Si el título viene de DB, se muestra directo. Si es una key fija, usamos t()
  // Para datos dinámicos como 'property_type', usamos t() si queremos traducirlo (ej: Casa -> House)
  const title = activeProp.title || "";
  const categoryType = t(activeProp.property_type) || activeProp.property_type; 
  const categoryListing = activeProp.listing_type || "Venta"; // Esto podría necesitar traducción t() si tienes las keys
  const price = activeProp.price_cop;
  
  const rawLocation = activeProp.neighborhood || activeProp.municipality || "Ubicación";
  const location = rawLocation; // Nombres propios no se suelen traducir

  const usdPrice = activeProp.price_usd || 0;
  const displayPrice = currency === "USD" ? (usdPrice > 0 ? usdPrice : price / exchangeRate) : price;

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const videoId = getYoutubeId(activeProp.video_url || "");

  // --- LISTA UNIFICADA MEDIA ---
  const mediaList: MediaItem[] = [
      ...(videoId ? [{ type: 'video' as const, src: videoId, thumb: `https://img.youtube.com/vi/${videoId}/default.jpg` }] : []),
      ...(activeProp.images?.map(img => ({ 
          type: 'image' as const, 
          src: `${PB_URL}/api/files/${activeProp.collectionId}/${activeProp.id}/${img}` 
      })) || [])
  ];

  const currentMedia = mediaList[mediaIndex];

  const getColors = (type: string) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("casa")) return ["#EAB308", "bg-yellow-500 text-yellow-950 border-yellow-400"];
    if (t.includes("apartamento")) return ["#2563EB", "bg-blue-600 text-white border-blue-500"];
    if (t.includes("bodega")) return ["#92400E", "bg-amber-800 text-amber-100 border-amber-700"];
    if (t.includes("lote") || t.includes("terreno")) return ["#16A34A", "bg-green-600 text-white border-green-500"];
    if (t.includes("local")) return ["#EC4899", "bg-pink-500 text-white border-pink-400"];
    return ["#059669", "bg-gray-800 text-white"]; 
  };
  const [waveColor, tagColorClass] = getColors(activeProp.property_type);

  return (
    <div className="relative w-full h-[95vh] bg-gray-900 overflow-hidden font-sans group select-none">
      
      {/* 1. FONDO */}
      <div key={`${activeProp.id}-${mediaIndex}`} className="absolute inset-0 z-0 animate-fadeIn">
        {currentMedia?.type === 'video' ? (
            <div className="w-full h-full pointer-events-none scale-150 relative">
                <iframe 
                    className="w-full h-full opacity-80" 
                    src={`https://www.youtube.com/embed/${currentMedia.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentMedia.src}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
                    title="Hero Video"
                    allow="autoplay; encrypted-media"
                    style={{ pointerEvents: 'none' }}
                ></iframe>
                <div className="absolute inset-0 z-10"></div>
            </div>
        ) : currentMedia?.type === 'image' ? (
           <img src={currentMedia.src} alt={title} className="w-full h-full object-cover opacity-80 transition-transform duration-[7000ms] ease-linear hover:scale-105"/> 
        ) : (
           <div className="w-full h-full bg-gray-800 flex items-center justify-center"><span className="text-gray-500 font-mono tracking-widest">SIN IMAGEN</span></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/40 z-20"></div>
      </div>

      {/* 2. FLECHAS */}
      {list.length > 1 && (
        <>
          <button onClick={prevProperty} className="absolute left-0 top-0 bottom-0 z-40 w-16 md:w-24 flex items-center justify-center text-white/30 hover:text-white hover:bg-gradient-to-r hover:from-black/50 hover:to-transparent transition-all">
            <svg className="w-12 h-12 md:w-20 md:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={nextProperty} className="absolute right-0 top-0 bottom-0 z-40 w-16 md:w-24 flex items-center justify-center text-white/30 hover:text-white hover:bg-gradient-to-l hover:from-black/50 hover:to-transparent transition-all">
            <svg className="w-12 h-12 md:w-20 md:h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      {/* 3. ONDA DINÁMICA */}
      <div className="absolute bottom-0 left-0 w-full h-[33%] z-10 pointer-events-none transition-colors duration-1000">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path fill={waveColor} fillOpacity="0.3" d="M0,64L48,80C96,96,192,128,288,160C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* 4. CONTENIDO */}
      <div className="relative z-30 container mx-auto px-6 h-full flex flex-col justify-center md:justify-start md:pt-40 pb-20">
        <div className="flex flex-wrap gap-2 mb-4 animate-fadeIn">
            <span className={`${tagColorClass} text-[10px] md:text-xs font-bold px-3 py-1 rounded border uppercase tracking-wider shadow-lg backdrop-blur-sm`}>{categoryType}</span>
            <span className="bg-white/20 text-white border border-white/30 text-[10px] md:text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-lg backdrop-blur-sm">{categoryListing}</span>
        </div>

        <h1 className="text-3xl md:text-6xl font-black text-white leading-[0.9] uppercase max-w-3xl mb-4 drop-shadow-2xl line-clamp-2 text-left animate-slideUp">{title}</h1>

        <div className="mb-6 animate-slideUp" style={{animationDelay: '100ms'}}>
          <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg flex flex-wrap items-baseline gap-2 text-left">
            <span>{currency === "USD" ? "$" : "$ "}</span>
            <span>{displayPrice?.toLocaleString(currency === "USD" ? "en-US" : "es-CO", { maximumFractionDigits: 0 })}</span>
            <span className="text-lg md:text-xl font-normal text-green-400">{currency}</span>
          </h2>
        </div>

        <div className="flex items-center text-gray-100 mb-6 text-base md:text-lg font-medium tracking-wide text-left animate-slideUp" style={{animationDelay: '200ms'}}>
          <MapPin className="w-5 h-5 mr-2 text-green-500" /> <span className="uppercase">{location}</span>
        </div>

        <div className="flex flex-wrap gap-3 mb-8 text-white/90 text-sm animate-slideUp" style={{animationDelay: '300ms'}}>
             {(specs.habs || specs.rooms) && <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10"><Bed size={16} className="text-green-400"/> <span className="font-bold">{specs.habs || specs.rooms}</span></div>}
             {(specs.baths || specs.bathrooms) && <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10"><Bath size={16} className="text-green-400"/> <span className="font-bold">{specs.baths || specs.bathrooms}</span></div>}
             {specs.garages && <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10"><Car size={16} className="text-green-400"/> <span className="font-bold">{specs.garages}</span></div>}
             {(specs.area_built || specs.area_total) && <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg border border-white/10"><Ruler size={16} className="text-green-400"/> <span className="font-bold">{specs.area_built || specs.area_total} m²</span></div>}
        </div>

        <div className="flex flex-col items-start gap-6 w-full max-w-4xl animate-slideUp" style={{animationDelay: '400ms'}}>
          <Link to={`/inmuebles/${activeProp.id}`} className="bg-white text-green-900 font-black py-3 px-8 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all flex items-center z-30 uppercase text-xs md:text-sm">
             {t('hero_btn')} <span className="ml-2 text-lg">→</span>
          </Link>
          
          {/* MINIATURAS (VIDEO PRIMERO) */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
              <div className="flex gap-3">
                   {mediaList.map((media, index) => (
                       <button 
                           key={index} 
                           onClick={() => setMediaIndex(index)} 
                           className={`relative w-28 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${mediaIndex === index ? "border-green-400 scale-105 shadow-xl ring-2 ring-green-400/50" : "border-white/20 opacity-70 hover:opacity-100"}`}
                       >
                           {media.type === 'video' ? (
                               <>
                                 <img src={media.thumb} className="w-full h-full object-cover" alt="Video"/>
                                 <div className="absolute inset-0 flex items-center justify-center bg-black/40"><Play size={24} className="text-white fill-white"/></div>
                                 <div className="absolute bottom-0 w-full bg-red-600 text-white text-[8px] font-bold text-center py-0.5">VIDEO</div>
                               </>
                           ) : (
                               <img src={media.src} className="w-full h-full object-cover" alt={`Thumb ${index}`}/>
                           )}
                       </button>
                   ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;