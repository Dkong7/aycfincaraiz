import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useApp } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser, faArrowRight, faNewspaper } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
  const { t, lang } = useApp();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // Forzamos recarga al cambiar idioma para asegurar consistencia
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("active", true)
        .order("created_at", { ascending: false });
      if (data) setPosts(data);
      setLoading(false);
    };
    fetchPosts();
  }, [lang]);

  const formatDate = (dateString: string) => {
    const locale = lang === "EN" ? "en-US" : "es-ES";
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(locale, options);
  };

  // Helper de traducción
  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <h1 className="text-4xl font-bold text-blue-900 mb-4 uppercase tracking-wider flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faNewspaper} /> {t("blog_title")}
           </h1>
           <div className="w-24 h-2 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        {loading ? (
           <div className="flex justify-center py-20 text-blue-900 font-bold">...</div>
        ) : posts.length === 0 ? (
           <div className="text-center text-gray-500 py-20">
              <p className="text-xl">{t("blog_empty")}</p>
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                 <article key={post.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
                    <div className="h-56 overflow-hidden relative">
                       <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                       <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium uppercase tracking-wider">
                          <span className="flex items-center gap-1"><FontAwesomeIcon icon={faCalendarAlt} className="text-yellow-500" /> {formatDate(post.created_at)}</span>
                          <span className="flex items-center gap-1"><FontAwesomeIcon icon={faUser} className="text-yellow-500" /> {post.author}</span>
                       </div>
                       
                       {/* TÍTULO Y CONTENIDO TRADUCIDO */}
                       <h2 className="text-xl font-bold text-gray-800 mb-4 leading-tight line-clamp-2">
                          {getLoc(post.title, post.title_en)}
                       </h2>
                       <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                          {getLoc(post.content, post.content_en)}
                       </p>
                       
                       <Link to={`/blog/${post.id}`} className="text-blue-900 font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                          {t("read_more")} <FontAwesomeIcon icon={faArrowRight} className="text-yellow-500" />
                       </Link>
                    </div>
                 </article>
              ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
