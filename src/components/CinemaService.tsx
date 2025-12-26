import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlayCircle, faPlane, faVrCardboard, faVideo, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CinemaService = () => {
  return (
    <section className="relative bg-slate-950 py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20 relative z-10">
        <div className="lg:w-1/2">
          <span className="text-green-500 font-black uppercase tracking-[0.4em] text-[10px] mb-8 block">Marketing Cinemático</span>
          <h3 className="text-5xl md:text-8xl font-black text-white leading-[0.85] mb-10 tracking-tighter">
            Cinema <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Real Estate</span>
          </h3>
          <p className="text-slate-400 text-lg mb-12 max-w-md leading-relaxed font-light">
            Elevamos el valor percibido de sus activos inmobiliarios. Producimos piezas audiovisuales de alto impacto que conectan emocionalmente con el inversor.
          </p>
          <div className="grid grid-cols-2 gap-10 mb-12">
             <div className="flex gap-4 items-start">
                <FontAwesomeIcon icon={faPlane} className="text-green-500 text-2xl" />
                <div><h5 className="text-white font-bold uppercase text-xs tracking-widest">Drones 4K</h5><p className="text-xs text-slate-500 mt-1">Tomas inmersivas FPV.</p></div>
             </div>
             <div className="flex gap-4 items-start">
                <FontAwesomeIcon icon={faVrCardboard} className="text-blue-400 text-2xl" />
                <div><h5 className="text-white font-bold uppercase text-xs tracking-widest">Tour 360°</h5><p className="text-xs text-slate-500 mt-1">Recorridos interactivos.</p></div>
             </div>
          </div>
          <Link to="/servicios/audiovisual" className="inline-flex items-center gap-4 bg-green-600 text-white font-black py-5 px-12 rounded-full uppercase tracking-widest text-[10px] hover:bg-white hover:text-slate-950 transition-all shadow-3xl">
            Ver Portafolio Cinema <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="lg:w-1/2 relative">
           <div className="rounded-[4rem] overflow-hidden border-8 border-white/5 shadow-2xl relative aspect-video">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&mute=1" 
                title="A&C Cinema Example" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
           </div>
        </div>
      </div>
    </section>
  );
};
export default CinemaService;