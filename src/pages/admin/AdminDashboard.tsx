import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faNewspaper, faUsersCog } from "@fortawesome/free-solid-svg-icons";

const AdminDashboard = () => {
  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-slate-800 mb-2 uppercase tracking-tighter">Panel de Control</h1>
        <p className="text-slate-500 mb-12">Bienvenido Maestro. ¿Qué desea gestionar hoy?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           
           {/* Crear Inmueble */}
           <Link to="/admin/crear" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-b-4 border-blue-500 group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                 <FontAwesomeIcon icon={faPlus} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Nuevo Inmueble</h3>
              <p className="text-sm text-slate-400 mt-2">Publicar una propiedad.</p>
           </Link>

           {/* Mis Inmuebles */}
           <Link to="/admin/inmuebles" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-b-4 border-green-500 group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-3xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                 <FontAwesomeIcon icon={faList} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Inventario</h3>
              <p className="text-sm text-slate-400 mt-2">Editar o eliminar.</p>
           </Link>

           {/* Blog Manager (NUEVO) */}
           <Link to="/admin/blog" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-b-4 border-purple-500 group">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-3xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                 <FontAwesomeIcon icon={faNewspaper} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Gestor Blog</h3>
              <p className="text-sm text-slate-400 mt-2">Noticias y artículos.</p>
           </Link>

           {/* Asesores */}
           <Link to="/admin/asesores" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-b-4 border-yellow-500 group">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-3xl mb-6 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                 <FontAwesomeIcon icon={faUsersCog} />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Maestros</h3>
              <p className="text-sm text-slate-400 mt-2">Claudia y Alfonso.</p>
           </Link>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;