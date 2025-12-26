import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DollarSign, Home, Layout, ShieldCheck, ArrowLeft, Save } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const CreateProperty = () => {
  const { register, watch, handleSubmit, setValue } = useForm();
  const type = watch('property_type', 'Casa');
  const priceCOP = watch('price_cop');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // CONVERSIÓN AUTOMÁTICA USD (Tasa Fija aprox para el ejemplo, idealmente API)
  const USD_RATE = 4200; 

  useEffect(() => {
    if (priceCOP) {
      const usd = (parseFloat(priceCOP) / USD_RATE).toFixed(0);
      setValue('price_usd', usd);
    }
  }, [priceCOP, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Estructuramos el JSON 'specs' con los campos específicos
      const specsData = {
         levels: data.levels,
         locals_detail: data.locals_detail,
         apts_detail: data.apts_detail,
         area_lot: data.area_lot,
         area_built: data.area_built,
         area_private: data.area_private,
         front: data.front,
         depth: data.depth,
         amenities: data.amenities, // Array de checkboxes
         zoning: data.zoning, // Para lotes/bodegas
         industrial_specs: data.industrial_specs, // Bodegas
         rural_specs: data.rural_specs // Casas Campo
      };

      const { error } = await supabase.from('properties').insert([{
         listing_type: 'Venta', // Default o agregar selector
         property_type: data.property_type,
         price_cop: data.price_cop,
         price_usd: data.price_usd,
         admin_price: data.admin_price,
         appraisal_price: data.appraisal_price,
         mortgage: data.mortgage,
         family_patrimony: data.patrimony,
         owner_name: data.owner_name,
         owner_phone: data.owner_phone,
         owner_email: data.owner_email,
         real_address: data.real_address,
         address_visible: data.address_visible, // Barrio visible
         comments: data.comments,
         specs: specsData,
         // Imagen default para que no quede vacía
         main_media_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000' 
      }]);

      if (error) throw error;
      alert('Propiedad creada con Código AYC Automático');
      navigate('/dashboard');

    } catch (e) {
      alert('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
           <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft/> Cancelar</Link>
           <h1 className="text-3xl font-black uppercase">Nuevo Inmueble</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <div className="lg:col-span-2 space-y-6">
              {/* TIPO */}
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
                 <label className="text-xs font-bold text-gray-400 uppercase block mb-3">Formato de Inmueble</label>
                 <div className="grid grid-cols-5 gap-2">
                    {['Casa', 'Apartamento', 'Bodega', 'CasaCampo', 'Lote'].map(t => (
                       <label key={t} className={`p-3 rounded-lg border text-center text-xs font-bold cursor-pointer transition-all ${type === t ? 'bg-[#009B4D] border-[#009B4D] text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}>
                          <input type="radio" value={t} {...register('property_type')} className="hidden"/> {t}
                       </label>
                    ))}
                 </div>
                 <div className="mt-4">
                    <label className="text-xs font-bold text-gray-400 uppercase">Barrio / Ubicación Visible</label>
                    <input {...register('address_visible')} placeholder="Ej: Rosales, Chía..." className="w-full bg-[#050b14] border border-gray-700 p-3 rounded-lg mt-1 outline-none focus:border-[#009B4D]" required/>
                 </div>
              </div>

              {/* FINANCIERO (VERDE TENUE) */}
              <div className="bg-[#0f2e1d] p-6 rounded-2xl border border-[#009B4D]/30">
                 <h3 className="text-[#009B4D] font-bold uppercase mb-4 flex items-center gap-2"><DollarSign size={18}/> Financiero</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div><label className="text-[10px] uppercase font-bold text-[#009B4D]">Precio (COP)</label><input {...register('price_cop')} type="number" className="w-full bg-black/20 border border-[#009B4D]/30 p-2 rounded text-white" required/></div>
                    <div><label className="text-[10px] uppercase font-bold text-[#009B4D]">Precio (USD - Auto)</label><input {...register('price_usd')} readOnly className="w-full bg-black/40 border border-[#009B4D]/10 p-2 rounded text-gray-400 cursor-not-allowed"/></div>
                    <div><label className="text-[10px] uppercase font-bold text-[#009B4D]">Avalúo</label><input {...register('appraisal_price')} className="w-full bg-black/20 border border-[#009B4D]/30 p-2 rounded text-white"/></div>
                    <div><label className="text-[10px] uppercase font-bold text-[#009B4D]">Admon</label><input {...register('admin_price')} className="w-full bg-black/20 border border-[#009B4D]/30 p-2 rounded text-white"/></div>
                 </div>
                 <div className="flex flex-wrap gap-4 text-xs font-bold text-[#009B4D]">
                    <label className="flex items-center gap-2"><input type="checkbox" {...register('mortgage')} /> Hipoteca</label>
                    <label className="flex items-center gap-2"><input type="checkbox" {...register('patrimony')} /> Patrimonio Fam.</label>
                    <label className="flex items-center gap-2"><input type="checkbox" {...register('succession')} /> Sucesión</label>
                    <label className="flex items-center gap-2"><input type="checkbox" {...register('affectation')} /> Afectación Viv.</label>
                 </div>
              </div>

              {/* ESPECIFICACIONES DINÁMICAS */}
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
                 <h3 className="text-white font-bold uppercase mb-4 flex items-center gap-2"><Layout size={18}/> Detalles: {type}</h3>
                 
                 {/* --- CASA --- */}
                 {type === 'Casa' && (
                    <div className="space-y-4">
                       <div className="grid grid-cols-3 gap-4">
                          <input {...register('levels')} placeholder="Niveles" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                          <input {...register('area_lot')} placeholder="Área Lote m²" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                          <input {...register('area_built')} placeholder="Área Const. m²" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                       </div>
                       <textarea {...register('locals_detail')} placeholder="Detalle Locales (Área, baño, renta)..." className="w-full bg-[#050b14] border border-gray-700 p-3 rounded h-20 text-sm"/>
                       <textarea {...register('apts_detail')} placeholder="Detalle Aptos Independientes..." className="w-full bg-[#050b14] border border-gray-700 p-3 rounded h-20 text-sm"/>
                    </div>
                 )}

                 {/* --- APARTAMENTO --- */}
                 {type === 'Apartamento' && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <input {...register('floor')} placeholder="Piso" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                       <input {...register('estrato')} placeholder="Estrato" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                       <label className="flex items-center gap-2 border border-gray-700 p-2 rounded"><input type="checkbox" {...register('elevator')}/> Ascensor</label>
                       <label className="flex items-center gap-2 border border-gray-700 p-2 rounded"><input type="checkbox" {...register('duplex')}/> Duplex</label>
                    </div>
                 )}

                 {/* --- BODEGA --- */}
                 {type === 'Bodega' && (
                    <div className="space-y-4">
                       <div className="flex gap-4">
                          <label className="flex items-center gap-2 font-bold text-yellow-500"><input type="checkbox" {...register('industrial_specs.zona_franca')}/> ZONA FRANCA</label>
                          <input {...register('industrial_specs.rent_value')} placeholder="Valor Arriendo (Si aplica)" className="bg-[#050b14] border border-gray-700 p-2 rounded flex-1"/>
                       </div>
                       <div className="grid grid-cols-3 gap-4">
                          <input {...register('industrial_specs.height')} placeholder="Altura (m)" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                          <input {...register('industrial_specs.kVA')} placeholder="Energía (Tri/Mono)" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                          <input {...register('industrial_specs.entries')} placeholder="N° Entradas" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                       </div>
                    </div>
                 )}

                 {/* --- LOTE (NUEVO) --- */}
                 {type === 'Lote' && (
                    <div className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <input {...register('area_lot')} placeholder="Área Total m²" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                          <input {...register('price_m2')} placeholder="Precio x m²" className="bg-[#050b14] border border-gray-700 p-2 rounded"/>
                       </div>
                       <div className="p-3 border border-gray-700 rounded">
                          <p className="text-xs font-bold text-gray-400 mb-2">INFRAESTRUCTURA</p>
                          <div className="flex flex-wrap gap-3 text-sm">
                             {['Agua','Luz','Gas','Alcantarillado','Vías','Alumbrado'].map(i=><label key={i}><input type="checkbox" {...register(`specs.infra.${i}`)}/> {i}</label>)}
                          </div>
                       </div>
                    </div>
                 )}
              </div>

              {/* COMENTARIOS */}
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
                 <label className="text-xs font-bold text-gray-400 uppercase block mb-2">Comentarios / Observaciones</label>
                 <textarea {...register('comments')} className="w-full bg-[#050b14] border border-gray-700 p-3 rounded h-24 outline-none focus:border-[#009B4D]"></textarea>
              </div>
           </div>

           {/* PRIVADO */}
           <div className="bg-red-900/10 p-6 rounded-2xl border border-red-900/30 h-fit sticky top-4">
              <h3 className="text-red-400 font-bold uppercase mb-6 flex items-center gap-2"><ShieldCheck size={18}/> Privado</h3>
              <div className="space-y-4">
                 <input {...register('owner_name')} placeholder="Nombre Propietario" className="w-full bg-[#050b14] border border-red-900/30 p-3 rounded focus:border-red-500 outline-none" required/>
                 <input {...register('owner_phone')} placeholder="Teléfono" className="w-full bg-[#050b14] border border-red-900/30 p-3 rounded focus:border-red-500 outline-none" required/>
                 <input {...register('owner_email')} placeholder="Email" className="w-full bg-[#050b14] border border-red-900/30 p-3 rounded focus:border-red-500 outline-none" required/>
                 <input {...register('real_address')} placeholder="Dirección Exacta / Ficha" className="w-full bg-[#050b14] border border-red-900/30 p-3 rounded focus:border-red-500 outline-none" required/>
              </div>
              <button disabled={loading} className="w-full mt-8 py-4 bg-[#009B4D] hover:bg-green-600 text-white font-black rounded-xl uppercase tracking-widest shadow-lg flex items-center justify-center gap-2">
                 {loading ? 'Generando AYC...' : <><Save size={20}/> Guardar Inmueble</>}
              </button>
           </div>

        </form>
      </div>
    </div>
  );
};
export default CreateProperty;
