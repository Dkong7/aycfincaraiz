import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import LanguageSwitch from "./LanguageSwitch";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Logo siempre en blanco o versión para fondo oscuro si tienes
  // Nota: Si tu logo es negro, quizás no se vea bien sobre azul. 
  // Asegúrate de usar un logo claro o el SVG manipularlo con CSS brightness.
  const logoSrc = "/ayclogoen.svg"; // Usamos uno genérico por ahora

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    // CONTENEDOR PRINCIPAL AZUL (Fondo completo del Header)
    <header className="bg-primary shadow-md sticky top-0 z-50">
      
      {/* 1. FILA SUPERIOR: Logo e Iconos Sociales */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 text-white">
          
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                className="h-12 w-auto object-contain brightness-0 invert" // Filtro para volver blanco el logo si es negro
                src={logoSrc} 
                alt="Logo A&C" 
              />
            </Link>
          </div>

          {/* Redes Sociales a la derecha (En lugar del teléfono) */}
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-secondary transition-transform hover:-translate-y-1 duration-300">
              <FontAwesomeIcon icon={faFacebookF} size="lg" />
            </a>
            <a href="#" className="hover:text-secondary transition-transform hover:-translate-y-1 duration-300">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a href="#" className="hover:text-secondary transition-transform hover:-translate-y-1 duration-300">
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
            </a>
            
            {/* Botón Móvil (Hamburguesa) - Solo visible en móvil */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden ml-4 text-white focus:outline-none">
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="xl" />
            </button>
          </div>

        </div>
      </div>

      {/* 2. FILA INFERIOR: Barra de Navegación Blanca con CURVA SUPERIOR */}
      {/* 'rounded-t-[35px]' crea el efecto de pestaña redondeada sobre el fondo azul */}
      <div className="bg-white rounded-t-[35px] w-full shadow-inner border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Oculto en móvil, visible en desktop */}
          <div className="hidden md:flex justify-center items-center h-14 space-x-10">
            
            <Link to="/" className="text-sm font-bold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative group">
              {t("navbar.home")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </Link>

            <Link to="/inmuebles" className="text-sm font-bold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative group">
              {t("navbar.properties")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </Link>

            <Link to="/nosotros" className="text-sm font-bold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative group">
              {t("navbar.us")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </Link>

            <Link to="/contacto" className="text-sm font-bold uppercase tracking-wide text-gray-600 hover:text-primary transition-colors relative group">
              {t("navbar.contact")}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full"></span>
            </Link>

            {/* Separador */}
            <div className="h-4 w-[1px] bg-gray-300"></div>

            <LanguageSwitch />

            {/* Auth Link */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                <span className="text-[10px] font-black tracking-tighter text-white bg-primary px-2 py-0.5 rounded uppercase">ADMIN</span>
                <button onClick={handleLogout} className="text-xs font-bold text-gray-400 hover:text-red-500 uppercase">
                  {t("navbar.logout")}
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary ml-4">
                <FontAwesomeIcon icon={faUserCircle} />
                <span className="uppercase">{t("navbar.login")}</span>
              </Link>
            )}

          </div>
        </div>
      </div>

      {/* MENU MOVIL (Desplegable) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 z-40 shadow-xl">
          <div className="px-6 py-4 space-y-3 flex flex-col items-center">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium hover:text-primary">{t("navbar.home")}</Link>
            <Link to="/inmuebles" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium hover:text-primary">{t("navbar.properties")}</Link>
            <Link to="/nosotros" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium hover:text-primary">{t("navbar.us")}</Link>
            <Link to="/contacto" onClick={() => setIsOpen(false)} className="text-gray-700 font-medium hover:text-primary">{t("navbar.contact")}</Link>
            
            <div className="w-full h-[1px] bg-gray-100 my-2"></div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitch />
              {user ? (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-red-500 font-bold text-sm">Salir</button>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-primary font-bold text-sm">Ingresar</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
