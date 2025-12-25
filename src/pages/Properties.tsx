import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath, faRulerCombined, faFilter, faSpinner, faMapMarkerAlt, faHashtag } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../context/AppContext";

const Properties = () => {
  const { t, formatPrice, lang } = useApp();
  const [searchParams] = useSearchParams();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "all");
  const [codeFilter, setCodeFilter] = useState(searchParams.get("code") || "");

  useEffect(() => {
    fetchProperties();
  }, [lang]); // Recargar si cambia el idioma (opcional, pero asegura refresco)

  const fetchProperties = async () => {
    setLoading(true);
    let query = supabase.from("properties").select("*");

    if (typeFilter && typeFilter !== "all") {
       query = query.ilike("property_type", `%${typeFilter}%`);
    }

    if (codeFilter) {
       const codeNum = parseInt(codeFilter);
       if (!isNaN(codeNum)) {
          query = query.eq("listing_id", codeNum);
       }
    }

    const { data, error } = await query;
    if (data) setProperties(data);
    setLoading(false);
  };

  const getTypeColor = (type: string) => {
    switch(type?.toLowerCase()) {
      case 'apartamento': return 'bg-blue-600';
      case 'casa': return 'bg-green-600';
      case 'casa campestre': return 'bg-purple-700';
      case 'bodega': return 'bg-orange-600';
      case 'local': return 'bg-amber-600';
      case 'oficina': return 'bg-indigo-600';
      default: return 'bg-slate-700';
    }
  };

  // Helper de traducción
  const getLoc = (es: any, en: any) => (lang === 'EN' && en) ? en : es;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 uppercase tracking-wider border-b pb-4">{t("nav_properties")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTROS */}
          <div className="lg:col-span-1">
             <div className="bg-white p-6 rounded-xl shadow-lg sticky top-28 border-t-4 border-blue-900">
                <h2 className="font-bold text-lg mb-6 text-gray-800 flex items-center gap-2">
                   <FontAwesomeIcon icon={faFilter} className="text-blue-900" /> {t("filter_title")}
                </h2>
                
                <div className="space-y-5">
                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase block mb-2">{t("filter_code")}</label>
                      <div className="relative">
                        <input 
                           type="number" 
                           placeholder="Ej: 1001" 
                           value={codeFilter}
                           onChange={(e) => setCodeFilter(e.target.value)}
                           className="w-full p-3 pl-9 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm"
                        />
                        <FontAwesomeIcon icon={faHashtag} className="absolute left-3 top-3.5 text-gray-400 text-xs" />
                      </div>
                   </div>

                   <div>
                      <label className="text-xs font-bold text-gray-500 uppercase block mb-2">{t("filter_type")}</label>
                      <select 
                         value={typeFilter}
                         onChange={(e) => setTypeFilter(e.target.value)}
                         className="w-full p-3 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none text-sm font-medium"
                      >
                         <option value="all">Todas / All</option>
                         <option value="Apartamento">Apartamento / Apartment</option>
                         <option value="Casa">Casa / House</option>
                         <option value="Casa Campestre">Casa Campestre / Country House</option>
                         <option value="Bodega">Bodega / Warehouse</option>
                         <option value="Local">Local</option>
                         <option value="Oficina">Oficina / Office</option>
                      </select>
                   </div>

                   <button 
                      onClick={fetchProperties}
                      className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg hover:bg-blue-800 transition shadow-md uppercase text-sm tracking-wide"
                   >
                      {t("filter_search")}
                   </button>
                </div>
             </div>
          </div>

          {/* LISTADO RESULTADOS */}
          <div className="lg:col-span-3">
             <div className="mb-4 text-gray-500 text-sm">
                {properties.length} {lang === 'EN' ? 'Properties found' : 'Inmuebles encontrados'}
             </div>

             {loading ? (
                <div className="flex justify-center py-20"><FontAwesomeIcon icon={faSpinner} spin className="text-4xl text-blue-900" /></div>
             ) : properties.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center shadow-sm">
                   <p className="text-gray-400 text-lg">No matches found.</p>
                   <button onClick={() => { setTypeFilter("all"); setCodeFilter(""); fetchProperties(); }} className="mt-4 text-blue-900 font-bold underline">Reset Filters</button>
                </div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {properties.map((prop) => (
                      <Link to={`/inmuebles/${prop.id}`} key={prop.id} className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col relative">
                         
                         <div className="h-52 overflow-hidden relative bg-gray-200">
                            {prop.images && prop.images[0] ? (
                               <img src={prop.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={prop.title} />
                            ) : (
                               <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                            
                            {/* TAG TIPO: COLOR ES, TEXTO TRADUCIDO */}
                            <div className={`absolute top-2 left-2 ${getTypeColor(prop.property_type)} text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide z-10`}>
                               {getLoc(prop.property_type, prop.property_type_en)}
                            </div>

                            <div className="absolute top-2 right-2 bg-white/90 text-blue-900 text-xs font-bold px-2 py-1 rounded shadow-sm z-10 border border-gray-200">
                               ID: {prop.listing_id || "N/A"}
                            </div>

                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4">
                               <p className="text-white font-bold text-lg">{formatPrice(prop.price)}</p>
                            </div>
                         </div>

                         <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-gray-800 text-sm mb-1 leading-tight group-hover:text-blue-900 transition line-clamp-1">
                               {getLoc(prop.title, prop.title_en)}
                            </h3>
                            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                               <FontAwesomeIcon icon={faMapMarkerAlt} /> {getLoc(prop.city, prop.city_en)}
                            </p>
                            
                            <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between text-gray-500 text-xs font-medium">
                               <span><FontAwesomeIcon icon={faBed} /> {prop.rooms}</span>
                               <span><FontAwesomeIcon icon={faBath} /> {prop.bathrooms}</span>
                               <span><FontAwesomeIcon icon={faRulerCombined} /> {prop.area_built}m²</span>
                            </div>
                         </div>
                      </Link>
                   ))}
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Properties;
