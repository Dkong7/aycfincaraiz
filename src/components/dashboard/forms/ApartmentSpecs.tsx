import React from "react";
import { 
  Maximize, Layers, Calendar, Building2, Bed, Bath, Car, Flame, Utensils,
  ShieldCheck, Coffee, Dumbbell, Waves, Trophy, Trees, Zap, Heater, Tv, Dog, Briefcase
} from "lucide-react";

// Listas
const AMENITIES_CLUB = [
   {label: "Vigilancia 24h", icon: ShieldCheck}, {label: "Salón Comunal", icon: Coffee}, {label: "Gimnasio", icon: Dumbbell}, 
   {label: "Piscina", icon: Waves}, {label: "Canchas Squash", icon: Trophy}, {label: "Canchas Tenis", icon: Trophy},
   {label: "Parque Niños", icon: Trees}, {label: "Terraza BBQ", icon: Flame}, {label: "Planta Eléctrica Total", icon: Zap},
   {label: "Caldera", icon: Heater}, {label: "Teatrino", icon: Tv}, {label: "Co-Working", icon: Briefcase},
   {label: "Jaula Golf", icon: Trophy}, {label: "Sendero", icon: Trees}, {label: "Pet Friendly", icon: Dog}
];

// Helpers UI locales (Reutilizados para consistencia)
const InputIcon = ({ icon: Icon, label, register, name, s }: any) => (
  <div className="w-full relative group">
    {label && <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>{label}</label>}
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon size={14}/></div>
    <input {...register(name)} className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all ${s.input}`} />
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
  const labelColor = "text-blue-600"; // Color temático Apto
  
  return (
    <div className="animate-in fade-in space-y-6">
       
       {/* 1. DATOS EDIFICIO */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputIcon register={register} name="specs.area_built" label="Área m²" icon={Maximize} s={s} />
          <InputIcon register={register} name="specs.floor_number" label="Piso Nº" icon={Layers} s={s} />
          <InputIcon register={register} name="specs.building_age" label="Antigüedad" icon={Calendar} s={s} />
          <InputIcon register={register} name="specs.total_floors" label="Pisos Ed." icon={Building2} s={s} />
       </div>

       {/* 2. DISTRIBUCIÓN */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputIcon register={register} name="specs.habs" label="Habs" icon={Bed} s={s} />
          <InputIcon register={register} name="specs.baths" label="Baños" icon={Bath} s={s} />
          <SelectIcon register={register} name="specs.garage_type" label="Garaje" icon={Car} s={s} options={["Cubierto", "Descubierto", "Doble Lineal", "Doble Paralelo", "Sencillo", "Servidumbre"]} />
          <SelectIcon register={register} name="specs.gas_type" label="Gas" icon={Flame} s={s} options={["Natural", "Propano", "Eléctrico", "Ninguno"]} />
       </div>

       {/* 3. VISTA Y BALCÓN */}
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
          <div>
             <label className={`text-[10px] font-bold uppercase mb-1 block ${labelColor}`}>Vista</label>
             <div className="flex gap-4 items-center mb-2">
                <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer"><input type="radio" value="Exterior" {...register("specs.view_type")} /> Exterior</label>
                <label className="flex items-center gap-1 text-xs text-gray-600 cursor-pointer"><input type="radio" value="Interior" {...register("specs.view_type")} /> Interior</label>
             </div>
             <input {...register("specs.view_direction")} placeholder="¿Hacia dónde mira?" className={`w-full p-2 text-xs border rounded ${s.input}`} />
          </div>
          <div>
             <label className={`flex items-center gap-2 text-xs font-bold mb-2 ${labelColor} cursor-pointer`}>
                <input type="checkbox" {...register("specs.has_balcony")} /> ¿Tiene Balcón/Terraza?
             </label>
             {watch("specs.has_balcony") && (
                <InputIcon register={register} name="specs.balcony_area" label="Área Balcón (m²)" icon={Maximize} s={s} />
             )}
          </div>
       </div>

       {/* 4. CLUB HOUSE */}
       <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
          <span className="text-[10px] font-bold uppercase text-blue-800 block mb-3">Club House & Zonas Comunes</span>
          <div className="flex flex-wrap gap-4">
             {AMENITIES_CLUB.map((item) => (
                <label key={item.label} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 cursor-pointer hover:text-blue-700">
                   <input type="checkbox" value={item.label} {...register("specs.building_features")} className="rounded w-3.5 h-3.5 border-blue-200 text-blue-600"/> 
                   <span className="flex items-center gap-1">{<item.icon size={12}/>} {item.label}</span>
                </label>
             ))}
          </div>
       </div>

       {/* 5. CARACTERÍSTICAS ESPECÍFICAS */}
       <div>
          <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${labelColor}`}>Extras Apto</label>
          <div className="flex flex-wrap gap-4">
             {["Ascensor Privado", "Ascensor Servicio", "Remodelado", "Estudio", "CBS (Cuarto Servicio)", "Puerta Seguridad", "Duplex", "Penthouse"].map(opt => (
                <label key={opt} className={`flex items-center gap-1.5 text-[10px] font-bold cursor-pointer hover:opacity-80 ${labelColor}`}>
                   <input type="checkbox" value={opt} {...register("specs.features")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-current"/> {opt}
                </label>
             ))}
          </div>
       </div>

    </div>
  );
}