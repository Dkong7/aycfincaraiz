import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faNewspaper, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const meta = user?.user_metadata;
  const title = meta?.custom_title || "Maestro";
  const name = meta?.full_name || "Desconocido";

  // DETECTAR SI ES CLAUDIA PARA CAMBIAR TEMA
  const isClaudia = name.includes("Claudia") || user?.email?.includes("cabrera");

  // CLASES CONDICIONALES
  const bgMain = isClaudia ? "bg-rose-50 text-slate-800" : "bg-slate-950 text-slate-300";
  const titleColor = isClaudia ? "text-rose-900" : "text-white";
  const highlightColor = isClaudia ? "text-rose-600" : "text-yellow-500";
  
  const cardBg = isClaudia ? "bg-white border-rose-100 hover:border-rose-400" : "bg-slate-900 border-slate-800 hover:border-blue-500";
  const iconBg = isClaudia ? "bg-rose-100 text-rose-500" : "bg-slate-800 text-blue-500";
  const textColor = isClaudia ? "text-slate-800" : "text-white";

  return (
    <div className={`${bgMain} min-h-screen p-8 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        <h1 className={`text-4xl font-black mb-2 uppercase tracking-tighter ${titleColor}`}>Panel de Control</h1>
        <p className="mb-12 flex items-center gap-2 opacity-80">
           Bienvenid{title === "Maestra" ? "a" : "o"}, <span className={`font-bold ${highlightColor}`}>{title} {name}</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           
           <Link to="/admin/crear" className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border group ${cardBg}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 transition-colors ${iconBg} ${isClaudia ? "group-hover:bg-rose-600 group-hover:text-white" : "group-hover:bg-blue-600 group-hover:text-white"}`}>
                 <FontAwesomeIcon icon={faPlus} />
              </div>
              <h3 className={`text-xl font-bold ${textColor}`}>Nuevo Inmueble</h3>
              <p className="text-sm opacity-60 mt-2">Publicar una propiedad.</p>
           </Link>

           <Link to="/admin/inmuebles" className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border group ${cardBg}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 transition-colors ${iconBg} ${isClaudia ? "text-emerald-500 bg-emerald-100 group-hover:bg-emerald-600" : "text-green-500 bg-slate-800 group-hover:bg-green-600"} group-hover:text-white`}>
                 <FontAwesomeIcon icon={faList} />
              </div>
              <h3 className={`text-xl font-bold ${textColor}`}>Inventario</h3>
              <p className="text-sm opacity-60 mt-2">Editar o eliminar.</p>
           </Link>

           <Link to="/admin/blog" className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border group ${cardBg}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 transition-colors ${iconBg} ${isClaudia ? "text-purple-500 bg-purple-100 group-hover:bg-purple-600" : "text-purple-500 bg-slate-800 group-hover:bg-purple-600"} group-hover:text-white`}>
                 <FontAwesomeIcon icon={faNewspaper} />
              </div>
              <h3 className={`text-xl font-bold ${textColor}`}>Gestor Blog</h3>
              <p className="text-sm opacity-60 mt-2">Noticias y artículos.</p>
           </Link>

           <Link to="/admin/asesores" className={`p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border group ${cardBg}`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 transition-colors ${iconBg} ${isClaudia ? "text-amber-500 bg-amber-100 group-hover:bg-amber-600" : "text-yellow-500 bg-slate-800 group-hover:bg-yellow-500"} group-hover:text-white`}>
                 <FontAwesomeIcon icon={faUsersCog} />
              </div>
              <h3 className={`text-xl font-bold ${textColor}`}>Maestros</h3>
              <p className="text-sm opacity-60 mt-2">Perfiles y accesos.</p>
           </Link>

        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;