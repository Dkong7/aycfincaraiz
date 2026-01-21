import React from "react";
import { Building2, Network, Briefcase, Maximize, ArrowUpFromLine, Car, Bath } from 'lucide-react';

const TECH_FEATURES = [
  { id: "structured_cabling", label: "Cableado Estructurado" },
  { id: "ac_central", label: "Aire Acondicionado Central" },
  { id: "power_plant", label: "Planta Suplencia Total" },
  { id: "led_lighting", label: "Iluminación LED" },
  { id: "smart_elevators", label: "Ascensores Inteligentes" },
  { id: "cctv", label: "CCTV / Seguridad" },
  { id: "fire_system", label: "Red Contra Incendios" },
  { id: "biometric", label: "Acceso Biométrico" }
];

const CORPORATE_AMENITIES = [
  { id: "meeting_room", label: "Sala de Juntas" },
  { id: "auditorium", label: "Auditorio" },
  { id: "cafeteria", label: "Cocineta / Cafetería" },
  { id: "reception", label: "Recepción / Lobby" },
  { id: "visitor_parking", label: "Parqueo Visitantes" },
  { id: "terrace_lounge", label: "Terraza / Lounge" }
];

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

export default function OficinaForm({ register, s }: any) {
  const labelColor = "text-emerald-700"; 

  return (
    <div className="animate-in fade-in space-y-6">

      {/* SECCIÓN 1: ESPACIO Y DOTACIÓN */}
      <div>
        <div className="flex items-center gap-2 border-b border-emerald-200 pb-2 mb-4">
           <Building2 className="text-emerald-600" size={18}/>
           <h3 className="font-black text-emerald-800 uppercase text-xs tracking-widest">Espacio & Dotación</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <InputIcon register={register} name="specs.area" label="Área Privada (m²)" icon={Maximize} s={s} type="number"/>
           <InputIcon register={register} name="specs.floor_level" label="Piso / Nivel" icon={ArrowUpFromLine} s={s} type="number"/>
           <InputIcon register={register} name="specs.garages" label="Garajes Privados" icon={Car} s={s} type="number"/>
           <SelectIcon register={register} name="specs.bathrooms_type" label="Tipo de Baños" icon={Bath} s={s} options={[
              "Privados", "Batería Comunal", "Mixto"
           ]} />
        </div>
      </div>

      {/* SECCIÓN 2: INFRAESTRUCTURA TÉCNICA */}
      <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100">
        <div className="flex items-center gap-2 mb-3">
           <Network className="text-emerald-500" size={16}/>
           <h3 className={`text-[10px] font-bold uppercase opacity-70 ${labelColor}`}>Infraestructura Técnica</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-2">
           {TECH_FEATURES.map((item) => (
              <label key={item.id} className={`flex items-center gap-2 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity text-gray-600`}>
                 <input type="checkbox" value={item.label} {...register("specs.features")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-emerald-600"/> 
                 <span>{item.label}</span>
              </label>
           ))}
        </div>
      </div>

      {/* SECCIÓN 3: AMENIDADES CORPORATIVAS */}
      <div className="bg-white p-5 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
           <Briefcase className="text-emerald-500" size={16}/>
           <h3 className={`text-[10px] font-bold uppercase opacity-70 ${labelColor}`}>Amenidades Edificio</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-2">
           {CORPORATE_AMENITIES.map((item) => (
              <label key={item.id} className={`flex items-center gap-2 text-[10px] font-bold cursor-pointer hover:opacity-80 transition-opacity text-gray-600`}>
                 {/* Guardamos en 'amenities' para diferenciar de las specs técnicas */}
                 <input type="checkbox" value={item.label} {...register("specs.amenities")} className="rounded focus:ring-0 w-3.5 h-3.5 border-gray-300 text-emerald-600"/> 
                 <span>{item.label}</span>
              </label>
           ))}
        </div>
      </div>

    </div>
  );
}