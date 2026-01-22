import React from "react";
import { useFieldArray } from "react-hook-form";
import { 
  Maximize, Grid, Ruler, Bed, Bath, Car, Flame, Utensils, Layers, 
  ChefHat, Store, DollarSign, ShieldCheck, Coffee, Dumbbell, 
  Waves, Trophy, Trees, Zap, Heater, Tv, Dog, Wind, Sun, Flower2, 
  BookOpen, Shirt, Box, Calendar, ArrowUpDown
} from "lucide-react";

// --- SUB-COMPONENTE INTERNO: SECCIÓN DE NIVELES ---
const LevelsSection = ({ control, register, s, labelColor }: any) => {
  const { fields, append, remove } = useFieldArray({ control, name: "specs.levels_list" });
  return (
    <div className={`p-5 rounded-2xl border-2 border-dashed mt-6 ${s.borderDashed} bg-gray-50/50`}>
      <div className="flex justify-between items-end mb-4">
         <div><label className={`text-xs font-black uppercase ${labelColor || s.label}`}>Desglose por Niveles</label></div>
         <button type="button" onClick={() => append({ name: `Nivel ${fields.length + 1}`, desc: "", baths: 0, rooms: 0 })} className={`text-[10px] font-bold px-3 py-1 rounded ${s.btnAdd}`}>+ NIVEL</button>
      </div>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm animate-in fade-in">
             <div className="flex gap-2 mb-2 items-center">
                <input {...register(`specs.levels_list.${index}.name`)} placeholder="Nivel X" className={`w-1/4 p-1.5 text-xs font-bold rounded border ${s.input}`} />
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100"><Bath size={10} className="text-gray-400"/><input {...register(`specs.levels_list.${index}.baths`)} type="number" placeholder="0" className="w-8 bg-transparent text-xs text-center outline-none"/></div>
                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded border border-gray-100"><Bed size={10} className="text-gray-400"/><input {...register(`specs.levels_list.${index}.rooms`)} type="number" placeholder="0" className="w-8 bg-transparent text-xs text-center outline-none"/></div>
                <button type="button" onClick={() => remove(index)} className="ml-auto text-red-400 hover:text-red-600 text-xs font-bold px-2">Eliminar</button>
             </div>
             <textarea {...register(`specs.levels_list.${index}.desc`)} placeholder="Descripción del espacio..." className={`w-full p-2 text-xs rounded border ${s.input} h-14 resize-none`} />
          </div>
        ))}
      </div>
    </div>
  );
};

const AMENITIES_CLUB = [
   {label: "Vigilancia 24h", icon: ShieldCheck}, {label: "Salón Comunal", icon: Coffee}, {label: "Gimnasio", icon: Dumbbell}, 
   {label: "Piscina", icon: Waves}, {label: "Canchas Squash", icon: Trophy}, {label: "Canchas Tenis", icon: Trophy},
   {label: "Parque Niños", icon: Trees}, {label: "Terraza BBQ", icon: Flame}, {label: "Planta Eléctrica", icon: Zap},
   {label: "Caldera", icon: Heater}, {label: "Teatrino", icon: Tv}, {label: "Co-Working", icon: BookOpen},
   {label: "Sendero", icon: Trees}, {label: "Pet Friendly", icon: Dog}
];

const HOUSE_AMENITIES = [
   { label: "Chimenea", icon: Flame }, { label: "Balcón", icon: Wind }, { label: "Terraza", icon: Sun },
   { label: "Jardín", icon: Flower2 }, { label: "Patio", icon: Sun }, { label: "Estudio", icon: BookOpen },
   { label: "CBS (Cuarto Servicio)", icon: Shirt }, { label: "Depósito", icon: Box }
];

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

export default function HouseForm({ register, control, watch, s }: any) {
  const hasRent = watch("specs.has_rent");
  const hasSocial = watch("specs.has_social");
  const labelColor = "text-yellow-600";

  return (
    <div className="animate-in fade-in space-y-6">
       
       {/* 1. DIMENSIONES Y EDAD (BUG #6 CORREGIDO) */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputIcon register={register} name="specs.area_lot" label="Lote m²" icon={Maximize} s={s} />
          <InputIcon register={register} name="specs.area_built" label="Construida m²" icon={Grid} s={s} />
          <InputIcon register={register} name="specs.front" label="Frente (m)" icon={Ruler} s={s} />
          
          {/* CAMPO NUEVO: FONDO */}
          <InputIcon register={register} name="specs.depth" label="Fondo (m)" icon={ArrowUpDown} s={s} />
       </div>
       
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* CAMPO NUEVO: NIVELES */}
          <InputIcon register={register} name="specs.levels_qty" label="Nº Pisos/Niveles" icon={Layers} s={s} type="number" />
          
          <div className="col-span-2">
             <SelectIcon register={register} name="specs.antiquity" label="Edad / Antigüedad" icon={Calendar} s={s} options={["Estrenar", "Menos de 1 año", "1 a 9 años", "10 a 20 años", "Más de 20 años", "Remodelado"]} />
          </div>
       </div>

       {/* 2. DISTRIBUCIÓN */}
       <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <InputIcon register={register} name="specs.habs" label="Habs" icon={Bed} s={s} type="number" />
          <InputIcon register={register} name="specs.baths" label="Baños" icon={Bath} s={s} type="number" />
          <InputIcon register={register} name="specs.garages" label="# Garajes" icon={Car} s={s} type="number" />
          <SelectIcon register={register} name="specs.garage_type" label="Tipo Garaje" icon={Car} s={s} options={["Cubierto", "Descubierto", "Doble Lineal", "Doble Paralelo", "Sencillo", "Servidumbre"]} />
          <SelectIcon register={register} name="specs.gas_type" label="Gas" icon={Flame} s={s} options={["Natural", "Propano", "Pipeta", "Red", "Ninguno"]} />
       </div>

       {/* 3. ACABADOS */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <SelectIcon register={register} name="specs.kitchen" label="Cocina" icon={ChefHat} s={s} options={["Integral", "Americana", "Isla", "Abierta", "Tradicional", "Cerrada", "Para Remodelar"]} />
          <SelectIcon register={register} name="specs.dining" label="Comedor" icon={Utensils} s={s} options={["Independiente", "Un Ambiente", "Barra Americana", "Auxiliar", "Terraza"]} />
          <SelectIcon register={register} name="specs.floors" label="Pisos" icon={Layers} s={s} options={["Madera Maciza", "Madera Laminada", "Madera Granadillo", "Laminado", "Porcelanato", "Mármol", "Cerámica", "Alfombra", "Retal de Mármol"]} />
       </div>

       {/* 4. COMODIDADES */}
       <div className="bg-yellow-50/30 p-4 rounded-xl border border-yellow-200">
          <span className={`text-[10px] font-bold uppercase opacity-50 block mb-3 ${labelColor}`}>Comodidades Casa</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
             {HOUSE_AMENITIES.map((item) => (
                <label key={item.label} className={`flex items-center gap-2 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity text-gray-700`}>
                   <input type="checkbox" value={item.label} {...register("specs.features")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-yellow-600"/> 
                   <span className="flex items-center gap-1.5"><item.icon size={12} className="shrink-0 text-yellow-500"/> {item.label}</span>
                </label>
             ))}
          </div>
       </div>

       <LevelsSection control={control} register={register} s={s} labelColor={labelColor} />

       <div className="pt-4 border-t border-gray-100">
          <label className={`flex items-center gap-2 cursor-pointer font-bold mb-4 ${labelColor}`}>
             <input type="checkbox" {...register("specs.has_social")} className="toggle toggle-sm toggle-success" /> ¿TIENE ZONAS SOCIALES? (Conjunto)
          </label>
          {hasSocial && (
             <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl animate-in slide-in-from-top-2">
                <div className="flex flex-wrap gap-4">
                   {AMENITIES_CLUB.map((item) => (
                      <label key={item.label} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 cursor-pointer">
                         <input type="checkbox" value={item.label} {...register("specs.social_features")} className="rounded w-3.5 h-3.5 border-gray-300 text-yellow-600"/> 
                         <span className="flex items-center gap-1"><item.icon size={12}/> {item.label}</span>
                      </label>
                   ))}
                </div>
             </div>
          )}
       </div>

       <div className="border-t border-gray-200 pt-4">
          <label className={`flex items-center gap-2 cursor-pointer font-bold ${labelColor}`}>
             <input type="checkbox" {...register("specs.has_rent")} className="toggle toggle-sm toggle-success" /> ¿TIENE RENTA? (Apto/Local)
          </label>
          {hasRent && (
             <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl animate-in slide-in-from-top-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                   <SelectIcon register={register} name="specs.rent_type" label="Tipo de Renta" icon={Store} s={s} options={["Apartamento Independiente", "Local Comercial", "Oficina", "Paisa"]} />
                   <InputIcon register={register} name="specs.rent_value" label="Canon Estimado Mensual ($)" icon={DollarSign} s={s} type="number" />
                </div>
                <div className="mb-4">
                   <span className="text-[9px] font-bold uppercase text-blue-400 block mb-2">Comodidades Renta</span>
                   <div className="flex flex-wrap gap-4">
                      {["Entrada Independiente", "Baño Privado", "Cocineta", "Servicios Incluidos", "Medidor Luz Independiente"].map(opt => (
                         <label key={opt} className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 cursor-pointer">
                            <input type="checkbox" value={opt} {...register("specs.rent_features")} className="rounded w-3.5 h-3.5 border-blue-300 text-blue-600"/> {opt}
                         </label>
                      ))}
                   </div>
                </div>
                <textarea {...register("specs.rent_desc")} placeholder="Descripción adicional de la renta..." className="w-full p-2 text-xs rounded border border-blue-200 bg-white h-16 resize-none outline-none text-blue-900 placeholder-blue-300"/>
             </div>
          )}
       </div>
    </div>
  );
}