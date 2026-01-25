import React from "react";
import { 
  Maximize, Ruler, Zap, ArrowUpFromLine, Layers, Warehouse, MapPin, 
  Truck, Briefcase, ShoppingBag, DollarSign, ShieldAlert, Droplets, Flame, 
  Container, Factory, Siren, Calendar, Hammer, Sun, Wind, Plug, Lock, 
  Utensils, Bath, Car, CheckCircle2, Lightbulb, User
} from "lucide-react";

// --- LISTAS DE AMENIDADES ---

// 1. Seguridad Básica (Ya existente)
const SECURITY_FEATURES = [
   {label: "Alarma Incendio", icon: Siren}, 
   {label: "Detectores Humo", icon: Flame}, 
   {label: "Rociadores", icon: Droplets}, 
   {label: "Tanques Agua", icon: Container},
   {label: "Planta Eléctrica", icon: Zap}, 
   {label: "Vigilancia 24h", icon: ShieldAlert}, 
   {label: "CCTV / Cámaras", icon: EyeIcon}, // Agregado
   {label: "Control Acceso", icon: Lock}     // Agregado
];

// 2. Extras Industriales (LOS 10+ ITEMS INÉDITOS)
const INDUSTRIAL_EXTRAS = [
   {label: "Puente Grúa", icon: Hammer},
   {label: "Piso Epóxico", icon: Layers},
   {label: "Techo Termoacústico", icon: Wind},
   {label: "Iluminación Natural", icon: Sun},
   {label: "Iluminación LED", icon: Lightbulb},
   {label: "Subestación Eléctrica", icon: Plug},
   {label: "Gas Industrial", icon: Flame},
   {label: "Red Contra Incendios", icon: Droplets},
   {label: "Batería de Baños", icon: Bath},
   {label: "Vestier / Lockers", icon: User},
   {label: "Casino / Cafetería", icon: Utensils},
   {label: "Muelle con Nivelador", icon: Truck}
];

// --- HELPERS UI ---
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

const CheckGroup = ({ options, register, name, s, colorClass }: any) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
     {options.map((item: any) => (
        <label key={item.label} className={`flex items-center gap-1.5 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity ${colorClass || s.label}`}>
           <input type="checkbox" value={item.label} {...register(name)} className={`rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-amber-500`}/> 
           <span className="flex items-center gap-1">{item.icon && <item.icon size={12}/>} {item.label}</span>
        </label>
     ))}
  </div>
);

// Icono helper para CCTV
function EyeIcon({size}:any){return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>}

export default function BodegaForm({ register, s, watch }: any) { // <-- IMPORTANTE: recibir 'watch'
  const labelColor = "text-amber-700"; 
  
  // Detectar Toggles
  const hasOffices = watch("specs.has_offices");
  const hasMezzanine = watch("specs.has_mezzanine");
  
  return (
    <div className="animate-in fade-in space-y-6">
       
       <div className="flex items-center gap-2 border-b border-amber-200 pb-2 mb-4">
          <Warehouse className="text-amber-600" size={18}/>
          <h3 className="font-black text-amber-800 uppercase text-xs tracking-widest">Ficha Técnica Bodega</h3>
       </div>

       {/* 1. DIMENSIONES, NIVELES Y EDAD */}
       <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <InputIcon register={register} name="specs.area_total" label="Área Lote Total m²" icon={Maximize} s={s} type="number" />
          <InputIcon register={register} name="specs.area_free" label="Área Libre Bodega m²" icon={Maximize} s={s} type="number" />
          <InputIcon register={register} name="specs.levels_qty" label="Niveles / Pisos" icon={Layers} s={s} type="number" />
          <InputIcon register={register} name="specs.front" label="Frente (m)" icon={Ruler} s={s} type="number" />
          <InputIcon register={register} name="specs.depth" label="Fondo (m)" icon={Ruler} s={s} type="number" />
       </div>

       {/* 2. CAPACIDAD Y SERVICIOS BÁSICOS */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputIcon register={register} name="specs.height" label="Altura Libre (m)" icon={ArrowUpFromLine} s={s} type="number"/>
          <InputIcon register={register} name="specs.energy_kva" label="Capacidad KVA" icon={Zap} s={s} type="number" />
          <InputIcon register={register} name="specs.floor_resistance" label="Resistencia Piso (Ton/m²)" icon={Layers} s={s} />
          
          <SelectIcon register={register} name="specs.floor_type" label="Tipo de Piso" icon={Layers} s={s} options={["Concreto Alta Resistencia", "Epóxico", "Baldosa", "Afianzado"]} />
          
          <InputIcon register={register} name="specs.bathrooms" label="# Baños Operativos" icon={Bath} s={s} type="number"/>
          <SelectIcon register={register} name="specs.kitchen_type" label="Cocina / Cafetería" icon={Utensils} s={s} options={["Cocineta", "Casino Empleados", "Cocina Integral", "Sin Cocina"]} />
          <InputIcon register={register} name="specs.parking_qty" label="Parqueaderos Privados" icon={Car} s={s} type="number"/>
          <SelectIcon register={register} name="specs.antiquity" label="Edad Construcción" icon={Calendar} s={s} options={["Estrenar", "1 a 5 años", "5 a 10 años", "10 a 20 años", "+20 años"]} />
       </div>

       {/* 3. LOGÍSTICA */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
          <SelectIcon register={register} name="specs.gate_type" label="Tipo Portón" icon={Warehouse} s={s} options={["Doble Altura", "Corredizo", "Levadizo", "Persiana", "Muelle Nivelador"]} />
          <InputIcon register={register} name="specs.entry_count" label="# Entradas Camión" icon={Truck} s={s} type="number"/>
          <SelectIcon register={register} name="specs.location_type" label="Ubicación" icon={MapPin} s={s} options={["Parque Industrial", "Zona Franca", "Vía Principal", "Interior", "Esquinera", "Medianera"]} />
          
          <div className="col-span-1 md:col-span-3 pt-2">
             <label className={`flex items-center gap-2 text-xs font-bold ${labelColor} cursor-pointer`}>
                <input type="checkbox" {...register("specs.has_truck_access")} className="rounded text-amber-600 focus:ring-0 w-4 h-4"/> 
                <Truck size={14}/> ACCESO PARA TRACTOMULAS Y CONTENEDORES
             </label>
          </div>
       </div>

       {/* 4. MÓDULO OFICINAS (CONDICIONAL) */}
       <div className="border-t border-amber-100 pt-4">
          <label className={`flex items-center gap-2 cursor-pointer font-black text-sm mb-3 ${labelColor}`}>
             <input type="checkbox" {...register("specs.has_offices")} className="toggle toggle-sm toggle-warning" /> ¿TIENE ÁREA DE OFICINAS?
          </label>
          
          {hasOffices && (
             <div className="p-4 bg-white border border-amber-200 rounded-xl shadow-sm animate-in slide-in-from-top-2 grid grid-cols-2 md:grid-cols-4 gap-3">
                <InputIcon register={register} name="specs.office_area" label="Área Oficinas m²" icon={Maximize} s={s} type="number"/>
                <InputIcon register={register} name="specs.office_bathrooms" label="Baños Administrativos" icon={Bath} s={s} type="number"/>
                <SelectIcon register={register} name="specs.office_condition" label="Estado Oficinas" icon={Briefcase} s={s} options={["Obra Gris", "Adecuadas", "Amobladas", "Modernas"]} />
                <div className="flex flex-col justify-center">
                   <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
                      <input type="checkbox" {...register("specs.has_meeting_room")} className="rounded text-amber-500 w-3.5 h-3.5"/> Sala de Juntas
                   </label>
                   <label className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600">
                      <input type="checkbox" {...register("specs.has_structured_cabling")} className="rounded text-amber-500 w-3.5 h-3.5"/> Cableado Estructurado
                   </label>
                </div>
             </div>
          )}
       </div>

       {/* 5. MÓDULO MEZZANINE (CONDICIONAL) */}
       <div className="border-t border-amber-100 pt-4">
          <label className={`flex items-center gap-2 cursor-pointer font-black text-sm mb-3 ${labelColor}`}>
             <input type="checkbox" {...register("specs.has_mezzanine")} className="toggle toggle-sm toggle-warning" /> ¿TIENE MEZZANINE DE CARGA?
          </label>
          
          {hasMezzanine && (
             <div className="p-4 bg-white border border-amber-200 rounded-xl shadow-sm animate-in slide-in-from-top-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                <InputIcon register={register} name="specs.mezzanine_area" label="Área Mezzanine m²" icon={Maximize} s={s} type="number"/>
                <InputIcon register={register} name="specs.mezzanine_load" label="Capacidad Carga (kg/m²)" icon={Layers} s={s} type="number"/>
                <SelectIcon register={register} name="specs.mezzanine_material" label="Material" icon={Factory} s={s} options={["Concreto", "Metálico", "Madera", "Mixto"]} />
             </div>
          )}
       </div>

       {/* 6. RENTABILIDAD */}
       {(watch("specs.location_type") === "Vía Principal" || watch("specs.location_type") === "Esquinera") && (
          <div className="mt-4 border border-green-200 rounded-xl p-4 bg-green-50/30">
             <span className="text-[10px] font-black uppercase text-green-600 mb-2 block tracking-wider">Potencial Comercial</span>
             <div className="grid grid-cols-2 gap-4">
                <InputIcon register={register} name="specs.locales_count" label="# Locales Comerciales" icon={ShoppingBag} s={s} type="number"/>
                <InputIcon register={register} name="specs.locales_rent_value" label="Renta Estimada Locales" icon={DollarSign} s={s} type="number"/>
             </div>
          </div>
       )}

       {/* 7. CHECKLIST INDUSTRIAL AVANZADO */}
       <div className="bg-[#222] p-5 rounded-2xl border border-gray-800 text-gray-300 shadow-xl">
          <div className="flex items-center gap-2 mb-4 text-amber-500">
             <Factory size={18}/>
             <span className="text-xs font-black uppercase tracking-widest">Infraestructura Industrial & Dotación</span>
          </div>
          <CheckGroup options={[...SECURITY_FEATURES, ...INDUSTRIAL_EXTRAS]} register={register} name="specs.features" s={{label: "text-gray-400 hover:text-white"}} colorClass="text-gray-300 hover:text-white"/>
       </div>

    </div>
  );
}