import { 
  Briefcase, Users, Wifi, Monitor, Coffee, Lock, 
  Wind, Projector, Armchair, Building2,
  LayoutDashboard, Server, Zap, DoorOpen, Layers // Asegúrate de importar Layers
} from "lucide-react";

// Iconos Específicos para Oficinas
export const OFICINA_ICONS: Record<string, any> = {
  "Red de Datos": Server,
  "Cableado Estructurado": Wifi,
  "Aire Acondicionado": Wind,
  "Sala de Juntas": Users,
  "Auditorio": Projector,
  "Batería de Baños": Users,
  "Cocineta": Coffee,
  "Cafetería": Coffee,
  "Control de Acceso": Lock,
  "Biométrico": Lock,
  "Amoblada": Armchair,
  "Piso Elevado": Layers, // <--- CAMBIO: Usamos el icono directo de Lucide
  "Techo Modular": LayoutDashboard,
  "Planta Suplencia": Zap,
  "Recepción": DoorOpen
};

// Traducciones Específicas
export const TRANSLATIONS: Record<string, string> = {
  // Estado Entrega
  "Obra Gris": "Obra Gris",
  "Adecuada": "Adecuada / Fitted",
  "Amoblada": "Amoblada / Furnished",
  
  // Tipo Edificio
  "Edificio Inteligente": "Edificio Inteligente / Smart Building",
  "Edificio Tradicional": "Edificio Tradicional",
  "Casa Adaptada": "Casa Adaptada",
  "Torre Empresarial": "Torre Empresarial / Business Tower",

  // Ubicación
  "Exterior": "Exterior",
  "Interior": "Interior"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;

// NOTA: He eliminado la función 'LayersIcon' manual para evitar el error de JSX en archivo .ts