import { useState, useEffect } from "react";
import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export default function DashboardInventario() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    const res = await pb.collection("properties").getFullList({ sort: "-created" });
    setProperties(res);
  };

  const toggleFeature = async (id: string, field: "isHero" | "isOpportunity" | "isFavorite", limit: number, currentVal: boolean) => {
    // Verificar límite solo si estamos ACTIVANDO (currentVal es false)
    if (!currentVal) {
        const count = properties.filter((p: any) => p[field] === true).length;
        if (count >= limit) {
            alert(`LÍMITE ALCANZADO: Solo puedes marcar ${limit} inmuebles como ${field}. Desmarca uno antes.`);
            return;
        }
    }

    try {
        await pb.collection("properties").update(id, { [field]: !currentVal });
        await loadProperties(); // Recargar lista
    } catch (e) {
        alert("Error actualizando");
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-black mb-6">Gestión de Inventario y Destacados</h1>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4">Inmueble</th>
              <th className="p-4 text-center">Hero (Max 5)</th>
              <th className="p-4 text-center">Corona (Max 1)</th>
              <th className="p-4 text-center">Favorito (Max 4)</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p: any) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold">{p.title}</td>
                
                {/* HERO TOGGLE */}
                <td className="p-4 text-center">
                   <button onClick={() => toggleFeature(p.id, "isHero", 5, p.isHero)}
                           className={`w-6 h-6 rounded border ${p.isHero ? 'bg-blue-600 border-blue-600' : 'bg-gray-200'}`}>
                   </button>
                </td>

                {/* CORONA TOGGLE */}
                <td className="p-4 text-center">
                   <button onClick={() => toggleFeature(p.id, "isOpportunity", 1, p.isOpportunity)}
                           className={`w-6 h-6 rounded border ${p.isOpportunity ? 'bg-yellow-500 border-yellow-500' : 'bg-gray-200'}`}>
                   </button>
                </td>

                {/* FAVORITE TOGGLE */}
                <td className="p-4 text-center">
                   <button onClick={() => toggleFeature(p.id, "isFavorite", 4, p.isFavorite)}
                           className={`w-6 h-6 rounded border ${p.isFavorite ? 'bg-green-600 border-green-600' : 'bg-gray-200'}`}>
                   </button>
                </td>

                <td className="p-4 text-gray-500 text-sm">{p.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
