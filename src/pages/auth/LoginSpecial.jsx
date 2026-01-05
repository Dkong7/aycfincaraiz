import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, AlertTriangle } from 'lucide-react';

const LoginSpecial = () => {
  const [pass, setPass] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const getConfig = () => {
    if (location.pathname === '/claclacla') return { theme: 'pink', bg: 'bg-pink-50', text: 'text-pink-600', btn: 'bg-pink-500 hover:bg-pink-600', title: 'BIENVENIDA MA', role: 'claudia' };
    if (location.pathname === '/alfalfalf') return { theme: 'blue', bg: 'bg-[#050b14]', text: 'text-blue-400', btn: 'bg-blue-900 border-blue-500/30', title: 'BIENVENIDO PA', role: 'alfonso' };
    return { theme: 'green', bg: 'bg-[#1a1a1a]', text: 'text-green-500', btn: 'bg-[#009B4D]', title: 'PORTAL AGENTES', role: 'agente' };
  };
  const config = getConfig();

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === 'diegorimacongenio') {
        login(config.role, config.role.toUpperCase());
        navigate('/dashboard');
    } else {
        setAttempts(prev => prev + 1);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        if(attempts >= 3) {
            // Aquí iría la lógica de redirección a Pixar/Marilyn si tuvieras las URLs
            alert("SISTEMA BLOQUEADO: INTRUSO DETECTADO");
        }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${config.bg} transition-colors duration-500`}>
      <div className={`w-full max-w-md p-8 rounded-3xl border backdrop-blur-xl ${shake ? 'animate-error border-red-500' : 'border-white/10 bg-white/5'}`}>
         <div className={`flex justify-center mb-6 text-5xl ${shake ? 'animate-pulse' : ''}`}>
            {config.theme === 'pink' ? '🌸' : config.theme === 'blue' ? '🧿' : '🌿'}
         </div>
         <h1 className={`text-center text-2xl font-black uppercase mb-8 ${config.text}`}>{config.title}</h1>
         
         <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
               <Lock className="absolute left-4 top-4 text-gray-400" size={18}/>
               <input type="password" placeholder="CONTRASEÑA MAESTRA" value={pass} onChange={(e) => setPass(e.target.value)}
                 className={`w-full p-4 pl-12 rounded-xl font-bold outline-none border-2 ${shake ? 'border-red-500 text-red-500 bg-red-900/10' : 'border-white/10 bg-black/20 text-gray-300 focus:border-white/30'}`}
               />
            </div>
            <button className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg transform active:scale-95 transition-all ${config.btn}`}>ACCEDER</button>
         </form>
         {attempts > 0 && <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-xs font-mono"><AlertTriangle size={12}/> {attempts} INTENTOS FALLIDOS</div>}
      </div>
    </div>
  );
};
export default LoginSpecial;