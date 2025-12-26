import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSmile, faAngry, faDizzy, faSkull, faDoorOpen, faSadTear, faFrown, faHeart } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState({ title: "Maestro", name: "" });
  const navigate = useNavigate();
  const location = useLocation();

  const [failCount, setFailCount] = useState(0);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ANGRY_1" | "ANGRY_2" | "DEMON" | "GAME_OVER">("IDLE");
  const [debugError, setDebugError] = useState("");

  // DETECTAR RUTA (CLAUDIA O ALFONSO/DKONG)
  const isClaudiaRoute = location.pathname === "/claclacla";

  // CLASES DE ESTILO DINÁMICAS
  const bgClass = isClaudiaRoute 
    ? "bg-rose-50" // Pastel para Claudia
    : "bg-black";  // Oscuro para Dkong/Alfonso

  const bgOverlay = isClaudiaRoute
    ? "bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" // Textura suave
    : "bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-40"; // Textura ruda

  const cardClass = isClaudiaRoute
    ? "bg-white border-rose-200 shadow-xl shadow-rose-200/50"
    : "bg-slate-900 border-slate-800 shadow-2xl";

  const textClass = isClaudiaRoute ? "text-slate-600" : "text-slate-300";
  const titleClass = isClaudiaRoute ? "text-rose-500" : "text-slate-200";
  const inputClass = isClaudiaRoute 
    ? "bg-rose-50 border-rose-200 text-slate-700 focus:border-rose-400 focus:ring-rose-200" 
    : "bg-black border-slate-800 text-slate-300 focus:border-red-600";
  
  const buttonClass = isClaudiaRoute
    ? "bg-rose-400 hover:bg-rose-500 text-white shadow-rose-300/50"
    : "bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 text-white hover:border-red-500";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDebugError("");

    const cleanUser = username.trim().toLowerCase();
    const finalEmail = cleanUser.includes("@") ? cleanUser : `${cleanUser}@ayc.local`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: finalEmail,
      password: password,
    });

    if (error || !data.session) {
      setDebugError(error?.message || "Credenciales incorrectas");
      const newFail = failCount + 1;
      setFailCount(newFail);
      setLoading(false);

      if (newFail === 1) { setStatus("ANGRY_1"); setTimeout(() => setStatus("IDLE"), 2500); }
      else if (newFail === 2) { setStatus("ANGRY_2"); setTimeout(() => setStatus("IDLE"), 2500); }
      else if (newFail === 3) { setStatus("DEMON"); setTimeout(() => setStatus("IDLE"), 2500); }
      else if (newFail >= 4) { 
         setStatus("GAME_OVER"); 
         setTimeout(() => { window.location.href = isClaudiaRoute ? "https://www.marilynmanson.com" : "https://www.pixar.com"; }, 3000); 
      }
    } else {
      const meta = data.user?.user_metadata;
      setWelcomeMsg({ title: meta?.custom_title || "Usuario", name: meta?.full_name || "" });
      setStatus("SUCCESS");
      setTimeout(() => { navigate("/admin"); }, 2000);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-mono relative overflow-hidden transition-colors duration-700 ${bgClass}`}>
      <div className={`absolute inset-0 ${bgOverlay}`}></div>
      {!isClaudiaRoute && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/50 to-red-950/20 pointer-events-none"></div>}

      {/* MODAL RESPUESTA */}
      {status !== "IDLE" && (
         <div className={`fixed inset-0 z-[100] flex items-center justify-center animate-fade-in backdrop-blur-md ${isClaudiaRoute ? "bg-white/80" : "bg-black/95"}`}>
            
            {status === "SUCCESS" && (
                <div className="text-center animate-bounce">
                   <FontAwesomeIcon icon={isClaudiaRoute ? faHeart : faSmile} className={`text-[150px] mb-6 ${isClaudiaRoute ? "text-rose-400" : "text-green-500"}`} />
                   <h2 className={`text-3xl font-black uppercase ${isClaudiaRoute ? "text-rose-600" : "text-white"}`}>Bienvenida</h2>
                   <p className={`text-xl font-bold mt-2 ${isClaudiaRoute ? "text-slate-600" : "text-green-400"}`}>{welcomeMsg.title} {welcomeMsg.name}</p>
                </div>
            )}

            {(status === "ANGRY_1" || status === "ANGRY_2" || status === "DEMON") && (
                <div className="text-center animate-pulse">
                   <FontAwesomeIcon 
                      icon={isClaudiaRoute ? (status === "ANGRY_1" ? faFrown : faSadTear) : (status === "ANGRY_1" ? faAngry : faSkull)} 
                      className={`text-[150px] mb-6 ${isClaudiaRoute ? "text-rose-300" : "text-red-600"}`} 
                   />
                   <h2 className={`text-3xl font-bold uppercase tracking-widest ${isClaudiaRoute ? "text-rose-500" : "text-white"}`}>
                      {isClaudiaRoute ? "Ups, intenta de nuevo..." : "ACCESO DENEGADO"}
                   </h2>
                </div>
            )}

            {status === "GAME_OVER" && (
                <div className="text-center">
                   <FontAwesomeIcon icon={faDoorOpen} className={`text-[150px] mb-6 animate-bounce ${isClaudiaRoute ? "text-slate-400" : "text-blue-400"}`} />
                   <h2 className={`text-6xl font-black uppercase tracking-tighter mb-4 ${isClaudiaRoute ? "text-slate-800" : "text-white"}`}>
                      {isClaudiaRoute ? "Lo siento..." : "¡TE LO DIJE!"}
                   </h2>
                </div>
            )}
         </div>
      )}

      {/* FORMULARIO */}
      <div className={`relative z-10 border p-10 rounded-3xl shadow-xl max-w-md w-full mx-4 transition-all duration-500 ${cardClass}`}>
        <div className="text-center mb-10">
           <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 animate-pulse ${isClaudiaRoute ? "bg-rose-100 border-rose-300" : "bg-black border-red-900"}`}>
              <FontAwesomeIcon icon={faEye} className={`text-5xl ${isClaudiaRoute ? "text-rose-400" : "text-red-600"}`} />
           </div>
           <h1 className={`text-2xl font-bold uppercase tracking-[0.2em] ${titleClass}`}>
              {isClaudiaRoute ? "Ingreso Maestra" : "¿Quién osa entrar?"}
           </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={`block text-[10px] font-bold uppercase mb-2 tracking-widest ${isClaudiaRoute ? "text-rose-400" : "text-red-900"}`}>Identificación</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full p-4 rounded-xl outline-none transition-all text-center tracking-widest uppercase border ${inputClass}`} placeholder="USUARIO" required />
          </div>
          
          <div className="relative">
            <label className={`block text-[10px] font-bold uppercase mb-2 tracking-widest ${isClaudiaRoute ? "text-rose-400" : "text-red-900"}`}>Contraseña</label>
            <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full p-4 rounded-xl outline-none transition-all text-center tracking-widest pr-12 border ${inputClass}`} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest shadow-lg mt-4 text-xs ${buttonClass}`}>
            {loading ? "Verificando..." : "INGRESAR"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;