import React from 'react';
import { Map, ScrollText, Zap } from 'lucide-react';

export default function LoteSpecs({ register, s }: any) {

  // Estilos base (Neutros/Grises)
  const inputClass = "w-full p-3 rounded-lg border border-gray-300 bg-white/50 focus:bg-white focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all";
  const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1 text-gray-500";
  const sectionClass = "text-sm font-black uppercase text-gray-700 flex items-center gap-2 mb-4 border-b border-gray-300 pb-2";

  return (
    <div className="space-y-6">

      {/* SECCIÓN 1: DIMENSIONES Y PRECIO */}
      <div>
        <h3 className={sectionClass}><Map size={18}/> Dimensiones</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className={labelClass}>Área Total (m²)</label>
            <input {...register("specs.total_area")} type="number" placeholder="Ej: 500" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Frente (Metros)</label>
            <input {...register("specs.front_length")} type="number" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Fondo (Metros)</label>
            <input {...register("specs.depth_length")} type="number" className={inputClass} />
          </div>

          <div>
             <label className={labelClass}>Valor por m² (Ref)</label>
             <input {...register("specs.price_per_m2")} type="text" placeholder="$ COP" className={inputClass} />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Uso de Suelo Principal</label>
            <select {...register("specs.soil_use")} className={inputClass}>
               <option value="Residencial">Residencial</option>
               <option value="Comercial">Comercial</option>
               <option value="Industrial">Industrial</option>
               <option value="Agrícola">Agrícola</option>
               <option value="Institucional">Institucional</option>
               <option value="Mixto">Mixto</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: NORMATIVA */}
      <div>
        <h3 className={sectionClass}><ScrollText size={18}/> Normativa & Estado Legal</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
               <label className={labelClass}>Índice Ocupación (%)</label>
               <input {...register("specs.occupation_index")} placeholder="Ej: 40%" className={inputClass} />
            </div>
            <div>
               <label className={labelClass}>Índice Construcción</label>
               <input {...register("specs.construction_index")} placeholder="Ej: 2.5" className={inputClass} />
            </div>
            
            <div className="flex items-center h-full pt-4">
               <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" {...register("specs.has_license")} className="w-5 h-5 text-gray-600 rounded" />
                  <span className="text-sm font-bold text-gray-700">Licencia Vigente</span>
               </label>
            </div>
            
            <div className="flex items-center h-full pt-4">
               <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" {...register("specs.is_unencumbered")} className="w-5 h-5 text-gray-600 rounded" />
                  <span className="text-sm font-bold text-gray-700">Predio Desenglobado</span>
               </label>
            </div>
        </div>
      </div>

      {/* SECCIÓN 3: SERVICIOS E INFRAESTRUCTURA */}
      <div>
        <h3 className={sectionClass}><Zap size={18}/> Servicios Disponibles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          {[
            { id: "water", label: "Acometida Agua" },
            { id: "energy", label: "Energía / Luz" },
            { id: "sewer", label: "Alcantarillado" },
            { id: "gas", label: "Gas Natural" },
            { id: "paved_road", label: "Vías Pavimentadas" },
            { id: "public_light", label: "Alumbrado Público" },
            { id: "sidewalks", label: "Andenes" },
            { id: "internet", label: "Red Internet" }
          ].map((item) => (
            <label key={item.id} className="flex items-center space-x-2 text-sm text-gray-600">
              <input 
                type="checkbox" 
                {...register(`specs.services.${item.id}`)} 
                className="w-4 h-4 text-gray-600 rounded border-gray-300 focus:ring-gray-500" 
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}