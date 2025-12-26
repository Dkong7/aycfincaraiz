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

import LegalService from "../components/LegalService";
import CinemaService from "../components/CinemaService";

const Home = () => {
  const { formatPrice, t, lang } = useApp();
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [subPhotoIdx, setSubPhotoIdx] = useState(0);
  const [quickCode, setQuickCode] = useState("");
  const [zoneInput, setZoneInput] = useState("");
  const [zoneResults, setZoneResults] = useState<any[]>([]);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [searchingZone, setSearchingZone] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => { const { data } = await supabase.from("properties").select("*").limit(5); if (data) setFeatured(data); };
    const fetchBlog = async () => { const { data } = await supabase.from("blogs").select("*").eq("active", true).order("created_at", { ascending: false }).limit(3); if (data) setBlogPosts(data); };
    fetchFeatured(); fetchBlog();
  }, []);

  const nextProp = () => { setCurrentIdx((prev) => (prev + 1) % featured.length); setSubPhotoIdx(0); };
  const prevProp = () => { setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length); setSubPhotoIdx(0); };

  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  const getTypeColorClass = (type: string) => {
    switch(type?.toLowerCase()) {
      case "apartamento": return "text-blue-500";
      case "casa": return "text-green-500";
      case "casa campestre": return "text-emerald-500";
      case "bodega": return "text-orange-500";
      default: return "text-slate-400";
    }
  };
  
  const getTypeBgClass = (type: string) => {
    switch(type?.toLowerCase()) {
      case "apartamento": return "bg-blue-600";
      case "casa": return "bg-green-600";
      case "casa campestre": return "bg-emerald-700";
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
     setShowZoneModal(true);
     setSearchingZone(false);
  };

  const current = featured[currentIdx] || {};

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden font-sans">
      
      {/* MODAL ZONAS */}
      {showZoneModal && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
               <button onClick={() => setShowZoneModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 z-10"><FontAwesomeIcon icon={faTimes} size="lg" /></button>
               <div className="p-10 bg-slate-950 text-white border-b border-white/10">
                  <h3 className="text-3xl font-black italic">¿Qué zona te interesa?</h3>
                  <p className="text-slate-500 text-sm mt-2">Explora inmuebles disponibles según su ubicación.</p>
               </div>
               <div className="p-10 overflow-y-auto bg-gray-50 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
                  {zoneResults.length > 0 ? zoneResults.map(p => (
                     <Link to={`/inmuebles/${p.id}`} key={p.id} className="bg-white rounded-[2rem] shadow-sm p-6 hover:shadow-xl transition-all border border-gray-100 flex flex-col">
                        <div className="h-40 rounded-2xl overflow-hidden mb-4"><img src={p.images[0]} className="w-full h-full object-cover" /></div>
                        <h4 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{p.title}</h4>
                        <p className="text-green-600 font-black mt-auto">{formatPrice(p.price)}</p>
                     </Link>
                  )) : <div className="col-span-3 text-center py-20 text-slate-400">Sin resultados públicos. Consultar red privada.</div>}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION v5.0 */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-[3rem] rounded-none overflow-hidden bg-white min-h-[650px]">
               <div className="lg:w-[75%] relative h-[500px] lg:auto bg-black group overflow-hidden">
                  <img src={current.images[subPhotoIdx]} className="w-full h-full object-cover transition-all duration-1000 transform scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10"></div>
                  
                  {/* CONTROLADORES EXTREMOS <> */}
                  <button onClick={prevProp} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                  </button>
                  <button onClick={nextProp} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronRight} size="lg" />
                  </button>

                  {/* INFO PRINCIPAL */}
                  <div className="absolute bottom-16 left-12 z-20 max-w-xl">
                     <span className={`${getTypeBgClass(current.property_type)} text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] mb-8 inline-block shadow-lg`}>{current.property_type}</span>
                     <h2 className="text-5xl md:text-8xl font-black text-white leading-none mb-6 drop-shadow-2xl">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-3xl text-green-400 font-bold mb-10">{formatPrice(current.price)}</p>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="bg-white text-slate-900 px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-green-500 hover:text-white transition-all shadow-2xl">Explorar Activo</button>
                  </div>

                  {/* MINIATURAS DEL MISMO INMUEBLE */}
                  <div className="absolute top-12 right-12 z-30 flex flex-col gap-4">
                     {current.images.slice(0, 5).map((img: string, i: number) => (
                        <button key={i} onClick={() => setSubPhotoIdx(i)} className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${subPhotoIdx === i ? "border-green-500 scale-110 shadow-2xl" : "border-white/40 opacity-50 hover:opacity-100"}`}>
                           <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               </div>

               {/* LATERAL DERECHO */}
               <div className="lg:w-[25%] bg-slate-50 p-12 flex flex-col justify-center border-l border-slate-100">
                  <h3 className="text-slate-950 font-black text-3xl mb-10 tracking-tighter italic">Localizador <br/> <span className="text-green-600">Flash</span></h3>
                  <div className="relative mb-8">
                     <input className="w-full p-6 pl-14 border-2 border-slate-200 rounded-[2rem] bg-white text-sm font-black outline-none focus:border-green-500 transition-all shadow-inner" placeholder="CÓDIGO ID..." value={quickCode} onChange={(e) => setQuickCode(e.target.value)} />
                     <FontAwesomeIcon icon={faHashtag} className="absolute left-6 top-7 text-slate-300" />
                  </div>
                  <button onClick={handleQuickSearch} className="w-full bg-slate-950 text-white font-black py-6 rounded-[2rem] shadow-xl hover:bg-green-600 transition-all uppercase tracking-widest text-[10px]">Validar Acceso</button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* INTELLIGENCE MARKET */}
      <div className="bg-slate-950 py-32 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div className="lg:w-1/2 text-white">
                <h2 className="text-5xl md:text-8xl font-black mb-10 leading-none tracking-tighter italic">¿Qué zona <br/><span className="text-green-500">te interesa?</span></h2>
                <div className="bg-white p-3 rounded-full flex items-center shadow-3xl max-w-lg">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-950 placeholder-slate-400 flex-grow px-4 py-4 font-black" placeholder="Ej: Cedritos..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()} />
                   <button onClick={handleZoneSearch} className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-green-500 transition-all"><FontAwesomeIcon icon={faArrowRight} size="lg"/></button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] hover:bg-white/10 transition-all group">
                  <FontAwesomeIcon icon={faStopwatch} className="text-green-500 mb-6 text-4xl group-hover:scale-110 transition-transform"/>
                  <h4 className="text-5xl font-black text-white mb-2">45 Días</h4>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Tiempo promedio cierre</p>
               </div>
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] hover:bg-white/10 transition-all mt-12 group">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-400 mb-6 text-4xl group-hover:scale-110 transition-transform"/>
                  <h4 className="text-5xl font-black text-white mb-2">+8.5%</h4>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Proyección plusvalía</p>
               </div>
            </div>
         </div>
      </div>

      {/* SELECCIÓN EXCLUSIVA (4 items) */}
      <div className="py-32 px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-20">
            <h2 className="text-5xl font-black text-slate-950 tracking-tighter">Selección Exclusiva</h2>
            <Link to="/inmuebles" className="text-green-600 font-black uppercase text-xs tracking-[0.2em] border-b-4 border-green-500 pb-3 hover:text-slate-900 hover:border-slate-900 transition-all">Explorar Inventario</Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featured.slice(0, 4).map((p) => (
               <Link to={`/inmuebles/${p.id}`} key={p.id} className="relative h-[480px] rounded-[3rem] overflow-hidden group shadow-2xl bg-white border border-slate-100">
                  <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-10 w-full text-white">
                     <h3 className="text-2xl font-black leading-tight mb-4 line-clamp-2">{getLoc(p.title, p.title_en)}</h3>
                     <p className="text-3xl font-black text-green-400 mb-6">{formatPrice(p.price)}</p>
                     <div className={`font-black uppercase text-[10px] tracking-widest flex items-center gap-3 ${getTypeColorClass(p.property_type)}`}>
                        <FontAwesomeIcon icon={faTag} /> {p.property_type}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      <LegalService />
      <CinemaService />

      {/* BLOG SECCION FINAL */}
      <div className="bg-slate-50 py-32 px-6 border-t border-slate-200">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6 mb-16">
               <div className="h-px bg-slate-300 flex-grow"></div>
               <h2 className="text-3xl font-black text-slate-950 uppercase tracking-[0.3em] italic text-center px-6">A&C Insights</h2>
               <div className="h-px bg-slate-300 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group">
                     <div className="h-80 rounded-[2.5rem] overflow-hidden mb-10 relative shadow-2xl border-4 border-white">
                        <img src={post.image_url} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-green-900/10 group-hover:opacity-0 transition-opacity"></div>
                     </div>
                     <h3 className="font-black text-slate-950 text-3xl leading-[1.1] group-hover:text-green-600 transition-colors">{post.title}</h3>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
export default Home;