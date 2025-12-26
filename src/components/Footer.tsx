import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faQuoteLeft, faChevronLeft, faChevronRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { useApp } from "../context/AppContext";

const Footer = () => {
  const { t } = useApp();
  const year = 2026;
  const PHONE = "+57 313 466 3832";
  const ADDRESS = "Calle 20 Sur # 69B - 80";

  const testimonials = [
    { id: 1, quote: "Gracias al avalÃºo certificado de A&C logramos cerrar la venta...", name: "Carlos M.", role: "LogÃ­stica S.A.S", img: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 2, quote: "La asesorÃ­a jurÃ­dica nos salvÃ³ de un negocio con problemas...", name: "Dra. Elena R.", role: "Inversionista", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 3, quote: "El video con dron vendiÃ³ mi casa campestre en ChÃ­a...", name: "Familia Torres", role: "Venta Residencial", img: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 4, quote: "Excelente alianza para la comercializaciÃ³n de nuestro proyecto VIS...", name: "Ing. Roberto P.", role: "Constructora Arcos", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 5, quote: "Buscaba oficinas corporativas con especificaciones muy altas...", name: "Sofia L.", role: "Tech Solutions", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 6, quote: "La gestiÃ³n de saneamiento predial fue rÃ¡pida y transparente...", name: "Don Jorge V.", role: "Propietario", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 7, quote: "Su anÃ¡lisis de mercado nos permitiÃ³ ajustar los cÃ¡nones...", name: "Marta G.", role: "Admin. Propiedad Horizontal", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 8, quote: "AtenciÃ³n personalizada y muy humana...", name: "AndrÃ©s y Paula", role: "Primer Hogar", img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 9, quote: "Como inversionista extranjero, necesitaba confianza local...", name: "David C.", role: "InversiÃ³n LatAm", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" },
    { id: 10, quote: "Profesionalismo puro. Los reportes de avalÃºo bajo norma NIIF...", name: "Clara B.", role: "Directora Financiera", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=100&h=100" }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const activeTestimonial = testimonials[currentIdx];

  return (
    <footer className="bg-slate-800 text-white pt-16 pb-8 border-t-8 border-green-600 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
           <div className="mb-6 inline-block"><img src="/ayclogo.svg" alt="A&C" className="h-24 w-auto object-contain" /></div>
           <p className="text-slate-300 text-sm leading-relaxed mb-6 border-l-2 border-green-600 pl-4">{t("footer_desc")}</p>
           <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded bg-slate-700 flex items-center justify-center hover:bg-green-600 hover:text-slate-900 transition"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#" className="w-9 h-9 rounded bg-slate-700 flex items-center justify-center hover:bg-green-600 hover:text-slate-900 transition"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#" className="w-9 h-9 rounded bg-slate-700 flex items-center justify-center hover:bg-green-600 hover:text-slate-900 transition"><FontAwesomeIcon icon={faLinkedinIn} /></a>
           </div>
        </div>
        <div>
           <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">{t("footer_links")}</h3>
           <ul className="space-y-3 text-slate-300 text-sm">
              <li><Link to="/inmuebles" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Inmuebles</Link></li>
              <li><Link to="/servicios/avaluos" className="hover:text-white hover:translate-x-1 transition-transform inline-block">AvalÃºos</Link></li>
              <li><Link to="/nosotros" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Nosotros</Link></li>
              <li><Link to="/contacto" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Contacto</Link></li>
           </ul>
        </div>
        <div>
           <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">{t("footer_contact")}</h3>
           <ul className="space-y-4 text-slate-300 text-sm">
              <li className="flex gap-3"><FontAwesomeIcon icon={faMapMarkerAlt} className="mt-1 text-green-600" /><span>{ADDRESS}<br/>BogotÃ¡ D.C</span></li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={faWhatsapp} className="text-green-600" /><span>{PHONE}</span></li>
              <li className="flex items-center gap-3"><FontAwesomeIcon icon={faEnvelope} className="text-green-600" /><span>info@aycfincaraiz.com</span></li>
           </ul>
        </div>
        <div>
           <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Casos de Ã‰xito</h3>
           <div className="bg-slate-700/50 p-5 rounded-xl border border-slate-600 relative min-h-[150px] flex flex-col justify-between transition-all duration-500 group">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-green-600 text-xl absolute -top-3 left-4 bg-slate-800 px-2" />
              <div key={activeTestimonial.id} className="animate-fade-in relative z-10 px-2">
                  <p className="text-slate-300 text-xs italic leading-relaxed mb-4 pt-2">"{activeTestimonial.quote}"</p>
                  <div className="flex items-center gap-3 border-t border-slate-600 pt-3">
                     <img src={activeTestimonial.img} className="w-10 h-10 rounded-full border-2 border-green-600 object-cover" alt="Cliente" />
                     <div><p className="font-bold text-white text-xs">{activeTestimonial.name}</p><p className="text-[10px] text-green-600 uppercase font-bold">{activeTestimonial.role}</p></div>
                  </div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                 <button onClick={prevTestimonial} className="pointer-events-auto w-7 h-7 bg-slate-800/80 hover:bg-green-600 text-white hover:text-slate-900 rounded-full flex items-center justify-center transition text-xs backdrop-blur-sm border border-slate-600 shadow-lg"><FontAwesomeIcon icon={faChevronLeft} /></button>
                 <button onClick={nextTestimonial} className="pointer-events-auto w-7 h-7 bg-slate-800/80 hover:bg-green-600 text-white hover:text-slate-900 rounded-full flex items-center justify-center transition text-xs backdrop-blur-sm border border-slate-600 shadow-lg"><FontAwesomeIcon icon={faChevronRight} /></button>
              </div>
              <div className="flex justify-center gap-1 mt-3 z-10 relative">
                 {testimonials.map((_, idx) => (<div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentIdx ? "w-3 bg-green-600" : "w-1 bg-slate-600"}`}></div>))}
              </div>
           </div>
        </div>
      </div>
      <div className="border-t border-slate-700 pt-8 mt-8">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-6 text-xs text-slate-500 text-center">
             <p>Â© {year} A&C Finca RaÃ­z. Todos los derechos reservados.</p>
             <span className="hidden md:block text-slate-700">|</span>
             <p>Desarrollado por <a href="https://www.thisiswillowtree.com" target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold hover:text-white transition">WillowTreeMedia</a></p>
         </div>
      </div>
    </footer>
  );
};
export default Footer;