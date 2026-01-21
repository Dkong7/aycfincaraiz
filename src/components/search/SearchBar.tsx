import React, { useState } from 'react';
import { X, ArrowRight, Search, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { pb } from '../../api';

export const SearchBar = () => {
  const { lang, translateDynamic } = useApp();
  
  const txt = {
    title: lang === 'ES' ? "¿Dónde quieres invertir?" : "Where do you want to invest?",
    placeholder: lang === 'ES' ? "Ej: Rosales, Apartamento, Chía..." : "Ex: Rosales, Apartment, Chía...",
    btn: lang === 'ES' ? "BUSCAR" : "SEARCH",
    results_title: lang === 'ES' ? "Resultados para:" : "Results for:",
    latest_title: lang === 'ES' ? "Oportunidades Recientes" : "Recent Opportunities",
    loading: lang === 'ES' ? "Consultando portafolio..." : "Scanning portfolio...",
    no_results_fallback: lang === 'ES' ? "Sin coincidencias exactas, mira estas oportunidades:" : "No exact matches, check these opportunities:",
    view_all: lang === 'ES' ? "Explorar todo el inventario" : "Explore full inventory"
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL;

  // 1. Guardar intención (Silencioso)
  const saveUserIntent = async (term: string) => {
    if (!term.trim()) return;
    try {
      await pb.collection('search_terms').create({ term: term, lang: lang, source: 'home_searchbar' });
    } catch (e) { /* Ignorar error */ }
  };

  // 2. Ejecutar Búsqueda
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalOpen(true);
    setLoading(true);
    setResults([]); 
    setIsFallback(false);

    if (query.trim()) saveUserIntent(query);

    try {
      let resultItems: any[] = [];

      // A. BÚSQUEDA ACTIVA
      if (query.trim()) {
         const q = query.replace(/["\\]/g, ""); 
         // Filtro limpio: PocketBase se encarga de mostrar solo lo "publicado" según tu regla API
         const searchFilter = `title ~ "${q}" || municipality ~ "${q}" || property_type ~ "${q}"`;
         
         const result = await pb.collection('properties').getList(1, 20, {
            sort: '-created',
            filter: searchFilter,
            requestKey: null 
         });
         resultItems = result.items;
      }

      // B. FALLBACK (Si está vacío o no hubo resultados)
      if (resultItems.length === 0) {
          setIsFallback(true);
          // Traemos 4 items (La regla API filtrará los no publicados automáticamente)
          const fallbackResult = await pb.collection('properties').getList(1, 4, {
              sort: '-created',
              requestKey: null
          });
          resultItems = fallbackResult.items;
      }

      setResults(resultItems);
      
    } catch (err) {
      console.error("Error búsqueda:", err);
      // Fallback de emergencia final
      try {
          const rescue = await pb.collection('properties').getList(1, 4, { sort: '-created', requestKey: null });
          setResults(rescue.items);
          setIsFallback(true);
      } catch (e) { setResults([]); }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BARRA FLOTANTE */}
      <div className="relative z-30 -mt-24 px-4 pb-12">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl p-6 md:p-8 border-t-4 border-[#15803d]">
           <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] text-center mb-6 uppercase tracking-tight">
             {txt.title}
           </h2>
           <form onSubmit={handleSearch} className="relative flex gap-2 shadow-sm rounded-xl bg-gray-50 border border-gray-200 p-1">
             <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#15803d] transition-colors" size={20}/>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={txt.placeholder} className="w-full h-full pl-12 bg-transparent outline-none text-lg text-[#0A192F] font-bold placeholder:font-normal placeholder:text-gray-400" />
             </div>
             <button type="submit" className="bg-[#15803d] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#0A192F] transition-all uppercase tracking-widest text-sm md:text-base shadow-lg active:scale-95">
               {txt.btn}
             </button>
           </form>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0A192F]/95 backdrop-blur-sm flex items-start justify-center p-4 pt-16 animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 border border-gray-200">
              
              {/* HEADER */}
              <div className="p-4 md:p-6 border-b border-gray-100 bg-white relative shrink-0 z-10 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-black text-[#0A192F] uppercase">
                        {isFallback ? txt.no_results_fallback : (query ? `${txt.results_title} "${query}"` : txt.latest_title)}
                    </h3>
                    {!loading && <p className="text-sm text-gray-400 font-medium">{results.length} propiedades encontradas</p>}
                  </div>
                  <button onClick={() => setModalOpen(false)} className="p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors">
                    <X size={24}/>
                  </button>
              </div>

              {/* LISTA */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                 {loading ? (
                    <div className="flex flex-col items-center justify-center h-60 gap-4">
                        <Loader2 className="animate-spin text-[#15803d]" size={48} />
                        <p className="text-lg font-bold text-[#0A192F] animate-pulse">{txt.loading}</p>
                    </div>
                 ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                       {results.length > 0 ? (
                           results.map(p => {
                               const imgUrl = p.images && p.images.length > 0
                                ? `${PB_URL}/api/files/${p.collectionId}/${p.id}/${p.images[0]}`
                                : null;
                               
                               const rawPrice = p.price_cop || 0;
                               const displayPrice = new Intl.NumberFormat('es-CO', { 
                                   style: 'currency', currency: 'COP', maximumFractionDigits: 0 
                               }).format(rawPrice);

                               return (
                                <Link to={`/inmuebles/${p.id}`} key={p.id} onClick={() => setModalOpen(false)} className="flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#15803d] hover:shadow-xl transition-all group h-full relative">
                                    <div className="h-56 bg-gray-200 relative overflow-hidden">
                                        {imgUrl ? (
                                            <img src={imgUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={p.title}/>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold">SIN FOTO</div>
                                        )}
                                        <div className="absolute top-3 right-3 bg-[#0A192F]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded shadow-md uppercase tracking-wider">
                                            {p.property_type || "Inmueble"}
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 pt-12">
                                            <p className="text-white font-bold text-lg truncate drop-shadow-md">{translateDynamic(p.title)}</p>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                                            <MapPin size={16} className="text-[#15803d]"/> 
                                            <span className="uppercase tracking-wider">{translateDynamic(p.municipality)}</span>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">Precio</p>
                                                <p className="text-[#15803d] font-black text-2xl leading-none">{displayPrice}</p>
                                            </div>
                                            <div className="bg-gray-100 p-2 rounded-full text-[#0A192F] group-hover:bg-[#15803d] group-hover:text-white transition-colors duration-300">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                               );
                           })
                       ) : (
                           <div className="col-span-full text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                               <Search className="mx-auto text-gray-300 mb-4" size={48} />
                               <p className="text-gray-500 text-lg font-medium">No hay datos disponibles.</p>
                           </div>
                       )}
                    </div>
                 )}
              </div>
              <div className="p-4 border-t border-gray-100 bg-white text-center shrink-0">
                 <Link to="/inmuebles" onClick={() => setModalOpen(false)} className="inline-flex items-center gap-2 text-[#0A192F] font-bold hover:text-[#15803d] uppercase tracking-widest transition-colors text-xs md:text-sm border-b-2 border-transparent hover:border-[#15803d] pb-1">
                    {txt.view_all} <ArrowRight size={16}/>
                 </Link>
              </div>
           </div>
        </div>
      )}
    </>
  );
};