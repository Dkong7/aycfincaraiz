import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faArrowRight, faStar, faMapMarkedAlt, faPaperPlane, faCity, 
  faTag, faChartBar, faBuilding, faStopwatch, faShieldAlt, faEye, faHandshake, faUserTie, faRocket
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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("properties").select("*").eq("active", true).limit(10);
      const { data: blogs } = await supabase.from("blogs").select("*").eq("active", true).limit(3);
      if (data) setFeatured(data);
      if (blogs) setBlogPosts(blogs);
    };
    fetchData();
  }, []);

  const nextProp = () => { setCurrentIdx((prev) => (prev + 1) % featured.length); setSubPhotoIdx(0); };
  const prevProp = () => { setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length); setSubPhotoIdx(0); };
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  const getTypeBgClass = (type: string) => {
    const t = type?.toLowerCase() || "";
    if (t.includes("aparto") || t.includes("apartamento")) return "bg-blue-600";
    if (t.includes("casa") && t.includes("campestre")) return "bg-green-700";
    if (t.includes("casa")) return "bg-green-600";
    if (t.includes("bodega") || t.includes("industrial")) return "bg-slate-800";
    return "bg-slate-700";
  };

  const current = featured[currentIdx] || { images: [] };

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden font-sans">
      {featured.length > 0 && (
      <section className="relative bg-white pb-6 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-xl md:rounded-[2rem] overflow-hidden bg-white min-h-[600px]">
               <div className="lg:w-[75%] relative h-[450px] lg:h-auto bg-black group overflow-hidden border-r border-gray-100">
                  <img src={current.images[subPhotoIdx]} className="w-full h-full object-cover transition-all duration-700 transform scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  
                  <button onClick={prevProp} className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-green-600 transition-all backdrop-blur-md flex items-center justify-center border border-white/20">
                     <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button onClick={nextProp} className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 text-white hover:bg-green-600 transition-all backdrop-blur-md flex items-center justify-center border border-white/20">
                     <FontAwesomeIcon icon={faChevronRight} />
                  </button>

                  <div className="absolute bottom-24 left-8 md:left-12 z-20 max-w-xl text-left">
                     <span className={`${getTypeBgClass(current.property_type)} text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-4 inline-block shadow-lg italic`}>Selección Élite</span>
                     <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-xl text-green-400 font-bold mb-6">{formatPrice(current.price)}</p>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="bg-white text-slate-900 px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-green-600 hover:text-white transition-all">Explorar Activo</button>
                  </div>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                     {current.images.map((img: string, i: number) => (
                        <button key={i} onClick={() => setSubPhotoIdx(i)} className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${subPhotoIdx === i ? "border-green-500 scale-110 shadow-lg" : "border-white/30 opacity-50"}`}>
                           <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               </div>

               <div className="lg:w-[25%] bg-slate-50 p-8 flex flex-col justify-center text-center">
                  <h3 className="text-slate-950 font-black text-xl mb-6 tracking-tighter uppercase">CÓDIGO <br/><span className="text-green-600 font-serif">A&C</span></h3>
                  <input className="w-full p-4 text-center border-2 border-slate-200 rounded-2xl bg-white text-lg font-black outline-none focus:border-green-500 transition-all mb-4" placeholder="CÓDIGO A&C" value={quickCode} onChange={(e)=>setQuickCode(e.target.value)} />
                  <button onClick={()=>navigate(`/inmuebles?code=${quickCode}`)} className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-green-600 transition-all uppercase tracking-widest text-[9px]">Validar</button>
               </div>
            </div>
         </div>
      </section>
      )}

      {/* SCOUTING SECTION */}
      <section className="bg-slate-950 py-24 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="lg:w-1/2 text-white text-left">
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight italic text-white">¿Qué zona <br/><span className="text-green-500 underline decoration-green-900/30">te interesa?</span></h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md font-light leading-relaxed">Nuestro equipo élite realizará el <strong>scouting exclusivo</strong> de mercado a tu medida.</p>
                <div className="bg-white p-2 rounded-full flex items-center shadow-xl max-w-md">
                   <div className="pl-4 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-950 placeholder-slate-400 flex-grow px-4 py-2 font-bold" placeholder="Ej: Rosales, Chía..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} />
                   <button onClick={() => navigate("/contacto")} className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-green-700 transition-all"><FontAwesomeIcon icon={faPaperPlane} /></button>
                </div>
            </div>
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faUserTie} className="text-green-500 mb-3 text-2xl"/>
                  <h4 className="text-2xl font-black text-white">Scouting</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Hunter 24/7</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faHandshake} className="text-blue-500 mb-3 text-2xl"/>
                  <h4 className="text-2xl font-black text-white">Cierre</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Negociadores</p>
               </div>
            </div>
         </div>
      </section>

      <LegalService />
      <CinemaService />

      <section className="bg-white py-24 px-6">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-3xl md:text-4xl font-black text-slate-950 mb-16 uppercase tracking-tighter italic">Visión <span className="text-green-600 underline decoration-green-500/30">A&C</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group bg-white p-4 rounded-[2rem] shadow-md hover:-translate-y-2 transition-all border border-slate-50">
                     <div className="h-56 rounded-2xl overflow-hidden mb-6 shadow-lg"><img src={post.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" /></div>
                     <h3 className="font-black text-slate-950 text-lg mb-4 leading-tight">{post.title}</h3>
                     <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Leer Reporte <FontAwesomeIcon icon={faArrowRight} className="ml-1"/></p>
                  </Link>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};
export default Home;