import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Home, DollarSign, Briefcase, Sun, Map, Building } from 'lucide-react';

export default function CreatePropertyForm() {
  const { register, watch, handleSubmit } = useForm();
  const type = watch('property_type', 'Casa');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log('Enviando a Supabase:', data);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto p-6 space-y-8 bg-white text-black min-h-screen">
      
      {/* HEADER TIPO */}
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-black uppercase">Nuevo Inmueble</h1>
        <select {...register('property_type')} className="p-2 border-2 border-black rounded font-bold bg-gray-50">
          <option value="Casa">CASA (Urbano)</option>
          <option value="Apartamento">APARTAMENTO</option>
          <option value="Bodega">BODEGA</option>
          <option value="CasaCampo">CASA CAMPO</option>
          <option value="Lote">LOTE</option>
        </select>
      </div>

      {/* 1. SECCIÓN FINANCIERA */}
      <div className="bg-[#E8F5E9] p-6 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 mb-4 text-[#1B5E20] font-bold">
          <DollarSign size={20} />
          <h3>DATOS FINANCIEROS (USD/COP)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div><label className="text-xs font-bold text-green-900">Precio Venta (COP)*</label><input {...register('price_cop', {required:true})} type="number" className="w-full p-2 rounded border border-green-300 focus:ring-green-500" /></div>
          <div><label className="text-xs font-bold text-green-900">Precio USD</label><input {...register('price_usd')} type="number" className="w-full p-2 rounded border border-green-300" /></div>
          
          {type === 'Lote' && (
             <>
               <div><label className="text-xs font-bold text-green-900">Precio x m²</label><input {...register('price_m2')} className="w-full p-2 rounded border border-green-300" /></div>
               <div><label className="text-xs font-bold text-green-900">Predial</label><input {...register('predial_cost')} className="w-full p-2 rounded border border-green-300" /></div>
             </>
          )}

          {type === 'Bodega' && (
             <div><label className="text-xs font-bold text-green-900">Valor Arriendo</label><input {...register('rent_price')} className="w-full p-2 rounded border border-green-300" /></div>
          )}

          <div><label className="text-xs font-bold text-green-900">Avalúo</label><input {...register('appraisal_value')} className="w-full p-2 rounded border border-green-300" /></div>
          <div><label className="text-xs font-bold text-green-900">Admon</label><input {...register('admin_price')} className="w-full p-2 rounded border border-green-300" /></div>
        </div>
        
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-green-900">
           <label className="flex gap-1"><input type="checkbox" {...register('mortgage')} /> Hipoteca</label>
           <label className="flex gap-1"><input type="checkbox" {...register('family_affectation')} /> Afectación Familiar</label>
           <label className="flex gap-1"><input type="checkbox" {...register('family_heritage')} /> Patrimonio</label>
           <label className="flex gap-1"><input type="checkbox" {...register('succession')} /> Sucesión</label>
        </div>
      </div>

      {/* 2. CAMPOS MUTABLES */}
      
      {type === 'Casa' && (
        <div className="space-y-6 animate-in fade-in">
          <h3 className="font-bold border-l-4 border-black pl-2">DETALLES CASA</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded">
            <div><label className="text-xs font-bold">Niveles</label><input {...register('levels')} type="number" className="w-full border p-1" /></div>
            <div><label className="text-xs font-bold">Área Lote</label><input {...register('area_total')} className="w-full border p-1" /></div>
            <div><label className="text-xs font-bold">Construida</label><input {...register('area_built')} className="w-full border p-1" /></div>
            <div><label className="text-xs font-bold">Frente</label><input {...register('front')} className="w-full border p-1" /></div>
            <div><label className="text-xs font-bold">Fondo</label><input {...register('depth')} className="w-full border p-1" /></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="border p-3 rounded">
                <span className="font-bold text-sm block mb-2">Detalle Locales</span>
                <textarea {...register('specs_house.locales')} placeholder="Área, baño, renta..." className="w-full h-20 text-sm p-2 bg-gray-50" />
             </div>
             <div className="border p-3 rounded">
                <span className="font-bold text-sm block mb-2">Aptos Independientes</span>
                <textarea {...register('specs_house.aptos_indep')} placeholder="Habitaciones, cocina, estado..." className="w-full h-20 text-sm p-2 bg-gray-50" />
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <select {...register('garage_type')} className="border p-2"><option>Garaje...</option><option>Cubierto</option><option>Descubierto</option></select>
             <select {...register('floors')} className="border p-2"><option>Pisos...</option><option>Madera</option><option>Mármol</option></select>
          </div>
        </div>
      )}

      {type === 'Apartamento' && (
        <div className="space-y-6 animate-in fade-in">
           <h3 className="font-bold border-l-4 border-pink-500 pl-2">DETALLES APARTAMENTO</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div><label className="text-xs font-bold">Piso N°</label><input {...register('specs_apt.floor_number')} className="w-full border p-1" /></div>
             <label className="flex items-center gap-2 border p-2"><input type="checkbox" {...register('specs_apt.duplex')} /> Es Duplex</label>
             <label className="flex items-center gap-2 border p-2"><input type="checkbox" {...register('elevator')} /> Ascensor</label>
             <select {...register('view_type')} className="border p-1"><option>Vista...</option><option>Interior</option><option>Exterior</option></select>
           </div>
           
           <div className="bg-gray-50 p-4 rounded">
             <h4 className="text-xs font-bold mb-2 uppercase">Zonas Comunes</h4>
             <div className="flex flex-wrap gap-3 text-sm">
                {['Gimnasio', 'Piscina', 'Salón Comunal', 'Canchas', 'Parques'].map(z => (
                   <label key={z}><input type="checkbox" {...register(specs_apt.zones.)} /> {z}</label>
                ))}
             </div>
           </div>
        </div>
      )}

      {type === 'Bodega' && (
        <div className="space-y-6 animate-in fade-in">
           <h3 className="font-bold border-l-4 border-blue-600 pl-2">DETALLES INDUSTRIALES</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50 p-4 rounded">
              <label className="flex items-center gap-2 font-bold"><input type="checkbox" {...register('specs_warehouse.zona_franca')} /> ZONA FRANCA</label>
              <div><label className="text-xs">Altura (m)</label><input {...register('specs_warehouse.height')} className="w-full border p-1" /></div>
              <div><label className="text-xs">Energía</label><select {...register('specs_warehouse.energy')} className="w-full border p-1"><option>Trifásica</option><option>Monofásica</option></select></div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <label><input type="checkbox" {...register('specs_warehouse.truck_door')} /> Puerta Tractomulas</label>
              <label><input type="checkbox" {...register('specs_warehouse.sprinklers')} /> Rociadores/Humo</label>
              <label><input type="checkbox" {...register('specs_warehouse.power_plant')} /> Planta Eléctrica</label>
              <label><input type="checkbox" {...register('specs_warehouse.resistance_floor')} /> Pisos Alta Resistencia</label>
           </div>
        </div>
      )}

      {type === 'CasaCampo' && (
        <div className="space-y-6 animate-in fade-in">
           <h3 className="font-bold border-l-4 border-green-600 pl-2">DETALLES RURALES</h3>
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div><label className="text-xs font-bold">Topografía</label><select {...register('specs_rural.topography')} className="w-full border p-1"><option>Plano</option><option>Ondulado</option><option>Quebrado</option></select></div>
              <div><label className="text-xs font-bold">Fuente Agua</label><select {...register('specs_rural.water')} className="w-full border p-1"><option>Acueducto</option><option>Pozo</option><option>Propia</option></select></div>
              <label className="flex items-center border p-2"><input type="checkbox" {...register('specs_rural.fruit_trees')} /> Árboles Frutales</label>
           </div>
           <div className="bg-green-50 p-3 rounded">
              <span className="text-xs font-bold block mb-2">Amenidades Externas</span>
              <div className="flex flex-wrap gap-4 text-sm">
                 {['Piscina', 'Jacuzzi', 'BBQ', 'Kiosko', 'Casa Mayordomo', 'Caballerizas'].map(am => (
                    <label key={am}><input type="checkbox" {...register(specs_rural.amenities.)} /> {am}</label>
                 ))}
              </div>
           </div>
        </div>
      )}

      {type === 'Lote' && (
        <div className="space-y-6 animate-in fade-in">
           <h3 className="font-bold border-l-4 border-orange-500 pl-2">DETALLES TERRENO</h3>
           <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs font-bold">Uso de Suelo</label><select {...register('specs_land.land_use')} className="w-full border p-1"><option>Residencial</option><option>Industrial</option><option>Comercial</option><option>Agrícola</option></select></div>
              <div><label className="text-xs font-bold">Estado Legal</label><select {...register('specs_land.legal')} className="w-full border p-1"><option>Desenglobado</option><option>En Proceso</option></select></div>
           </div>
           <div className="p-4 border rounded">
              <span className="text-xs font-bold mb-2 block">Infraestructura Disponible</span>
              <div className="flex flex-wrap gap-4">
                 {['Agua', 'Luz', 'Gas', 'Alcantarillado', 'Vías Pavimentadas'].map(inf => (
                    <label key={inf}><input type="checkbox" {...register(specs_land.infra.)} /> {inf}</label>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* 3. DATOS PRIVADOS */}
      <div className="bg-gray-100 p-6 rounded-xl border border-gray-300">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Briefcase size={20}/> DATOS PRIVADOS (Confidencial)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input {...register('owner_name', {required:true})} placeholder="Nombre Propietario*" className="p-2 border rounded" />
           <input {...register('owner_phone', {required:true})} placeholder="Teléfono*" className="p-2 border rounded" />
           <input {...register('owner_email')} placeholder="Email" className="p-2 border rounded" />
           <input {...register('real_address', {required:true})} placeholder="Dirección Exacta / Ficha Catastral*" className="p-2 border rounded" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full py-4 bg-black text-[#39FF14] font-bold text-xl rounded hover:bg-gray-900 transition-all uppercase tracking-widest">
        {loading ? 'Guardando...' : 'Crear Inmueble'}
      </button>
    </form>
  );
}
