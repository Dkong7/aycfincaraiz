import { 
  TreePine, Mountain, Droplets, Fence, Tractor, Home, 
  Waves, Utensils, Warehouse, Flower2, PawPrint, Zap, 
  Shovel, Route, Map, Eye
} from "lucide-react";

// Iconos para Fincas y Lotes Rurales
export const RURAL_ICONS: Record<string, any> = {
  "Piscina Privada": Waves, 
  "Jacuzzi": Waves, 
  "Kiosko / BBQ": Utensils,
  "Casa Mayordomo": Home, 
  "Caballerizas": PawPrint, 
  "Galpones": Warehouse,
  "Árboles Frutales": Flower2, 
  "Corral / Vaquera": Fence,
  "Pozo Profundo": Droplets, 
  "Nacimiento Propio": Droplets,
  "Planta Eléctrica": Zap, 
  "Invernadero": Flower2,
  "Vista": Eye,
  "Topografía": Mountain,
  "Acceso": Route
};

// Traducciones Locales (Backups o Específicas)
export const TRANSLATIONS: Record<string, string> = {
  // Topografía
  "Plano": "Plano",
  "Ondulado": "Ondulado",
  "Quebrado": "Quebrado",
  "Mixto": "Mixto",

  // Acceso
  "Pavimentado": "Pavimentado",
  "Destapado": "Destapado",
  "Huella": "Placa Huella",
  "Solo 4x4": "Solo 4x4",

  // Agua
  "Acueducto Veredal": "Acueducto Veredal",
  "Pozo": "Pozo Profundo",
  "Nacimiento": "Nacimiento",
  "Tanque": "Reserva-Tanque",

  // Cercas
  "Sin cerramiento": "Sin cerramiento",
  "Alambre de Púas": "Alambre de Púas",
  "Malla Eslabonda": "Malla Eslabonda",
  "Cerca Viva": "Cerca Viva",
  "Muro": "Muro Concreto",

  // Gas
  "Pipeta": "Gas Propano",
  "Red Natural": "Red Gas Natural",
  "No tiene": "Sin Gas"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;