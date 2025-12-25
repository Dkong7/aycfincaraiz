import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
            <Link to="/admin" className="text-slate-500 font-bold"><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
            <h1 className="text-3xl font-black text-slate-800">Gestor de Blog</h1>
         </div>

         <div className="bg-white rounded-xl shadow p-6">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b">
                     <th className="p-4">Título</th>
                     <th className="p-4">Autor</th>
                     <th className="p-4">Fecha</th>
                     <th className="p-4">Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {posts.map(post => (
                     <tr key={post.id} className="border-b hover:bg-slate-50">
                        <td className="p-4 font-bold">{post.title}</td>
                        <td className="p-4">{post.author}</td>
                        <td className="p-4 text-xs">{new Date(post.created_at).toLocaleDateString()}</td>
                        <td className="p-4 flex gap-3">
                           <button className="text-blue-600 hover:text-blue-800"><FontAwesomeIcon icon={faEdit} /></button>
                           <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700"><FontAwesomeIcon icon={faTrash} /></button>
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