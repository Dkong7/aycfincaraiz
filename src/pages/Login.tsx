import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSmile, faAngry, faDizzy } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState({ title: "Maestro", name: "" }); // Estado para saludo
  const navigate = useNavigate();

  const [failCount, setFailCount] = useState(0);
  const [status, setStatus] = useState<"IDLE" | "SUCCESS" | "ANGRY_1" | "ANGRY_2">("IDLE");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      const newFail = failCount + 1;
      setFailCount(newFail);
      setStatus(newFail === 1 ? "ANGRY_1" : "ANGRY_2");
      setLoading(false);
      setTimeout(() => setStatus("IDLE"), 1500);
    } else {
      // LEER METADATOS PARA SALUDO PERSONALIZADO
      const meta = data.user?.user_metadata;
      const title = meta?.custom_title || "Maestro";
      const name = meta?.full_name || "";
      
      setWelcomeMsg({ title, name });
      setStatus("SUCCESS");
      
      setTimeout(() => {
         navigate("/admin");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[url(''https://www.transparenttextures.com/patterns/black-felt.png'')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/50 to-red-950/20 pointer-events-none"></div>

      {status !== "IDLE" && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 animate-fade-in backdrop-blur-sm">
            {status === "SUCCESS" && (
                <div className="text-center animate-bounce">
                   <FontAwesomeIcon icon={faSmile} className="text-[150px] text-green-500 mb-6 drop-shadow-[0_0_30px_rgba(0,255,0,0.5)]" />
                   <h2 className="text-3xl text-white font-black uppercase tracking-widest">
                      Bienvenid{welcomeMsg.title === "Maestra" ? "a" : "o"} {welcomeMsg.title}
                   </h2>
                   <p className="text-xl text-green-400 font-bold mt-2">{welcomeMsg.name}</p>
                </div>
            )}
            {status === "ANGRY_1" && (
                <div className="text-center animate-pulse">
                   <FontAwesomeIcon icon={faAngry} className="text-[150px] text-orange-500 mb-6" />
                   <h2 className="text-3xl text-white font-bold uppercase tracking-widest">¿Te equivocaste?</h2>
                   <p className="text-orange-400">Primer aviso...</p>
                </div>
            )}
            {status === "ANGRY_2" && (
                <div className="text-center animate-ping-slow">
                   <FontAwesomeIcon icon={faDizzy} className="text-[180px] text-red-600 mb-6 drop-shadow-[0_0_50px_rgba(255,0,0,0.8)]" />
                   <h2 className="text-5xl text-red-500 font-black uppercase tracking-tighter glitch-effect">¡LARGO DE AQUÍ!</h2>
                </div>
            )}
         </div>
      )}

      <div className="relative z-10 bg-slate-900 border border-slate-800 p-10 rounded-3xl shadow-2xl max-w-md w-full mx-4 group hover:border-red-900/50 transition-colors duration-500">
        <div className="text-center mb-10">
           <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-red-900 shadow-[0_0_25px_rgba(255,0,0,0.4)] animate-pulse">
              <FontAwesomeIcon icon={faEye} className="text-5xl text-red-600" />
           </div>
           <h1 className="text-2xl font-bold text-slate-200 uppercase tracking-[0.2em]">¿Quién osa entrar?</h1>
           <p className="text-slate-600 text-[10px] uppercase mt-3 tracking-widest">Solo personal autorizado por la orden</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-red-900 uppercase mb-2 tracking-widest">Identificación</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black border border-slate-800 text-slate-300 p-4 rounded-xl focus:outline-none focus:border-red-600 focus:text-white transition-all text-center tracking-widest placeholder-slate-800" placeholder="USUARIO" required />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-red-900 uppercase mb-2 tracking-widest">Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black border border-slate-800 text-slate-300 p-4 rounded-xl focus:outline-none focus:border-red-600 focus:text-white transition-all text-center tracking-widest placeholder-slate-800" placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 text-white font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest border border-slate-700 hover:border-red-500 shadow-lg hover:shadow-red-900/20 mt-4 text-xs">
            {loading ? "Verificando ADN..." : "INTENTAR ACCESO"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;