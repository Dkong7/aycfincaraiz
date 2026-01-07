import React, { useEffect, useState } from "react";
import { 
  ArrowRight, Crown, Star, CheckCircle, X, 
  MapPin, Bed, Bath, Car, Ruler, CheckCircle2,
  BadgeCheck, TrendingUp, FileText, Shield, FileSearch, Scale, Lock
} from "lucide-react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faVrCardboard, faArrowRight as faArrowRightSolid } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { pb } from "../../api";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

// ==========================================
// 1. PROPIEDADES DESTACADAS (Reina + Grid)
// ==========================================
export const FeaturedProperties = () => {
  const { t, translateDynamic } = useLanguage();
  const [opportunity, setOpportunity] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  const safeTranslate = (text: string) => translateDynamic ? translateDynamic(text) : text;
  const getSpecs = (p: any) => { try { return typeof p.specs === 'string' ? JSON.parse(p.specs) : p.specs || {}; } catch { return {}; } };
  const getPrice = (p: any) => new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 }).format(p.price_cop);

  useEffect(() => {
    const fetchFeatured = async () => {
       try {
         const opp = await pb.collection("properties").getList(1, 1, { filter: "is_opportunity=true", sort: "-created", requestKey: null });
         let queen = null;
         if (opp.items.length > 0) { queen = opp.items[0]; setOpportunity(queen); }

         const favs = await pb.collection("properties").getList(1, 5, { filter: "is_ayc_favorite=true", sort: "-created", requestKey: null });
         const filteredFavs = favs.items.filter(p => p.id !== queen?.id).slice(0, 4); 
         setFavorites(filteredFavs);
       } catch (e) { console.error(e); }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end">
           <div><h2 className="text-3xl font-black text-[#0A192F] uppercase">{t.featured.title}</h2><div className="h-1 w-20 bg-green-600 mt-4"></div></div>
           <Link to="/inmuebles" className="hidden md:flex items-center gap-2 text-green-600 font-bold hover:underline">{t.featured.viewAll} <ArrowRight size={20}/></Link>
        </div>

        {opportunity && (
            <div className="flex flex-col lg:flex-row gap-10 items-stretch relative">
                <div className="w-full lg:w-[30%] flex flex-col justify-center space-y-6 z-20 order-2 lg:order-1">
                    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                        <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-yellow-300 mb-4 shadow-sm"><Crown size={16} fill="currentColor" className="text-yellow-600"/> {safeTranslate("Oportunidad Dorada")}</span>
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-[1.1]">{safeTranslate(opportunity.title)}</h2>
                        <p className="text-gray-500 mt-3 flex items-center gap-2 text-sm uppercase font-bold tracking-wide"><MapPin size={16} className="text-yellow-500"/>{safeTranslate(opportunity.neighborhood || opportunity.municipality)}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-yellow-100 shadow-xl shadow-yellow-100/50 relative overflow-hidden group transition-all hover:border-yellow-300">
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{safeTranslate("Por qué la elegimos:")}</p>
                        <ul className="space-y-4">
                            {["Precio por debajo del mercado.", "Ubicación de alta valorización.", "Espacios únicos y acabados premium."].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 font-medium animate-in slide-in-from-left-5 fade-in duration-500" style={{animationDelay: `${idx * 150}ms`}}><div className="mt-0.5 bg-yellow-100 p-1 rounded-full text-yellow-600"><CheckCircle2 size={14} strokeWidth={3}/></div>{safeTranslate(item)}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="pt-2 animate-in fade-in duration-700 delay-300">
                        <p className="text-xs text-gray-400 uppercase font-bold mb-1 tracking-wider">{safeTranslate("Precio de Venta")}</p>
                        <div className="text-4xl font-black text-green-600 mb-6 flex items-baseline gap-1">${getPrice(opportunity)} <span className="text-lg text-gray-400 font-medium">COP</span></div>
                        <Link to={`/inmuebles/${opportunity.id}`} className="group relative w-full overflow-hidden rounded-xl bg-[#0A192F] px-8 py-4 text-white shadow-xl transition-all hover:bg-black hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3">
                            <span className="font-black uppercase tracking-widest text-sm relative z-10">{safeTranslate("VER EXCLUSIVA")}</span><ArrowRight size={18} className="group-hover:translate-x-1 transition-transform relative z-10"/><div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 z-0"></div>
                        </Link>
                    </div>
                </div>
                <div className="w-full lg:w-[70%] relative group order-1 lg:order-2 min-h-[500px]">
                    <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-500 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-80 transition duration-1000 animate-pulse z-0"></div>
                    <div className="relative h-full w-full rounded-[2rem] overflow-hidden shadow-[0_0_60px_rgba(234,179,8,0.3)] border-[6px] border-white z-10 bg-white">
                        <img src={`${PB_URL}/api/files/${opportunity.collectionId}/${opportunity.id}/${opportunity.images?.[0]}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms]" alt={opportunity.title} />
                        <div className="absolute top-8 left-8"><div className="bg-yellow-500 text-white px-5 py-2 rounded-lg font-black uppercase text-xs tracking-widest shadow-lg">{safeTranslate(opportunity.property_type)}</div></div>
                        <div className="absolute bottom-8 left-8 right-8 hidden md:block">
                            <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-5 flex justify-around items-center border border-white/10 text-white shadow-2xl">
                                {(() => { const s = getSpecs(opportunity); return ( <> {(s.area_built || s.area_total) && <div className="flex flex-col items-center gap-1"><Ruler size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.area_built || s.area_total} m²</span></div>} <div className="w-px h-8 bg-white/20"></div> {(s.habs || s.rooms) && <div className="flex flex-col items-center gap-1"><Bed size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.habs || s.rooms}</span></div>} <div className="w-px h-8 bg-white/20"></div> {(s.baths || s.bathrooms) && <div className="flex flex-col items-center gap-1"><Bath size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.baths || s.bathrooms}</span></div>} <div className="w-px h-8 bg-white/20"></div> {s.garages && <div className="flex flex-col items-center gap-1"><Car size={22} className="text-yellow-400"/><span className="text-sm font-bold">{s.garages}</span></div>} </> ) })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {opportunity && favorites.length > 0 && <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>}

        {favorites.length > 0 && (
            <div>
                <div className="flex items-center gap-4 mb-10"><div className="h-10 w-1.5 bg-green-600 rounded-full"></div><h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-3">{safeTranslate("Favoritos AYC")} <Star className="text-green-500 fill-green-500" size={24}/></h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {favorites.map((prop) => {
                        const s = getSpecs(prop);
                        return (
                            <Link key={prop.id} to={`/inmuebles/${prop.id}`} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full hover:-translate-y-2">
                                <div className="h-60 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                                    <img src={`${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${prop.images?.[0]}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={prop.title} />
                                    <div className="absolute top-4 left-4 z-20"><span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase border border-white/20 shadow-sm">{safeTranslate(prop.property_type)}</span></div>
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h4 className="font-bold text-gray-800 text-lg leading-tight mb-2 group-hover:text-green-600 transition-colors line-clamp-2">{safeTranslate(prop.title)}</h4>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 uppercase font-bold mb-6"><MapPin size={14} className="text-green-500"/> <span className="truncate">{safeTranslate(prop.neighborhood || prop.municipality)}</span></div>
                                    <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-1 py-3 border-t border-b border-gray-100 mb-4 text-gray-500">
                                        {(s.habs || s.rooms) && <div className="flex items-center gap-1" title="Habitaciones"><Bed size={16} className="text-green-600"/><span className="text-xs font-bold text-gray-700">{s.habs || s.rooms}</span></div>}
                                        {(s.baths || s.bathrooms) && <div className="flex items-center gap-1" title="Baños"><Bath size={16} className="text-green-600"/><span className="text-xs font-bold text-gray-700">{s.baths || s.bathrooms}</span></div>}
                                        {s.garages && <div className="flex items-center gap-1" title="Garajes"><Car size={16} className="text-green-600"/><span className="text-xs font-bold text-gray-700">{s.garages}</span></div>}
                                        {(s.area_built || s.area_total) && <div className="flex items-center gap-1" title="Área"><Ruler size={16} className="text-green-600"/><span className="text-xs font-bold text-gray-700">{s.area_built || s.area_total}</span></div>}
                                    </div>
                                    <div className="mt-auto flex justify-between items-end">
                                        <div><p className="text-[10px] uppercase text-gray-400 font-bold mb-0.5">Precio</p><p className="text-green-700 font-black text-xl leading-none">${getPrice(prop)}</p></div>
                                        <div className="h-10 w-10 rounded-full bg-gray-100 group-hover:bg-green-600 flex items-center justify-center transition-all group-hover:shadow-lg group-hover:scale-110"><ArrowRight size={18} className="text-gray-400 group-hover:text-white"/></div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

// ==========================================
// 2. NUEVA SECCIÓN DE SERVICIOS INTEGRADOS
// ==========================================
export const ServicesIntro = () => {
  const { t } = useLanguage(); // Lógica de traducción integrada

  return (
    <div className="bg-gray-50">
      
      {/* 2.1 AVALÚOS (TRADUCIDO) */}
      <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-green-200 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                <div className="lg:w-1/2 space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest">
                        <BadgeCheck size={16} /> {t.services.appraisalBadge}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{t.services.appraisalTitlePart1} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">{t.services.appraisalTitlePart2}</span></h2>
                    <p className="text-lg text-slate-500 leading-relaxed">{t.services.appraisalDesc}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {t.services.appraisalItems.map((item: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-green-200 transition-colors"><CheckCircle2 className="text-green-500 shrink-0" size={18}/><span className="text-sm font-bold text-slate-700">{item}</span></div>
                        ))}
                    </div>
                    <Link to="/servicios/avaluos" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-slate-900 text-white font-black uppercase tracking-wide hover:bg-green-600 hover:shadow-lg transition-all transform hover:-translate-y-1">{t.services.appraisalBtn}</Link>
                </div>
                <div className="lg:w-1/2 relative group">
                    <div className="relative h-[500px] w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-white">
                        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop" alt="Perito" className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2000ms]"/>
                        <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20 animate-bounce-slow">
                            <div className="flex items-center gap-4"><div className="p-3 bg-green-100 rounded-full text-green-600"><TrendingUp size={24}/></div><div><p className="text-xs text-slate-400 font-bold uppercase">{t.services.appraisalCard1Label}</p><p className="text-xl font-black text-slate-800">+12.5% {t.services.appraisalCard1Value}</p></div></div>
                        </div>
                        <div className="absolute top-10 right-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-xl border border-white/10 text-white">
                            <div className="flex items-center gap-3"><FileText className="text-green-400" size={20}/><div className="text-xs"><p className="font-bold uppercase tracking-wider opacity-70">{t.services.appraisalCard2Label}</p><p className="font-black text-sm">{t.services.appraisalCard2Value}</p></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2.2 JURÍDICO (TRADUCIDO) */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 mb-4 text-blue-600 font-black uppercase tracking-widest text-xs bg-blue-50 px-4 py-2 rounded-full"><Shield size={14} /> {t.services.legalBadge}</div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase leading-none">{t.services.legalTitlePart1} <br/><span className="text-slate-300">{t.services.legalTitlePart2}</span></h2>
                <p className="text-lg text-slate-500">{t.services.legalDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative bg-slate-50 hover:bg-slate-900 rounded-[2.5rem] p-10 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity"><FileSearch size={120} className="text-slate-900 group-hover:text-white"/></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm mb-8 group-hover:bg-blue-500 group-hover:text-white transition-colors"><FileSearch size={28}/></div>
                        <div><h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-2">{t.services.legalCard1Title}</h3><p className="text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed">{t.services.legalCard1Desc}</p></div>
                    </div>
                </div>
                <div className="group relative bg-slate-900 rounded-[2.5rem] p-10 transform md:-translate-y-4 shadow-2xl shadow-slate-200">
                    <div className="absolute top-0 right-0 p-10 opacity-10"><Scale size={120} className="text-white"/></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 animate-pulse"><Scale size={28}/></div>
                        <div><h3 className="text-2xl font-black text-white mb-2">{t.services.legalCard2Title}</h3><p className="text-slate-300 text-sm leading-relaxed">{t.services.legalCard2Desc}</p></div>
                        <Link to="/servicios/juridico" className="mt-8 text-center py-3 rounded-xl bg-white text-slate-900 font-bold uppercase text-xs tracking-wider hover:bg-blue-50 transition-colors">{t.services.legalBtn}</Link>
                    </div>
                </div>
                <div className="group relative bg-slate-50 hover:bg-slate-900 rounded-[2.5rem] p-10 transition-all duration-500 overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity"><Lock size={120} className="text-slate-900 group-hover:text-white"/></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm mb-8 group-hover:bg-blue-500 group-hover:text-white transition-colors"><Lock size={28}/></div>
                        <div><h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-2">{t.services.legalCard3Title}</h3><p className="text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed">{t.services.legalCard3Desc}</p></div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 2.3 AUDIOVISUAL (TRADUCIDO) */}
      <section className="bg-slate-950 py-32 px-6 relative overflow-hidden text-left border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-24 relative z-10">
          <div className="lg:w-1/2">
            <span className="text-green-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">{t.services.mediaBadge}</span>
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.85] mb-10 tracking-tighter italic">{t.services.mediaTitlePart1} <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 underline font-serif">{t.services.mediaTitlePart2}</span></h2>
            <p className="text-xl text-slate-400 mb-12 max-w-md font-light leading-relaxed"><span dangerouslySetInnerHTML={{ __html: t.services.mediaDesc }} /></p>
            <div className="grid grid-cols-2 gap-10 mb-14 font-sans text-white">
              <div className="flex items-center gap-4 group cursor-default"><FontAwesomeIcon icon={faPlane} className="text-green-500 text-3xl group-hover:scale-110 transition-all" /><span className="font-black uppercase text-[10px] tracking-widest border-b border-green-900 pb-2">{t.services.mediaItem1}</span></div>
              <div className="flex items-center gap-4 group cursor-default"><FontAwesomeIcon icon={faVrCardboard} className="text-blue-400 text-3xl group-hover:scale-110 transition-all" /><span className="font-black uppercase text-[10px] tracking-widest border-b border-blue-900 pb-2">{t.services.mediaItem2}</span></div>
            </div>
            <Link to="/servicios/audiovisual" className="inline-block bg-white text-slate-950 font-black px-14 py-6 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-3xl uppercase text-xs tracking-widest">{t.services.mediaBtn} <FontAwesomeIcon icon={faArrowRightSolid} className="ml-2" /></Link>
          </div>
          <div className="lg:w-1/2 relative group">
            <div className="aspect-video bg-slate-900 rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-[0_0_800px_rgba(34,197,94,0.1)] relative"><iframe className="w-full h-full" src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&mute=1" allowFullScreen></iframe></div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ==========================================
// 3. BLOG RECIENTE
// ==========================================
export const LatestBlog = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
        try {
            const res = await pb.collection("posts").getList(1, 3, { sort: "-created" });
            setPosts(res.items);
        } catch(e) { console.error(e); }
    };
    loadPosts();
  }, []);

  return (
    <section className="py-24 bg-white text-center">
       <div className="max-w-6xl mx-auto px-6">
           <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-4">{t.blog.title}</h2>
           <p className="text-gray-500 mb-12">Conoce las últimas noticias del sector.</p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {posts.map(p => (
                   <Link to="/blog" key={p.id} className="group text-left block">
                       <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-gray-100 relative">
                           {p.image && <img src={`${PB_URL}/api/files/${p.collectionId}/${p.id}/${p.image}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>}
                           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#0A192F] px-3 py-1 text-[10px] font-bold uppercase rounded-full">{new Date(p.created).toLocaleDateString()}</div>
                       </div>
                       <h3 className="text-xl font-bold text-[#0A192F] mb-3 group-hover:text-green-600 transition-colors leading-tight">{p.title}</h3>
                       <p className="text-sm text-gray-500 line-clamp-3">{p.excerpt}</p>
                   </Link>
               ))}
           </div>
           {posts.length === 0 && <p className="text-sm text-gray-400 italic">No hay noticias recientes.</p>}
       </div>
    </section>
  );
};