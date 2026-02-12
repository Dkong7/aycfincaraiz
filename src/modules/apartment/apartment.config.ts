import { 
  Building2, ArrowUpFromLine, Calendar, MonitorPlay, User, ShieldCheck, 
  Layers, Mountain, Coffee, Dumbbell, Waves, Trophy, Trees, Flame, Zap, 
  Heater, Tv, LandPlot, Dog, ChefHat, Utensils, Eye, Maximize,
  DoorOpen, Car, Sun, DollarSign, Wifi, Box, Shield
} from "lucide-react";

// 1. MAPEO DE ICONOS
export const APARTMENT_ICONS: Record<string, any> = {
  // Características Internas (Extras)
  "Ascensor": ArrowUpFromLine,
  "Ascensor Privado": ArrowUpFromLine, 
  "Ascensor Servicio": ArrowUpFromLine,
  "Remodelado": Calendar, 
  "Estudio": MonitorPlay, 
  "CBS (Cuarto Servicio)": User,
  "Puerta Seguridad": ShieldCheck, 
  "Duplex": Layers, 
  "Penthouse": Mountain,
  "Balcón": DoorOpen,
  "Terraza Privada": Sun,
  "Chimenea": Flame,
  "Depósito": Box,
  "Domótica": Wifi,
  "Cocina Abierta": ChefHat,
  "Vista Exterior": Eye,
  
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
  "Baños": User, 
  "Garajes": Car,
  "Cocina": ChefHat,
  "Pisos": Layers,
  "Zona Ropas": Utensils
};

// 2. DICCIONARIO DE TRADUCCIÓN LOCAL (Base de Datos -> UI)
export const TRANSLATIONS: Record<string, string> = {
  // Cocina
  "Integral": "Cocina Integral",
  "Americana (Abierta)": "Cocina Americana",
  "Tipo Isla": "Cocina Tipo Isla",
  "Cerrada (Indep.)": "Cocina Cerrada",
  "Para Remodelar": "Para Remodelar",

  // Pisos
  "Madera Maciza": "Madera Maciza",
  "Madera Laminada": "Madera Laminada",
  "Madera Granadillo": "Madera Granadillo",
  "Laminado": "Piso Laminado",
  "Porcelanato": "Porcelanato",
  "Mármol": "Mármol",
  "Cerámica": "Cerámica",
  "Alfombra": "Alfombra",
  "PVC / Vinilo": "PVC / Vinilo",

  // Zona de Ropas & Espacios
  "En Cocina": "Zona Ropas en Cocina",
  "Cuarto de Ropas": "Cuarto de Ropas",
  "No tiene": "Sin Zona Ropas",
  "Independiente": "Independiente", 

  // Garaje (AGREGADO COMUNAL)
  "Cubierto": "Cubierto",
  "Descubierto": "Descubierto",
  "Doble Lineal": "Doble Lineal",
  "Doble Paralelo": "Doble Paralelo",
  "Sencillo": "Sencillo",
  "Servidumbre": "Servidumbre",
  "Comunal": "Parqueadero Comunal",

  // Gas
  "Natural": "Gas Natural",
  "Propano": "Gas Propano",
  "Eléctrico": "Eléctrico",
  "Ninguno": "Sin Gas",

  // Vista
  "Exterior": "Vista Exterior",
  "Interior": "Vista Interior",
  "Panorámica": "Vista Panorámica",
  "Parque": "Vista al Parque",

  // Sala/Comedor
  "Un solo ambiente": "Sala-Comedor",
  "Con Chimenea": "Con Chimenea",
  "Con Balcón": "Con Balcón",

  // Antigüedad
  "Estrenar": "Para Estrenar",
  "Menos de 1 año": "< 1 Año",
  "1 a 5 años": "1 a 5 Años",
  "5 a 10 años": "5 a 10 Años",
  "1 a 9 años": "1 a 9 Años",
  "10 a 20 años": "10 a 20 Años",
  "Más de 20 años": "> 20 Años"
};

// Función Helper para traducir
export const translate = (val: string) => TRANSLATIONS[val] || val;