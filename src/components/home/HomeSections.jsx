import React, { useEffect, useState } from 'react';
import { ArrowRight, Scale, Video, BadgeCheck, FileText, ChevronDown, Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../supabaseClient';

export const FeaturedProperties = () => {
  const { t } = useLanguage();
  const [opportunity, setOpportunity] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
        // 1. Traer LA ÚNICA Oportunidad
        const { data: opp } = await supabase.from('properties').select('*').eq('is_opportunity', true).limit(1).single();
        if (opp) setOpportunity(opp);

        // 2. Traer 3 Favoritos AYC (Excluyendo la oportunidad si estuviera marcada en ambos)
        const { data: favs } = await supabase.from('properties')
           .select('*')
           .eq('is_ayc_favorite', true)
           .eq('is_opportunity', false) // Asegurar que no se repita
           .limit(3);
        if (favs) setFavorites(favs);
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div>
              <h2 className="text-3xl font-black text-[#0A192F] uppercase">{t.featured.title}</h2>
              <div className="h-1 w-20 bg-[var(--ayc-emerald)] mt-4"></div>
           </div>
           <Link to="/inmuebles" className="hidden md:flex items-center gap-2 text-[var(--ayc-emerald)] font-bold hover:underline">{t.featured.viewAll} <ArrowRight size={20}/></Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           
           {/* CARD DORADA - OPORTUNIDAD ÚNICA (COLUMNA IZQUIERDA GRANDE) */}
           {opportunity && (
             <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl overflow-hidden group border-2 border-[#D4AF37] relative flex flex-col h-full ring-4 ring-[#D4AF37]/20">
                <div className="absolute top-0 left-0 w-full bg-[#D4AF37] text-black text-center text-xs font-black py-2 uppercase tracking-widest z-20 flex items-center justify-center gap-2">
                   <Crown size={14}/> {t.featured.goldBadge}
                </div>
                <div className="h-64 lg:h-1/2 bg-gray-200 relative overflow-hidden mt-8">
                   <img src={opportunity.main_media_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-yellow-50">
                   <div>
                      <h3 className="font-bold text-2xl text-[#0A192F] mb-2 leading-tight">{opportunity.address_visible}</h3>
                      <p className="text-[#D4AF37] font-black text-3xl mb-4">${new Intl.NumberFormat('es-CO').format(opportunity.price_cop)}</p>
                   </div>
                   <Link to={`/inmuebles/${opportunity.ayc_id}`} className="w-full text-center bg-[#D4AF37] hover:bg-[#b5952f] text-black font-bold py-3 rounded-xl uppercase text-xs tracking-widest transition-colors">
                      {t.properties.details}
                   </Link>
                </div>
             </div>
           )}

           {/* CARDS FAVORITOS (3 COLUMNAS DERECHA) */}
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              {favorites.map(p => (
                <div key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col">
                   <div className="h-48 bg-gray-200 relative overflow-hidden">
                      <img src={p.main_media_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <span className="absolute top-4 left-4 bg-[var(--ayc-emerald)] text-white text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">
                         <Star size={10} fill="currentColor"/> {t.featured.badge}
                      </span>
                   </div>
                   <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                         <h3 className="font-bold text-lg text-[#0A192F] mb-1 truncate">{p.address_visible}</h3>
                         <p className="text-gray-500 text-xs uppercase mb-3">{p.property_type}</p>
                         <p className="text-[var(--ayc-emerald)] font-black text-xl">${new Intl.NumberFormat('es-CO').format(p.price_cop)}</p>
                      </div>
                      <Link to={`/inmuebles/${p.ayc_id}`} className="mt-4 text-xs font-bold text-gray-400 hover:text-[#0A192F] uppercase tracking-wide flex items-center gap-1">
                         {t.properties.details} <ArrowRight size={12}/>
                      </Link>
                   </div>
                </div>
              ))}
              {favorites.length === 0 && <div className="col-span-3 text-center text-gray-400 py-10">Selecciona favoritos en el inventario.</div>}
           </div>

        </div>
      </div>
    </section>
  );
};

// ... (Resto de componentes ServicesIntro y LatestBlog igual que antes) ...
export const ServicesIntro = () => {
  const { t } = useLanguage();
  return (
    <section className="bg-[#0A192F] text-white">
       <div className="py-20 text-center px-6">
          <span className="text-[var(--ayc-emerald)] font-black tracking-[0.2em] uppercase text-sm block mb-4">{t.services.subtitle}</span>
          <h2 className="text-4xl font-black uppercase">{t.services.title}</h2>
       </div>
       <div className="group relative h-[400px] overflow-hidden flex items-center justify-center border-t border-white/10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200')] bg-cover bg-center opacity-30 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative z-10 text-center px-6">
             <Scale size={60} className="mx-auto mb-6 text-[var(--ayc-emerald)] group-hover:scale-110 transition-transform"/>
             <h3 className="text-3xl font-black uppercase mb-4">{t.services.legal}</h3>
             <Link to="/servicios/juridico" className="inline-block px-8 py-3 border border-white/30 rounded-full hover:bg-[var(--ayc-emerald)] hover:border-transparent transition-all uppercase font-bold text-sm">{t.services.btnLegal}</Link>
          </div>
       </div>
       <div className="group relative h-[400px] overflow-hidden flex items-center justify-center border-t border-white/10 bg-black">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200')] bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative z-10 text-center px-6">
             <Video size={60} className="mx-auto mb-6 text-[var(--ayc-emerald)] group-hover:scale-110 transition-transform"/>
             <h3 className="text-3xl font-black uppercase mb-4">{t.services.media}</h3>
             <Link to="/servicios/audiovisual" className="inline-block px-8 py-3 border border-white/30 rounded-full hover:bg-[var(--ayc-emerald)] hover:border-transparent transition-all uppercase font-bold text-sm">{t.services.btnMedia}</Link>
          </div>
       </div>
       <div className="group relative h-[400px] overflow-hidden flex items-center justify-center border-t border-white/10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200')] bg-cover bg-center opacity-30 group-hover:opacity-20 transition-opacity"></div>
          <div className="relative z-10 text-center px-6">
             <BadgeCheck size={60} className="mx-auto mb-6 text-[var(--ayc-emerald)] group-hover:scale-110 transition-transform"/>
             <h3 className="text-3xl font-black uppercase mb-4">{t.services.appraisal}</h3>
             <Link to="/servicios/avaluos" className="inline-block px-8 py-3 border border-white/30 rounded-full hover:bg-[var(--ayc-emerald)] hover:border-transparent transition-all uppercase font-bold text-sm">{t.services.btnAppraisal}</Link>
          </div>
       </div>
    </section>
  );
};

export const LatestBlog = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
       const { data } = await supabase.from('blog_posts').select('*').limit(3).order('date', {ascending: false});
       if(data?.length) setPosts(data);
    };
    fetchPosts();
  }, []);
  if (posts.length === 0) return null;
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
         <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-10 text-center">{t.blog.title}</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
               <article key={post.id} className="group cursor-pointer hover:shadow-xl rounded-xl p-4 transition-all border border-gray-100">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 overflow-hidden relative">
                     <img src={post.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-2"><FileText size={14}/> {post.date}</div>
                  <h3 className="font-bold text-lg mb-2 text-[#0A192F] leading-tight group-hover:text-[var(--ayc-emerald)] transition-colors">{post.title}</h3>
                  <Link to="/blog" className="text-[var(--ayc-emerald)] font-bold text-sm uppercase">{t.blog.readMore} →</Link>
               </article>
            ))}
         </div>
      </div>
    </section>
  );
};