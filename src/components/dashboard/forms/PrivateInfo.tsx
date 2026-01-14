import React from "react";
// Importamos iconos específicos para cada campo (Estilo FontAwesome pero usando tu librería Lucide)
import { Lock, User, Phone, Mail, MapPin, Building2, PhoneCall, Scale, FileText } from "lucide-react";

// Helper UI local
const InputIcon = ({ icon: Icon, label, register, name, placeholder, s }: any) => (
  <div className="w-full">
    {label && <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-red-800">{label}</label>}
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-red-300 group-focus-within:text-red-500 transition-colors">
        <Icon size={14} />
      </div>
      <input 
        {...register(name)} 
        placeholder={placeholder} 
        className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border border-red-100 bg-white text-red-900 focus:border-red-300 transition-all placeholder-red-200" 
      />
    </div>
  </div>
);

export default function PrivateInfo({ register, activeType, initialData }: any) {
  return (
    <div className="animate-in fade-in space-y-4">
       
       {/* HEADER PRIVADO */}
       <div className="flex justify-between items-center border-b border-red-100 pb-2 mb-4">
          <h3 className="text-red-500 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
             <Lock size={14}/> Datos Privados (Interno)
          </h3>
          <span className="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded font-mono font-bold">
             {initialData?.ayc_id || "AYC-Generando..."}
          </span>
       </div>

       {/* DATOS PROPIETARIO */}
       <div className="space-y-3">
          {/* Iconos corregidos para representar mejor la data */}
          <InputIcon register={register} name="owner_name" placeholder="Nombre Propietario" icon={User} />
          <InputIcon register={register} name="owner_phone" placeholder="Teléfono Contacto" icon={Phone} />
          <InputIcon register={register} name="owner_email" placeholder="Correo Electrónico" icon={Mail} />
          <InputIcon register={register} name="address_private" placeholder="Dirección Exacta (Placa)" icon={MapPin} />
          
          {/* CAMPOS EXTRA SOLO PARA APARTAMENTO */}
          {activeType === 'Apartamento' && (
             <div className="grid grid-cols-2 gap-2 pt-2 border-t border-red-100 mt-2">
                <div className="col-span-2 relative">
                    <Building2 className="absolute left-3 top-2.5 text-red-300" size={14}/>
                    <input {...register("specs.building_name")} placeholder="Nombre Edificio/Conjunto" className="w-full pl-9 p-2 text-xs bg-white border border-red-100 rounded text-red-900 placeholder-red-300 outline-none focus:border-red-300" />
                </div>
                <input {...register("specs.unit_detail")} placeholder="Apto / Int / Bloque" className="w-full p-2 text-xs bg-white border border-red-100 rounded text-red-900 placeholder-red-300 outline-none focus:border-red-300" />
                <div className="relative">
                    <PhoneCall className="absolute left-2 top-2 text-red-300" size={12}/>
                    <input {...register("specs.admin_contact")} placeholder="Tel Administración" className="w-full pl-7 p-2 text-xs bg-white border border-red-100 rounded text-red-900 placeholder-red-300 outline-none focus:border-red-300" />
                </div>
             </div>
          )}
       </div>

       {/* LEGAL (Sin Afectación Familiar) */}
       <div className="pt-3 border-t border-red-100">
          <span className="text-[9px] font-bold text-red-400 uppercase mb-2 flex items-center gap-1"><Scale size={10}/> Estado Legal</span>
          <div className="grid grid-cols-2 gap-2">
             {["Hipoteca", "Patrimonio Familia", "Sucesión"].map(l => (
                <label key={l} className="flex items-center gap-1.5 text-[10px] text-red-800 cursor-pointer font-bold hover:opacity-70">
                   <input type="checkbox" value={l} {...register("specs.legal_status")} className="rounded text-red-500 focus:ring-0 w-3 h-3 border-red-200"/> {l}
                </label>
             ))}
          </div>
       </div>

       {/* COMENTARIOS EXTRAS */}
       <div className="pt-3 border-t border-red-100">
          <label className="text-[9px] font-bold text-red-400 uppercase mb-2 flex items-center gap-1">
             <FileText size={10}/> Comentarios Extras (Privado)
          </label>
          <textarea 
            {...register("specs.private_notes")} 
            rows={3}
            placeholder="Escribe aquí notas internas sobre la captación, llaves, horarios, etc."
            className="w-full p-3 rounded-lg text-xs outline-none border border-red-100 bg-red-50/30 text-red-900 focus:border-red-300 transition-all placeholder-red-300 resize-none"
          ></textarea>
       </div>

    </div>
  );
}