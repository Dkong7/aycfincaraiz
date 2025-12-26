import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const BARRIOS = [
  "Rosales", "Chicó", "Santa Ana", "Cedritos", "Colina Campestre", 
  "Salitre", "Chapinero Alto", "Usaquén", "Santa Bárbara", 
  "Chía", "Cajicá", "Sopó", "La Calera", "Cota", "Tabio", "Tenjo",
  "Zona Franca", "Fontibón", "Montevideo", "Puente Aranda"
];

const Inmuebles = () => {
  const { t } = useLanguage();
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({ code: '', zone: '', type: 'Todos' });
  const [suggestions, setSuggestions] = useState([]);

  // Mock Data realista (simulando DB)
  const dummyProperties = [
    { id: 1, ayc_id: '1001', type: 'Apartamento', price: 1200000000, zone: 'Rosales', img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800' },
    { id: 2, ayc_id: '1002', type: 'Casa', price: 3500000000, zone: 'La Calera', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800' },
    { id: 3, ayc_id: '1003', type: 'Bodega', price: 25000000, zone: 'Fontibón', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800' },
    { id: 4, ayc_id: '1004', type: 'Apartamento', price: 850000000, zone: 'Chicó', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800' },
    { id: 5, ayc_id: '1005', type: 'CasaCampo', price: 4200000000, zone: 'Chía', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800' },
    { id: 6, ayc_id: '1006', type: 'Lote', price: 600000000, zone: 'Sopó', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800' },
  ];

  useEffect(() => { setProperties(dummyProperties); }, []);

  const handleZoneChange = (e) => {
    const val = e.target.value;
    setFilters({...filters, zone: val});
    if (val.length > 1) {
      setSuggestions(BARRIOS.filter(b => b.toLowerCase().includes(val.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (zone) => {
    setFilters({...filters, zone});
    setSuggestions([]);
  };

  const filtered = properties.filter(p => {
    const matchCode = p.ayc_id.includes(filters.code);
    const matchZone = p.zone.toLowerCase().includes(filters.zone.toLowerCase());
    const matchType = filters.type === 'Todos' || p.type === filters.type;
    return matchCode && matchZone && matchType;
  });

  return (
    <div className="pt-24 min-h-screen bg-gray-50 font-sans">
      {/* FILTROS */}
      <div className="bg-[#0A192F] text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
           <h1 className="text-3xl font-black uppercase mb-8 border-l-4 border-[var(--ayc-emerald)] pl-4">Encuentra tu Inmueble</h1>
           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                 <label className="text-xs font-bold text-gray-400 mb-1 block">CÓDIGO</label>
                 <div className="relative">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18}/>
                    <input type="text" placeholder="# Ej: 1001" className="w-full pl-10 p-3 rounded text-black font-bold outline-none" onChange={e => setFilters({...filters, code: e.target.value})} />
                 </div>
              </div>
              <div className="relative">
                 <label className="text-xs font-bold text-gray-400 mb-1 block">ZONA / BARRIO</label>
                 <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18}/>
                    <input type="text" value={filters.zone} placeholder="Ej: Rosales" className="w-full pl-10 p-3 rounded text-black font-bold outline-none" onChange={handleZoneChange} />
                 </div>
                 {suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white text-black rounded-b shadow-xl z-50 max-h-48 overflow-y-auto">
                       {suggestions.map(s => (
                          <div key={s} onClick={() => selectSuggestion(s)} className="p-2 hover:bg-gray-100 cursor-pointer text-sm font-bold border-b border-gray-100">{s}</div>
                       ))}
                    </div>
                 )}
              </div>
              <div>
                 <label className="text-xs font-bold text-gray-400 mb-1 block">TIPO</label>
                 <select className="w-full p-3 rounded text-black font-bold outline-none" onChange={e => setFilters({...filters, type: e.target.value})}>
                    <option value="Todos">Todos</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Bodega">Bodega</option>
                    <option value="Lote">Lote</option>
                    <option value="CasaCampo">Casa Campo</option>
                 </select>
              </div>
              <button className="bg-[var(--ayc-emerald)] py-3 rounded font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Buscar</button>
           </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 py-12">
         {filtered.length === 0 ? <div className="text-center text-gray-400 py-20">No se encontraron resultados.</div> : (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filtered.map(p => (
                 <div key={p.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                    <div className="h-64 bg-gray-200 relative overflow-hidden">
                       <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                       <span className={`absolute top-4 left-4 text-xs font-black px-3 py-1 rounded uppercase shadow-md bg-tag-${p.type}`}>{p.type}</span>
                    </div>
                    <div className="p-6">
                       <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-xl text-[#0A192F]">{p.zone}</h3>
                          <span className="text-xs font-bold text-gray-400">COD: {p.ayc_id}</span>
                       </div>
                       <p className="text-[var(--ayc-emerald)] font-black text-2xl mb-4">${new Intl.NumberFormat('es-CO').format(p.price)}</p>
                       <Link to="#" className="block w-full text-center py-3 border-2 border-[#0A192F] text-[#0A192F] font-black rounded hover:bg-[#0A192F] hover:text-white transition-all uppercase text-sm">
                          Ver Detalles
                       </Link>
                    </div>
                 </div>
              ))}
           </div>
         )}
      </div>
    </div>
  );
};
export default Inmuebles;
