import { 
  Store, ShoppingBag, Flame, Layers, Ruler, Maximize, 
  MapPin, Utensils, Zap, Truck, Car, Wind, Eye
} from "lucide-react";

// Iconos Específicos para Locales Comerciales
export const LOCAL_ICONS: Record<string, any> = {
  "Mezzanine": Layers, 
  "Terraza Privada": Store, 
  "Gas Industrial": Flame,
  "Ducto Extracción": Wind, 
  "Energía Trifásica": Zap, 
  "Trampa de Grasas": Utensils,
  "Bahía de Parqueo": Car, 
  "Zona de Carga": Truck,
  "Esquinero": MapPin,
  "Vitrina": Eye
};

// Traducciones Específicas
export const TRANSLATIONS: Record<string, string> = {
  // Tipo Ubicación
  "Calle": "Local a la Calle",
  "Centro Comercial": "Centro Comercial",
  "Plazoleta": "Plazoleta de Comidas",
  "Pasaje": "Pasaje Comercial",

  // Baños
  "Interno": "Baño Interno",
  "Ambos": "Interno + Cial",
  
  // Pisos
  "Cerámica": "Cerámica",
  "Porcelanato": "Porcelanato",
  "Cemento": "Cemento Afinado",
  "Madera": "Madera Laminada"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;