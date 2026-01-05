import React, { useEffect, useState } from "react";
import { Calendar, User } from "lucide-react";
import { pb } from "../api";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// DATOS DE RESPALDO (Por si no hay conexión a DB)
const STATIC_POSTS = [
  { id: "1", title: "El Gran Giro del 2025: Arriendos Superan a Propietarios", created: "2025-12-25", author: "Claudia Cabrera", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800", excerpt: "El cierre del año nos ha dejado cifras que marcan un hito en la historia inmobiliaria de Colombia." },
  { id: "2", title: "Bogotá se Transforma: Metro Calle 26 y ZiBo", created: "2025-12-24", author: "Alfonso Diaz", image: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?q=80&w=800", excerpt: "La cara de Bogotá está cambiando y con ella, las oportunidades de valorización." },
  { id: "3", title: "¿Dónde Invertir en 2026? Logística y Lujo", created: "2025-12-23", author: "Equipo A&C", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", excerpt: "Las encuestas son contundentes: el 100% de los inversionistas institucionales planean nuevas apuestas." },
  { id: "4", title: "Sostenibilidad: El nuevo estándar de lujo", created: "2025-12-20", author: "Claudia Cabrera", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800", excerpt: "Los paneles solares y la certificación LEED ya no son un plus, son un requisito." }
];

const Blog = () => {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

  useEffect(() => {
    const fetchPosts = async () => {
       try {
         // Intentar cargar de PocketBase (Colección "posts" o "blogs")
         const result = await pb.collection("posts").getList(1, 20, { sort: "-created" });
         if (result.items.length > 0) {
            setPosts(result.items);
         } else {
            setPosts(STATIC_POSTS); // Usar estáticos si DB vacía
         }
       } catch (e) {
         console.warn("No se pudo conectar al blog en DB, usando estáticos.", e);
         setPosts(STATIC_POSTS);
       } finally {
         setLoading(false);
       }
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: string) => {
     if(!dateStr) return "";
     return new Date(dateStr).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }).toUpperCase();
  };

  return (
    <div className="bg-white min-h-screen font-sans">
       <Navbar language="ES" toggleLanguage={() => {}} />
       
       <div className="bg-[#0A192F] text-white pt-32 pb-20 px-6 text-center">
          <h1 className="text-5xl font-black uppercase mb-4">{t.blog.title}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">{t.blog.subtitle}</p>
       </div>

       <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading ? <div className="col-span-3 text-center py-20">Cargando noticias...</div> : posts.map(post => {
             // Determinar imagen (URL de DB o URL Estática)
             const imgUrl = post.collectionId 
                ? `${PB_URL}/api/files/${post.collectionId}/${post.id}/${post.image}` 
                : post.image;

             return (
               <article key={post.id} className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                  <div className="h-60 rounded-xl overflow-hidden mb-4 bg-gray-100 relative">
                     <img src={imgUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                  </div>
                  <div className="flex gap-4 text-xs font-bold text-green-600 mb-2 uppercase tracking-wider">
                     <span className="flex items-center gap-1"><Calendar size={12}/> {formatDate(post.created)}</span>
                     <span className="flex items-center gap-1"><User size={12}/> {post.author || "Redacción A&C"}</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#0A192F] leading-tight mb-3 group-hover:text-green-600 transition-colors line-clamp-2">{post.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt || post.content}</p>
                  <span className="text-[#0A192F] font-bold text-sm border-b-2 border-green-600 pb-1 uppercase">{t.blog.readMore}</span>
               </article>
             );
          })}
       </div>
       <Footer />
    </div>
  );
};
export default Blog;
