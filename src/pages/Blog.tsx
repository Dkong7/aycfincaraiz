import React, { useEffect, useState } from "react";
import { Calendar, User, ArrowRight, X } from "lucide-react";
import { pb } from "../api";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
// Footer eliminado para evitar duplicidad
import type { RecordModel } from "pocketbase";

const Blog = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<RecordModel[]>([]);
  const [selectedPost, setSelectedPost] = useState<RecordModel | null>(null);
  const [loading, setLoading] = useState(true);
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

  useEffect(() => {
    const fetchPosts = async () => {
       try {
         const result = await pb.collection("posts").getList(1, 50, { sort: "-created" });
         setPosts(result.items);
       } catch (e) {
         console.warn("Offline mode");
       } finally {
         setLoading(false);
       }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
     if(!dateStr) return "";
     return new Date(dateStr).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div className="bg-white min-h-screen font-sans">
       <Navbar />
       
       <div className="bg-[#0A192F] text-white pt-32 pb-20 px-6 text-center relative">
          <h1 className="text-5xl font-black uppercase mb-4 tracking-tight">{t.blog.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">{t.blog.subtitle}</p>
       </div>

       <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? (
             <div className="col-span-full text-center py-20 text-gray-400 animate-pulse">Cargando artículos...</div>
          ) : posts.map(post => {
             const imgUrl = post.image ? `${PB_URL}/api/files/${post.collectionId}/${post.id}/${post.image}` : null;

             return (
               <article key={post.id} onClick={() => setSelectedPost(post)} className="group cursor-pointer flex flex-col h-full hover:-translate-y-2 transition-all duration-300">
                  <div className="h-60 rounded-2xl overflow-hidden mb-5 bg-gray-100 relative shadow-md">
                     {imgUrl && <img src={imgUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>}
                  </div>
                  
                  <div className="flex gap-4 text-[10px] font-bold text-green-600 mb-3 uppercase tracking-widest border-b border-gray-100 pb-3">
                     <span className="flex items-center gap-1"><Calendar size={12}/> {formatDate(post.created)}</span>
                     <span className="flex items-center gap-1"><User size={12}/> {post.author || "Equipo AyC"}</span>
                  </div>
                  
                  <h2 className="text-2xl font-black text-[#0A192F] leading-tight mb-3 group-hover:text-green-700 transition-colors line-clamp-2">
                     {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                     {post.excerpt}
                  </p>
                  <div className="mt-auto">
                     <span className="text-[#0A192F] font-black text-xs border-b-2 border-green-500 pb-1 uppercase flex items-center gap-2 w-max group-hover:text-green-700 transition-colors">
                        {t.blog.readMore} <ArrowRight size={14}/>
                     </span>
                  </div>
               </article>
             );
          })}
       </div>

       {/* MODAL DE ARTÍCULO COMPLETO */}
       {selectedPost && (
         <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#0A192F]/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative animate-in zoom-in-95 duration-300">
               
               {/* Botón Cerrar */}
               <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 z-50 bg-white/50 backdrop-blur hover:bg-white text-[#0A192F] p-2 rounded-full transition-all shadow-lg hover:rotate-90">
                  <X size={24}/>
               </button>

               {/* Imagen Hero */}
               {selectedPost.image && (
                  <div className="h-80 w-full relative">
                     <img src={`${PB_URL}/api/files/${selectedPost.collectionId}/${selectedPost.id}/${selectedPost.image}`} className="w-full h-full object-cover"/>
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                     <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white">
                        <span className="bg-green-600 text-xs font-black px-3 py-1 rounded uppercase tracking-widest mb-4 inline-block">Noticia</span>
                        <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">{selectedPost.title}</h1>
                        <div className="flex items-center gap-6 text-sm font-medium opacity-80">
                           <span className="flex items-center gap-2"><User size={16}/> {selectedPost.author}</span>
                           <span className="flex items-center gap-2"><Calendar size={16}/> {formatDate(selectedPost.created)}</span>
                        </div>
                     </div>
                  </div>
               )}

               {/* Contenido del Post */}
               <div className="p-8 md:p-16">
                  {/* Renderizado de HTML seguro */}
                  <div 
                     className="prose prose-lg prose-slate max-w-none prose-headings:font-black prose-headings:text-[#0A192F] prose-a:text-green-600 prose-img:rounded-2xl"
                     dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
               </div>
            </div>
         </div>
       )}

       {/* Footer eliminado */}
    </div>
  );
};
export default Blog;