import React, { useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';

const SearchModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de búsqueda (Aquí conectarás con Supabase)
    setTimeout(() => setLoading(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-4xl bg-[#111] border border-gray-800 rounded-2xl overflow-hidden relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X size={24} />
        </button>

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center">
            {/* LOADER INMOBILIARIO PERSONALIZADO */}
            <div className="w-16 h-16 border-4 border-t-[#39FF14] border-gray-700 rounded-full animate-spin mb-4"></div>
            <p className="text-[#39FF14] font-mono tracking-widest animate-pulse">BUSCANDO OPORTUNIDADES...</p>
          </div>
        ) : (
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-2">¿En qué zona buscas?</h2>
            <p className="text-gray-400 mb-8">Nuestro equipo élite rastreará el mercado por ti.</p>
            
            <form onSubmit={handleSearch} className="relative mb-10">
              <input 
                type="text" 
                placeholder="Ej: Marsella, Chía, Zona Franca..." 
                className="w-full bg-[#1a1a1a] border border-gray-700 text-white text-xl p-6 pl-16 rounded-xl focus:border-[#39FF14] focus:ring-1 focus:ring-[#39FF14] outline-none transition-all"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Search className="absolute left-6 top-7 text-gray-500" size={24} />
              <button type="submit" className="absolute right-4 top-4 bg-[#39FF14] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#32e012] transition-colors">
                BUSCAR
              </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Bogotá Norte', 'Chía', 'Cajicá', 'Zona Industrial'].map(zone => (
                <button key={zone} className="flex items-center gap-2 text-gray-400 hover:text-white hover:bg-white/5 p-3 rounded-lg transition-colors border border-transparent hover:border-gray-700">
                  <MapPin size={16} className="text-[#39FF14]" /> {zone}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchModal;
