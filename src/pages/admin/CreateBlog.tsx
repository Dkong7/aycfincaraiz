import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave, faNewspaper, faEdit } from "@fortawesome/free-solid-svg-icons";
import SuccessModal from "../../components/SuccessModal";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "A&C Staff",
    image_url: ""
  });

  useEffect(() => {
    if (isEditing) loadPost();
  }, [id]);

  const loadPost = async () => {
    const { data } = await supabase.from("blogs").select("*").eq("id", id).single();
    if (data) {
      setFormData({
         title: data.title,
         content: data.content,
         author: data.author,
         image_url: data.image_url
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
       title: formData.title,
       content: formData.content,
       author: formData.author,
       image_url: formData.image_url,
       active: true
    };

    let error;
    if (isEditing) {
       const res = await supabase.from("blogs").update(payload).eq("id", id);
       error = res.error;
    } else {
       const res = await supabase.from("blogs").insert([payload]);
       error = res.error;
    }

    setLoading(false);

    if (error) {
       alert("Error: " + error.message);
    } else {
       setModalMsg(isEditing ? "Artículo actualizado correctamente." : "Nuevo artículo publicado.");
       setShowModal(true);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <SuccessModal isOpen={showModal} onClose={() => navigate("/admin/blog")} message={modalMsg} />

      <div className="max-w-4xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <button onClick={() => navigate("/admin/blog")} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
               <FontAwesomeIcon icon={faArrowLeft} /> Cancelar
            </button>
            <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
               {isEditing ? "Editar Artículo" : "Nueva Noticia"}
            </h1>
         </div>

         <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 space-y-6">
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-center gap-4 mb-6">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 text-xl shadow-sm">
                  <FontAwesomeIcon icon={faNewspaper} />
               </div>
               <div>
                  <h3 className="font-bold text-purple-900">Editor de Contenido</h3>
                  <p className="text-xs text-purple-700">Recuerda usar imágenes de alta calidad.</p>
               </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Título de la Noticia</label>
               <input required className="w-full p-4 bg-slate-50 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} placeholder="Ej: Tendencias de Vivienda 2026..." />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Autor</label>
                  <input required className="w-full p-4 bg-slate-50 border rounded-lg" value={formData.author} onChange={e=>setFormData({...formData, author:e.target.value})} />
               </div>
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">URL Imagen Principal</label>
                  <input required className="w-full p-4 bg-slate-50 border rounded-lg" value={formData.image_url} onChange={e=>setFormData({...formData, image_url:e.target.value})} placeholder="https://..." />
               </div>
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contenido (Soporta Markdown Básico)</label>
               <textarea required className="w-full p-4 bg-slate-50 border rounded-lg h-64 focus:ring-2 focus:ring-purple-500 outline-none" value={formData.content} onChange={e=>setFormData({...formData, content:e.target.value})} placeholder="Escribe aquí el cuerpo del artículo..."></textarea>
            </div>

            <button disabled={loading} type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition transform hover:scale-105 uppercase tracking-widest mt-4">
               <FontAwesomeIcon icon={isEditing ? faEdit : faSave} className="text-xl"/> {loading ? "Procesando..." : isEditing ? "ACTUALIZAR NOTICIA" : "PUBLICAR NOTICIA"}
            </button>
         </form>
      </div>
    </div>
  );
};

export default CreateBlog;