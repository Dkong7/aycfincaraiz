import React, { useState } from 'react';
import useSWR from 'swr';
import { supabase } from '../../supabaseClient';
import { Search, MapPin } from 'lucide-react';

const fetchLocations = async () => {
  const { data, error } = await supabase.rpc('get_unique_locations'); 
  // Si no tienes la función RPC, usa un select simple:
  // const { data } = await supabase.from('properties').select('address_visible');
  return data || [];
};

const QuickSearch = () => {
  const [query, setQuery] = useState('');
  
  // SWR: Cache de ubicaciones por 1 hora para no tocar la DB Nano innecesariamente
  const { data: locations } = useSWR('unique-locations', fetchLocations, {
    revalidateOnFocus: false,
    dedupingInterval: 3600000 
  });

  return (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-500">
      <h2 className="text-2xl font-black text-[#051124] uppercase tracking-tighter mb-6 text-center">
        ¿Qué zona te interesa?
      </h2>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#009B4D]" size={20} />
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: Rosales, Chicó, Cedritos..."
            className="w-full p-5 pl-12 bg-gray-50 rounded-2xl text-xs font-black outline-none border-2 border-transparent focus:border-[#009B4D] transition-all"
          />
        </div>
        <button className="bg-[#009B4D] text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#051124] transition-all shadow-lg active:scale-95">
          Buscar
        </button>
      </div>
    </div>
  );
};

export default QuickSearch;