import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./apartment.config";
import { 
  Building2, Maximize, ArrowUpFromLine, Receipt, 
  Bed, Bath, Car, CheckCircle2, DollarSign,
  Calendar, Layers, Eye, ChefHat, Grid, Shirt
} from "lucide-react";

export default function ApartmentPreview({ data }: any) {
  const s = data.specs || {};

  // 1. Helper para Secciones
  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-blue-100 pb-1">
         {Icon && <Icon size={14} className="text-blue-600" />}
         <h4 className="text-[10px] font-black uppercase text-blue-600">{title}</h4>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );

  // 2. Helper para Filas (con color personalizable)
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
      
      {/* 1. RESUMEN FINANCIERO & GENERAL */}
      <Section title="Resumen Ejecutivo" icon={Building2}>
         <Row 
            label="Precio Venta" 
            val={data.price_cop ? formatCurrency(data.price_cop) : "$0"} 
            icon={DollarSign} 
            valClass="text-green-600 font-black text-sm" // PRECIO EN VERDE
         />
         {data.price_usd && Number(data.price_usd) > 0 && (
            <Row 
                label="Precio USD" 
                val={`$${data.price_usd}`} 
                icon={DollarSign} 
                valClass="text-green-600 font-bold" 
            />
         )}
         <Row label="Administración" val={data.admin_fee ? formatCurrency(data.admin_fee) : "N/A"} icon={Receipt} />
         <Row label="Antigüedad" val={s.antiquity} icon={Calendar} />
         <Row label="Estrato" val={s.stratum} icon={Layers} />
      </Section>

      {/* 2. UBICACIÓN & ESPACIO */}
      <Section title="Dimensiones y Ubicación" icon={Maximize}>
         <Row label="Área Construida" val={`${s.area_built || 0} m²`} icon={Maximize} />
         <Row label="Piso N°" val={s.floor_level} icon={ArrowUpFromLine} />
         <Row label="Tipo de Vista" val={translate(s.view_type)} icon={Eye} />
         <Row label="Garajes" val={`${s.garages} (${translate(s.garage_type)})`} icon={Car} />
      </Section>

      {/* 3. DISTRIBUCIÓN & ACABADOS */}
      <Section title="Interiores" icon={ChefHat}>
         <Row label="Habitaciones" val={s.habs} icon={Bed} />
         <Row label="Baños" val={s.baths} icon={Bath} />
         <Row label="Cocina" val={translate(s.kitchen)} icon={ChefHat} />
         <Row label="Pisos" val={translate(s.floors)} icon={Grid} />
         <Row label="Zona Ropas" val={translate(s.laundry)} icon={Shirt} />
      </Section>

      {/* 4. EXTRAS / AMENIDADES */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Amenidades Destacadas" icon={CheckCircle2}>
            <p className="text-xs text-gray-600 leading-relaxed italic">
               {[...(s.features || [])].join(", ") || "Sin amenidades seleccionadas"}
            </p>
         </Section>
      </div>

    </div>
  );
}