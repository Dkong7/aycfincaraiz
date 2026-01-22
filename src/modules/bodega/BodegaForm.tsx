import React from "react";
import { 
  Maximize, Ruler, Zap, ArrowUpFromLine, Layers, Warehouse, MapPin, 
  Truck, Briefcase, ShoppingBag, DollarSign, ShieldAlert, Droplets, Flame, 
  Container, Factory, Siren, Calendar
} from "lucide-react";

// Lista de Amenidades de Seguridad
const SECURITY_FEATURES = [
   {label: "Alarma Incendio", icon: Siren}, 
   {label: "Detectores Humo", icon: Flame}, 
   {label: "Rociadores", icon: Droplets}, 
   {label: "Tanques Agua", icon: Container},
   {label: "Planta Eléctrica", icon: Zap}, 
   {label: "Muelle Carga", icon: Truck}, 
   {label: "Vigilancia 24h", icon: ShieldAlert}, 
   {label: "Zona Franca", icon: Factory}
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

export default function BodegaForm({ register, s }: any) {
  const labelColor = "text-amber-700"; 
  
  return (
    <div className="animate-in fade-in space-y-6">
       
       <div className="flex items-center gap-2 border-b border-amber-200 pb-2 mb-4">
          <Warehouse className="text-amber-600" size={18}/>
          <h3 className="font-black text-amber-800 uppercase text-xs tracking-widest">Especificaciones Industriales</h3>
       </div>

       {/* 1. DIMENSIONES & ÁREAS */}
       <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <InputIcon register={register} name="specs.area_total" label="Área Total m²" icon={Maximize} s={s} type="number" />
          <InputIcon register={register} name="specs.area_free" label="Área Libre m²" icon={Maximize} s={s} type="number" />
          <InputIcon register={register} name="specs.front" label="Frente (m)" icon={Ruler} s={s} type="number" />
          <InputIcon register={register} name="specs.depth" label="Fondo (m)" icon={Ruler} s={s} type="number" />
          <SelectIcon register={register} name="specs.antiquity" label="Edad Construcción" icon={Calendar} s={s} options={["Estrenar", "Menos de 1 año", "1 a 9 años", "10 a 20 años", "Más de 20 años", "Remodelado"]} />
       </div>

       {/* 2. CAPACIDAD INDUSTRIAL */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputIcon register={register} name="specs.height" label="Altura (m)" icon={ArrowUpFromLine} s={s} type="number"/>
          <InputIcon register={register} name="specs.energy_kva" label="Energía (KVA)" icon={Zap} s={s} />
          <InputIcon register={register} name="specs.floor_resistance" label="Resistencia Piso (Ton/m²)" icon={Layers} s={s} />
          <InputIcon register={register} name="specs.entry_count" label="# Entradas" icon={Warehouse} s={s} type="number"/>
       </div>

       {/* 3. LOGÍSTICA */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
          <SelectIcon register={register} name="specs.gate_type" label="Tipo Portón" icon={Warehouse} s={s} options={["Doble Altura", "Corredizo", "Levadizo", "Persiana", "Muelle"]} />
          <SelectIcon register={register} name="specs.location_type" label="Ubicación" icon={MapPin} s={s} options={["Parque Industrial", "Zona Franca", "Vía Principal", "Interior", "Esquinera"]} />
          
          <div className="flex flex-col justify-center gap-2 pl-4 border-l border-amber-200">
             <label className={`flex items-center gap-2 text-xs font-bold ${labelColor} cursor-pointer`}>
                <input type="checkbox" {...register("specs.has_offices")} className="rounded text-amber-600 focus:ring-0 w-4 h-4"/> 
                <Briefcase size={14}/> TIENE OFICINAS
             </label>
             <label className={`flex items-center gap-2 text-xs font-bold ${labelColor} cursor-pointer`}>
                <input type="checkbox" {...register("specs.has_truck_access")} className="rounded text-amber-600 focus:ring-0 w-4 h-4"/> 
                <Truck size={14}/> TRACTOMULAS
             </label>
          </div>
       </div>

       {/* 4. RENTABILIDAD / LOCALES */}
       <div className="border border-amber-200 rounded-xl p-4 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
          <span className="text-[10px] font-black uppercase text-amber-500 mb-3 block tracking-wider">Rentabilidad / Locales</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* CAMBIO: ShoppingBag en lugar de Store */}
             <InputIcon register={register} name="specs.locales_count" label="# Locales Comerciales" icon={ShoppingBag} s={s} type="number"/>
             <InputIcon register={register} name="specs.locales_rent_value" label="Valor Arriendo Locales" icon={DollarSign} s={s} type="number"/>
          </div>
       </div>

       {/* 5. SEGURIDAD INDUSTRIAL */}
       <div className="bg-[#1a1a1a] p-5 rounded-xl border border-gray-800 text-gray-300">
          <div className="flex items-center gap-2 mb-4 text-amber-500">
             <ShieldAlert size={16}/>
             <span className="text-xs font-black uppercase tracking-widest">Seguridad Industrial & Dotación</span>
          </div>
          <CheckGroup options={SECURITY_FEATURES} register={register} name="specs.industrial_features" s={{label: "text-gray-400 hover:text-white"}} colorClass="text-gray-300 hover:text-white"/>
       </div>

    </div>
  );
}