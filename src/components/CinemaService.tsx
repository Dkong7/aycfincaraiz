import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faVrCardboard, faArrowRight, faFilm } from "@fortawesome/free-solid-svg-icons";

const CinemaService = () => {
  return (
    <section className="bg-slate-950 py-32 px-6 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-24 relative z-10">
        <div className="lg:w-1/2">
          <span className="text-green-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Inmobiliaria de Cine</span>
          <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.85] mb-10 tracking-tighter italic">
            El valor entra <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 underline">por los ojos.</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-md font-light">Elevamos el status de su activo ante inversores internacionales con calidad 4K cinematográfica.</p>
          <a href="https://wa.me/573134663832" target="_blank" className="inline-block bg-white text-slate-950 font-black px-14 py-6 rounded-full hover:bg-green-600 hover:text-white transition-all shadow-3xl uppercase text-xs tracking-widest">
            Solicitar Producción Cinema <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </a>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="aspect-video bg-slate-900 rounded-[4rem] overflow-hidden border-8 border-white/5 relative">
             <iframe className="w-full h-full" src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&mute=1" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CinemaService;