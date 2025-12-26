import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faNewspaper, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const meta = user?.user_metadata;
  const title = meta?.custom_title || "Maestro";
  const name = meta?.full_name || "Desconocido";

  return (
    <div className="bg-slate-950 min-h-screen p-8 text-slate-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Panel de Control</h1>
        <p className="text-slate-400 mb-12 flex items-center gap-2">
           Bienvenid{title === "Maestra" ? "a" : "o"}, <span className="font-bold text-yellow-500">{title} {name}</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           
           <Link to="/admin/crear" className="bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-800 hover:border-blue-500 group">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-blue-500 text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <FontAwesomeIcon icon={faPlus} />
              </div>
              <h3 className="text-xl font-bold text-white">Nuevo Inmueble</h3>
              <p className="text-sm text-slate-500 mt-2">Publicar una propiedad.</p>
           </Link>

           <Link to="/admin/inmuebles" className="bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-800 hover:border-green-500 group">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-green-500 text-3xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                 <FontAwesomeIcon icon={faList} />
              </div>
              <h3 className="text-xl font-bold text-white">Inventario</h3>
              <p className="text-sm text-slate-500 mt-2">Editar o eliminar.</p>
           </Link>

           <Link to="/admin/blog" className="bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-800 hover:border-purple-500 group">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-purple-500 text-3xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                 <FontAwesomeIcon icon={faNewspaper} />
              </div>
              <h3 className="text-xl font-bold text-white">Gestor Blog</h3>
              <p className="text-sm text-slate-500 mt-2">Noticias y artículos.</p>
           </Link>

           <Link to="/admin/asesores" className="bg-slate-900 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-slate-800 hover:border-yellow-500 group">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-yellow-500 text-3xl mb-6 group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
                 <FontAwesomeIcon icon={faUsersCog} />
              </div>
              <h3 className="text-xl font-bold text-white">Maestros</h3>
              <p className="text-sm text-slate-500 mt-2">Perfiles y accesos.</p>
           </Link>

        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;