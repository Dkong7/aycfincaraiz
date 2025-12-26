import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faVrCardboard, faArrowRight, faFilm } from "@fortawesome/free-solid-svg-icons";

const CinemaService = () => {
  return (
    <section className="bg-slate-950 py-32 px-6 relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px]"></div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-24 relative z-10">
        <div className="lg:w-1/2">
          <span className="text-green-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Real Estate Cinema</span>
          <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.85] mb-10 tracking-tighter italic">
            El valor entra <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 underline font-serif">por los ojos.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-md font-light leading-relaxed">
            Elevamos el estatus de su activo con narrativa cinematográfica y tecnología 4K. Venda más rápido impactando visualmente.
          </p>
          <div className="grid grid-cols-2 gap-10 mb-14 font-sans text-white">
            <div className="flex items-center gap-4 group cursor-default">
               <FontAwesomeIcon icon={faPlane} className="text-green-500 text-3xl group-hover:scale-110 transition-all" />
               <span className="font-black uppercase text-[10px] tracking-widest border-b border-green-900 pb-2">Drones 4K FPV</span>
            </div>
            <div className="flex items-center gap-4 group cursor-default">
               <FontAwesomeIcon icon={faVrCardboard} className="text-blue-400 text-3xl group-hover:scale-110 transition-all" />
               <span className="font-black uppercase text-[10px] tracking-widest border-b border-blue-900 pb-2">VR 360 Tours</span>
            </div>
          </div>
          <a href="https://wa.me/573134663832" target="_blank" className="inline-block bg-white text-slate-950 font-black px-14 py-6 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-3xl uppercase text-xs tracking-widest">
            Solicitar Producción <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
        <div className="lg:w-1/2 relative group">
          <div className="aspect-video bg-slate-900 rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-[0_0_80px_rgba(34,197,94,0.1)] relative">
             <iframe className="w-full h-full" src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&mute=1" allowFullScreen></iframe>
          </div>
          <div className="absolute -top-6 -left-6 bg-green-600 text-white p-6 rounded-3xl shadow-xl rotate-12 group-hover:rotate-0 transition-all duration-700">
             <FontAwesomeIcon icon={faFilm} size="2x"/>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CinemaService;