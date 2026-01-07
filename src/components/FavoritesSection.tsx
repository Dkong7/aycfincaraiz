import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, CheckCircle2, Bed, Bath, Car, Ruler, Crown, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Interfaz completa
interface Property { 
  id: string; 
  collectionId: string; 
  title: string; 
  property_type: string; 
  price_cop: number; 
  price_usd?: number;
  images: string[]; 
  municipality: string;
  neighborhood?: string;
  is_opportunity?: boolean;
  is_ayc_favorite?: boolean;
  specs?: any;
  description?: string;
}

const FavoritesSection: React.FC<{ properties: Property[], currency: string, exchangeRate: number }> = ({ properties, currency, exchangeRate }) => {
  const { translateDynamic } = useLanguage(); 
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

  const safeTranslate = (text: string) => translateDynamic ? translateDynamic(text) : text;

  // 1. Encontrar a la "Reina" (Oportunidad)
  const queenProp = properties.find(p => p.is_opportunity);
  
  // 2. Encontrar los 4 Favoritos (excluyendo a la reina)
  const favoriteProps = properties
    .filter(p => p.is_ayc_favorite && p.id !== queenProp?.id)
    .slice(0, 4);

  if (!queenProp && favoriteProps.length === 0) return null;

  const getPrice = (p: Property) => {
      const val = currency === 'USD' 
        ? (p.price_usd || p.price_cop / exchangeRate) 
        : p.price_cop;
      return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'es-CO', { maximumFractionDigits: 0 }).format(val);
  };

  const getSpecs = (p: Property) => {
      try { return typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs || {}; } catch { return {}; }
  };

  return (
    <div className="w-full bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-6 space-y-20">
        
        {/* --- SECCIÓN 1: LA REINA (LAYOUT 30/70) --- */}
        {queenProp && (
            <div className="flex flex-col lg:flex-row gap-10 items-center">
                
                {/* 30% IZQUIERDA: INFORMACIÓN Y RAZONES (ANIMADO) */}
                <div className="w-full lg:w-[30%] lg:basis-[30%] flex flex-col justify-center space-y-8 z-10 order-2 lg:order-1">
                    
                    {/* Header Info */}
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-200 mb-4 shadow-sm">
                            <Crown size={16} fill="currentColor" className="text-yellow-500"/> 
                            {safeTranslate("Oportunidad Dorada")}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1]">
                            {safeTranslate(queenProp.title)}
                        </h2>
                        <p className="text-gray-500 mt-3 flex items-center gap-2 text-sm uppercase font-bold tracking-wide">
                            <MapPin size={16} className="text-yellow-500"/>
                            {safeTranslate(queenProp.neighborhood || queenProp.municipality)}
                        </p>
                    </div>

                    {/* RAZONES (ANIMACIÓN EN CASCADA) */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group hover:border-yellow-200 transition-colors">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{safeTranslate("Por qué es la favorita:")}</p>
                        <ul className="space-y-4">
                            {[
                                "Precio por debajo del mercado actual.",
                                "Ubicación estratégica de alta valorización.",
                                "Espacios únicos y acabados premium."
                            ].map((reason, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium animate-in slide-in-from-left-4 fade-in duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
                                    <div className="mt-0.5 bg-green-100 p-1 rounded-full text-green-600">
                                        <CheckCircle2 size={14} strokeWidth={3}/>
                                    </div>
                                    {safeTranslate(reason)}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Precio y Botón */}
                    <div className="pt-2 animate-in fade-in duration-1000 delay-300">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1 tracking-wider">{safeTranslate("Precio de Venta")}</p>
                        <div className="text-4xl lg:text-5xl font-black text-green-600 mb-8 flex items-baseline gap-1 tracking-tight">
                            {currency === 'USD' ? '$' : '$'} {getPrice(queenProp)} <span className="text-lg text-gray-400 font-medium">{currency}</span>
                        </div>
                        <Link to={`/inmuebles/${queenProp.id}`} className="group relative w-full overflow-hidden rounded-xl bg-gray-900 px-8 py-4 text-white shadow-xl transition-all hover:bg-black hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3">
                            <span className="font-black uppercase tracking-widest text-sm relative z-10">{safeTranslate("VER DETALLES")}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10"/>
                            {/* Brillo botón */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000"></div>
                        </Link>
                    </div>
                </div>

                {/* 70% DERECHA: IMAGEN (RESPLANDOR DORADO) */}
                <div className="w-full lg:w-[70%] lg:basis-[70%] relative group order-1 lg:order-2">
                    {/* EFECTO RESPLANDOR DORADO (INTACTO) */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300 via-orange-200 to-yellow-400 rounded-[2rem] blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
                    
                    <div className="relative h-[450px] lg:h-[600px] w-full rounded-[1.5rem] overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.2)] border-[6px] border-white z-10">
                        <img 
                            src={`${PB_URL}/api/files/${queenProp.collectionId}/${queenProp.id}/${queenProp.images?.[0]}`} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]"
                            alt={queenProp.title}
                        />
                        
                        {/* Etiqueta Tipo */}
                        <div className="absolute top-8 left-8">
                            <div className="bg-yellow-400 text-yellow-950 px-4 py-1.5 rounded-lg font-black uppercase text-xs tracking-widest shadow-lg">
                                {safeTranslate(queenProp.property_type)}
                            </div>
                        </div>

                        {/* Specs flotantes de la Reina */}
                        <div className="absolute bottom-8 left-8 right-8">
                            <div className="bg-black/60 backdrop-blur-xl rounded-2xl p-5 flex justify-around items-center border border-white/10 text-white shadow-2xl">
                                {(() => {
                                    const s = getSpecs(queenProp);
                                    return (
                                        <>
                                            {(s.area_built || s.area_total) && <div className="flex flex-col items-center gap-1"><Ruler size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.area_built || s.area_total} m²</span></div>}
                                            <div className="w-px h-8 bg-white/20"></div>
                                            {(s.habs || s.rooms) && <div className="flex flex-col items-center gap-1"><Bed size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.habs || s.rooms}</span></div>}
                                            <div className="w-px h-8 bg-white/20"></div>
                                            {(s.baths || s.bathrooms) && <div className="flex flex-col items-center gap-1"><Bath size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.baths || s.bathrooms}</span></div>}
                                            <div className="w-px h-8 bg-white/20"></div>
                                            {s.garages && <div className="flex flex-col items-center gap-1"><Car size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.garages}</span></div>}
                                        </>
                                    )
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* --- SEPARADOR --- */}
        {queenProp && favoriteProps.length > 0 && <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>}

        {/* --- SECCIÓN 2: FAVORITOS AYC (GRID) --- */}
        {favoriteProps.length > 0 && (
            <div>
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-10 w-1.5 bg-green-600 rounded-full"></div>
                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">
                        {safeTranslate("Favoritos AYC")} <Star className="text-green-500 fill-green-500" size={24}/>
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {favoriteProps.map((prop) => {
                        const s = getSpecs(prop);
                        return (
                            <Link key={prop.id} to={`/inmuebles/${prop.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
                                {/* Imagen */}
                                <div className="h-64 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img 
                                        src={`${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${prop.images?.[0]}`} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        alt={prop.title}
                                    />
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-white/20 shadow-sm">
                                            {safeTranslate(prop.property_type)}
                                        </span>
                                    </div>
                                </div>

                                {/* Contenido */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
                                        {safeTranslate(prop.title)}
                                    </h4>
                                    
                                    <div className="flex items-center gap-2 text-xs text-gray-400 uppercase font-bold mb-6">
                                        <MapPin size={14} className="text-green-500"/> 
                                        <span className="truncate">{safeTranslate(prop.neighborhood || prop.municipality)}</span>
                                    </div>

                                    {/* Iconos Specs Grid */}
                                    <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100 mb-5">
                                        {(s.habs || s.rooms) && <div className="flex flex-col items-center justify-center p-1"><Bed size={18} className="text-gray-400 mb-1"/><span className="text-xs font-bold text-gray-700">{s.habs || s.rooms}</span></div>}
                                        {(s.baths || s.bathrooms) && <div className="flex flex-col items-center justify-center p-1 border-l border-gray-100"><Bath size={18} className="text-gray-400 mb-1"/><span className="text-xs font-bold text-gray-700">{s.baths || s.bathrooms}</span></div>}
                                        {(s.area_built || s.area_total) && <div className="flex flex-col items-center justify-center p-1 border-l border-gray-100"><Ruler size={18} className="text-gray-400 mb-1"/><span className="text-xs font-bold text-gray-700">{s.area_built || s.area_total}</span></div>}
                                    </div>

                                    <div className="mt-auto flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Precio</p>
                                            <p className="text-green-700 font-black text-xl leading-none">
                                                {currency === 'USD' ? '$' : '$'} {getPrice(prop)}
                                            </p>
                                        </div>
                                        <div className="h-8 w-8 rounded-full bg-gray-100 group-hover:bg-green-600 flex items-center justify-center transition-colors">
                                            <ArrowRight size={16} className="text-gray-400 group-hover:text-white"/>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};
export default FavoritesSection;