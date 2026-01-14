import React from "react";
import { 
  Maximize, Grid, ArrowUpFromLine, Building, DollarSign, Bed, Bath, 
  Car, Flame, Calendar, Eye, ShieldCheck, Coffee, Dumbbell, Waves, 
  Trophy, Trees, Zap, Heater, Tv, Dog, LandPlot, MonitorPlay, Mountain, 
  User, ChefHat, Layers, Utensils, Shirt
} from "lucide-react";

// --- LISTAS EXACTAS SOLICITADAS ---

const EXTRAS_APTO = [
   { label: "Ascensor Privado", icon: ArrowUpFromLine },
   { label: "Ascensor Servicio", icon: ArrowUpFromLine },
   { label: "Remodelado", icon: Calendar },
   { label: "Estudio", icon: MonitorPlay }, 
   { label: "CBS (Cuarto Servicio)", icon: User },
   { label: "Puerta Seguridad", icon: ShieldCheck },
   { label: "Duplex", icon: LayersIcon }, 
   { label: "Penthouse", icon: Mountain }
];

const CLUB_HOUSE = [
   { label: "Vigilancia 24h", icon: ShieldCheck },
   { label: "Salón Comunal", icon: Coffee },
   { label: "Gimnasio", icon: Dumbbell },
   { label: "Piscina", icon: Waves },
   { label: "Canchas Squash", icon: Trophy },
   { label: "Canchas Tenis", icon: Trophy },
   { label: "Parque Niños", icon: Trees },
   { label: "Terraza BBQ", icon: Flame },
   { label: "Planta Eléctrica Total", icon: Zap },
   { label: "Caldera", icon: Heater },
   { label: "Teatrino", icon: Tv },
   { label: "Co-Working", icon: Building },
   { label: "Jaula Golf", icon: LandPlot },
   { label: "Sendero", icon: Trees },
   { label: "Pet Friendly", icon: Dog }
];

// Icono local para Duplex
function LayersIcon({size}:any) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>}

// Helpers UI
const InputIcon = ({ icon: Icon, label, register, name, s, type="text" }: any) => (
  <div className="w-full relative group">
    {label && <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>{label}</label>}
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={14}/></div>
    <input {...register(name)} type={type} className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all ${s.input}`} />
  </div>
);

const SelectIcon = ({ icon: Icon, label, register, name, options, s }: any) => (
  <div className="w-full relative group">
    {label && <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>{label}</label>}
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={14}/></div>
    <select {...register(name)} className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all appearance-none ${s.input}`}>
       <option value="">Seleccione...</option>
       {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default function ApartmentSpecs({ register, watch, s }: any) {
  const labelColor = "text-blue-600"; // Color temático

  return (
    <div className="animate-in fade-in space-y-6">
       
       {/* 1. DIMENSIONES Y EDIFICIO */}
       <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <InputIcon register={register} name="specs.area_built" label="Área m²" icon={Maximize} s={s} type="number" />
          <InputIcon register={register} name="specs.floor_num" label="Piso N°" icon={ArrowUpFromLine} s={s} type="number" />
          <InputIcon register={register} name="specs.total_floors" label="Pisos Ed." icon={Building} s={s} type="number" />
          <SelectIcon register={register} name="specs.antiquity" label="Antigüedad" icon={Calendar} s={s} options={["Estrenar", "Menos de 1 año", "1 a 9 años", "10 a 20 años", "Más de 20 años"]} />
          <InputIcon register={register} name="admin_fee" label="Administración ($)" icon={DollarSign} s={s} type="number" />
       </div>

       {/* 2. DETALLES BÁSICOS */}
       <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <InputIcon register={register} name="specs.habs" label="Habs" icon={Bed} s={s} type="number" />
          <InputIcon register={register} name="specs.baths" label="Baños" icon={Bath} s={s} type="number" />
          <InputIcon register={register} name="specs.garages" label="# Garajes" icon={Car} s={s} type="number" />
          <SelectIcon register={register} name="specs.garage_type" label="Tipo Garaje" icon={Car} s={s} options={["Cubierto", "Descubierto", "Doble Lineal", "Doble Paralelo", "Sencillo", "Servidumbre"]} />
          <SelectIcon register={register} name="specs.gas_type" label="Gas" icon={Flame} s={s} options={["Natural", "Propano", "Eléctrico", "Ninguno"]} />
       </div>

       {/* 3. ACABADOS Y DISTRIBUCIÓN (NUEVA SECCIÓN) */}
       <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
          <SelectIcon register={register} name="specs.kitchen" label="Cocina" icon={ChefHat} s={s} options={["Integral", "Americana (Abierta)", "Tipo Isla", "Cerrada (Indep.)", "Para Remodelar"]} />
          <SelectIcon register={register} name="specs.floors" label="Pisos" icon={Layers} s={s} options={["Madera Maciza", "Madera Laminada", "Madera Granadillo", "Laminado", "Porcelanato", "Mármol", "Cerámica", "Alfombra", "PVC / Vinilo"]} />
          <SelectIcon register={register} name="specs.dining" label="Sala - Comedor" icon={Utensils} s={s} options={["Un solo ambiente", "Independiente", "Con Chimenea", "Con Balcón"]} />
          <SelectIcon register={register} name="specs.laundry" label="Zona de Ropas" icon={Shirt} s={s} options={["Independiente", "En Cocina", "Cuarto de Ropas", "No tiene"]} />
       </div>

       {/* 4. VISTA Y BALCÓN */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
           <SelectIcon register={register} name="specs.view_type" label="Vista" icon={Eye} s={s} options={["Exterior", "Interior", "Panorámica"]} />
           
           <div className="flex items-center h-full pt-4 col-span-2">
             <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-gray-700 hover:text-blue-600 transition-colors bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                <input type="checkbox" {...register("specs.has_balcony")} className="toggle toggle-sm toggle-info" /> ¿Tiene Balcón o Terraza?
             </label>
           </div>
       </div>

       {/* 5. EXTRAS APTO (CHECKBOXES) */}
       <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100">
          <span className={`text-[10px] font-bold uppercase opacity-50 block mb-3 ${labelColor}`}>Extras Apto</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
             {EXTRAS_APTO.map((item) => (
                <label key={item.label} className={`flex items-center gap-2 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity text-gray-600`}>
                   <input type="checkbox" value={item.label} {...register("specs.features")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-blue-600"/> 
                   <span className="flex items-center gap-1.5">
                      <item.icon size={12} className="shrink-0 text-blue-400"/> {item.label}
                   </span>
                </label>
             ))}
          </div>
       </div>

       {/* 6. CLUB HOUSE & ZONAS COMUNES (LISTA EXACTA) */}
       <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
          <span className={`text-[10px] font-bold uppercase opacity-50 block mb-3 ${labelColor}`}>Club House & Zonas Comunes</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-3 gap-x-2">
             {CLUB_HOUSE.map((item) => (
                <label key={item.label} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 cursor-pointer select-none hover:text-blue-600">
                   <input type="checkbox" value={item.label} {...register("specs.club_features")} className="rounded w-3.5 h-3.5 border-gray-300 text-blue-600"/> 
                   <div className="flex items-center gap-1.5">
                      <item.icon size={12} className="text-gray-400"/> {item.label}
                   </div>
                </label>
             ))}
          </div>
       </div>

    </div>
  );
}