import React, { createContext, useContext, useState } from "react";

// 1. DICCIONARIO ESTÁTICO (UI Fija)
const translations = {
  ES: {
    nav: { home: "Inicio", properties: "Inmuebles", services: "Servicios", blog: "Blog", about: "Nosotros", contact: "Contacto" },
    featured: { title: "Propiedades Destacadas", viewAll: "Ver Todas", goldBadge: "Oportunidad Dorada", badge: "Favorito AYC" },
    properties: { details: "Ver Detalles", search: "Buscar Propiedades", filters: "Filtros", noResults: "No encontramos inmuebles.", viewAll: "Ver todos" },
    services: { 
      subtitle: "Nuestros Servicios", title: "Soluciones Integrales", 
      
      // --- CLAVES PARA NAVBAR ---
      appraisal: "Avalúos",
      legal: "Jurídico",
      media: "Audiovisual",

      // --- AVALÚOS ---
      appraisalBadge: "Certificación R.A.A.",
      appraisalTitlePart1: "El valor real de",
      appraisalTitlePart2: "tu patrimonio.",
      appraisalDesc: "No dejes dinero sobre la mesa. Realizamos avalúos comerciales bajo norma NIIF y estándares del Registro Abierto de Avaluadores (RAA).",
      appraisalItems: ["Avalúos Comerciales", "Avalúos Hipotecarios", "Avalúos Corporativos (NIIF)", "Peritaje Judicial"],
      appraisalBtn: "Cotizar Avalúo",
      appraisalCard1Label: "Valorización",
      appraisalCard1Value: "Anual",
      appraisalCard2Label: "Certificado",
      appraisalCard2Value: "A.N.A. Vigente",

      // --- LEGAL ---
      legalBadge: "Seguridad Jurídica",
      legalTitlePart1: "Blindaje Inmobiliario",
      legalTitlePart2: "Total.",
      legalDesc: "Tu patrimonio es sagrado. No firmes promesas de compraventa ni contratos sin la revisión de nuestro equipo jurídico experto.",
      legalCard1Title: "Estudio de Títulos",
      legalCard1Desc: "Análisis de 20 años de tradición para descartar embargos y falsas tradiciones.",
      legalCard2Title: "Saneamiento Predial",
      legalCard2Desc: "Corregimos áreas, linderos y cabidas. Resolvemos problemas sucesorales.",
      legalCard3Title: "Contratos Seguros",
      legalCard3Desc: "Redacción y revisión de promesas de compraventa con cláusulas de protección.",
      legalBtn: "Consultar Caso",

      // --- MEDIA ---
      mediaBadge: "Marketing Inmobiliario",
      mediaTitlePart1: "El valor entra",
      mediaTitlePart2: "por los ojos.",
      mediaDesc: "No grabamos recorridos; producimos narrativa de ventas. Elevamos el estatus de su activo ante inversores internacionales.",
      mediaItem1: "Drones 4K FPV",
      mediaItem2: "VR 360 Tours",
      mediaBtn: "Solicitar Producción",

      // --- LEGACY KEYS ---
      btnLegal: "Consultar", btnMedia: "Ver Portafolio", legalTitle: "Blindaje Inmobiliario", appraisalTitle: "Avalúos Certificados", appraisalDescLegacy: "Norma NIIF y RAA."
    },
    blog: { title: "Blog A&C", subtitle: "Análisis, tendencias y noticias del sector inmobiliario.", readMore: "Leer Artículo" },
    contact: { 
      title: "Contáctanos", subtitle: "Estamos listos para asesorarte.",
      call: "Llámanos", write: "Escríbenos", name: "Nombre Completo", 
      phone: "Teléfono", email: "Correo Electrónico", msg: "Mensaje", send: "Enviar Mensaje" 
    },
    about: { 
      story: "Nuestra Historia", mission: "Más que intermediarios, somos tus aliados patrimoniales.", 
      founderRole1: "Cofundadora & Gerente Comercial", founderRole2: "Cofundador & Gerente Administrativo" 
    },
    dashboard: {
      new: "Nuevo Inmueble", inventory: "Inventario", private: "Datos Privados",
      financial: "Financiero", publish: "Publicar Inmueble", saving: "Guardando...", upload: "Cargar Fotos"
    },
    footer: { 
        aboutTitle: "Sobre A&C",
        aboutText: "Somos una firma inmobiliaria boutique especializada en el mercado de Bogotá y La Sabana. Fusionamos tecnología, asesoría jurídica y marketing de alto nivel.",
        contactTitle: "Información de Contacto",
        location: "Bogotá, D.C. - Cundinamarca",
        phone: "+57 300 123 4567", // Ajustar número real
        email: "gerencia@aycfincaraiz.com", // Ajustar correo real
        testimonialsTitle: "Lo que dicen nuestros clientes",
        rights: "Todos los derechos reservados.",
        developedBy: "desarrollado por",
        testimonialsList: [
            { text: "Gracias a A&C logramos vender nuestra casa en tiempo récord y al precio justo. La asesoría jurídica fue impecable.", author: "Familia Restrepo", role: "Vendedores" },
            { text: "El nivel de detalle en los avalúos y la producción audiovisual es algo que no había visto en otras inmobiliarias.", author: "Carlos M.", role: "Inversionista" },
            { text: "Profesionalismo puro. Me sentí acompañada y segura durante todo el proceso de compra de mi apartamento.", author: "Andrea L.", role: "Compradora" }
        ]
    }
  },
  EN: {
    nav: { home: "Home", properties: "Properties", services: "Services", blog: "Blog", about: "About", contact: "Contact" },
    featured: { title: "Featured Properties", viewAll: "View All", goldBadge: "Golden Opportunity", badge: "AYC Favorite" },
    properties: { details: "View Details", search: "Search Properties", filters: "Filters", noResults: "No properties found.", viewAll: "View all" },
    services: { 
      subtitle: "Our Services", title: "Integral Solutions", 
      appraisal: "Appraisals", legal: "Legal", media: "Media",
      appraisalBadge: "R.A.A. Certification",
      appraisalTitlePart1: "The real value of",
      appraisalTitlePart2: "your assets.",
      appraisalDesc: "Don't leave money on the table. We perform commercial appraisals under IFRS standards and the Open Appraisers Registry (RAA).",
      appraisalItems: ["Commercial Appraisals", "Mortgage Appraisals", "Corporate Appraisals (IFRS)", "Judicial Expertise"],
      appraisalBtn: "Get Appraisal Quote",
      appraisalCard1Label: "Appreciation",
      appraisalCard1Value: "Yearly",
      appraisalCard2Label: "Certified",
      appraisalCard2Value: "Current A.N.A.",
      legalBadge: "Legal Security",
      legalTitlePart1: "Real Estate",
      legalTitlePart2: "Shielding.",
      legalDesc: "Your assets are sacred. Do not sign promissory sale agreements or contracts without the review of our legal team expert.",
      legalCard1Title: "Title Study",
      legalCard1Desc: "Analysis of 20 years of history to rule out liens, false traditions, or inheritance issues.",
      legalCard2Title: "Property Rectification",
      legalCard2Desc: "We correct areas, boundaries, and capacities. We resolve title defects and complex successions.",
      legalCard3Title: "Secure Contracts",
      legalCard3Desc: "Drafting and review of promissory sale agreements and lease contracts with protection clauses.",
      legalBtn: "Consult Case",
      mediaBadge: "Real Estate Marketing",
      mediaTitlePart1: "Value enters",
      mediaTitlePart2: "through the eyes.",
      mediaDesc: "We don't just record tours; we produce sales narratives. We elevate your asset's status to international investors.",
      mediaItem1: "4K FPV Drones",
      mediaItem2: "VR 360 Tours",
      mediaBtn: "Request Production",
      btnLegal: "Consult", btnMedia: "View Portfolio", legalTitle: "Real Estate Shielding", appraisalTitle: "Certified Appraisals", appraisalDescLegacy: "IFRS Standards."
    },
    blog: { title: "A&C Blog", subtitle: "Analysis, trends, and real estate news.", readMore: "Read Article" },
    contact: { 
      title: "Contact Us", subtitle: "We are ready to assist you.",
      call: "Call Us", write: "Email Us", name: "Full Name", 
      phone: "Phone", email: "Email Address", msg: "Message", send: "Send Message" 
    },
    about: { 
      story: "Our Story", mission: "More than intermediaries, we are your equity allies.", 
      founderRole1: "Co-Founder & Sales Manager", founderRole2: "Co-Founder & Admin Manager" 
    },
    dashboard: {
      new: "New Property", inventory: "Inventory", private: "Private Data",
      financial: "Financials", publish: "Publish Property", saving: "Saving...", upload: "Upload Photos"
    },
    footer: { 
        aboutTitle: "About A&C",
        aboutText: "We are a boutique real estate firm specializing in the Bogotá and La Sabana market. We merge technology, legal advice, and high-level marketing.",
        contactTitle: "Contact Information",
        location: "Bogotá, D.C. - Cundinamarca",
        phone: "+57 300 123 4567",
        email: "gerencia@aycfincaraiz.com",
        testimonialsTitle: "What our clients say",
        rights: "All rights reserved.",
        developedBy: "developed by",
        testimonialsList: [
            { text: "Thanks to A&C we managed to sell our house in record time and at a fair price. The legal advice was impeccable.", author: "Restrepo Family", role: "Sellers" },
            { text: "The level of detail in the appraisals and audiovisual production is something I hadn't seen in other agencies.", author: "Carlos M.", role: "Investor" },
            { text: "Pure professionalism. I felt supported and safe during the entire process of buying my apartment.", author: "Andrea L.", role: "Buyer" }
        ]
    }
  }
};

// 2. DICCIONARIO DINÁMICO (Sin cambios, mantener el tuyo completo)
const dynamicKeywords: Record<string, string> = {
    "Oportunidad Dorada": "Golden Opportunity",
    "Precio de Venta": "Sale Price",
    "VER EXCLUSIVA": "VIEW EXCLUSIVE",
    "Favoritos AYC": "AYC Favorites",
    "Marketing Inmobiliario": "Real Estate Marketing",
    "El valor entra": "Value enters",
    "por los ojos.": "through the eyes.",
    "No grabamos recorridos; producimos narrativa de ventas. Elevamos el estatus de su activo ante inversores internacionales con calidad 4K cinematográfica.": "We don't just record tours; we produce sales narratives. We elevate your asset's status to international investors with 4K cinematic quality.",
    "Drones 4K FPV": "4K FPV Drones",
    "VR 360 Tours": "VR 360 Tours",
    "Solicitar Producción": "Request Production",
    "Certificación R.A.A.": "R.A.A. Certification", 
    "El valor real de": "The real value of", 
    "tu patrimonio.": "your assets.",
    "No dejes dinero sobre la mesa. Realizamos avalúos comerciales bajo norma": "Don't leave money on the table. We perform commercial appraisals under",
    "y estándares del": "and standards of the", 
    "Registro Abierto de Avaluadores (RAA)": "Open Appraisers Registry (RAA)",
    "Informes técnicos válidos para bancos, aseguradoras y procesos judiciales en Bogotá y La Sabana.": "Technical reports valid for banks, insurers, and legal proceedings in Bogotá and La Sabana.",
    "Avalúos Comerciales (Venta/Arriendo)": "Commercial Appraisals (Sale/Rent)",
    "Avalúos Comerciales": "Commercial Appraisals", 
    "Avalúos Hipotecarios": "Mortgage Appraisals",
    "Avalúos Corporativos (NIIF)": "Corporate Appraisals (IFRS)", 
    "Peritaje Judicial": "Judicial Expertise", 
    "Cotizar Avalúo": "Quote Appraisal",
    "Valorización": "Appreciation", 
    "Anual": "Yearly",
    "Certificado": "Certified", 
    "A.N.A. Vigente": "Current A.N.A.",
    "Seguridad Jurídica": "Legal Security", 
    "Blindaje Inmobiliario": "Real Estate Shielding", 
    "Total.": "Total.",
    "Tu patrimonio es sagrado. No firmes promesas de compraventa ni contratos sin la revisión de nuestro equipo jurídico experto en derecho inmobiliario.": "Your assets are sacred. Do not sign promissory sale agreements or contracts without the review of our legal team expert in real estate law.",
    "Estudio de Títulos": "Title Study", 
    "Análisis de 20 años de tradición para descartar embargos y falsas tradiciones.": "Analysis of 20 years of tradition to rule out liens and false traditions.",
    "Saneamiento Predial": "Property Sanitation", 
    "Corregimos áreas, linderos y cabidas. Resolvemos problemas sucesorales.": "We correct areas, boundaries, and capacities. We resolve inheritance issues.",
    "Consultar Caso": "Consult Case", 
    "Contratos Seguros": "Secure Contracts",
    "Redacción y revisión de promesas de compraventa con cláusulas de protección.": "Drafting and review of promissory sale agreements with protection clauses.",
    "Bonita": "Beautiful", "Bonito": "Beautiful",
    "Hermosa": "Beautiful", "Hermoso": "Beautiful",
    "Increible": "Incredible", "Increíble": "Incredible",
    "Espectacular": "Spectacular", 
    "Gran": "Great", "Grande": "Big",
    "Lindo": "Nice", "Linda": "Nice",
    "Moderno": "Modern", "Moderna": "Modern",
    "Iluminado": "Bright", "Iluminada": "Bright",
    "Amplio": "Spacious", "Amplia": "Spacious",
    "Remodelado": "Remodeled", "Remodelada": "Remodeled",
    "Casa": "House", "Apartamento": "Apartment", "Bodega": "Warehouse", "Oficina": "Office",
    "Local": "Retail Store", "Lote": "Lot", "Terreno": "Land", "Finca": "Farm", "Rural": "Rural",
    "Venta": "Sale", "Arriendo": "Rent",
    "Ubicado": "Located", "Ubicada": "Located", "En": "In", "Con": "With",
    "El": "The", "La": "The", "Los": "The", "Las": "The", "Un": "A", "Una": "A",
    "Para": "For", "Por": "By",
    "Excelente": "Excellent", "Oportunidad": "Opportunity", "Inversión": "Investment",
    "Sector": "Sector", "Cerca": "Near", "Centro Comercial": "Mall", "Parque": "Park",
    "Vista": "View", "Exterior": "Exterior", "Interior": "Interior",
    "Estrenar": "Brand New",
    "Habitaciones": "Bedrooms", "Baños": "Bathrooms", "Garajes": "Parking",
    "Cocina": "Kitchen", "Integral": "Integral", "Zona": "Zone", "Lavandería": "Laundry",
    "Estudio": "Study", "Terraza": "Terrace", "Balcón": "Balcony",
    "Conjunto": "Complex", "Cerrado": "Gated", "Vigilancia": "Security", "Administración": "HOA Fee", "Precio": "Price"
};

type LanguageType = "ES" | "EN";
interface LanguageContextType {
  language: LanguageType;
  toggleLanguage: () => void;
  t: typeof translations["ES"];
  translateDynamic: (text: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>("ES");

  const toggleLanguage = () => {
    setLanguage(prev => prev === "ES" ? "EN" : "ES");
  };

  const translateDynamic = (text: string) => {
    if (!text) return "";
    if (language === "ES") return text; 

    let translatedText = text;
    const sortedKeywords = Object.entries(dynamicKeywords).sort((a, b) => b[0].length - a[0].length);

    sortedKeywords.forEach(([es, en]) => {
        const escapedEs = es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const isPhrase = es.trim().includes(" ");
        const regexPattern = isPhrase ? escapedEs : `\\b${escapedEs}\\b`;
        const regex = new RegExp(regexPattern, 'gi');

        translatedText = translatedText.replace(regex, (match) => {
            if (match[0] === match[0].toUpperCase() && en[0]) {
                return en.charAt(0).toUpperCase() + en.slice(1);
            }
            return en.toLowerCase();
        });
    });

    return translatedText;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language], translateDynamic }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  return context;
};