import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./oficina.config";
import { 
  Building2, Maximize, DollarSign, CheckCircle2, 
  Briefcase, Network, Car, ArrowUpFromLine 
} from 'lucide-react';

export default function OficinaPreview({ data }: any) {
  const s = data.specs || {};
  
  // Validaciones defensivas para arrays
  const featuresList = Array.isArray(s.features) ? s.features : [];
  const amenitiesList = Array.isArray(s.amenities) ? s.amenities : [];

  // Helper para Secciones
  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-emerald-100 pb-1">
         {Icon && <Icon size={14} className="text-emerald-600" />}
         <h4 className="text-[10px] font-black uppercase text-emerald-600">{title}</h4>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/50">
      
      {/* 1. RESUMEN EJECUTIVO */}
      <Section title="Resumen Corporativo" icon={Briefcase}>
         <Row 
            label="Canon / Venta" 
            val={data.price_cop ? formatCurrency(data.price_cop) : "$0"} 
            icon={DollarSign} 
            valClass="text-emerald-700 font-black text-sm" 
         />
         {data.price_usd && Number(data.price_usd) > 0 && (
            <Row 
                label="Precio USD" 
                val={`$${data.price_usd}`} 
                icon={DollarSign} 
                valClass="text-emerald-600 font-bold" 
            />
         )}
         <Row label="Área Privada" val={`${s.area || 0} m²`} icon={Maximize} valClass="text-emerald-700 font-bold" />
         <Row label="Ubicación" val={`Piso ${s.floor_level || "-"}`} icon={ArrowUpFromLine} />
      </Section>

      {/* 2. DOTACIÓN */}
      <Section title="Dotación & Espacio" icon={Building2}>
         <Row label="Garajes Privados" val={s.garages} icon={Car} />
         <Row label="Tipo de Baños" val={translate(s.bathrooms_type)} />
         <Row label="Administración" val={data.admin_fee ? formatCurrency(data.admin_fee) : "N/A"} icon={DollarSign} />
      </Section>

      {/* 3. INFRAESTRUCTURA TÉCNICA */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Infraestructura Técnica" icon={Network}>
            <div className="flex flex-wrap gap-2">
               {featuresList.length > 0 ? (
                   featuresList.map((feat: string, i: number) => (
                       <span key={i} className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-1 rounded-md font-medium flex items-center gap-1">
                          <CheckCircle2 size={10}/> {feat}
                       </span>
                   ))
               ) : (
                   <span className="text-xs text-gray-400 italic">Sin especificaciones técnicas registradas</span>
               )}
            </div>
         </Section>
      </div>

      {/* 4. AMENIDADES EDIFICIO */}
      {amenitiesList.length > 0 && (
          <div className="col-span-1 md:col-span-2">
             <Section title="Amenidades del Edificio" icon={Briefcase}>
                <p className="text-xs text-gray-600 leading-relaxed italic">
                   {amenitiesList.join(", ")}
                </p>
             </Section>
          </div>
      )}

    </div>
  );
}