import React from 'react';
import { TreePine, Home, Warehouse } from 'lucide-react';

export default function RuralSpecs({ register, s }: any) {
  
  // Estilos base para inputs
  const inputClass = "w-full p-3 rounded-lg border border-gray-300 bg-white/50 focus:bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all";
  const labelClass = "block text-xs font-bold uppercase tracking-wider mb-1 text-gray-500";
  const sectionClass = "text-sm font-black uppercase text-purple-700 flex items-center gap-2 mb-4 border-b border-purple-200 pb-2";

  return (
    <div className="space-y-6">
      
      {/* SECCIÓN 1: TERRENO Y ENTORNO */}
      <div>
        <h3 className={sectionClass}><TreePine size={18}/> Terreno & Topografía</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div>
            <label className={labelClass}>Área Lote (Hectáreas/m²)</label>
            <input {...register("specs.land_area")} type="text" placeholder="Ej: 3.5 Ha" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Topografía</label>
            <select {...register("specs.topography")} className={inputClass}>
              <option value="">Seleccione...</option>
              <option value="Plano">Plano</option>
              <option value="Ondulado">Ondulado</option>
              <option value="Quebrado">Quebrado / Montañoso</option>
              <option value="Mixto">Mixto</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Tipo de Acceso</label>
            <select {...register("specs.access_type")} className={inputClass}>
              <option value="">Seleccione...</option>
              <option value="Pavimentado">Vía Pavimentada</option>
              <option value="Destapado">Carreteable / Destapado</option>
              <option value="Huella">Placa Huella</option>
              <option value="Solo 4x4">Solo 4x4</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Recurso Hídrico (Agua)</label>
            <select {...register("specs.water_source")} className={inputClass}>
              <option value="">Seleccione...</option>
              <option value="Acueducto Veredal">Acueducto Veredal</option>
              <option value="Pozo">Pozo Profundo</option>
              <option value="Nacimiento">Nacimiento Propio</option>
              <option value="Tanque">Reserva / Tanque</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Cerramiento</label>
            <select {...register("specs.fencing")} className={inputClass}>
               <option value="Sin cerramiento">Sin cerramiento</option>
               <option value="Alambre de Púas">Alambre de Púas</option>
               <option value="Malla Eslabonda">Malla Eslabonda</option>
               <option value="Cerca Viva">Cerca Viva / Natural</option>
               <option value="Muro">Muro en concreto</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: VIVIENDA PRINCIPAL */}
      <div>
        <h3 className={sectionClass}><Home size={18}/> Vivienda Principal</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className={labelClass}>Área Construida (m²)</label>
              <input {...register("specs.built_area")} type="number" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Niveles</label>
              <input {...register("specs.levels")} type="number" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Habitaciones</label>
              <input {...register("specs.bedrooms")} type="number" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Baños</label>
              <input {...register("specs.bathrooms")} type="number" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Suministro Gas</label>
              <select {...register("specs.gas_type")} className={inputClass}>
                  <option value="Pipeta">Pipeta / Propano</option>
                  <option value="Red Natural">Red Gas Natural</option>
                  <option value="No tiene">No tiene</option>
              </select>
            </div>
        </div>
      </div>

      {/* SECCIÓN 3: AMENIDADES DE CAMPO (Checkboxes) */}
      <div>
        <h3 className={sectionClass}><Warehouse size={18}/> Infraestructura & Recreación</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { id: "private_pool", label: "Piscina Privada" },
            { id: "jacuzzi", label: "Jacuzzi" },
            { id: "kiosk", label: "Kiosko / BBQ" },
            { id: "butler_house", label: "Casa Mayordomo" },
            { id: "stables", label: "Caballerizas" },
            { id: "sheds", label: "Galpones" },
            { id: "fruit_trees", label: "Árboles Frutales" },
            { id: "corral", label: "Corral / Vaquera" }
          ].map((item) => (
            <label key={item.id} className="flex items-center space-x-3 p-2 rounded hover:bg-purple-50 cursor-pointer border border-transparent hover:border-purple-100 transition-colors">
              <input 
                type="checkbox" 
                {...register(`specs.amenities.${item.id}`)} 
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500 border-gray-300" 
              />
              <span className="text-sm text-gray-700 font-medium">{item.label}</span>
            </label>
          ))}
        </div>
      </div>

    </div>
  );
}