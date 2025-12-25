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
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <Link to="/admin" className="text-slate-500 font-bold"><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
            <h1 className="text-3xl font-black text-slate-800">Inventario</h1>
         </div>

         <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-900 text-white">
                  <tr>
                     <th className="p-4">CÓDIGO</th>
                     <th className="p-4">Tipo</th>
                     <th className="p-4">Título</th>
                     <th className="p-4">Precio</th>
                     <th className="p-4 text-center">Acciones</th>
                  </tr>
               </thead>
               <tbody>
                  {props.map(p => (
                     <tr key={p.id} className="border-b hover:bg-slate-50">
                        <td className="p-4 font-mono font-bold text-blue-900">{p.listing_id}</td>
                        <td className="p-4"><span className="bg-slate-200 px-2 py-1 rounded text-xs font-bold">{p.property_type}</span></td>
                        <td className="p-4 font-bold">{p.title}</td>
                        <td className="p-4">$ {new Intl.NumberFormat("es-CO").format(p.price)}</td>
                        <td className="p-4 flex justify-center gap-4 text-lg">
                           {/* BOTÓN EDITAR CONVERTIDO EN LINK */}
                           <Link to={`/admin/editar/${p.id}`} className="text-blue-600 hover:text-blue-800" title="Editar">
                              <FontAwesomeIcon icon={faEdit} />
                           </Link>
                           <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700" title="Eliminar"><FontAwesomeIcon icon={faTrash} /></button>
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