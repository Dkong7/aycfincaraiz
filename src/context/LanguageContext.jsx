import React, { createContext, useState, useContext } from 'react';

const translations = {
  es: {
    nav: { home: "INICIO", properties: "INMUEBLES", services: "SERVICIOS", blog: "BLOG", about: "NOSOTROS", contact: "CONTACTO" },
    hero: { location: "Ubicación", price: "Precio", viewDetails: "Ver Detalles", featured: "DESTACADO" },
    home: { searchTitle: "¿QUÉ ZONA TE INTERESA?", searchDesc: "Nuestro algoritmo y agentes élite encontrarán tu espacio ideal.", searchBtn: "IR", placeholder: "Ej: Rosales, Chicó, Chía..." },
    featured: { title: "FAVORITOS A&C", subtitle: "Nuestra selección exclusiva del mes.", viewAll: "Ver todo el portafolio", goldBadge: "OPORTUNIDAD ÚNICA", badge: "DESTACADO" },
    properties: { details: "Ver Detalles", code: "CÓDIGO", zone: "ZONA / BARRIO", type: "TIPO", filterTitle: "Encuentra tu Inmueble", search: "BUSCAR", noResults: "No se encontraron resultados.", apply: "Aplicar Filtros" },
    services: { 
      title: "SERVICIOS INTEGRALES", subtitle: "Soluciones 360°", 
      legal: "Asesoría Jurídica", legalDesc: "Blindaje legal para tus operaciones.",
      media: "Producción Audiovisual", mediaDesc: "El valor entra por los ojos.",
      appraisal: "Avalúos Comerciales", appraisalDesc: "Valoración precisa bajo norma RAA.",
      btnLegal: "Consultar Abogado", btnMedia: "Ver Experiencia Cinema", btnAppraisal: "Solicitar Avalúo" 
    },
    about: { title: "Nuestra Historia", subtitle: "Más que intermediarios, somos tus aliados.", desc: "A&C Finca Raíz nació con una misión clara: transformar la experiencia inmobiliaria.", stats: { clients: "Clientes Felices", years: "Años de Experiencia", sales: "En Ventas" }, team: "Nuestro Liderazgo", founder: "Founder", cofounder: "Co-Founder" },
    blog: { title: "Noticias del Sector", subtitle: "Actualidad inmobiliaria", readMore: "Leer Artículo", recent: "Recientes" },
    contact: { title: "Hablemos de tu Patrimonio", name: "Nombre Completo", phone: "Teléfono", email: "Correo Electrónico", msg: "Mensaje", send: "ENVIAR MENSAJE" },
    footer: { rights: "Todos los derechos reservados.", follow: "Síguenos", contact: "Contacto Directo" },
    av: { title: "Cinema A&C", subtitle: "Narrativa visual de alto impacto.", desc: "Elevamos el estatus de su activo con calidad 4K cinematográfica." }
  },
  en: {
    nav: { home: "HOME", properties: "PROPERTIES", services: "SERVICES", blog: "BLOG", about: "ABOUT US", contact: "CONTACT" },
    hero: { location: "Location", price: "Price", viewDetails: "View Details", featured: "FEATURED" },
    home: { searchTitle: "WHICH AREA INTERESTS YOU?", searchDesc: "Our algorithm and elite agents will find your ideal space.", searchBtn: "GO", placeholder: "Ex: Rosales, Chicó, Chía..." },
    featured: { title: "A&C FAVORITES", subtitle: "Our exclusive selection of the month.", viewAll: "View full portfolio", goldBadge: "UNIQUE OPPORTUNITY", badge: "FEATURED" },
    properties: { details: "View Details", code: "CODE", zone: "ZONE / NEIGHBORHOOD", type: "TYPE", filterTitle: "Find Your Property", search: "SEARCH", noResults: "No results found.", apply: "Apply Filters" },
    services: { 
      title: "COMPREHENSIVE SERVICES", subtitle: "360° Solutions", 
      legal: "Legal Advice", legalDesc: "Legal shielding for your operations.",
      media: "Audiovisual Production", mediaDesc: "Value enters through the eyes.",
      appraisal: "Commercial Appraisals", appraisalDesc: "Precise valuation under RAA standards.",
      btnLegal: "Consult Lawyer", btnMedia: "View Cinema Experience", btnAppraisal: "Request Appraisal" 
    },
    about: { title: "Our History", subtitle: "More than intermediaries, we are your allies.", desc: "A&C Real Estate was born with a clear mission: to transform the real estate experience.", stats: { clients: "Happy Clients", years: "Years of Experience", sales: "In Sales" }, team: "Our Leadership", founder: "Founder", cofounder: "Co-Founder" },
    blog: { title: "Sector News", subtitle: "Real Estate Updates", readMore: "Read Article", recent: "Recent" },
    contact: { title: "Let's Talk About Your Assets", name: "Full Name", phone: "Phone", email: "Email", msg: "Message", send: "SEND MESSAGE" },
    footer: { rights: "All rights reserved.", follow: "Follow Us", contact: "Direct Contact" },
    av: { title: "Cinema A&C", subtitle: "High-impact visual narrative.", desc: "We elevate your asset status with 4K cinematic quality." }
  }
};

const LanguageContext = createContext();
export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('es');
  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');
  return <LanguageContext.Provider value={{ lang, toggleLang, t: translations[lang] }}>{children}</LanguageContext.Provider>;
};
export const useLanguage = () => useContext(LanguageContext);