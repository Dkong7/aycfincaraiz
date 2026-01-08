import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // <--- Import useLocation
import { MapPin, Phone, Mail, Star, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();
  const location = useLocation(); // <--- Hook
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- LÓGICA PARA OCULTAR EN CPANEL/LOGIN ---
  if (
    location.pathname.startsWith("/dashboard") || 
    location.pathname === "/agentes" || 
    location.pathname === "/claclacla" || 
    location.pathname === "/alfalfalf"
  ) {
    return null;
  }

  // Logo: Muestra el logo correspondiente al idioma ACTUAL
  const logoSrc = language === "ES" ? "/ayclogo.svg" : "/ayclogoen.svg";

  // Rotación automática de testimonios (7 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % t.footer.testimonialsList.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [t.footer.testimonialsList.length]);

  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-20 pb-8 font-sans border-t border-slate-800">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* COLUMNA 1: INFO & LOGO */}
          <div className="space-y-6">
            <Link to="/" className="block">
               {/* Se eliminan filtros para que se vea el color original */}
               <img 
                 src={logoSrc} 
                 alt="AYC Logo" 
                 className="h-20 w-auto object-contain"
               />
            </Link>
            <h3 className="text-white font-black uppercase tracking-wider text-sm border-b border-green-600 pb-2 inline-block">
                {t.footer.aboutTitle}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                {t.footer.aboutText}
            </p>
            <div className="flex gap-4 pt-4">
                {/* Redes Sociales (Iconos Genéricos) */}
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-green-600 text-white transition-colors"><span className="sr-only">Facebook</span>FB</a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-green-600 text-white transition-colors"><span className="sr-only">Instagram</span>IG</a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-green-600 text-white transition-colors"><span className="sr-only">LinkedIn</span>LI</a>
            </div>
          </div>

          {/* COLUMNA 2: CONTACTO */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-wider text-sm border-b border-green-600 pb-2 inline-block">
                {t.footer.contactTitle}
            </h3>
            <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                    <MapPin className="text-green-500 shrink-0 mt-1" size={18} />
                    <span>{t.footer.location}</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="text-green-500 shrink-0" size={18} />
                    <a href={`tel:${t.footer.phone}`} className="hover:text-white transition-colors">{t.footer.phone}</a>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="text-green-500 shrink-0" size={18} />
                    <a href={`mailto:${t.footer.email}`} className="hover:text-white transition-colors">{t.footer.email}</a>
                </li>
            </ul>
          </div>

          {/* COLUMNA 3: TESTIMONIOS ROTATIVOS */}
          <div className="space-y-6">
             <h3 className="text-white font-black uppercase tracking-wider text-sm border-b border-green-600 pb-2 inline-block">
                {t.footer.testimonialsTitle}
             </h3>
             <div className="relative h-48">
                {t.footer.testimonialsList.map((testim: any, index: number) => (
                    <div 
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                            index === currentTestimonial ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
                        }`}
                    >
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 relative">
                            <Quote className="absolute top-4 right-4 text-green-600/20" size={40} />
                            <div className="flex gap-1 text-yellow-500 mb-3">
                                {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="currentColor" />)}
                            </div>
                            <p className="text-slate-300 text-sm italic mb-4">"{testim.text}"</p>
                            <div>
                                <p className="text-green-500 font-bold text-xs uppercase">{testim.author}</p>
                                <p className="text-slate-500 text-[10px] uppercase tracking-widest">{testim.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
             {/* Indicadores de testimonio */}
             <div className="flex gap-2 justify-center lg:justify-start pt-2">
                {t.footer.testimonialsList.map((_: any, i: number) => (
                    <button 
                        key={i} 
                        onClick={() => setCurrentTestimonial(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === currentTestimonial ? "w-6 bg-green-500" : "w-1.5 bg-slate-700 hover:bg-slate-600"}`}
                        aria-label={`Ver testimonio ${i + 1}`}
                    />
                ))}
             </div>
          </div>

        </div>

        {/* BOTTOM BAR - COPYRIGHT */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
                &copy; 2026 <strong className="text-slate-300">A&C Finca Raíz</strong>. {t.footer.rights}
            </p>
            <p className="flex items-center gap-1">
                {t.footer.developedBy} <a href="https://www.thisiswillowtree.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-400 font-bold transition-colors">Willow Tree Media</a>
            </p>
        </div>
      </div>
    </footer>
  );
}