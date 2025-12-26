import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faGavel, faVideo, faArrowRight, faStar, faGem, faShieldAlt, faPercent, 
  faMapMarkedAlt, faPaperPlane, faCity, faTag, faChartBar 
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
  const [zoneInput, setZoneInput] = useState("");
  const [zoneResults, setZoneResults] = useState<any[]>([]);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [searchingZone, setSearchingZone] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => { const { data } = await supabase.from("properties").select("*").limit(4); if (data) setFeatured(data); };
    const fetchBlog = async () => { const { data } = await supabase.from("blogs").select("*").eq("active", true).order("created_at", { ascending: false }).limit(3); if (data) setBlogPosts(data); };
    fetchFeatured(); fetchBlog();
  }, []);

  const nextProp = () => setCurrentIdx((prev) => (prev + 1) % featured.length);
  const prevProp = () => setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length);
  const handleQuickSearch = () => { if(quickCode) navigate(`/inmuebles?code=${quickCode}`); else navigate("/inmuebles"); };
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  const handleZoneSearch = async () => {
     if(!zoneInput.trim()) return;
     setSearchingZone(true);
     const zoneMap: Record<string, string> = { "marsella": "Kennedy", "cedritos": "Usaquén", "colina": "Suba", "salitre": "Fontibón", "modelia": "Fontibón", "centro": "La Candelaria" };
     let searchTerm = zoneInput.toLowerCase();
     for (const [barrio, localidad] of Object.entries(zoneMap)) { if (searchTerm.includes(barrio)) { searchTerm = localidad.toLowerCase(); break; } }
     const { data } = await supabase.from("properties").select("*").or(`city.ilike.%${searchTerm}%,neighborhood.ilike.%${searchTerm}%`).limit(6);
     setZoneResults(data || []); setShowZoneModal(true); setSearchingZone(false);
  };

  const current = featured[currentIdx] || {};

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden">
      {/* MODAL ZONAS */}
      {showZoneModal && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
               <button onClick={() => setShowZoneModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-10"><FontAwesomeIcon icon={faTimes} size="2x" /></button>
               <div className="p-8 bg-slate-900 text-white"><h3 className="text-2xl font-bold"><FontAwesomeIcon icon={faCity} className="text-yellow-500 mr-2"/>Resultados</h3></div>
               <div className="p-8 overflow-y-auto bg-gray-50 flex-grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {zoneResults.map(p => (<Link to={`/inmuebles/${p.id}`} key={p.id} className="bg-white rounded-xl shadow p-4 hover:shadow-xl"><h4 className="font-bold">{p.title}</h4></Link>))}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION (z-0 para que navbar cuelgue encima) */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-2xl rounded-none overflow-hidden bg-white min-h-[auto] lg:min-h-[500px]">
               <div className="lg:w-[70%] relative h-[400px] lg:h-[500px] bg-black group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/30 z-10"></div>
                  <img src={current.images[0]} className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                     <span className="bg-yellow-500 text-slate-900 text-xs font-bold px-3 py-1 rounded uppercase mb-4 tracking-widest shadow-sm">{getLoc(current.property_type, current.property_type_en)}</span>
                     <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2 leading-tight px-2">{getLoc(current.title, current.title_en)}</h2>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="px-8 py-3 bg-white text-slate-800 font-bold rounded-full hover:bg-yellow-400 hover:text-slate-900 transition shadow-lg uppercase text-sm tracking-widest mt-4">{t("hero_btn")}</button>
                  </div>
                  <button onClick={prevProp} className="absolute top-1/2 left-2 z-30 text-white text-3xl"><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <button onClick={nextProp} className="absolute top-1/2 right-2 z-30 text-white text-3xl"><FontAwesomeIcon icon={faChevronRight} /></button>
               </div>
               <div className="lg:w-[30%] bg-gray-100 p-6 md:p-8 flex flex-col justify-center border-l border-gray-200">
                  <h3 className="text-slate-800 font-bold text-center text-lg mb-6 uppercase tracking-widest border-b-2 border-slate-800 pb-2 inline-block mx-auto">{t("search_title")}</h3>
                  <div className="space-y-6 flex-1">
                     <div><label className="text-xs font-bold text-gray-500 uppercase block mb-2">{t("search_code")}</label><div className="relative"><input className="w-full p-4 pl-10 border border-gray-300 rounded-lg bg-white text-sm outline-none" placeholder="Ej: 2501" value={quickCode} onChange={(e) => setQuickCode(e.target.value)} /><FontAwesomeIcon icon={faHashtag} className="absolute left-3.5 top-4 text-gray-400" /></div></div>
                  </div>
                  <button onClick={handleQuickSearch} className="w-full bg-slate-800 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-slate-700 transition mt-6 flex items-center justify-center gap-2 uppercase tracking-wide"><FontAwesomeIcon icon={faSearch} /> {t("search_btn")}</button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* MODULO CAMACOL */}
      <div className="bg-slate-900 py-20 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2 text-white">
                <span className="text-yellow-400 font-bold tracking-widest text-xs uppercase mb-2 block"><FontAwesomeIcon icon={faMapMarkedAlt} /> Inteligencia de Mercado</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">¿Dónde proyectas <br/>tu próxima inversión?</h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed font-light">Analizamos datos de <strong>CAMACOL</strong>. Dinos dónde buscas.</p>
                <div className="bg-white/10 backdrop-blur-md p-2 rounded-full flex items-center max-w-md border border-white/20">
                   <input className="bg-transparent border-none outline-none text-white placeholder-slate-400 flex-grow px-6 py-2" placeholder="Ej: Cedritos..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} />
                   <button onClick={handleZoneSearch} className="bg-yellow-500 text-slate-900 w-12 h-12 rounded-full"><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
               <h3 className="text-white font-bold mb-8 flex justify-between items-end"><span>Demanda Actual</span></h3>
               <div className="space-y-6">
                  <div><div className="flex justify-between text-xs text-slate-300 mb-2 font-bold uppercase"><span>Sabana Norte</span> <span>85%</span></div><div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 w-[85%] rounded-full shadow-yellow"></div></div></div>
                  <div><div className="flex justify-between text-xs text-slate-300 mb-2 font-bold uppercase"><span>Bogotá Norte</span> <span>72%</span></div><div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 w-[72%] rounded-full"></div></div></div>
               </div>
            </div>
         </div>
      </div>

      {/* --- PREMIUM SELECTION (4 CARDS COMPACTAS & ELEGANTES) --- */}
      <div className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4">
            <div className="max-w-2xl">
               <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-2"><FontAwesomeIcon icon={faStar} /> Exclusividad</span>
               <h2 className="text-3xl font-bold text-slate-800 mb-4">{t("home_premium_title")}</h2>
               <p className="text-gray-500 text-sm leading-relaxed">{t("home_premium_desc")}</p>
            </div>
            <Link to="/inmuebles?type=premium" className="text-blue-900 font-bold hover:underline mt-4 md:mt-0 block">Ver todo el portafolio</Link>
         </div>

         {/* GRID DE 4 COLUMNAS (Para que sean tarjetas mas pequeñas y elegantes) */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featured.slice(0, 4).map((prop) => (
               <Link to={`/inmuebles/${prop.id}`} key={prop.id} className="relative h-[400px] rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <img src={prop.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
                  
                  {/* TAGS FLOTANTES SUPERIORES */}
                  <div className="absolute top-4 left-4 flex gap-2">
                     <span className="bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-md">Oportunidad</span>
                  </div>

                  {/* CONTENIDO INFERIOR */}
                  <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                     <div className="mb-2">
                        <span className="text-xs font-light text-slate-300 block mb-1 uppercase tracking-wider">{prop.city}</span>
                        <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2">{getLoc(prop.title, prop.title_en)}</h3>
                        <p className="text-xl font-bold text-yellow-400">{formatPrice(prop.price)}</p>
                     </div>
                     
                     <div className="border-t border-white/20 pt-3 mt-3 flex justify-between items-center text-xs text-slate-300">
                        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faChartBar} className="text-green-400"/> Alta Demanda</span>
                        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faTag} className="text-blue-400"/> {prop.property_type}</span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      {/* BLOG */}
      <div className="bg-white py-20 px-4 border-t border-gray-100">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-slate-800">{t("blog_home_title")}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-lg transition group border border-gray-100">
                     <div className="h-48 overflow-hidden"><img src={post.image_url} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" /></div>
                     <div className="p-6">
                        <div className="text-xs text-blue-600 mb-2 uppercase font-bold">{new Date(post.created_at).toLocaleDateString()}</div>
                        <h3 className="font-bold text-slate-900 text-lg mb-3 line-clamp-2 group-hover:text-blue-700 transition">{post.title}</h3>
                        <span className="text-slate-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-2 transition-transform">{t("read_more")} <FontAwesomeIcon icon={faArrowRight} /></span>
                     </div>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
export default Home;