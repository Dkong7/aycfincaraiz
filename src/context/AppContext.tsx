import React, { createContext, useContext, useState } from "react";

type Currency = "COP" | "USD";
type Lang = "ES" | "EN";

interface AppContextType {
  currency: Currency;
  lang: Lang;
  toggleLang: () => void;
  formatPrice: (priceCOP: number) => string;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>("COP");
  const [lang, setLang] = useState<Lang>("ES");
  const TRM = 4150; 

  const toggleLang = () => {
    const newLang = lang === "ES" ? "EN" : "ES";
    setLang(newLang);
    setCurrency(newLang === "EN" ? "USD" : "COP");
  };

  const formatPrice = (priceCOP: number) => {
    if (!priceCOP) return currency === "USD" ? "US 0" : "$ 0";
    if (currency === "USD") {
      return "US " + new Intl.NumberFormat("en-US", { style: "decimal", maximumFractionDigits: 0 }).format(priceCOP / TRM);
    }
    return "$ " + new Intl.NumberFormat("es-CO", { style: "decimal", maximumFractionDigits: 0 }).format(priceCOP);
  };

  const dictionary: Record<string, any> = {
    "ES": {
      // MENU
      nav_home: "INICIO",
      nav_services: "SERVICIOS",
      nav_blog: "BLOG",
      nav_about: "NOSOTROS",
      nav_contact: "CONTACTO",
      nav_properties: "INMUEBLES",
      
      // DROPDOWN Y KEYS FALTANTES
      srv_appraisals: "Avalúos Comerciales",
      srv_legal: "Asesoría Jurídica",
      srv_audio: "Producción Audiovisual",
      
      // BLOG
      blog_title: "Noticias del Sector",
      blog_empty: "No hay entradas publicadas aún.",
      read_more: "Leer Artículo",
      blog_home_title: "Actualidad Inmobiliaria",

      // HERO
      search_title: "BÚSQUEDA RÁPIDA",
      search_code: "Código A&C",
      search_btn: "BUSCAR",
      hero_btn: "VER DETALLES",
      
      // HOME GENERAL
      home_serv_title: "Soluciones Integrales 360°",
      serv_aval_title: "Avalúos Certificados",
      serv_aval_desc: "Valoraciones precisas bajo normativa NIIF y RAA.",
      serv_legal_title: "Blindaje Jurídico",
      serv_legal_desc: "Estudio de títulos y acompañamiento notarial.",
      serv_audio_title: "Marketing Audiovisual",
      serv_audio_desc: "Drones, recorridos 360° y producción 4K.",
      
      home_premium_title: "Selección A&C Premium",
      home_premium_desc: "Propiedades curadas por su alto potencial de valorización.",
      home_b2b_title: "Alianzas para Constructores",
      home_b2b_desc: "Potenciamos proyectos nuevos con estrategias comerciales dedicadas.",
      btn_more: "Ver Más",

      // FOOTER & DETALLES
      footer_desc: "Expertos en finca raíz en Bogotá y Cundinamarca.",
      footer_links: "Enlaces Rápidos",
      footer_contact: "Contacto",
      filter_title: "Filtrar Búsqueda",
      filter_type: "Tipo",
      filter_code: "Buscar por Código",
      filter_search: "Aplicar Filtros",
      det_price: "Precio",
      det_admin: "Admin",
      det_area: "Área",
      det_rooms: "Habs",
      det_baths: "Baños",
      det_features: "Características",
      det_desc: "Descripción",
      det_whatsapp: "Contactar Agente",
      founder_role1: "Founder",
      founder_role2: "Co-Founder"
    },
    "EN": {
      nav_home: "HOME",
      nav_services: "SERVICES",
      nav_blog: "BLOG",
      nav_about: "ABOUT US",
      nav_contact: "CONTACT",
      nav_properties: "PROPERTIES",
      
      srv_appraisals: "Appraisals",
      srv_legal: "Legal Advice",
      srv_audio: "Audiovisual",
      
      blog_title: "Industry News",
      blog_empty: "No posts available yet.",
      read_more: "Read Article",
      blog_home_title: "Market News",

      search_title: "QUICK SEARCH",
      search_code: "A&C Code",
      search_btn: "SEARCH",
      hero_btn: "VIEW DETAILS",
      
      home_serv_title: "360° Solutions",
      serv_aval_title: "Certified Appraisals",
      serv_aval_desc: "Precise valuations under IFRS and RAA standards.",
      serv_legal_title: "Legal Shielding",
      serv_legal_desc: "Title studies and notary accompaniment.",
      serv_audio_title: "Audiovisual Marketing",
      serv_audio_desc: "Drones, 360° tours and 4K production.",
      
      home_premium_title: "A&C Premium Selection",
      home_premium_desc: "Curated properties with high appreciation potential.",
      home_b2b_title: "Alliances for Builders",
      home_b2b_desc: "We boost new projects with dedicated strategies.",
      btn_more: "Learn More",
      
      footer_desc: "Real estate experts in Bogota.",
      footer_links: "Quick Links",
      footer_contact: "Contact",
      filter_title: "Filter Search",
      filter_type: "Type",
      filter_code: "Search by Code",
      filter_search: "Apply Filters",
      det_price: "Price",
      det_admin: "HOA",
      det_area: "Area",
      det_rooms: "Beds",
      det_baths: "Baths",
      det_features: "Amenities",
      det_desc: "Description",
      det_whatsapp: "Contact Agent",
      founder_role1: "Founder",
      founder_role2: "Co-Founder"
    }
  };

  const t = (key: string) => dictionary[lang][key] || key;

  return (
    <AppContext.Provider value={{ currency, lang, toggleLang, formatPrice, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
