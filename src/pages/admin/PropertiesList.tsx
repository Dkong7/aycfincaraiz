import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";

const PropertiesList = () => {
  const [props, setProps] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("properties").select("*");
      if(data) setProps(data);
    };
    load();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Link to="/admin" className="text-blue-600 underline">Volver al Dashboard</Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Código</th>
              <th className="p-4 text-left">Título</th>
              <th className="p-4 text-left">Precio</th>
              <th className="p-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {props.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-4 font-mono text-sm">{p.code}</td>
                <td className="p-4">{p.title}</td>
                <td className="p-4">$ {p.price.toLocaleString()}</td>
                <td className="p-4">
                   <button className="text-red-500 text-sm hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {props.length === 0 && <p className="p-8 text-center text-gray-500">No hay inmuebles registrados.</p>}
      </div>
    </div>
  );
};

export default PropertiesList;
