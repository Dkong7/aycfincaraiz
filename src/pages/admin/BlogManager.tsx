import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  useEffect(() => { fetchPosts(); }, []);
  const fetchPosts = async () => { const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false }); if (data) setPosts(data); };
  const handleDelete = async (id: string) => { if(!confirm("¿Borrar?")) return; await supabase.from("blogs").delete().eq("id", id); fetchPosts(); };

  return (
    <div className="bg-slate-950 min-h-screen p-8 text-slate-300">
      <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <Link to="/admin" className="text-slate-500 hover:text-white font-bold flex items-center gap-2"><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
            <h1 className="text-3xl font-black text-white">Gestor de Blog</h1>
            <Link to="/admin/blog/crear" className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"><FontAwesomeIcon icon={faPlus} /> Nuevo</Link>
         </div>
         <div className="bg-slate-900 rounded-xl shadow p-6 border border-slate-800">
            <table className="w-full text-left">
               <thead><tr className="border-b border-slate-700 text-slate-500"><th className="p-4">Título</th><th className="p-4">Autor</th><th className="p-4">Fecha</th><th className="p-4">Acciones</th></tr></thead>
               <tbody className="divide-y divide-slate-800">
                  {posts.map(post => (
                     <tr key={post.id} className="hover:bg-slate-800 transition">
                        <td className="p-4 font-bold"><Link to={`/admin/blog/editar/${post.id}`} className="hover:text-purple-400">{post.title}</Link></td>
                        <td className="p-4 text-sm">{post.author}</td>
                        <td className="p-4 text-xs text-slate-500">{new Date(post.created_at).toLocaleDateString()}</td>
                        <td className="p-4 flex gap-4 text-lg"><Link to={`/admin/blog/editar/${post.id}`} className="text-blue-500"><FontAwesomeIcon icon={faEdit} /></Link><button onClick={() => handleDelete(post.id)} className="text-red-500"><FontAwesomeIcon icon={faTrash} /></button></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
export default BlogManager;