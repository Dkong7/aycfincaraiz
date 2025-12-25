import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faSmile } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Credenciales incorrectas... ¿Seguro que perteneces aquí?");
      setLoading(false);
    } else if (data.session) {
      setSuccess(true); // Activa modal carita feliz
      // Retraso para ver la animación
      setTimeout(() => {
         navigate("/admin");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 font-mono relative overflow-hidden">
      
      {/* Fondo Tenebroso Sutil */}
      <div className="absolute inset-0 bg-[url(''https://www.transparenttextures.com/patterns/black-felt.png'')] opacity-50"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black pointer-events-none"></div>

      {/* MODAL CARITA FELIZ (Overlay) */}
      {success && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in">
            <div className="text-center">
               <FontAwesomeIcon icon={faSmile} className="text-9xl text-yellow-400 animate-bounce mb-4" />
               <h2 className="text-3xl text-white font-bold uppercase tracking-widest">Bienvenido Maestro</h2>
               <p className="text-slate-400 text-sm mt-2">Accediendo al núcleo...</p>
            </div>
         </div>
      )}

      {/* CARD LOGIN */}
      <div className="relative z-10 bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4">
        <div className="text-center mb-8">
           <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-900 shadow-[0_0_15px_rgba(255,0,0,0.3)] animate-pulse">
              <FontAwesomeIcon icon={faEye} className="text-4xl text-red-600" />
           </div>
           <h1 className="text-2xl font-bold text-slate-200 uppercase tracking-widest">¿Quién osa entrar?</h1>
           <p className="text-slate-500 text-xs mt-2">Identifícate o enfrenta el vacío.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-300 p-3 rounded-lg focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 transition"
              placeholder="usuario@ayc.com"
              required
            />
          </div>
          <div>
            {/* UTF-8 ARREGLADO: Contraseña */}
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-slate-300 p-3 rounded-lg focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 transition"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
             <div className="p-3 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-xs text-center">
                {error}
             </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-red-900 text-white font-bold py-3 rounded-lg transition-all duration-300 uppercase tracking-widest border border-slate-700 hover:border-red-500 shadow-lg"
          >
            {loading ? "Verificando..." : "Acceder al Núcleo"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;