import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faSmile, faAngry, faDizzy, faSkull, faDoorOpen, faSadTear, faFrown } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState({ title: "Maestro", name: "" });
  const navigate = useNavigate();

  const [failCount, setFailCount] = useState(0);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ANGRY_1" | "ANGRY_2" | "DEMON" | "GAME_OVER">("IDLE");
  const [debugError, setDebugError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setDebugError("");

    // DETECTAR SI ES CLAUDIA (Para cambiar el modo de castigo)
    const isClaudia = username.toLowerCase().includes("claudia") || username.toLowerCase().includes("cabrera");

    const cleanUser = username.trim().toLowerCase();
    const finalEmail = cleanUser.includes("@") ? cleanUser : `${cleanUser}@ayc.local`;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: finalEmail,
      password: password,
    });

    if (error || !data.session) {
      console.error("Login Fail:", error?.message);
      setDebugError(error?.message || "Credenciales inválidas");
      
      const newFail = failCount + 1;
      setFailCount(newFail);
      setLoading(false);

      if (newFail === 1) {
         setStatus("ANGRY_1");
         setTimeout(() => setStatus("IDLE"), 2500);
      } else if (newFail === 2) {
         setStatus("ANGRY_2");
         setTimeout(() => setStatus("IDLE"), 2500);
      } else if (newFail === 3) {
         setStatus("DEMON");
         setTimeout(() => setStatus("IDLE"), 2500);
      } else if (newFail >= 4) {
         setStatus("GAME_OVER");
         setTimeout(() => { 
            // CLAUDIA VA A MARILYN MANSON, LOS DEMÁS A PIXAR
            window.location.href = isClaudia ? "https://www.marilynmanson.com" : "https://www.pixar.com"; 
         }, 3000);
      }
    } else {
      const meta = data.user?.user_metadata;
      setWelcomeMsg({ title: meta?.custom_title || "Usuario", name: meta?.full_name || "" });
      setStatus("SUCCESS");
      setTimeout(() => { navigate("/admin"); }, 2000);
    }
  };

  // CHECK VISUAL: ¿Es Claudia escribiendo? (Para renderizado condicional de iconos)
  const isClaudiaInput = username.toLowerCase().includes("claudia") || username.toLowerCase().includes("cabrera");

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[url(''https://www.transparenttextures.com/patterns/black-felt.png'')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/50 to-red-950/20 pointer-events-none"></div>

      {status !== "IDLE" && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-fade-in backdrop-blur-md">
            
            {/* SUCCESS */}
            {status === "SUCCESS" && (
                <div className="text-center animate-bounce">
                   <FontAwesomeIcon icon={faSmile} className={`text-[150px] mb-6 ${isClaudiaInput ? "text-pink-400" : "text-green-500"}`} />
                   <h2 className="text-3xl text-white font-black uppercase">Acceso Concedido</h2>
                   <p className={`text-xl font-bold mt-2 ${isClaudiaInput ? "text-pink-300" : "text-green-400"}`}>{welcomeMsg.title} {welcomeMsg.name}</p>
                </div>
            )}
            
            {/* FALLOS - LÓGICA DIFERENCIADA */}
            {(status === "ANGRY_1" || status === "ANGRY_2" || status === "DEMON") && (
                <div className="text-center animate-pulse">
                   {/* Si es Claudia: Iconos tristes/amigables. Si no: Iconos agresivos */}
                   <FontAwesomeIcon 
                      icon={
                         isClaudiaInput 
                           ? (status === "ANGRY_1" ? faFrown : faSadTear) // Iconos Claudia
                           : (status === "ANGRY_1" ? faAngry : status === "ANGRY_2" ? faDizzy : faSkull) // Iconos Standard
                      } 
                      className={`text-[150px] mb-6 ${
                         isClaudiaInput 
                           ? "text-rose-400" 
                           : (status === "ANGRY_1" ? "text-orange-500" : status === "ANGRY_2" ? "text-red-600" : "text-purple-600")
                      }`} 
                   />
                   
                   <h2 className="text-3xl text-white font-bold uppercase tracking-widest">
                      {isClaudiaInput ? "Ups, algo salió mal..." : "ACCESO DENEGADO"}
                   </h2>
                   
                   <p className="text-white mt-4 text-sm font-light">
                      {isClaudiaInput ? "Intenta de nuevo con calma, Maestra." : debugError}
                   </p>
                </div>
            )}

            {/* GAME OVER */}
            {status === "GAME_OVER" && (
                <div className="text-center">
                   <FontAwesomeIcon icon={faDoorOpen} className="text-[150px] text-blue-400 mb-6 animate-bounce" />
                   <h2 className="text-6xl text-white font-black uppercase tracking-tighter mb-4">
                      {isClaudiaInput ? "ADIÓS..." : "¡TE LO DIJE!"}
                   </h2>
                   <p className="text-xs text-gray-500 mt-8 animate-pulse">
                      Redirigiendo a {isClaudiaInput ? "MarilynManson.com" : "Pixar.com"}...
                   </p>
                </div>
            )}
         </div>
      )}

      <div className="relative z-10 bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center mb-10">
           <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border-4 animate-pulse ${isClaudiaInput ? "bg-rose-900 border-rose-500" : "bg-black border-red-900"}`}>
              <FontAwesomeIcon icon={faEye} className={`text-5xl ${isClaudiaInput ? "text-rose-300" : "text-red-600"}`} />
           </div>
           <h1 className="text-2xl font-bold text-slate-200 uppercase tracking-[0.2em]">¿Quién osa entrar?</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Usuario</label>
            <input 
               type="text" value={username} onChange={(e) => setUsername(e.target.value)} 
               className="w-full bg-black border border-slate-800 text-slate-300 p-4 rounded-xl focus:outline-none focus:border-white focus:text-white transition-all text-center tracking-widest placeholder-slate-800 uppercase" 
               placeholder="IDENTIFICACIÓN" required 
            />
          </div>
          
          <div className="relative">
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Contraseña</label>
            <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-slate-800 text-slate-300 p-4 rounded-xl focus:outline-none focus:border-white focus:text-white transition-all text-center tracking-widest placeholder-slate-800 pr-12"
                  placeholder="••••••••" required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-200 transition-colors focus:outline-none">
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest border shadow-lg mt-4 text-xs ${isClaudiaInput ? "bg-rose-900 text-white border-rose-700 hover:bg-rose-800" : "bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 text-white border-slate-700 hover:border-red-500"}`}>
            {loading ? "Verificando..." : "INTENTAR ACCESO"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;