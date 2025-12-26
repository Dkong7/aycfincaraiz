import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faArrowRight, faStar, faMapMarkedAlt, faPaperPlane, faCity, 
  faTag, faChartBar, faBuilding, faStopwatch, faShieldAlt, faEye, faHandHoldingUsd, faUsers
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
    const fetchData = async () => {
      const { data: props } = await supabase.from("properties").select("*").eq("active", true).order("created_at", { ascending: false });
      const { data: blogs } = await supabase.from("blogs").select("*").eq("active", true).limit(3);
      if (props) setFeatured(props);
      if (blogs) setBlogPosts(blogs);
    };
    fetchData();
  }, []);

  const nextProp = () => { setCurrentIdx((prev) => (prev + 1) % featured.length); setSubPhotoIdx(0); };
  const prevProp = () => { setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length); setSubPhotoIdx(0); };
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  const getTypeBgClass = (type: string) => {
    switch(type?.toLowerCase()) {
      case "apartamento": return "bg-blue-600";
      case "casa": return "bg-green-600";
      case "casa campestre": return "bg-green-700";
      case "bodega": return "bg-slate-800";
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

  const current = featured[currentIdx] || { images: [] };

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden font-sans">
      
      {/* HERO SECTION v6.0 */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-[3rem] rounded-none overflow-hidden bg-white min-h-[650px]">
               <div className="lg:w-[75%] relative h-[550px] lg:h-auto bg-black group overflow-hidden">
                  <img src={current.images[subPhotoIdx]} className="w-full h-full object-cover transition-all duration-1000 transform scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
                  
                  {/* CONTROLADORES EXTREMOS <> */}
                  <button onClick={prevProp} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button onClick={nextProp} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronRight} />
                  </button>

                  <div className="absolute bottom-16 left-12 z-20 max-w-xl">
                     <span className={`${getTypeBgClass(current.property_type)} text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-6 inline-block`}>{current.property_type}</span>
                     <h2 className="text-4xl md:text-7xl font-black text-white leading-tight mb-4">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-2xl text-green-400 font-bold mb-8">{formatPrice(current.price)}</p>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="bg-white text-slate-950 px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-green-600 hover:text-white transition-all">Explorar Ficha</button>
                  </div>

                  {/* MINIATURAS DEL MISMO INMUEBLE */}
                  <div className="absolute top-12 right-12 z-30 flex flex-col gap-3">
                     {current.images.map((img: string, i: number) => (
                        <button key={i} onClick={() => setSubPhotoIdx(i)} className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${subPhotoIdx === i ? "border-green-500 scale-110 shadow-lg" : "border-white/40 opacity-50 hover:opacity-100"}`}>
                           <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               </div>

               <div className="lg:w-[25%] bg-slate-50 p-12 flex flex-col justify-center border-l border-slate-100">
                  <h3 className="text-slate-950 font-black text-2xl mb-8 tracking-tighter italic">Localizador <br/> <span className="text-green-600">Flash</span></h3>
                  <div className="relative mb-6">
                     <input className="w-full p-6 border-2 border-slate-200 rounded-2xl bg-white text-sm font-black outline-none focus:border-green-500 transition-all" placeholder="CÓDIGO ID..." value={quickCode} onChange={(e) => setQuickCode(e.target.value)} />
                     <FontAwesomeIcon icon={faHashtag} className="absolute right-6 top-7 text-slate-300" />
                  </div>
                  <button onClick={handleQuickSearch} className="w-full bg-slate-950 text-white font-black py-6 rounded-[2rem] hover:bg-green-600 transition-all uppercase tracking-widest text-[10px]">Localizar</button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* INTELLIGENCE MARKET - DATOS ENRIQUECIDOS */}
      <div className="bg-slate-950 py-32 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div className="lg:w-1/2 text-white">
                <h2 className="text-5xl md:text-8xl font-black mb-10 leading-none italic">¿Qué zona <br/><span className="text-green-500">te interesa?</span></h2>
                <div className="bg-white p-2 rounded-full flex items-center shadow-3xl max-w-lg">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-950 placeholder-slate-400 flex-grow px-4 py-4 font-black" placeholder="Ej: Cedritos..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()} />
                   <button onClick={handleZoneSearch} className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-green-500 transition-all"><FontAwesomeIcon icon={faArrowRight} /></button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faStopwatch} className="text-green-500 mb-4 text-3xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">45 Días</h4>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Tiempo promedio cierre</p>
               </div>
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] mt-12 group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-400 mb-4 text-3xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">+8.5%</h4>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Plusvalía anual proyectada</p>
               </div>
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faHandHoldingUsd} className="text-yellow-500 mb-4 text-3xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">AAA</h4>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Calificación del activo</p>
               </div>
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[3.5rem] mt-12 group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faUsers} className="text-green-400 mb-4 text-3xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">+150</h4>
                  <p className="text-xs text-slate-400 uppercase font-black tracking-widest">Inversores activos</p>
               </div>
            </div>
         </div>
      </div>

      {/* SELECCIÓN DE ÉLITE */}
      <div className="py-32 px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-20">
            <h2 className="text-5xl font-black text-slate-950 tracking-tighter uppercase italic">Selección de Élite</h2>
            <Link to="/inmuebles" className="text-green-600 font-black uppercase text-xs tracking-[0.2em] border-b-4 border-green-500 pb-3 hover:text-slate-950 transition-all">Explorar Todo</Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {featured.slice(0, 4).map((p) => (
               <Link to={`/inmuebles/${p.id}`} key={p.id} className="relative h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl bg-white border border-gray-100">
                  <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-10 w-full text-white">
                     <h3 className="text-2xl font-black leading-tight mb-4">{getLoc(p.title, p.title_en)}</h3>
                     <p className="text-2xl font-black text-green-400 mb-6">{formatPrice(p.price)}</p>
                     <div className="font-black uppercase text-[10px] tracking-widest text-slate-400 flex items-center gap-2">
                        <FontAwesomeIcon icon={faTag} className="text-green-500"/> {p.property_type}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      <LegalService />
      <CinemaService />

      {/* BLOG */}
      <div className="bg-white py-32 px-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-slate-950 uppercase tracking-[0.3em] italic text-center mb-20">A&C Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group">
                     <div className="h-80 rounded-[3rem] overflow-hidden mb-10 shadow-2xl border-4 border-white transition-all group-hover:border-green-500">
                        <img src={post.image_url} className="w-full h-full object-cover" />
                     </div>
                     <h3 className="font-black text-slate-950 text-2xl leading-none group-hover:text-green-600 transition-colors">{post.title}</h3>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
export default Home;