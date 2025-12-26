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

  const current = featured[currentIdx] || { images: [] };

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden font-sans">
      
      {/* HERO SECTION - REGLA DE COLORES Y CONTROLES */}
      {featured.length > 0 && (
      <section className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-[3rem] rounded-none overflow-hidden bg-white min-h-[650px]">
               <div className="lg:w-[75%] relative h-[450px] lg:h-auto bg-black group overflow-hidden">
                  <img src={current.images[subPhotoIdx]} className="w-full h-full object-cover transition-all duration-1000 transform scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10"></div>
                  
                  <button onClick={prevProp} className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white hover:bg-green-600 transition-all flex items-center justify-center backdrop-blur-md">
                     <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <button onClick={nextProp} className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border border-white/20 bg-black/20 text-white hover:bg-green-600 transition-all flex items-center justify-center backdrop-blur-md">
                     <FontAwesomeIcon icon={faChevronRight} />
                  </button>

                  <div className="absolute bottom-20 left-12 z-20 max-w-xl text-left">
                     <span className="bg-green-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest mb-6 inline-block shadow-lg italic">SelecciÃ³n Ã‰lite</span>
                     <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 drop-shadow-2xl">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-2xl text-green-400 font-bold mb-8">{formatPrice(current.price)}</p>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="bg-green-600 text-white px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-3xl">Ver Inmueble</button>
                  </div>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-2">
                     {current.images.map((img: string, i: number) => (
                        <button key={i} onClick={() => setSubPhotoIdx(i)} className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all ${subPhotoIdx === i ? "border-green-500 scale-110 shadow-2xl" : "border-white/20 opacity-50 hover:opacity-100"}`}>
                           <img src={img} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>
               </div>

               <div className="lg:w-[25%] bg-slate-50 p-12 flex flex-col justify-center border-l border-slate-100 text-center">
                  <h3 className="text-slate-950 font-black text-3xl mb-10 tracking-tighter uppercase italic">CÃ³digo <br/><span className="text-green-600 font-serif">A&C</span></h3>
                  <input className="w-full p-6 text-center border-2 border-slate-200 rounded-3xl bg-white text-xl font-black outline-none focus:border-green-500 transition-all mb-8 shadow-inner" placeholder="CÃ“DIGO A&C" value={quickCode} onChange={(e)=>setQuickCode(e.target.value)} />
                  <button onClick={()=>navigate(`/inmuebles?code=${quickCode}`)} className="w-full bg-slate-950 text-white font-black py-6 rounded-3xl shadow-xl hover:bg-green-600 transition-all uppercase tracking-widest text-[10px]">Localizar</button>
               </div>
            </div>
         </div>
      </section>
      )}

      {/* INTELLIGENCE SECTION - REFUERZO EQUIPO VENTAS */}
      <section className="bg-slate-950 py-32 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 relative z-10">
            <div className="lg:w-1/2 text-white text-left">
                <h2 className="text-5xl md:text-7xl font-black mb-10 leading-none italic">Â¿QuÃ© zona <br/><span className="text-green-500 underline font-serif">te interesa?</span></h2>
                <p className="text-slate-400 text-xl mb-12 max-w-lg leading-relaxed font-light">
                   Nuestro equipo de agentes Ã©lite realiza el **scouting exclusivo** de mercado a tu medida. <strong>Dinos quÃ© buscas y lo encontraremos.</strong>
                </p>
                <div className="bg-white p-3 rounded-full flex items-center shadow-3xl max-w-lg transition-all focus-within:ring-4 ring-green-600/20">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-950 placeholder-slate-400 flex-grow px-4 py-4 font-black" placeholder="Ej: Rosales, ChÃ­a..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} />
                   <button onClick={() => navigate("/contacto")} className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-green-700 transition-all shadow-lg"><FontAwesomeIcon icon={faPaperPlane} size="lg"/></button>
                </div>
            </div>
            
            <div className="lg:w-1/2 w-full grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faUserTie} className="text-green-500 mb-6 text-4xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">Scouting</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest italic">Personal Hunter 24/7</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] mt-12 group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faHandshake} className="text-blue-500 mb-6 text-4xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">Cierre Ã‰lite</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest italic">Expertos Negociadores</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faRocket} className="text-yellow-500 mb-6 text-4xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">Venta Flash</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest italic">Tiempo RÃ©cord de Cierre</p>
               </div>
               <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] mt-12 group hover:bg-white/10 transition-all">
                  <FontAwesomeIcon icon={faChartLine} className="text-green-400 mb-6 text-4xl"/>
                  <h4 className="text-4xl font-black text-white mb-2">+Valor</h4>
                  <p className="text-xs text-slate-400 font-black uppercase tracking-widest italic">OptimizaciÃ³n de Activos</p>
               </div>
            </div>
         </div>
      </section>

      <LegalService />
      <CinemaService />

      {/* VISIÃ“N A&C */}
      <section className="bg-slate-50 py-32 px-6 border-t border-slate-200">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-center text-5xl font-black text-slate-950 mb-20 uppercase tracking-tighter italic">VisiÃ³n <span className="text-green-600 underline font-serif">A&C</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group bg-white p-6 rounded-[3rem] shadow-xl hover:-translate-y-4 transition-all duration-500 border border-slate-50">
                     <div className="h-64 rounded-[2rem] overflow-hidden mb-10 relative shadow-2xl"><img src={post.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" /></div>
                     <h3 className="font-black text-slate-950 text-2xl mb-4 leading-tight">{post.title}</h3>
                     <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Leer Reporte <FontAwesomeIcon icon={faArrowRight} className="ml-2"/></p>
                  </Link>
               ))}
            </div>
         </div>
      </section>
      
      {/* BOTÃ“N SUBIR (FLOTANTE) */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-8 right-8 z-[500] w-14 h-14 bg-slate-950 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-all">
         <FontAwesomeIcon icon={faChevronLeft} className="rotate-90" />
      </button>
    </div>
  );
};
export default Home;