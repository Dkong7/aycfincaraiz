import React, { createContext, useContext, useState, ReactNode } from "react";

// --- TIPOS ---
type Lang = "ES" | "EN";

interface AppContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;        // Para textos fijos (Navbar, Botones)
  translateDynamic: (text: string) => string; // Para textos de Base de Datos (Títulos, Descripciones)
  currency: "COP" | "USD";
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ==========================================
// 1. DICCIONARIO MAESTRO (TEXTOS FIJOS UI)
// ==========================================
const translations: Record<string, Record<string, string>> = {
  ES: {
    opportunity_corona: "Oportunidad Corona",
    // NAVBAR
    nav_home: "Inicio", nav_properties: "Inmuebles", nav_services: "Servicios", nav_blog: "Blog", nav_about: "Nosotros", nav_contact: "Contacto",
    // SERVICIOS MENÚ
    srv_appraisals: "Avalúos Certificados", srv_legal: "Jurídico Inmobiliario", srv_audio: "Marketing Audiovisual",
    // HERO
    hero_btn: "Ver Detalles", feat_title: "Propiedades Destacadas", view_all: "Ver todas",
    // AVALÚOS
    appraisal_badge: "Certificado RAA", appraisal_title_1: "Avalúos", appraisal_title_2: "Comerciales",
    appraisal_desc: "Determinamos el valor real de su inmueble con precisión técnica, respaldo legal y certificación ante la Lonja de Propiedad Raíz.",
    appraisal_btn: "Solicitar Cotización", appraisal_why_title: "¿Por qué con nosotros?",
    why_1_t: "Precisión Técnica", why_1_d: "Metodologías valuatorias actualizadas según la normativa NIIF y ONAC.",
    why_2_t: "Validez Legal", why_2_d: "Documento idóneo para trámites notariales, bancarios o judiciales.",
    why_3_t: "Visión de Mercado", why_3_d: "Análisis comparativo real para no perder dinero en la venta.",
    process_title: "Nuestro Proceso", step_1_t: "Visita Técnica", step_1_d: "Inspección física detallada del inmueble y su entorno.",
    step_2_t: "Estudio de Mercado", step_2_d: "Investigación de ofertas y transacciones reales en la zona.",
    step_3_t: "Entrega de Informe", step_3_d: "Informe detallado con firma de perito avaluador RAA.",
    appraisal_final_cta: "Conocer el valor real es el primer paso para un negocio exitoso.", appraisal_final_btn: "Agendar Avalúo",
    // JURÍDICO
    legal_badge: "Blindaje Total", legal_title_1: "Seguridad", legal_title_2: "Jurídica Inmobiliaria",
    legal_desc: "Protegemos su patrimonio con estudios de títulos rigurosos, saneamiento predial y contratos blindados contra todo riesgo.", legal_btn: "Consultar Caso",
    legal_expertise_title: "Áreas de Práctica", legal_card_1_t: "Estudio de Títulos", legal_card_1_d: "Análisis profundo de la tradición del inmueble (20+ años) para detectar gravámenes, embargos o vicios ocultos.",
    legal_card_2_t: "Saneamiento Predial", legal_card_2_d: "Resolución de sucesiones ilíquidas, levantamiento de hipotecas, corrección de áreas y linderos.",
    legal_card_3_t: "Contratos Blindados", legal_card_3_d: "Elaboración de promesas de compraventa y contratos de arrendamiento con cláusulas de protección robustas.",
    legal_process_title: "Metodología Jurídica", legal_final_cta: "¿Su inmueble tiene problemas legales?", legal_final_btn: "Agendar Consulta Gratuita",
    // AUDIOVISUAL
    media_badge: "CINEMATOGRAFÍA 4K", media_title_1: "Marketing", media_title_2: "Audiovisual",
    media_desc: "Elevamos el nivel de su propiedad con producción de video de alta gama, drones y recorridos inmersivos.", media_final_cta: "¿Listo para impactar?", media_final_btn: "Agendar Producción",
    feat_1_t: "Drones Profesionales", feat_1_d: "Capturamos la magnitud de su propiedad y el entorno desde perspectivas únicas.",
    feat_2_t: "Tour Virtual 360", feat_2_d: "Permita que los clientes caminen por el inmueble desde cualquier lugar del mundo.",
    feat_3_t: "Storytelling Visual", feat_3_d: "No solo mostramos espacios, contamos la historia de vida que ofrece su propiedad.",
    feat_4_t: "Edición Premium", feat_4_d: "Colorización cinematográfica y diseño sonoro para maximizar el impacto emocional.",
    // ABOUT & CONTACT
    about_hero: "Más que una inmobiliaria, somos tus socios estratégicos en la construcción de patrimonio.", about_story_title: "NUESTRA HISTORIA", about_story_headline: "Excelencia inmobiliaria desde 2010",
    about_story_desc: "Fundada con la visión de transformar el mercado inmobiliario en Bogotá, AyC ha crecido basándose en la confianza, la transparencia y resultados comprobables.",
    about_stats_clients: "Clientes Felices", about_stats_exp: "Años Experiencia", about_stats_sales: "En Ventas",
    about_values_title: "Nuestros Valores", val1_title: "Integridad", val1_desc: "Actuamos con honestidad y transparencia en cada negocio.",
    val2_title: "Excelencia", val2_desc: "Buscamos superar las expectativas con resultados superiores.",
    val3_title: "Pasión", val3_desc: "Amamos lo que hacemos y se nota en cada detalle.",
    about_team_title: "Liderazgo", role_founder1: "Cofundadora & Gerente Comercial", desc_founder1: "Experta en negociación y relaciones públicas con más de 15 años liderando equipos comerciales.",
    role_founder2: "Cofundador & Director Jurídico", desc_founder2: "Abogado especialista en derecho inmobiliario y urbano. Garante de la seguridad jurídica.",
    contact_secure_badge: "Canal Seguro", contact_title: "CONTÁCTANOS", contact_hero_desc: "¿Buscas comprar, vender o un avalúo certificado? Estamos listos para asesorarte con total confidencialidad.",
    contact_call: "Llámanos", contact_write: "Escríbenos", form_title: "Escríbenos", form_name: "Nombre", form_phone: "Teléfono", form_email: "Email", form_msg: "Mensaje", form_btn: "ENVIAR MENSAJE", form_sending: "Enviando Seguro", security_note: "Protegido por AyC Shield v1.0",
    blog_title: "BLOG & NOTICIAS", blog_subtitle: "Actualidad inmobiliaria, tendencias y consejos expertos.", read_more: "Leer más",
    footer_about_title: "NOSOTROS", footer_contact_title: "CONTACTO",
    // SPECS & TIPOS
    habs: "Habitaciones", baths: "Baños", garages: "Garajes", area_built: "Área Construida",
    kitchen: "Cocina", stratum: "Estrato", admin: "Administración", antiquity: "Antigüedad", height: "Altura", years: "años",
    det_desc: "Descripción", det_features: "Características", det_admin: "Valor Administración", det_whatsapp: "Consultar por WhatsApp",
    Casa: "Casa", Apartamento: "Apartamento", Bodega: "Bodega", Oficina: "Oficina", Local: "Local", Lote: "Lote", Finca: "Finca", Rural: "Rural"
  },
  EN: {
    opportunity_corona: "Crown Opportunity",
    // NAVBAR
    nav_home: "Home", nav_properties: "Properties", nav_services: "Services", nav_blog: "Blog", nav_about: "About Us", nav_contact: "Contact",
    // SERVICES MENU
    srv_appraisals: "Certified Appraisals", srv_legal: "Legal Services", srv_audio: "Media Marketing",
    // HERO
    hero_btn: "View Details", feat_title: "Featured Properties", view_all: "View All",
    // APPRAISALS
    appraisal_badge: "Certified RAA", appraisal_title_1: "Commercial", appraisal_title_2: "Appraisals",
    appraisal_desc: "We determine the real value of your property with technical precision, legal backing, and official certification.",
    appraisal_btn: "Get a Quote", appraisal_why_title: "Why Choose Us?",
    why_1_t: "Technical Precision", why_1_d: "Valuation methodologies updated according to IFRS and ONAC regulations.",
    why_2_t: "Legal Validity", why_2_d: "Ideal document for notary, banking, or judicial procedures.",
    why_3_t: "Market Vision", why_3_d: "Real comparative analysis so you don't lose money on the sale.",
    process_title: "Our Process", step_1_t: "Technical Visit", step_1_d: "Detailed physical inspection of the property and its surroundings.",
    step_2_t: "Market Study", step_2_d: "Research of real offers and transactions in the area.",
    step_3_t: "Report Delivery", step_3_d: "Detailed report signed by an RAA certified appraiser.",
    appraisal_final_cta: "Knowing the real value is the first step to a successful deal.", appraisal_final_btn: "Schedule Appraisal",
    // LEGAL
    legal_badge: "Total Shield", legal_title_1: "Real Estate", legal_title_2: "Legal Security",
    legal_desc: "We protect your assets with rigorous title searches, property sanitation, and risk-proof contracts.", legal_btn: "Consult Case",
    legal_expertise_title: "Practice Areas", legal_card_1_t: "Title Search", legal_card_1_d: "Deep analysis of property tradition (20+ years) to detect liens, seizures, or hidden defects.",
    legal_card_2_t: "Property Sanitation", legal_card_2_d: "Resolution of illiquid successions, mortgage lifting, area and boundary corrections.",
    legal_card_3_t: "Armored Contracts", legal_card_3_d: "Drafting of promissory purchase agreements and lease contracts with robust protection clauses.",
    legal_process_title: "Legal Methodology", legal_final_cta: "Does your property have legal issues?", legal_final_btn: "Schedule Free Consultation",
    // MEDIA
    media_badge: "4K CINEMATOGRAPHY", media_title_1: "Audiovisual", media_title_2: "Marketing",
    media_desc: "We elevate your property's level with high-end video production, drones, and immersive tours.", media_final_cta: "Ready to make an impact?", media_final_btn: "Schedule Production",
    feat_1_t: "Professional Drones", feat_1_d: "We capture the magnitude of your property and surroundings from unique perspectives.",
    feat_2_t: "360 Virtual Tour", feat_2_d: "Allow clients to walk through the property from anywhere in the world.",
    feat_3_t: "Visual Storytelling", feat_3_d: "We don't just show spaces, we tell the life story your property offers.",
    feat_4_t: "Premium Editing", feat_4_d: "Cinematic color grading and sound design to maximize emotional impact.",
    // ABOUT & CONTACT
    about_hero: "More than a real estate agency, we are your strategic partners in wealth building.", about_story_title: "OUR STORY", about_story_headline: "Real Estate Excellence since 2010",
    about_story_desc: "Founded with the vision of transforming the real estate market in Bogota, AyC has grown based on trust, transparency, and proven results.",
    about_stats_clients: "Happy Clients", about_stats_exp: "Years Exp.", about_stats_sales: "In Sales",
    about_values_title: "Our Values", val1_title: "Integrity", val1_desc: "We act with honesty and transparency in every deal.",
    val2_title: "Excellence", val2_desc: "We strive to exceed expectations with superior results.",
    val3_title: "Passion", val3_desc: "We love what we do, and it shows in every detail.",
    about_team_title: "Leadership", role_founder1: "Co-founder & Sales Manager", desc_founder1: "Negotiation and PR expert with over 15 years leading high-performance commercial teams.",
    role_founder2: "Co-founder & Legal Director", desc_founder2: "Lawyer specializing in real estate and urban law. Guarantor of legal security.",
    contact_secure_badge: "Secure Channel", contact_title: "CONTACT US", contact_hero_desc: "Looking to buy, sell, or need a certified appraisal? We are ready to advise you with total confidentiality.",
    contact_call: "Call Us", contact_write: "Write Us", form_title: "Send a Message", form_name: "Name", form_phone: "Phone", form_email: "Email", form_msg: "Message", form_btn: "SEND MESSAGE", form_sending: "Sending Securely", security_note: "Protected by AyC Shield v1.0",
    blog_title: "BLOG & NEWS", blog_subtitle: "Real estate news, trends, and expert advice.", read_more: "Read more",
    footer_about_title: "ABOUT US", footer_contact_title: "CONTACT",
    // SPECS & TIPOS
    habs: "Bedrooms", baths: "Bathrooms", garages: "Garajes", area_built: "Built Area",
    kitchen: "Kitchen", stratum: "Stratum", admin: "HOA Fee", antiquity: "Age", height: "Height", years: "years",
    det_desc: "Description", det_features: "Features", det_admin: "HOA Fee", det_whatsapp: "Chat on WhatsApp",
    Casa: "House", Apartamento: "Apartment", Bodega: "Warehouse", Oficina: "Office", Local: "Retail Store", Lote: "Lot", Finca: "Farm", Rural: "Rural"
  }
};

// ============================================================
// 2. DICCIONARIO DINÁMICO (PALABRAS CLAVE PARA CONTENIDO DB)
// ============================================================
const dynamicKeywords: Record<string, string> = {
    // Tipos de Inmueble
    "Casa": "House", "Apartamento": "Apartment", "Bodega": "Warehouse", "Oficina": "Office", 
    "Local": "Retail Store", "Lote": "Lot", "Terreno": "Land", "Finca": "Farm", "Rural": "Rural", 
    "Consultorio": "Medical Office", "Edificio": "Building", "Penthouse": "Penthouse",
    
    // Transacción y Ubicación
    "Venta": "Sale", "Arriendo": "Rent", "Ubicado": "Located", "Ubicada": "Located", 
    "En": "In", "Con": "With", "El": "The", "La": "The", "Los": "The", "Las": "The",
    "Un": "A", "Una": "A", "Para": "For", "Por": "By", "De": "Of", 
    "Sector": "Sector", "Barrio": "Neighborhood", "Ciudad": "City",
    "Cerca": "Near", "Centro Comercial": "Mall", "Parque": "Park", 
    "Vista": "View", "Exterior": "Exterior", "Interior": "Interior", 
    
    // Adjetivos
    "Excelente": "Excellent", "Oportunidad": "Opportunity", "Inversión": "Investment", 
    "Hermosa": "Beautiful", "Hermoso": "Beautiful", "Bonita": "Beautiful", "Bonito": "Beautiful",
    "Espectacular": "Spectacular", "Increíble": "Incredible", "Gran": "Great", "Lindo": "Nice",
    "Moderno": "Modern", "Moderna": "Modern", "Amplio": "Spacious", "Amplia": "Spacious",
    "Iluminado": "Bright", "Iluminada": "Bright", "Remodelado": "Remodeled", "Remodelada": "Remodeled",
    "Estrenar": "Brand New", "Exclusivo": "Exclusive", "Lujo": "Luxury", 
    
    // Características
    "Habitaciones": "Bedrooms", "Baños": "Bathrooms", "Garajes": "Parking", "Parqueaderos": "Parking",
    "Cocina": "Kitchen", "Integral": "Integral", "Abierta": "Open", "Americana": "American Style",
    "Zona": "Zone", "Lavandería": "Laundry", "Ropas": "Laundry",
    "Estudio": "Study", "Biblioteca": "Library", "Star": "TV Room",
    "Terraza": "Terrace", "Balcón": "Balcony", "Patio": "Patio", "Jardín": "Garden",
    "Conjunto": "Complex", "Cerrado": "Gated", "Edificio Inteligente": "Smart Building",
    "Vigilancia": "Security", "Portería": "Lobby", "Recepción": "Reception",
    "Ascensor": "Elevator", "Privado": "Private", "Social": "Social",
    "Gimnasio": "Gym", "Piscina": "Pool", "Salón Comunal": "Community Hall",
    "BBQ": "BBQ", "Zona Infantil": "Kids Zone", "Zonas Verdes": "Green Areas",
    "Chimenea": "Fireplace", "Gas Natural": "Natural Gas", "Calentador": "Heater",
    "Piso": "Floor", "Madera": "Wood", "Laminado": "Laminate", "Cerámica": "Ceramic", "Mármol": "Marble",
    "Administración": "HOA Fee", "Precio": "Price", "Valor": "Value", "Área": "Area", "Metros": "Meters"
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Inicialización segura del idioma
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem("ayc_lang");
    if (stored === "EN") return "EN";
    return "ES"; 
  });

  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === "ES" ? "EN" : "ES";
      localStorage.setItem("ayc_lang", newLang);
      return newLang;
    });
  };

  // --- FUNCIÓN 1: Traducción Estática (UI Fija) ---
  const t = (key: string): string => {
    const dict = translations[lang];
    // Si no existe el diccionario o la clave, fallback a Español, luego a la clave misma
    if (!dict) return translations["ES"][key] || key;
    return dict[key] || translations["ES"][key] || key;
  };

  // --- FUNCIÓN 2: Traducción Dinámica (Contenido DB) ---
  const translateDynamic = (text: string): string => {
    if (!text) return "";
    if (lang === "ES") return text; // En español no se toca nada
    
    let translatedText = text;
    
    // Ordenamos las keywords por longitud (descendente) para que frases largas se traduzcan primero
    // y no se rompan por traducciones parciales de palabras cortas.
    const sortedKeywords = Object.entries(dynamicKeywords).sort((a, b) => b[0].length - a[0].length);
    
    sortedKeywords.forEach(([es, en]) => {
        // Escapamos caracteres especiales de regex por seguridad
        const escapedEs = es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // Si la clave tiene espacios (frase), busca la frase exacta. Si es palabra única, usa límites de palabra (\b).
        const isPhrase = es.trim().includes(" ");
        const regexPattern = isPhrase ? escapedEs : `\\b${escapedEs}\\b`;
        const regex = new RegExp(regexPattern, 'gi'); // Case insensitive
        
        translatedText = translatedText.replace(regex, (match) => {
            // Mantiene la capitalización original (Ej: "Casa" -> "House", "casa" -> "house")
            if (match[0] === match[0].toUpperCase()) {
                return en.charAt(0).toUpperCase() + en.slice(1);
            }
            return en.toLowerCase();
        });
    });
    
    return translatedText;
  };

  const currency = lang === "EN" ? "USD" : "COP";

  return (
    <AppContext.Provider value={{ lang, toggleLang, t, translateDynamic, currency }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};