import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Plus, List, Newspaper, Users, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Configuración de colores según rol
  const getTheme = () => {
    if (user?.role === 'claudia') return { bg: 'bg-pink-50', accent: 'text-pink-600', btn: 'bg-pink-100 text-pink-700 hover:bg-pink-200' };
    if (user?.role === 'alfonso') return { bg: 'bg-[#050b14]', accent: 'text-blue-400', btn: 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50 border border-blue-500/20' };
    return { bg: 'bg-gray-100', accent: 'text-[#009B4D]', btn: 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm' };
  };

  const theme = getTheme();
  const isDark = user?.role === 'alfonso';

  return (
    <div className={`min-h-screen p-8 ${theme.bg}`}>
      {/* HEADER */}
      <header className="flex justify-between items-center mb-12 max-w-6xl mx-auto">
         <div className="flex items-center gap-4">
            <img src="/ayclogo.svg" className={`h-12 ${isDark ? 'brightness-200 grayscale' : ''}`} />
            <div>
               <h1 className={`text-3xl font-black uppercase ${isDark ? 'text-white' : 'text-[#0A192F]'}`}>
                 PANEL DE CONTROL
               </h1>
               <p className={`font-bold ${theme.accent}`}>Bienvenid{user?.role === 'claudia' ? 'a' : 'o'}, {user?.name}</p>
            </div>
         </div>
         <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-2 border-2 border-red-500 text-red-500 font-bold rounded-full hover:bg-red-500 hover:text-white transition-all uppercase text-xs tracking-widest">
            <LogOut size={16}/> Salir
         </button>
      </header>

      {/* GRID DE ACCIONES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
         
         {/* NUEVO INMUEBLE */}
         <Link to="/dashboard/nuevo" className={`p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 transition-all hover:-translate-y-1 cursor-pointer ${theme.btn} h-64`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-blue-500 text-white' : 'bg-white shadow-md'}`}>
               <Plus />
            </div>
            <div>
               <h3 className="text-xl font-black uppercase">Nuevo</h3>
               <p className="text-xs opacity-70">Publicar inmueble</p>
            </div>
         </Link>

         {/* INVENTARIO */}
         <div className={`p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 transition-all hover:-translate-y-1 cursor-pointer ${theme.btn} h-64`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-blue-500 text-white' : 'bg-white shadow-md'}`}>
               <List />
            </div>
            <div>
               <h3 className="text-xl font-black uppercase">Inventario</h3>
               <p className="text-xs opacity-70">Gestionar todo</p>
            </div>
         </div>

         {/* BLOG (Solo Admins) */}
         {(user?.role === 'claudia' || user?.role === 'alfonso') && (
           <div className={`p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 transition-all hover:-translate-y-1 cursor-pointer ${theme.btn} h-64`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-blue-500 text-white' : 'bg-white shadow-md'}`}>
                 <Newspaper />
              </div>
              <div>
                 <h3 className="text-xl font-black uppercase">Blog</h3>
                 <p className="text-xs opacity-70">Noticias</p>
              </div>
           </div>
         )}

         {/* MAESTROS (Solo Admins) */}
         {(user?.role === 'claudia' || user?.role === 'alfonso') && (
           <div className={`p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4 transition-all hover:-translate-y-1 cursor-pointer ${theme.btn} h-64`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-blue-500 text-white' : 'bg-white shadow-md'}`}>
                 <Users />
              </div>
              <div>
                 <h3 className="text-xl font-black uppercase">Maestros</h3>
                 <p className="text-xs opacity-70">Perfiles</p>
              </div>
           </div>
         )}

      </div>
    </div>
  );
};
export default Dashboard;
