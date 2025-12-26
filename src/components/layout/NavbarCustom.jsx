import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, Scale, Video, BadgeCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const NavbarCustom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();
  const logoSrc = lang === 'es' ? '/ayclogo.svg' : '/ayclogoen.svg';

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A192F] text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex-shrink-0 cursor-pointer z-50">
             <img src={logoSrc} alt="A&C" className="h-20 w-auto object-contain hover:scale-105 transition-transform" />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide transition-colors">{t.nav.home}</Link>
            <Link to="/inmuebles" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide transition-colors">{t.nav.properties}</Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide py-6 transition-colors">
                {t.nav.services} <ChevronDown size={14}/>
              </button>
              <div className="absolute left-0 top-full mt-2 w-64 z-[100] bg-white text-gray-800 rounded-b-xl shadow-2xl hidden group-hover:block border-t-4 border-[var(--ayc-emerald)] overflow-hidden">
                <Link to="/servicios/avaluos" className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-gray-50 hover:text-[var(--ayc-emerald)] border-b border-gray-100">
                  <BadgeCheck size={18} className="text-[var(--ayc-emerald)]"/> {t.services.appraisal}
                </Link>
                <Link to="/servicios/juridico" className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-gray-50 hover:text-[var(--ayc-emerald)] border-b border-gray-100">
                  <Scale size={18} className="text-[var(--ayc-emerald)]"/> {t.services.legal}
                </Link>
                <Link to="/servicios/audiovisual" className="flex items-center gap-3 px-6 py-4 text-sm font-medium hover:bg-gray-50 hover:text-[var(--ayc-emerald)]">
                  <Video size={18} className="text-[var(--ayc-emerald)]"/> {t.services.media}
                </Link>
              </div>
            </div>

            <Link to="/blog" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide transition-colors">{t.nav.blog}</Link>
            <Link to="/nosotros" className="hover:text-[var(--ayc-emerald)] font-bold text-sm tracking-wide transition-colors">{t.nav.about}</Link>
            
            <div className="flex items-center gap-3 ml-4">
                <Link to="/contacto" className="bg-[var(--ayc-emerald)] text-white hover:bg-[#14532d] px-6 py-2.5 rounded-full text-xs font-black tracking-widest shadow-lg uppercase transition-all">
                  {t.nav.contact}
                </Link>
                <button onClick={toggleLang} className="flex items-center gap-1 text-xs font-bold border border-gray-600 px-3 py-1.5 rounded-full hover:border-white transition-all">
                   <Globe size={14} /> {lang.toUpperCase()}
                </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
             <button onClick={toggleLang} className="text-xs font-bold border border-gray-600 px-2 py-1 rounded">{lang.toUpperCase()}</button>
             <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-400 hover:text-white"><Menu /></button>
          </div>
        </div>
      </div>

      {/* CURVA CORRECTA (Smile) */}
      <div className="absolute bottom-[-20px] left-0 w-full overflow-hidden leading-[0] z-10 pointer-events-none">
         <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[30px]">
             {/* Path corregido para ser cóncavo hacia abajo */}
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" className="fill-[#0A192F]"></path>
         </svg>
      </div>
    </nav>
  );
};
export default NavbarCustom;

