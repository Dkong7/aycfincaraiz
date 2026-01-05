import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Scale, Video, ChevronDown } from "lucide-react";

interface NavbarProps {
  language: "ES" | "EN";
  toggleLanguage: () => void;
}

export default function Navbar({ language, toggleLanguage }: NavbarProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const timeoutRef = useRef<any>(null); // Referencia para el temporizador
  const logoSrc = language === "ES" ? "/ayclogo.svg" : "/ayclogoen.svg";

  // --- LÓGICA DE APERTURA/CIERRE SUAVE ---
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Si había orden de cierre, cancélala
    }
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    // Esperar 300ms antes de cerrar. Si el usuario vuelve, se cancela.
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B1120] text-white shadow-2xl font-sans pb-2">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center relative z-50">
        
        {/* LOGO */}
        <Link to="/" className="block">
           <img 
             src={logoSrc} 
             alt="AYC Logo" 
             className="h-14 w-auto object-contain hover:scale-105 transition-transform"
             onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling?.classList.remove("hidden"); }}
           />
           <span className="hidden text-xl font-black text-green-600">AYC FINCA RAÍZ</span>
        </Link>

        {/* MENÚ CENTRAL */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
          <Link to="/" className="hover:text-green-500 transition uppercase">{language === "ES" ? "Inicio" : "Home"}</Link>
          <Link to="/inmuebles" className="hover:text-green-500 transition uppercase">{language === "ES" ? "Inmuebles" : "Properties"}</Link>
          
          {/* Dropdown Servicios (Con lógica de espera) */}
          <div className="relative group h-full flex items-center" 
               onMouseEnter={handleMouseEnter} 
               onMouseLeave={handleMouseLeave}>
             
             <button className={`flex items-center gap-1 transition uppercase ${isServicesOpen ? "text-green-500" : "hover:text-green-500"}`}>
               {language === "ES" ? "Servicios" : "Services"}
               <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}/>
             </button>

             {/* Menú Desplegable */}
             {isServicesOpen && (
               <div 
                  className="absolute top-12 left-0 w-72 pt-4 animate-fadeIn z-[60]"
                  onMouseEnter={handleMouseEnter} // Mantener abierto si entra al menú
                  onMouseLeave={handleMouseLeave} // Cerrar si sale del menú
               >
                 <div className="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden py-2 border-t-4 border-green-600 ring-1 ring-black/5">
                   
                   <Link to="/servicios/avaluos" className="flex items-center gap-3 px-6 py-4 hover:bg-green-50 border-b border-gray-100 group/item transition-colors">
                      <BadgeCheck className="text-green-600 group-hover/item:scale-110 transition-transform" size={20}/>
                      <div>
                          <span className="block font-bold text-sm text-[#0A192F]">{language === "ES" ? "Avalúos Comerciales" : "Appraisals"}</span>
                          <span className="text-[10px] text-gray-400 font-normal">Certificados RAA</span>
                      </div>
                   </Link>

                   <Link to="/servicios/juridico" className="flex items-center gap-3 px-6 py-4 hover:bg-green-50 border-b border-gray-100 group/item transition-colors">
                      <Scale className="text-green-600 group-hover/item:scale-110 transition-transform" size={20}/>
                      <div>
                          <span className="block font-bold text-sm text-[#0A192F]">{language === "ES" ? "Asesoría Jurídica" : "Legal Advice"}</span>
                          <span className="text-[10px] text-gray-400 font-normal">Saneamiento predial</span>
                      </div>
                   </Link>

                   <Link to="/servicios/audiovisual" className="flex items-center gap-3 px-6 py-4 hover:bg-green-50 group/item transition-colors">
                      <Video className="text-green-600 group-hover/item:scale-110 transition-transform" size={20}/>
                      <div>
                          <span className="block font-bold text-sm text-[#0A192F]">{language === "ES" ? "Producción Audiovisual" : "Media Production"}</span>
                          <span className="text-[10px] text-gray-400 font-normal">Drones 4K & Recorridos</span>
                      </div>
                   </Link>

                 </div>
               </div>
             )}
          </div>

          <Link to="/blog" className="hover:text-green-500 transition uppercase">Blog</Link>
          <Link to="/nosotros" className="hover:text-green-500 transition uppercase">{language === "ES" ? "Nosotros" : "About"}</Link>
        </div>

        {/* BOTONES DERECHA */}
        <div className="flex items-center gap-4">
           <Link to="/contacto" className="hidden md:block bg-green-600 text-white font-black px-6 py-2 rounded-full transition-all text-sm border border-green-500 animate-pulse hover:animate-none hover:scale-110 hover:shadow-[0_0_15px_rgba(22,163,74,0.6)]">
             {language === "ES" ? "CONTACTO" : "CONTACT"}
           </Link>
           
           <button onClick={toggleLanguage} className="border border-white/30 rounded-full px-3 py-1 text-xs hover:bg-white/10 flex items-center gap-2 bg-black/20">
             <span className="text-lg">{language === "ES" ? "🇪🇸" : "🇺🇸"}</span>
           </button>
        </div>
      </div>

      {/* CURVA */}
      <div className="absolute -bottom-4 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg className="relative block w-full h-[30px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill="#0B1120"></path>
        </svg>
      </div>
    </nav>
  );
}
