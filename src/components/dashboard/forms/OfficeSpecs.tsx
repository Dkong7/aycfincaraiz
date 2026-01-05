import React from 'react';
import { Building2, Network, Briefcase } from 'lucide-react';

export default function OfficeSpecs({ register, s }: any) {

  // Estilos: Tema Esmeralda/Corporativo
  const inputClass = "w-full p-3 rounded-lg border border-gray-300 bg-white/50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all";
  const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1 text-gray-500";
  const sectionClass = "text-sm font-black uppercase text-emerald-800 flex items-center gap-2 mb-4 border-b border-emerald-200 pb-2";

  return (
    <div className="space-y-6">

      {/* SECCIÓN 1: ESPACIO Y DOTACIÓN */}
      <div>
        <h3 className={sectionClass}><Building2 size={18}/> Espacio & Dotación</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div>
            <label className={labelClass}>Área Privada (m²)</label>
            <input {...register("specs.area")} type="number" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Piso / Nivel</label>
            <input {...register("specs.floor_level")} type="number" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Garajes Privados</label>
            <input {...register("specs.garages")} type="number" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Baños</label>
            <select {...register("specs.bathrooms_type")} className={inputClass}>
              <option value="Privados">Privados</option>
              <option value="Batería Comunal">Batería Comunal (Piso)</option>
              <option value="Mixto">Mixto (Privado + Comunal)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: INFRAESTRUCTURA (Checkboxes) */}
      <div>
        <h3 className={sectionClass}><Network size={18}/> Infraestructura Técnica</h3>
        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
                { id: "structured_cabling", label: "Cableado Estructurado" },
                { id: "ac_central", label: "Aire Acondicionado Central" },
                { id: "power_plant", label: "Planta Suplencia Total" },
                { id: "led_lighting", label: "Iluminación LED" },
                { id: "smart_elevators", label: "Ascensores Inteligentes" },
                { id: "cctv", label: "CCTV / Seguridad" },
                { id: "fire_system", label: "Red Contra Incendios" },
                { id: "biometric", label: "Acceso Biométrico" }
            ].map((item) => (
                <label key={item.id} className="flex items-center space-x-2 cursor-pointer hover:bg-emerald-100/50 p-1 rounded transition-colors">
                <input 
                    type="checkbox" 
                    {...register(`specs.features.${item.id}`)} 
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300" 
                />
                <span className="text-sm text-gray-700">{item.label}</span>
                </label>
            ))}
            </div>
        </div>
      </div>

      {/* SECCIÓN 3: AMENIDADES EDIFICIO */}
      <div>
        <h3 className={sectionClass}><Briefcase size={18}/> Amenidades Corporativas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
             {[
                { id: "meeting_room", label: "Sala de Juntas" },
                { id: "auditorium", label: "Auditorio" },
                { id: "cafeteria", label: "Cocineta / Cafetería" },
                { id: "reception", label: "Recepción / Lobby" },
                { id: "visitor_parking", label: "Parqueo Visitantes" },
                { id: "terrace_lounge", label: "Terraza / Lounge" }
            ].map((item) => (
                <label key={item.id} className="flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" {...register(`specs.amenities.${item.id}`)} className="w-4 h-4 text-emerald-600 rounded" />
                <span>{item.label}</span>
                </label>
            ))}
        </div>
      </div>

    </div>
  );
}