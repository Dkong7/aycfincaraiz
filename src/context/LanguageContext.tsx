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

      // --- AVALÚOS (BÁSICO & PÁGINA) ---
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
      appraisalWhyTitle: "¿Por qué un Avalúo Certificado?",
      appraisalWhy1T: "Respaldo Legal", appraisalWhy1D: "Firma válida ante notarias, bancos y juzgados.",
      appraisalWhy2T: "Norma NIIF", appraisalWhy2D: "Estándares internacionales de información financiera.",
      appraisalWhy3T: "Mercado Real", appraisalWhy3D: "Análisis comparativo con Big Data inmobiliaria.",
      appraisalProcessTitle: "Nuestro Proceso Técnico",
      appraisalStep1: "Visita de Inspección", appraisalStep1Desc: "Levantamiento arquitectónico y fotográfico detallado.",
      appraisalStep2: "Investigación Jurídica", appraisalStep2Desc: "Análisis de tradición, libertad y normativa urbana.",
      appraisalStep3: "Cálculo y Entrega", appraisalStep3Desc: "Informe final digital e impreso con firma RAA vigente.",
      appraisalFinalCTA: "¿Listo para conocer el valor real?",
      appraisalFinalBtn: "Hablar con un Avaluador",

      // --- LEGAL (GENERAL & PÁGINA) ---
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
      legalHeroStat1: "+500", legalHeroStat1Label: "Títulos Aprobados",
      legalHeroStat2: "100%", legalHeroStat2Label: "Casos de Éxito",
      legalExpertiseTitle: "Áreas de Práctica Inmobiliaria",
      legalExp1T: "Derecho Urbanístico", legalExp1D: "Licencias de construcción, usos del suelo y normativa POT.",
      legalExp2T: "Propiedad Horizontal", legalExp2D: "Reglamentos, impugnación de actas y convivencia.",
      legalExp3T: "Sucesiones y Divorcios", legalExp3D: "Liquidación de sociedad conyugal y adjudicación de inmuebles.",
      legalProcessTitle: "Ruta de Blindaje",
      legalStep1: "Diagnóstico Jurídico", legalStep1Desc: "Revisión exhaustiva de folio de matrícula y antecedentes.",
      legalStep2: "Estrategia Legal", legalStep2Desc: "Diseño contractual o corrección de vicios en la tradición.",
      legalStep3: "Ejecución y Cierre", legalStep3Desc: "Acompañamiento en notaría hasta el registro final.",
      legalFinalCTA: "Protege tu inversión hoy.",
      legalFinalBtn: "Agendar Consulta Jurídica",

      // --- MEDIA (GENERAL & PÁGINA NUEVA) ---
      mediaBadge: "Cinema A&C", 
      mediaTitlePart1: "Narrativa Visual",
      mediaTitlePart2: "que vende.",
      mediaDesc: "No solo grabamos videos; creamos piezas cinematográficas que despiertan emociones. Utilizamos tecnología FPV y cámaras de cine para elevar el estatus de tu propiedad.",
      mediaItem1: "Drones 4K FPV",
      mediaItem2: "VR 360 Tours",
      mediaBtn: "Solicitar Producción",
      mediaStat1: "+200", mediaStat1Label: "Producciones",
      mediaStat2: "3X", mediaStat2Label: "Venta más rápida",
      mediaFeat1T: "Drones 4K FPV", mediaFeat1D: "Vuelos fluidos por el interior, simulando la vista humana.",
      mediaFeat2T: "Recorridos VR 360°", mediaFeat2D: "Tours virtuales inmersivos compatibles con gafas de realidad virtual.",
      mediaFeat3T: "Color Grading Cine", mediaFeat3D: "Corrección de color profesional para resaltar la atmósfera.",
      mediaFeat4T: "Diseño Sonoro", mediaFeat4D: "Ambietación auditiva que conecta emocionalmente.",
      mediaFinalCTA: "Eleva el estatus de tu inmueble.",
      mediaFinalBtn: "Agendar Producción",

      // --- LEGACY KEYS ---
      btnLegal: "Consultar", btnMedia: "Ver Portafolio", legalTitle: "Blindaje Inmobiliario", appraisalTitle: "Avalúos Certificados", appraisalDescLegacy: "Norma NIIF y RAA."
    },
    blog: { title: "Blog A&C", subtitle: "Análisis, tendencias y noticias del sector inmobiliario.", readMore: "Leer Artículo" },
    contact: { 
      title: "Contáctanos", subtitle: "Estamos listos para asesorarte.",
      call: "Llámanos", write: "Escríbenos", name: "Nombre Completo", 
      phone: "Teléfono", email: "Correo Electrónico", msg: "Mensaje", send: "Enviar Mensaje",
      // --- NUEVAS LLAVES SEGURIDAD BLUE HAT ---
      secureBadge: "Canal Seguro",
      securityNote: "Protegido por AyC Shield v1.0",
      heroDesc: "Estamos listos para escucharte. Ya sea para valorar tu propiedad, buscar tu nuevo hogar o estructurar un negocio inmobiliario, nuestro equipo está a tu disposición.",
      btnSending: "Enviando Seguro" // <--- AGREGADA
    },
    
    // --- ABOUT ES (CORREGIDO Y COMPLETADO) ---
    about: { 
      heroText: "Más de 15 años construyendo confianza y elevando el estándar inmobiliario en Bogotá y la Sabana.",
      storyTitle: "Nuestra Historia", 
      storyHeadline: "Más que intermediarios, somos tus aliados patrimoniales.", 
      storyDesc: "A&C Finca Raíz nació con una misión clara: transformar la experiencia inmobiliaria a través de un servicio ético, transparente y profundamente humano. Entendemos que detrás de cada inmueble hay sueños, esfuerzos y proyectos de vida.",
      statsClients: "Clientes Felices", statsExp: "Años de Experiencia", statsSales: "En Ventas",
      teamTitle: "Nuestro Liderazgo",
      founderRole1: "Cofundadora & Gerente Comercial", 
      founderDesc1: "Visionaria y estratega. Su enfoque en las relaciones humanas y la excelencia en el servicio ha sido el pilar fundamental del crecimiento y la reputación de A&C.",
      founderRole2: "Cofundador & Gerente Administrativo",
      founderDesc2: "Administrador y Avaluador certificado (RAA). Aporta un rigor técnico y analítico invaluable, asegurando la solidez y transparencia en cada operación.",
      valuesTitle: "Nuestros Pilares",
      val1T: "Integridad Radical", val1D: "La verdad por delante, siempre. Sin letra menuda.",
      val2T: "Excelencia Técnica", val2D: "Avalúos precisos y contratos blindados.",
      val3T: "Empatía Real", val3D: "Nos ponemos en tus zapatos en cada decisión."
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
        phone: "+57 300 123 4567", 
        email: "gerencia@aycfincaraiz.com",
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
      appraisalWhyTitle: "Why a Certified Appraisal?",
      appraisalWhy1T: "Legal Backing", appraisalWhy1D: "Signature valid before notaries, banks, and courts.",
      appraisalWhy2T: "IFRS Standards", appraisalWhy2D: "International financial reporting standards.",
      appraisalWhy3T: "Real Market", appraisalWhy3D: "Comparative analysis with Real Estate Big Data.",
      appraisalProcessTitle: "Our Technical Process",
      appraisalStep1: "Inspection Visit", appraisalStep1Desc: "Detailed architectural and photographic survey.",
      appraisalStep2: "Legal Research", appraisalStep2Desc: "Analysis of tradition, freedom, and urban regulations.",
      appraisalStep3: "Delivery", appraisalStep3Desc: "Final digital and printed report with valid RAA signature.",
      appraisalFinalCTA: "Ready to know the real value?",
      appraisalFinalBtn: "Talk to an Appraiser",

      legalBadge: "Legal Security",
      legalTitlePart1: "Real Estate",
      legalTitlePart2: "Shielding.",
      legalDesc: "Your assets are sacred. Do not sign without review.",
      legalCard1Title: "Title Study",
      legalCard1Desc: "Analysis of 20 years of history to rule out liens, false traditions, or inheritance issues.",
      legalCard2Title: "Property Rectification",
      legalCard2Desc: "We correct areas, boundaries, and capacities. We resolve title defects and complex successions.",
      legalCard3Title: "Secure Contracts",
      legalCard3Desc: "Drafting and review of promissory sale agreements and lease contracts with protection clauses.",
      legalBtn: "Consult Case",
      legalHeroStat1: "+500", legalHeroStat1Label: "Approved Titles",
      legalHeroStat2: "100%", legalHeroStat2Label: "Success Cases",
      legalExpertiseTitle: "Real Estate Practice Areas",
      legalExp1T: "Urban Law", legalExp1D: "Construction licenses, land use, and POT.",
      legalExp2T: "Horizontal Property", legalExp2D: "Regulations and meeting challenges.",
      legalExp3T: "Successions & Divorces", legalExp3D: "Liquidation of marital society.",
      legalProcessTitle: "Shielding Route",
      legalStep1: "Legal Diagnosis", legalStep1Desc: "Exhaustive review of the registration certificate.",
      legalStep2: "Legal Strategy", legalStep2Desc: "Contractual design or correction of defects.",
      legalStep3: "Execution & Closing", legalStep3Desc: "Support in notary until final registration.",
      legalFinalCTA: "Protect your investment today.",
      legalFinalBtn: "Schedule Legal Consultation",

      mediaBadge: "Cinema A&C",
      mediaTitlePart1: "Visual Narrative",
      mediaTitlePart2: "that sells.",
      mediaDesc: "We don't just record videos; we create cinematic pieces that evoke emotion. Using FPV technology and cinema cameras to elevate your property's status.",
      mediaItem1: "4K FPV Drones",
      mediaItem2: "VR 360 Tours",
      mediaBtn: "Request Production",
      mediaStat1: "+200", mediaStat1Label: "Productions",
      mediaStat2: "3X", mediaStat2Label: "Faster Sales",
      mediaFeat1T: "4K FPV Drones", mediaFeat1D: "Fluid indoor flights simulating human vision.",
      mediaFeat2T: "VR 360 Tours", mediaFeat2D: "Virtual reality compatible immersive experiences.",
      mediaFeat3T: "Cinema Grading", mediaFeat3D: "Professional color correction to highlight atmosphere.",
      mediaFeat4T: "Sound Design", mediaFeat4D: "Audio ambiance that connects emotionally.",
      mediaFinalCTA: "Elevate your property's status.",
      mediaFinalBtn: "Book Production",

      btnLegal: "Consult", btnMedia: "View Portfolio", legalTitle: "Real Estate Shielding", appraisalTitle: "Certified Appraisals", appraisalDescLegacy: "IFRS Standards."
    },
    blog: { title: "A&C Blog", subtitle: "Analysis, trends, and real estate news.", readMore: "Read Article" },
    contact: { 
      title: "Contact Us", subtitle: "We are ready to assist you.",
      call: "Call Us", write: "Email Us", name: "Full Name", 
      phone: "Phone", email: "Email Address", msg: "Message", send: "Send Message",
      // --- NEW BLUE HAT KEYS ---
      secureBadge: "Secure Channel",
      securityNote: "Protected by AyC Shield v1.0",
      heroDesc: "We are ready to hear from you. Whether to value your property, find your new home, or structure a real estate deal, our team is at your disposal.",
      btnSending: "Sending Securely" // <--- ADDED
    },
    
    // --- ABOUT EN (YA ESTABA COMPLETO) ---
    about: { 
      heroText: "Over 15 years building trust and raising real estate standards in Bogotá and La Sabana.",
      storyTitle: "Our Story", 
      storyHeadline: "More than intermediaries, we are your equity allies.", 
      storyDesc: "A&C Finca Raíz was born with a clear mission: to transform the real estate experience through ethical, transparent, and deeply human service.",
      statsClients: "Happy Clients", statsExp: "Years of Experience", statsSales: "In Sales",
      teamTitle: "Our Leadership",
      founderRole1: "Co-Founder & Sales Manager", 
      founderDesc1: "Visionary and strategist. Her focus on human relationships and service excellence has been the cornerstone of A&C's growth.",
      founderRole2: "Co-Founder & Admin Manager",
      founderDesc2: "Administrator and Certified Appraiser (RAA). Brings invaluable technical and analytical rigor, ensuring solidity and transparency.",
      valuesTitle: "Our Pillars",
      val1T: "Radical Integrity", val1D: "Truth comes first, always. No fine print.",
      val2T: "Technical Excellence", val2D: "Precise appraisals and armored contracts.",
      val3T: "Real Empathy", val3D: "We put ourselves in your shoes for every decision."
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
            { text: "Thanks to A&C we managed to sell our house in record time.", author: "Restrepo Family", role: "Sellers" },
            { text: "The level of detail in the appraisals is incredible.", author: "Carlos M.", role: "Investor" },
            { text: "Pure professionalism.", author: "Andrea L.", role: "Buyer" }
        ]
    }
  }
};

// 2. DICCIONARIO DINÁMICO (Sin cambios)
const dynamicKeywords: Record<string, string> = {
    "Oportunidad Dorada": "Golden Opportunity", "Precio de Venta": "Sale Price", "VER EXCLUSIVA": "VIEW EXCLUSIVE", "Favoritos AYC": "AYC Favorites",
    "Marketing Inmobiliario": "Real Estate Marketing", "El valor entra": "Value enters", "por los ojos.": "through the eyes.",
    "No grabamos recorridos; producimos narrativa de ventas. Elevamos el estatus de su activo ante inversores internacionales con calidad 4K cinematográfica.": "We don't just record tours; we produce sales narratives. We elevate your asset's status to international investors with 4K cinematic quality.",
    "Drones 4K FPV": "4K FPV Drones", "VR 360 Tours": "VR 360 Tours", "Solicitar Producción": "Request Production",
    "Certificación R.A.A.": "R.A.A. Certification", "El valor real de": "The real value of", "tu patrimonio.": "your assets.",
    "No dejes dinero sobre la mesa. Realizamos avalúos comerciales bajo norma": "Don't leave money on the table. We perform commercial appraisals under",
    "y estándares del": "and standards of the", "Registro Abierto de Avaluadores (RAA)": "Open Appraisers Registry (RAA)",
    "Informes técnicos válidos para bancos, aseguradoras y procesos judiciales en Bogotá y La Sabana.": "Technical reports valid for banks, insurers, and legal proceedings in Bogotá and La Sabana.",
    "Avalúos Comerciales (Venta/Arriendo)": "Commercial Appraisals (Sale/Rent)", "Avalúos Comerciales": "Commercial Appraisals", "Avalúos Hipotecarios": "Mortgage Appraisals", "Avalúos Corporativos (NIIF)": "Corporate Appraisals (IFRS)", "Peritaje Judicial": "Judicial Expertise", "Cotizar Avalúo": "Quote Appraisal", "Valorización": "Appreciation", "Anual": "Yearly", "Certificado": "Certified", "A.N.A. Vigente": "Current A.N.A.",
    "Seguridad Jurídica": "Legal Security", "Blindaje Inmobiliario": "Real Estate Shielding", "Total.": "Total.", "Tu patrimonio es sagrado. No firmes promesas de compraventa ni contratos sin la revisión de nuestro equipo jurídico experto en derecho inmobiliario.": "Your assets are sacred. Do not sign promissory sale agreements or contracts without the review of our legal team expert in real estate law.",
    "Estudio de Títulos": "Title Study", "Análisis de 20 años de tradición para descartar embargos y falsas tradiciones.": "Analysis of 20 years of tradition to rule out liens and false traditions.", "Saneamiento Predial": "Property Sanitation", "Corregimos áreas, linderos y cabidas. Resolvemos problemas sucesorales.": "We correct areas, boundaries, and capacities. We resolve inheritance issues.", "Consultar Caso": "Consult Case", "Contratos Seguros": "Secure Contracts", "Redacción y revisión de promesas de compraventa con cláusulas de protección.": "Drafting and review of promissory sale agreements with protection clauses.",
    "Bonita": "Beautiful", "Bonito": "Beautiful", "Hermosa": "Beautiful", "Hermoso": "Beautiful", "Increible": "Incredible", "Increíble": "Incredible", "Espectacular": "Spectacular", "Gran": "Great", "Grande": "Big", "Lindo": "Nice", "Linda": "Nice", "Moderno": "Modern", "Moderna": "Modern", "Iluminado": "Bright", "Iluminada": "Bright", "Amplio": "Spacious", "Amplia": "Spacious", "Remodelado": "Remodeled", "Remodelada": "Remodeled",
    "Casa": "House", "Apartamento": "Apartment", "Bodega": "Warehouse", "Oficina": "Office", "Local": "Retail Store", "Lote": "Lot", "Terreno": "Land", "Finca": "Farm", "Rural": "Rural", "Venta": "Sale", "Arriendo": "Rent", "Ubicado": "Located", "Ubicada": "Located", "En": "In", "Con": "With", "El": "The", "La": "The", "Los": "The", "Las": "The", "Un": "A", "Una": "A", "Para": "For", "Por": "By", "Excelente": "Excellent", "Oportunidad": "Opportunity", "Inversión": "Investment", "Sector": "Sector", "Cerca": "Near", "Centro Comercial": "Mall", "Parque": "Park", "Vista": "View", "Exterior": "Exterior", "Interior": "Interior", "Estrenar": "Brand New",
    "Habitaciones": "Bedrooms", "Baños": "Bathrooms", "Garajes": "Parking", "Cocina": "Kitchen", "Integral": "Integral", "Zona": "Zone", "Lavandería": "Laundry", "Estudio": "Study", "Terraza": "Terrace", "Balcón": "Balcony", "Conjunto": "Complex", "Cerrado": "Gated", "Vigilancia": "Security", "Administración": "HOA Fee", "Precio": "Price"
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
            if (match[0] === match[0].toUpperCase() && en[0]) return en.charAt(0).toUpperCase() + en.slice(1);
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