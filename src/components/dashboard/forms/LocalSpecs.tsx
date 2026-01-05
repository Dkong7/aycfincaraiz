import React from 'react';
import { Store, ShoppingBag, Flame } from 'lucide-react';

export default function LocalSpecs({ register, s }: any) {

  // Estilos: Tema Rosa/Fucsia
  const inputClass = "w-full p-3 rounded-lg border border-gray-300 bg-white/50 focus:bg-white focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all";
  const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1 text-gray-500";
  const sectionClass = "text-sm font-black uppercase text-pink-700 flex items-center gap-2 mb-4 border-b border-pink-200 pb-2";

  return (
    <div className="space-y-6">

      {/* SECCIÓN 1: VISIBILIDAD Y DIMENSIONES */}
      <div>
        <h3 className={sectionClass}><Store size={18}/> Vitrina & Dimensiones</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div>
            <label className={labelClass}>Área Total (m²)</label>
            <input {...register("specs.total_area")} type="number" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Frente Vitrina (m)</label>
            <input {...register("specs.showcase_front")} type="number" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Fondo (m)</label>
            <input {...register("specs.depth")} type="number" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Altura Libre (m)</label>
            <input {...register("specs.height")} type="number" className={inputClass} />
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: UBICACIÓN Y TIPO */}
      <div>
        <h3 className={sectionClass}><ShoppingBag size={18}/> Ubicación</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            
            <div>
                <label className={labelClass}>Tipo de Ubicación</label>
                <select {...register("specs.location_type")} className={inputClass}>
                    <option value="Calle">Local a la Calle</option>
                    <option value="Centro Comercial">Centro Comercial</option>
                    <option value="Plazoleta">Plazoleta de Comidas</option>
                    <option value="Pasaje">Pasaje Comercial</option>
                </select>
            </div>

            <div>
                <label className={labelClass}>Baños</label>
                <div className="flex gap-2">
                    <input {...register("specs.bathrooms_count")} type="number" placeholder="#" className={`w-1/3 ${inputClass}`} />
                    <select {...register("specs.bathrooms_location")} className={`w-2/3 ${inputClass}`}>
                        <option value="Interno">Internos</option>
                        <option value="Centro Comercial">Del Centro Cial</option>
                        <option value="Ambos">Ambos</option>
                    </select>
                </div>
            </div>

            <div className="flex items-center pt-4 space-x-4">
                 <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" {...register("specs.is_corner")} className="w-5 h-5 text-pink-600 rounded" />
                    <span className="text-sm font-bold text-gray-600">Esquinero</span>
                 </label>
            </div>
        </div>
      </div>

      {/* SECCIÓN 3: ESPECIFICACIONES TÉCNICAS (Checkboxes) */}
      <div>
        <h3 className={sectionClass}><Flame size={18}/> Especificaciones Técnicas</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
             {[
                { id: "mezzanine", label: "Mezzanine" },
                { id: "terrace", label: "Terraza Privada" },
                { id: "industrial_gas", label: "Gas Industrial" },
                { id: "extraction_duct", label: "Ducto Extracción" },
                { id: "three_phase", label: "Energía Trifásica" },
                { id: "grease_trap", label: "Trampa de Grasas" },
                { id: "parking_bay", label: "Bahía de Parqueo" },
                { id: "loading_zone", label: "Zona de Carga" }
            ].map((item) => (
                <label key={item.id} className="flex items-center space-x-2 text-sm text-gray-700 p-2 rounded hover:bg-pink-50 border border-transparent hover:border-pink-100 transition-colors cursor-pointer">
                    <input 
                        type="checkbox" 
                        {...register(`specs.features.${item.id}`)} 
                        className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500 border-gray-300" 
                    />
                    <span>{item.label}</span>
                </label>
            ))}
        </div>
      </div>

    </div>
  );
}