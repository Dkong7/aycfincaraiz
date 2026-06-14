import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { MapPin, Phone, Mail, Star, Quote, Instagram, Youtube, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext"; 

// --- ICONO PERSONALIZADO TIKTOK ---
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  const { t, lang } = useApp();
  const location = useLocation(); 
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- LÓGICA DE VISIBILIDAD ---
  if (
    location.pathname.startsWith("/dashboard") || 
    location.pathname === "/agentes" || 
    location.pathname === "/claclacla" || 
    location.pathname === "/alfalfalf"
  ) {
    return null;
  }

  const logoSrc = lang === "ES" ? "/ayclogo.svg" : "/ayclogoen.svg";

  const testimonials = [
      { text: "Excelente servicio y profesionalismo. Encontraron la casa perfecta para mi familia en tiempo récord.", author: "Carlos M.", role: "Comprador" },
      { text: "La asesoría legal fue impecable. Me sentí seguro en todo el proceso de venta de mi apartamento.", author: "Ana S.", role: "Vendedora" },
      { text: "Gracias a sus avalúos precisos pude negociar un precio justo. Altamente recomendados.", author: "Jorge L.", role: "Inversionista" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-24 pb-8 font-sans relative overflow-hidden border-t-4 border-green-500">
      {/* Decoración de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-green-500/5 blur-[120px]"></div>
         <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] rounded-full bg-blue-500/5 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* COLUMNA 1: INFO & BRANDING (Ocupa 4 columnas) */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="inline-block">
               <img 
                 src={logoSrc} 
                 alt="A&C Finca Raíz" 
                 className="h-20 w-auto object-contain drop-shadow-xl"
               />
            </Link>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                No vendemos propiedades, estructuramos negocios inmobiliarios. Inteligencia financiera, peritaje técnico y exclusividad en la Sabana de Bogotá.
            </p>
            
            <div className="flex gap-3">
                <a href="https://www.instagram.com/aycfincaraiz_/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800 border border-slate-700 rounded-full hover:bg-gradient-to-tr hover:from-orange-500 hover:to-purple-600 hover:border-transparent text-slate-300 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                   <Instagram size={18} />
                </a>
                <a href="https://www.tiktok.com/@aycfincaraiz" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800 border border-slate-700 rounded-full hover:bg-black hover:border-slate-600 text-slate-300 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                   <TikTokIcon size={16} />
                </a>
                <a href="https://www.youtube.com/@AyCFincaRaiz" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 bg-slate-800 border border-slate-700 rounded-full hover:bg-red-600 hover:border-red-600 text-slate-300 hover:text-white transition-all shadow-lg hover:-translate-y-1">
                   <Youtube size={18} />
                </a>
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN RÁPIDA (Ocupa 2 columnas) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-sm border-b border-slate-700 pb-3">
                Compañía
            </h3>
            <ul className="space-y-3 text-sm">
                <li><Link to="/propiedades" className="group flex items-center text-slate-400 hover:text-green-400 transition-colors"><ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-500 mr-1"/> Inmuebles</Link></li>
                <li><Link to="/servicios/avaluos" className="group flex items-center text-slate-400 hover:text-green-400 transition-colors"><ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-500 mr-1"/> Avalúos Técnicos</Link></li>
                <li><Link to="/nosotros" className="group flex items-center text-slate-400 hover:text-green-400 transition-colors"><ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-500 mr-1"/> Nosotros</Link></li>
                <li><Link to="/blog" className="group flex items-center text-slate-400 hover:text-green-400 transition-colors"><ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-green-500 mr-1"/> Blog Inmobiliario</Link></li>
            </ul>
          </div>

          {/* COLUMNA 3: CONTACTO (Ocupa 3 columnas) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-white font-black uppercase tracking-widest text-sm border-b border-slate-700 pb-3">
                Contacto Directo
            </h3>
            <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-colors">
                       <MapPin className="text-green-500" size={16} />
                    </div>
                    <span className="text-slate-400 mt-1.5 leading-tight">Bogotá, D.C.<br/>Colombia</span>
                </li>
                <li className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-colors">
                       <Phone className="text-green-500" size={16} />
                    </div>
                    <a href="https://wa.me/573224822840" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors font-mono tracking-wide">+57 322 482 2840</a>
                </li>
                <li className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-colors">
                       <Mail className="text-green-500" size={16} />
                    </div>
                    <a href="mailto:fincaraizayc@gmail.com" className="text-slate-400 hover:text-white transition-colors">fincaraizayc@gmail.com</a>
                </li>
            </ul>
          </div>

          {/* COLUMNA 4: TESTIMONIOS (Ocupa 3 columnas) */}
          <div className="lg:col-span-3 space-y-6">
              <h3 className="text-white font-black uppercase tracking-widest text-sm border-b border-slate-700 pb-3">
                  Experiencia A&C
              </h3>
              <div className="relative h-48 w-full">
                  {testimonials.map((testim, index) => (
                     <div 
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                            index === currentTestimonial ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                        }`}
                     >
                        <div className="bg-slate-800/40 backdrop-blur-md p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden group hover:border-green-500/30 transition-colors">
                            <Quote className="absolute -top-2 -right-2 text-slate-700/30 rotate-12" size={80} />
                            <div className="flex gap-1 text-amber-400 mb-4 relative z-10">
                                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-300 text-sm italic mb-5 relative z-10 leading-relaxed">"{testim.text}"</p>
                            <div className="relative z-10">
                                <p className="text-white font-bold text-xs uppercase tracking-wide">{testim.author}</p>
                                <p className="text-green-500 text-[10px] uppercase tracking-widest mt-0.5">{testim.role}</p>
                            </div>
                        </div>
                     </div>
                  ))}
              </div>
              {/* Controles del Carrusel */}
              <div className="flex gap-2 justify-start pt-2">
                  {testimonials.map((_, i) => (
                     <button 
                        key={i} 
                        onClick={() => setCurrentTestimonial(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentTestimonial ? "w-8 bg-green-500" : "w-2 bg-slate-700 hover:bg-slate-500"}`}
                        aria-label={`Ver testimonio ${i + 1}`}
                     />
                  ))}
              </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p className="tracking-wide">
               &copy; {new Date().getFullYear()} <strong className="text-slate-300">A&C Finca Raíz</strong>. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-1 uppercase tracking-widest text-[10px]">
               Desarrollado por <a href="https://www.thisiswillowtree.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-400 font-bold transition-colors ml-1">Willow Tree Media</a>
            </p>
        </div>
      </div>
    </footer>
  );
}