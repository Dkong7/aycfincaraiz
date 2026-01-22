import React, { useState, useEffect, useRef, useCallback } from "react";
import { pb } from "../api";
import { Search, Filter, MapPin, Home, Bed, Bath, ArrowRight, LayoutGrid, Star, Crown, ArrowUp, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Property } from "../types/property";

const PB_URL = "http://209.126.77.41:8080";
// 1. HELPERS DE COLOR Y FORMATO
const getTypeColor = (type: string) => {
  const t = type?.toLowerCase() || "";
  if (t.includes("casa")) return "border-yellow-400 bg-yellow-50 text-yellow-800";
  if (t.includes("apartamento") || t.includes("apto")) return "border-blue-600 bg-blue-50 text-blue-800";
  if (t.includes("bodega")) return "border-amber-800 bg-amber-50 text-amber-900";
  if (t.includes("lote") || t.includes("terreno")) return "border-green-500 bg-green-50 text-green-800";
  if (t.includes("local")) return "border-pink-500 bg-pink-50 text-pink-800";
  if (t.includes("oficina")) return "border-emerald-500 bg-emerald-50 text-emerald-800";
  return "border-gray-200 bg-gray-50 text-gray-600"; 
};

const Properties = () => {
  // ESTADOS PRINCIPALES
  const [queen, setQueen] = useState<Property | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  
  // PAGINACIÓN REAL
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 15; // <--- CAMBIO: 15 items por carga

  const [showTopBtn, setShowTopBtn] = useState(false);

  // FILTROS
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  const observerTarget = useRef(null);

  // 1. CARGAR LA REINA (Solo una vez al inicio)
  useEffect(() => {
    const fetchQueen = async () => {
      try {
        const res = await pb.collection("properties").getList(1, 1, {
          filter: "is_opportunity=true",
          sort: "-updated", // La más recientemente actualizada
        });
        if (res.items.length > 0) setQueen(res.items[0] as unknown as Property);
      } catch (e) { console.error("Error Reina:", e); }
    };
    fetchQueen();
  }, []);

  // 2. FUNCIÓN DE CARGA (Con Paginación Real)
  const fetchProperties = useCallback(async (pageNum: number, isNewFilter: boolean) => {
    setLoading(true);
    
    try {
      // Construir filtro
      const conditions = ["is_opportunity=false"]; // Excluir reina del listado normal
      if (filters.keyword) conditions.push(`(title ~ "${filters.keyword}" || municipality ~ "${filters.keyword}" || ayc_id ~ "${filters.keyword}" || neighborhood ~ "${filters.keyword}")`);
      if (filters.type) conditions.push(`property_type = "${filters.type}"`);
      if (filters.minPrice) conditions.push(`price_cop >= ${filters.minPrice}`);
      if (filters.maxPrice) conditions.push(`price_cop <= ${filters.maxPrice}`);

      const filterString = conditions.join(" && ");

      // --- PETICIÓN REAL A POCKETBASE ---
      const result = await pb.collection("properties").getList(pageNum, ITEMS_PER_PAGE, {
        filter: filterString,
        sort: "-created", // Orden cronológico (Nuevas primero) para evitar duplicados del random
      });

      const newItems = result.items as unknown as Property[];

      if (isNewFilter) {
        setProperties(newItems);
      } else {
        setProperties(prev => [...prev, ...newItems]);
      }

      // Validar si quedan más páginas reales
      setHasMore(result.page < result.totalPages);

    } catch (error) {
      console.error("Error cargando inmuebles:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // 3. EFECTO: CAMBIO DE FILTROS (Resetea todo)
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProperties(1, true); // Página 1, es filtro nuevo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  // 4. EFECTO: SCROLL INFINITO (Carga siguiente página)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
            // Incrementamos página y hacemos la petición
            const nextPage = page + 1;
            setPage(nextPage);
            fetchProperties(nextPage, false); // No es filtro nuevo, es append
        }
      },
      { threshold: 0.5 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasMore, loading, page, fetchProperties]);

  // Efecto: Botón Top
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // MANEJADORES
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // RENDER CARD
  const PropertyCard = ({ data, isQueen = false }: { data: any, isQueen?: boolean }) => {
      const colorClass = getTypeColor(data.property_type);
      const isFav = data.is_ayc_favorite;
      
      let borderStyle = "";
      if (isQueen) {
          borderStyle = "border-0"; 
      } else if (isFav) {
          borderStyle = "border-green-500 border-4 shadow-green-100"; 
      } else {
          borderStyle = `${colorClass.split(" ")[0]} border-2`; 
      }

      return (
        <Link to={`/inmuebles/${data.id}`} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full hover:-translate-y-2 relative">
            <div className={`absolute inset-0 rounded-2xl pointer-events-none ${borderStyle} z-20`}></div>

            {/* IMAGEN */}
            <div className="h-64 relative overflow-hidden bg-gray-200">
                {data.images && data.images.length > 0 ? (
                    <img src={`${PB_URL}/api/files/${data.collectionId}/${data.id}/${data.images[0]}`} alt={data.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">SIN FOTO</div>
                )}
                
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-30">
                    {isQueen && <span className="bg-yellow-400 text-black font-black px-3 py-1 rounded-full text-[10px] uppercase flex items-center gap-1 shadow-md"><Crown size={12}/> Reina</span>}
                    {!isQueen && isFav && <span className="bg-green-600 text-white font-bold px-3 py-1 rounded-full text-[10px] uppercase flex items-center gap-1 shadow-md animate-pulse"><Star size={12} fill="currentColor"/> Favorito</span>}
                </div>

                <div className="absolute bottom-4 right-4 z-30">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase shadow-sm ${colorClass}`}>
                        {data.property_type}
                    </span>
                </div>
            </div>

            {/* INFO */}
            <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">{data.ayc_id}</span>
                        <div className="flex items-center gap-1 text-gray-500 text-xs uppercase font-bold">
                            <MapPin size={12} className="text-green-600"/> {data.municipality}
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#0A192F] line-clamp-2 mb-4 leading-tight">{data.title}</h3>
                    
                    <div className="flex gap-4 border-t border-gray-100 pt-4 mb-4 text-xs font-bold text-gray-500">
                        {data.specs && (() => {
                            try {
                                const s = typeof data.specs === 'string' ? JSON.parse(data.specs) : data.specs;
                                return (
                                    <>
                                        {(s.area_total || s.area_built) && <div className="flex items-center gap-1"><LayoutGrid size={14} className="text-gray-400"/> {s.area_total || s.area_built}m²</div>}
                                        {(s.rooms || s.habs) && <div className="flex items-center gap-1"><Bed size={14} className="text-gray-400"/> {s.rooms || s.habs}</div>}
                                        {(s.baths || s.bathrooms) && <div className="flex items-center gap-1"><Bath size={14} className="text-gray-400"/> {s.baths || s.bathrooms}</div>}
                                    </>
                                )
                            } catch { return null; }
                        })()}
                    </div>
                </div>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Precio</p>
                        <p className="text-green-700 font-black text-xl leading-none">
                            ${new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(data.price_cop)}
                        </p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-gray-100 group-hover:bg-green-600 group-hover:text-white flex items-center justify-center transition-all">
                        <ArrowRight size={14}/>
                    </div>
                </div>
            </div>
        </Link>
      );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pt-20">
      
      {/* HEADER PEQUEÑO */}
      <div className="bg-[#0A192F] py-12 px-6 text-center">
         <h1 className="text-3xl font-black text-white uppercase tracking-widest">Portafolio Exclusivo</h1>
         <p className="text-gray-400 text-sm mt-2">Encuentra tu espacio ideal con el código AYC o características</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
         
         {/* SIDEBAR BUSCADOR (IZQUIERDA) */}
         <div className="lg:col-span-1 h-fit bg-white p-6 rounded-2xl shadow-xl border-t-4 border-green-600 sticky top-28 z-40">
            <div className="flex items-center gap-2 mb-6 text-[#0A192F]">
               <Filter size={20} className="text-green-600"/>
               <h3 className="font-bold uppercase text-lg">Filtros</h3>
            </div>

            <div className="space-y-5">
               {/* KEYWORD */}
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Código AYC / Ubicación</label>
                  <div className="relative">
                     <Search size={16} className="absolute left-3 top-3 text-gray-400"/>
                     <input 
                       name="keyword"
                       value={filters.keyword}
                       onChange={handleFilterChange}
                       placeholder="Ej: AYC-1005 o Chicó" 
                       className="w-full bg-gray-100 border-none rounded-xl py-3 pl-10 pr-4 text-sm font-bold text-[#0A192F] focus:ring-2 focus:ring-green-600 outline-none"
                     />
                  </div>
               </div>

               {/* TIPO */}
               <div>
                  <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Tipo de Inmueble</label>
                  <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full bg-gray-100 rounded-xl py-3 px-4 text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-green-600">
                     <option value="">Todos</option>
                     <option value="Casa">Casa</option>
                     <option value="Apartamento">Apartamento</option>
                     <option value="Bodega">Bodega</option>
                     <option value="Lote">Lote</option>
                     <option value="Local">Local</option>
                     <option value="Oficina">Oficina</option>
                     <option value="Finca">Finca</option>
                  </select>
               </div>

               {/* PRECIO */}
               <div className="grid grid-cols-2 gap-3">
                  <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase">Min Precio</label>
                     <input type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} placeholder="$ 0" className="w-full bg-gray-100 rounded-lg p-2 text-xs"/>
                  </div>
                  <div>
                     <label className="text-[10px] font-bold text-gray-400 uppercase">Max Precio</label>
                     <input type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} placeholder="$ Sin límite" className="w-full bg-gray-100 rounded-lg p-2 text-xs"/>
                  </div>
               </div>

               {/* RESET */}
               {(filters.keyword || filters.type || filters.minPrice || filters.maxPrice) && (
                   <button 
                     onClick={() => setFilters({keyword: "", type: "", minPrice: "", maxPrice: ""})}
                     className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                   >
                     <X size={14}/> Limpiar Filtros
                   </button>
               )}
            </div>
         </div>

         {/* GRID DE RESULTADOS (DERECHA) */}
         <div className="lg:col-span-3">
            
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-xl font-bold text-[#0A192F] flex items-center gap-2">
                  <LayoutGrid size={20} className="text-green-600"/> 
                  Resultados
               </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* 1. LA REINA (Siempre arriba si no hay filtros) */}
               {queen && !filters.keyword && !filters.type && !filters.minPrice && !filters.maxPrice && (
                   <div className="md:col-span-2 relative group z-0">
                       <div className="absolute -inset-1 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-[2rem] blur opacity-40 group-hover:opacity-75 transition duration-1000 z-0"></div>
                       <PropertyCard data={queen} isQueen={true} />
                   </div>
               )}

               {/* 2. LISTADO REAL */}
               {properties.map((p) => (
                   <PropertyCard key={p.id} data={p} />
               ))}

               {/* SKELETON LOADER (Carga inicial) */}
               {loading && properties.length === 0 && !queen && [1,2,3,4].map(i => <div key={i} className="h-96 bg-gray-200 rounded-3xl animate-pulse"></div>)}
            </div>

            {/* MENSAJE DE VACÍO REAL */}
            {!loading && properties.length === 0 && !queen && !hasMore && (
               <div className="bg-white p-12 rounded-2xl text-center shadow-sm border border-gray-100 mt-8">
                  <Home size={48} className="mx-auto text-gray-300 mb-4"/>
                  <h3 className="text-xl font-bold text-gray-500">No encontramos inmuebles con esos filtros.</h3>
                  <button onClick={() => setFilters({keyword:"", type:"", minPrice:"", maxPrice:""})} className="mt-4 text-green-600 font-bold underline">Ver todos</button>
               </div>
            )}

            {/* LOADER INFERIOR / FIN DE LISTA */}
            <div ref={observerTarget} className="h-24 w-full mt-8 flex items-center justify-center">
                 {loading && properties.length > 0 && (
                    <div className="flex items-center gap-2 text-green-600 font-bold bg-white px-4 py-2 rounded-full shadow-sm">
                       <Loader2 size={18} className="animate-spin"/>
                       <span className="text-xs uppercase tracking-widest">Cargando página {page + 1}...</span>
                    </div>
                 )}
                 {!hasMore && properties.length > 0 && (
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                       Has llegado al final
                    </div>
                 )}
            </div>
         </div>
      </div>

      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all duration-500 z-50 ${showTopBtn ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ArrowUp size={24} strokeWidth={3} />
      </button>
    </div>
  );
};

export default Properties;