import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSmile, faAngry, faDizzy, faSkull, faDoorOpen, faSadTear, faFrown, faUserTie, faGhost, faFaceFlushed } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [failCount, setFailCount] = useState(0);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ANGRY_1" | "ANGRY_2" | "DEMON" | "GAME_OVER">("IDLE");
  const [debugError, setDebugError] = useState("");

  // --- DETECTOR DE MODO ---
  const isClaudia = location.pathname === "/claclacla";
  const isAgent = location.pathname === "/agenteayc";
  const isDarkAdmin = !isClaudia && !isAgent; // Dkong/Alfonso

  // --- ESTILOS DINÁMICOS ---
  let bgClass = "bg-black";
  let bgOverlay = "";
  let cardClass = "bg-slate-900 border-slate-800";
  let titleText = "text-slate-200";
  let buttonClass = "bg-slate-800";
  let inputText = "text-slate-300";
  
  // LABELS SATÍRICOS VS SERIOS
  const labelUser = isAgent ? "Usuario Corporativo" : "¿Quién osa retarme?";
  const labelPass = isAgent ? "Contraseña" : "Palabra Mágica";
  const titleMain = isAgent ? "Portal Agentes A&C" : (isClaudia ? "Bienvenida Maestra" : "¿Quién osa entrar?");

  if (isClaudia) {
     bgClass = "bg-rose-50";
     bgOverlay = "bg-[url(''https://www.transparenttextures.com/patterns/cubes.png'')] opacity-10";
     cardClass = "bg-white border-rose-200 shadow-xl shadow-rose-200/50";
     titleText = "text-rose-500";
     buttonClass = "bg-rose-400 hover:bg-rose-500 text-white";
     inputText = "text-slate-600 bg-rose-50 border-rose-200 focus:border-rose-400";
  } else if (isAgent) {
     bgClass = "bg-slate-100"; // Sobrio
     bgOverlay = "";
     cardClass = "bg-white border-slate-200 shadow-xl";
     titleText = "text-blue-900";
     buttonClass = "bg-blue-900 hover:bg-blue-800 text-white";
     inputText = "text-slate-800 bg-slate-50 border-slate-300 focus:border-blue-900";
  } else {
     // DARK ADMIN
     bgOverlay = "bg-[url(''https://www.transparenttextures.com/patterns/black-felt.png'')] opacity-40";
     buttonClass = "bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 text-white border border-slate-700 hover:border-red-500";
     inputText = "bg-black border-slate-800 text-slate-300 focus:border-red-600";
  }

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
      setDebugError(error?.message || "Acceso Denegado");
      const newFail = failCount + 1;
      setFailCount(newFail);
      setLoading(false);

      if (newFail === 1) { setStatus("ANGRY_1"); setTimeout(() => setStatus("IDLE"), 2500); }
      else if (newFail === 2) { setStatus("ANGRY_2"); setTimeout(() => setStatus("IDLE"), 2500); }
      else if (newFail === 3) { setStatus("DEMON"); setTimeout(() => setStatus("IDLE"), 2500); }
      else if (newFail >= 4) { 
         setStatus("GAME_OVER"); 
         setTimeout(() => { 
            // CLAUDIA Y AGENTES -> MARILYN MANSON. DKONG -> PIXAR.
            const destination = (isClaudia || isAgent) ? "https://www.marilynmanson.com" : "https://www.pixar.com";
            window.location.href = destination;
         }, 3000); 
      }
    } else {
      setStatus("SUCCESS");
      setTimeout(() => { navigate("/admin"); }, 2000);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center font-mono relative overflow-hidden transition-colors duration-700 ${bgClass}`}>
      <div className={`absolute inset-0 ${bgOverlay}`}></div>
      {isDarkAdmin && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/50 to-red-950/20 pointer-events-none"></div>}

      {/* MODALES */}
      {status !== "IDLE" && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in">
            {status === "SUCCESS" && (
                <div className="text-center animate-bounce">
                   <FontAwesomeIcon icon={faSmile} className="text-[150px] mb-6 text-green-500" />
                   <h2 className="text-3xl text-white font-black uppercase">Bienvenido</h2>
                </div>
            )}
            {(status === "ANGRY_1" || status === "ANGRY_2" || status === "DEMON") && (
                <div className="text-center animate-pulse">
                   {/* EMOJIS: Agent (Asustados), Claudia (Tristes), Admin (Diablos) */}
                   <FontAwesomeIcon 
                      icon={
                         isAgent ? faFaceFlushed : (isClaudia ? faSadTear : faSkull)
                      } 
                      className={`text-[150px] mb-6 ${isAgent ? "text-yellow-400" : (isClaudia ? "text-rose-400" : "text-red-600")}`} 
                   />
                   <h2 className="text-3xl text-white font-bold uppercase tracking-widest">
                      {isAgent ? "Error de Credenciales" : "ACCESO DENEGADO"}
                   </h2>
                </div>
            )}
            {status === "GAME_OVER" && (
                <div className="text-center">
                   <FontAwesomeIcon icon={isAgent ? faGhost : faDoorOpen} className="text-[150px] text-purple-500 mb-6 animate-bounce" />
                   <h2 className="text-6xl text-white font-black uppercase tracking-tighter mb-4">¡FUERA!</h2>
                </div>
            )}
         </div>
      )}

      {/* CARD LOGIN */}
      <div className={`relative z-10 border p-10 rounded-3xl shadow-xl max-w-md w-full mx-4 transition-all duration-500 ${cardClass}`}>
        <div className="text-center mb-10">
           <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 ${isAgent ? "bg-blue-50 border-blue-900" : (isClaudia ? "bg-rose-100 border-rose-300" : "bg-black border-red-900")}`}>
              <FontAwesomeIcon icon={isAgent ? faUserTie : faEye} className={`text-5xl ${isAgent ? "text-blue-900" : (isClaudia ? "text-rose-400" : "text-red-600")}`} />
           </div>
           <h1 className={`text-2xl font-bold uppercase tracking-widest ${titleText}`}>
              {titleMain}
           </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className={`block text-[10px] font-bold uppercase mb-2 tracking-widest ${isAgent ? "text-slate-500" : (isClaudia ? "text-rose-400" : "text-red-900")}`}>{labelUser}</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full p-4 rounded-xl outline-none transition-all text-center tracking-widest uppercase border ${inputText}`} placeholder="..." required />
          </div>
          
          <div className="relative">
            <label className={`block text-[10px] font-bold uppercase mb-2 tracking-widest ${isAgent ? "text-slate-500" : (isClaudia ? "text-rose-400" : "text-red-900")}`}>{labelPass}</label>
            <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className={`w-full p-4 rounded-xl outline-none transition-all text-center tracking-widest pr-12 border ${inputText}`} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest shadow-lg mt-4 text-xs ${buttonClass}`}>
            {loading ? "..." : "INGRESAR AL SISTEMA"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;