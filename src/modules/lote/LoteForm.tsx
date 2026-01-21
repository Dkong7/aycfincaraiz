import React from "react";
import { Map, ScrollText, Zap, Maximize, Ruler, Briefcase, MapPin, Layers } from 'lucide-react';

// Lista de Servicios (Checkboxes para specs.features)
const LOTE_SERVICES = [
   { label: "Acometida Agua" },
   { label: "Energía / Luz" },
   { label: "Alcantarillado" },
   { label: "Gas Natural" },
   { label: "Vías Pavimentadas" },
   { label: "Alumbrado Público" },
   { label: "Andenes" },
   { label: "Red Internet" },
   { label: "Licencia Vigente" },
   { label: "Predio Desenglobado" }
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
       {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default function LoteForm({ register, s }: any) {
  const labelColor = "text-gray-600"; // Color neutro para Lotes (Gris/Plata)

  return (
    <div className="animate-in fade-in space-y-6">

      {/* SECCIÓN 1: DIMENSIONES Y USO */}
      <div>
        <div className="flex items-center gap-2 border-b border-gray-300 pb-2 mb-4">
           <Map className="text-gray-600" size={18}/>
           <h3 className="font-black text-gray-700 uppercase text-xs tracking-widest">Dimensiones & Uso</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <InputIcon register={register} name="specs.area" label="Área Total (m²)" icon={Maximize} s={s} type="number" placeholder="Ej: 500"/>
           <InputIcon register={register} name="specs.front" label="Frente (m)" icon={Ruler} s={s} type="number"/>
           <InputIcon register={register} name="specs.depth" label="Fondo (m)" icon={Ruler} s={s} type="number"/>
           
           <SelectIcon register={register} name="specs.soil_use" label="Uso de Suelo" icon={Briefcase} s={s} options={[
              "Residencial", "Comercial", "Industrial", "Agrícola", "Institucional", "Mixto"
           ]} />
        </div>
      </div>

      {/* SECCIÓN 2: UBICACIÓN Y TOPOGRAFÍA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SelectIcon register={register} name="specs.topography" label="Topografía" icon={Layers} s={s} options={["Plano", "Inclinado", "Mixto"]} />
          <SelectIcon register={register} name="specs.location_type" label="Ubicación Lote" icon={MapPin} s={s} options={["Esquinero", "Medianero", "Sobre Vía Principal", "Interior"]} />
          <SelectIcon register={register} name="specs.classification" label="Clasificación" icon={Map} s={s} options={["Urbano", "Suburbano", "Rural", "Expansión Urbana"]} />
          <InputIcon register={register} name="specs.norm_code" label="Código Normativa" icon={ScrollText} s={s} placeholder="Ej: UPZ-123"/>
      </div>

      {/* SECCIÓN 3: NORMATIVA */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
           <ScrollText className="text-gray-500" size={16}/>
           <h3 className={`text-[10px] font-bold uppercase opacity-70 ${labelColor}`}>Indices de Construcción</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
           <InputIcon register={register} name="specs.occupation_index" label="Índice Ocupación (%)" icon={Layers} s={s} placeholder="Ej: 40%"/>
           <InputIcon register={register} name="specs.construction_index" label="Índice Construcción" icon={Layers} s={s} placeholder="Ej: 2.5"/>
           <InputIcon register={register} name="specs.max_height" label="Altura Máxima (Pisos)" icon={Ruler} s={s} type="number"/>
        </div>
      </div>

      {/* SECCIÓN 4: SERVICIOS E INFRAESTRUCTURA (Checkboxes) */}
      <div className="bg-white p-5 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
           <Zap className="text-yellow-500" size={16}/>
           <h3 className={`text-[10px] font-bold uppercase opacity-70 ${labelColor}`}>Servicios & Estado Legal</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
           {LOTE_SERVICES.map((item) => (
              <label key={item.label} className={`flex items-center gap-2 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity text-gray-600`}>
                 <input type="checkbox" value={item.label} {...register("specs.features")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-gray-800"/> 
                 <span>{item.label}</span>
              </label>
           ))}
        </div>
      </div>

    </div>
  );
}