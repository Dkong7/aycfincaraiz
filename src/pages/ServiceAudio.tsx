import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPlane, faVrCardboard, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ServiceAudio = () => {
  // ID del video: xcsI00fi5_s. Parámetros para loop: playlist={ID}&loop=1
  const videoId = "xcsI00fi5_s";
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`;

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-600/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
          <span className="text-green-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Inmersión Total</span>
          <h1 className="text-5xl md:text-8xl font-black mb-10 leading-[0.85] tracking-tighter italic">Cinema <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">A&C Inmobiliario</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light mb-12">Producción audiovisual de alto rendimiento. No solo grabamos espacios, capturamos el deseo de compra.</p>
        </div>
      </section>

      <section className="py-12 max-w-7xl mx-auto px-6">
        <div className="rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-[0_0_80px_rgba(34,197,94,0.1)] relative aspect-video">
           <iframe className="w-full h-full pointer-events-none" src={videoSrc} title="A&C Cinema" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
            <FontAwesomeIcon icon={faPlane} className="text-green-500 text-4xl mb-6" />
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Drones FPV 4K</h3>
            <p className="text-slate-400 font-light leading-relaxed">Perspectivas dinámicas que definen la ubicación y el valor estratégico del activo.</p>
          </div>
          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
            <FontAwesomeIcon icon={faVrCardboard} className="text-blue-400 text-4xl mb-6" />
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Recorrido 360°</h3>
            <p className="text-slate-400 font-light leading-relaxed">Presencia digital absoluta. Permita que sus clientes recorran cada rincón sin desplazarse.</p>
          </div>
          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/10 transition-all">
            <FontAwesomeIcon icon={faCamera} className="text-yellow-500 text-4xl mb-6" />
            <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter italic">Fotografía Zenital</h3>
            <p className="text-slate-400 font-light leading-relaxed">Composición técnica que resalta la arquitectura y los acabados de lujo.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 px-6 text-center text-slate-950">
        <h2 className="text-4xl md:text-6xl font-black mb-12 italic tracking-tighter">¿Desea una producción <span className="text-green-600 underline">élite?</span></h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="https://wa.me/573134663832" target="_blank" className="bg-green-600 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-950 transition-all flex items-center justify-center gap-4 shadow-xl">
             <FontAwesomeIcon icon={faWhatsapp} size="lg"/> WhatsApp Directo
          </a>
          <a href="/contacto" className="bg-slate-950 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-green-600 transition-all flex items-center justify-center gap-4 shadow-xl">
             Solicitar Scouting <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </section>
    </div>
  );
};
export default ServiceAudio;