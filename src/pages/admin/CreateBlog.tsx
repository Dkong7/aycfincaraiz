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
  const [formData, setFormData] = useState({ title: "", content: "", author: "A&C Staff", image_url: "" });

  useEffect(() => { if (isEditing) loadPost(); }, [id]);
  const loadPost = async () => { const { data } = await supabase.from("blogs").select("*").eq("id", id).single(); if (data) setFormData({ title: data.title, content: data.content, author: data.author, image_url: data.image_url }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, active: true };
    const { error } = isEditing ? await supabase.from("blogs").update(payload).eq("id", id) : await supabase.from("blogs").insert([payload]);
    setLoading(false);
    if (!error) setShowModal(true);
  };

  return (
    <div className="bg-slate-950 min-h-screen p-8 text-slate-300">
      <SuccessModal isOpen={showModal} onClose={() => navigate("/admin/blog")} message={isEditing ? "Artículo actualizado." : "Artículo publicado."} />
      <div className="max-w-4xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <button onClick={() => navigate("/admin/blog")} className="flex items-center gap-2 text-slate-500 hover:text-white font-bold transition"><FontAwesomeIcon icon={faArrowLeft} /> Cancelar</button>
            <h1 className="text-3xl font-black text-white uppercase tracking-tighter">{isEditing ? "Editar" : "Nuevo"} Artículo</h1>
         </div>
         <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-800 space-y-6">
            <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-900/50 flex items-center gap-4 mb-6">
               <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-purple-500 text-xl"><FontAwesomeIcon icon={faNewspaper} /></div>
               <div><h3 className="font-bold text-purple-400">Editor</h3><p className="text-xs text-purple-300">Contenido de calidad.</p></div>
            </div>
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Título</label><input required className="w-full p-4 bg-slate-950 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-900 outline-none text-white" value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-6">
               <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Autor</label><input required className="w-full p-4 bg-slate-950 border border-slate-700 rounded-lg text-white" value={formData.author} onChange={e=>setFormData({...formData, author:e.target.value})} /></div>
               <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Imagen URL</label><input required className="w-full p-4 bg-slate-950 border border-slate-700 rounded-lg text-white" value={formData.image_url} onChange={e=>setFormData({...formData, image_url:e.target.value})} /></div>
            </div>
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contenido</label><textarea required className="w-full p-4 bg-slate-950 border border-slate-700 rounded-lg h-64 focus:ring-2 focus:ring-purple-900 outline-none text-white" value={formData.content} onChange={e=>setFormData({...formData, content:e.target.value})}></textarea></div>
            <button disabled={loading} type="submit" className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition transform hover:scale-105 uppercase tracking-widest mt-4">
               <FontAwesomeIcon icon={isEditing ? faEdit : faSave} className="text-xl"/> {loading ? "..." : isEditing ? "ACTUALIZAR" : "PUBLICAR"}
            </button>
         </form>
      </div>
    </div>
  );
};
export default CreateBlog;