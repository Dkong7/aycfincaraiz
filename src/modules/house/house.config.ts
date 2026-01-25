import { 
  Flame, Wind, Sun, Flower2, BookOpen, Shirt, Box, ShieldCheck, 
  Coffee, Dumbbell, Waves, Trophy, Trees, Zap, Heater, Tv, Dog,
  Utensils, ChefHat, Layers, Car, Building, Banknote, Calendar,
  Store, Layout
} from "lucide-react";

// Mapeo de Iconos para Características (Amenities)
export const HOUSE_ICONS: Record<string, any> = {
  // Comodidades Internas
  "Chimenea": Flame, 
  "Balcón": Wind, 
  "Terraza": Sun, 
  "Jardín": Flower2,
  "Patio": Sun, 
  "Estudio": BookOpen, 
  "CBS (Cuarto Servicio)": Shirt,
  "Depósito": Box, 
  
  // Zonas Comunes / Club House
  "Vigilancia 24h": ShieldCheck, 
  "Salón Comunal": Coffee,
  "Gimnasio": Dumbbell, 
  "Piscina": Waves, 
  "Canchas Squash": Trophy,
  "Canchas Tenis": Trophy, 
  "Parque Niños": Trees, 
  "Terraza BBQ": Flame,
  "Planta Eléctrica": Zap, 
  "Caldera": Heater, 
  "Teatrino": Tv,
  "Co-Working": BookOpen, 
  "Sendero": Trees, 
  "Pet Friendly": Dog,

  // Genéricos para Ficha Técnica
  "Cocina": ChefHat, 
  "Pisos": Layers, 
  "Garaje": Car, 
  "Comedor": Utensils,
  "Renta": Banknote,
  "Niveles": Layers,
  "Antigüedad": Calendar
};

// DICCIONARIOS DE TRADUCCIÓN (Valor Base de BD -> Texto Legible)
export const TRANSLATIONS: Record<string, string> = {
  // Garajes
  "Cubierto": "Cubierto",
  "Descubierto": "Descubierto",
  "Doble Lineal": "Doble en Línea",
  "Doble Paralelo": "Doble Paralelo",
  "Sencillo": "Sencillo",
  "Servidumbre": "Servidumbre",
  
  // Cocina
  "Integral": "Integral",
  "Americana": "Tipo Americana",
  "Isla": "Con Isla",
  "Abierta": "Abierta",
  "Tradicional": "Tradicional",
  "Cerrada": "Cerrada",
  "Para Remodelar": "Para Remodelar",

  // Gas
  "Natural": "Gas Natural",
  "Propano": "Gas Propano",
  "Pipeta": "Pipeta / Cilindro",
  "Red": "Red de Gas",
  "Ninguno": "Sin Gas",

  // Pisos
  "Madera Maciza": "Madera Maciza",
  "Madera Laminada": "Madera Laminada",
  "Madera Granadillo": "Madera Granadillo",
  "Laminado": "Piso Laminado",
  "Porcelanato": "Porcelanato",
  "Mármol": "Mármol",
  "Cerámica": "Cerámica",
  "Alfombra": "Alfombra",
  "Retal de Mármol": "Retal de Mármol",
  "PVC / Vinilo": "PVC / Vinilo",

  // Comedor
  "Independiente": "Independiente",
  "Un Ambiente": "Un Ambiente",
  "Barra Americana": "Barra Americana",
  "Auxiliar": "Auxiliar",
  "Terraza": "En Terraza",

  // Antigüedad (Edad)
  "Estrenar": "Para Estrenar",
  "Menos de 1 año": "Menos de 1 año",
  "1 a 9 años": "1 a 9 años",
  "10 a 20 años": "10 a 20 años",
  "Más de 20 años": "Más de 20 años",
  "Remodelado": "Remodelado",

  // Tipos de Renta (Para casas con local/apto)
  "Apartamento Independiente": "Apto Independiente",
  "Local Comercial": "Local Comercial",
  "Oficina": "Oficina Privada",
  "Paisa": "Paisa / Airbnb"
};

// Función helper que usa el diccionario o devuelve el valor original
export const translate = (val: string) => TRANSLATIONS[val] || val;