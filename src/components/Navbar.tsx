import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import LanguageSwitch from './LanguageSwitch';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Lógica para cambiar el logo según el idioma seleccionado
  const logoSrc = i18n.language === 'en' ? '/ayclogoen.svg' : '/ayclogo.svg';

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO DINÁMICO */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img 
                className="h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" 
                src={logoSrc} 
                alt="A&C Finca Raíz Logo" 
              />
            </Link>
          </div>

          {/* MENU ESCRITORIO */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-semibold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">
              {t('navbar.home')}
            </Link>
            <Link to="/nosotros" className="text-sm font-semibold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">
              {t('navbar.us')}
            </Link>
            <Link to="/inmuebles" className="text-sm font-semibold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">
              {t('navbar.properties')}
            </Link>
            <Link to="/contacto" className="text-sm font-semibold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-secondary after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">
              {t('navbar.contact')}
            </Link>
            
            {/* Divisor vertical */}
            <div className="h-6 w-[1px] bg-gray-200"></div>
            
            <LanguageSwitch />
          </div>

          {/* BOTÓN MOVIL */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitch />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-primary hover:text-secondary focus:outline-none transition-colors p-2"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
            </button>
          </div>
        </div>
      </div>

      {/* MENU DESPLEGABLE MOVIL */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate-fadeIn">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">
              {t('navbar.home')}
            </Link>
            <Link to="/nosotros" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">
              {t('navbar.us')}
            </Link>
            <Link to="/inmuebles" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">
              {t('navbar.properties')}
            </Link>
            <Link to="/contacto" onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md">
              {t('navbar.contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
