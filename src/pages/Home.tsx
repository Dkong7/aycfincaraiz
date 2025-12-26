import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faGavel, faVideo, faArrowRight, faStar, faGem, faShieldAlt, faPercent, faMapMarkedAlt, faPaperPlane, faCity 
} from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const { formatPrice, t, lang } = useApp();
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quickCode, setQuickCode] = useState("");
  
  // BÚSQUEDA ZONAL
  const [zoneInput, setZoneInput] = useState("");
  const [zoneResults, setZoneResults] = useState<any[]>([]);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [searchingZone, setSearchingZone] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase.from("properties").select("*").limit(5);
      if (data) setFeatured(data);
    };
    const fetchBlog = async () => {
      const { data } = await supabase.from("blogs").select("*").eq("active", true).order("created_at", { ascending: false }).limit(3);
      if (data) setBlogPosts(data);
    };
    fetchFeatured();
    fetchBlog();
  }, []);

  const nextProp = () => setCurrentIdx((prev) => (prev + 1) % featured.length);
  const prevProp = () => setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length);
  const handleQuickSearch = () => { if(quickCode) navigate(`/inmuebles?code=${quickCode}`); else navigate("/inmuebles"); };
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  // LÓGICA DE MAPEO DE ZONAS
  const handleZoneSearch = async () => {
     if(!zoneInput.trim()) return;
     setSearchingZone(true);
     
     // 1. Mapeo Inteligente (Barrio -> Localidad/Zona)
     const zoneMap: Record<string, string> = {
        "marsella": "Kennedy",
        "mandalay": "Kennedy",
        "castilla": "Kennedy",
        "cedritos": "Usaquén",
        "santa barbara": "Usaquén",
        "colina": "Suba",
        "niza": "Suba",
        "salitre": "Fontibón",
        "modelia": "Fontibón",
        "centro": "La Candelaria"
     };

     const query = zoneInput.toLowerCase();
     let searchTerm = query;
     let mapMessage = "";

     // Buscar si el término tiene una zona padre
     for (const [barrio, localidad] of Object.entries(zoneMap)) {
        if (query.includes(barrio)) {
           searchTerm = localidad.toLowerCase();
           mapMessage = `Buscando en ${localidad} (Zona de ${barrio})`;
           break;
        }
     }

     // 2. Consulta a Supabase (ilike busca coincidencias en city o neighborhood)
     const { data } = await supabase
        .from("properties")
        .select("*")
        .or(`city.ilike.%${searchTerm}%,neighborhood.ilike.%${searchTerm}%`)
        .limit(6);

     setZoneResults(data || []);
     setShowZoneModal(true);
     setSearchingZone(false);
  };

  const current = featured[currentIdx] || {};

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden">
      
      {/* MODAL DE RESULTADOS ZONALES */}
      {showZoneModal && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
               <button onClick={() => setShowZoneModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-10"><FontAwesomeIcon icon={faTimes} size="2x" /></button>
               
               <div className="p-8 bg-slate-900 text-white">
                  <h3 className="text-2xl font-bold flex items-center gap-3"><FontAwesomeIcon icon={faCity} className="text-yellow-500"/> Resultados para "{zoneInput}"</h3>
                  <p className="text-slate-400 text-sm mt-2">{zoneResults.length > 0 ? `Encontramos ${zoneResults.length} oportunidades de inversión.` : "Aún no tenemos propiedades publicadas exactamente ahí, pero mira estas opciones."}</p>
               </div>

               <div className="p-8 overflow-y-auto bg-gray-50 flex-grow">
                  {zoneResults.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {zoneResults.map(prop => (
                           <Link to={`/inmuebles/${prop.id}`} key={prop.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition group">
                              <div className="h-40 bg-gray-200 relative">
                                 {prop.images && prop.images[0] && <img src={prop.images[0]} className="w-full h-full object-cover" />}
                                 <span className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded">{prop.property_type}</span>
                              </div>
                              <div className="p-4">
                                 <h4 className="font-bold text-slate-800 text-sm truncate">{prop.title}</h4>
                                 <p className="text-green-600 font-bold text-lg mt-1">{formatPrice(prop.price)}</p>
                                 <p className="text-xs text-gray-500 flex items-center gap-1 mt-2"><FontAwesomeIcon icon={faMapMarkedAlt}/> {prop.neighborhood}, {prop.city}</p>
                              </div>
                           </Link>
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-12">
                        <p className="text-slate-500 mb-4">No hay coincidencias exactas en este momento.</p>
                        <Link to="/inmuebles" className="inline-block bg-yellow-500 text-slate-900 font-bold px-6 py-3 rounded-full hover:bg-yellow-400">Ver Inventario Completo</Link>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-2xl rounded-none overflow-hidden bg-white min-h-[auto] lg:min-h-[500px]">
               <div className="lg:w-[70%] relative h-[400px] lg:h-[500px] bg-black group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/30 z-10"></div>
                  <img src={current.images[0]} alt={current.title} className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                     <span className="bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded uppercase mb-4 tracking-widest shadow-sm">
                        {getLoc(current.property_type, current.property_type_en)}
                     </span>
                     <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2 leading-tight px-2">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-lg md:text-2xl font-light mb-6 opacity-90">{getLoc(current.city, current.city_en)} | {formatPrice(current.price)}</p>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="px-8 py-3 bg-white text-slate-800 font-bold rounded-full hover:bg-yellow-400 hover:text-slate-900 transition shadow-lg uppercase text-sm tracking-widest">
                        {t("hero_btn")}
                     </button>
                  </div>
                  <button onClick={prevProp} className="absolute top-1/2 left-2 md:left-4 z-30 w-10 h-10 md:w-12 md:h-12 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-800 transition"><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <button onClick={nextProp} className="absolute top-1/2 right-2 md:right-4 z-30 w-10 h-10 md:w-12 md:h-12 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-800 transition"><FontAwesomeIcon icon={faChevronRight} /></button>
               </div>
               <div className="lg:w-[30%] bg-gray-100 p-6 md:p-8 flex flex-col justify-center border-l border-gray-200">
                  <h3 className="text-slate-800 font-bold text-center text-lg mb-6 uppercase tracking-widest border-b-2 border-slate-800 pb-2 inline-block mx-auto">{t("search_title")}</h3>
                  <div className="space-y-6 flex-1">
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">{t("search_code")}</label>
                        <div className="relative">
                           <input className="w-full p-4 pl-10 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-slate-800 outline-none" placeholder="Ej: 2501" value={quickCode} onChange={(e) => setQuickCode(e.target.value)} />
                           <FontAwesomeIcon icon={faHashtag} className="absolute left-3.5 top-4 text-gray-400" />
                        </div>
                     </div>
                     <div className="p-4 bg-slate-200 rounded-lg text-xs text-slate-600 leading-relaxed border border-slate-300">
                        <p>{lang === "EN" ? "Search by Property ID." : "Ingrese el código del inmueble para ir directo."}</p>
                     </div>
                  </div>
                  <button onClick={handleQuickSearch} className="w-full bg-slate-800 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-slate-700 transition mt-6 flex items-center justify-center gap-2 uppercase tracking-wide border border-slate-900">
                     <FontAwesomeIcon icon={faSearch} /> {t("search_btn")}
                  </button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* --- MÓDULO INTELIGENTE CAMACOL (NUEVO) --- */}
      <div className="bg-slate-900 py-20 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2 text-white">
                <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-2 block"><FontAwesomeIcon icon={faMapMarkedAlt} /> Inteligencia de Mercado</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">¿Dónde proyectas <br/>tu próxima inversión?</h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">
                   Ya sea un hogar, un local comercial o una bodega, la ubicación es clave. Analizamos datos de <strong>CAMACOL</strong> para identificar zonas de alta valorización. Dinos dónde buscas y te mostramos lo mejor.
                </p>
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full flex items-center max-w-md border border-white/20">
                   <input 
                      type="text" 
                      placeholder="Ej: Cedritos, Marsella, La Colina..." 
                      className="bg-transparent border-none outline-none text-white placeholder-slate-400 flex-grow px-6 py-2"
                      value={zoneInput}
                      onChange={(e) => setZoneInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()}
                   />
                   <button onClick={handleZoneSearch} className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 w-12 h-12 rounded-full flex items-center justify-center transition shadow-lg">
                      {searchingZone ? <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div> : <FontAwesomeIcon icon={faPaperPlane} />}
                   </button>
                </div>
                <p className="text-xs text-slate-500 mt-4 ml-4">Prueba escribiendo un barrio (Ej: Marsella, Cedritos).</p>
            </div>
            <div className="lg:w-1/2 w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
               <h3 className="text-white font-bold mb-8 flex justify-between items-end"><span>Demanda Actual</span><span className="text-xs text-slate-400 font-normal">Fuente: Camacol Proyecciones</span></h3>
               <div className="space-y-6">
                  <div><div className="flex justify-between text-xs text-slate-300 mb-2 font-bold uppercase"><span>Sabana Norte (Chía/Cajicá)</span> <span>85%</span></div><div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 w-[85%] rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div></div></div>
                  <div><div className="flex justify-between text-xs text-slate-300 mb-2 font-bold uppercase"><span>Bogotá Norte (Cedritos/Colina)</span> <span>72%</span></div><div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[72%] rounded-full"></div></div></div>
                  <div><div className="flex justify-between text-xs text-slate-300 mb-2 font-bold uppercase"><span>Sabana Occidente (Madrid/Mosquera)</span> <span>64%</span></div><div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-green-600 to-green-400 w-[64%] rounded-full"></div></div></div>
               </div>
            </div>
         </div>
      </div>

      {/* PREMIUM SELECTION */}
      <div className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4">
            <div className="max-w-2xl">
               <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-2"><FontAwesomeIcon icon={faStar} /> Exclusividad</span>
               <h2 className="text-3xl font-bold text-slate-800 mb-4">{t("home_premium_title")}</h2>
               <p className="text-gray-500 text-sm leading-relaxed">{t("home_premium_desc")}</p>
            </div>
            <Link to="/inmuebles?type=premium" className="text-blue-900 font-bold hover:underline mt-4 md:mt-0 block">Ver todo el portafolio</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featured.slice(0, 2).map(prop => (
               <Link to={`/inmuebles/${prop.id}`} key={prop.id} className="relative h-80 rounded-2xl overflow-hidden group shadow-2xl">
                  <img src={prop.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                     <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded text-xs uppercase font-bold mb-3 inline-block border border-white/30">Colección Premium</span>
                     <h3 className="text-2xl font-bold mb-2">{getLoc(prop.title, prop.title_en)}</h3>
                     <p className="text-yellow-400 font-bold text-xl">{formatPrice(prop.price)}</p>
                  </div>
               </Link>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Home;