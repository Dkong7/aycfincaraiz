import React, { useEffect, useState } from "react";
import { ArrowRight, Crown, Star, CheckCircle, Calendar, X } from "lucide-react"; // Añadí Calendar y X
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faVrCardboard, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { pb } from "../../api";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

// ... (FeaturedProperties se mantiene IGUAL) ...
export const FeaturedProperties = () => {
  const { t } = useLanguage();
  const [opportunity, setOpportunity] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
       try {
         const opp = await pb.collection("properties").getList(1, 1, { filter: "is_opportunity=true", sort: "-created", requestKey: null });
         if (opp.items.length > 0) setOpportunity(opp.items[0]);

         const favs = await pb.collection("properties").getList(1, 3, { filter: "is_ayc_favorite=true && is_opportunity=false", sort: "-created", requestKey: null });
         setFavorites(favs.items);
       } catch (e) { console.error(e); }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
              <h2 className="text-3xl font-black text-[#0A192F] uppercase">{t.featured.title}</h2>
              <div className="h-1 w-20 bg-green-600 mt-4"></div>
           </div>
           <Link to="/inmuebles" className="hidden md:flex items-center gap-2 text-green-600 font-bold hover:underline">{t.featured.viewAll} <ArrowRight size={20}/></Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {opportunity && (
             <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl overflow-hidden group border-4 border-[#D4AF37] relative flex flex-col h-full ring-4 ring-[#D4AF37]/20 transition-transform hover:-translate-y-2">
                <div className="absolute inset-0 z-30 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shine"></div>
                <div className="absolute top-0 left-0 w-full bg-[#D4AF37] text-white text-center text-xs font-black py-2 uppercase tracking-widest z-20 flex items-center justify-center gap-2 shadow-md">
                   <Crown size={14}/> {t.featured.goldBadge}
                </div>
                <div className="h-64 lg:h-1/2 bg-gray-200 relative overflow-hidden mt-8">
                   <img src={`${PB_URL}/api/files/${opportunity.collectionId}/${opportunity.id}/${opportunity.images[0]}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-[#FFF8E1]">
                   <div>
                      <h3 className="font-bold text-2xl text-[#0A192F] mb-2 leading-tight">{opportunity.title}</h3>
                      <p className="text-[#D4AF37] font-black text-3xl mb-4">${opportunity.price_cop.toLocaleString("es-CO")}</p>
                   </div>
                   <Link to={`/inmuebles/${opportunity.id}`} className="w-full text-center bg-[#D4AF37] hover:bg-[#b5952f] text-white font-bold py-3 rounded-xl uppercase text-xs tracking-widest transition-colors shadow-lg shadow-[#D4AF37]/40">
                      {t.properties.details}
                   </Link>
                </div>
             </div>
           )}

           <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${opportunity ? "lg:col-span-3" : "lg:col-span-4"}`}>
              {favorites.map(p => (
                <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col">
                   <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img src={`${PB_URL}/api/files/${p.collectionId}/${p.id}/${p.images[0]}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <span className="absolute top-4 left-4 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1 shadow-md">
                         <Star size={10} fill="currentColor"/> {t.featured.badge}
                      </span>
                   </div>
                   <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                         <h3 className="font-bold text-lg text-[#0A192F] mb-1 truncate">{p.title}</h3>
                         <p className="text-gray-500 text-xs uppercase mb-3 font-bold">{p.property_type}</p>
                         <p className="text-green-600 font-black text-xl">${p.price_cop.toLocaleString("es-CO")}</p>
                      </div>
                      <Link to={`/inmuebles/${p.id}`} className="mt-4 text-xs font-bold text-gray-400 hover:text-[#0A192F] uppercase tracking-wide flex items-center gap-1">
                         {t.properties.details} <ArrowRight size={12}/>
                      </Link>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

// ... (ServicesIntro se mantiene IGUAL) ...
export const ServicesIntro = () => {
  const { t } = useLanguage();
  return (
    <div>
      <section className="bg-[#0A192F] text-white py-24 px-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-green-900/10 skew-x-12 pointer-events-none"></div>
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
               <span className="text-green-500 font-black tracking-[0.2em] uppercase text-sm block mb-4">{t.services.subtitle}</span>
               <h2 className="text-5xl font-black uppercase mb-8 leading-tight">{t.services.title}</h2>
               <p className="text-gray-400 text-lg leading-relaxed mb-8">Ofrecemos un ecosistema de soluciones para blindar tu patrimonio y maximizar tu rentabilidad.</p>
               <div className="space-y-6">
                  <div className="flex gap-4 items-start"><CheckCircle className="text-green-500 shrink-0 mt-1"/><div><h4 className="font-bold text-xl text-white">Avalúos Certificados (RAA)</h4><p className="text-sm text-gray-400 mt-1">Conoce el valor real de mercado con peritos certificados.</p><Link to="/servicios/avaluos" className="text-green-500 text-sm font-bold mt-2 inline-block hover:underline">Solicitar Avalúo</Link></div></div>
                  <div className="flex gap-4 items-start"><CheckCircle className="text-green-500 shrink-0 mt-1"/><div><h4 className="font-bold text-xl text-white">Asesoría Jurídica Integral</h4><p className="text-sm text-gray-400 mt-1">Estudios de títulos, sucesiones y saneamiento predial.</p><Link to="/servicios/juridico" className="text-green-500 text-sm font-bold mt-2 inline-block hover:underline">Consultar Abogado</Link></div></div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-gray-800 rounded-2xl h-64 w-full relative overflow-hidden group"><div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div><img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600" className="w-full h-full object-cover"/><span className="absolute bottom-4 left-4 font-bold text-white uppercase text-sm">Avalúos</span></div>
               <div className="bg-gray-800 rounded-2xl h-64 w-full relative overflow-hidden group mt-12"><div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div><img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600" className="w-full h-full object-cover"/><span className="absolute bottom-4 left-4 font-bold text-white uppercase text-sm">Jurídico</span></div>
            </div>
         </div>
      </section>
      <section className="bg-slate-950 py-32 px-6 relative overflow-hidden text-left border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-24 relative z-10">
          <div className="lg:w-1/2">
            <span className="text-green-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Marketing Inmobiliario</span>
            <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.85] mb-10 tracking-tighter italic">El valor entra <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 underline font-serif">por los ojos.</span></h2>
            <p className="text-xl text-slate-400 mb-12 max-w-md font-light leading-relaxed">No grabamos recorridos; producimos <strong>narrativa de ventas</strong>. Elevamos el estatus de su activo ante inversores internacionales con calidad 4K cinematográfica.</p>
            <div className="grid grid-cols-2 gap-10 mb-14 font-sans text-white">
              <div className="flex items-center gap-4 group cursor-default"><FontAwesomeIcon icon={faPlane} className="text-green-500 text-3xl group-hover:scale-110 transition-all" /><span className="font-black uppercase text-[10px] tracking-widest border-b border-green-900 pb-2">Drones 4K FPV</span></div>
              <div className="flex items-center gap-4 group cursor-default"><FontAwesomeIcon icon={faVrCardboard} className="text-blue-400 text-3xl group-hover:scale-110 transition-all" /><span className="font-black uppercase text-[10px] tracking-widest border-b border-blue-900 pb-2">VR 360 Tours</span></div>
            </div>
            <Link to="/servicios/audiovisual" className="inline-block bg-white text-slate-950 font-black px-14 py-6 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-3xl uppercase text-xs tracking-widest">Solicitar Producción <FontAwesomeIcon icon={faArrowRight} className="ml-2" /></Link>
          </div>
          <div className="lg:w-1/2 relative group">
            <div className="aspect-video bg-slate-900 rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-[0_0_800px_rgba(34,197,94,0.1)] relative"><iframe className="w-full h-full" src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&mute=1" allowFullScreen></iframe></div>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- LATEST BLOG: AHORA SÍ CARGA DATOS ---
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
                           <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-[#0A192F] px-3 py-1 text-[10px] font-bold uppercase rounded-full">
                               {new Date(p.created).toLocaleDateString()}
                           </div>
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