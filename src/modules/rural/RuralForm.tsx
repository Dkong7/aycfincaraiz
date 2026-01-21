import React from "react";
import { 
  TreePine, Map, Route, Droplets, Fence, Home, 
  Maximize, ArrowUpFromLine, Bed, Bath, Flame, Warehouse,
  Waves, Utensils, PawPrint, Flower2, Zap
} from "lucide-react";

// Lista de Amenidades Rurales (Para Checkboxes)
const RURAL_AMENITIES = [
  { label: "Piscina Privada", icon: Waves },
  { label: "Jacuzzi", icon: Waves },
  { label: "Kiosko / BBQ", icon: Utensils },
  { label: "Casa Mayordomo", icon: Home },
  { label: "Caballerizas", icon: PawPrint },
  { label: "Galpones", icon: Warehouse },
  { label: "Árboles Frutales", icon: Flower2 },
  { label: "Invernadero", icon: Flower2 },
  { label: "Corral / Vaquera", icon: Fence },
  { label: "Planta Eléctrica", icon: Zap }
];

// Helpers UI
const InputIcon = ({ icon: Icon, label, register, name, s, type="text", placeholder }: any) => (
  <div className="w-full relative group">
    {label && <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>{label}</label>}
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={14}/></div>
    <input {...register(name)} type={type} placeholder={placeholder} className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all ${s.input}`} />
  </div>
);

const SelectIcon = ({ icon: Icon, label, register, name, options, s }: any) => (
  <div className="w-full relative group">
    {label && <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>{label}</label>}
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={14}/></div>
    <select {...register(name)} className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all appearance-none ${s.input}`}>
       <option value="">Seleccione...</option>
       {options.map((opt: any) => (
         <option key={opt.val || opt} value={opt.val || opt}>{opt.label || opt}</option>
       ))}
    </select>
  </div>
);

export default function RuralForm({ register, s }: any) {
  const labelColor = "text-purple-700"; 

  return (
    <div className="animate-in fade-in space-y-6">
      
      {/* 1. TERRENO Y ENTORNO */}
      <div>
         <div className="flex items-center gap-2 border-b border-purple-200 pb-2 mb-4">
            <TreePine className="text-purple-600" size={18}/>
            <h3 className="font-black text-purple-800 uppercase text-xs tracking-widest">Terreno & Topografía</h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <InputIcon register={register} name="specs.land_area" label="Área Lote (Ha/m²)" icon={Maximize} s={s} placeholder="Ej: 3.5 Hectáreas" />
            <SelectIcon register={register} name="specs.topography" label="Topografía" icon={Map} s={s} options={["Plano", "Ondulado", "Quebrado", "Mixto"]} />
            <SelectIcon register={register} name="specs.access_type" label="Vía de Acceso" icon={Route} s={s} options={["Pavimentado", "Destapado", "Huella", "Solo 4x4"]} />
            <SelectIcon register={register} name="specs.water_source" label="Fuente Agua" icon={Droplets} s={s} options={[
               {val: "Acueducto Veredal", label: "Acueducto Veredal"}, {val: "Pozo", label: "Pozo Profundo"}, 
               {val: "Nacimiento", label: "Nacimiento Propio"}, {val: "Tanque", label: "Reserva/Tanque"}
            ]} />
            <SelectIcon register={register} name="specs.fencing" label="Cerramiento" icon={Fence} s={s} options={["Sin cerramiento", "Alambre de Púas", "Malla Eslabonda", "Cerca Viva", "Muro"]} />
         </div>
      </div>

      {/* 2. VIVIENDA PRINCIPAL */}
      <div className="bg-purple-50/30 p-4 rounded-xl border border-purple-100">
         <div className="flex items-center gap-2 mb-3">
            <Home className="text-purple-500" size={16}/>
            <h3 className={`text-[10px] font-bold uppercase opacity-70 ${labelColor}`}>Vivienda Principal (Casa)</h3>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <InputIcon register={register} name="specs.built_area" label="Área Casa (m²)" icon={Maximize} s={s} type="number" />
            <InputIcon register={register} name="specs.levels" label="Niveles" icon={ArrowUpFromLine} s={s} type="number" />
            <InputIcon register={register} name="specs.bedrooms" label="Habitaciones" icon={Bed} s={s} type="number" />
            <InputIcon register={register} name="specs.bathrooms" label="Baños" icon={Bath} s={s} type="number" />
            <SelectIcon register={register} name="specs.gas_type" label="Gas" icon={Flame} s={s} options={[{val: "Red Natural", label: "Red Natural"}, {val: "Pipeta", label: "Pipeta / Propano"}, {val: "No tiene", label: "No tiene"}]} />
         </div>
      </div>

      {/* 3. AMENIDADES & INFRAESTRUCTURA (CHECKBOXES) */}
      <div className="bg-white p-5 rounded-xl border border-gray-200">
         <span className={`text-[10px] font-bold uppercase opacity-50 block mb-3 ${labelColor}`}>Infraestructura & Recreación</span>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
            {RURAL_AMENITIES.map((item) => (
               <label key={item.label} className={`flex items-center gap-2 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity text-gray-600`}>
                  {/* Usamos 'features' para mantener consistencia con los otros módulos */}
                  <input type="checkbox" value={item.label} {...register("specs.features")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-purple-600"/> 
                  <span className="flex items-center gap-1.5">
                     <item.icon size={12} className="shrink-0 text-purple-400"/> {item.label}
                  </span>
               </label>
            ))}
         </div>
      </div>

    </div>
  );
}