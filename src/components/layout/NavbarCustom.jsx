import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe, ChevronDown, Scale, Video, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const NavbarCustom = () => {
  const { lang, toggleLang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const logoSrc = lang === 'es' ? '/ayclogo.svg' : '/ayclogoen.svg';

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A192F] text-white shadow-xl h-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full relative z-50"> {/* z-50 aqui para estar sobre la curva */}
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex-shrink-0 cursor-pointer">
             <img src={logoSrc} alt="A&C" className="h-20 w-auto object-contain hover:scale-105 transition-transform" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6 h-full">
            <Link to="/" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide uppercase">{t.nav.home}</Link>
            <Link to="/inmuebles" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide uppercase">{t.nav.properties}</Link>
            
            {/* DROPDOWN MENU (Z-INDEX SUPERIOR) */}
            <div className="relative group h-full flex items-center z-50">
              <button className="flex items-center gap-1 hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide uppercase h-full">
                {t.nav.services} <ChevronDown size={14}/>
              </button>
              <div className="absolute left-0 top-full pt-0 w-64 hidden group-hover:block z-50">
                 <div className="bg-white text-gray-800 rounded-b-xl shadow-2xl border-t-4 border-[var(--ayc-emerald)] overflow-hidden">
                    <Link to="/servicios/avaluos" className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-gray-50 border-b border-gray-100"><BadgeCheck size={18} className="text-[var(--ayc-emerald)]"/> {t.services.appraisal}</Link>
                    <Link to="/servicios/juridico" className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-gray-50 border-b border-gray-100"><Scale size={18} className="text-[var(--ayc-emerald)]"/> {t.services.legal}</Link>
                    <Link to="/servicios/audiovisual" className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-gray-50"><Video size={18} className="text-[var(--ayc-emerald)]"/> {t.services.media}</Link>
                 </div>
              </div>
            </div>

            <Link to="/blog" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide uppercase">{t.nav.blog}</Link>
            <Link to="/nosotros" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide uppercase">{t.nav.about}</Link>
            
            <div className="flex items-center gap-3 ml-4">
                <Link to="/contacto" className="bg-[var(--ayc-emerald)] text-white hover:bg-[#14532d] px-6 py-2.5 rounded-full text-xs font-black tracking-widest shadow-lg uppercase transition-all">
                  {t.nav.contact}
                </Link>
                <button onClick={toggleLang} className="flex items-center gap-1 text-xs font-bold border border-gray-600 px-3 py-1.5 rounded-full hover:border-white transition-all">
                   <Globe size={14} /> {lang.toUpperCase()}
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* CURVA (Z-INDEX BAJO 10) - PARA QUE NO TAPE EL DROPDOWN (Z-50) */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px]">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-[#0A192F]"></path>
         </svg>
      </div>
    </nav>
  );
};
export default NavbarCustom;