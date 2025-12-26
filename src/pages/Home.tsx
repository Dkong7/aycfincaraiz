import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faArrowRight, faStar, faMapMarkedAlt, faPaperPlane, faCity, 
  faTag, faChartBar, faBuilding, faStopwatch, faShieldAlt, faEye, faUserAstronaut
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
  
  // SOLICITUD SCOUTING
  const [zoneInput, setZoneInput] = useState("");
  const [zoneResults, setZoneResults] = useState<any[]>([]);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [scoutingSent, setScoutingSent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: props } = await supabase.from("properties").select("*").order("listing_id", { ascending: true });
      const { data: blogs } = await supabase.from("blogs").select("*").eq("active", true).limit(3);
      if (props) setFeatured(props);
      if (blogs) setBlogPosts(blogs);
    };
    fetchData();
  }, []);

  const nextProp = () => { setCurrentIdx((prev) => (prev + 1) % featured.length); setSubPhotoIdx(0); };
  const prevProp = () => { setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length); setSubPhotoIdx(0); };
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  const handleZoneSearch = async () => {
    if(!zoneInput.trim()) return;
    // 1. Guardar búsqueda para Claudia (Scouting)
    await supabase.from("scouting_requests").insert([{ zone_requested: zoneInput, status: "Pendiente" }]);
    
    // 2. Buscar recomendaciones automáticas
    const { data } = await supabase.from("properties").select("*").or(`city.ilike.%${zoneInput}%,neighborhood.ilike.%${zoneInput}%`).limit(6);
    setZoneResults(data || []);
    setShowZoneModal(true);
  };

  const current = featured[currentIdx] || { images: [] };

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden font-sans">
      
      {/* MODAL ZONAS / SCOUTING */}
      {showZoneModal && (
         <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-slate-900/95 backdrop-blur-xl p-4 animate-fade-in">
            <div className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col border border-white/10">
               <button onClick={() => setShowZoneModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-red-500 z-10"><FontAwesomeIcon icon={faTimes} size="lg" /></button>
               <div className="p-10 bg-slate-900 text-white">
                  <h3 className="text-3xl font-black italic text-green-500">Localizador de Oportunidades</h3>
                  <p className="text-slate-400 mt-2">Nuestros agentes ya están analizando "{zoneInput}". Mira estas opciones similares mientras te contactamos:</p>
               </div>
               <div className="p-10 overflow-y-auto bg-gray-50 flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
                  {zoneResults.length > 0 ? zoneResults.map(p => (
                     <Link to={`/inmuebles/${p.id}`} key={p.id} className="bg-white rounded-[2rem] shadow-sm p-6 hover:shadow-xl transition-all border border-gray-100 flex flex-col group">
                        <div className="h-40 rounded-2xl overflow-hidden mb-4"><img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all" /></div>
                        <h4 className="font-bold text-slate-800 text-lg mb-2 line-clamp-1">{p.title}</h4>
                        <p className="text-green-600 font-black mt-auto">{formatPrice(p.price)}</p>
                     </Link>
                  )) : <div className="col-span-3 text-center py-20 text-slate-400">Iniciando protocolo de Scouting Privado...</div>}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION v6.0 RESTAURADO */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-[4rem] rounded-none overflow-hidden bg-white min-h-[700px]">
               <div className="lg:w-[75%] relative h-[500px] lg:h-auto bg-black group overflow-hidden">
                  <img src={current.images[subPhotoIdx]} className="w-full h-full object-cover transition-all duration-1000 transform scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent z-10"></div>
                  
                  {/* CONTROLADORES <> */}
                  <button onClick={prevProp} className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                  </button>
                  <button onClick={nextProp} className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full border border-white/10 bg-black/20 text-white backdrop-blur-md hover:bg-green-600 transition-all flex items-center justify-center">
                     <FontAwesomeIcon icon={faChevronRight} size="2x" />
                  </button>

                  <div className="absolute bottom-20 left-12 z-20 max-w-2xl">
                     <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.8] mb-8 drop-shadow-2xl">{getLoc(current.title, current.title_en)}</h2>
                     <div className="flex items-center gap-6 mb-10">
                        <p className="text-4xl text-green-500 font-black">{formatPrice(current.price)}</p>
                        <div className="h-10 w-px bg-white/20"></div>
                        <span className="text-white font-bold uppercase tracking-widest text-xs">{current.city}</span>
                     </div>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="bg-green-600 text-white px-14 py-6 rounded-full font-black uppercase text-sm tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-3xl">Ver Inmueble</button>
                  </div>

                  {/* MINIATURAS DEL MISMO INMUEBLE */}
                  <div className="absolute top-12 right-12 z-30 flex flex-col gap-4">
                     {current.images.map((img: string, i: number) => (
                        <button key={i} onClick={() => setSubPhotoIdx(i)} className={`w-24 h-24 rounded-3xl overflow-hidden border-4 transition-all ${subPhotoIdx === i ? "border-green-500 scale-110 shadow-2xl" : "border-white/20 opacity-40 hover:opacity-100"}`}>
                           <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               </div>

               <div className="lg:w-[25%] bg-slate-50 p-12 flex flex-col justify-center border-l border-slate-100 text-center">
                  <span className="text-green-600 font-black text-xs uppercase tracking-widest mb-4">Acceso Express</span>
                  <h3 className="text-slate-950 font-black text-3xl mb-10 tracking-tighter">Código<br/><span className="text-green-600 underline">A&C</span></h3>
                  <div className="relative mb-8">
                     <input className="w-full p-6 text-center border-2 border-slate-200 rounded-3xl bg-white text-xl font-black outline-none focus:border-green-500 transition-all shadow-inner" placeholder="0000" />
                  </div>
                  <button className="w-full bg-slate-950 text-white font-black py-6 rounded-3xl shadow-xl hover:bg-green-600 transition-all uppercase tracking-widest text-[10px]">Validar Acceso</button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* SCOUTING SECTION */}
      <div className="bg-slate-950 py-32 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div className="lg:w-1/2 text-white">
                <div className="flex items-center gap-3 mb-6"><div className="h-px w-10 bg-green-500"></div><span className="text-green-500 font-black tracking-widest text-xs uppercase">Servicio Distintivo A&C</span></div>
                <h2 className="text-5xl md:text-8xl font-black mb-10 leading-[0.8] tracking-tighter italic">¿Qué zona <br/><span className="text-green-600 underline">te interesa?</span></h2>
                <p className="text-slate-400 text-xl mb-12 leading-relaxed font-light">Nuestro equipo de agentes hace el <strong>scouting exclusivo</strong> de lo que buscas a tu medida.</p>
                <div className="bg-white p-3 rounded-full flex items-center shadow-3xl max-w-lg focus-within:ring-4 ring-green-500/20 transition-all">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-950 placeholder-slate-400 flex-grow px-4 py-4 font-black" placeholder="Ej: Chía, Rosales..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()} />
                   <button onClick={handleZoneSearch} className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-green-700 transition-all"><FontAwesomeIcon icon={faPaperPlane} size="lg"/></button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-8">
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[4rem] group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faStopwatch} className="text-green-500 mb-6 text-4xl group-hover:scale-110 transition-transform"/>
                  <h4 className="text-5xl font-black text-white mb-2">45</h4>
                  <p className="text-xs text-slate-400 font-black tracking-widest">Días Promedio de Cierre</p>
               </div>
               <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[4rem] group hover:bg-white/10 transition-all mt-12">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-500 mb-6 text-4xl group-hover:scale-110 transition-transform"/>
                  <h4 className="text-5xl font-black text-white mb-2">+8.5%</h4>
                  <p className="text-xs text-slate-400 font-black tracking-widest">Plusvalía Anual Proyectada</p>
               </div>
            </div>
         </div>
      </div>

      <div className="py-32 px-6 max-w-7xl mx-auto">
         <div className="flex justify-between items-end mb-20">
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Selección de Élite</h2>
            <Link to="/inmuebles" className="text-green-600 font-black uppercase text-xs border-b-4 border-green-500 pb-3 hover:text-slate-950 transition-all">Ver Portafolio Completo</Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {featured.slice(0, 4).map((p) => (
               <Link to={`/inmuebles/${p.id}`} key={p.id} className="relative h-[550px] rounded-[3.5rem] overflow-hidden group shadow-2xl bg-white border border-slate-100">
                  <img src={p.images[0]} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 p-10 w-full text-white">
                     <h3 className="text-2xl font-black leading-tight mb-4">{getLoc(p.title, p.title_en)}</h3>
                     <p className="text-2xl font-black text-green-500 mb-6">{formatPrice(p.price)}</p>
                     <div className="font-black uppercase text-[10px] tracking-widest text-slate-400 flex items-center gap-3">
                        <FontAwesomeIcon icon={faTag} className="text-green-600"/> {p.property_type}
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      <LegalService />
      <CinemaService />

      {/* VISION A&C (BLOG) */}
      <div className="bg-slate-50 py-32 px-6 border-t border-slate-200">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-5xl font-black text-slate-950 mb-20 uppercase tracking-tighter italic">Visión <span className="text-green-600 underline">A&C</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group bg-white p-6 rounded-[3rem] shadow-xl hover:-translate-y-4 transition-all duration-500">
                     <div className="h-64 rounded-[2rem] overflow-hidden mb-10 relative shadow-2xl">
                        <img src={post.image_url} className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0" />
                     </div>
                     <h3 className="font-black text-slate-950 text-2xl leading-none group-hover:text-green-600 transition-colors mb-4">{post.title}</h3>
                     <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Leer Artículo <FontAwesomeIcon icon={faArrowRight} className="ml-2"/></p>
                  </Link>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
export default Home;