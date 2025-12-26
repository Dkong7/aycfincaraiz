import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlayCircle, faPlane, faVrCardboard } from "@fortawesome/free-solid-svg-icons";

const CinemaService = () => {
  return (
    <div className="relative bg-slate-950 py-24 px-8 md:px-20 overflow-hidden">
      {/* Luces de estudio en el fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 relative z-10">
        
        {/* LADO VISUAL: ELEMENTOS TECH FLOTANTES */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="relative w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FontAwesomeIcon icon={faPlayCircle} className="text-white/20 text-9xl group-hover:text-yellow-400 group-hover:scale-110 transition-all duration-700" />
            </div>
            {/* Pequeños iconos flotantes en las esquinas */}
            <div className="absolute top-6 left-6 text-white/40 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div> REC 4K HDR
            </div>
          </div>
        </div>

        {/* LADO TEXTO: DISEÑO OSCURO / NEÓN */}
        <div className="lg:w-1/2 text-white">
          <span className="inline-block px-4 py-1 rounded-full border border-yellow-500/30 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-6">
            Next-Gen Marketing
          </span>
          <h3 className="text-4xl md:text-6xl font-black leading-none mb-8">
            Real Estate <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Cinema.</span>
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">
            No grabamos casas, producimos <strong>deseo</strong>. Elevamos el valor percibido de su inmueble usando narrativa cinematográfica y drones FPV.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 italic"><FontAwesomeIcon icon={faPlane} className="text-yellow-500"/> Drones</span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 italic"><FontAwesomeIcon icon={faVrCardboard} className="text-purple-500"/> VR 360</span>
            <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 italic"><FontAwesomeIcon icon={faCamera} className="text-blue-500"/> 4K HDR</span>
          </div>

          <Link to="/servicios/audiovisual" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-5 px-12 rounded-full uppercase tracking-widest text-xs shadow-xl transition-all hover:scale-105 active:scale-95 inline-block">
            Explorar Portafolio
          </Link>
        </div>
      </div>
    </div>
  );
};
export default CinemaService;