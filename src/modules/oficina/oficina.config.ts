import { 
  Briefcase, Users, Wifi, Monitor, Coffee, Lock, 
  Wind, Projector, Armchair, Building2,
  LayoutDashboard, Server, Zap, DoorOpen, Layers,
  Lightbulb, Siren, Fingerprint, ArrowUpFromLine, Car, Sun
} from "lucide-react";

// Mapeo de Iconos (Debe coincidir con las etiquetas del Formulario)
export const OFICINA_ICONS: Record<string, any> = {
  // Infraestructura Técnica
  "Cableado Estructurado": Wifi,
  "Aire Acondicionado Central": Wind,
  "Planta Suplencia Total": Zap,
  "Iluminación LED": Lightbulb,
  "Ascensores Inteligentes": ArrowUpFromLine,
  "CCTV / Seguridad": Lock,
  "Red Contra Incendios": Siren,
  "Acceso Biométrico": Fingerprint,

  // Amenidades Corporativas
  "Sala de Juntas": Users,
  "Auditorio": Projector,
  "Cocineta / Cafetería": Coffee,
  "Recepción / Lobby": DoorOpen,
  "Parqueo Visitantes": Car,
  "Terraza / Lounge": Sun,

  // Genéricos
  "Red de Datos": Server,
  "Batería de Baños": Users,
  "Control de Acceso": Lock,
  "Amoblada": Armchair,
  "Piso Elevado": Layers,
  "Techo Modular": LayoutDashboard,
  "Recepción": DoorOpen
};

// Traducciones Locales (Valor DB -> Texto Legible en Español)
// El AppContext se encargará de pasarlo a Inglés después.
export const TRANSLATIONS: Record<string, string> = {
  // Estado Entrega
  "Obra Gris": "Obra Gris",
  "Adecuada": "Adecuada",
  "Amoblada": "Amoblada",
  "Remodelada": "Remodelada",
  
  // Tipo Baños
  "Privados": "Baños Privados",
  "Batería Comunal": "Batería de Baños Comunal",
  "Mixto": "Mixto (Privado + Comunal)",

  // Tipo Edificio (Si aplica)
  "Edificio Inteligente": "Edificio Inteligente",
  "Edificio Tradicional": "Edificio Tradicional",
  "Casa Adaptada": "Casa Adaptada",
  "Torre Empresarial": "Torre Empresarial",

  // Ubicación
  "Exterior": "Exterior",
  "Interior": "Interior"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;