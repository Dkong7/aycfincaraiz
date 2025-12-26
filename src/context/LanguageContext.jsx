import React, { createContext, useState, useContext } from 'react';

const translations = {
  es: {
    nav: { home: "INICIO", properties: "INMUEBLES", services: "SERVICIOS", blog: "BLOG", about: "NOSOTROS", contact: "CONTACTO" },
    hero: { location: "Ubicación", price: "Precio", viewDetails: "Ver Detalles", featured: "DESTACADO" },
    home: { searchTitle: "¿QUÉ ZONA TE INTERESA?", searchDesc: "Nuestro algoritmo y agentes élite encontrarán tu espacio ideal.", searchBtn: "IR", placeholder: "Ej: Rosales, Chicó, Chía..." },
    featured: { title: "FAVORITOS A&C", subtitle: "Nuestra selección exclusiva del mes.", viewAll: "Ver todo el portafolio", goldBadge: "LA MEJOR OPORTUNIDAD", badge: "DESTACADO" },
    properties: { details: "Ver Detalles", code: "CÓDIGO", zone: "ZONA / BARRIO", type: "TIPO", filterTitle: "Encuentra tu Inmueble", search: "BUSCAR", noResults: "No se encontraron resultados." },
    services: { title: "SERVICIOS INTEGRALES", subtitle: "Soluciones 360°", legal: "Asesoría Jurídica", media: "Producción Audiovisual", appraisal: "Avalúos Comerciales", btnLegal: "Consultar Abogado", btnMedia: "Ver Experiencia Cinema", btnAppraisal: "Solicitar Avalúo" },
    contact: { title: "Hablemos de tu Patrimonio", name: "Nombre Completo", phone: "Teléfono", email: "Correo Electrónico", msg: "Mensaje", send: "ENVIAR MENSAJE" },
    av: { title: "Cinema A&C Inmobiliario", subtitle: "No grabamos recorridos; producimos narrativa de ventas.", desc: "Elevamos el estatus de su activo con calidad 4K cinematográfica." }
  },
  en: {
    nav: { home: "HOME", properties: "PROPERTIES", services: "SERVICES", blog: "BLOG", about: "ABOUT US", contact: "CONTACT" },
    hero: { location: "Location", price: "Price", viewDetails: "View Details", featured: "FEATURED" },
    home: { searchTitle: "WHICH AREA INTERESTS YOU?", searchDesc: "Our algorithm and elite agents will find your ideal space.", searchBtn: "GO", placeholder: "Ex: Rosales, Chicó, Chía..." },
    featured: { title: "A&C FAVORITES", subtitle: "Our exclusive selection of the month.", viewAll: "View full portfolio", goldBadge: "BEST OPPORTUNITY", badge: "FEATURED" },
    properties: { details: "View Details", code: "CODE", zone: "ZONE / NEIGHBORHOOD", type: "TYPE", filterTitle: "Find Your Property", search: "SEARCH", noResults: "No results found." },
    services: { title: "COMPREHENSIVE SERVICES", subtitle: "360° Solutions", legal: "Legal Advice", media: "Audiovisual Production", appraisal: "Commercial Appraisals", btnLegal: "Consult Lawyer", btnMedia: "View Cinema Experience", btnAppraisal: "Request Appraisal" },
    contact: { title: "Let's Talk About Your Assets", name: "Full Name", phone: "Phone", email: "Email", msg: "Message", send: "SEND MESSAGE" },
    av: { title: "Cinema A&C Real Estate", subtitle: "We don't just record tours; we produce sales narratives.", desc: "Elevate your asset's status with 4K cinematic quality." }
  }
};

const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');
  return <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>{children}</LanguageContext.Provider>;
};
export const useLanguage = () => useContext(LanguageContext);