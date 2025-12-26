import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowLeft, faMapMarkerAlt, faTag } from "@fortawesome/free-solid-svg-icons";

const PropertiesList = () => {
  const [props, setProps] = useState<any[]>([]);
  useEffect(() => { fetchProps(); }, []);
  const fetchProps = async () => { const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false }); if (data) setProps(data); };
  const handleDelete = async (id: string) => { if(!confirm("¿Eliminar?")) return; await supabase.from("properties").delete().eq("id", id); fetchProps(); };

  return (
    <div className="bg-slate-950 min-h-screen p-4 md:p-8 text-slate-300">
      <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-6">
            <Link to="/admin" className="text-slate-500 hover:text-white font-bold transition flex items-center gap-2"><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
            <h1 className="text-2xl md:text-3xl font-black text-white">Inventario</h1>
         </div>

         {/* VISTA MÓVIL (TARJETAS) - Visible en < md */}
         <div className="md:hidden space-y-4">
            {props.map(p => (
               <div key={p.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-md">
                  <div className="flex justify-between items-start mb-3">
                     <div>
                        <span className="text-[10px] font-bold bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded border border-yellow-500/20">{p.listing_id}</span>
                        <h3 className="font-bold text-white text-lg mt-2 leading-tight">{p.title}</h3>
                     </div>
                     <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">{p.property_type}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                     <FontAwesomeIcon icon={faMapMarkerAlt} /> {p.city}
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                     <span className="font-bold text-white">$ {new Intl.NumberFormat("es-CO").format(p.price)}</span>
                     <div className="flex gap-3">
                        <Link to={`/admin/editar/${p.id}`} className="w-10 h-10 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center border border-blue-900/50"><FontAwesomeIcon icon={faEdit} /></Link>
                        <button onClick={() => handleDelete(p.id)} className="w-10 h-10 rounded-full bg-red-900/30 text-red-400 flex items-center justify-center border border-red-900/50"><FontAwesomeIcon icon={faTrash} /></button>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* VISTA DESKTOP (TABLA) - Visible en >= md */}
         <div className="hidden md:block bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-800">
            <table className="w-full text-left text-sm">
               <thead className="bg-black text-slate-400 uppercase tracking-wider">
                  <tr>
                     <th className="p-4">Código</th><th className="p-4">Tipo</th><th className="p-4">Título</th><th className="p-4">Precio</th><th className="p-4 text-center">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  {props.map(p => (
                     <tr key={p.id} className="hover:bg-slate-800 transition">
                        <td className="p-4 font-mono font-bold text-yellow-500">{p.listing_id}</td>
                        <td className="p-4"><span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-bold border border-slate-700">{p.property_type}</span></td>
                        <td className="p-4"><Link to={`/admin/editar/${p.id}`} className="font-bold text-white hover:text-blue-400 hover:underline">{p.title}</Link></td>
                        <td className="p-4 text-slate-300">$ {new Intl.NumberFormat("es-CO").format(p.price)}</td>
                        <td className="p-4 flex justify-center gap-4 text-lg">
                           <Link to={`/admin/editar/${p.id}`} className="text-blue-500 hover:text-blue-400 transition"><FontAwesomeIcon icon={faEdit} /></Link>
                           <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400 transition"><FontAwesomeIcon icon={faTrash} /></button>
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
export default PropertiesList;