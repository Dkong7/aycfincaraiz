import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { pb } from "../api";
import { Eye, EyeOff, AlertTriangle, ShieldCheck, Lock, User, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // ESTADOS
  const [secretWord, setSecretWord] = useState("");
  const [email, setEmail] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [modalMsg, setModalMsg] = useState("");
  const [modalType, setModalType] = useState<"warning" | "error" | "demon">("warning"); // Para controlar estilo del modal
  const [shake, setShake] = useState(false);

  // --- CONFIGURACIÓN DE APARIENCIA Y COMPORTAMIENTO ---
  const getConfig = () => {
    const path = location.pathname;
    
    // 1. CLAUDIA (Pastel / Rosado / Secreto)
    if (path === "/claclacla") return {
       mode: "secret",
       theme: "claudia", 
       bg: "bg-[#fff0f5]", 
       container: "bg-white/90 border-pink-200 shadow-pink-200/50",
       textTitle: "text-pink-600", 
       textLabel: "text-pink-400",
       input: "bg-white border-pink-200 focus:border-pink-500 text-pink-700 placeholder-pink-300",
       btn: "bg-pink-500 hover:bg-pink-600 text-white shadow-pink-300",
       title: "HOLA MA'", // CAMBIO SOLICITADO
       ghostUser: "claudia@ayc.com",
       punishUrl: "https://www.marilynmanson.com",
       icon: "🌸"
    };

    // 2. ALFONSO (Oscuro / Tierra / Secreto)
    if (path === "/alfalfalf") return {
       mode: "secret",
       theme: "alfonso", 
       bg: "bg-[#0a0a0a]", 
       container: "bg-[#111] border-amber-900/30 shadow-amber-900/20",
       textTitle: "text-amber-600", 
       textLabel: "text-amber-700",
       input: "bg-black border-amber-900/50 focus:border-amber-500 text-amber-500 placeholder-amber-900",
       btn: "bg-amber-700 hover:bg-amber-600 text-white shadow-amber-900/50",
       title: "HOLA PA'", // CAMBIO SOLICITADO
       ghostUser: "alfonso@ayc.com",
       punishUrl: "https://www.pixar.com",
       icon: "🦁"
    };

    // 3. AGENTES (Corporativo / Navy & Emerald / Estándar)
    return {
       mode: "standard",
       theme: "agent", 
       bg: "bg-[#0A192F]", // Blue Navy corporativo
       container: "bg-white border-gray-200 shadow-2xl",
       textTitle: "text-[#0A192F]", 
       textLabel: "text-gray-500",
       input: "bg-gray-50 border-gray-300 focus:border-[#009B4D] text-[#0A192F] placeholder-gray-400", // Focus Verde Esmeralda
       btn: "bg-[#009B4D] hover:bg-[#007a3d] text-white shadow-lg",
       title: "PORTAL AGENTES",
       ghostUser: null, 
       punishUrl: "/",
       icon: "🛡️"
    };
  };
  const config = getConfig();

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

  // --- SISTEMA DE RESPUESTA A FALLOS ---
  const triggerFailure = (count: number) => {
    let msg = "";
    
    // LÓGICA AGENTES (Corporativa / Elegante)
    if (config.mode === "standard") {
        setModalType("error"); // Estilo elegante
        if (count === 1) msg = "Credenciales no válidas. Verifique sus datos.";
        if (count === 2) msg = "Acceso denegado. Segundo intento fallido.";
        if (count >= 3) msg = "Por seguridad, su IP ha sido registrada.";
    } 
    // LÓGICA SECRETA (Agresiva / Divertida)
    else {
        if (count === 1) {
            setModalType("warning");
            msg = config.theme === "claudia" ? "Esa no es la palabra..." : "Acceso Denegado.";
        }
        if (count === 2) {
            setModalType("warning");
            msg = config.theme === "claudia" ? "Me estás haciendo perder tiempo." : "Infracción de Protocolo.";
        }
        if (count === 3) {
            setModalType("error");
            msg = config.theme === "claudia" ? "ÚLTIMA ADVERTENCIA 🌸" : "AMENAZA DETECTADA.";
        }
        if (count >= 4) {
            setModalType("demon"); // MODO DEMONIO
            msg = "ADIÓS.";
        }
    }

    setModalMsg(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);

    // Ejecución del castigo final (Solo rutas secretas)
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
        // Autenticación real contra PocketBase
        await pb.collection("users").authWithPassword(userToAuth, secretWord);
        
        // Guardar tema en local para el Dashboard
        localStorage.setItem("ayc_theme", config.theme);
        
        setAttempts(0);
        navigate("/dashboard/inventario");
    } catch (error) {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        triggerFailure(newAttempts);
    } finally {
        setLoading(false);
        // Si es agente, no borramos el email, solo la pass para facilitar reintento
        if(config.mode === "standard") setSecretWord(""); 
        else setSecretWord(""); 
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-sans transition-colors duration-700 ${config.bg} relative overflow-hidden px-4 md:px-0`}>
       
       {/* FONDO ANIMADO SUTIL PARA AGENTES */}
       {config.theme === "agent" && (
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
       )}

       {/* --- MODALES DE ESTADO --- */}
       <AnimatePresence>
         {modalMsg && (
            <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/80 backdrop-blur-md px-6"
            >
               {/* MODAL DEMONIO (Rutas Secretas Fallo 4) */}
               {modalType === "demon" && (
                   <div className="text-center">
                       <motion.div 
                         animate={{ scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] }} 
                         transition={{ duration: 0.3, repeat: Infinity }}
                         className="text-7xl md:text-9xl mb-4 drop-shadow-[0_0_50px_rgba(255,0,0,0.8)]"
                       >
                           👹
                       </motion.div>
                       <h2 className="text-4xl md:text-6xl font-black text-red-600 uppercase tracking-widest glitch-text">
                          {modalMsg}
                       </h2>
                   </div>
               )}

               {/* MODAL CORPORATIVO (Agentes) */}
               {config.theme === "agent" && (
                   <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border-t-8 border-red-600">
                       <XCircle className="w-12 h-12 md:w-16 md:h-16 text-red-600 mx-auto mb-4" />
                       <h3 className="text-lg md:text-xl font-bold text-[#0A192F] mb-2 uppercase">Error de Autenticación</h3>
                       <p className="text-gray-500 text-sm mb-6">{modalMsg}</p>
                       <button onClick={() => setModalMsg("")} className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-sm uppercase">Cerrar</button>
                   </div>
               )}

               {/* MODAL ADVERTENCIA (Rutas Secretas Fallos 1-3) */}
               {config.mode === "secret" && modalType !== "demon" && (
                   <div className="text-center px-4">
                       <div className="text-6xl md:text-8xl mb-6 animate-bounce">
                           {attempts === 3 ? "👿" : attempts === 2 ? "😠" : "🤨"}
                       </div>
                       <h2 className={`text-2xl md:text-4xl font-black uppercase text-center ${config.theme === "claudia" ? "text-pink-400" : "text-amber-500"}`}>
                          {modalMsg}
                       </h2>
                   </div>
               )}
            </motion.div>
         )}
       </AnimatePresence>

       {/* --- TARJETA DE LOGIN --- */}
       <motion.div 
         initial={{ y: 20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className={`w-full max-w-md p-6 md:p-10 rounded-3xl border shadow-2xl relative overflow-hidden z-10 ${config.container} ${shake ? "translate-x-2 ring-2 ring-red-500" : ""}`}
       >
          {/* HEADER TARJETA */}
          <div className="text-center mb-6 md:mb-8">
             <div className="text-5xl md:text-6xl mb-4 animate-bounce-slow drop-shadow-md">{config.icon}</div>
             <h1 className={`text-xl md:text-2xl font-black uppercase tracking-widest ${config.textTitle}`}>
                {config.title}
             </h1>
             <p className="text-[10px] mt-2 uppercase tracking-[0.3em] font-bold opacity-60">
                {config.mode === "standard" ? "Acceso Corporativo" : "Acceso Restringido"}
             </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
             
             {/* CAMPO USUARIO (Solo Agentes) */}
             {config.mode === "standard" && (
                <div className="group">
                   <label className={`block text-[10px] font-bold uppercase mb-2 ${config.textLabel}`}>Correo Corporativo</label>
                   <div className="relative">
                       <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors"/>
                       <input 
                         type="email" 
                         value={email}
                         onChange={e => setEmail(e.target.value)}
                         className={`w-full p-4 pl-12 rounded-xl outline-none border transition-all font-bold text-sm ${config.input}`}
                         placeholder="agente@ayc.com"
                         required
                       />
                   </div>
                </div>
             )}

             {/* CAMPO PASSWORD */}
             <div className="group">
                <label className={`block text-[10px] font-bold uppercase mb-2 ${config.textLabel}`}>
                   {config.mode === "secret" ? "Palabra Mágica" : "Contraseña"}
                </label>
                <div className="relative">
                   <Lock size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${config.mode === "standard" ? "text-gray-400 group-focus-within:text-green-600" : "text-gray-500"}`}/>
                   <input 
                      type={showPassword ? "text" : "password"} 
                      value={secretWord} 
                      onChange={e => setSecretWord(e.target.value)} 
                      className={`w-full p-4 pl-12 pr-12 rounded-xl outline-none border transition-all font-bold ${config.input} ${config.mode === "secret" ? "text-center text-lg tracking-[0.2em]" : "text-sm"}`}
                      placeholder={config.mode === "secret" ? "***" : "••••••"}
                      autoFocus
                      required
                   />
                   <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                   >
                      {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                   </button>
                </div>
             </div>

             <button 
                type="submit" 
                disabled={loading}
                className={`w-full py-4 rounded-xl font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 flex justify-center items-center gap-2 ${config.btn}`}
             >
                {loading ? "Validando..." : (
                  <>
                    {config.mode === "standard" ? "Iniciar Sesión" : "Acceder"}
                    {config.mode === "standard" && <ShieldCheck size={18} />}
                  </>
                )}
             </button>
          </form>

          {/* FOOTER TARJETA (Solo Agentes) */}
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