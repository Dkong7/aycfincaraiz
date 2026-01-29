import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./local.config";
import { 
  Store, DollarSign, MapPin, Maximize, CheckCircle2,
  Hash, Building, Calendar, Ruler, Layers, Flame
} from "lucide-react";

export default function LocalPreview({ data }: any) {
  const s = data.specs || {};

  // VALIDACIÓN DEFENSIVA: Aseguramos que sea un array antes de usarlo
  const featuresList = Array.isArray(s.features) ? s.features : [];

  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-pink-100 pb-1">
         {Icon && <Icon size={14} className="text-pink-600" />}
         <h4 className="text-[10px] font-black uppercase text-pink-600">{title}</h4>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-pink-50/30 p-4 rounded-xl border border-pink-100/50">
      
      {/* 1. RESUMEN FINANCIERO & LEGAL */}
      <Section title="Resumen Ejecutivo" icon={Store}>
         <Row label="Precio Venta" val={data.price_cop ? formatCurrency(data.price_cop) : "$0"} icon={DollarSign} valClass="text-green-600 font-black text-sm" />
         {data.price_usd && Number(data.price_usd) > 0 && (
            <Row label="Precio USD" val={`$${data.price_usd}`} icon={DollarSign} valClass="text-green-600 font-bold" />
         )}
         
         <Row label="Estrato" val={data.stratum} icon={Hash} />
         <Row label="Administración" val={data.admin_fee ? formatCurrency(data.admin_fee) : "N/A"} icon={Building} />
         <Row label="Antigüedad" val={s.antiquity} icon={Calendar} />
         <Row label="Ubicación" val={translate(s.location_type)} icon={MapPin} />
      </Section>

      {/* 2. DETALLES TÉCNICOS */}
      <Section title="Dimensiones & Técnica" icon={Maximize}>
         <Row label="Área Total" val={`${s.area_total || 0} m²`} icon={Maximize} valClass="text-pink-700 font-bold" />
         <Row label="Frente / Vitrina" val={`${s.front || 0} m`} icon={Ruler} />
         <Row label="Altura Libre" val={`${s.height || 0} m`} icon={Ruler} />
         
         <Row label="Baños" val={translate(s.bathrooms)} />
         <Row label="Pisos" val={translate(s.floors)} icon={Layers} />
         <Row label="Gas" val={translate(s.gas_type)} icon={Flame} />
      </Section>

      {/* 3. ADECUACIONES */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Equipamiento Especial" icon={CheckCircle2}>
            <p className="text-xs text-gray-600 leading-relaxed italic">
               {featuresList.length > 0 ? featuresList.join(", ") : "Sin equipamiento especial registrado"}
            </p>
         </Section>
      </div>
    </div>
  );
}