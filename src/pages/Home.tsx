import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, 
  faChartLine, faGavel, faVideo, faHardHat, faArrowRight, faStar, faGem, faShieldAlt, faPercent 
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useApp } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const { formatPrice, t, lang } = useApp();
  const navigate = useNavigate();
  const [featured, setFeatured] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [quickCode, setQuickCode] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase.from("properties").select("*").limit(5);
      if (data && data.length > 0) setFeatured(data);
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
  
  const handleQuickSearch = () => {
     if(quickCode) navigate(`/inmuebles?code=${quickCode}`);
     else navigate("/inmuebles");
  };

  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  const getTypeColor = (type: string) => {
    switch(type?.toLowerCase()) {
      case "apartamento": return "bg-blue-600 border-blue-500";
      case "casa": return "bg-green-600 border-green-500";
      case "casa campestre": return "bg-purple-700 border-purple-600";
      case "bodega": return "bg-orange-600 border-orange-500";
      default: return "bg-slate-700 border-slate-600";
    }
  };

  if (featured.length === 0) return <div className="h-96 flex items-center justify-center">Cargando...</div>;
  const current = featured[currentIdx];

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden">
      
      {/* 1. HERO SECTION (Responsive Height) */}
      <div className="relative bg-white pb-12">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-2xl rounded-none overflow-hidden bg-white min-h-[auto] lg:min-h-[500px]">
               {/* Slider */}
               <div className="lg:w-[70%] relative h-[400px] lg:h-[500px] bg-black group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/30 z-10"></div>
                  <img src={current.images[0]} alt={current.title} className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                     <span className={`${getTypeColor(current.property_type)} text-white text-xs font-bold px-3 py-1 rounded uppercase mb-4 tracking-widest border shadow-sm`}>
                        {getLoc(current.property_type, current.property_type_en)}
                     </span>
                     <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2 leading-tight px-2">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-lg md:text-2xl font-light mb-6 opacity-90">{getLoc(current.city, current.city_en)} | {formatPrice(current.price)}</p>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="px-8 py-3 bg-white text-slate-800 font-bold rounded-full hover:bg-yellow-400 hover:text-slate-900 transition shadow-lg uppercase text-sm tracking-widest border-2 border-transparent hover:border-white">
                        {t("hero_btn")}
                     </button>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full z-20 leading-[0]">
                     <svg className="w-full h-10 md:h-16 text-slate-800 fill-current" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 100 C 50 0 50 0 100 100 Z"></path></svg>
                  </div>
                  <button onClick={prevProp} className="absolute top-1/2 left-2 md:left-4 z-30 w-10 h-10 md:w-12 md:h-12 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-800 transition"><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <button onClick={nextProp} className="absolute top-1/2 right-2 md:right-4 z-30 w-10 h-10 md:w-12 md:h-12 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-800 transition"><FontAwesomeIcon icon={faChevronRight} /></button>
               </div>
               
               {/* Quick Search */}
               <div className="lg:w-[30%] bg-gray-100 p-6 md:p-8 flex flex-col justify-center border-l border-gray-200">
                  <h3 className="text-slate-800 font-bold text-center text-lg mb-6 uppercase tracking-widest border-b-2 border-slate-800 pb-2 inline-block mx-auto">{t("search_title")}</h3>
                  <div className="space-y-6 flex-1">
                     <div>
                        <label className="text-xs font-bold text-gray-500 uppercase block mb-2">{t("search_code")}</label>
                        <div className="relative">
                           <input className="w-full p-4 pl-10 border border-gray-300 rounded-lg bg-white text-sm focus:ring-2 focus:ring-slate-800 outline-none transition-shadow" placeholder="Ej: 1005" value={quickCode} onChange={(e) => setQuickCode(e.target.value)} />
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

      {/* 2. SERVICIOS (Grid Responsiva 1 -> 3) */}
      <div className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
         <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{t("home_serv_title")}</h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cards Servicios */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
               <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 text-3xl mb-6 group-hover:bg-blue-900 group-hover:text-yellow-400 transition-colors"><FontAwesomeIcon icon={faChartLine} /></div>
               <h3 className="text-xl font-bold text-slate-800 mb-4">{t("serv_aval_title")}</h3>
               <p className="text-gray-600 text-sm leading-relaxed mb-6">{t("serv_aval_desc")}</p>
               <Link to="/servicios/avaluos" className="text-blue-900 font-bold text-sm uppercase tracking-wider hover:text-yellow-600 transition flex items-center gap-2">{t("btn_more")} <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
               <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-800 text-3xl mb-6 group-hover:bg-slate-800 group-hover:text-yellow-400 transition-colors"><FontAwesomeIcon icon={faGavel} /></div>
               <h3 className="text-xl font-bold text-slate-800 mb-4">{t("serv_legal_title")}</h3>
               <p className="text-gray-600 text-sm leading-relaxed mb-6">{t("serv_legal_desc")}</p>
               <Link to="/servicios/legal" className="text-slate-800 font-bold text-sm uppercase tracking-wider hover:text-yellow-600 transition flex items-center gap-2">{t("btn_more")} <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-600 text-3xl mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors"><FontAwesomeIcon icon={faVideo} /></div>
               <h3 className="text-xl font-bold text-slate-800 mb-4">{t("serv_audio_title")}</h3>
               <p className="text-gray-600 text-sm leading-relaxed mb-6">{t("serv_audio_desc")}</p>
               <Link to="/servicios/audiovisual" className="text-red-600 font-bold text-sm uppercase tracking-wider hover:text-slate-900 transition flex items-center gap-2">{t("btn_more")} <FontAwesomeIcon icon={faArrowRight} /></Link>
            </div>
         </div>
      </div>

      {/* 3. B2B SECTION (Stack Vertical en Móvil) */}
      <div className="bg-slate-800 py-20 px-4 md:px-6 relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
            <div className="md:w-1/2 text-white">
               <div className="flex items-center gap-3 mb-4 text-yellow-500">
                  <FontAwesomeIcon icon={faHardHat} className="text-2xl" />
                  <span className="font-bold uppercase tracking-widest">B2B & Partners</span>
               </div>
               <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{t("home_b2b_title")}</h2>
               <p className="text-slate-300 text-lg mb-8 leading-relaxed">{t("home_b2b_desc")}</p>
               <a href="https://wa.me/573134663832" target="_blank" className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-yellow-500 text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-400 transition shadow-lg uppercase text-sm tracking-widest">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-slate-900" /> Agendar Reunión
               </a>
            </div>
            <div className="md:w-1/2 w-full">
               <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80" className="w-full rounded-xl shadow-2xl border-4 border-slate-700 transform rotate-2 hover:rotate-0 transition duration-500" alt="Constructores" />
            </div>
         </div>
      </div>

      {/* 4. PREMIUM SELECTION */}
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

         {/* ELEMENTOS ADICIONALES PREMIUM */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-yellow-600 shadow-sm"><FontAwesomeIcon icon={faGem} /></div>
               <div><h4 className="font-bold text-slate-800 text-sm">Acabados de Lujo</h4><p className="text-xs text-gray-500">Materiales importados y diseño de autor.</p></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-yellow-600 shadow-sm"><FontAwesomeIcon icon={faShieldAlt} /></div>
               <div><h4 className="font-bold text-slate-800 text-sm">Seguridad Privada</h4><p className="text-xs text-gray-500">Monitoreo y vigilancia 24/7 garantizada.</p></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-yellow-600 shadow-sm"><FontAwesomeIcon icon={faPercent} /></div>
               <div><h4 className="font-bold text-slate-800 text-sm">Alta Valorización</h4><p className="text-xs text-gray-500">Ubicaciones con proyección de retorno anual.</p></div>
            </div>
         </div>

         {/* BLOG */}
         <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800">{t("blog_home_title")}</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
               <Link to={`/blog/${post.id}`} key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group border border-gray-100">
                  <div className="h-48 overflow-hidden">
                     <img src={post.image_url} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  </div>
                  <div className="p-6">
                     <div className="text-xs text-gray-400 mb-3 uppercase font-bold">{new Date(post.created_at).toLocaleDateString()}</div>
                     <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 group-hover:text-blue-900 transition">{post.title}</h3>
                     <span className="text-blue-600 font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                        {t("read_more")} <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                     </span>
                  </div>
               </Link>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Home;
