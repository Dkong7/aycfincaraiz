import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronLeft, faChevronRight, faSearch, faHashtag, faTimes,
  faChartLine, faGavel, faVideo, faArrowRight, faStar, faGem, faShieldAlt, faPercent, 
  faMapMarkedAlt, faPaperPlane, faCity, faTag, faChartBar, faBalanceScale, faCamera,
  faChartPie, faBuilding, faArrowUp, faLeaf
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
  
  // BÃšSQUEDA ZONAL AVANZADA
  const [zoneInput, setZoneInput] = useState("");
  const [zoneResults, setZoneResults] = useState<any[]>([]);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [searchingZone, setSearchingZone] = useState(false);
  const [currentZoneStats, setCurrentZoneStats] = useState<any>(null);

  useEffect(() => {
    const fetchFeatured = async () => { const { data } = await supabase.from("properties").select("*").limit(4); if (data) setFeatured(data); };
    const fetchBlog = async () => { const { data } = await supabase.from("blogs").select("*").eq("active", true).order("created_at", { ascending: false }).limit(3); if (data) setBlogPosts(data); };
    fetchFeatured(); fetchBlog();
  }, []);

  const nextProp = () => setCurrentIdx((prev) => (prev + 1) % featured.length);
  const prevProp = () => setCurrentIdx((prev) => (prev - 1 + featured.length) % featured.length);
  const handleQuickSearch = () => { if(quickCode) navigate(`/inmuebles?code=${quickCode}`); else navigate("/inmuebles"); };
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  // LÃ“GICA DE COLORES TAGS (PREMIUM)
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
      case "apartamento": return "bg-blue-600 border-blue-500";
      case "casa": return "bg-green-600 border-green-500";
      case "casa campestre": return "bg-purple-700 border-purple-600";
      case "bodega": return "bg-orange-600 border-orange-500";
      default: return "bg-slate-700 border-slate-600";
    }
  };

  // BASE DE DATOS DE ZONAS (SIMULADA CAMACOL)
  const zoneIntelligence: Record<string, any> = {
     "kennedy": { name: "Kennedy / Occidente", price: "$4.2M/mÂ²", growth: "+12.5%", demand: "Muy Alta", vibe: "Comercial & Residencial" },
     "usaquÃ©n": { name: "UsaquÃ©n / Norte", price: "$7.8M/mÂ²", growth: "+8.2%", demand: "Alta", vibe: "Exclusivo & GastronÃ³mico" },
     "suba": { name: "Suba / Colina", price: "$5.5M/mÂ²", growth: "+10.1%", demand: "Alta", vibe: "Residencial & Verde" },
     "fontibÃ³n": { name: "FontibÃ³n / Salitre", price: "$6.1M/mÂ²", growth: "+15.3%", demand: "Explosiva", vibe: "Ejecutivo & Conectado" },
     "chapinero": { name: "Chapinero / ChicÃ³", price: "$9.2M/mÂ²", growth: "+5.4%", demand: "Estable", vibe: "Lujo & Financiero" },
     "chÃ­a": { name: "ChÃ­a / Sabana", price: "$4.8M/mÂ²", growth: "+18.0%", demand: "Muy Alta", vibe: "Campestre & Familiar" },
     "cajicÃ¡": { name: "CajicÃ¡", price: "$4.5M/mÂ²", growth: "+19.2%", demand: "Muy Alta", vibe: "ExpansiÃ³n Urbana" }
  };

  const handleZoneSearch = async () => {
     if(!zoneInput.trim()) return;
     setSearchingZone(true);
     
     // MAPEO BARRIO -> ZONA
     const zoneMap: Record<string, string> = { 
        "marsella": "kennedy", "mandalay": "kennedy", "castilla": "kennedy", "americas": "kennedy",
        "cedritos": "usaquÃ©n", "santa barbara": "usaquÃ©n", "country": "usaquÃ©n", "unicentro": "usaquÃ©n",
        "colina": "suba", "niza": "suba", "mazuren": "suba", "batan": "suba",
        "salitre": "fontibÃ³n", "modelia": "fontibÃ³n", "hayuelos": "fontibÃ³n", "capellania": "fontibÃ³n",
        "centro": "candelaria", "macarena": "santa fe",
        "chico": "chapinero", "rosales": "chapinero", "virrey": "chapinero", "cabrera": "chapinero",
        "fagua": "chÃ­a", "balsillas": "chÃ­a"
     };

     const query = zoneInput.toLowerCase();
     let targetZone = query; // Default: busca lo que escribiÃ³
     
     // Detectar zona padre
     for (const [barrio, localidad] of Object.entries(zoneMap)) { 
        if (query.includes(barrio)) { targetZone = localidad; break; } 
     }

     // Si el input es directo una zona (ej: "Kennedy")
     if (zoneIntelligence[query]) targetZone = query;

     // Cargar Stats
     const stats = zoneIntelligence[targetZone] || { name: zoneInput, price: "Calculando...", growth: "AnÃ¡lisis en curso", demand: "Variable", vibe: "Zona en estudio" };
     setCurrentZoneStats(stats);

     // Consulta HÃ­brida: Busca por Localidad (targetZone) O por el texto exacto del usuario (query)
     const { data } = await supabase
        .from("properties")
        .select("*")
        .or(`city.ilike.%${targetZone}%,neighborhood.ilike.%${targetZone}%,neighborhood.ilike.%${query}%`)
        .limit(10);

     setZoneResults(data || []);
     setShowZoneModal(true);
     setSearchingZone(false);
  };

  const current = featured[currentIdx] || {};

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-hidden">
      
      {/* --- MODAL INTELLIGENCE --- */}
      {showZoneModal && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-white w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col border border-white/20">
               <button onClick={() => setShowZoneModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500 z-10 p-2 bg-white/10 rounded-full transition"><FontAwesomeIcon icon={faTimes} size="lg" /></button>
               
               {/* HEADER: FICHA TÃ‰CNICA ZONA */}
               <div className="p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                     <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-1 block"><FontAwesomeIcon icon={faMapMarkedAlt}/> AnÃ¡lisis de Mercado</span>
                     <h3 className="text-3xl font-black">{currentZoneStats?.name}</h3>
                     <p className="text-slate-400 text-sm mt-1 flex items-center gap-2"><FontAwesomeIcon icon={faCity}/> {currentZoneStats?.vibe}</p>
                  </div>
                  
                  {/* METRICAS DE ZONA */}
                  <div className="flex gap-4 md:gap-8 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
                     <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase">Valor mÂ²</p>
                        <p className="text-lg font-bold text-white">{currentZoneStats?.price}</p>
                     </div>
                     <div className="w-px bg-white/10"></div>
                     <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase">ValorizaciÃ³n</p>
                        <p className="text-lg font-bold text-green-400">{currentZoneStats?.growth}</p>
                     </div>
                     <div className="w-px bg-white/10"></div>
                     <div className="text-center">
                        <p className="text-xs text-slate-400 uppercase">Demanda</p>
                        <p className="text-lg font-bold text-yellow-400">{currentZoneStats?.demand}</p>
                     </div>
                  </div>
               </div>

               <div className="p-8 overflow-y-auto bg-gray-50 flex-grow">
                  <h4 className="font-bold text-slate-700 mb-6 text-lg">Oportunidades Disponibles en la Zona</h4>
                  {zoneResults.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {zoneResults.map(prop => (
                           <Link to={`/inmuebles/${prop.id}`} key={prop.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition group border border-gray-100 flex flex-col h-full">
                              <div className="h-48 bg-gray-200 relative overflow-hidden">
                                 {prop.images && prop.images[0] && <img src={prop.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />}
                                 <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wider ${getTypeBgClass(prop.property_type)}`}>
                                    {prop.property_type}
                                 </span>
                              </div>
                              <div className="p-5 flex flex-col flex-grow">
                                 <h4 className="font-bold text-slate-800 text-base leading-tight mb-2 line-clamp-2">{prop.title}</h4>
                                 <p className="text-xs text-slate-500 mb-4 flex items-center gap-1"><FontAwesomeIcon icon={faMapMarkedAlt}/> {prop.neighborhood}</p>
                                 <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-3">
                                    <p className="text-green-600 font-black text-lg">{formatPrice(prop.price)}</p>
                                    <span className="text-xs text-blue-600 font-bold hover:underline">Ver Detalles</span>
                                 </div>
                              </div>
                           </Link>
                        ))}
                     </div>
                  ) : (
                     <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl"><FontAwesomeIcon icon={faSearch} /></div>
                        <p className="text-slate-800 font-bold">Â¡Zona de Alta Demanda!</p>
                        <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">Actualmente no tenemos activos publicados en esta micro-zona exacta, pero nuestros agentes pueden buscar por ti en la red privada.</p>
                        <Link to="/contacto" className="inline-block bg-slate-900 text-white font-bold px-8 py-3 rounded-full hover:bg-slate-700 shadow-lg">Solicitar BÃºsqueda Privada</Link>
                     </div>
                  )}
               </div>
            </div>
         </div>
      )}

      {/* HERO SECTION */}
      {featured.length > 0 && (
      <div className="relative bg-white pb-12 z-0">
         <div className="max-w-7xl mx-auto md:p-6 p-0">
            <div className="flex flex-col lg:flex-row shadow-2xl md:rounded-2xl rounded-none overflow-hidden bg-white min-h-[auto] lg:min-h-[500px]">
               <div className="lg:w-[70%] relative h-[400px] lg:h-[500px] bg-black group overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/30 z-10"></div>
                  <img src={current.images[0]} alt={current.title} className="w-full h-full object-cover transition-all duration-700 hover:scale-105" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-4">
                     <span className={`${getTypeBgClass(current.property_type)} text-white text-xs font-bold px-3 py-1 rounded uppercase mb-4 tracking-widest border shadow-sm`}>
                        {getLoc(current.property_type, current.property_type_en)}
                     </span>
                     <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2 leading-tight px-2">{getLoc(current.title, current.title_en)}</h2>
                     <button onClick={() => navigate(`/inmuebles/${current.id}`)} className="px-8 py-3 bg-white text-slate-800 font-bold rounded-full hover:bg-yellow-400 hover:text-slate-900 transition shadow-lg uppercase text-sm tracking-widest mt-4">{t("hero_btn")}</button>
                  </div>
                  <button onClick={prevProp} className="absolute top-1/2 left-2 z-30 w-12 h-12 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-800 transition"><FontAwesomeIcon icon={faChevronLeft} /></button>
                  <button onClick={nextProp} className="absolute top-1/2 right-2 z-30 w-12 h-12 border-2 border-white text-white rounded-full flex items-center justify-center hover:bg-white hover:text-slate-800 transition"><FontAwesomeIcon icon={faChevronRight} /></button>
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

      {/* --- MÃ“DULO INTELIGENCIA DE MERCADO (REDISEÃ‘ADO) --- */}
      <div className="bg-slate-950 py-24 px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
         <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20 relative z-10">
            
            {/* LADO IZQ: INPUT */}
            <div className="lg:w-1/2 text-white">
                <div className="flex items-center gap-2 mb-4">
                   <div className="h-px w-8 bg-yellow-500"></div>
                   <span className="text-yellow-500 font-bold tracking-widest text-xs uppercase">Camacol Data Driven</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 leading-none tracking-tight">
                   InversiÃ³n <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Inteligente.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-10 leading-relaxed font-light max-w-lg">
                   No adivines. Usamos analÃ­tica de datos de valorizaciÃ³n barrial para decirte dÃ³nde poner tu capital. Â¿QuÃ© zona te interesa?
                </p>
                
                <div className="bg-white p-2 rounded-full flex items-center shadow-2xl max-w-md transform hover:scale-105 transition duration-300">
                   <div className="pl-6 text-slate-400"><FontAwesomeIcon icon={faSearch} /></div>
                   <input 
                      className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 flex-grow px-4 py-3 font-medium" 
                      placeholder="Ej: Marsella, Cedritos, Modelia..." 
                      value={zoneInput} 
                      onChange={(e) => setZoneInput(e.target.value)} 
                      onKeyDown={(e) => e.key === "Enter" && handleZoneSearch()}
                   />
                   <button onClick={handleZoneSearch} className="bg-slate-900 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-blue-600 transition shadow-lg">
                      {searchingZone ? <FontAwesomeIcon icon={faChartPie} spin /> : <FontAwesomeIcon icon={faArrowRight} />}
                   </button>
                </div>
                <p className="text-xs text-slate-600 mt-4 ml-6 italic">Prueba escribiendo "Marsella" o "Cedritos".</p>
            </div>

            {/* LADO DER: METRICS GRID (VISUALMENTE RICO) */}
            <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4">
               {/* CARD 1 */}
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-xl mb-4 group-hover:scale-110 transition"><FontAwesomeIcon icon={faChartLine} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">+12%</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">ValorizaciÃ³n Promedio</p>
                  <p className="text-[10px] text-slate-500 mt-2">Sabana Norte (2024-2025)</p>
               </div>
               {/* CARD 2 */}
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group mt-8">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-xl mb-4 group-hover:scale-110 transition"><FontAwesomeIcon icon={faLeaf} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">A+</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">CertificaciÃ³n Sostenible</p>
                  <p className="text-[10px] text-slate-500 mt-2">Nuevos proyectos VIS/NO VIS</p>
               </div>
               {/* CARD 3 */}
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-xl mb-4 group-hover:scale-110 transition"><FontAwesomeIcon icon={faBuilding} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">95%</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">OcupaciÃ³n Arriendos</p>
                  <p className="text-[10px] text-slate-500 mt-2">Zonas Cedritos / Salitre</p>
               </div>
               {/* CARD 4 */}
               <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition duration-500 group mt-8">
                  <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center text-yellow-400 text-xl mb-4 group-hover:scale-110 transition"><FontAwesomeIcon icon={faArrowUp} /></div>
                  <h4 className="text-3xl font-black text-white mb-1">Top 3</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">Rentabilidad Latam</p>
                  <p className="text-[10px] text-slate-500 mt-2">InversiÃ³n Finca RaÃ­z Col.</p>
               </div>
            </div>
         </div>
      </div>

      {/* --- SELECCIÃ“N PREMIUM (4 Cards Compactas) --- */}
      <div className="py-20 px-4 md:px-6 max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-4">
            <div className="max-w-2xl">
               <span className="text-yellow-600 font-bold uppercase tracking-widest text-xs flex items-center gap-2 mb-2"><FontAwesomeIcon icon={faStar} /> Exclusividad</span>
               <h2 className="text-3xl font-bold text-slate-800 mb-4">{t("home_premium_title")}</h2>
               <p className="text-gray-500 text-sm leading-relaxed">{t("home_premium_desc")}</p>
            </div>
            <Link to="/inmuebles?type=premium" className="text-blue-900 font-bold hover:underline mt-4 md:mt-0 block">Ver todo el portafolio</Link>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {featured.slice(0, 4).map((prop) => (
               <Link to={`/inmuebles/${prop.id}`} key={prop.id} className="relative h-[380px] rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 bg-white">
                  <img src={prop.images[0]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity"></div>
                  <div className="absolute top-4 left-4"><span className="bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-md">Oportunidad</span></div>
                  <div className="absolute bottom-0 left-0 p-5 w-full text-white">
                     <span className="text-xs font-light text-slate-300 block mb-1 uppercase tracking-wider">{prop.city}</span>
                     <h3 className="text-md font-bold leading-tight mb-2 line-clamp-2">{getLoc(prop.title, prop.title_en)}</h3>
                     <p className="text-lg font-bold text-yellow-400">{formatPrice(prop.price)}</p>
                     <div className="border-t border-white/20 pt-3 mt-3 flex justify-between items-center text-[10px] text-slate-300">
                        <span className="flex items-center gap-1"><FontAwesomeIcon icon={faChartBar} className="text-green-400"/> Alta Demanda</span>
                        {/* TAG CON COLOR DINAMICO RESTAURADO */}
                        <span className={`flex items-center gap-1 ${getTypeColorClass(prop.property_type)}`}>
                           <FontAwesomeIcon icon={faTag} /> {prop.property_type}
                        </span>
                     </div>
                  </div>
               </Link>
            ))}
         </div>
      </div>

      {/* --- SERVICIOS ESTRATÃ‰GICOS (SPLIT BANNER) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2">
         <div className="bg-slate-100 p-12 md:p-20 flex flex-col justify-center items-start group hover:bg-slate-200 transition-colors border-r border-slate-200">
            <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform">
               <FontAwesomeIcon icon={faBalanceScale} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Blindaje JurÃ­dico</h3>
            <p className="text-slate-600 mb-8 max-w-md leading-relaxed">Expertos en estudios de tÃ­tulos y saneamiento.</p>
            <Link to="/servicios/legal" className="text-slate-900 font-bold uppercase tracking-widest text-sm border-b-2 border-slate-900 hover:text-blue-700 hover:border-blue-700 transition pb-1">Consultar <FontAwesomeIcon icon={faArrowRight} className="ml-2"/></Link>
         </div>
         <div className="bg-slate-900 p-12 md:p-20 flex flex-col justify-center items-start group hover:bg-slate-800 transition-colors relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-16 h-16 bg-yellow-500 text-slate-900 rounded-full flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 transition-transform relative z-10">
               <FontAwesomeIcon icon={faCamera} />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Audiovisual 4K</h3>
            <p className="text-slate-400 mb-8 max-w-md leading-relaxed relative z-10">Drones y recorridos virtuales que venden.</p>
            <Link to="/servicios/audiovisual" className="text-yellow-500 font-bold uppercase tracking-widest text-sm border-b-2 border-yellow-500 hover:text-white hover:border-white transition pb-1 relative z-10">Ver Demo <FontAwesomeIcon icon={faArrowRight} className="ml-2"/></Link>
         </div>
      </div>

      {/* BLOG */}
      <div className="bg-white py-20 px-4 border-t border-gray-100">
         <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12"><h2 className="text-3xl font-bold text-slate-800">{t("blog_home_title")}</h2></div>
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