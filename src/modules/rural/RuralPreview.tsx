import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./rural.config";
import { 
  Mountain, Home, DollarSign, Trees, 
  Map, Droplets, Route, Fence, 
  Bed, Bath, Maximize
} from "lucide-react";

export default function RuralPreview({ data }: any) {
  const s = data.specs || {};

  // Helper para Secciones
  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-purple-100 pb-1">
         {Icon && <Icon size={14} className="text-purple-600" />}
         <h4 className="text-[10px] font-black uppercase text-purple-600">{title}</h4>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );

  // Helper para Filas
  const Row = ({ label, val, icon: Icon, valClass }: any) => (
    <div className="flex justify-between items-center border-b border-gray-50 last:border-0 py-1.5">
       <div className="flex items-center gap-2">
          {Icon && <Icon size={13} className="text-gray-400 shrink-0" />}
          <span className="font-bold text-xs text-gray-500">{label}:</span>
       </div>
       <span className={`text-right font-bold text-xs ${valClass || "text-gray-800"}`}>
          {val || "--"}
       </span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-purple-50/30 p-4 rounded-xl border border-purple-100/50">
      
      {/* 1. RESUMEN EJECUTIVO (PRECIO Y LOTE) */}
      <Section title="Resumen Ejecutivo" icon={Mountain}>
         <Row 
            label="Precio Venta" 
            val={data.price_cop ? formatCurrency(data.price_cop) : "$0"} 
            icon={DollarSign} 
            valClass="text-green-600 font-black text-sm" 
         />
         {data.price_usd && Number(data.price_usd) > 0 && (
            <Row 
                label="Precio USD" 
                val={`$${data.price_usd}`} 
                icon={DollarSign} 
                valClass="text-green-600 font-bold" 
            />
         )}
         <Row label="Área Lote" val={s.land_area} icon={Maximize} valClass="text-purple-700 font-bold" />
         <Row label="Topografía" val={translate(s.topography)} icon={Map} />
      </Section>

      {/* 2. INFRAESTRUCTURA */}
      <Section title="Infraestructura" icon={Fence}>
         <Row label="Acceso" val={translate(s.access_type)} icon={Route} />
         <Row label="Fuente Agua" val={translate(s.water_source)} icon={Droplets} />
         <Row label="Cerramiento" val={translate(s.fencing)} icon={Fence} />
      </Section>

      {/* 3. CASA PRINCIPAL (Si existe) */}
      {Number(s.built_area) > 0 && (
         <Section title="Casa Principal" icon={Home}>
            <Row label="Área Const." val={`${s.built_area} m²`} icon={Maximize} />
            <Row label="Habitaciones" val={s.bedrooms} icon={Bed} />
            <Row label="Baños" val={s.bathrooms} icon={Bath} />
            <Row label="Niveles" val={s.levels} icon={Home} />
         </Section>
      )}

      {/* 4. AMENIDADES / CULTIVOS */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Inventario & Recreación" icon={Trees}>
            <p className="text-xs text-gray-600 leading-relaxed italic">
               {[...(s.features || [])].join(", ") || "Sin inventario adicional"}
            </p>
         </Section>
      </div>

    </div>
  );
}