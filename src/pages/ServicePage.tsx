import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartLine, faGavel, faVideo, faCheckCircle, faFileContract, 
  faBalanceScale, faHelicopter, faCamera, faArrowRight, faAward, faUsers, faGlobeAmericas, faEnvelope 
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useApp } from "../context/AppContext";

const ServicePage = () => {
  const { type } = useParams();
  const { t } = useApp();

  // CTA COMPONENT
  const ServiceCTA = () => (
    <div className="mt-16 bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center">
       <h3 className="text-2xl font-bold text-slate-800 mb-2">¿Listo para empezar?</h3>
       <p className="text-gray-500 mb-8 max-w-xl mx-auto">Hablemos hoy mismo sobre cómo podemos ayudarte con tu requerimiento.</p>
       <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="https://wa.me/573134663832" target="_blank" className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-3 rounded-full hover:bg-green-600 transition shadow-lg">
             <FontAwesomeIcon icon={faWhatsapp} className="text-xl" /> Chat WhatsApp
          </a>
          <Link to="/contacto" className="inline-flex items-center justify-center gap-2 bg-slate-800 text-white font-bold px-8 py-3 rounded-full hover:bg-slate-700 transition shadow-lg">
             <FontAwesomeIcon icon={faEnvelope} /> Contactar Ahora
          </Link>
       </div>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case "avaluos":
        return (
          <>
            <div className="relative h-96 bg-slate-900 text-white overflow-hidden">
               <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30" />
               <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 text-4xl mb-6 shadow-xl animate-fade-in-up"><FontAwesomeIcon icon={faChartLine} /></div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("serv_aval_title")}</h1>
                  <p className="text-xl text-slate-300 max-w-2xl">Precisión, normativa y certificación para proteger tu patrimonio.</p>
               </div>
            </div>
            <div className="py-20 bg-white">
               <div className="max-w-6xl mx-auto px-6">
                  <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                     <div className="md:w-1/3 flex justify-center">
                        <div className="p-8 border-4 border-[#4CAF50] rounded-3xl shadow-2xl bg-white transform rotate-3 hover:rotate-0 transition duration-500 w-full max-w-xs flex justify-center items-center">
                           <img src="/RNA-logo.svg" alt="RNA Logo" className="w-full h-auto object-contain" style={{ filter: "brightness(0) saturate(100%) invert(62%) sepia(18%) saturate(1074%) hue-rotate(74deg) brightness(97%) contrast(92%)" }} />
                        </div>
                     </div>
                     <div className="md:w-2/3">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><span className="w-2 h-8 bg-[#4CAF50] rounded-full"></span>El Registro Nacional de Avaluadores (R.N.A.)</h2>
                        <p className="text-gray-600 leading-relaxed mb-6 text-justify">En A&C Finca Raíz operamos bajo la estricta supervisión y certificación del <strong>RNA</strong>, un instrumento emanado del sector privado a través de <strong>FEDELONJAS</strong>.</p>
                        <div className="flex gap-4">
                            <span className="px-4 py-2 bg-[#4CAF50]/10 text-[#4CAF50] font-bold rounded-lg text-sm border border-[#4CAF50]/30">RAA Certificado</span>
                            <span className="px-4 py-2 bg-[#4CAF50]/10 text-[#4CAF50] font-bold rounded-lg text-sm border border-[#4CAF50]/30">Normativa NIIF</span>
                        </div>
                     </div>
                  </div>
                  <h3 className="text-center text-2xl font-bold text-slate-800 mb-10">Beneficios para nuestros clientes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {[{ icon: faAward, title: "Confianza y Seguridad", desc: "Certeza técnica en cada informe entregado." }, { icon: faGlobeAmericas, title: "Estándares Globales", desc: "Cumplimiento de normativas internacionales." }, { icon: faUsers, title: "Competencia Técnica", desc: "Valuadores en constante actualización." }, { icon: faCheckCircle, title: "Estabilidad", desc: "Reducción de riesgos en transacciones." }, { icon: faBalanceScale, title: "Transparencia", desc: "Procesos claros y éticos." }, { icon: faFileContract, title: "Respaldo", desc: "Documentos válidos para entidades bancarias." }].map((item, i) => (
                        <div key={i} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition hover:border-[#4CAF50] group">
                           <FontAwesomeIcon icon={item.icon} className="text-3xl text-slate-400 group-hover:text-[#4CAF50] mb-4 transition-colors" />
                           <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                           <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                     ))}
                  </div>
                  <ServiceCTA />
               </div>
            </div>
          </>
        );
      case "legal":
        return (
          <>
             <div className="relative h-96 bg-slate-900 text-white overflow-hidden">
               <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-30" />
               <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center text-white text-4xl mb-6 shadow-xl border-2 border-yellow-500"><FontAwesomeIcon icon={faGavel} /></div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("serv_legal_title")}</h1>
                  <p className="text-xl text-slate-300 max-w-2xl">Seguridad jurídica para blindar tus negocios inmobiliarios.</p>
               </div>
            </div>
            <div className="py-20 px-6 max-w-5xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                  <div>
                     <h2 className="text-3xl font-bold text-slate-800 mb-6 border-l-4 border-yellow-500 pl-4">No dejes tu patrimonio al azar</h2>
                     <p className="text-gray-600 mb-6 leading-relaxed text-justify">En el mundo inmobiliario, un error en los papeles puede costar millones. Nuestro departamento jurídico se especializa en el <strong>saneamiento y protección de la propiedad raíz</strong>.</p>
                     <ul className="space-y-4">
                        <li className="flex items-start gap-3"><FontAwesomeIcon icon={faCheckCircle} className="text-yellow-500 mt-1"/> <span>Estudio de Títulos (20 y 50 años).</span></li>
                        <li className="flex items-start gap-3"><FontAwesomeIcon icon={faCheckCircle} className="text-yellow-500 mt-1"/> <span>Sucesiones y procesos divisorios.</span></li>
                        <li className="flex items-start gap-3"><FontAwesomeIcon icon={faCheckCircle} className="text-yellow-500 mt-1"/> <span>Reglamentos de Propiedad Horizontal.</span></li>
                     </ul>
                  </div>
                  <div className="relative">
                     <div className="absolute inset-0 bg-yellow-500 rounded-2xl transform translate-x-4 translate-y-4"></div>
                     <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80" className="relative rounded-2xl shadow-2xl z-10 w-full" />
                  </div>
               </div>
               <ServiceCTA />
            </div>
          </>
        );
      case "audiovisual":
        return (
          <>
             <div className="relative h-96 bg-black text-white overflow-hidden">
               <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover opacity-50"><source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4" type="video/mp4" /></video>
               <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white text-4xl mb-6 shadow-xl animate-pulse"><FontAwesomeIcon icon={faVideo} /></div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("serv_audio_title")}</h1>
                  <p className="text-xl text-gray-200 max-w-2xl">La diferencia entre mostrar una casa y enamorar al cliente.</p>
               </div>
            </div>
            <div className="py-20 px-6 max-w-7xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-600"><FontAwesomeIcon icon={faHelicopter} className="text-5xl text-slate-800 mb-6" /><h3 className="text-xl font-bold mb-4">Drones 4K</h3><p className="text-gray-600 text-sm">Perspectivas aéreas que revelan el entorno.</p></div>
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-600"><FontAwesomeIcon icon={faCamera} className="text-5xl text-slate-800 mb-6" /><h3 className="text-xl font-bold mb-4">Fotografía HDR</h3><p className="text-gray-600 text-sm">Iluminación perfecta y corrección de color.</p></div>
                  <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-red-600"><FontAwesomeIcon icon={faVideo} className="text-5xl text-slate-800 mb-6" /><h3 className="text-xl font-bold mb-4">House Tour</h3><p className="text-gray-600 text-sm">Videos con narrativa estilo Lifestyle.</p></div>
               </div>
               <div className="flex flex-col md:flex-row items-center gap-12 bg-black rounded-3xl overflow-hidden shadow-2xl">
                  <div className="md:w-1/2 p-12">
                     <h2 className="text-3xl font-bold text-white mb-6">Acelera tu venta X3</h2>
                     <p className="text-gray-400 mb-8 leading-relaxed">En la era digital, el contenido es el rey. Los inmuebles con producción audiovisual profesional reciben un <strong>400% más de consultas</strong>.</p>
                     <ServiceCTA />
                  </div>
                  <div className="md:w-1/2 h-80 md:h-auto relative"><img src="https://images.unsplash.com/photo-1579308107931-29177651a80e?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-80" /></div>
               </div>
            </div>
          </>
        );
      default: return <div className="py-20 text-center">Servicio no encontrado</div>;
    }
  };

  return <div className="bg-white min-h-screen pb-12">{renderContent()}</div>;
};
export default ServicePage;