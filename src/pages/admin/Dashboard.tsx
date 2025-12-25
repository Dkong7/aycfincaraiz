import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSpinner, faEye, faEyeSlash, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProperties(); }, []);

  const fetchProperties = async () => {
    const { data, error } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    if (!error && data) setProperties(data);
    setLoading(false);
  };

  // SISTEMA DE DESPUBLICACIÓN RÁPIDA
  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    // Optimismo UI: cambiarlo visualmente primero
    setProperties(properties.map(p => p.id === id ? { ...p, available: !currentStatus } : p));
    
    const { error } = await supabase.from("properties").update({ available: !currentStatus }).eq("id", id);
    if (error) {
      alert("Error actualizando estado");
      fetchProperties(); // Revertir si falló
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Borrar definitivamente?")) {
      await supabase.from("properties").delete().eq("id", id);
      fetchProperties();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
        <div className="flex gap-3">
          <Link to="/admin/crear" className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 font-bold flex items-center gap-2">
            + Nuevo Inmueble
          </Link>
        </div>
      </div>
      
      {loading ? <div className="p-10 text-center"><FontAwesomeIcon icon={faSpinner} spin /></div> : (
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 text-xs font-bold text-gray-500 uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Estado</th>
                <th className="px-6 py-4 text-left">Foto</th>
                <th className="px-6 py-4 text-left">Inmueble</th>
                <th className="px-6 py-4 text-left">Precio</th>
                <th className="px-6 py-4 text-left">Código</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((prop) => (
                <tr key={prop.id} className={!prop.available ? "bg-gray-50 opacity-75" : ""}>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleAvailability(prop.id, prop.available)}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border transition-all ${prop.available ? "bg-green-100 text-green-800 border-green-200 hover:bg-red-100 hover:text-red-800" : "bg-gray-200 text-gray-600 border-gray-300 hover:bg-green-100 hover:text-green-800"}`}
                      title="Clic para cambiar estado"
                    >
                      <FontAwesomeIcon icon={prop.available ? faCheckCircle : faEyeSlash} />
                      {prop.available ? "Publicado" : "Oculto"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {prop.images && prop.images[0] && <img src={prop.images[0]} className="h-12 w-12 rounded object-cover border" />}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{prop.title}</div>
                    <div className="text-xs text-gray-500">{prop.property_type} - {prop.offer_type}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-green-700 font-bold">
                    ${new Intl.NumberFormat("es-CO").format(prop.price)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{prop.code}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-blue-600 hover:text-blue-900"><FontAwesomeIcon icon={faEdit} /></button>
                    <button onClick={() => handleDelete(prop.id)} className="text-red-500 hover:text-red-700"><FontAwesomeIcon icon={faTrash} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
