import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie, faTrash, faSave, faPlus } from "@fortawesome/free-solid-svg-icons";

const AdvisorsManager = () => {
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [newAdvisor, setNewAdvisor] = useState({ name: "", phone: "", email: "", score: "5.0", properties_sold: "0" });

  useEffect(() => { fetchAdvisors(); }, []);

  const fetchAdvisors = async () => {
    const { data } = await supabase.from("advisors").select("*").order("name");
    if (data) setAdvisors(data);
  };

  const handleCreate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("advisors").insert([{
      ...newAdvisor,
      score: Number(newAdvisor.score),
      properties_sold: Number(newAdvisor.properties_sold)
    }]);
    
    if (!error) {
      setNewAdvisor({ name: "", phone: "", email: "", score: "5.0", properties_sold: "0" });
      fetchAdvisors();
    } else {
      alert("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Eliminar asesor?")) {
      await supabase.from("advisors").delete().eq("id", id);
      fetchAdvisors();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Equipo de Asesores (Super Admin)</h1>

      {/* FORMULARIO CREAR */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
        <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faPlus} /> Nuevo Asesor</h3>
        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Nombre Completo</label>
            <input required className="w-full border p-2 rounded" value={newAdvisor.name} onChange={e => setNewAdvisor({...newAdvisor, name: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Teléfono</label>
            <input required className="w-full border p-2 rounded" value={newAdvisor.phone} onChange={e => setNewAdvisor({...newAdvisor, phone: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Score (1-5)</label>
            <input className="w-full border p-2 rounded" type="number" step="0.1" max="5" value={newAdvisor.score} onChange={e => setNewAdvisor({...newAdvisor, score: e.target.value})} />
          </div>
          <button disabled={loading} className="bg-primary text-white py-2 rounded font-bold hover:bg-blue-800">
            {loading ? "..." : "Guardar"}
          </button>
        </form>
      </div>

      {/* LISTADO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {advisors.map(adv => (
          <div key={adv.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center border-l-4 border-secondary">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center text-gray-400">
                <FontAwesomeIcon icon={faUserTie} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{adv.name}</h4>
                <p className="text-xs text-gray-500">{adv.phone} • Score: {adv.score}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(adv.id)} className="text-red-400 hover:text-red-600 p-2"><FontAwesomeIcon icon={faTrash} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvisorsManager;
