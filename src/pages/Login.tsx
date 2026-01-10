import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { pb } from "../api";
import { Eye, EyeOff, ShieldCheck, Lock, User } from "lucide-react";
import { motion } from "framer-motion";

// IMPORTAMOS PIEZAS SEGMENTADAS
import { getLoginConfig } from "../config/loginConfig";

// --- CORRECCIÓN AQUÍ: Apuntamos a la carpeta 'auth' dentro de 'pages' ---
import SecurityModal from "./auth/SecurityModal"; 

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const config = getLoginConfig(location.pathname); 
  
  // ESTADOS
  const [secretWord, setSecretWord] = useState("");
  const [email, setEmail] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ESTADOS DE SEGURIDAD
  const [attempts, setAttempts] = useState(0);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"warning" | "error" | "demon">("warning");
  const [shake, setShake] = useState(false);

  // --- PROTECCIÓN BLUE HAT ---
  useEffect(() => {
    const handleContextMenu = (e: Event) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // --- LÓGICA DE FALLOS ---
  const triggerFailure = (count: number) => {
    let msg = "";
    if (config.mode === "standard") {
        setModalType("error");
        if (count === 1) msg = "Credenciales no válidas. Verifique sus datos.";
        if (count === 2) msg = "Acceso denegado. Segundo intento fallido.";
        if (count >= 3) msg = "Por seguridad, su IP ha sido registrada.";
    } else {
        if (count === 1) { setModalType("warning"); msg = config.theme === "claudia" ? "Esa no es la palabra..." : "Acceso Denegado."; }
        if (count === 2) { setModalType("warning"); msg = config.theme === "claudia" ? "Me estás haciendo perder tiempo." : "Infracción de Protocolo."; }
        if (count === 3) { setModalType("error"); msg = config.theme === "claudia" ? "ÚLTIMA ADVERTENCIA 🌸" : "AMENAZA DETECTADA."; }
        if (count >= 4) { setModalType("demon"); msg = "ADIÓS."; }
    }

    setModalMsg(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);

    if (config.mode === "secret" && count >= 4) {
        setTimeout(() => window.location.href = config.punishUrl, 2000);
    } else {
        setTimeout(() => setModalMsg(""), 2500);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        const userToAuth = config.ghostUser || email;
        await pb.collection("users").authWithPassword(userToAuth, secretWord);
        localStorage.setItem("ayc_theme", config.theme);
        setAttempts(0);
        navigate("/dashboard/inventario");
    } catch (error) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        triggerFailure(newAttempts);
    } finally {
        setLoading(false);
        setSecretWord(""); 
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-700 ${config.bg} relative overflow-hidden px-4 md:px-0`}>
       
       {config.theme === "agent" && (
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
       )}

       {/* MODAL DE SEGURIDAD */}
       <SecurityModal 
          msg={modalMsg} 
          type={modalType} 
          theme={config.theme} 
          mode={config.mode} 
          onClose={() => setModalMsg("")} 
          attempts={attempts}
       />

       {/* TARJETA DE LOGIN */}
       <motion.div 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className={`w-full max-w-md p-6 md:p-10 rounded-3xl border shadow-2xl relative overflow-hidden z-10 ${config.container} ${shake ? "translate-x-2 ring-2 ring-red-500" : ""}`}
       >
          <div className="text-center mb-6 md:mb-8">
             <div className="text-5xl md:text-6xl mb-4 animate-bounce-slow drop-shadow-md">{config.icon}</div>
             <h1 className={`text-xl md:text-2xl font-black uppercase tracking-widest ${config.textTitle}`}>{config.title}</h1>
             <p className="text-[10px] mt-2 uppercase tracking-[0.3em] font-bold opacity-60">{config.mode === "standard" ? "Acceso Corporativo" : "Acceso Restringido"}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
             {config.mode === "standard" && (
                <div className="group">
                   <label className={`block text-[10px] font-bold uppercase mb-2 ${config.textLabel}`}>Correo Corporativo</label>
                   <div className="relative">
                       <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors"/>
                       <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full p-4 pl-12 rounded-xl outline-none border transition-all font-bold text-sm ${config.input}`} placeholder="agente@ayc.com" required/>
                   </div>
                </div>
             )}

             <div className="group">
                <label className={`block text-[10px] font-bold uppercase mb-2 ${config.textLabel}`}>{config.mode === "secret" ? "Palabra Mágica" : "Contraseña"}</label>
                <div className="relative">
                   <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${config.mode === "standard" ? "text-gray-400 group-focus-within:text-green-600" : "text-gray-500"}`}/>
                   <input type={showPassword ? "text" : "password"} value={secretWord} onChange={e => setSecretWord(e.target.value)} className={`w-full p-4 pl-12 pr-12 rounded-xl outline-none border transition-all font-bold ${config.input} ${config.mode === "secret" ? "text-center text-lg tracking-[0.2em]" : "text-sm"}`} placeholder={config.mode === "secret" ? "***" : "••••••"} autoFocus required/>
                   <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                </div>
             </div>

             <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 flex justify-center items-center gap-2 ${config.btn}`}>
                {loading ? "Validando..." : <>{config.mode === "standard" ? "Iniciar Sesión" : "Acceder"} {config.mode === "standard" && <ShieldCheck size={18} />}</>}
             </button>
          </form>

          {config.mode === "standard" && (
             <div className="mt-6 md:mt-8 text-center border-t border-gray-100 pt-6">
                <p className="text-xs text-gray-400">¿Olvidaste tu contraseña?</p>
                <a href="#" className="text-[#009B4D] font-bold text-xs hover:underline">Solicitar soporte técnico</a>
             </div>
          )}
       </motion.div>
    </div>
  );
}