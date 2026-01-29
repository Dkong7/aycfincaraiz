import { 
  MapPin, Droplets, Zap, FileText, Pickaxe, Mountain, Construction, 
  Map, Ruler, Maximize, Briefcase, FileCheck, Wifi, Flame, Lightbulb,
  Footprints, Waves, Files, Car
} from "lucide-react";

// Iconos Específicos para Lotes (Mapeo de 'features' y etiquetas)
export const LOTE_ICONS: Record<string, any> = {
  // Servicios & Infraestructura
  "Acometida Agua": Droplets,
  "Energía / Luz": Zap,
  "Alcantarillado": Waves,
  "Gas Natural": Flame,
  "Vías Pavimentadas": Car,
  "Alumbrado Público": Lightbulb,
  "Andenes": Footprints,
  "Red Internet": Wifi,
  
  // Estado Legal
  "Licencia Vigente": FileCheck,
  "Predio Desenglobado": Files,
  "Licencia Construcción": FileText,
  "Estudio Suelos": Pickaxe,
  "Levantamiento Topo": Mountain,
  "Cerramiento": Construction,

  // Genéricos Ficha
  "Uso de Suelo": Briefcase,
  "Topografía": Mountain,
  "Area": Maximize,
  "Frente": Ruler,
  "Fondo": Ruler
};

// Traducciones Específicas (Valor DB -> Texto Legible)
export const TRANSLATIONS: Record<string, string> = {
  // --- TOPOGRAFÍA ---
  "Plano": "Terreno Plano",
  "Inclinado": "Terreno Inclinado",
  "Mixto": "Topografía Mixta",
  "Ondulado": "Terreno Ondulado",
  
  // --- UBICACIÓN ---
  "Esquinero": "Lote Esquinero",
  "Medianero": "Lote Medianero",
  "Sobre Vía Principal": "Sobre Vía Principal",
  "Interior": "Lote Interior",
  "Callejón": "En Callejón",

  // --- CLASIFICACIÓN ---
  "Urbano": "Suelo Urbano",
  "Suburbano": "Suelo Suburbano",
  "Rural": "Suelo Rural",
  "Expansión Urbana": "Expansión Urbana",

  // --- USO DE SUELO (Mapeo de opciones largas a cortas) ---
  "Residencial (Vivienda)": "Uso Residencial",
  "Comercial / Servicios": "Comercial y Servicios",
  "Industrial / Bodegas": "Industrial / Logístico",
  "Dotacional / Institucional": "Dotacional / Institucional",
  "Mixto (Vivienda + Comercio)": "Uso Mixto",
  "Agrícola / Recreativo": "Agrícola / Recreativo"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;