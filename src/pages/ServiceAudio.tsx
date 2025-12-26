import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlane, faVrCardboard, faPlayCircle, faCheckCircle, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const ServiceAudio = () => {
  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <section className="relative py-32 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-950 via-slate-900/50 to-transparent z-10"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <span className="text-green-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Visual Experience</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none">Cinema <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Inmobiliario</span></h1>
          <p className="text-xl text-slate-400 max-w-xl font-light mb-12">No vendemos inmuebles; producimos el deseo de habitarlos. Nuestra tecnología audiovisual reduce el tiempo de venta hasta en un 60%.</p>
          <a href="https://www.youtube.com/watch?v=xcsI00fi5_s" target="_blank" className="bg-green-600 hover:bg-green-500 text-white font-black px-12 py-5 rounded-full uppercase text-xs tracking-widest transition-transform hover:scale-105 inline-flex items-center gap-3">
            <FontAwesomeIcon icon={faPlayCircle} /> Ver Reel de Ejemplo
          </a>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="flex gap-8 group">
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl text-green-500 border border-white/10 group-hover:bg-green-500 group-hover:text-white transition-all"><FontAwesomeIcon icon={faPlane}/></div>
            <div><h3 className="text-2xl font-black mb-2">Drones FPV 4K</h3><p className="text-slate-400">Tomenos espectaculares y vuelos inmersivos que muestran el inmueble y su entorno desde una perspectiva ganadora.</p></div>
          </div>
          <div className="flex gap-8 group">
            <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-4xl text-blue-400 border border-white/10 group-hover:bg-blue-400 group-hover:text-white transition-all"><FontAwesomeIcon icon={faVrCardboard}/></div>
            <div><h3 className="text-2xl font-black mb-2">Recorridos VR 360°</h3><p className="text-slate-400">Visitas virtuales interactivas para que sus clientes caminen por el inmueble desde cualquier lugar del mundo.</p></div>
          </div>
        </div>

        <div className="relative group">
          <div className="rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl relative aspect-video">
             <iframe 
               className="w-full h-full"
               src="https://www.youtube.com/embed/xcsI00fi5_s" 
               title="Video Inmobiliario" 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               allowFullScreen
             ></iframe>
          </div>
          <div className="mt-8 flex justify-between items-center text-xs font-black uppercase tracking-widest text-slate-500">
            <span>Producción 4K HDR</span>
            <span className="text-green-500 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Standard de Calidad A&C</span>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServiceAudio;