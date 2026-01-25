import React from "react";
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./bodega.config";
import { 
  Factory, Maximize, DollarSign, Zap, 
  Truck, ArrowUpFromLine, Layers, Container,
  Briefcase, Store, CheckCircle2, Hash, Ruler,
  Calendar, Building, Utensils, Bath, Car
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
            <Row label="Precio USD" val={`$${data.price_usd}`} icon={DollarSign} valClass="text-green-600 font-bold" />
         )}
         
         {/* --- ESTRATO CORREGIDO --- */}
         <Row label="Estrato" val={data.stratum} icon={Hash} />
         
         <Row label="Administración" val={data.admin_fee ? formatCurrency(data.admin_fee) : "N/A"} icon={Building} />
         <Row label="Antigüedad" val={s.antiquity} icon={Calendar} />
         <Row label="Ubicación" val={translate(s.location_type)} icon={Store} />
      </Section>

      {/* 2. DIMENSIONES & ESTRUCTURA */}
      <Section title="Dimensiones & Estructura" icon={Maximize}>
         <Row label="Área Lote Total" val={`${s.area_total || 0} m²`} icon={Maximize} valClass="text-amber-700 font-bold" />
         <Row label="Área Libre" val={`${s.area_free || 0} m²`} icon={Maximize} />
         <Row label="Frente x Fondo" val={`${s.front || 0} x ${s.depth || 0} m`} icon={Ruler} />
         <Row label="Altura Libre" val={`${s.height || 0} m`} icon={ArrowUpFromLine} />
         <Row label="Niveles" val={s.levels_qty} icon={Layers} />
      </Section>

      {/* 3. CAPACIDAD TÉCNICA */}
      <Section title="Capacidad Técnica" icon={Zap}>
         <Row label="Energía" val={`${s.energy_kva || 0} KVA`} icon={Zap} />
         <Row label="Resistencia Piso" val={s.floor_resistance} icon={Layers} />
         <Row label="Tipo de Piso" val={s.floor_type} icon={Layers} />
         <Row label="Tipo Portón" val={translate(s.gate_type)} icon={Container} />
         <Row label="Entradas Camión" val={s.entry_count} icon={Truck} />
      </Section>

      {/* 4. FACILIDADES & SERVICIOS */}
      <Section title="Facilidades Operativas" icon={Briefcase}>
         <Row label="Baños Operativos" val={s.bathrooms} icon={Bath} />
         <Row label="Cocina / Casino" val={s.kitchen_type} icon={Utensils} />
         <Row label="Parqueaderos" val={s.parking_qty} icon={Car} />
         <Row label="Tractomulas" val={s.has_truck_access ? "Sí, Acceso" : "No"} icon={Truck} />
      </Section>

      {/* 5. MÓDULOS OPCIONALES (Solo si existen) */}
      
      {/* OFICINAS */}
      {s.has_offices && (
         <div className="col-span-1 md:col-span-2">
            <Section title="Área Administrativa (Oficinas)" icon={Briefcase}>
               <div className="grid grid-cols-2 gap-4">
                  <Row label="Área Oficinas" val={`${s.office_area || 0} m²`} icon={Maximize} />
                  <Row label="Baños Admin." val={s.office_bathrooms} icon={Bath} />
                  <Row label="Estado" val={s.office_condition} icon={CheckCircle2} />
                  <div className="text-xs text-gray-500 flex gap-2 mt-1">
                     {s.has_meeting_room && <span className="bg-amber-100 px-2 py-0.5 rounded text-amber-800">Sala Juntas</span>}
                     {s.has_structured_cabling && <span className="bg-amber-100 px-2 py-0.5 rounded text-amber-800">Cableado</span>}
                  </div>
               </div>
            </Section>
         </div>
      )}

      {/* MEZZANINE */}
      {s.has_mezzanine && (
         <div className="col-span-1 md:col-span-2">
            <Section title="Mezzanine de Carga" icon={Layers}>
               <div className="grid grid-cols-3 gap-2">
                  <Row label="Área Mez." val={`${s.mezzanine_area || 0} m²`} icon={Maximize} />
                  <Row label="Carga" val={s.mezzanine_load} icon={Zap} />
                  <Row label="Material" val={s.mezzanine_material} icon={Factory} />
               </div>
            </Section>
         </div>
      )}

      {/* LOCALES */}
      {(Number(s.locales_count) > 0) && (
         <div className="col-span-1 md:col-span-2 bg-green-50 p-2 rounded-lg border border-green-100">
            <div className="flex justify-between items-center px-2">
               <span className="text-[10px] font-bold text-green-700 uppercase flex gap-2 items-center">
                  <Store size={14}/> Locales Comerciales
               </span>
               <span className="text-xs font-bold text-green-800">{s.locales_count} Unidades</span>
            </div>
         </div>
      )}

      {/* 6. DOTACIÓN INDUSTRIAL */}
      <div className="col-span-1 md:col-span-2">
         <Section title="Infraestructura & Seguridad" icon={CheckCircle2}>
            <p className="text-xs text-gray-600 leading-relaxed italic">
               {[...(s.features || [])].join(", ") || "Sin equipamiento especial registrado"}
            </p>
         </Section>
      </div>

    </div>
  );
}