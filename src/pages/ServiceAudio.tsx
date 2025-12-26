import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlane, faVrCardboard, faPlayCircle, faArrowRight, faFilm, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ServiceAudio = () => {
  return (
    <div className="bg-slate-950 text-white min-h-screen">
      {/* HERO CINEMA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <span className="text-green-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Experience Real Estate</span>
          <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter italic">Cinema <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">A&C Inmobiliario</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light mb-12">Transformamos propiedades en experiencias visuales de alto impacto. La primera impresión es la que cierra el trato.</p>
        </div>
      </section>

      {/* VIDEO PRINCIPAL */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-[0_0_80px_rgba(34,197,94,0.1)] relative aspect-video">
           <iframe className="w-full h-full" src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=1&mute=1&controls=1" allowFullScreen></iframe>
        </div>
      </section>

      {/* INFOGRAFÍA DE SERVICIOS */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: faPlane, color: "text-green-500", title: "Drones FPV 4K", desc: "Vuelos inmersivos para mostrar el entorno y la escala real del activo." },
            { icon: faVrCardboard, color: "text-blue-400", title: "Tour Virtual 360", desc: "Camine por la propiedad desde cualquier lugar del mundo." },
            { icon: faCamera, color: "text-yellow-500", title: "Fotografía de Autor", desc: "Composición arquitectónica profesional para resaltar acabados." }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
              <FontAwesomeIcon icon={item.icon} className={`${item.color} text-4xl mb-6`} />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">{item.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-white py-24 px-6 text-center text-slate-950">
        <h2 className="text-4xl md:text-6xl font-black mb-12 italic tracking-tighter">¿Listo para que su inmueble <span className="text-green-600 underline">brille?</span></h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="https://wa.me/573134663832" target="_blank" className="bg-green-600 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-950 transition-all flex items-center justify-center gap-4 shadow-xl">
             <FontAwesomeIcon icon={faWhatsapp} size="lg"/> Cotizar Producción
          </a>
          <a href="/contacto" className="bg-slate-950 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-green-600 transition-all flex items-center justify-center gap-4 shadow-xl">
             Formulario de Contacto <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </section>
    </div>
  );
};
export default ServiceAudio;