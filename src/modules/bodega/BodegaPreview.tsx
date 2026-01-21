import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./bodega.config";
import { 
  Factory, Maximize, DollarSign, Zap, 
  Truck, ArrowUpFromLine, Layers, Container,
  Briefcase, Store, CheckCircle2
} from "lucide-react";

export default function BodegaPreview({ data }: any) {
  const s = data.specs || {};

  // 1. Helper para Secciones
  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-amber-100 pb-1">
         {Icon && <Icon size={14} className="text-amber-600" />}
         <h4 className="text-[10px] font-black uppercase text-amber-600">{title}</h4>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );

  // 2. Helper para Filas
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-amber-50/30 p-4 rounded-xl border border-amber-100/50">
      
      {/* 1. RESUMEN EJECUTIVO */}
      <Section title="Resumen Ejecutivo" icon={Factory}>
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
         <Row label="Área Total" val={`${s.area_total || 0} m²`} icon={Maximize} valClass="text-amber-700 font-bold" />
         <Row label="Ubicación" val={translate(s.location_type)} icon={Factory} />
      </Section>

      {/* 2. CAPACIDAD TÉCNICA */}
      <Section title="Capacidad Técnica" icon={Zap}>
         <Row label="Altura Libre" val={`${s.height || 0} m`} icon={ArrowUpFromLine} />
         <Row label="Energía" val={`${s.energy_kva || 0} KVA`} icon={Zap} />
         <Row label="Resistencia Piso" val={s.floor_resistance} icon={Layers} />
      </Section>

      {/* 3. LOGÍSTICA & ACCESO */}
      <Section title="Logística" icon={Truck}>
         <Row label="Tipo Portón" val={translate(s.gate_type)} icon={Container} />
         <Row label="Tractomulas" val={s.has_truck_access ? "Sí" : "No"} icon={Truck} />
         <Row label="Oficinas" val={s.has_offices ? "Sí" : "No"} icon={Briefcase} />
         {Number(s.locales_count) > 0 && (
            <Row label="Locales" val={`${s.locales_count} Und.`} icon={Store} valClass="text-amber-600 font-bold" />
         )}
      </Section>

      {/* 4. EQUIPAMIENTO INDUSTRIAL */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Seguridad & Dotación" icon={CheckCircle2}>
            <p className="text-xs text-gray-600 leading-relaxed italic">
               {[...(s.industrial_features || [])].join(", ") || "Sin equipamiento especial registrado"}
            </p>
         </Section>
      </div>

    </div>
  );
}