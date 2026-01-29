import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./apartment.config";
import { 
  Building2, Maximize, ArrowUpFromLine, Receipt, 
  Car, CheckCircle2, DollarSign,
  Calendar, Layers, Eye, ChefHat, Grid, Shirt, Trees, Bed, Bath
} from "lucide-react";

export default function ApartmentPreview({ data }: any) {
  const s = data.specs || {};

  // --- COMBINACIÓN DE AMENIDADES ---
  // Unimos features (interno) y club_features (externo) en una sola lista visual
  const internalFeatures = Array.isArray(s.features) ? s.features : [];
  const clubFeatures = Array.isArray(s.club_features) ? s.club_features : [];
  const hasAmenities = internalFeatures.length > 0 || clubFeatures.length > 0;

  // Helpers de Diseño
  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2 border-b border-blue-100 pb-1">
         {Icon && <Icon size={14} className="text-blue-600" />}
         <h4 className="text-[10px] font-black uppercase text-blue-600">{title}</h4>
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-blue-50/30 p-4 rounded-xl border border-blue-100/50">
      
      {/* 1. RESUMEN FINANCIERO */}
      <Section title="Resumen Ejecutivo" icon={Building2}>
         <Row 
            label="Precio Venta" 
            val={data.price_cop ? formatCurrency(data.price_cop) : "$0"} 
            icon={DollarSign} 
            valClass="text-green-600 font-black text-sm" 
         />
         {/* Precio USD si existe */}
         {data.price_usd && Number(data.price_usd) > 0 && (
            <Row label="Precio USD" val={`$${data.price_usd}`} icon={DollarSign} valClass="text-green-600 font-bold" />
         )}
         
         <Row label="Estrato" val={data.stratum} icon={Layers} />
         
         {/* CORRECCIÓN: Valor Administración */}
         <Row 
            label="Administración" 
            val={data.admin_fee && Number(data.admin_fee) > 0 ? formatCurrency(data.admin_fee) : "N/A"} 
            icon={Receipt} 
         />
         
         <Row label="Antigüedad" val={s.antiquity} icon={Calendar} />
      </Section>

      {/* 2. UBICACIÓN & ESPACIO */}
      <Section title="Dimensiones" icon={Maximize}>
         <Row label="Área Construida" val={`${s.area_built || 0} m²`} icon={Maximize} />
         <Row label="Piso N°" val={s.floor_level} icon={ArrowUpFromLine} />
         <Row label="Pisos Edificio" val={s.total_floors} icon={Building2} />
         
         {/* CORRECCIÓN: Traducción de Vista */}
         <Row label="Vista" val={translate(s.view_type)} icon={Eye} />
         
         {/* CORRECCIÓN: Traducción de Garaje */}
         <Row label="Garajes" val={`${s.garages || 0} (${translate(s.garage_type) || "-"})`} icon={Car} />
      </Section>

      {/* 3. INTERIORES (Con Traducciones Aplicadas) */}
      <div className="col-span-1 md:col-span-2">
          <Section title="Detalles Interiores" icon={ChefHat}>
             <div className="grid grid-cols-2 gap-x-4">
                 <Row label="Habitaciones" val={s.habs} icon={Bed} />
                 <Row label="Baños" val={s.baths} icon={Bath} />
                 <Row label="Cocina" val={translate(s.kitchen)} icon={ChefHat} />
                 <Row label="Pisos" val={translate(s.floors)} icon={Grid} />
                 <Row label="Zona Ropas" val={translate(s.laundry)} icon={Shirt} />
                 <Row label="Gas" val={translate(s.gas_type)} icon={CheckCircle2} />
             </div>
          </Section>
      </div>

      {/* 4. AMENIDADES & ZONAS COMUNES */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Amenidades y Club House" icon={Trees}>
            {!hasAmenities ? (
                <p className="text-xs text-gray-400 italic">Sin amenidades seleccionadas</p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {/* Internas (Azul) */}
                    {internalFeatures.map((feat: string, i: number) => (
                        <span key={`int-${i}`} className="text-[10px] bg-blue-100 text-blue-800 px-2 py-1 rounded-md font-medium flex items-center gap-1 border border-blue-200">
                           <CheckCircle2 size={10}/> {feat}
                        </span>
                    ))}
                    {/* Externas/Club (Indigo) */}
                    {clubFeatures.map((feat: string, i: number) => (
                        <span key={`club-${i}`} className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md font-medium flex items-center gap-1 border border-indigo-200">
                           <Trees size={10}/> {feat}
                        </span>
                    ))}
                </div>
            )}
         </Section>
      </div>

    </div>
  );
}