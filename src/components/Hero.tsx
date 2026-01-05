import React, { useState, useEffect } from "react";

interface PropertyDB {
  id: string;
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
  description?: string;
}

interface HeroProps {
  properties: PropertyDB[]; 
  currency: "COP" | "USD";
  exchangeRate: number;
}

const Hero: React.FC<HeroProps> = ({ properties, currency, exchangeRate }) => {
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";
  
  // ÍNDICES
  const [propIndex, setPropIndex] = useState(0); // Qué casa estamos viendo
  const [imgIndex, setImgIndex] = useState(0);   // Qué foto de esa casa estamos viendo

  const list = Array.isArray(properties) && properties.length > 0 ? properties : [];
  
  // Propiedad Activa
  const activeProp = list[propIndex] || { 
    id: "", collectionId: "", title: "CARGANDO...", 
    price_cop: 0, images: [], property_type: "...", listing_type: "..." 
  };

  // Cuando cambiamos de propiedad, reiniciamos la foto a la primera (0)
  useEffect(() => {
    setImgIndex(0);
  }, [propIndex]);

  // --- NAVEGACIÓN ENTRE INMUEBLES (< >) ---
  const nextProperty = () => {
    setPropIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const prevProperty = () => {
    setPropIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  // --- DATOS VISUALES ---
  const title = activeProp.title;
  const category = activeProp.property_type || activeProp.listing_type || "INMUEBLE"; 
  const price = activeProp.price_cop;
  const location = activeProp.neighborhood || activeProp.municipality || activeProp.address || "Ubicación";
  
  const displayPrice = currency === "USD" 
     ? (activeProp.price_usd > 0 ? activeProp.price_usd : price / exchangeRate) 
     : price;

  const getCategoryColor = (cat: string) => {
    const n = cat?.toLowerCase() || "";
    if (n.includes("venta")) return "bg-blue-600";
    if (n.includes("arriendo")) return "bg-red-600";
    if (n.includes("lote")) return "bg-yellow-600";
    return "bg-green-600";
  };
  const categoryColor = getCategoryColor(activeProp.listing_type || category);

  // La imagen de fondo depende del imgIndex actual
  const currentImage = activeProp.images && activeProp.images.length > 0
    ? `${PB_URL}/api/files/${activeProp.collectionId}/${activeProp.id}/${activeProp.images[imgIndex]}`
    : null;

  return (
    <div className="relative w-full h-[95vh] bg-gray-900 overflow-hidden font-sans group select-none">
      
      {/* 1. IMAGEN DE FONDO (CAMBIA SEGÚN MINIATURA) */}
      <div key={`${activeProp.id}-${imgIndex}`} className="absolute inset-0 z-0 animate-fadeIn">
        {currentImage ? (
           <img 
             src={currentImage} 
             alt={title} 
             className="w-full h-full object-cover opacity-60 transition-transform duration-[2000ms] hover:scale-105"
           />
        ) : (
           <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <span className="text-gray-500 font-mono tracking-widest">SIN IMAGEN</span>
           </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-black/30"></div>
      </div>

      {/* 2. BOTONES GIGANTES DE NAVEGACIÓN (CAMBIAN DE INMUEBLE) */}
      {list.length > 1 && (
        <>
          <button 
            onClick={prevProperty}
            className="absolute left-0 top-0 bottom-0 z-40 w-24 flex items-center justify-center text-white/30 hover:text-white hover:bg-gradient-to-r hover:from-black/50 hover:to-transparent transition-all duration-300 group/nav"
          >
            <svg className="w-20 h-20 transform group-hover/nav:-translate-x-2 transition-transform drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button 
            onClick={nextProperty}
            className="absolute right-0 top-0 bottom-0 z-40 w-24 flex items-center justify-center text-white/30 hover:text-white hover:bg-gradient-to-l hover:from-black/50 hover:to-transparent transition-all duration-300 group/nav"
          >
            <svg className="w-20 h-20 transform group-hover/nav:translate-x-2 transition-transform drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
          </button>
        </>
      )}

      {/* 3. CURVA SVG */}
      <div className="absolute bottom-0 left-0 w-full h-[65%] z-10 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path fill="#059669" fillOpacity="0.9" d="M0,64L48,80C96,96,192,128,288,160C384,192,480,224,576,213.3C672,203,768,149,864,138.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* 4. CONTENIDO CENTRAL */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center mt-10">
        
        <span className={`${categoryColor} text-white text-xs font-bold px-4 py-1 rounded uppercase tracking-wider w-fit mb-4 shadow-lg backdrop-blur-sm`}>
          {category}
        </span>

        <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] uppercase max-w-5xl mb-6 drop-shadow-2xl">
          {title}
        </h1>

        <div className="mb-8">
          <h2 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg flex items-baseline">
            {currency === "USD" ? "$" : "$ "}
            {displayPrice?.toLocaleString(currency === "USD" ? "en-US" : "es-CO", { maximumFractionDigits: 0 })}
            <span className="text-2xl ml-3 font-normal text-green-400">{currency}</span>
          </h2>
          {currency === "USD" && (
             <div className="inline-block mt-2 bg-black/40 px-3 py-1 rounded border border-white/10">
                <p className="text-gray-300 text-sm font-mono">
                  TRM: ${exchangeRate.toLocaleString("es-CO")}
                </p>
             </div>
          )}
        </div>

        <div className="flex items-center text-gray-200 mb-10 text-xl font-medium tracking-wide">
          <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span className="uppercase">{location}</span>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-8">
          <button className="bg-white text-green-900 font-black py-4 px-10 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 transition-all flex items-center z-30">
            VER DETALLES <span className="ml-2 text-xl">→</span>
          </button>
          
          {/* 5. MINIATURAS (FOTOS DE LA MISMA CASA) */}
          {activeProp.images && activeProp.images.length > 0 && (
            <div className="flex gap-3 bg-black/40 p-2 rounded-2xl backdrop-blur-md border border-white/10 z-30 overflow-x-auto max-w-full">
               {activeProp.images.map((img, index) => (
                 <button 
                   key={index} 
                   onClick={() => setImgIndex(index)} 
                   className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${index === imgIndex ? "border-green-400 scale-110 shadow-lg ring-2 ring-green-500/50" : "border-transparent opacity-60 hover:opacity-100 grayscale hover:grayscale-0"}`}
                 >
                    <img 
                      src={`${PB_URL}/api/files/${activeProp.collectionId}/${activeProp.id}/${img}`} 
                      className="w-full h-full object-cover"
                      alt={`foto-${index}`}
                    />
                 </button>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Hero;
