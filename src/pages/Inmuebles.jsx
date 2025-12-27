import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Search, Filter, MapPin, Home, DollarSign, Bed, Bath, Car, ArrowRight, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavbarCustom from '../components/layout/NavbarCustom';
import FooterCustom from '../components/layout/FooterCustom';
import { useLanguage } from '../context/LanguageContext';

const Inmuebles = () => {
  const { lang } = useLanguage();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // FILTROS
  const [filters, setFilters] = useState({
    keyword: '', // Sirve para AYC o Barrio
    type: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: ''
  });

  // CARGA INICIAL Y BÚSQUEDA
  const fetchProperties = async () => {
    setLoading(true);
    let query = supabase.from('properties').select('*').order('created_at', { ascending: false });

    // APLICAR FILTROS
    if (filters.keyword) {
       // Buscar por Código AYC O por Barrio (Case insensitive)
       const term = filters.keyword.toUpperCase();
       if(term.startsWith('AYC')) {
          query = query.eq('ayc_id', term); // Búsqueda exacta de código
       } else {
          query = query.ilike('address_visible', `%${filters.keyword}%`); // Búsqueda parcial barrio
       }
    }
    if (filters.type) query = query.eq('property_type', filters.type);
    if (filters.minPrice) query = query.gte('price_cop', filters.minPrice);
    if (filters.maxPrice) query = query.lte('price_cop', filters.maxPrice);
    
    // Filtros JSONB (Specs)
    if (filters.beds) query = query.gte('specs->>habs', filters.beds);
    if (filters.baths) query = query.gte('specs->>baths', filters.baths);

    const { data, error } = await query;
    if (data) setProperties(data);
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  // MANEJO DE CAMBIOS EN INPUTS
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <NavbarCustom />
      
      {/* HEADER PEQUEÑO */}
      <div className="bg-[#0A192F] pt-32 pb-12 px-6 text-center">
         <h1 className="text-3xl font-black text-white uppercase tracking-widest">Portafolio Exclusivo</h1>
         <p className="text-gray-400 text-sm mt-2">Encuentra tu espacio ideal con el código AYC o características</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
         
         {/* SIDEBAR BUSCADOR (IZQUIERDA) */}
         <div className="lg:col-span-1 h-fit bg-white p-6 rounded-2xl shadow-xl border-t-4 border-[#009B4D] sticky top-28">
            <div className="flex items-center gap-2 mb-6 text-[#0A192F]">
               <Filter size={20} className="text-[#009B4D]"/>
               <h3 className="font-bold uppercase text-lg">Filtros</h3>
            </div>

            <form onSubmit={handleSearch} className="space-y-5">
               {/* BUSCADOR INTELIGENTE */}
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Código AYC / Ubicación</label>
                  <div className="relative">
                     <Search size={16} className="absolute left-3 top-3 text-gray-400"/>
                     <input 
                       name="keyword"
                       value={filters.keyword}
                       onChange={handleFilterChange}
                       placeholder="Ej: AYC-1005 o Chicó" 
                       className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-bold text-[#0A192F] focus:ring-2 focus:ring-[#009B4D] outline-none"
                     />
                  </div>
               </div>

               {/* TIPO INMUEBLE */}
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo de Inmueble</label>
                  <select name="type" onChange={handleFilterChange} className="w-full bg-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#009B4D]">
                     <option value="">Todos</option>
                     <option value="Casa">Casa</option>
                     <option value="Apartamento">Apartamento</option>
                     <option value="Bodega">Bodega</option>
                     <option value="Lote">Lote</option>
                     <option value="CasaCampo">Casa Campo</option>
                  </select>
               </div>

               {/* RANGO PRECIO */}
               <div className="grid grid-cols-2 gap-3">
                  <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase">Min Precio</label>
                     <input type="number" name="minPrice" onChange={handleFilterChange} placeholder="$ 0" className="w-full bg-gray-100 rounded-lg p-2 text-xs"/>
                  </div>
                  <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase">Max Precio</label>
                     <input type="number" name="maxPrice" onChange={handleFilterChange} placeholder="$ Sin límite" className="w-full bg-gray-100 rounded-lg p-2 text-xs"/>
                  </div>
               </div>

               {/* HABITACIONES / BAÑOS (Solo residencial) */}
               <div className="grid grid-cols-2 gap-3">
                  <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Bed size={10}/> Habs</label>
                     <select name="beds" onChange={handleFilterChange} className="w-full bg-gray-100 rounded-lg p-2 text-xs">
                        <option value="">Cualquiera</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
                     </select>
                  </div>
                  <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1"><Bath size={10}/> Baños</label>
                     <select name="baths" onChange={handleFilterChange} className="w-full bg-gray-100 rounded-lg p-2 text-xs">
                        <option value="">Cualquiera</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
                     </select>
                  </div>
               </div>

               <button type="submit" className="w-full bg-[#009B4D] hover:bg-[#007a3d] text-white font-black py-4 rounded-xl uppercase text-xs tracking-widest shadow-lg transition-all flex items-center justify-center gap-2">
                  <Search size={16}/> Buscar Propiedades
               </button>
            </form>
         </div>

         {/* GRID DE RESULTADOS (DERECHA) */}
         <div className="lg:col-span-3">
            
            {/* HEADER RESULTADOS */}
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-[#0A192F] flex items-center gap-2">
                  <LayoutGrid size={20} className="text-[#009B4D]"/> Resultados ({properties.length})
               </h2>
               <div className="hidden md:block text-xs text-gray-400 font-medium">Mostrando más recientes primero</div>
            </div>

            {loading ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
                  {[1,2,3,4].map(i => <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>)}
               </div>
            ) : properties.length === 0 ? (
               <div className="bg-white p-12 rounded-2xl text-center shadow-sm">
                  <Home size={48} className="mx-auto text-gray-300 mb-4"/>
                  <h3 className="text-xl font-bold text-gray-500">No encontramos inmuebles con esos filtros.</h3>
                  <button onClick={() => {setFilters({keyword:'', type:'', minPrice:'', maxPrice:'', beds:'', baths:''}); fetchProperties();}} className="mt-4 text-[#009B4D] font-bold underline">Ver todos</button>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {properties.map(p => (
                     <Link to={`/inmuebles/${p.ayc_id}`} key={p.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
                        
                        {/* IMAGEN CARD */}
                        <div className="h-64 relative overflow-hidden bg-gray-200">
                           <img src={p.main_media_url} alt={p.address_visible} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                           
                           {/* TAG TIPO */}
                           <div className={`absolute top-4 left-4 px-3 py-1 bg-tag-${p.property_type} rounded text-[10px] font-black uppercase text-white shadow-md`}>
                              {p.property_type}
                           </div>

                           {/* PRECIO TAG */}
                           <div className="absolute bottom-4 right-4 bg-[#0A192F]/90 backdrop-blur text-white px-4 py-2 rounded-lg font-black text-lg shadow-lg border border-white/10">
                              ${new Intl.NumberFormat('es-CO', { notation: "compact" }).format(p.price_cop)}
                           </div>
                        </div>

                        {/* INFO CARD */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                           <div>
                              <div className="flex justify-between items-start mb-2">
                                 <h3 className="text-lg font-bold text-[#0A192F] line-clamp-1">{p.address_visible}</h3>
                                 <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{p.ayc_id}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-500 text-xs mb-4">
                                 <MapPin size={12} className="text-[#009B4D]"/> {p.real_address || 'Ubicación Privada'}
                              </div>
                              
                              {/* SPECS RESUMEN */}
                              <div className="flex gap-4 border-t border-gray-100 pt-4 mb-4">
                                 {p.specs?.habs && (
                                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                                       <Bed size={14} className="text-gray-400"/> {p.specs.habs} Hab
                                    </div>
                                 )}
                                 {p.specs?.baths && (
                                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                                       <Bath size={14} className="text-gray-400"/> {p.specs.baths} Baños
                                    </div>
                                 )}
                                 {p.specs?.area_built && (
                                    <div className="flex items-center gap-1 text-xs font-bold text-gray-600">
                                       <LayoutGrid size={14} className="text-gray-400"/> {p.specs.area_built}m²
                                    </div>
                                 )}
                              </div>
                           </div>

                           <div className="w-full py-3 rounded-lg bg-gray-50 group-hover:bg-[#009B4D] group-hover:text-white text-gray-500 font-bold text-xs uppercase text-center transition-colors flex items-center justify-center gap-2">
                              Ver Detalles <ArrowRight size={14}/>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            )}
         </div>
      </div>
      <FooterCustom />
    </div>
  );
};
export default Inmuebles;