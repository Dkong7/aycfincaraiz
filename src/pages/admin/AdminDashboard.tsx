import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../supabaseClient";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
           <button onClick={() => supabase.auth.signOut()} className="text-red-500 font-bold hover:underline">
             <FontAwesomeIcon icon={faSignOutAlt} /> Salir
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Link to="/admin/crear" className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-green-500 group">
              <FontAwesomeIcon icon={faPlus} className="text-4xl text-green-500 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold">Nuevo Inmueble</h3>
              <p className="text-gray-500 text-sm mt-2">Registrar una propiedad</p>
           </Link>

           <Link to="/admin/inmuebles" className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-blue-500 group">
              <FontAwesomeIcon icon={faList} className="text-4xl text-blue-500 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold">Mis Inmuebles</h3>
              <p className="text-gray-500 text-sm mt-2">Editar o eliminar</p>
           </Link>

           <Link to="/admin/asesores" className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition text-center border-t-4 border-purple-500 group">
              <FontAwesomeIcon icon={faUsers} className="text-4xl text-purple-500 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold">Asesores</h3>
              <p className="text-gray-500 text-sm mt-2">Gestionar equipo</p>
           </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
