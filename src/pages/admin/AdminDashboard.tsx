import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faNewspaper, faUsersCog } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();
  const meta = user?.user_metadata;
  const title = meta?.custom_title || "Maestro";
  const name = meta?.full_name || "Desconocido";

  // DETECTAR SI ES CLAUDIA
  const isClaudia = name.includes("Claudia") || user?.email?.includes("cabrera");

  // CLASES DE ESTILO
  const bgMain = isClaudia ? "bg-rose-50 text-slate-800" : "bg-slate-950 text-slate-300";
  const titleColor = isClaudia ? "text-rose-900" : "text-white";
  const highlightColor = isClaudia ? "text-rose-600" : "text-yellow-500";
  const cardBg = isClaudia ? "bg-white border-rose-100" : "bg-slate-900 border-slate-800";
  const iconBg = isClaudia ? "bg-rose-100 text-rose-500" : "bg-slate-800 text-blue-500";
  const textColor = isClaudia ? "text-slate-800" : "text-white";

  return (
    <div className={`${bgMain} min-h-screen p-6 md:p-8 transition-colors duration-500`}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
            <h1 className={`text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter ${titleColor}`}>Panel de Control</h1>
            <p className="flex flex-col md:flex-row md:items-center gap-1 opacity-80 text-sm md:text-base">
               <span>Bienvenid{title === "Maestra" ? "a" : "o"},</span>
               <span className={`font-bold ${highlightColor}`}>{title} {name}</span>
            </p>
        </div>

        {/* GRID RESPONSIVO: 1 Columna en Móvil, 2 en Tablet, 4 en Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
           
           {/* TARJETA 1 */}
           <Link to="/admin/crear" className={`p-6 rounded-2xl shadow-lg border active:scale-95 transition-transform group ${cardBg}`}>
              <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-colors ${iconBg}`}>
                     <FontAwesomeIcon icon={faPlus} />
                  </div>
                  <div>
                      <h3 className={`text-lg md:text-xl font-bold ${textColor}`}>Nuevo</h3>
                      <p className="text-xs opacity-60">Publicar inmueble</p>
                  </div>
              </div>
           </Link>

           {/* TARJETA 2 */}
           <Link to="/admin/inmuebles" className={`p-6 rounded-2xl shadow-lg border active:scale-95 transition-transform group ${cardBg}`}>
              <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-colors ${iconBg}`}>
                     <FontAwesomeIcon icon={faList} />
                  </div>
                  <div>
                      <h3 className={`text-lg md:text-xl font-bold ${textColor}`}>Inventario</h3>
                      <p className="text-xs opacity-60">Gestionar todo</p>
                  </div>
              </div>
           </Link>

           {/* TARJETA 3 */}
           <Link to="/admin/blog" className={`p-6 rounded-2xl shadow-lg border active:scale-95 transition-transform group ${cardBg}`}>
              <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-colors ${iconBg}`}>
                     <FontAwesomeIcon icon={faNewspaper} />
                  </div>
                  <div>
                      <h3 className={`text-lg md:text-xl font-bold ${textColor}`}>Blog</h3>
                      <p className="text-xs opacity-60">Noticias</p>
                  </div>
              </div>
           </Link>

           {/* TARJETA 4 */}
           <Link to="/admin/asesores" className={`p-6 rounded-2xl shadow-lg border active:scale-95 transition-transform group ${cardBg}`}>
              <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl transition-colors ${iconBg}`}>
                     <FontAwesomeIcon icon={faUsersCog} />
                  </div>
                  <div>
                      <h3 className={`text-lg md:text-xl font-bold ${textColor}`}>Maestros</h3>
                      <p className="text-xs opacity-60">Perfiles</p>
                  </div>
              </div>
           </Link>

        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;