import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Scale, Video, ChevronDown, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext"; 

export default function Navbar() {
  const { t, language, toggleLanguage } = useLanguage(); 
  
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const timeoutRef = useRef<any>(null); 
  
  // LOGO: Muestra el logo correspondiente al idioma ACTUAL
  const logoSrc = language === "ES" ? "/ayclogo.svg" : "/ayclogoen.svg";

  // BOTÓN: Muestra el idioma DESTINO (Al que cambiarás si haces click)
  const targetLang = language === "ES" ? "EN" : "ES";
  const targetFlag = language === "ES" ? "🇺🇸" : "🇪🇸";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 300);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-[#0B1120] text-white shadow-2xl font-sans transition-all duration-500 ${isScrolled ? "pb-1" : "pb-2"}`}>
      
      <div className={`container mx-auto px-6 flex justify-between items-center relative z-50 transition-all duration-500 ${isScrolled ? "h-16" : "h-16 md:h-24"}`}>
        
        {/* LOGO */}
        <Link to="/" className="block relative z-50">
           <img 
             src={logoSrc} 
             alt="AYC Logo" 
             className={`w-auto object-contain hover:scale-105 transition-all duration-500 ${isScrolled ? "h-10 md:h-12" : "h-10 md:h-20"}`}
             onError={(e) => { 
                 const target = e.currentTarget;
                 if (target.src.includes('ayclogoen')) {
                     target.src = "/ayclogo.svg"; 
                 } else {
                     target.style.display = "none"; 
                     target.nextElementSibling?.classList.remove("hidden"); 
                 }
             }}
           />
           <span className="hidden text-xl font-black text-green-600">AYC FINCA RAÍZ</span>
        </Link>

        {/* --- MENÚ DESKTOP --- */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
          <Link to="/" className="hover:text-green-500 transition uppercase text-gray-300 hover:text-white">{t.nav.home}</Link>
          <Link to="/inmuebles" className="hover:text-green-500 transition uppercase text-gray-300 hover:text-white">{t.nav.properties}</Link>
          
          <div className="relative group h-full flex items-center" 
               onMouseEnter={handleMouseEnter} 
               onMouseLeave={handleMouseLeave}>
             
             <button className={`flex items-center gap-1 transition uppercase ${isServicesOpen ? "text-green-500" : "text-gray-300 hover:text-white"}`}>
               {t.nav.services}
               <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`}/>
             </button>

             {isServicesOpen && (
               <div 
                  className="absolute top-10 left-0 w-72 pt-4 animate-fadeIn z-[60]"
                  onMouseEnter={handleMouseEnter} 
                  onMouseLeave={handleMouseLeave}
               >
                  <div className="bg-white text-gray-800 rounded-xl shadow-2xl overflow-hidden py-2 border-t-4 border-green-600 ring-1 ring-black/5">
                    <Link to="/servicios/avaluos" className="flex items-center gap-3 px-6 py-4 hover:bg-green-50 border-b border-gray-100 group/item transition-colors">
                       <BadgeCheck className="text-green-600 group-hover/item:scale-110 transition-transform" size={20}/>
                       <div>
                           <span className="block font-bold text-sm text-[#0A192F]">{t.services.appraisal}</span>
                           <span className="text-[10px] text-gray-400 font-normal">Certificados RAA</span>
                       </div>
                    </Link>
                    <Link to="/servicios/juridico" className="flex items-center gap-3 px-6 py-4 hover:bg-green-50 border-b border-gray-100 group/item transition-colors">
                       <Scale className="text-green-600 group-hover/item:scale-110 transition-transform" size={20}/>
                       <div>
                           <span className="block font-bold text-sm text-[#0A192F]">{t.services.legal}</span>
                           <span className="text-[10px] text-gray-400 font-normal">Saneamiento predial</span>
                       </div>
                    </Link>
                    <Link to="/servicios/audiovisual" className="flex items-center gap-3 px-6 py-4 hover:bg-green-50 group/item transition-colors">
                       <Video className="text-green-600 group-hover/item:scale-110 transition-transform" size={20}/>
                       <div>
                           <span className="block font-bold text-sm text-[#0A192F]">{t.services.media}</span>
                           <span className="text-[10px] text-gray-400 font-normal">Drones 4K & Recorridos</span>
                       </div>
                    </Link>
                  </div>
               </div>
             )}
          </div>

          <Link to="/blog" className="hover:text-green-500 transition uppercase text-gray-300 hover:text-white">{t.nav.blog}</Link>
          <Link to="/nosotros" className="hover:text-green-500 transition uppercase text-gray-300 hover:text-white">{t.nav.about}</Link>
        </div>

        {/* --- BOTONES DESKTOP --- */}
        <div className="hidden md:flex items-center gap-4">
           {/* BOTÓN DE IDIOMA (MUESTRA EL DESTINO) */}
           <button 
             onClick={toggleLanguage} 
             className="group relative flex items-center gap-2 pl-3 pr-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 active:scale-95 backdrop-blur-md"
             title={language === "ES" ? "Switch to English" : "Cambiar a Español"}
           >
             <span className="text-lg filter drop-shadow-lg">{targetFlag}</span>
             <span className="text-xs font-bold tracking-widest text-gray-400 group-hover:text-white transition-colors border-l border-white/10 pl-2">
                {targetLang}
             </span>
           </button>

           <Link to="/contacto" className="bg-green-600 text-white font-black px-6 py-2 rounded-full transition-all text-sm border border-green-500 animate-pulse hover:animate-none hover:scale-105 hover:shadow-[0_0_20px_rgba(22,163,74,0.4)] shadow-lg">
             {t.nav.contact.toUpperCase()}
           </Link>
        </div>

        {/* --- CONTROLES MÓVIL --- */}
        <div className="md:hidden flex items-center gap-3 z-50">
            {/* Botón Idioma Móvil (Destino) */}
            <button onClick={toggleLanguage} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 active:bg-green-600/20 transition-colors">
                <span className="text-xl">{targetFlag}</span>
            </button>
            
            <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors">
                {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE MÓVIL --- */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#0B1120]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl flex flex-col p-6 gap-6 animate-in slide-in-from-top-5 z-40 pb-12 h-[calc(100vh-64px)] overflow-y-auto">
            <Link to="/" onClick={() => setIsMobileOpen(false)} className="text-2xl font-black uppercase text-white hover:text-green-500 tracking-tight">
              {t.nav.home}
            </Link>
            <Link to="/inmuebles" onClick={() => setIsMobileOpen(false)} className="text-2xl font-black uppercase text-white hover:text-green-500 tracking-tight">
              {t.nav.properties}
            </Link>
            
            <div className="space-y-4 border-l-2 border-green-600/30 pl-6 my-2">
                <p className="text-xs uppercase text-green-500 font-bold tracking-[0.2em]">{t.nav.services}</p>
                <Link to="/servicios/avaluos" onClick={() => setIsMobileOpen(false)} className="block text-lg text-gray-300 hover:text-white font-medium">
                  {t.services.appraisal}
                </Link>
                <Link to="/servicios/juridico" onClick={() => setIsMobileOpen(false)} className="block text-lg text-gray-300 hover:text-white font-medium">
                  {t.services.legal}
                </Link>
                <Link to="/servicios/audiovisual" onClick={() => setIsMobileOpen(false)} className="block text-lg text-gray-300 hover:text-white font-medium">
                  {t.services.media}
                </Link>
            </div>

            <Link to="/blog" onClick={() => setIsMobileOpen(false)} className="text-2xl font-black uppercase text-white hover:text-green-500 tracking-tight">
              {t.nav.blog}
            </Link>
            <Link to="/nosotros" onClick={() => setIsMobileOpen(false)} className="text-2xl font-black uppercase text-white hover:text-green-500 tracking-tight">
              {t.nav.about}
            </Link>
            <Link to="/contacto" onClick={() => setIsMobileOpen(false)} className="bg-green-600 text-center py-4 rounded-xl font-black uppercase text-white shadow-lg mt-4 text-lg">
              {t.nav.contact}
            </Link>
        </div>
      )}

      {/* CURVA DECORATIVA */}
      <div className="absolute top-[99%] left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg className="relative block w-full h-[20px] md:h-[45px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill="#0B1120"></path>
        </svg>
      </div>
    </nav>
  );
}