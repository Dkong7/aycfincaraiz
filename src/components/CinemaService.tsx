import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlayCircle, faPlane, faVrCardboard, faVideo, faMagic } from "@fortawesome/free-solid-svg-icons";

const CinemaService = () => {
  return (
    <section className="relative bg-slate-950 py-32 px-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20 relative z-10">
        <div className="lg:w-1/2">
          <span className="text-green-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6 block border-l-4 border-green-500 pl-4">Producción de Alto Nivel</span>
          <h3 className="text-4xl md:text-7xl font-black text-white leading-[0.9] mb-10">
            Cinema <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Real Estate</span>
          </h3>
          <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed">
            No grabamos casas, producimos <strong>emociones</strong>. Elevamos el valor de su activo con narrativa cinematográfica y tecnología de punta.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
             <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-green-500 border border-white/10"><FontAwesomeIcon icon={faPlane}/></div>
                <div><h5 className="text-white font-bold">Drones FPV</h5><p className="text-xs text-slate-500">Vuelos inmersivos 4K.</p></div>
             </div>
             <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 border border-white/10"><FontAwesomeIcon icon={faVrCardboard}/></div>
                <div><h5 className="text-white font-bold">Tour 360°</h5><p className="text-xs text-slate-500">Realidad virtual.</p></div>
             </div>
          </div>

          <Link to="/servicios/audiovisual" className="inline-block bg-gradient-to-r from-green-500 to-blue-600 text-white font-black py-5 px-14 rounded-full uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-[0_0_40px_rgba(34,197,94,0.3)]">
            Ver Portafolio Cinema
          </Link>
        </div>

        <div className="lg:w-1/2 relative group">
           <div className="relative aspect-square md:aspect-video bg-slate-900 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4" className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <FontAwesomeIcon icon={faPlayCircle} className="text-white text-8xl opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
export default CinemaService;