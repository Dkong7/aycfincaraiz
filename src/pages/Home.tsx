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
  const [subPhotoIdx, setSubPhotoIdx] = useState(0); // MINIATURAS DEL MISMO INMUEBLE
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
            <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col border border-white/10">
               <button onClick={() => setShowZoneModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-10"><FontAwesomeIcon icon={faTimes} /></button>
               <div className="p-8 bg-slate-900 text-white border-b border-slate-800">
                  <h3 className="text-3xl font-black italic">¿Qué zona te interesa?</h3>
               </div>
               <div className="p-8 overflow-y-auto bg-gray-50 flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                  {zoneResults.map(p => (<Link to={`/inmuebles/${p.id}`} key={p.id} className="bg-white rounded-xl shadow-sm p-4 hover:shadow-xl"><h4 className="font-bold">{p.title}</h4></Link>))}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION - FIXED MINIATURES */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-[3rem] rounded-none overflow-hidden bg-white min-h-[600px]">
               <div className="lg:w-[75%] relative h-[500px] lg:h-auto bg-black group overflow-hidden">
                  {/* IMAGEN PRINCIPAL (DINÁMICA POR MINIATURA) */}
                  <img src={current.images[subPhotoIdx]} className="w-full h-full object-cover transition-all duration-1000 transform scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                  
                  {/* CONTROLADORES EXTREMOS */}
                  <button onClick={prevProp} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                  </button>
                  <button onClick={nextProp} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronRight} size="lg" />
                  </button>

                  {/* INFO INMUEBLE */}
                  <div className="absolute bottom-12 left-12 z-20 max-w-xl">
                     <span className={`${getTypeBgClass(current.property_type)} text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block`}>{current.property_type}</span>
                     <h2 className="text-4xl md:text-7xl font-black text-white leading-tight mb-4">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-2xl text-green-400 font-bold mb-8">{formatPrice(current.price)}</p>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="bg-white text-slate-900 px-10 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-green-500 hover:text-white transition-all">Explorar Activo</button>
                  </div>

                  {/* MINIATURAS DEL MISMO INMUEBLE */}
                  <div className="absolute top-12 right-12 z-30 flex flex-col gap-3">
                     {current.images.slice(0, 5).map((img: string, i: number) => (
                        <button key={i} onClick={() => setSubPhotoIdx(i)} className={`w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all ${subPhotoIdx === i ? "border-green-500 scale-110 shadow-lg" : "border-white/40 opacity-60 hover:opacity-100"}`}>
                           <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               </div>

               <div className="lg:w-[25%] bg-slate-50 p-10 flex flex-col justify-center border-l border-slate-100">
                  <h3 className="text-slate-900 font-black text-2xl mb-8 uppercase tracking-tighter">Buscador <br/> <span className="text-green-600">Flash</span></h3>
                  <div className="relative mb-6">
                     <input className="w-full p-5 pl-12 border-2 border-slate-200 rounded-2xl bg-white text-sm font-bold outline-none focus:border-green-500 transition-all" placeholder="Código ID..." value={quickCode} onChange={(e) => setQuickCode(e.target.value)} />
                     <FontAwesomeIcon icon={faHashtag} className="absolute left-5 top-6 text-slate-300" />
                  </div>
                  <button onClick={handleQuickSearch} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-green-600 transition uppercase tracking-widest text-xs">Localizar</button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* INTELLIGENCE */}
      <div className="bg-slate-950 py-24 px-4 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
            <div className="lg:w-1/2 text-white">
                <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none italic">¿Qué zona <br/><span className="text-green-500">te interesa?</span></h2>
                <div className="bg-white p-2 rounded-full flex items-center shadow-lg max-w-md">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 flex-grow px-4 py-3 font-bold" placeholder="Ej: Cedritos..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()} />
                   <button onClick={handleZoneSearch} className="bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-blue-600 transition"><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition">
                  <FontAwesomeIcon icon={faStopwatch} className="text-green-400 mb-4 text-3xl"/>
                  <h4 className="text-4xl font-black text-white mb-1">45</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Días prm venta</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition mt-10">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-400 mb-4 text-3xl"/>
                  <h4 className="text-4xl font-black text-white mb-1">+8.5%</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Plusvalía anual</p>
               </div>
            </div>
         </div>
      </div>

      {/* PREMIUM SELECTION */}
      <div className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Oportunidades Premium</h2>
            <Link to="/inmuebles?type=premium" className="text-green-600 font-black uppercase text-xs tracking-widest border-b-4 border-green-500 pb-2">Ver Todo</Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.slice(0, 4).map((p) => (
               <Link to={`/inmuebles/${p.id}`} key={p.id} className="relative h-[450px] rounded-[2.5rem] overflow-hidden group shadow-xl bg-white border border-gray-100">
                  <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                     <h3 className="text-xl font-bold leading-tight mb-2 line-clamp-2">{getLoc(p.title, p.title_en)}</h3>
                     <p className="text-2xl font-black text-green-400 mb-4">{formatPrice(p.price)}</p>
                     <div className={`font-black uppercase text-[10px] flex items-center gap-2 ${getTypeColorClass(p.property_type)}`}>
                        <FontAwesomeIcon icon={faTag} /> {p.property_type}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      {/* COMPONENTES DE SERVICIO */}
      <LegalService />
      <CinemaService />

      {/* BLOG */}
      <div className="bg-white py-24 px-4">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 mb-12 uppercase tracking-widest text-center">A&C Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group">
                     <div className="h-72 rounded-[2rem] overflow-hidden mb-8 relative shadow-2xl">
                        <img src={post.image_url} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-green-900/10 group-hover:bg-transparent transition"></div>
                     </div>
                     <h3 className="font-bold text-slate-900 text-2xl leading-tight group-hover:text-green-600 transition">{post.title}</h3>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
export default Home;