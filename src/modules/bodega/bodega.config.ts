import { 
  Siren, Flame, Droplets, Container, Zap, Truck, ShieldAlert, Factory,
  Warehouse, Store, Briefcase, MapPin, Layers, Maximize, Ruler, ArrowUpFromLine,
  Hammer, Sun, Wind, Plug, Lock, Utensils, Bath, User, Lightbulb, Video
} from "lucide-react";

// 1. MAPEO DE ICONOS (Para que cada amenidad tenga su dibujo)
export const BODEGA_ICONS: Record<string, any> = {
  // Seguridad Básica
  "Alarma Incendio": Siren, 
  "Detectores Humo": Flame, 
  "Rociadores": Droplets, 
  "Tanques Agua": Container,
  "Planta Eléctrica": Zap, 
  "Vigilancia 24h": ShieldAlert, 
  "CCTV / Cámaras": Video,
  "Control Acceso": Lock,

  // Infraestructura & Extras
  "Puente Grúa": Hammer,
  "Piso Epóxico": Layers,
  "Techo Termoacústico": Wind,
  "Iluminación Natural": Sun,
  "Iluminación LED": Lightbulb,
  "Subestación Eléctrica": Plug,
  "Gas Industrial": Flame,
  "Red Contra Incendios": Droplets,
  "Batería de Baños": Bath,
  "Vestier / Lockers": User,
  "Casino / Cafetería": Utensils,
  "Muelle con Nivelador": Truck,
  
  // Genéricos
  "Oficinas": Briefcase, 
  "Tractomulas": Truck, 
  "Locales": Store,
  "Altura": ArrowUpFromLine,
  "Transformador": Zap
};

// 2. DICCIONARIO DE TRADUCCIÓN (Valor DB -> Texto Legible)
export const TRANSLATIONS: Record<string, string> = {
  // --- TIPO DE PORTÓN ---
  "Doble Altura": "Doble Altura",
  "Triple Altura": "Triple Altura",
  "Corredizo": "Corredizo",
  "Levadizo": "Levadizo",
  "Persiana": "Persiana Enrollable",
  "Muelle": "Muelle de Carga",
  "Muelle Nivelador": "Muelle con Nivelador",

  // --- UBICACIÓN ---
  "Parque Industrial": "En Parque Industrial",
  "Zona Franca": "En Zona Franca",
  "Vía Principal": "Sobre Vía Principal",
  "Interior": "Lote Interior",
  "Esquinera": "Esquinera",
  "Medianera": "Medianera",

  // --- TIPO DE PISO ---
  "Concreto Alta Resistencia": "Concreto Alta Resistencia",
  "Epóxico": "Piso Epóxico (Industrial)",
  "Baldosa": "Baldosa / Cerámica",
  "Afianzado": "Piso Afianzado",

  // --- COCINA / ALIMENTACIÓN ---
  "Cocineta": "Cocineta Básica",
  "Casino Empleados": "Casino para Empleados",
  "Cocina Integral": "Cocina Integral",
  "Sin Cocina": "Sin Cocina",

  // --- ESTADO OFICINAS ---
  "Obra Gris": "En Obra Gris",
  "Adecuadas": "Adecuadas / Listas",
  "Amobladas": "Amobladas",
  "Modernas": "Acabados Modernos",

  // --- MATERIAL MEZZANINE ---
  "Concreto": "Losa de Concreto",
  "Metálico": "Estructura Metálica",
  "Madera": "Madera / Drywall",
  "Mixto": "Material Mixto",

  // --- EDAD ---
  "Estrenar": "Para Estrenar",
  "Menos de 1 año": "< 1 Año",
  "1 a 5 años": "1 - 5 Años",
  "5 a 10 años": "5 - 10 Años",
  "10 a 20 años": "10 - 20 Años",
  "Más de 20 años": "> 20 Años",
  "+20 años": "> 20 Años",
  "Remodelado": "Remodelado"
};

// Función Helper para traducir
export const translate = (val: string) => TRANSLATIONS[val] || val;