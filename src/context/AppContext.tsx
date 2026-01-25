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
    // NAVEGACIÓN & HERO
    nav_home: "Inicio", nav_properties: "Inmuebles", nav_services: "Servicios", nav_blog: "Blog", nav_about: "Nosotros", nav_contact: "Contacto",
    hero_btn: "Ver Detalles", feat_title: "Propiedades Destacadas", view_all: "Ver todas",
    
    // DETALLES GENERALES
    det_desc: "Descripción", det_features: "Características", det_admin: "Valor Administración", det_whatsapp: "Consultar por WhatsApp",
    
    // --- FOOTER & CONTACTO (INTEGRADO) ---
    footer_about_title: "SOBRE NOSOTROS",
    footer_contact_title: "CONTACTO",
    footer_desc: "Somos una inmobiliaria boutique en Bogotá, especializada en propiedades exclusivas y asesoría integral. Tu patrimonio, nuestra prioridad.",
    
    // --- BARRA LATERAL (SIDEBAR) ---
    agent_title: "AGENTE RESPONSABLE",
    code: "Cód",
    btn_whatsapp: "Consultar por WhatsApp",
    appraisal_final_btn: "Agendar Cita / Visita",
    need_credit: "¿Necesitas Crédito?",
    credit_desc: "Gestionamos tu crédito hipotecario con nuestros bancos aliados para facilitar tu compra.",
    view_allies: "Ver Aliados Financieros",
    location_priv_title: "Ubicación Privilegiada",
    location_priv_desc: "Esta propiedad cuenta con una excelente ubicación estratégica. Contáctanos para conocer el punto exacto.",
    
    // Mapeo DB -> Label UI (Español)
    Casa: "Casa", Apartamento: "Apartamento", Bodega: "Bodega", Oficina: "Oficina", 
    Local: "Local", Lote: "Lote", Finca: "Finca", Rural: "Rural", 
    CasaCampo: "Casa Campestre", Terreno: "Terreno"
  },
  EN: {
    // NAVEGACIÓN & HERO
    nav_home: "Home", nav_properties: "Properties", nav_services: "Services", nav_blog: "Blog", nav_about: "About Us", nav_contact: "Contact",
    hero_btn: "View Details", feat_title: "Featured Properties", view_all: "View All",
    
    // DETALLES GENERALES
    det_desc: "Description", det_features: "Features", det_admin: "HOA Fee", det_whatsapp: "Chat on WhatsApp",
    
    // --- FOOTER & CONTACTO (INTEGRADO) ---
    footer_about_title: "ABOUT US",
    footer_contact_title: "CONTACT",
    footer_desc: "We are a boutique real estate agency in Bogota, specializing in exclusive properties and comprehensive advice. Your heritage, our priority.",
    
    // --- BARRA LATERAL (SIDEBAR) ---
    agent_title: "LISTING AGENT",
    code: "Code",
    btn_whatsapp: "Chat on WhatsApp",
    appraisal_final_btn: "Schedule Visit",
    need_credit: "Need a Mortgage?",
    credit_desc: "We manage your mortgage loan with our allied banks to facilitate your purchase.",
    view_allies: "View Financial Partners",
    location_priv_title: "Prime Location",
    location_priv_desc: "This property boasts a strategic location. Contact us to reveal the exact spot.",

    // Mapeo DB -> Label UI (Inglés)
    Casa: "House", Apartamento: "Apartment", Bodega: "Warehouse", Oficina: "Office", 
    Local: "Retail Store", Lote: "Lot", Finca: "Farm", Rural: "Rural", 
    CasaCampo: "Country House", Terreno: "Land"
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
    "Esquinero": "Corner Location",
    "Esquinera": "Corner Location",
    "Vía Principal": "Main Road",
    "Medianero": "Mid-block Lot",
    "Medianera": "Mid-block Lot",
    
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

    // --- BODEGA (NUEVOS TÉRMINOS INDUSTRIALES) ---
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
    
    // Extras Bodega
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

    // --- OFICINA (NUEVOS TÉRMINOS CORPORATIVOS) ---
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