import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PropertiesList = () => {
  const [props, setProps] = useState<any[]>([]);

  useEffect(() => {
    fetchProps();
  }, []);

  const fetchProps = async () => {
    const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    if (data) setProps(data);
  };

  const handleDelete = async (id: string) => {
    if(!confirm("¿Eliminar inmueble permanentemente?")) return;
    await supabase.from("properties").delete().eq("id", id);
    fetchProps();
  };

  return (
    <div className="bg-slate-950 min-h-screen p-8 text-slate-300">
      <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <Link to="/admin" className="text-slate-500 hover:text-white font-bold transition"><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
            <h1 className="text-3xl font-black text-white">Inventario</h1>
         </div>

         <div className="bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-800">
            <table className="w-full text-left text-sm">
               <thead className="bg-black text-slate-400 uppercase tracking-wider">
                  <tr>
                     <th className="p-4">Código</th>
                     <th className="p-4">Tipo</th>
                     <th className="p-4">Título</th>
                     <th className="p-4">Precio</th>
                     <th className="p-4 text-center">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  {props.map(p => (
                     <tr key={p.id} className="hover:bg-slate-800 transition">
                        <td className="p-4 font-mono font-bold text-yellow-500">{p.listing_id}</td>
                        <td className="p-4"><span className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-xs font-bold border border-slate-700">{p.property_type}</span></td>
                        <td className="p-4">
                           <Link to={`/admin/editar/${p.id}`} className="font-bold text-white hover:text-blue-400 hover:underline">
                              {p.title}
                           </Link>
                        </td>
                        <td className="p-4 text-slate-300">$ {new Intl.NumberFormat("es-CO").format(p.price)}</td>
                        <td className="p-4 flex justify-center gap-4 text-lg">
                           <Link to={`/admin/editar/${p.id}`} className="text-blue-500 hover:text-blue-400 transition" title="Editar"><FontAwesomeIcon icon={faEdit} /></Link>
                           <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400 transition" title="Eliminar"><FontAwesomeIcon icon={faTrash} /></button>
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