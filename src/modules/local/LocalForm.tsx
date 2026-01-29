import React from "react";
import { 
  Maximize, Ruler, Store, MapPin, 
  Utensils, Zap, Truck, Car, Wind, Layers, Flame, 
  Calendar, ArrowUpFromLine
} from "lucide-react";

const LOCAL_FEATURES = [
   {label: "Mezzanine", icon: Layers}, 
   {label: "Terraza Privada", icon: Store}, 
   {label: "Gas Industrial", icon: Flame}, 
   {label: "Ducto Extracción", icon: Wind},
   {label: "Energía Trifásica", icon: Zap}, 
   {label: "Trampa de Grasas", icon: Utensils}, 
   {label: "Bahía de Parqueo", icon: Car}, 
   {label: "Zona de Carga", icon: Truck},
   {label: "Esquinero", icon: MapPin}
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

export default function LocalForm({ register, s }: any) {
  return (
    <div className="animate-in fade-in space-y-6">
       
       <div className="flex items-center gap-2 border-b border-pink-200 pb-2 mb-4">
          <Store className="text-pink-600" size={18}/>
          <h3 className="font-black text-pink-800 uppercase text-xs tracking-widest">Ficha Técnica Local</h3>
       </div>

       {/* 1. DIMENSIONES Y EDAD */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <InputIcon register={register} name="specs.area_total" label="Área Total m²" icon={Maximize} s={s} type="number" />
          <InputIcon register={register} name="specs.front" label="Frente (m)" icon={Ruler} s={s} type="number" />
          <InputIcon register={register} name="specs.height" label="Altura (m)" icon={ArrowUpFromLine} s={s} type="number" />
          
          {/* NUEVO CAMPO: ANTIGÜEDAD */}
          <SelectIcon 
            register={register} 
            name="specs.antiquity" 
            label="Edad / Antigüedad" 
            icon={Calendar} 
            s={s} 
            options={["Estrenar", "1 a 5 años", "5 a 10 años", "10 a 20 años", "+20 años", "Remodelado"]} 
          />
       </div>

       {/* 2. CARACTERÍSTICAS */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <SelectIcon register={register} name="specs.location_type" label="Ubicación" icon={MapPin} s={s} options={["Calle Principal", "Calle Secundaria", "Centro Comercial", "Plazoleta", "Pasaje Comercial"]} />
          <SelectIcon register={register} name="specs.bathrooms" label="Baños" icon={Utensils} s={s} options={["No tiene", "1 (Privado)", "2 (H/M)", "Batería Baños", "De uso común (CC)"]} />
          <SelectIcon register={register} name="specs.floors" label="Tipo Piso" icon={Layers} s={s} options={["Cerámica", "Porcelanato", "Cemento Afinado", "Madera Laminada", "Vinilo", "Alfombra"]} />
          <SelectIcon register={register} name="specs.gas_type" label="Gas" icon={Flame} s={s} options={["No tiene", "Red Natural", "Pipeta", "Industrial"]} />
       </div>

       {/* 3. CHECKLIST */}
       <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <span className={`text-[10px] font-bold uppercase opacity-50 block mb-3 text-pink-700`}>Equipamiento & Adecuaciones</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
             {LOCAL_FEATURES.map((item) => (
                <label key={item.label} className="flex items-center gap-1.5 text-[10px] font-bold text-gray-600 cursor-pointer hover:opacity-80 transition-opacity">
                   <input type="checkbox" value={item.label} {...register("specs.features")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-pink-600"/> 
                   <span className="flex items-center gap-1">{item.icon && <item.icon size={12}/>} {item.label}</span>
                </label>
             ))}
          </div>
       </div>
    </div>
  );
}