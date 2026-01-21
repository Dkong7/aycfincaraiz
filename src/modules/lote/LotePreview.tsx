import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./lote.config";
import { 
  Map, ScrollText, Zap, Maximize, Ruler, 
  DollarSign, CheckCircle2, Briefcase, MapPin 
} from 'lucide-react';

export default function LotePreview({ data }: any) {
  const s = data.specs || {};
  
  // --- CORRECCIÓN CRÍTICA: Aseguramos que sea un Array ---
  const featuresList = Array.isArray(s.features) ? s.features : [];

  // Helper para Secciones
  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-green-100 pb-1">
         {Icon && <Icon size={14} className="text-green-600" />}
         <h4 className="text-[10px] font-black uppercase text-green-600">{title}</h4>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-green-50/30 p-4 rounded-xl border border-green-100/50">
      
      {/* 1. RESUMEN EJECUTIVO */}
      <Section title="Resumen del Terreno" icon={Map}>
         <Row 
            label="Precio Venta" 
            val={data.price_cop ? formatCurrency(data.price_cop) : "$0"} 
            icon={DollarSign} 
            valClass="text-green-700 font-black text-sm" 
         />
         {data.price_usd && Number(data.price_usd) > 0 && (
            <Row 
                label="Precio USD" 
                val={`$${data.price_usd}`} 
                icon={DollarSign} 
                valClass="text-green-600 font-bold" 
            />
         )}
         <Row label="Área Total" val={`${s.area || 0} m²`} icon={Maximize} valClass="text-green-700 font-bold" />
         <Row label="Uso Suelo" val={translate(s.soil_use)} icon={Briefcase} />
      </Section>

      {/* 2. NORMATIVA & DIMENSIONES */}
      <Section title="Normativa & Dimensiones" icon={ScrollText}>
         <Row label="Dimensiones" val={`${s.front || 0} x ${s.depth || 0} m`} icon={Ruler} />
         <Row label="Topografía" val={translate(s.topography)} icon={Map} />
         <Row label="Índice Ocup." val={s.occupation_index ? `${s.occupation_index}%` : "--"} icon={ScrollText} />
         <Row label="Índice Const." val={s.construction_index} icon={ScrollText} />
         <Row label="Licencia Vigente" val={featuresList.includes("Licencia Vigente") ? "Sí" : "No"} icon={CheckCircle2} />
      </Section>

      {/* 3. UBICACIÓN */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Ubicación & Entorno" icon={MapPin}>
             <div className="grid grid-cols-2 gap-4">
                 <Row label="Tipo Ubicación" val={translate(s.location_type)} />
                 <Row label="Clasificación" val={translate(s.classification)} />
             </div>
         </Section>
      </div>

      {/* 4. SERVICIOS */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Servicios & Estado" icon={Zap}>
            <p className="text-xs text-gray-600 leading-relaxed italic">
               {featuresList.length > 0 ? featuresList.join(", ") : "Sin servicios registrados"}
            </p>
         </Section>
      </div>

    </div>
  );
}