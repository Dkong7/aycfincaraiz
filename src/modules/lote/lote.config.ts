import { 
  MapPin, Droplets, Zap, FileText, Pickaxe, Mountain, Construction, 
  Map, Ruler, Maximize, Briefcase, LandPlot
} from "lucide-react";

// Iconos Específicos para Lotes
export const LOTE_ICONS: Record<string, any> = {
  "Vía Principal": MapPin,
  "Acueducto": Droplets,
  "Energía": Zap,
  "Alcantarillado": Droplets,
  "Gas Natural": Zap,
  "Licencia Construcción": FileText,
  "Estudio Suelos": Pickaxe,
  "Levantamiento Topo": Mountain,
  "Cerramiento": Construction,
  "Uso de Suelo": Briefcase,
  "Topografía": Mountain,
  "Area": Maximize,
  "Frente": Ruler,
  "Fondo": Ruler
};

// Traducciones Específicas
export const TRANSLATIONS: Record<string, string> = {
  // Topografía
  "Plano": "Plano / Flat",
  "Inclinado": "Inclinado / Sloped",
  "Mixto": "Mixto / Mixed",
  
  // Ubicación (Claves Únicas)
  "Esquinero": "Esquinero / Corner Lot",
  "Medianero": "Medianero / Mid-block Lot",
  "Sobre Vía Principal": "Sobre Vía Ppal / On Main Road",
  "Interior": "Interior / Inner Lot",

  // Clasificación
  "Urbano": "Urbano / Urban",
  "Suburbano": "Suburbano / Suburban",
  "Rural": "Rural / Rural",
  "Expansión Urbana": "Expansión Urbana / Urban Expansion",

  // Uso de Suelo
  "Residencial": "Residencial",
  "Comercial": "Comercial",
  "Industrial": "Industrial",
  "Institucional": "Institucional",
  "Agrícola": "Agrícola",
  "Uso Mixto": "Uso Mixto"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;