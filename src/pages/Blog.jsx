import React from 'react';
import { Calendar, User } from 'lucide-react';

const BLOG_POSTS = [
  { id: 1, title: "El Gran Giro del 2025: Arriendos Superan a Propietarios", date: "25 DIC 2025", author: "Claudia Cabrera", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800", excerpt: "El cierre del año nos ha dejado cifras que marcan un hito en la historia inmobiliaria de Colombia." },
  { id: 2, title: "Bogotá se Transforma: Metro Calle 26 y ZiBo", date: "24 DIC 2025", author: "Alfonso Diaz", img: "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?q=80&w=800", excerpt: "La cara de Bogotá está cambiando y con ella, las oportunidades de valorización." },
  { id: 3, title: "¿Dónde Invertir en 2026? Logística y Lujo", date: "23 DIC 2025", author: "Equipo A&C", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800", excerpt: "Las encuestas son contundentes: el 100% de los inversionistas institucionales planean nuevas apuestas." },
  { id: 4, title: "Sostenibilidad: El nuevo estándar de lujo", date: "20 DIC 2025", author: "Claudia Cabrera", img: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800", excerpt: "Los paneles solares y la certificación LEED ya no son un plus, son un requisito." }
];

const Blog = () => {
  return (
    <div className="pt-24 bg-white min-h-screen font-sans">
       <div className="bg-[#0A192F] text-white py-20 px-6 text-center">
          <h1 className="text-5xl font-black uppercase mb-4">Blog A&C</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Análisis, tendencias y noticias del sector inmobiliario con la profundidad que mereces.</p>
       </div>

       <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map(post => (
             <article key={post.id} className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                <div className="h-60 rounded-xl overflow-hidden mb-4 bg-gray-100">
                   <img src={post.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <div className="flex gap-4 text-xs font-bold text-[var(--ayc-emerald)] mb-2 uppercase tracking-wider">
                   <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
                   <span className="flex items-center gap-1"><User size={12}/> {post.author}</span>
                </div>
                <h2 className="text-2xl font-black text-[#0A192F] leading-tight mb-3 group-hover:text-[var(--ayc-emerald)] transition-colors">{post.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-[#0A192F] font-bold text-sm border-b-2 border-[var(--ayc-emerald)] pb-1">LEER ARTÍCULO</span>
             </article>
          ))}
       </div>
    </div>
  );
};
export default Blog;
