import { 
  Siren, Flame, Droplets, Container, Zap, Truck, ShieldAlert, Factory,
  Warehouse, Store, Briefcase, MapPin, Layers, Maximize, Ruler, ArrowUpFromLine
} from "lucide-react";

// Iconos Específicos para Bodegas
export const BODEGA_ICONS: Record<string, any> = {
  "Alarma Incendio": Siren, 
  "Detectores Humo": Flame, 
  "Rociadores": Droplets, 
  "Tanques Agua": Container,
  "Planta Eléctrica": Zap, 
  "Muelle Carga": Truck, 
  "Muelles": Truck,
  "Vigilancia 24h": ShieldAlert, 
  "Zona Franca": Factory,
  "Oficinas": Briefcase, 
  "Tractomulas": Truck, 
  "Entrada Tractomulas": Truck,
  "Locales": Store,
  "Altura": ArrowUpFromLine,
  "Piso Alta Resistencia": Layers,
  "Transformador": Zap
};

// Traducciones para Bodegas
export const TRANSLATIONS: Record<string, string> = {
  // Tipo Portón
  "Doble Altura": "Doble Altura",
  "Triple Altura": "Triple Altura",
  "Corredizo": "Corredizo",
  "Levadizo": "Levadizo",
  "Persiana": "Persiana",
  "Muelle": "Muelle de Carga",

  // Ubicación
  "Parque Industrial": "Parque Industrial",
  "Zona Franca": "Zona Franca",
  "Vía Principal": "Vía Principal",
  "Interior": "Lote Interior",
  "Esquinera": "Esquinera",

  // Edad
  "Estrenar": "Para Estrenar",
  "Menos de 1 año": "< 1 Año",
  "1 a 9 años": "1 - 9 Años",
  "10 a 20 años": "10 - 20 Años",
  "Más de 20 años": "> 20 Años",
  "Remodelado": "Remodelado"
};

export const translate = (val: string) => TRANSLATIONS[val] || val;