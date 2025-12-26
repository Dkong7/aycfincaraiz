import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const LoginSpecial = () => {
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // DETECTAR CONFIGURACIÓN SEGÚN URL
  const getConfig = () => {
    if (location.pathname === '/claclacla') return {
      theme: 'pink',
      bg: 'bg-pink-50',
      btn: 'bg-pink-500 hover:bg-pink-600',
      title: 'BIENVENIDA MAESTRA',
      inputLabel: '¿QUIÉN OSA RETARME?',
      placeholder: 'CABRERACLAU',
      role: 'claudia'
    };
    if (location.pathname === '/alfalfalf') return {
      theme: 'blue',
      bg: 'bg-[#050b14]',
      btn: 'bg-blue-900 hover:bg-blue-800 border border-blue-500/30',
      title: 'PANEL DE CONTROL',
      inputLabel: 'IDENTIFICACIÓN DE MANDO',
      placeholder: 'ALDIAZM',
      text: 'text-blue-100',
      role: 'alfonso'
    };
    return { // /agentes
      theme: 'green',
      bg: 'bg-black',
      btn: 'bg-[#009B4D] hover:bg-[#007a3d]',
      title: 'PORTAL AGENTE',
      inputLabel: 'CREDENCIALES',
      placeholder: 'USUARIO',
      text: 'text-white',
      role: 'agente'
    };
  };

  const config = getConfig();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulación de Auth (Aquí conectarías con Supabase real)
    login(config.role, config.role === 'claudia' ? 'Claudia' : config.role === 'alfonso' ? 'Alfonso' : 'Agente');
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${config.bg} transition-colors duration-500`}>
      <div className="w-full max-w-md p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-10">
           <img src="/ayclogo.svg" alt="A&C" className="h-16 brightness-150 drop-shadow-lg" />
        </div>

        {/* CARD LOGIN */}
        <div className={`bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative overflow-hidden`}>
           {/* OJO ANIMADO (Solo Clau/Alf) */}
           {config.role !== 'agente' && (
             <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center animate-pulse ${config.theme === 'pink' ? 'bg-pink-100 text-pink-500' : 'bg-blue-900/50 text-blue-400'}`}>
                   <Eye size={32} />
                </div>
             </div>
           )}

           <h1 className={`text-center text-2xl font-black uppercase mb-8 tracking-widest ${config.text || 'text-gray-800'}`}>
             {config.title}
           </h1>

           <form onSubmit={handleLogin} className="space-y-6">
              <div>
                 <label className={`block text-xs font-bold mb-2 uppercase tracking-wider ${config.theme === 'pink' ? 'text-pink-400' : 'text-gray-500'}`}>
                   {config.inputLabel}
                 </label>
                 <input 
                   type="text" 
                   defaultValue={config.placeholder}
                   className={`w-full p-4 rounded-xl font-bold outline-none border-2 transition-all ${config.theme === 'pink' ? 'bg-pink-50 border-pink-100 text-pink-900 focus:border-pink-400' : 'bg-white/10 border-white/10 text-white focus:border-white/30'}`}
                 />
              </div>

              <div className="relative">
                 <label className={`block text-xs font-bold mb-2 uppercase tracking-wider ${config.theme === 'pink' ? 'text-pink-400' : 'text-gray-500'}`}>
                   PALABRA MÁGICA
                 </label>
                 <input 
                   type={showPass ? "text" : "password"}
                   value={pass}
                   onChange={(e) => setPass(e.target.value)}
                   className={`w-full p-4 rounded-xl font-bold outline-none border-2 transition-all ${config.theme === 'pink' ? 'bg-pink-50 border-pink-100 text-pink-900 focus:border-pink-400' : 'bg-white/10 border-white/10 text-white focus:border-white/30'}`}
                 />
                 <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-10 text-gray-400 hover:text-white">
                    {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                 </button>
              </div>

              <button className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg transform active:scale-95 transition-all ${config.btn}`}>
                 INGRESAR AL SISTEMA
              </button>
           </form>
        </div>
      </div>
    </div>
  );
};
export default LoginSpecial;
