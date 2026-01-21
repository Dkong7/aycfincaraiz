import { 
  Flame, Wind, Sun, Flower2, BookOpen, Shirt, Box, ShieldCheck, 
  Coffee, Dumbbell, Waves, Trophy, Trees, Zap, Heater, Tv, Dog,
  Utensils, ChefHat, Layers, Car, Building
} from "lucide-react";

export const HOUSE_ICONS: Record<string, any> = {
  "Chimenea": Flame, "Balcón": Wind, "Terraza": Sun, "Jardín": Flower2,
  "Patio": Sun, "Estudio": BookOpen, "CBS (Cuarto Servicio)": Shirt,
  "Depósito": Box, "Vigilancia 24h": ShieldCheck, "Salón Comunal": Coffee,
  "Gimnasio": Dumbbell, "Piscina": Waves, "Canchas Squash": Trophy,
  "Canchas Tenis": Trophy, "Parque Niños": Trees, "Terraza BBQ": Flame,
  "Planta Eléctrica": Zap, "Caldera": Heater, "Teatrino": Tv,
  "Co-Working": BookOpen, "Sendero": Trees, "Pet Friendly": Dog,
  "Cocina": ChefHat, "Pisos": Layers, "Garaje": Car, "Comedor": Utensils
};

// DICCIONARIOS DE TRADUCCIÓN (RAW -> HUMAN READABLE)
export const TRANSLATIONS: Record<string, string> = {
  // Garajes
  "Cubierto": "Cubierto / Covered",
  "Descubierto": "Descubierto / Uncovered",
  "Doble Lineal": "Doble en Línea / Tandem",
  "Doble Paralelo": "Doble Paralelo / Side-by-Side",
  "Sencillo": "Sencillo / Single",
  "Servidumbre": "Servidumbre / Easement",
  
  // Cocina
  "Integral": "Integral / Fitted",
  "Americana": "Americana / American Style",
  "Isla": "Con Isla / Island",
  "Abierta": "Abierta / Open Plan",
  "Tradicional": "Tradicional / Traditional",
  "Cerrada": "Cerrada / Enclosed",
  "Para Remodelar": "Para Remodelar / To Renovate",

  // Gas
  "Natural": "Gas Natural",
  "Propano": "Gas Propano",
  "Pipeta": "Pipeta / Cylinder",
  "Red": "Red de Gas / Network",
  "Ninguno": "Sin Gas / None",

  // Pisos
  "Madera Maciza": "Madera Maciza / Solid Wood",
  "Madera Laminada": "Madera Laminada / Laminated",
  "Porcelanato": "Porcelanato / Porcelain",
  "Mármol": "Mármol / Marble",
  "Cerámica": "Cerámica / Ceramic",
  "Alfombra": "Alfombra / Carpet",
  "Retal de Mármol": "Retal de Mármol / Marble Scraps",
  "PVC / Vinilo": "PVC / Vinyl",

  // Comedor
  "Independiente": "Independiente / Separate",
  "Un Ambiente": "Un Ambiente / Single Room",
  "Barra Americana": "Barra Americana / Breakfast Bar",

  // Legal (Aunque no se muestra en público, sirve para Preview interno)
  "mortgage": "Hipoteca / Mortgage",
  "succession": "Sucesión / Succession",
  "family_equity": "Patrimonio Familia"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;