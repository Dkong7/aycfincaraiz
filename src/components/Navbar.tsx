import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronDown, faGlobe, faGavel, faCamera, faChartLine, faPhone, faHome, faBuilding, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext"; // Usamos el contexto de Auth

const Navbar = () => {
  const { t, lang, toggleLang } = useApp();
  const { session, signOut } = useAuth(); // Obtenemos sesión
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    setIsOpen(false);
  };

  const PHONE_NUMBER = "+57 313 466 3832";

  return (
    <header className="relative z-50 font-sans w-full">
      <div className="bg-white shadow-md relative z-30 px-4 py-2 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex-shrink-0 z-50">
               <img className="h-10 md:h-20 w-auto object-contain" src="/ayclogo.svg" alt="A&C Finca Raíz" />
            </Link>

            <div className="hidden lg:flex items-center gap-6 text-slate-800">
               <div className="flex items-center gap-3 text-sm font-bold border-r border-gray-200 pr-6">
                  <span className="flex items-center gap-2"><FontAwesomeIcon icon={faPhone} className="text-yellow-500" /> {PHONE_NUMBER}</span>
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500 font-normal">Bogotá & Cundinamarca</span>
               </div>
               <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-yellow-500 transition text-xl"><FontAwesomeIcon icon={faFacebookF} /></a>
                  <a href="#" className="hover:text-yellow-500 transition text-xl"><FontAwesomeIcon icon={faInstagram} /></a>
                  <a href="#" className="hover:text-yellow-500 transition text-xl"><FontAwesomeIcon icon={faWhatsapp} /></a>
                  
                  {/* SWITCH IDIOMA */}
                  <button onClick={toggleLang} className="ml-2 text-xs font-bold border-2 border-slate-200 px-3 py-1 rounded-full hover:bg-slate-100 flex gap-2 items-center">
                     <FontAwesomeIcon icon={faGlobe} /> {lang}
                  </button>

                  {/* SOLO MOSTRAR SI HAY SESIÓN ACTIVA (ADMIN) */}
                  {session && (
                    <div className="flex items-center gap-2 ml-4 border-l pl-4 border-gray-200">
                        <Link to="/admin" className="text-xs font-black bg-blue-900 text-white px-2 py-1 rounded uppercase tracking-wider hover:bg-blue-800">ADMIN</Link>
                        <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-sm" title="Salir"><FontAwesomeIcon icon={faSignOutAlt} /></button>
                    </div>
                  )}
               </div>
            </div>

            <div className="lg:hidden flex items-center gap-3">
               <button onClick={toggleLang} className="text-xs font-bold border border-slate-200 px-2 py-1 rounded-full text-slate-600">{lang}</button>
               <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 text-2xl focus:outline-none p-1"><FontAwesomeIcon icon={isOpen ? faTimes : faBars} /></button>
            </div>
        </div>
      </div>

      {/* NAV DESKTOP */}
      <div className="hidden lg:flex absolute top-full left-0 w-full z-20 justify-center -mt-1 pointer-events-none">
         <div className="relative w-[1000px] h-[70px] pointer-events-auto filter drop-shadow-xl">
             <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1000 70" preserveAspectRatio="none"><path d="M0,0 H1000 C900,0 800,70 500,70 C200,70 100,0 0,0 Z" fill="#1e293b"></path></svg>
             <nav className="absolute top-0 left-0 w-full h-full flex justify-center items-start pt-3 gap-8 text-white font-bold text-sm uppercase tracking-wider">
                <Link to="/" className="hover:text-yellow-400 transition hover:-translate-y-0.5">{t("nav_home")}</Link>
                <Link to="/inmuebles" className="hover:text-yellow-400 transition hover:-translate-y-0.5">{t("nav_properties")}</Link>
                <div className="relative group">
                   <button className="hover:text-yellow-400 transition flex items-center gap-1 hover:-translate-y-0.5">{t("nav_services")} <FontAwesomeIcon icon={faChevronDown} size="xs" /></button>
                   <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-60 bg-white text-slate-800 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden text-left normal-case border-t-4 border-yellow-500">
                      <Link to="/servicios/avaluos" className="block px-6 py-3 hover:bg-slate-50 border-b font-medium"><FontAwesomeIcon icon={faChartLine} className="mr-2 text-yellow-500"/>{t("srv_appraisals")}</Link>
                      <Link to="/servicios/legal" className="block px-6 py-3 hover:bg-slate-50 border-b font-medium"><FontAwesomeIcon icon={faGavel} className="mr-2 text-yellow-500"/>{t("srv_legal")}</Link>
                      <Link to="/servicios/audiovisual" className="block px-6 py-3 hover:bg-slate-50 font-medium"><FontAwesomeIcon icon={faCamera} className="mr-2 text-yellow-500"/>{t("srv_audio")}</Link>
                   </div>
                </div>
                <Link to="/blog" className="hover:text-yellow-400 transition hover:-translate-y-0.5">{t("nav_blog")}</Link>
                <Link to="/nosotros" className="hover:text-yellow-400 transition hover:-translate-y-0.5">{t("nav_about")}</Link>
                <Link to="/contacto" className="text-yellow-400 hover:text-white transition hover:-translate-y-0.5">{t("nav_contact")}</Link>
             </nav>
         </div>
      </div>

      {/* NAV MOBILE */}
      <div className={`fixed inset-0 bg-slate-900/95 z-40 backdrop-blur-sm transition-all duration-300 lg:hidden flex flex-col items-center justify-center ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
         <div className="flex flex-col gap-6 text-center w-full px-8 max-h-screen overflow-y-auto">
            <button onClick={() => handleNavigation("/")} className="text-xl font-bold text-white uppercase hover:text-yellow-400 flex items-center justify-center gap-2"><FontAwesomeIcon icon={faHome} className="text-yellow-500"/> {t("nav_home")}</button>
            <button onClick={() => handleNavigation("/inmuebles")} className="text-xl font-bold text-white uppercase hover:text-yellow-400 flex items-center justify-center gap-2"><FontAwesomeIcon icon={faBuilding} className="text-yellow-500"/> {t("nav_properties")}</button>
            <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700 w-full max-w-xs mx-auto">
               <p className="text-yellow-500 text-xs font-bold uppercase tracking-widest mb-3 border-b border-slate-700 pb-2">{t("nav_services")}</p>
               <div className="flex flex-col gap-3">
                  <button onClick={() => handleNavigation("/servicios/avaluos")} className="text-base text-slate-200 hover:text-white flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faChartLine} className="text-slate-500"/> {t("srv_appraisals")}</button>
                  <button onClick={() => handleNavigation("/servicios/legal")} className="text-base text-slate-200 hover:text-white flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faGavel} className="text-slate-500"/> {t("srv_legal")}</button>
                  <button onClick={() => handleNavigation("/servicios/audiovisual")} className="text-base text-slate-200 hover:text-white flex items-center gap-2 justify-center"><FontAwesomeIcon icon={faCamera} className="text-slate-500"/> {t("srv_audio")}</button>
               </div>
            </div>
            <button onClick={() => handleNavigation("/blog")} className="text-xl font-bold text-white uppercase hover:text-yellow-400">{t("nav_blog")}</button>
            <button onClick={() => handleNavigation("/contacto")} className="bg-yellow-500 text-slate-900 px-8 py-3 rounded-full font-bold uppercase shadow-lg active:scale-95 transition-transform">{t("nav_contact")}</button>
            
            {/* ADMIN MOBILE ONLY IF LOGGED IN */}
            {session && (
               <button onClick={() => handleNavigation("/admin")} className="text-sm font-black bg-blue-600 text-white px-6 py-2 rounded uppercase tracking-wider mt-4">IR AL PANEL ADMIN</button>
            )}
         </div>
      </div>
    </header>
  );
};
export default Navbar;