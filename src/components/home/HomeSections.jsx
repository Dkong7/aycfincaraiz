import React, { useEffect, useState } from 'react';
import { ArrowRight, Scale, Video, BadgeCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../supabaseClient';

// ... (FeaturedProperties y ServicesIntro se mantienen igual, solo actualizamos LatestBlog)

export const FeaturedProperties = () => {
  const { t } = useLanguage();
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    const fetchFeatured = async () => {
        const { data } = await supabase.from('properties').select('*').eq('is_featured', true).limit(3);
        if (data?.length) setFeatured(data);
        else setFeatured([ /* Mocks de respaldo */ 
            { id: 1, ayc_id: 'MOCK1', price_cop: 2500000000, main_media_url: 'https://images.unsplash.com/photo-1600596542815-22b5c1275efb' },
            { id: 2, ayc_id: 'MOCK2', price_cop: 1200000000, main_media_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' },
            { id: 3, ayc_id: 'MOCK3', price_cop: 800000000, main_media_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750' }
        ]);
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
           <div><h2 className="text-3xl font-black text-[#0A192F] uppercase">{t.featured.title}</h2><div className="h-1 w-20 bg-[var(--ayc-emerald)] mt-4"></div></div>
           <Link to="/inmuebles" className="hidden md:flex items-center gap-2 text-[var(--ayc-emerald)] font-bold hover:underline">{t.featured.viewAll} <ArrowRight size={20}/></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {featured.map((p, idx) => (
             <div key={p.id} className={`bg-white rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 border ${idx === 0 ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/50' : 'border-gray-100'}`}>
                <div className="h-72 bg-gray-200 relative overflow-hidden">
                   <img src={p.main_media_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Propiedad" />
                   {idx === 0 ? <span className="absolute top-4 left-4 bg-shine-gold text-black text-xs font-black px-4 py-2 rounded shadow-lg uppercase tracking-wider">★ {t.featured.goldBadge}</span> : <span className="absolute top-4 left-4 bg-[var(--ayc-emerald)] text-white text-xs font-bold px-3 py-1.5 rounded uppercase">{t.featured.badge}</span>}
                </div>
                <div className="p-8">
                   <h3 className="font-bold text-xl text-[#0A192F] mb-2">{p.address_visible || "Oportunidad"}</h3>
                   <p className="text-[var(--ayc-emerald)] font-black text-2xl mb-4">${new Intl.NumberFormat('es-CO').format(p.price_cop)}</p>
                   <Link to={`/inmuebles/${p.ayc_id}`} className="text-sm font-bold text-gray-500 hover:text-[#0A192F] uppercase tracking-wide">{t.properties.details} →</Link>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export const ServicesIntro = () => {
  const { t } = useLanguage();
  return (
    <section className="py-24 bg-[#0A192F] text-white">
      <div className="max-w-7xl mx-auto px-6">
         <div className="text-center mb-16"><span className="text-[var(--ayc-emerald)] font-black tracking-[0.2em] uppercase text-sm block mb-4">{t.services.subtitle}</span><h2 className="text-4xl font-black uppercase">{t.services.title}</h2></div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/servicios/juridico" className="bg-white/5 p-10 rounded-2xl border border-white/10 flex flex-col items-center text-center animate-shake-hover group transition-colors hover:bg-white/10"><div className="w-20 h-20 bg-[var(--ayc-emerald)] rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(21,128,61,0.4)] group-hover:scale-110 transition-transform"><Scale className="text-white" size={40} /></div><h3 className="text-xl font-bold mb-4">{t.services.legal}</h3><span className="mt-auto bg-white/10 px-6 py-2 rounded-full text-xs font-bold uppercase group-hover:bg-[var(--ayc-emerald)] transition-colors">{t.services.btnLegal}</span></Link>
            <Link to="/servicios/audiovisual" className="bg-white/5 p-10 rounded-2xl border border-white/10 flex flex-col items-center text-center animate-shake-hover group transition-colors hover:bg-white/10"><div className="w-20 h-20 bg-[var(--ayc-emerald)] rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(21,128,61,0.4)] group-hover:scale-110 transition-transform"><Video className="text-white" size={40} /></div><h3 className="text-xl font-bold mb-4">{t.services.media}</h3><span className="mt-auto bg-white/10 px-6 py-2 rounded-full text-xs font-bold uppercase group-hover:bg-[var(--ayc-emerald)] transition-colors">{t.services.btnMedia}</span></Link>
            <Link to="/servicios/avaluos" className="bg-white/5 p-10 rounded-2xl border border-white/10 flex flex-col items-center text-center animate-shake-hover group transition-colors hover:bg-white/10"><div className="w-20 h-20 bg-[var(--ayc-emerald)] rounded-full flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(21,128,61,0.4)] group-hover:scale-110 transition-transform"><BadgeCheck className="text-white" size={40} /></div><h3 className="text-xl font-bold mb-4">{t.services.appraisal}</h3><span className="mt-auto bg-white/10 px-6 py-2 rounded-full text-xs font-bold uppercase group-hover:bg-[var(--ayc-emerald)] transition-colors">{t.services.btnAppraisal}</span></Link>
         </div>
      </div>
    </section>
  );
};

export const LatestBlog = () => {
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
         <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-10 text-center">Noticias del Sector</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map(post => (
               <article key={post.id} className="group cursor-pointer hover:shadow-xl rounded-xl p-4 transition-all border border-gray-100">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 overflow-hidden relative">
                     <img src={post.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-xs font-bold text-gray-400 mb-2 flex items-center gap-2"><FileText size={14}/> {post.date}</div>
                  <h3 className="font-bold text-lg mb-2 text-[#0A192F] leading-tight group-hover:text-[var(--ayc-emerald)] transition-colors">{post.title}</h3>
                  <Link to="/blog" className="text-[var(--ayc-emerald)] font-bold text-sm uppercase">Leer más →</Link>
               </article>
            ))}
         </div>
      </div>
    </section>
  );
};
