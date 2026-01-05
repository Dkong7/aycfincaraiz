import React, { createContext, useContext, useState } from "react";

const translations = {
  ES: {
    nav: { home: "Inicio", properties: "Inmuebles", services: "Servicios", blog: "Blog", about: "Nosotros", contact: "Contacto" },
    featured: { title: "Propiedades Destacadas", viewAll: "Ver Todas", goldBadge: "Oportunidad Dorada", badge: "Favorito AYC" },
    properties: { details: "Ver Detalles", search: "Buscar Propiedades", filters: "Filtros", noResults: "No encontramos inmuebles.", viewAll: "Ver todos" },
    services: { 
      subtitle: "Nuestros Servicios", title: "Soluciones Integrales", 
      legal: "Asesoría Jurídica", btnLegal: "Consultar",
      media: "Producción Audiovisual", btnMedia: "Ver Portafolio",
      appraisal: "Avalúos Comerciales", btnAppraisal: "Cotizar",
      legalTitle: "Blindaje Inmobiliario", legalDesc: "Tu patrimonio es sagrado. No firmes promesas sin revisión.",
      appraisalTitle: "Avalúos Certificados", appraisalDesc: "Norma NIIF y RAA. Informes válidos para bancos."
    },
    blog: { title: "Blog A&C", subtitle: "Análisis, tendencias y noticias del sector inmobiliario.", readMore: "Leer Artículo" },
    contact: { 
      title: "Contáctanos", 
      subtitle: "Estamos listos para asesorarte.",
      call: "Llámanos", 
      write: "Escríbenos", 
      name: "Nombre Completo", 
      phone: "Teléfono", 
      email: "Correo Electrónico", 
      msg: "Mensaje", 
      send: "Enviar Mensaje" 
    },
    footer: { contact: "Contáctanos", rights: "Todos los derechos reservados.", testimonials: "Testimonios" },
    about: { 
      story: "Nuestra Historia", 
      mission: "Más que intermediarios, somos tus aliados patrimoniales.", 
      founderRole1: "Cofundadora & Gerente Comercial", 
      founderRole2: "Cofundador & Gerente Administrativo" 
    },
    dashboard: {
      new: "Nuevo Inmueble",
      inventory: "Inventario",
      private: "Datos Privados",
      financial: "Financiero",
      publish: "Publicar Inmueble",
      saving: "Guardando...",
      upload: "Cargar Fotos"
    }
  },
  EN: {
    nav: { home: "Home", properties: "Properties", services: "Services", blog: "Blog", about: "About", contact: "Contact" },
    featured: { title: "Featured Properties", viewAll: "View All", goldBadge: "Golden Opportunity", badge: "AYC Favorite" },
    properties: { details: "View Details", search: "Search Properties", filters: "Filters", noResults: "No properties found.", viewAll: "View all" },
    services: { 
      subtitle: "Our Services", title: "Integral Solutions", 
      legal: "Legal Advice", btnLegal: "Consult",
      media: "Media Production", btnMedia: "View Portfolio",
      appraisal: "Commercial Appraisals", btnAppraisal: "Get Quote",
      legalTitle: "Real Estate Shielding", legalDesc: "Your assets are sacred. Do not sign without review.",
      appraisalTitle: "Certified Appraisals", appraisalDesc: "IFRS and RAA Standards. Valid for banks."
    },
    blog: { title: "A&C Blog", subtitle: "Analysis, trends, and real estate news.", readMore: "Read Article" },
    contact: { 
      title: "Contact Us", 
      subtitle: "We are ready to assist you.",
      call: "Call Us", 
      write: "Email Us", 
      name: "Full Name", 
      phone: "Phone", 
      email: "Email Address", 
      msg: "Message", 
      send: "Send Message" 
    },
    footer: { contact: "Contact Us", rights: "All rights reserved.", testimonials: "Testimonials" },
    about: { 
      story: "Our Story", 
      mission: "More than intermediaries, we are your equity allies.", 
      founderRole1: "Co-Founder & Sales Manager", 
      founderRole2: "Co-Founder & Admin Manager" 
    },
    dashboard: {
      new: "New Property",
      inventory: "Inventory",
      private: "Private Data",
      financial: "Financials",
      publish: "Publish Property",
      saving: "Saving...",
      upload: "Upload Photos"
    }
  }
};

const LanguageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<"ES" | "EN">("ES");
  const toggleLanguage = () => setLanguage(prev => prev === "ES" ? "EN" : "ES");

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);