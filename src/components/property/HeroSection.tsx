import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Maximize, ArrowLeft } from "lucide-react";
import { useApp } from "../../context/AppContext"; // Importar Contexto
import { formatCurrency } from "../../utils/formatters";

export default function HeroSection({ prop, theme, mediaList, activeImg, onOpenLightbox }: any) {
  const { t, translateDynamic, currency } = useApp(); // Hook Global
  const currentMedia = mediaList[activeImg];

  // Lógica de Precio Dinámico (COP vs USD)
  const showUsd = currency === "USD" && Number(prop.price_usd) > 0;
  const displayPrice = showUsd ? prop.price_usd : prop.price_cop;
  const displayCurrency = showUsd ? "USD" : "COP";

  // Traducción Dinámica de Textos
  const title = translateDynamic(prop.title);
  const type = translateDynamic(prop.property_type);
  const neighborhood = translateDynamic(prop.neighborhood);
  const city = translateDynamic(prop.municipality || prop.address_text);

  return (
    <div 
      className="relative h-[60vh] md:h-[70vh] bg-gray-900 group cursor-pointer overflow-hidden"
      onClick={onOpenLightbox}
    >
        {currentMedia.type === 'video' ? (
            <div className="w-full h-full pointer-events-none scale-125 relative">
                <iframe 
                className="w-full h-full opacity-80"
                src={`https://www.youtube.com/embed/${currentMedia.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentMedia.src}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1`}
                title="Hero Video"
                allow="autoplay; encrypted-media"
                ></iframe>
            </div>
        ) : (
            <img src={currentMedia.src} className="w-full h-full object-cover transition-opacity duration-500 opacity-80" alt={title} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-90"></div>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-4 rounded-full backdrop-blur-sm text-white">
            <Maximize size={32}/>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto pt-32 cursor-auto" onClick={(e) => e.stopPropagation()}>
            <Link to="/inmuebles" className="inline-flex items-center text-gray-300 hover:text-white mb-6 text-xs font-bold uppercase tracking-wider bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 transition-all hover:bg-black/50">
               <ArrowLeft size={14} className="mr-2"/> {t('nav_properties') || "Volver"}
            </Link>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded mb-4 text-xs font-black uppercase tracking-widest ${theme.color} text-white shadow-lg`}>
                {theme.icon} {type}
            </div>
            
            <h1 className="text-3xl md:text-6xl font-black uppercase leading-tight mb-4 text-white drop-shadow-2xl max-w-4xl">
                {title || "Inmueble Sin Título"}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg font-medium mb-6 text-gray-200">
                <span className="flex items-center gap-1">
                    <MapPin size={20} className="text-green-400"/> 
                    {city}, {neighborhood}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded text-sm font-mono border border-white/20">{prop.ayc_id || "REF-XXX"}</span>
            </div>
            
            <div className="text-4xl md:text-5xl font-black text-green-400 drop-shadow-md flex items-baseline gap-2">
                {showUsd ? "$" : ""}{formatCurrency(displayPrice)} <span className="text-lg font-bold text-gray-400">{displayCurrency}</span>
            </div>
        </div>
    </div>
  );
}