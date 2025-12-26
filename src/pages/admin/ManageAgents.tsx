import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faUserTie, faMapMarkerAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const ManageAgents = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, myProperties: 0 });
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetchStats();
    fetchProfile();
  }, []);

  const fetchStats = async () => {
    const { count } = await supabase.from("properties").select("*", { count: "exact", head: true });
    setStats(prev => ({ ...prev, total: count || 0 }));
  };

  const fetchProfile = async () => {
     // Simulación de datos de perfil si no existen en tabla real aun
     setProfile({
        name: user?.user_metadata?.full_name || "Agente",
        email: user?.email,
        role: user?.user_metadata?.custom_title || "Agente",
        avatar: "https://i.pravatar.cc/150?u=" + user?.id
     });
  };

  return (
    <div className="bg-slate-950 min-h-screen p-6 text-slate-300">
      <div className="max-w-4xl mx-auto">
         <div className="flex justify-between items-center mb-8">
            <Link to="/admin" className="text-slate-500 hover:text-white font-bold flex items-center gap-2"><FontAwesomeIcon icon={faArrowLeft} /> Volver</Link>
            <h1 className="text-3xl font-black text-white uppercase">Perfil de Agente</h1>
         </div>

         {/* CARD PERFIL */}
         <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-900 shadow-lg">
               <img src={profile?.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-grow text-center md:text-left">
               <span className="bg-blue-900 text-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-2 inline-block">
                  {profile?.role} ACTIVO
               </span>
               <h2 className="text-3xl font-bold text-white mb-1">{profile?.name}</h2>
               <p className="text-slate-500 mb-6">{profile?.email}</p>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black p-4 rounded-xl border border-slate-800">
                     <FontAwesomeIcon icon={faBuilding} className="text-yellow-500 text-xl mb-2" />
                     <p className="text-xs text-slate-500 uppercase">Total Inmuebles</p>
                     <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="bg-black p-4 rounded-xl border border-slate-800">
                     <FontAwesomeIcon icon={faMapMarkerAlt} className="text-green-500 text-xl mb-2" />
                     <p className="text-xs text-slate-500 uppercase">Zonas Activas</p>
                     <p className="text-sm font-bold text-white">Bogotá, Chía</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
export default ManageAgents;