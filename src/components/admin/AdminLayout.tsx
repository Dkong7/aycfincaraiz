import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlusCircle, faSignOutAlt, faList, faUserTie } from "@fortawesome/free-solid-svg-icons";

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* SIDEBAR BLANCO - LIMPIO */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-50">
        
        {/* LOGO */}
        <div className="p-6 flex justify-center border-b border-gray-100">
          <img src="/ayclogo.svg" alt="A&C" className="h-20 w-auto object-contain" />
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Gestión</p>
          
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-all font-medium">
            <FontAwesomeIcon icon={faList} /> <span>Mis Inmuebles</span>
          </Link>
          
          <Link to="/admin/crear" className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition-all shadow-sm">
            <FontAwesomeIcon icon={faPlusCircle} /> <span>+ Nuevo Inmueble</span>
          </Link>

          <Link to="/admin/asesores" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-primary rounded-lg transition-all font-medium">
            <FontAwesomeIcon icon={faUserTie} /> <span>Gestionar Asesores</span>
          </Link>

          <div className="border-t border-gray-100 my-4 mx-2"></div>
          
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-600 transition-colors text-sm">
             <FontAwesomeIcon icon={faHome} /> <span>Ver Página Web</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={() => signOut()} className="flex items-center gap-3 px-4 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded w-full transition-colors text-sm font-bold">
            <FontAwesomeIcon icon={faSignOutAlt} /> <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto bg-[#f3f4f6]">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
