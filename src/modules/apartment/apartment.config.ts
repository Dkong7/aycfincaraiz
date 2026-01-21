import { 
  Building2, ArrowUpFromLine, Calendar, MonitorPlay, User, ShieldCheck, 
  Layers, Mountain, Coffee, Dumbbell, Waves, Trophy, Trees, Flame, Zap, 
  Heater, Tv, LandPlot, Dog, ChefHat, Utensils, Eye, Maximize,
  DoorOpen, // <--- CAMBIO: Usamos DoorOpen para Balcón
  Car, Sun, DollarSign
} from "lucide-react";

// Mapeo de Iconos para Características y Amenidades
export const APARTMENT_ICONS: Record<string, any> = {
  // Características Internas
  "Ascensor": ArrowUpFromLine,
  "Ascensor Privado": ArrowUpFromLine, 
  "Ascensor Servicio": ArrowUpFromLine,
  "Remodelado": Calendar, 
  "Estudio": MonitorPlay, 
  "CBS (Cuarto Servicio)": User,
  "Puerta Seguridad": ShieldCheck, 
  "Duplex": Layers, 
  "Penthouse": Mountain,
  "Balcón": DoorOpen, // <--- CORREGIDO
  "Terraza": Sun,
  "Chimenea": Flame,
  
  // Zonas Comunes (Club House)
  "Vigilancia 24h": ShieldCheck, 
  "Vigilancia 24/7": ShieldCheck,
  "Salón Comunal": Coffee, 
  "Gimnasio": Dumbbell,
  "Piscina": Waves, 
  "Canchas Squash": Trophy, 
  "Canchas Tenis": Trophy,
  "Parque Niños": Trees, 
  "Parque Infantil": Trees,
  "Terraza BBQ": Flame, 
  "BBQ": Flame,
  "Planta Eléctrica Total": Zap,
  "Caldera": Heater, 
  "Teatrino": Tv, 
  "Co-Working": Building2,
  "Jaula Golf": LandPlot, 
  "Sendero": Trees, 
  "Zonas Verdes": Trees,
  "Pet Friendly": Dog,
  "Parqueadero Visitantes": Car,
  
  // Generales
  "Vista": Eye,
  "Habitaciones": User,
  "Baños": User, // Icono genérico si falta
  "Garajes": Car
};

// DICCIONARIO DE TRADUCCIÓN LOCAL (Mapeo DB -> Label UI)
export const TRANSLATIONS: Record<string, string> = {
  // Cocina
  "Integral": "Integral",
  "Americana (Abierta)": "Americana",
  "Tipo Isla": "Tipo Isla",
  "Cerrada (Indep.)": "Cerrada",
  "Para Remodelar": "Para Remodelar",

  // Pisos
  "Madera Maciza": "Madera Maciza",
  "Madera Laminada": "Madera Laminada",
  "Madera Granadillo": "Madera Granadillo",
  "Laminado": "Laminado",
  "Porcelanato": "Porcelanato",
  "Mármol": "Mármol",
  "Cerámica": "Cerámica",
  "Alfombra": "Alfombra",
  "PVC / Vinilo": "PVC / Vinilo",

  // Zona de Ropas
  "Independiente": "Zona Ropas Indep.",
  "En Cocina": "En Cocina",
  "Cuarto de Ropas": "Cuarto de Ropas",
  "No tiene": "Sin Zona Ropas",

  // Garaje
  "Cubierto": "Cubierto",
  "Descubierto": "Descubierto",
  "Doble Lineal": "Doble Lineal",
  "Doble Paralelo": "Doble Paralelo",
  "Sencillo": "Sencillo",
  "Servidumbre": "Servidumbre",

  // Gas
  "Natural": "Gas Natural",
  "Propano": "Gas Propano",
  "Eléctrico": "Eléctrico",
  "Ninguno": "Sin Gas",

  // Vista
  "Exterior": "Exterior",
  "Interior": "Interior",
  "Panorámica": "Panorámica",

  // Sala/Comedor
  "Un solo ambiente": "Sala-Comedor",
  "Con Chimenea": "Con Chimenea",
  "Con Balcón": "Con Balcón"
};

// Helper function
export const translate = (val: string) => TRANSLATIONS[val] || val;