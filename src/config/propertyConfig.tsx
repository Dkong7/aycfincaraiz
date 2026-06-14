import React from "react";
import {
  Maximize, Bed, Bath,
  Car as _CarSpec, Layers as _LayersSpec, Calendar as _CalSpec,
  ArrowUp, Ruler as _RulerSpec, DollarSign as _DollarSpec,
  Home as _HomeSpec, MapPin as _MapSpec, CheckSquare as _CheckSpec,
  Hash as _HashSpec, Zap as _ZapSpec2, Droplets as _DropletsSpec2,
  ChefHat as _ChefSpec, Grid as _GridSpec2, Flame as _FlameSpec2,
  Shield as _ShieldSpec2, Truck as _TruckSpec2, Package as _PackageSpec2,
  Users as _UsersSpec2, Wind as _WindSpec2, Wifi as _WifiSpec2,
  Trees as _TreesSpec2, Building as _BuildingSpec2,
} from "lucide-react";

const _FIELD_ICONS: Record<string, React.ReactElement> = {
  area_built:   React.createElement(Maximize,       { size: 22 }),
  area_lot:     React.createElement(Maximize,       { size: 22 }),
  area_total:   React.createElement(Maximize,       { size: 22 }),
  area_private: React.createElement(_RulerSpec,     { size: 22 }),
  habs:         React.createElement(Bed,            { size: 22 }),
  rooms:        React.createElement(Bed,            { size: 22 }),
  baths:        React.createElement(Bath,           { size: 22 }),
  bathrooms:    React.createElement(Bath,           { size: 22 }),
  garages:      React.createElement(_CarSpec,       { size: 22 }),
  garage_type:  React.createElement(_CarSpec,       { size: 22 }),
  stratum:      React.createElement(_LayersSpec,    { size: 22 }),
  antiquity:    React.createElement(_CalSpec,       { size: 22 }),
  building_age: React.createElement(_CalSpec,       { size: 22 }),
  height:       React.createElement(ArrowUp,        { size: 22 }),
  clear_height: React.createElement(ArrowUp,        { size: 22 }),
  levels:       React.createElement(_LayersSpec,    { size: 22 }),
  levels_qty:   React.createElement(_LayersSpec,    { size: 22 }),
  admin_fee:    React.createElement(_DollarSpec,    { size: 22 }),
  front:        React.createElement(_RulerSpec,     { size: 22 }),
  depth:        React.createElement(_RulerSpec,     { size: 22 }),
  address:      React.createElement(_MapSpec,       { size: 22 }),
  kitchen:      React.createElement(_ChefSpec,      { size: 22 }),
  floors:       React.createElement(_GridSpec2,     { size: 22 }),
  gas_type:     React.createElement(_FlameSpec2,    { size: 22 }),
  energy:       React.createElement(_ZapSpec2,      { size: 22 }),
  water:        React.createElement(_DropletsSpec2, { size: 22 }),
  security:     React.createElement(_ShieldSpec2,   { size: 22 }),
  loading_dock: React.createElement(_TruckSpec2,    { size: 22 }),
  cargo_area:   React.createElement(_PackageSpec2,  { size: 22 }),
  offices:      React.createElement(_BuildingSpec2, { size: 22 }),
  capacity:     React.createElement(_UsersSpec2,    { size: 22 }),
  ac:           React.createElement(_WindSpec2,     { size: 22 }),
  internet:     React.createElement(_WifiSpec2,     { size: 22 }),
  trees:        React.createElement(_TreesSpec2,    { size: 22 }),
  zoning:       React.createElement(_HashSpec,      { size: 22 }),
  listing_type: React.createElement(_HomeSpec,      { size: 22 }),
  has_rent:     React.createElement(_CheckSpec,     { size: 22 }),
};

const _DEFAULT_ICON = React.createElement(_HashSpec, { size: 22 });

export function getFieldIcon(key: string): React.ReactElement {
  return _FIELD_ICONS[key] ?? _DEFAULT_ICON;
}

const _FIELD_KEYS: Record<string, string> = {
  area_built:   "Área Construida",
  area_lot:     "Área Lote",
  area_total:   "Área Total",
  area_private: "Área Privada",
  habs:         "Habitaciones",
  rooms:        "Habitaciones",
  baths:        "Baños",
  bathrooms:    "Baños",
  garages:      "Garajes",
  garage_type:  "Tipo Garaje",
  stratum:      "Estrato",
  antiquity:    "Antigüedad",
  building_age: "Antigüedad",
  height:       "Altura",
  clear_height: "Altura Libre",
  levels:       "Niveles",
  levels_qty:   "Niveles",
  admin_fee:    "Administración",
  front:        "Frente",
  depth:        "Fondo",
  kitchen:      "Cocina",
  floors:       "Pisos",
  gas_type:     "Tipo Gas",
  energy:       "Energía",
  water:        "Agua",
  listing_type: "Tipo Negocio",
  has_rent:     "Con Renta",
  rent_value:   "Canon Renta",
  rent_type:    "Tipo Renta",
  zoning:       "Uso Suelo",
  capacity:     "Capacidad",
  ac:           "Aire Acond.",
  dining:       "Comedor",
};

export function getFieldKey(key: string): string {
  return _FIELD_KEYS[key] ?? key.replace(/_/g, " ");
}

export const PROPERTY_TYPES_THEME: Record<string, { color: string; label: string }> = {
  "Casa":        { color: "bg-yellow-500",  label: "Casa" },
  "Apartamento": { color: "bg-blue-500",    label: "Apartamento" },
  "Bodega":      { color: "bg-amber-600",   label: "Bodega" },
  "Local":       { color: "bg-pink-500",    label: "Local" },
  "Oficina":     { color: "bg-emerald-500", label: "Oficina" },
  "Lote":        { color: "bg-gray-500",    label: "Lote" },
  "Terreno":     { color: "bg-gray-600",    label: "Terreno" },
  "Finca":       { color: "bg-purple-500",  label: "Finca" },
  "Rural":       { color: "bg-purple-600",  label: "Rural" },
  "CasaCampo":   { color: "bg-purple-400",  label: "Casa de Campo" },
  "default":     { color: "bg-gray-400",    label: "Inmueble" },
};