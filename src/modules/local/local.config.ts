import { 
  Store, ShoppingBag, Flame, Layers, Ruler, Maximize, 
  MapPin, Utensils, Zap, Truck, Car, Wind, Eye,
  Calendar, CheckCircle2, DollarSign
} from "lucide-react";

// Iconos Específicos para Locales Comerciales
export const LOCAL_ICONS: Record<string, any> = {
  // Características Específicas
  "Mezzanine": Layers, 
  "Terraza Privada": Store, 
  "Gas Industrial": Flame,
  "Ducto Extracción": Wind, 
  "Energía Trifásica": Zap, 
  "Trampa de Grasas": Utensils,
  "Bahía de Parqueo": Car, 
  "Zona de Carga": Truck,
  "Esquinero": MapPin,
  "Vitrina": Eye,

  // Genéricos de Ficha
  "Ubicación": MapPin,
  "Estrato": Layers,
  "Administración": DollarSign,
  "Antigüedad": Calendar,
  "Baños": Utensils
};

// Traducciones Específicas (Sincronizadas con LocalForm)
export const TRANSLATIONS: Record<string, string> = {
  // --- UBICACIÓN ---
  "Calle Principal": "Local a la Calle (Vía Ppal)",
  "Calle Secundaria": "Local en Vía Secundaria",
  "Centro Comercial": "En Centro Comercial",
  "Plazoleta": "Plazoleta de Comidas",
  "Pasaje Comercial": "Pasaje Comercial",

  // --- BAÑOS ---
  "No tiene": "Sin Baño Privado",
  "1 (Privado)": "1 Baño Privado",
  "2 (H/M)": "Batería Hombres/Mujeres",
  "Batería Baños": "Batería de Baños",
  "De uso común (CC)": "Uso Común (C.C.)",
  "Ambos": "Privado + Común",
  
  // --- PISOS ---
  "Cerámica": "Piso en Cerámica",
  "Porcelanato": "Piso en Porcelanato",
  "Cemento Afinado": "Cemento Afinado",
  "Madera Laminada": "Madera Laminada",
  "Vinilo": "Piso Vinílico",
  "Alfombra": "Alfombra",

  // --- GAS ---
  "Red Natural": "Gas Natural",
  "Pipeta": "Pipeta / Cilindro",
  "Industrial": "Gas Industrial",

  // --- ANTIGÜEDAD (Estándar) ---
  "Estrenar": "Para Estrenar",
  "1 a 5 años": "1 a 5 Años",
  "5 a 10 años": "5 a 10 Años",
  "10 a 20 años": "10 a 20 Años",
  "+20 años": "Más de 20 Años",
  "Remodelado": "Remodelado"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;