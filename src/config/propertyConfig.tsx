import React from 'react';
import { 
  Bed, Bath, Car, Ruler, Layers, Utensils, Receipt, 
  Maximize, AlignJustify, MapPin, Building2, Warehouse, 
  Store, Briefcase, Mountain, Layout, Home, Calendar,
  Shield, Key, FileText, Droplet, Zap, Flame, Eye, 
  ArrowUpFromLine, TreePine
} from "lucide-react";

// 1. CONFIGURACIÓN DE TIPOS (PALETA DE COLORES CORREGIDA)
export const PROPERTY_TYPES_THEME: any = {
  "Casa": { 
      icon: <Home/>, 
      color: "bg-yellow-500", 
      text: "text-yellow-700", 
      border: "border-yellow-300", 
      bgLight: "bg-yellow-50" 
  },
  "Apartamento": { 
      icon: <Building2/>, 
      color: "bg-blue-600", 
      text: "text-blue-600", 
      border: "border-blue-500", 
      bgLight: "bg-blue-50" 
  },
  "Bodega": { // Marrón (Amber/Orange oscuro)
      icon: <Warehouse/>, 
      color: "bg-amber-700", 
      text: "text-amber-800", 
      border: "border-amber-600", 
      bgLight: "bg-amber-50" 
  },
  "Casa Campestre": { // Morado
      icon: <TreePine/>, 
      color: "bg-purple-600", 
      text: "text-purple-600", 
      border: "border-purple-500", 
      bgLight: "bg-purple-50" 
  },
  "Finca": { // Morado
      icon: <Mountain/>, 
      color: "bg-purple-600", 
      text: "text-purple-600", 
      border: "border-purple-500", 
      bgLight: "bg-purple-50" 
  },
  "Rural": { // Morado (Agregado por si acaso)
      icon: <Mountain/>, 
      color: "bg-purple-600", 
      text: "text-purple-600", 
      border: "border-purple-500", 
      bgLight: "bg-purple-50" 
  },
  "Lote": { // Verde
      icon: <Layout/>, 
      color: "bg-green-600", 
      text: "text-green-700", 
      border: "border-green-500", 
      bgLight: "bg-green-50" 
  },
  "Terreno": { // Verde
      icon: <Layout/>, 
      color: "bg-green-600", 
      text: "text-green-700", 
      border: "border-green-500", 
      bgLight: "bg-green-50" 
  },
  "Local": { // Rosado
      icon: <Store/>, 
      color: "bg-pink-500", 
      text: "text-pink-600", 
      border: "border-pink-400", 
      bgLight: "bg-pink-50" 
  },
  "Oficina": { // Azul Clarito (Cyan)
      icon: <Briefcase/>, 
      color: "bg-cyan-500", 
      text: "text-cyan-600", 
      border: "border-cyan-400", 
      bgLight: "bg-cyan-50" 
  },
  // Default fallback
  "default": { 
      icon: <AlignJustify/>, 
      color: "bg-gray-500", 
      text: "text-gray-600", 
      border: "border-gray-400", 
      bgLight: "bg-gray-50" 
  }
};

// 2. DICCIONARIO DE METADATA (Sin cambios, se mantiene tu estructura)
export const FIELD_METADATA: any = {
  rooms: { labelKey: "det_rooms", icon: <Bed size={18}/> },
  habs: { labelKey: "det_rooms", icon: <Bed size={18}/> },
  bathrooms: { labelKey: "det_baths", icon: <Bath size={18}/> },
  baths: { labelKey: "det_baths", icon: <Bath size={18}/> },
  garages: { labelKey: "garages", icon: <Car size={18}/> },
  garage_type: { labelKey: "garage_type", icon: <Car size={18}/> },
  area_built: { labelKey: "det_area", icon: <Ruler size={18}/> },
  area_private: { labelKey: "area_private", icon: <Maximize size={18}/> },
  area_total: { labelKey: "area_total", icon: <Maximize size={18}/> },
  area_lot: { labelKey: "area_lot", icon: <Maximize size={18}/> },
  balcony_area: { labelKey: "balcony_area", icon: <Maximize size={18}/> },
  front: { labelKey: "front", icon: <Maximize size={18}/> },
  depth: { labelKey: "depth", icon: <Maximize size={18}/> },
  kitchen: { labelKey: "kitchen", icon: <Utensils size={18}/> },
  kitchen_type: { labelKey: "kitchen_type", icon: <Utensils size={18}/> },
  admin: { labelKey: "det_admin", icon: <Receipt size={18}/> },
  maintenance_fee: { labelKey: "det_admin", icon: <Receipt size={18}/> },
  stratum: { labelKey: "stratum", icon: <Layers size={18}/> },
  levels_list: { labelKey: "levels_list", icon: <Layers size={18}/> },
  floor_number: { labelKey: "floor_number", icon: <ArrowUpFromLine size={18}/> },
  total_floors: { labelKey: "total_floors", icon: <Building2 size={18}/> },
  height: { labelKey: "height", icon: <ArrowUpFromLine size={18}/> },
  antiquity: { labelKey: "antiquity", icon: <Calendar size={18}/> },
  building_age: { labelKey: "antiquity", icon: <Calendar size={18}/> },
  has_surveillance: { labelKey: "has_surveillance", icon: <Shield size={18}/> },
  has_rent: { labelKey: "has_rent", icon: <Key size={18}/> },
  legal_status: { labelKey: "legal_status", icon: <FileText size={18}/> },
  water: { labelKey: "water", icon: <Droplet size={18}/> },
  energy: { labelKey: "energy", icon: <Zap size={18}/> },
  industrial_gas: { labelKey: "industrial_gas", icon: <Flame size={18}/> },
  gas_type: { labelKey: "gas_type", icon: <Flame size={18}/> },
  view_type: { labelKey: "view_type", icon: <Eye size={18}/> },
  garden: { labelKey: "garden", icon: <TreePine size={18}/> },
  default: { labelKey: "det_features", icon: <AlignJustify size={18}/> }
};

export const getFieldKey = (key: string) => FIELD_METADATA[key]?.labelKey || key;
export const getFieldIcon = (key: string) => FIELD_METADATA[key]?.icon || FIELD_METADATA.default.icon;