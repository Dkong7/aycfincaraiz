import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faArrowRight, faStar, faMapMarkedAlt, faPaperPlane, faCity, 
  faTag, faChartBar, faBalanceScale, faCamera, faBuilding, faStopwatch, 
  faShieldAlt, faEye, faPlayCircle, faFileContract
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
  const [currentZoneStats, setCurrentZoneStats] = useState<any>(null);

  useEffect(() => {
    const fetchFeatured = async () => { const { data } = await supabase.from("properties").select("*").limit(5); if (data) setFeatured(data); };
    const fetchBlog = async () => { const { data } = await supabase.from("blogs").select("*").eq("active", true).order("created_at", { ascending: false }).limit(3); if (data) setBlogPosts(data); };
    fetchFeatured(); fetchBlog();
  }, []);

  const nextProp = () => setCurrentIdx((prev) => (prev + 1) % featured.length);
  const prevProp = () => setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length);
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

  // DATOS DE MERCADO (CORREGIDOS Y RELEVANTES)
  const zoneIntelligence: Record<string, any> = {
     "kennedy": { name: "Kennedy", price: "$4.2M/m²", metric1: "Alta Rotación", metric1Label: "Velocidad Venta", metric2: "98%", metric2Label: "Ocupación" },
     "usaquén": { name: "Usaquén", price: "$7.8M/m²", metric1: "Premium", metric1Label: "Perfil Inquilino", metric2: "AAA", metric2Label: "Seguridad" },
     "suba": { name: "Suba", price: "$5.5M/m²", metric1: "Familiar", metric1Label: "Entorno", metric2: "+8%", metric2Label: "Plusvalía" },
     "chapinero": { name: "Chapinero", price: "$9.2M/m²", metric1: "Lujo", metric1Label: "Target", metric2: "$$$", metric2Label: "Rentabilidad" },
     "chía": { name: "Chía", price: "$4.8M/m²", metric1: "Campestre", metric1Label: "Estilo", metric2: "Baja", metric2Label: "Densidad" },
  };

  const handleZoneSearch = async () => {
     if(!zoneInput.trim()) return;
     setSearchingZone(true);
     const zoneMap: Record<string, string> = { 
        "marsella": "kennedy", "cedritos": "usaquén", "colina": "suba", 
        "salitre": "fontibón", "modelia": "fontibón", "chico": "chapinero" 
     };
     const query = zoneInput.toLowerCase();
     let targetZone = query;
     for (const [barrio, localidad] of Object.entries(zoneMap)) { if (query.includes(barrio)) { targetZone = localidad; break; } }
     
     const stats = zoneIntelligence[targetZone] || { name: "Zona en Análisis", price: "Calculando...", metric1: "Variable", metric1Label: "Demanda", metric2: "Estable", metric2Label: "Tendencia" };
     setCurrentZoneStats(stats);

     const { data } = await supabase.from("properties").select("*").or(`city.ilike.%${targetZone}%,neighborhood.ilike.%${targetZone}%,neighborhood.ilike.%${query}%`).limit(6);
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
               <button onClick={() => setShowZoneModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-10 bg-white/10 p-2 rounded-full"><FontAwesomeIcon icon={faTimes} /></button>
               <div className="p-8 bg-slate-900 text-white flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800">
                  <div>
                     <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest block mb-1">Reporte Flash</span>
                     <h3 className="text-3xl font-black">{currentZoneStats?.name}</h3>
                  </div>
                  <div className="flex gap-6 text-center">
                     <div><p className="text-xs text-slate-400 uppercase">Ref. Metro Cuadrado</p><p className="text-xl font-bold text-white">{currentZoneStats?.price}</p></div>
                     <div className="w-px bg-slate-700"></div>
                     <div><p className="text-xs text-slate-400 uppercase">{currentZoneStats?.metric1Label}</p><p className="text-xl font-bold text-green-400">{currentZoneStats?.metric1}</p></div>
                  </div>
               </div>
               <div className="p-8 overflow-y-auto bg-gray-50 flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
                  {zoneResults.length > 0 ? zoneResults.map(p => (
                     <Link to={`/inmuebles/${p.id}`} key={p.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition group overflow-hidden border border-gray-100">
                        <div className="h-40 bg-gray-200 relative"><img src={p.images[0]} className="w-full h-full object-cover" /></div>
                        <div className="p-4"><h4 className="font-bold text-slate-800 text-sm truncate">{p.title}</h4><p className="text-green-600 font-bold mt-1">{formatPrice(p.price)}</p></div>
                     </Link>
                  )) : <div className="col-span-3 text-center py-12 text-slate-500">Sin inmuebles públicos en esta zona. Contacta a un agente.</div>}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION CON THUMBNAILS RECUPERADOS */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-3xl rounded-none overflow-hidden bg-white min-h-[550px]">
               
               {/* IMAGEN PRINCIPAL */}
               <div className="lg:w-[70%] relative h-[450px] lg:h-auto bg-black group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10"></div>
                  
                  {/* IMAGEN DE FONDO */}
                  <img src={current.images[0]} alt={current.title} className="w-full h-full object-cover transition-all duration-1000 transform hover:scale-105" />
                  
                  {/* INFO FLOTANTE */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4">
                     <span className={`${getTypeBgClass(current.property_type)} text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block shadow-lg`}>
                        {getLoc(current.property_type, current.property_type_en)}
                     </span>
                     <h2 className="text-3xl md:text-6xl font-black text-white drop-shadow-2xl mb-4 leading-tight">{getLoc(current.title, current.title_en)}</h2>
                     <p className="text-lg md:text-2xl font-light text-slate-200 mb-8">{getLoc(current.city, current.city_en)} <span className="mx-2 text-yellow-500">•</span> {formatPrice(current.price)}</p>
                     
                     <div className="flex justify-center gap-4">
                        <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-yellow-400 transition shadow-xl uppercase text-xs tracking-widest">
                           {t("hero_btn")}
                        </button>
                     </div>
                  </div>

                  {/* THUMBNAILS NAVIGATOR (RECUPERADO) */}
                  <div className="absolute bottom-8 left-0 w-full z-30 px-8 hidden md:flex justify-center gap-4">
                     {featured.map((item, idx) => (
                        <button 
                           key={item.id} 
                           onClick={() => selectProp(idx)}
                           className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${idx === currentIdx ? "border-yellow-500 scale-110 shadow-lg" : "border-white/50 opacity-70 hover:opacity-100 hover:scale-105"}`}
                        >
                           <img src={item.images[0]} className="w-full h-full object-cover" />
                        </button>
                     ))}
                  </div>

                  {/* FLECHAS MOVIL */}
                  <button onClick={prevProp} className="absolute top-1/2 left-4 z-30 w-10 h-10 border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-900 transition md:hidden"><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <button onClick={nextProp} className="absolute top-1/2 right-4 z-30 w-10 h-10 border border-white/30 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-900 transition md:hidden"><FontAwesomeIcon icon={faChevronRight} /></button>
               </div>

               {/* BÚSQUEDA RÁPIDA (Derecha) */}
               <div className="lg:w-[30%] bg-slate-50 p-8 flex flex-col justify-center border-l border-slate-100">
                  <div className="mb-8">
                     <span className="text-yellow-600 text-xs font-bold uppercase tracking-widest mb-2 block">Acceso Directo</span>
                     <h3 className="text-slate-900 font-black text-2xl leading-none">Búsqueda por Código</h3>
                  </div>
                  <div className="space-y-6 flex-1">
                     <div className="relative">
                        <input className="w-full p-5 pl-12 border border-slate-200 rounded-2xl bg-white text-sm font-bold text-slate-800 outline-none focus:ring-2 focus:ring-slate-900 transition shadow-sm" placeholder="Ej: 2501" value={quickCode} onChange={(e) => setQuickCode(e.target.value)} />
                        <FontAwesomeIcon icon={faHashtag} className="absolute left-5 top-5 text-slate-300" />
                     </div>
                     <p className="text-xs text-slate-400 leading-relaxed px-2">
                        Si ya tienes el ID de la propiedad entregado por un asesor, ingrésalo aquí para ir directamente a la ficha técnica.
                     </p>
                  </div>
                  <button onClick={handleQuickSearch} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-slate-800 transition mt-6 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                     <FontAwesomeIcon icon={faSearch} /> {t("search_btn")}
                  </button>
               </div>
            </div>
         </div>
      </div>
      )}

      {/* --- MÓDULO INTELIGENCIA DE MERCADO (DATOS CORREGIDOS) --- */}
      <div className="bg-slate-950 py-24 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
            <div className="lg:w-1/2 text-white">
                <div className="flex items-center gap-3 mb-6">
                   <div className="h-px w-10 bg-yellow-500"></div>
                   <span className="text-yellow-500 font-bold tracking-[0.2em] text-[10px] uppercase">Data Driven Real Estate</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[0.9] tracking-tighter">
                   ¿Qué zona <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">te interesa?</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light max-w-lg">
                   Analítica predictiva para tu inversión. Cruzamos datos de seguridad, valorización y demanda para recomendarte dónde está el dinero inteligente hoy.
                </p>
                <div className="bg-white p-2 rounded-full flex items-center shadow-[0_0_40px_rgba(255,255,255,0.1)] max-w-md transition duration-300 focus-within:scale-105">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 flex-grow px-4 py-3 font-bold" placeholder="Ej: Cedritos, Salitre..." value={zoneInput} onChange={(e) => setZoneInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()} />
                   <button onClick={handleZoneSearch} className="bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-blue-600 transition shadow-lg">{searchingZone ? <FontAwesomeIcon icon={faCity} spin /> : <FontAwesomeIcon icon={faArrowRight} />}</button>
                </div>
            </div>
            
            {/* GRID DE MÉTRICAS (DATOS REALISTAS) */}
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group">
                  <div className="text-yellow-400 text-2xl mb-4"><FontAwesomeIcon icon={faStopwatch} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">45 Días</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Tiempo Promedio Venta</p>
                  <p className="text-[10px] text-slate-500 mt-2">Zonas de Alta Rotación</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group mt-8">
                  <div className="text-green-400 text-2xl mb-4"><FontAwesomeIcon icon={faChartLine} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">+8.5%</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Plusvalía Anual</p>
                  <p className="text-[10px] text-slate-500 mt-2">Proyección 2025-2026</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group">
                  <div className="text-purple-400 text-2xl mb-4"><FontAwesomeIcon icon={faBuilding} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">98%</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Ocupación Arriendos</p>
                  <p className="text-[10px] text-slate-500 mt-2">Norte de Bogotá</p>
               </div>
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group mt-8">
                  <div className="text-blue-400 text-2xl mb-4"><FontAwesomeIcon icon={faShieldAlt} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">Segura</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Inversión Certificada</p>
                  <p className="text-[10px] text-slate-500 mt-2">Estudio de Títulos</p>
               </div>
            </div>
         </div>
      </div>

      {/* --- SELECCIÓN PREMIUM --- */}
      <div className="py-24 px-4 md:px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
               <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-3"><FontAwesomeIcon icon={faStar} /> Colección Privada</span>
               <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Oportunidades Premium</h2>
               <p className="text-slate-500 text-lg leading-relaxed">Selección curada de activos con alto potencial de valorización y características únicas.</p>
            </div>
            <Link to="/inmuebles?type=premium" className="text-slate-900 font-bold border-b-2 border-slate-900 hover:text-blue-700 hover:border-blue-700 transition pb-1 mt-6 md:mt-0">Explorar Todo</Link>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {featured.slice(0, 4).map((prop) => (
               <Link to={`/inmuebles/${prop.id}`} key={prop.id} className="relative h-[420px] rounded-[2rem] overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  <img src={prop.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* TAG FLOTANTE */}
                  <div className="absolute top-5 left-5">
                     <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Disponible
                     </span>
                  </div>

                  {/* INFO CARD */}
                  <div className="absolute bottom-0 left-0 p-6 w-full text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     <span className="text-[10px] font-bold text-slate-300 block mb-1 uppercase tracking-widest">{prop.city}</span>
                     <h3 className="text-lg font-black leading-tight mb-2 line-clamp-2">{getLoc(prop.title, prop.title_en)}</h3>
                     <p className="text-2xl font-bold text-yellow-400 mb-4">{formatPrice(prop.price)}</p>
                     
                     <div className="border-t border-white/10 pt-4 flex justify-between items-center text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <span className={`font-bold flex items-center gap-2 ${getTypeColorClass(prop.property_type)}`}>
                           <FontAwesomeIcon icon={faTag} /> {prop.property_type}
                        </span>
                        <span className="flex items-center gap-1 text-slate-300"><FontAwesomeIcon icon={faEye} /> Ver detalles</span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      {/* --- SERVICIOS CREATIVOS (NUEVO DISEÑO ASIMÉTRICO) --- */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            
            {/* CARD JURIDICA (Clean & Trust) */}
            <div className="bg-white rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-slate-100 flex flex-col justify-center items-start relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
               <div className="absolute top-0 right-0 p-10 opacity-5 text-9xl text-slate-300 rotate-12"><FontAwesomeIcon icon={faFileContract} /></div>
               <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl text-slate-900 mb-8 shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <FontAwesomeIcon icon={faBalanceScale} />
               </div>
               <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 tracking-tight">Blindaje <br/>Patrimonial</h3>
               <p className="text-slate-600 text-lg mb-8 leading-relaxed max-w-sm">
                  Protegemos tu capital con estudios de títulos exhaustivos y saneamiento jurídico antes de cualquier firma.
               </p>
               <Link to="/servicios/legal" className="text-blue-700 font-bold uppercase tracking-widest text-xs border-b border-blue-200 hover:border-blue-700 pb-1 flex items-center gap-2">
                  Consultar Abogados <FontAwesomeIcon icon={faArrowRight} />
               </Link>
            </div>

            {/* CARD AUDIOVISUAL (Dark & Tech) */}
            <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-16 shadow-2xl flex flex-col justify-center items-start relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 text-white">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
               <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-600/30 rounded-full blur-[80px]"></div>
               
               <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl text-yellow-400 mb-8 shadow-inner relative z-10 group-hover:scale-110 transition-transform">
                  <FontAwesomeIcon icon={faCamera} />
               </div>
               <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tight relative z-10">Real Estate <br/><span className="text-purple-400">Cinema</span></h3>
               <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-sm relative z-10">
                  Drones FPV, recorridos 4K y producción de cine. Elevamos el valor percibido de tu inmueble para venderlo en tiempo récord.
               </p>
               <Link to="/servicios/audiovisual" className="text-yellow-400 font-bold uppercase tracking-widest text-xs border-b border-yellow-400/30 hover:border-yellow-400 pb-1 flex items-center gap-2 relative z-10">
                  Ver Demo Reel <FontAwesomeIcon icon={faPlayCircle} />
               </Link>
            </div>

         </div>
      </div>

      {/* BLOG */}
      <div className="bg-white py-20 px-4 border-t border-slate-100">
         <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
               <div className="h-px bg-slate-200 flex-grow"></div>
               <h2 className="text-2xl font-bold text-slate-400 uppercase tracking-widest">{t("blog_home_title")}</h2>
               <div className="h-px bg-slate-200 flex-grow"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {blogPosts.map(post => (
                  <Link to={`/blog/${post.id}`} key={post.id} className="group">
                     <div className="h-64 rounded-2xl overflow-hidden mb-6 relative shadow-md">
                        <img src={post.image_url} className="w-full h-full object-cover transition duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition"></div>
                     </div>
                     <div className="px-2">
                        <div className="text-[10px] text-blue-600 mb-2 uppercase font-black tracking-widest">{new Date(post.created_at).toLocaleDateString()}</div>
                        <h3 className="font-bold text-slate-900 text-xl mb-3 leading-tight group-hover:text-blue-700 transition">{post.title}</h3>
                        <span className="text-slate-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:translate-x-2 transition-transform">{t("read_more")} <FontAwesomeIcon icon={faArrowRight} className="text-[10px]" /></span>
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