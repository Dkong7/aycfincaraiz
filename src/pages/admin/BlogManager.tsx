import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";

const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setPosts(data);
  };

  const handleDelete = async (id: string) => {
    if(!confirm("¿Borrar post?")) return;
    await supabase.from("blogs").delete().eq("id", id);
    fetchPosts();
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <Link to="/admin" className="text-slate-500 font-bold flex items-center gap-2"><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
            <h1 className="text-3xl font-black text-slate-800">Gestor de Blog</h1>
            <Link to="/admin/blog/crear" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
               <FontAwesomeIcon icon={faPlus} /> Nuevo Post
            </Link>
         </div>

         <div className="bg-white rounded-xl shadow p-6">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b bg-slate-100">
                     <th className="p-4 text-slate-600 font-bold uppercase text-xs">Título</th>
                     <th className="p-4 text-slate-600 font-bold uppercase text-xs">Autor</th>
                     <th className="p-4 text-slate-600 font-bold uppercase text-xs">Fecha</th>
                     <th className="p-4 text-slate-600 font-bold uppercase text-xs">Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {posts.map(post => (
                     <tr key={post.id} className="border-b hover:bg-slate-50 transition">
                        
                        {/* TÍTULO CLICKEABLE */}
                        <td className="p-4 font-bold">
                           <Link to={`/admin/blog/editar/${post.id}`} className="text-slate-800 hover:text-purple-600 hover:underline">
                              {post.title}
                           </Link>
                        </td>
                        
                        <td className="p-4 text-sm text-slate-500">{post.author}</td>
                        <td className="p-4 text-xs text-slate-400 font-mono">{new Date(post.created_at).toLocaleDateString()}</td>
                        <td className="p-4 flex gap-4 text-lg">
                           {/* PLUMITA ENLACE */}
                           <Link to={`/admin/blog/editar/${post.id}`} className="text-blue-600 hover:text-blue-800 transition" title="Editar">
                              <FontAwesomeIcon icon={faEdit} />
                           </Link>
                           <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700 transition" title="Borrar"><FontAwesomeIcon icon={faTrash} /></button>
                        </td>
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