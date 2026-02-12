import React, { createContext, useContext, useState, ReactNode } from "react";

// --- TIPOS ---
type Lang = "ES" | "EN";

interface AppContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (key: string) => string;
  translateDynamic: (text: string) => string;
  currency: "COP" | "USD";
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ==========================================
// 1. DICCIONARIO MAESTRO (TEXTOS FIJOS UI)
// ==========================================
const translations: Record<string, Record<string, string>> = {
  ES: {
    // --- NAVEGACIÓN & HERO ---
    nav_home: "Inicio", 
    nav_properties: "Inmuebles", 
    nav_services: "Servicios", 
    nav_blog: "Blog", 
    nav_about: "Nosotros", 
    nav_contact: "Contacto",
    
    // --- SERVICIOS MENÚ ---
    srv_appraisals: "Avalúos Certificados",
    srv_legal: "Gestión Jurídica",
    srv_audio: "Producción Visual",

    hero_btn: "Ver Detalles", 
    feat_title: "Propiedades Destacadas", 
    view_all: "Ver todas",
    
    // --- DETALLES GENERALES ---
    det_desc: "Descripción", det_features: "Características", det_admin: "Valor Administración", det_whatsapp: "Consultar por WhatsApp",
    
    // --- FOOTER & CONTACTO ---
    footer_about_title: "SOBRE NOSOTROS",
    footer_contact_title: "CONTACTO",
    footer_desc: "Somos una inmobiliaria boutique en Bogotá, especializada en propiedades exclusivas y asesoría integral. Tu patrimonio, nuestra prioridad.",
    
    // --- PÁGINA DE CONTACTO ---
    contact_secure_badge: "Canal Seguro & Encriptado",
    contact_title: "CONTÁCTANOS",
    contact_hero_desc: "¿Buscas comprar, vender o un avalúo certificado? Estamos listos para asesorarte con total confidencialidad.",
    contact_call: "Llámanos",
    contact_write: "Escríbenos",
    form_title: "Déjanos un Mensaje",
    form_name: "Nombre Completo",
    form_phone: "Teléfono",
    form_email: "Correo Electrónico",
    form_msg: "Tu Mensaje",
    form_btn: "ENVIAR MENSAJE",
    form_sending: "ENVIANDO...",
    security_note: "Tus datos están protegidos por AyC Shield v2.0",
    req_field: "Campo requerido",
    inv_phone: "Número inválido",
    inv_email: "Email inválido",
    msg_sent: "¡Mensaje enviado con éxito!",
    ph_name: "Ej: Juan Pérez",
    ph_msg: "¿Cómo podemos ayudarte hoy?",

    // --- BARRA LATERAL (DETAIL VIEW) ---
    agent_title: "AGENTE RESPONSABLE",
    code: "Cód",
    btn_whatsapp: "Consultar por WhatsApp",
    appraisal_final_btn: "Agendar Cita / Visita",
    need_credit: "¿Necesitas Crédito?",
    credit_desc: "Gestionamos tu crédito hipotecario con nuestros bancos aliados para facilitar tu compra.",
    view_allies: "Ver Aliados Financieros",
    location_priv_title: "Ubicación Privilegiada",
    location_priv_desc: "Esta propiedad cuenta con una excelente ubicación estratégica. Contáctanos para conocer el punto exacto.",

    // --- SECCIÓN JURÍDICA ---
    legal_badge: "Blindaje Total",
    legal_title_1: "Seguridad",
    legal_title_2: "Jurídica Inmobiliaria",
    legal_desc: "Protegemos su patrimonio con estudios de títulos rigurosos, saneamiento predial y contratos blindados contra todo riesgo.",
    legal_btn: "Consultar Caso",
    legal_expertise_title: "Áreas de Práctica",
    legal_card_1_t: "Estudio de Títulos",
    legal_card_1_d: "Análisis profundo de la tradición del inmueble (20+ años) para detectar gravámenes o vicios ocultos.",
    legal_card_2_t: "Saneamiento Predial",
    legal_card_2_d: "Resolución de sucesiones ilíquidas, levantamiento de hipotecas, corrección de áreas.",
    legal_card_3_t: "Contratos Blindados",
    legal_card_3_d: "Elaboración de promesas de compraventa y contratos con cláusulas de protección robustas.",
    legal_process_title: "Metodología Jurídica",
    legal_final_cta: "¿Su inmueble tiene problemas legales?",
    legal_final_btn: "Agendar Consulta Gratuita",

    // --- SECCIÓN AVALÚOS ---
    appraisal_badge: "Certificado RAA",
    appraisal_title_1: "Avalúos",
    appraisal_title_2: "Comerciales",
    appraisal_desc: "Determinamos el valor real de su inmueble con precisión técnica, respaldo legal y certificación ante la Lonja.",
    appraisal_btn: "Solicitar Cotización",
    appraisal_why_title: "¿Por qué con nosotros?",
    why_1_t: "Precisión Técnica", why_1_d: "Metodologías NIIF y ONAC.",
    why_2_t: "Validez Legal", why_2_d: "Idóneo para trámites notariales y judiciales.",
    why_3_t: "Visión de Mercado", why_3_d: "Análisis comparativo real.",
    process_title: "Nuestro Proceso",
    step_1_t: "Visita Técnica", step_1_d: "Inspección física detallada.",
    step_2_t: "Estudio de Mercado", step_2_d: "Investigación de transacciones reales.",
    step_3_t: "Entrega de Informe", step_3_d: "Informe firmado por perito RAA.",
    appraisal_final_cta: "Conocer el valor real es el primer paso para un negocio exitoso.",
    
    // --- SECCIÓN AUDIOVISUAL ---
    media_badge: "CINEMATOGRAFÍA 4K",
    media_title_1: "Marketing", media_title_2: "Audiovisual",
    media_desc: "Elevamos el nivel de su propiedad con producción de video de alta gama, drones y recorridos inmersivos.",
    feat_1_t: "Drones Profesionales", feat_1_d: "Perspectivas aéreas únicas.",
    feat_2_t: "Tour Virtual 360", feat_2_d: "Recorridos desde cualquier lugar.",
    feat_3_t: "Storytelling Visual", feat_3_d: "Contamos la historia de su propiedad.",
    feat_4_t: "Edición Premium", feat_4_d: "Colorización y diseño sonoro.",
    media_final_cta: "¿Listo para impactar?",
    media_final_btn: "Agendar Producción",

    // Mapeo DB -> Label UI
    Casa: "Casa", Apartamento: "Apartamento", Bodega: "Bodega", Oficina: "Oficina", 
    Local: "Local", Lote: "Lote", Finca: "Rural", Rural: "Rural", 
    CasaCampo: "Casa Campestre", Terreno: "Terreno",

    // --- PÁGINA ABOUT (NOSOTROS) ---
    about_hero: "Más que una inmobiliaria, somos tus socios estratégicos en la construcción de patrimonio.",
    about_story_title: "NUESTRA HISTORIA",
    about_story_headline: "Excelencia inmobiliaria desde 2010",
    about_story_desc: "Fundada con la visión de transformar el mercado inmobiliario en Bogotá, AyC ha crecido basándose en la confianza, la transparencia y resultados comprobables.",
    about_stats_clients: "Clientes Felices",
    about_stats_exp: "Años Exp.",
    about_stats_sales: "En Ventas",
    about_values_title: "Nuestros Valores",
    val1_title: "Integridad", val1_desc: "Actuamos con honestidad y transparencia en cada negocio.",
    val2_title: "Excelencia", val2_desc: "Buscamos superar las expectativas con resultados superiores.",
    val3_title: "Pasión", val3_desc: "Amamos lo que hacemos y se nota en cada detalle.",
    about_team_title: "Liderazgo",
    role_founder1: "Cofundadora & Gerente Comercial",
    desc_founder1: "Experta en negociación y relaciones públicas con más de 15 años liderando equipos comerciales de alto rendimiento.",
    role_founder2: "Cofundador & Director Jurídico",
    desc_founder2: "Abogado especialista en derecho inmobiliario y urbano. Garante de la seguridad jurídica en cada operación de la firma.",

    //
  },
  EN: {
    // --- NAVEGACIÓN & HERO ---
    nav_home: "Home", 
    nav_properties: "Properties", 
    nav_services: "Services", 
    nav_blog: "Blog", 
    nav_about: "About Us", 
    nav_contact: "Contact",

    // --- SERVICIOS MENÚ ---
    srv_appraisals: "Certified Appraisals",
    srv_legal: "Legal Management",
    srv_audio: "Visual Production",

    hero_btn: "View Details", 
    feat_title: "Featured Properties", 
    view_all: "View All",
    
    // --- DETALLES GENERALES ---
    det_desc: "Description", det_features: "Features", det_admin: "HOA Fee", det_whatsapp: "Chat on WhatsApp",
    
    // --- FOOTER & CONTACTO ---
    footer_about_title: "ABOUT US",
    footer_contact_title: "CONTACT",
    footer_desc: "We are a boutique real estate agency in Bogota, specializing in exclusive properties and comprehensive advice. Your heritage, our priority.",
    
    // --- PÁGINA DE CONTACTO ---
    contact_secure_badge: "Secure & Encrypted Channel",
    contact_title: "GET IN TOUCH",
    contact_hero_desc: "Looking to buy, sell, or need a certified appraisal? We are ready to advise you with total confidentiality.",
    contact_call: "Call Us",
    contact_write: "Email Us",
    form_title: "Drop Us a Message",
    form_name: "Full Name",
    form_phone: "Phone Number",
    form_email: "Email Address",
    form_msg: "Your Message",
    form_btn: "SEND MESSAGE",
    form_sending: "SENDING...",
    security_note: "Your data is protected by AyC Shield v2.0",
    req_field: "Required field",
    inv_phone: "Invalid phone number",
    inv_email: "Invalid email",
    msg_sent: "Message sent successfully!",
    ph_name: "Ex: John Doe",
    ph_msg: "How can we help you today?",

    // --- BARRA LATERAL ---
    agent_title: "LISTING AGENT",
    code: "Code",
    btn_whatsapp: "Chat on WhatsApp",
    appraisal_final_btn: "Schedule Visit",
    need_credit: "Need a Mortgage?",
    credit_desc: "We manage your mortgage loan with our allied banks to facilitate your purchase.",
    view_allies: "View Financial Partners",
    location_priv_title: "Prime Location",
    location_priv_desc: "This property boasts a strategic location. Contact us to reveal the exact spot.",

    // --- LEGAL (NEW) ---
    legal_badge: "Total Shield",
    legal_title_1: "Real Estate",
    legal_title_2: "Legal Security",
    legal_desc: "We protect your assets with rigorous title searches, property sanitation, and ironclad contracts.",
    legal_btn: "Consult Case",
    legal_expertise_title: "Practice Areas",
    legal_card_1_t: "Title Search",
    legal_card_1_d: "Deep analysis of property tradition (20+ years) to detect liens or hidden defects.",
    legal_card_2_t: "Property Sanitation",
    legal_card_2_d: "Resolution of unliquidated successions, mortgage lifting, boundary corrections.",
    legal_card_3_t: "Ironclad Contracts",
    legal_card_3_d: "Drafting of purchase agreements and lease contracts with robust protection clauses.",
    legal_process_title: "Legal Methodology",
    legal_final_cta: "Does your property have legal issues?",
    legal_final_btn: "Schedule Free Consultation",

    // --- APPRAISALS (NEW) ---
    appraisal_badge: "RAA Certified",
    appraisal_title_1: "Commercial",
    appraisal_title_2: "Appraisals",
    appraisal_desc: "We determine the real value of your property with technical precision, legal backing, and Board certification.",
    appraisal_btn: "Request Quote",
    appraisal_why_title: "Why Us?",
    why_1_t: "Technical Precision", why_1_d: "NIIF and ONAC methodologies.",
    why_2_t: "Legal Validity", why_2_d: "Suitable for notary and judicial procedures.",
    why_3_t: "Market Vision", why_3_d: "Real comparative analysis.",
    process_title: "Our Process",
    step_1_t: "Technical Visit", step_1_d: "Detailed physical inspection.",
    step_2_t: "Market Study", step_2_d: "Research of real transactions.",
    step_3_t: "Report Delivery", step_3_d: "Report signed by RAA appraiser.",
    appraisal_final_cta: "Knowing the real value is the first step to a successful deal.",
    
    // --- AUDIOVISUAL (NEW) ---
    media_badge: "4K CINEMATOGRAPHY",
    media_title_1: "Audiovisual", media_title_2: "Marketing",
    media_desc: "We elevate your property's level with high-end video production, drones, and immersive tours.",
    feat_1_t: "Pro Drones", feat_1_d: "Unique aerial perspectives.",
    feat_2_t: "360 VR Tour", feat_2_d: "Tours from anywhere.",
    feat_3_t: "Visual Storytelling", feat_3_d: "We tell your property's story.",
    feat_4_t: "Premium Editing", feat_4_d: "Color grading and sound design.",
    media_final_cta: "Ready to make an impact?",
    media_final_btn: "Schedule Production",

    // Mapeo DB -> Label UI
    Casa: "House", Apartamento: "Apartment", Bodega: "Warehouse", Oficina: "Office", 
    Local: "Retail Store", Lote: "Lot", Finca: "Farm", Rural: "Rural", 
    CasaCampo: "Country House", Terreno: "Land",

    // --- ABOUT PAGE ---
    about_hero: "More than a real estate agency, we are your strategic partners in building heritage.",
    about_story_title: "OUR STORY",
    about_story_headline: "Real Estate Excellence since 2010",
    about_story_desc: "Founded with the vision of transforming the real estate market in Bogota, AyC has grown based on trust, transparency, and proven results.",
    about_stats_clients: "Happy Clients",
    about_stats_exp: "Years Exp.",
    about_stats_sales: "In Sales",
    about_values_title: "Our Values",
    val1_title: "Integrity", val1_desc: "We act with honesty and transparency in every deal.",
    val2_title: "Excellence", val2_desc: "We seek to exceed expectations with superior results.",
    val3_title: "Passion", val3_desc: "We love what we do, and it shows in every detail.",
    about_team_title: "Leadership",
    role_founder1: "Co-Founder & Sales Manager",
    desc_founder1: "Expert in negotiation and public relations with over 15 years leading high-performance commercial teams.",
    role_founder2: "Co-Founder & Legal Director",
    desc_founder2: "Lawyer specializing in real estate and urban law. Guarantor of legal security in every firm operation.",

    //
  }
};

// ============================================================
// 2. DICCIONARIO DINÁMICO (BASE DE DATOS -> IDIOMA)
// ============================================================
const dynamicKeywords: Record<string, string> = {
    // --- TIPOS DE INMUEBLE ---
    "Casa": "House", "Apartamento": "Apartment", "Bodega": "Warehouse", "Oficina": "Office", 
    "Local": "Retail Store", "Lote": "Lot", "Terreno": "Land", "Finca": "Farm", "Rural": "Rural", 
    "CasaCampo": "Country House", "Casa Campestre": "Country House",
    "Consultorio": "Medical Office", "Edificio": "Building", "Penthouse": "Penthouse",
    
    // --- TRANSACCIÓN Y UBICACIÓN (GLOBAL) ---
    "Venta": "Sale", "Arriendo": "Rent", "Ubicado": "Located", 
    "Sector": "Sector", "Barrio": "Neighborhood", "Ciudad": "City",
    "Cerca": "Near", "Parque": "Park", "Vista": "View", "Exterior": "Exterior", 
    "Interior": "Interior", 
    "Centro Comercial": "Shopping Mall", 
    "Esquinero": "Corner Location", "Esquinera": "Corner Location",
    "Vía Principal": "Main Road", 
    "Medianero": "Mid-block Lot", "Medianera": "Mid-block Lot",
    
    // --- ADJETIVOS ---
    "Excelente": "Excellent", "Oportunidad": "Opportunity", "Inversión": "Investment", 
    "Hermosa": "Beautiful", "Bonita": "Beautiful", "Espectacular": "Spectacular", 
    "Increíble": "Incredible", "Moderno": "Modern", "Amplio": "Spacious", 
    "Iluminado": "Bright", "Remodelado": "Remodeled", "Estrenar": "Brand New", 
    "Exclusivo": "Exclusive", "Lujo": "Luxury", 
    
    // --- CARACTERÍSTICAS GENERALES ---
    "Habitaciones": "Bedrooms", "Baños": "Bathrooms", "Garajes": "Parking",
    "Cocina": "Kitchen", "Integral": "Integral", "Abierta": "Open", "Americana": "American Style",
    "Zona": "Zone", "Lavandería": "Laundry", "Ropas": "Laundry",
    "Estudio": "Study", "Biblioteca": "Library", "Star": "TV Room",
    "Terraza": "Terrace", "Balcón": "Balcony", "Patio": "Patio", "Jardín": "Garden",
    "Conjunto": "Complex", "Cerrado": "Gated", "Edificio Inteligente": "Smart Building",
    "Vigilancia": "Security", "Portería": "Lobby", "Recepción": "Reception",
    "Ascensor": "Elevator", "Gimnasio": "Gym", "Piscina": "Pool", "Salón Comunal": "Community Hall",
    "BBQ": "BBQ", "Chimenea": "Fireplace", "Gas Natural": "Natural Gas",
    "Piso": "Floor", "Madera": "Wood", "Laminado": "Laminate", "Cerámica": "Ceramic", "Mármol": "Marble",
    "Administración": "HOA Fee", "Precio": "Price", "Valor": "Value", "Área": "Area", "Metros": "Meters",

    // --- CASA & APARTAMENTO ---
    "Ficha Técnica": "Technical Specs", "Acabados": "Finishes", "Servicios": "Services",
    "Estilo Cocina": "Kitchen Style", "Tipo de Gas": "Gas Type", "Material Pisos": "Flooring Material",
    "Zona Comedor": "Dining Area", "Niveles": "Levels",
    "Comodidades": "Amenities", "Zonas Comunes": "Common Areas", 
    "Propiedad con Renta": "Income Property", "Canon": "Fee", "Antigüedad": "Age", "Estrato": "Stratum", 
    "Dimensiones": "Dimensions", "Estructura": "Structure", "Construida": "Built", 
    "Frente": "Front", "Fondo": "Depth", "Distribución": "Layout", "Lote Total": "Total Lot",
    "Precio de Venta": "Sale Price", "Descripción de la Propiedad": "Property Description",
    "Distribución por Niveles": "Layout by Levels", "Comodidades Casa": "House Amenities",
    "Resumen del Inmueble": "Property Overview", "Vigilancia 24/7": "24/7 Security", 
    "Parque Infantil": "Playground", "Panorámica": "Panoramic", "Piso N°": "Floor No.", 
    "Tipo de Vista": "View Type", "Integral Abierta": "Open Integral", 
    "Kitchenette": "Kitchenette", "Madera Laminada": "Laminated Wood", 
    "Área Privada": "Private Area", "Parqueadero Visitantes": "Visitor Parking",

    // --- RURAL / FINCA ---
    "Topografía": "Topography", "Recursos Hídricos": "Water Resources", 
    "Infraestructura": "Infrastructure", "Cultivos": "Crops",
    "Plano": "Flat", "Ondulado": "Rolling", "Quebrado": "Mountainous",
    "Pavimentado": "Paved", "Destapado": "Unpaved", "Huella": "Stone Path",
    "Acueducto Veredal": "Rural Aqueduct", "Pozo Profundo": "Deep Well", 
    "Nacimiento Propio": "Natural Spring", "Reserva-Tanque": "Water Tank",
    "Casa Mayordomo": "Caretaker's House", "Caballerizas": "Stables",
    "Galpones": "Warehouses", "Invernadero": "Greenhouse",
    "Árboles Frutales": "Fruit Trees", "Corral": "Corral",
    "Alambre de Púas": "Barbed Wire", "Cerca Viva": "Live Fence",

    // --- BODEGA (INDUSTRIAL) ---
    "Altura Triple": "Triple Height", "Doble Altura": "Double Height",
    "Altura Libre": "Clear Height", "Área Libre": "Clear Area",
    "Carga Eléctrica": "Electric Load", "Resistencia Piso": "Floor Load",
    "Muelles de Carga": "Loading Docks", "Muelle Carga": "Loading Dock",
    "Entrada Tractomulas": "Truck Access", "Acceso Tractomulas": "Truck Access",
    "Tipo Portón": "Gate Type", "Entradas": "Entrances",
    "Alarma Incendio": "Fire Alarm", "Detectores Humo": "Smoke Detectors",
    "Rociadores": "Sprinklers", "Tanques Agua": "Water Tanks",
    "Planta Eléctrica": "Power Plant", "Red Contra Incendios": "Fire Sprinkler System",
    "Zona Franca": "Free Trade Zone", "Parque Industrial": "Industrial Park",
    "Mezanine": "Mezzanine", "Oficinas": "Offices", "Locales": "Retail Units",
    "Transformador": "Transformer", "Potencia": "Power", "Capacidad": "Capacity",
    "Corredizo": "Sliding", "Levadizo": "Overhead", "Persiana": "Roll-up", "Muelle": "Dock",
    "Puente Grúa": "Crane Bridge", "Piso Epóxico": "Epoxy Floor",
    "Techo Termoacústico": "Thermoacoustic Roof", "Iluminación Natural": "Natural Lighting",
    "Subestación Eléctrica": "Electrical Substation", "Gas Industrial": "Industrial Gas",
    "Batería de Baños": "Restroom Battery", "Vestier": "Locker Room", "Lockers": "Lockers",
    "Casino": "Cafeteria", "Muelle con Nivelador": "Dock Leveler", "Muelle Nivelador": "Dock Leveler",
    "Concreto Alta Resistencia": "High Resistance Concrete", "Afianzado": "Reinforced",
    "Casino Empleados": "Employee Cafeteria", "Cocineta Básica": "Basic Kitchenette",

    // --- LOCAL COMERCIAL ---
    "Local a la Calle": "Street Level Store", "Plazoleta de Comidas": "Food Court",
    "Pasaje Comercial": "Commercial Arcade", 
    "Alto Tráfico": "High Foot Traffic", "Visibilidad": "Visibility",
    "Vitrina": "Showcase Window", "Terraza Privada": "Private Terrace",
    "Ducto Extracción": "Exhaust Duct",
    "Energía Trifásica": "Three-phase Power", "Trampa de Grasas": "Grease Trap",
    "Bahía de Parqueo": "Parking Bay", "Zona de Carga": "Loading Zone",
    "Adecuado para Restaurante": "Suitable for Restaurant",
    "Uso de Suelo": "Land Use", "Comercial": "Commercial",
    "Ficha Comercial": "Commercial Specs", "Descripción del Local": "Store Description",

    // --- OFICINA (CORPORATIVO) ---
    "Red de Datos": "Data Network", "Cableado Estructurado": "Structured Cabling",
    "Aire Acondicionado": "Air Conditioning", "Aire Acondicionado Central": "Central A/C",
    "Sala de Juntas": "Boardroom", "Auditorio": "Auditorium", 
    "Cocineta / Cafetería": "Kitchenette / Cafeteria",
    "Control de Acceso": "Access Control", "Biométrico": "Biometric", "Acceso Biométrico": "Biometric Access",
    "Piso Elevado": "Raised Floor", "Techo Modular": "Modular Ceiling",
    "Espacios Abiertos": "Open Spaces", "Divisiones Vidrio": "Glass Partitions",
    "Obra Gris": "Shell & Core (Grey Work)", "Adecuada": "Fitted Out", "Amoblada": "Furnished",
    "Edificio Corporativo": "Corporate Building", "Torre Empresarial": "Business Tower",
    "Ficha Corporativa": "Corporate Specs", "Entorno Empresarial": "Business Environment",
    "Planta Suplencia Total": "Full Backup Power Plant", "Iluminación LED": "LED Lighting",
    "Ascensores Inteligentes": "Smart Elevators", "Ascensores": "Elevators",
    "Recepción / Lobby": "Reception / Lobby", "Parqueo Visitantes": "Visitor Parking",
    "Terraza / Lounge": "Terrace / Lounge", "Resumen Corporativo": "Corporate Overview",
    "Descripción de la Oficina": "Office Description", "Infraestructura Técnica": "Technical Infrastructure",
    "Amenidades Edificio (PH)": "Building Amenities", "Eficiencia & Conectividad": "Efficiency & Connectivity",
    "Públicos": "Public", "Carga": "Freight", "Servicio": "Service",
    "Privados": "Private", "Batería Comunal": "Communal Battery", "Mixto": "Mixed",
    "Estado Entrega": "Delivery Condition",

    // --- LOTE / TERRENO ---
    "Índice Ocupación": "Occupancy Rate", "Índice Construcción": "Construction Rate",
    "Licencia Construcción": "Construction License", "Norma Urbana": "Urban Regulation",
    "Uso Principal": "Main Use", "Uso Complementario": "Complementary Use",
    "Residencial": "Residential", "Industrial": "Industrial", "Institucional": "Institutional",
    "Suburbano": "Suburban", "Expansión Urbana": "Urban Expansion",
    "Sobre Vía Principal": "On Main Road", "Sobre Vía Secundaria": "On Secondary Road",
    "Topografía Plana": "Flat Topography", "Topografía Inclinada": "Sloped Topography",
    "Redes Servicios": "Utility Networks", "Alcantarillado": "Sewerage",
    "Ficha del Terreno": "Land Specs", "Normativa & Usos": "Regulations & Uses"
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
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

  const t = (key: string): string => {
    const dict = translations[lang];
    if (!dict) return translations["ES"][key] || key;
    return dict[key] || translations["ES"][key] || key;
  };

  const translateDynamic = (text: string): string => {
    if (!text) return "";
    if (lang === "ES") return text;
    
    let translatedText = text;
    // Ordenamos por longitud para reemplazar frases largas primero
    const sortedKeywords = Object.entries(dynamicKeywords).sort((a, b) => b[0].length - a[0].length);
    
    sortedKeywords.forEach(([es, en]) => {
        const escapedEs = es.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const isPhrase = es.trim().includes(" ");
        // Si es frase, busca la frase exacta. Si es palabra, busca límites de palabra (\b)
        const regexPattern = isPhrase ? escapedEs : `\\b${escapedEs}\\b`;
        const regex = new RegExp(regexPattern, 'gi'); 
        
        translatedText = translatedText.replace(regex, (match) => {
            // Mantiene la capitalización original (Mayúscula inicial)
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

export default AppContext;