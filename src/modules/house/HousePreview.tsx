import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./house.config";
import { 
  Home, Maximize, LayoutDashboard, PaintBucket, 
  Star, Users, Banknote, Layers, ArrowRight,
  DollarSign, Hash, Building, Calendar, Ruler,
  Bed, Bath, Car, ChefHat, Grid, Utensils, Flame
} from "lucide-react";

export default function HousePreview({ data }: any) {
  const s = data.specs || {};

  // Helper para secciones con Icono en el título
  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-yellow-100 pb-1">
         {Icon && <Icon size={14} className="text-yellow-600" />}
         <h4 className="text-[10px] font-black uppercase text-yellow-600">{title}</h4>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );

  // Helper para Filas con Icono Específico y Color Personalizable
  const Row = ({ label, val, icon: Icon, valClass }: any) => (
    <div className="flex justify-between items-center border-b border-gray-50 last:border-0 py-1.5">
       <div className="flex items-center gap-2">
          {Icon && <Icon size={13} className="text-gray-400 shrink-0" />}
          <span className="font-bold text-xs text-gray-500">{label}:</span>
       </div>
       {/* Aquí aplicamos el color verde si se pasa 'valClass', sino usa gris por defecto */}
       <span className={`text-right font-bold text-xs ${valClass || "text-gray-800"}`}>{val || "--"}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-xl">
      
      {/* 1. BÁSICOS & PRECIO (Con Precios en Verde) */}
      <Section title="Resumen General" icon={Home}>
         <Row 
            label="Precio Venta" 
            val={data.price_cop ? formatCurrency(data.price_cop) : "$0"} 
            icon={DollarSign} 
            valClass="text-green-600 font-black text-sm" // <--- VERDE Y MÁS GRANDE
         />
         {data.price_usd && Number(data.price_usd) > 0 && (
            <Row 
               label="Precio USD" 
               val={`$${data.price_usd}`} 
               icon={DollarSign} 
               valClass="text-green-600 font-bold" // <--- VERDE
            />
         )}
         <Row label="Estrato" val={s.stratum} icon={Hash} />
         <Row label="Administración" val={data.admin_fee ? formatCurrency(data.admin_fee) : "N/A"} icon={Building} />
         <Row label="Antigüedad" val={s.antiquity} icon={Calendar} />
      </Section>

      {/* 2. DIMENSIONES */}
      <Section title="Dimensiones" icon={Maximize}>
         <Row label="Área Lote" val={`${s.area_lot || 0} m²`} icon={Maximize} />
         <Row label="Área Construida" val={`${s.area_built || 0} m²`} icon={Ruler} />
         <Row label="Área Privada" val={`${s.area_private || 0} m²`} icon={Ruler} />
         <Row label="Frente x Fondo" val={`${s.front || 0} x ${s.depth || 0} m`} icon={Grid} />
      </Section>

      {/* 3. DISTRIBUCIÓN */}
      <Section title="Distribución" icon={LayoutDashboard}>
         <Row label="Habitaciones" val={s.habs} icon={Bed} />
         <Row label="Baños" val={s.baths} icon={Bath} />
         <Row label="Garajes" val={`${s.garages} (${translate(s.garage_type)})`} icon={Car} />
         <Row label="Niveles" val={s.levels_list?.length || 1} icon={Layers} />
      </Section>

      {/* 4. ACABADOS */}
      <Section title="Acabados y Servicios" icon={PaintBucket}>
         <Row label="Cocina" val={translate(s.kitchen)} icon={ChefHat} />
         <Row label="Pisos" val={translate(s.floors)} icon={Grid} />
         <Row label="Comedor" val={translate(s.dining)} icon={Utensils} />
         <Row label="Tipo Gas" val={translate(s.gas_type)} icon={Flame} />
      </Section>

      {/* 5. COMODIDADES (LISTAS) */}
      <div className="col-span-1 md:col-span-2 space-y-3">
         {s.features && s.features.length > 0 && (
            <Section title="Comodidades Casa" icon={Star}>
               <p className="leading-relaxed text-xs text-gray-600">{s.features.join(", ")}</p>
            </Section>
         )}
         
         {s.has_social && s.social_features && (
            <Section title="Zonas Comunes (Conjunto)" icon={Users}>
               <p className="leading-relaxed text-xs text-blue-600">{s.social_features.join(", ")}</p>
            </Section>
         )}
      </div>

      {/* 6. RENTA */}
      {s.has_rent && (
         <div className="col-span-1 md:col-span-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
             <div className="flex items-center gap-2 mb-2 border-b border-blue-200 pb-1">
                <Banknote size={14} className="text-blue-600" />
                <h4 className="text-[10px] font-black uppercase text-blue-600">Detalles de Renta</h4>
             </div>
             <div className="grid grid-cols-2 gap-4 text-xs">
                <Row label="Tipo" val={s.rent_type} icon={Banknote} />
                <Row label="Canon" val={formatCurrency(s.rent_value)} icon={DollarSign} valClass="text-blue-700 font-bold" />
                <div className="col-span-2 pt-2 border-t border-blue-200">
                   <span className="font-bold text-blue-400 block mb-1 text-[10px] uppercase">Descripción Renta:</span>
                   <p className="italic text-blue-800 text-xs">{s.rent_desc || "Sin descripción"}</p>
                </div>
             </div>
         </div>
      )}

      {/* 7. NIVELES DETALLADOS */}
      {s.levels_list && s.levels_list.length > 0 && (
         <div className="col-span-1 md:col-span-2 mt-2">
            <div className="flex items-center gap-2 mb-2">
               <Layers size={14} className="text-gray-400" />
               <h4 className="text-[10px] font-black uppercase text-gray-400">Desglose de Niveles</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
               {s.levels_list.map((lvl: any, idx: number) => (
                  <div key={idx} className="bg-white border p-2 rounded text-xs flex gap-2 items-start shadow-sm">
                     <ArrowRight size={12} className="text-yellow-500 mt-1 shrink-0" />
                     <div className="w-full">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-gray-800 uppercase text-[10px]">{lvl.name}</span>
                          <span className="text-gray-400 text-[9px] flex gap-2">
                             <span className="flex items-center gap-0.5"><Bed size={8}/> {lvl.rooms}</span>
                             <span className="flex items-center gap-0.5"><Bath size={8}/> {lvl.baths}</span>
                          </span>
                       </div>
                       <p className="text-gray-600 text-[10px] leading-tight line-clamp-2">{lvl.desc}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      )}

    </div>
  );
}