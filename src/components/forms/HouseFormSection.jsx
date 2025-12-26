import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Home, Bath, Car, DollarSign, Layers, Shield, Sun } from 'lucide-react'; // Asegúrate de tener lucide-react

const HouseFormSection = () => {
  const { register } = useFormContext();
  const [expandLevels, setExpandLevels] = useState(false);

  return (
    <div className="space-y-6">
      {/* 1. CUADRO VERDE (FINANCIERO) */}
      <div className="bg-[#E8F5E9] p-4 rounded-lg border border-[#A5D6A7]">
        <h3 className="text-[#1B5E20] font-bold mb-3 flex items-center gap-2">
          <DollarSign size={18} /> Detalles Financieros
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-bold text-[#1B5E20]">Precio Venta (COP)*</label>
            <input type="number" {...register('price_cop', { required: true })} className="w-full p-2 border rounded bg-white" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#1B5E20]">Precio Venta (USD)</label>
            <input type="number" {...register('price_usd')} className="w-full p-2 border rounded bg-white" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#1B5E20]">Valor Avalúo</label>
            <input type="number" {...register('appraisal_value')} className="w-full p-2 border rounded bg-white" />
          </div>
          <div>
            <label className="text-xs font-bold text-[#1B5E20]">Valor Admon</label>
            <input type="number" {...register('admin_price')} className="w-full p-2 border rounded bg-white" />
          </div>
          {/* Checkboxes Financieros */}
          <div className="col-span-full flex flex-wrap gap-4 mt-2">
            {['Hipoteca', 'Afectación Familiar', 'Patrimonio Familiar', 'Sucesión'].map((label, idx) => {
               const key = ['mortgage', 'family_affectation', 'family_heritage', 'succession'][idx];
               return (
                 <label key={key} className="flex items-center gap-2 text-sm text-[#1B5E20]">
                   <input type="checkbox" {...register(key)} /> {label}
                 </label>
               );
            })}
          </div>
        </div>
      </div>

      {/* 2. DIMENSIONES DEL LOTE */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 bg-gray-50 rounded">
        <div><label className="text-xs">Área Lote (m²)*</label><input {...register('area_total', {required: true})} className="w-full p-1 border" /></div>
        <div><label className="text-xs">Construida</label><input {...register('area_built')} className="w-full p-1 border" /></div>
        <div><label className="text-xs">Privada</label><input {...register('area_private')} className="w-full p-1 border" /></div>
        <div><label className="text-xs">Frente</label><input {...register('front_measure')} className="w-full p-1 border" /></div>
        <div><label className="text-xs">Fondo</label><input {...register('depth_measure')} className="w-full p-1 border" /></div>
      </div>

      {/* 3. ESTRUCTURA Y NIVELES (EXPANSIBLE) */}
      <div className="border p-4 rounded">
        <div className="flex justify-between items-center mb-2">
          <label className="font-bold">Número de Niveles</label>
          <input type="number" {...register('levels')} className="border p-1 w-20" />
        </div>
        
        <button type="button" onClick={() => setExpandLevels(!expandLevels)} className="text-blue-600 text-sm underline mb-2">
          {expandLevels ? 'Ocultar Detalles Niveles' : '+ Detallar Locales/Apartamentos'}
        </button>

        {expandLevels && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-blue-50 p-3 rounded animate-in fade-in slide-in-from-top-2">
             <div>
               <label className="text-xs font-bold">Detalle Locales Comerciales</label>
               <textarea {...register('details_subunits.locales')} placeholder="Ej: Local 1 (30m2, baño)..." className="w-full p-2 text-sm border rounded h-20" />
             </div>
             <div>
               <label className="text-xs font-bold">Detalle Aptos Independientes</label>
               <textarea {...register('details_subunits.apartamentos')} placeholder="Ej: Apto 201 (2 habs, cocina)..." className="w-full p-2 text-sm border rounded h-20" />
             </div>
          </div>
        )}
      </div>

      {/* 4. COMODIDADES (ICONOS / DROPDOWNS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
           <label className="flex gap-1 text-sm"><Home size={16}/> Habitaciones</label>
           <input type="number" {...register('bedrooms')} className="w-full border p-1" />
        </div>
        <div>
           <label className="flex gap-1 text-sm"><Bath size={16}/> Baños</label>
           <input type="number" {...register('bathrooms')} className="w-full border p-1" />
        </div>
        <div>
           <label className="flex gap-1 text-sm"><Car size={16}/> Garaje</label>
           <select {...register('garage_type')} className="w-full border p-1">
             <option value="">Seleccione</option>
             <option value="Cubierto">Cubierto</option>
             <option value="Descubierto">Descubierto</option>
             <option value="En Línea">En Línea</option>
             <option value="Independiente">Independiente</option>
           </select>
        </div>
        <div>
           <label className="flex gap-1 text-sm"><Layers size={16}/> Pisos</label>
           <select {...register('floor_types')} className="w-full border p-1">
             <option value="Madera">Madera</option>
             <option value="Cerámica">Cerámica</option>
             <option value="Mármol">Mármol</option>
             <option value="Laminado">Laminado</option>
           </select>
        </div>
      </div>

      {/* 5. BOOLEANOS (ICONS) */}
      <div className="flex flex-wrap gap-4 border-t pt-4">
         <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded">
            <input type="checkbox" {...register('amenities.gas_natural')} /> <Sun size={16} /> Gas Natural
         </label>
         <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded">
            <input type="checkbox" {...register('amenities.balcon')} /> Balcón
         </label>
         <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded">
            <input type="checkbox" {...register('amenities.terraza')} /> Terraza
         </label>
         <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-1 rounded">
            <input type="checkbox" {...register('complex_specs.security')} /> <Shield size={16}/> Vigilancia
         </label>
      </div>
    </div>
  );
};

export default HouseFormSection;
