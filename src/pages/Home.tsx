import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faArrowRight, faStar, faMapMarkedAlt, faPaperPlane, faCity, 
  faTag, faChartBar, faBuilding, faStopwatch, faShieldAlt, faEye
} from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

// IMPORTAMOS LOS NUEVOS COMPONENTES
import LegalService from "../components/LegalService";
import CinemaService from "../components/CinemaService";

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
  const [currentZoneStats, setCurrentZoneStats] = useState<any>(null);

  useEffect(() => {
    const fetchFeatured = async () => { const { data } = await supabase.from("properties").select("*").limit(5); if (data) setFeatured(data); };
    const fetchBlog = async () => { const { data } = await supabase.from("blogs").select("*").eq("active", true).order("created_at", { ascending: false }).limit(3); if (data) setBlogPosts(data); };
    fetchFeatured(); fetchBlog();
  }, []);

  const selectProp = (index: number) => setCurrentIdx(index);
  const handleQuickSearch = () => { if(quickCode) navigate(`/inmuebles?code=${quickCode}`); else navigate("/inmuebles"); };
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  const getTypeColorClass = (type: string) => {
    switch(type?.toLowerCase()) {
      case "apartamento": return "text-blue-500";
      case "casa": return "text-green-500";
      case "casa campestre": return "text-purple-500";
      case "bodega": return "text-orange-500";
      default: return "text-slate-400";
    }
  };
  
  const getTypeBgClass = (type: string) => {
    switch(type?.toLowerCase()) {
      case "apartamento": return "bg-blue-600";
      case "casa": return "bg-green-600";
      case "casa campestre": return "bg-purple-700";
      case "bodega": return "bg-orange-600";
      default: return "bg-slate-700";
    }
  };

  const handleZoneSearch = async () => {
     if(!zoneInput.trim()) return;
     setSearchingZone(true);
     const query = zoneInput.toLowerCase();
     const { data } = await supabase.from("properties").select("*").or(`city.ilike.%${query}%,neighborhood.ilike.%${query}%`).limit(6);
     setZoneResults(data || []);
     setCurrentZoneStats({ name: zoneInput });
     setShowZoneModal(true);
     setSearchingZone(false);
  };

  const current = featured[currentIdx] || {};

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden font-sans">
      
      {/* MODAL ZONAS */}
      {showZoneModal && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col border border-white/10">
               <button onClick={() => setShowZoneModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-10"><FontAwesomeIcon icon={faTimes} /></button>
               <div className="p-8 bg-slate-900 text-white flex justify-between items-center border-b border-slate-800">
                  <h3 className="text-3xl font-black">Análisis: {currentZoneStats?.name}</h3>
               </div>
               <div className="p-8 overflow-y-auto bg-gray-50 flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                  {zoneResults.map(p => (
                     <Link to={`/inmuebles/${p.id}`} key={p.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-xl"><h4 className="font-bold">{p.title}</h4></Link>
                  ))}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-3xl rounded-none overflow-hidden bg-white min-h-[550px]">
               <div className="lg:w-[70%] relative h-[450px] lg:h-auto bg-black group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
                  <img src={current.images[0]} alt={current.title} className="w-full h-full object-cover transition-all duration-1000 transform hover:scale-105" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4">
                     <span className={`${getTypeBgClass(current.property_type)} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg`}>{getLoc(current.property_type, current.property_type_en)}</span>
                     <h2 className="text-3xl md:text-6xl font-black text-white mb-4 leading-tight">{getLoc(current.title, current.title_en)}</h2>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-yellow-400 transition shadow-xl uppercase text-xs tracking-widest mt-4">{t("hero_btn")}</button>
                  </div>
                  <div className="absolute bottom-8 left-0 w-full z-30 px-8 hidden md:flex justify-center gap-4">
                     {featured.map((item, idx) => (
                        <button key={item.id} onClick={() => selectProp(idx)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${idx === currentIdx ? "border-yellow-500 scale-110 shadow-lg" : "border-white/50 opacity-70"}`}><img src={item.images[0]} className="w-full h-full object-cover" /></button>
                     ))}
                  </div>
               </div>
               <div className="lg:w-[30%] bg-slate-50 p-8 flex flex-col justify-center border-l border-slate-100 text-center md:text-left">
                  <h3 className="text-slate-900 font-black text-2xl mb-6">Búsqueda Directa</h3>
                  <div className="relative mb-6">
                     <input className="w-full p-5 pl-12 border border-slate-200 rounded-2xl bg-white text-sm font-bold text-slate-800 outline-none" placeholder="Código ID..." value={quickCode} onChange={(e) => setQuickCode(e.target.value)} />
                     <FontAwesomeIcon icon={faHashtag} className="absolute left-5 top-5 text-slate-300" />
                  </div>
                  <button onClick={handleQuickSearch} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition uppercase tracking-widest text-xs"><FontAwesomeIcon icon={faSearch} /> {t("search_btn")}</button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* MÓDULO INTELIGENCIA */}
      <div className="bg-slate-950 py-24 px-4 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
            <div className="lg:w-1/2 text-white">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9] tracking-tighter">¿Qué zona <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">te interesa?</span></h2>
                <div className="bg-white p-2 rounded-full flex items-center shadow-lg max-w-md">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 flex-grow px-4 py-3 font-bold" placeholder="Ej: Cedritos..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()} />
                   <button onClick={handleZoneSearch} className="bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-blue-600 transition"><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition">
                  <FontAwesomeIcon icon={faStopwatch} className="text-yellow-400 mb-4 text-2xl"/>
                  <h4 className="text-3xl font-black text-white mb-1">45 Días</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Tiempo Venta</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition mt-8">
                  <FontAwesomeIcon icon={faChartLine} className="text-green-400 mb-4 text-2xl"/>
                  <h4 className="text-3xl font-black text-white mb-1">+8.5%</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Plusvalía</p>
               </div>
            </div>
         </div>
      </div>

      {/* SELECCIÓN PREMIUM */}
      <div className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Oportunidades Premium</h2>
            <Link to="/inmuebles?type=premium" className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1">Ver Todo</Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featured.slice(0, 4).map((p) => (
               <Link to={`/inmuebles/${p.id}`} key={p.id} className="relative h-[420px] rounded-[2rem] overflow-hidden group shadow-lg bg-white">
                  <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full text-white">
                     <h3 className="text-lg font-black leading-tight mb-2 line-clamp-2">{getLoc(p.title, p.title_en)}</h3>
                     <p className="text-2xl font-bold text-yellow-400 mb-4">{formatPrice(p.price)}</p>
                     <div className={`font-bold flex items-center gap-2 ${getTypeColorClass(p.property_type)}`}>
                        <FontAwesomeIcon icon={faTag} /> {p.property_type}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      {/* --- INTEGRACIÓN DE NUEVOS COMPONENTES DE SERVICIO --- */}
      <LegalService />
      <CinemaService />

      {/* BLOG */}
      <div className="bg-white py-24 px-4 border-t border-slate-100">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px bg-slate-200 flex-grow"></div>
               <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">A&C Insights</h2>
               <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group flex flex-col">
                     <div className="h-64 rounded-2xl overflow-hidden mb-6 relative shadow-md">
                        <img src={post.image_url} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                     </div>
                     <h3 className="font-bold text-slate-900 text-xl leading-tight group-hover:text-blue-700 transition">{post.title}</h3>
                  </Link>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};

export default Home;