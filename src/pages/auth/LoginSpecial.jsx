import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock } from 'lucide-react';

const LoginSpecial = () => {
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [errorAnim, setErrorAnim] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const getConfig = () => {
    if (location.pathname === '/claclacla') return { theme: 'pink', bg: 'bg-pink-50', btn: 'bg-pink-500 hover:bg-pink-600', title: 'BIENVENIDA MAESTRA', role: 'claudia' };
    if (location.pathname === '/alfalfalf') return { theme: 'blue', bg: 'bg-[#050b14]', btn: 'bg-blue-900 border-blue-500/30', title: 'SISTEMA CENTRAL', role: 'alfonso' };
    return { theme: 'green', bg: 'bg-black', btn: 'bg-[#009B4D]', title: 'PORTAL AGENTES', role: 'agente' };
  };
  const config = getConfig();

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (pass === 'diegorimacongenio') {
        login(config.role, config.role.toUpperCase());
        navigate('/dashboard');
    } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= 4) {
            setErrorAnim(true);
            setTimeout(() => setErrorAnim(false), 500);
        } else {
            // Pequeño shake normal
            const form = document.getElementById('login-card');
            form.classList.add('translate-x-1');
            setTimeout(() => form.classList.remove('translate-x-1'), 100);
        }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${config.bg}`}>
      <div id="login-card" className={`w-full max-w-md p-8 rounded-3xl border ${errorAnim ? 'animate-error bg-red-900/20' : 'bg-white/5 border-white/10'} backdrop-blur-xl transition-all duration-300`}>
         <div className="flex justify-center mb-6 text-4xl">
            {config.theme === 'pink' ? '🌸' : config.theme === 'blue' ? '💠' : '🌿'}
         </div>
         <h1 className={`text-center text-2xl font-black uppercase mb-8 ${config.theme === 'blue' || config.theme === 'green' ? 'text-white' : 'text-gray-800'}`}>{config.title}</h1>
         
         <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
               <Lock className="absolute left-4 top-4 text-gray-400" size={18}/>
               <input 
                 type={showPass ? "text" : "password"}
                 placeholder="CONTRASEÑA MAESTRA"
                 value={pass}
                 onChange={(e) => setPass(e.target.value)}
                 className={`w-full p-4 pl-12 rounded-xl font-bold outline-none border-2 ${errorAnim ? 'border-red-500 text-red-500' : 'border-white/10 bg-white/5 text-gray-500 focus:border-white/30'}`}
               />
               <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-4 text-gray-400 hover:text-white">
                  {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
               </button>
            </div>
            <button className={`w-full py-4 rounded-xl font-black text-white uppercase tracking-widest shadow-lg ${config.btn}`}>
               ACCEDER
            </button>
         </form>
         {attempts > 0 && <p className="text-center text-xs text-red-500 mt-4 font-mono">INTENTOS FALLIDOS: {attempts}</p>}
      </div>
    </div>
  );
};
export default LoginSpecial;
