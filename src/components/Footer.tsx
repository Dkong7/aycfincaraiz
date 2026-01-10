import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { MapPin, Phone, Mail, Star, Quote } from "lucide-react";
import { useApp } from "../context/AppContext"; // 1. CAMBIO: CONTEXTO NUEVO

export default function Footer() {
  // 2. CAMBIO: Usamos useApp
  const { t, lang } = useApp();
  const location = useLocation(); 
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // --- LÓGICA PARA OCULTAR EN DASHBOARD/LOGIN ---
  if (
    location.pathname.startsWith("/dashboard") || 
    location.pathname === "/agentes" || 
    location.pathname === "/claclacla" || 
    location.pathname === "/alfalfalf"
  ) {
    return null;
  }

  // Logo: Muestra el logo correspondiente al idioma ACTUAL
  const logoSrc = lang === "ES" ? "/ayclogo.svg" : "/ayclogoen.svg";

  // DATOS FIJOS (Para evitar errores de 'undefined' con el nuevo sistema de traducción simple)
  const testimonials = [
      { text: "Excelente servicio y profesionalismo. Encontraron la casa perfecta para mi familia en tiempo récord.", author: "Carlos M.", role: "Comprador" },
      { text: "La asesoría legal fue impecable. Me sentí seguro en todo el proceso de venta de mi apartamento.", author: "Ana S.", role: "Vendedora" },
      { text: "Gracias a sus avalúos precisos pude negociar un precio justo. Altamente recomendados.", author: "Jorge L.", role: "Inversionista" }
  ];

  // Rotación automática de testimonios (7 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="bg-[#0A192F] text-slate-300 pt-20 pb-8 font-sans border-t border-slate-800">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* COLUMNA 1: INFO & LOGO */}
          <div className="space-y-6">
            <Link to="/" className="block">
               <img 
                 src={logoSrc} 
                 alt="AYC Logo" 
                 className="h-20 w-auto object-contain"
               />
            </Link>
            <h3 className="text-white font-black uppercase tracking-wider text-sm border-b border-green-600 pb-2 inline-block">
                {t('footer_about_title') || "NOSOTROS"}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
                Somos una inmobiliaria boutique en Bogotá, especializada en propiedades exclusivas y asesoría integral. Tu patrimonio, nuestra prioridad.
            </p>
            <div className="flex gap-4 pt-4">
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-green-600 text-white transition-colors"><span className="sr-only">Facebook</span>FB</a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-green-600 text-white transition-colors"><span className="sr-only">Instagram</span>IG</a>
                <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-green-600 text-white transition-colors"><span className="sr-only">LinkedIn</span>LI</a>
            </div>
          </div>

          {/* COLUMNA 2: CONTACTO */}
          <div className="space-y-6">
            <h3 className="text-white font-black uppercase tracking-wider text-sm border-b border-green-600 pb-2 inline-block">
                {t('footer_contact_title') || "CONTACTO"}
            </h3>
            <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                    <MapPin className="text-green-500 shrink-0 mt-1" size={18} />
                    <span>Bogotá, Colombia</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="text-green-500 shrink-0" size={18} />
                    <a href="tel:+573134663832" className="hover:text-white transition-colors">+57 313 466 3832</a>
                </li>
                <li className="flex items-center gap-3">
                    <Mail className="text-green-500 shrink-0" size={18} />
                    <a href="mailto:info@aycfincaraiz.co" className="hover:text-white transition-colors">info@aycfincaraiz.co</a>
                </li>
            </ul>
          </div>

          {/* COLUMNA 3: TESTIMONIOS ROTATIVOS */}
          <div className="space-y-6">
              <h3 className="text-white font-black uppercase tracking-wider text-sm border-b border-green-600 pb-2 inline-block">
                 TESTIMONIOS
              </h3>
              <div className="relative h-48">
                 {testimonials.map((testim, index) => (
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
              {/* Indicadores */}
              <div className="flex gap-2 justify-center lg:justify-start pt-2">
                 {testimonials.map((_, i) => (
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

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>
                &copy; 2026 <strong className="text-slate-300">A&C Finca Raíz</strong>. Todos los derechos reservados.
            </p>
            <p className="flex items-center gap-1">
                Desarrollado por <a href="https://www.thisiswillowtree.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-400 font-bold transition-colors">Willow Tree Media</a>
            </p>
        </div>
      </div>
    </footer>
  );
}