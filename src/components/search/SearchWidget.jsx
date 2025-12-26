import React from 'react';
import { Search } from 'lucide-react';
const SearchWidget = () => (
  <div className="w-full max-w-2xl mx-auto -mt-24 relative z-20 px-4">
    <div className="bg-[#111] border border-gray-800 p-8 rounded-2xl shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-2">¿Qué zona te interesa?</h2>
      <p className="text-gray-400 mb-6 text-sm">Nuestro equipo élite realizará la búsqueda exclusiva.</p>
      <div className="relative">
        <input type="text" placeholder="Ej: Marsella, Chía..." className="w-full bg-[#1a1a1a] border border-gray-700 text-white p-4 pl-12 rounded-xl outline-none focus:border-[#39FF14]" />
        <Search className="absolute left-4 top-4 text-gray-500" size={20} />
        <button className="absolute right-2 top-2 bg-[#39FF14] text-black font-bold px-6 py-2 rounded-lg hover:bg-[#32e012]">IR</button>
      </div>
    </div>
  </div>
);
export default SearchWidget;
