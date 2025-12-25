import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useApp } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCalendarAlt, faUser, faShareAlt, faChartPie, faChartBar } from "@fortawesome/free-solid-svg-icons";

const BlogDetail = () => {
  const { id } = useParams();
  const { lang, t } = useApp();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      const { data } = await supabase.from("blogs").select("*").eq("id", id).single();
      if (data) setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [id, lang]);

  const getLoc = (es: any, en: any) => (lang === "EN" && en) ? en : es;

  if (loading) return <div className="h-screen flex items-center justify-center text-blue-900 font-bold">...</div>;
  if (!post) return <div className="h-screen flex items-center justify-center text-gray-500">Not found.</div>;

  const title = getLoc(post.title, post.title_en);
  const content = getLoc(post.content, post.content_en);

  // LOGICA GRÁFICOS (Detecta palabras clave en Español O Inglés)
  const renderVisualData = () => {
    // Barras: Ventas/Crecimiento/Sales/Growth
    if (
        content.includes("Ventas") || content.includes("crecieron") || 
        content.includes("Sales") || content.includes("growth")
       ) {
        return (
            <div className="my-12 p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <FontAwesomeIcon icon={faChartBar} className="text-blue-600"/> 
                   {lang === "EN" ? "Market Behavior 2025" : "Comportamiento del Mercado 2025"}
                </h3>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-sm mb-1 font-bold text-gray-600">
                           <span>{lang === "EN" ? "VIS Housing" : "Vivienda VIS"}</span><span>+16%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-green-500 h-3 rounded-full" style={{width: "86%"}}></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1 font-bold text-gray-600">
                           <span>{lang === "EN" ? "Non-VIS Housing" : "Vivienda No VIS"}</span><span>+9%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-blue-600 h-3 rounded-full" style={{width: "59%"}}></div></div>
                    </div>
                    <div>
                        <div className="flex justify-between text-sm mb-1 font-bold text-gray-600">
                           <span>{lang === "EN" ? "Rentals" : "Arriendos"}</span><span>+12%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3"><div className="bg-yellow-500 h-3 rounded-full" style={{width: "72%"}}></div></div>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 text-center">
                   {lang === "EN" ? "Source: A&C Internal Analysis / Camacol" : "Fuente: Análisis Interno A&C / Camacol"}
                </p>
            </div>
        );
    }
    // Donas: Arriendo/Hogares/Rental/Households
    if (
        content.includes("Arriendo") || content.includes("Hogares") ||
        content.includes("Rental") || content.includes("Households")
       ) {
        return (
            <div className="my-12 p-8 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                   <FontAwesomeIcon icon={faChartPie} className="text-purple-600"/> 
                   {lang === "EN" ? "Tenure Distribution" : "Distribución de Tenencia"}
                </h3>
                <div className="flex items-center gap-8">
                    <div className="w-32 h-32 rounded-full border-[16px] border-blue-900 border-r-yellow-500 border-b-yellow-500 transform -rotate-45 shadow-xl"></div>
                    <div className="text-sm space-y-2">
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-500 rounded-full"></div> <span className="font-bold">51% {lang === "EN" ? "Rentals" : "Arriendo"}</span></div>
                        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-900 rounded-full"></div> <span className="font-bold">49% {lang === "EN" ? "Owners" : "Propietarios"}</span></div>
                    </div>
                </div>
                <p className="text-xs text-gray-400 mt-6">
                   {lang === "EN" ? "Data: DANE / Lonja de Bogota" : "Datos: DANE / Lonja de Bogotá"}
                </p>
            </div>
        );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        <div className="h-64 md:h-96 relative">
           <img src={post.image_url} alt={title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
           <div className="absolute bottom-0 left-0 p-8 text-white">
              <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight shadow-black">{title}</h1>
              <div className="flex gap-6 text-sm font-medium">
                 <span><FontAwesomeIcon icon={faCalendarAlt} className="text-yellow-400" /> {new Date(post.created_at).toLocaleDateString(lang === "EN" ? "en-US" : "es-ES")}</span>
                 <span><FontAwesomeIcon icon={faUser} className="text-yellow-400" /> {post.author}</span>
              </div>
           </div>
        </div>

        <div className="p-8 md:p-12">
           <Link to="/blog" className="inline-flex items-center text-blue-900 font-bold mb-8 hover:underline text-sm">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> {lang === "EN" ? "Back to News" : "Volver a Noticias"}
           </Link>

           <div className="prose prose-lg text-gray-700 leading-relaxed whitespace-pre-line text-justify">
              {content}
           </div>

           {renderVisualData()}

           <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
              <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{lang === "EN" ? "Share Analysis" : "Comparte este análisis"}</span>
              <div className="flex gap-4">
                 <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white transition flex items-center justify-center"><FontAwesomeIcon icon={faShareAlt} /></button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
