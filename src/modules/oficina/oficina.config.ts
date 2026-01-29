import { 
  Briefcase, Users, Wifi, Monitor, Coffee, Lock, 
  Wind, Projector, Armchair, Building2,
  LayoutDashboard, Server, Zap, DoorOpen, Layers,
  Lightbulb, Siren, Fingerprint, ArrowUpFromLine, Car, Sun,
  Calendar, CheckCircle2
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

  // Genéricos y Ficha Técnica
  "Red de Datos": Server,
  "Batería de Baños": Users,
  "Control de Acceso": Lock,
  "Amoblada": Armchair,
  "Piso Elevado": Layers,
  "Techo Modular": LayoutDashboard,
  "Recepción": DoorOpen,
  "Antigüedad": Calendar,
  "Estado": Briefcase
};

// Traducciones Locales (Valor DB -> Texto Legible en Español)
export const TRANSLATIONS: Record<string, string> = {
  // --- ESTADO ENTREGA ---
  "Obra Gris": "En Obra Gris",
  "Adecuada": "Adecuada / Lista",
  "Amoblada": "Amoblada",
  "Remodelada": "Remodelada",
  
  // --- TIPO BAÑOS ---
  "Privados": "Baños Privados",
  "Batería Comunal": "Batería Comunal (Piso)",
  "Mixto": "Privado + Comunal",

  // --- ANTIGÜEDAD ---
  "Estrenar": "Para Estrenar",
  "1 a 5 años": "1 a 5 Años",
  "5 a 10 años": "5 a 10 Años",
  "10 a 20 años": "10 a 20 Años",
  "+20 años": "Más de 20 Años",

  // --- GENÉRICOS ---
  "Edificio Inteligente": "Edificio Inteligente",
  "Torre Empresarial": "Torre Empresarial",
  "Exterior": "Vista Exterior",
  "Interior": "Vista Interior"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;