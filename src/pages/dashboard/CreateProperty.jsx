import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DollarSign, Home, Layout, ShieldCheck, ArrowLeft, Sun, Building, Map, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CreateProperty = () => {
  const { register, watch, handleSubmit } = useForm();
  const type = watch('property_type', 'Casa'); 
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // TEMAS SEGÚN USUARIO
  const getTheme = () => {
    if (user?.role === 'claudia') return { bg: 'bg-pink-50', card: 'bg-white border-pink-100', text: 'text-pink-900', accent: 'text-pink-600', btn: 'bg-pink-500 hover:bg-pink-600' };
    if (user?.role === 'alfonso') return { bg: 'bg-[#050b14]', card: 'bg-[#0f172a] border-gray-800', text: 'text-white', accent: 'text-blue-400', btn: 'bg-blue-600 hover:bg-blue-700' };
    return { bg: 'bg-gray-100', card: 'bg-white border-gray-200', text: 'text-gray-800', accent: 'text-[#009B4D]', btn: 'bg-[#009B4D] hover:bg-green-700' };
  };
  const theme = getTheme();

  // COLORES POR TIPO DE INMUEBLE (Hover Icons)
  const getTypeColor = (t) => {
     switch(t) {
        case 'Apartamento': return 'text-blue-500';
        case 'Casa': return 'text-green-500';
        case 'Bodega': return 'text-yellow-500';
        case 'CasaCampo': return 'text-purple-500';
        case 'Lote': return 'text-gray-500';
        default: return 'text-gray-400';
     }
  };

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Saving...", data);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} p-8 font-sans transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-700/20 pb-6">
           <Link to="/dashboard" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
              <ArrowLeft /> Volver al Panel
           </Link>
           <h1 className="text-3xl font-black uppercase">Nuevo Inmueble</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <div className="lg:col-span-2 space-y-8">
              
              {/* 1. SELECCIÓN DE TIPO */}
              <div className={`${theme.card} p-6 rounded-2xl border shadow-sm`}>
                 <h3 className={`${theme.accent} font-bold uppercase mb-6 flex items-center gap-2`}><Home size={18}/> Tipo de Inmueble</h3>
                 <div className="grid grid-cols-5 gap-2">
                    {['Casa', 'Apartamento', 'Bodega', 'CasaCampo', 'Lote'].map(t => (
                       <label key={t} className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border transition-all hover:scale-105 group ${type === t ? 'bg-black/5 border-black/20 font-bold' : 'border-transparent hover:bg-black/5'}`}>
                          <input type="radio" value={t} {...register('property_type')} className="hidden" />
                          <div className={`mb-2 transition-colors ${type === t ? getTypeColor(t) : 'text-gray-400 group-hover:' + getTypeColor(t)}`}>
                             {t === 'Casa' && <Home size={24}/>}
                             {t === 'Apartamento' && <Building size={24}/>}
                             {t === 'Bodega' && <Truck size={24}/>}
                             {t === 'CasaCampo' && <Sun size={24}/>}
                             {t === 'Lote' && <Map size={24}/>}
                          </div>
                          <span className="text-xs uppercase">{t}</span>
                       </label>
                    ))}
                 </div>
              </div>

              {/* 2. FINANCIERO (VERDE TENUE) */}
              <div className="bg-[#e8f5e9] p-6 rounded-2xl border border-green-200 text-green-900">
                 <h3 className="font-bold uppercase mb-4 flex items-center gap-2 text-green-800"><DollarSign size={18}/> Datos Financieros</h3>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div><label className="text-xs font-bold block mb-1">Precio Venta (COP)</label><input {...register('price_cop')} type="number" className="w-full p-2 rounded border border-green-300 focus:ring-2 focus:ring-green-500 outline-none" /></div>
                    <div><label className="text-xs font-bold block mb-1">Precio (USD)</label><input {...register('price_usd')} type="number" className="w-full p-2 rounded border border-green-300 outline-none" /></div>
                    <div><label className="text-xs font-bold block mb-1">Avalúo</label><input {...register('appraisal')} type="number" className="w-full p-2 rounded border border-green-300 outline-none" /></div>
                    <div><label className="text-xs font-bold block mb-1">Administración</label><input {...register('admin')} type="number" className="w-full p-2 rounded border border-green-300 outline-none" /></div>
                 </div>

                 {type === 'Lote' && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div><label className="text-xs font-bold block mb-1">Precio x m²</label><input {...register('price_m2')} className="w-full p-2 rounded border border-green-300 outline-none" /></div>
                        <div><label className="text-xs font-bold block mb-1">Impuesto Predial</label><input {...register('tax')} className="w-full p-2 rounded border border-green-300 outline-none" /></div>
                    </div>
                 )}

                 <div className="flex flex-wrap gap-4 text-xs font-bold mt-4 pt-4 border-t border-green-200">
                    <label className="flex items-center gap-1"><input type="checkbox" {...register('mortgage')} /> Hipoteca</label>
                    <label className="flex items-center gap-1"><input type="checkbox" {...register('patrimony')} /> Patrimonio Fam.</label>
                    <label className="flex items-center gap-1"><input type="checkbox" {...register('succession')} /> Sucesión</label>
                    <label className="flex items-center gap-1"><input type="checkbox" {...register('affectation')} /> Afectación Viv.</label>
                 </div>
              </div>

              {/* 3. CAMPOS ESPECÍFICOS (MUTANTES) */}
              <div className={`${theme.card} p-6 rounded-2xl border shadow-sm`}>
                 <h3 className={`${theme.accent} font-bold uppercase mb-6 flex items-center gap-2`}><Layout size={18}/> Especificaciones: {type}</h3>

                 {/* --- CASA --- */}
                 {type === 'Casa' && (
                    <div className="space-y-4">
                       <div className="grid grid-cols-3 gap-4">
                          <input {...register('levels')} placeholder="Niveles" className="p-3 rounded border w-full bg-transparent border-gray-400/30" />
                          <input {...register('area_lot')} placeholder="Área Lote m²" className="p-3 rounded border w-full bg-transparent border-gray-400/30" />
                          <input {...register('area_built')} placeholder="Área Const. m²" className="p-3 rounded border w-full bg-transparent border-gray-400/30" />
                       </div>
                       {/* Expandibles */}
                       <details className="bg-black/5 p-4 rounded-lg"><summary className="font-bold cursor-pointer text-sm">Detalle Locales</summary><textarea {...register('locales')} className="w-full mt-2 bg-transparent border-b border-gray-400/50 p-2 text-sm" placeholder="Área, baño, renta..."/></details>
                       <details className="bg-black/5 p-4 rounded-lg"><summary className="font-bold cursor-pointer text-sm">Aptos Independientes</summary><textarea {...register('apts_indep')} className="w-full mt-2 bg-transparent border-b border-gray-400/50 p-2 text-sm" placeholder="Habitaciones, cocina, estado..."/></details>
                    </div>
                 )}

                 {/* --- APARTAMENTO --- */}
                 {type === 'Apartamento' && (
                    <div className="space-y-4">
                       <div className="grid grid-cols-4 gap-4">
                          <input {...register('floor')} placeholder="Piso N°" className="p-3 rounded border w-full bg-transparent border-gray-400/30" />
                          <label className="flex items-center gap-2 border p-2 rounded"><input type="checkbox" {...register('duplex')} /> Duplex</label>
                          <label className="flex items-center gap-2 border p-2 rounded"><input type="checkbox" {...register('elevator')} /> Ascensor</label>
                          <select {...register('view')} className="p-3 rounded border w-full bg-transparent border-gray-400/30"><option>Interior</option><option>Exterior</option></select>
                       </div>
                       <div className="p-4 bg-black/5 rounded-lg">
                          <span className="text-xs font-bold block mb-2">Zonas Comunes</span>
                          <div className="flex flex-wrap gap-4 text-sm">
                             {['Gimnasio','Piscina','Salón','Parques'].map(z=><label key={z}><input type="checkbox" {...register(`zones.${z}`)}/> {z}</label>)}
                          </div>
                       </div>
                    </div>
                 )}

                 {/* --- BODEGA --- */}
                 {type === 'Bodega' && (
                    <div className="space-y-4">
                       <div className="grid grid-cols-3 gap-4 bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                          <label className="flex items-center gap-2 font-bold text-yellow-600"><input type="checkbox" {...register('zona_franca')} /> ZONA FRANCA</label>
                          <input {...register('height')} placeholder="Altura (m)" className="p-2 rounded border bg-transparent" />
                          <select {...register('energy')} className="p-2 rounded border bg-transparent"><option>Trifásica</option><option>Monofásica</option></select>
                       </div>
                       <div className="grid grid-cols-2 gap-4 text-sm">
                          <label><input type="checkbox" {...register('truck_door')} /> Puerta Tractomula</label>
                          <label><input type="checkbox" {...register('resistance_floor')} /> Piso Alta Resistencia</label>
                       </div>
                    </div>
                 )}

                 {/* --- LOTES (NUEVO) --- */}
                 {type === 'Lote' && (
                    <div className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                          <div><label className="text-xs block font-bold mb-1">Uso de Suelo</label><select {...register('land_use')} className="w-full p-2 border rounded bg-transparent"><option>Residencial</option><option>Industrial</option><option>Agrícola</option></select></div>
                          <div><label className="text-xs block font-bold mb-1">Estado Legal</label><select {...register('legal_status')} className="w-full p-2 border rounded bg-transparent"><option>Desenglobado</option><option>En Proceso</option></select></div>
                       </div>
                       <div className="p-4 border rounded bg-black/5">
                          <span className="text-xs font-bold block mb-2">Infraestructura</span>
                          <div className="flex flex-wrap gap-4 text-sm">
                             {['Agua','Luz','Gas','Alcantarillado','Vías'].map(i=><label key={i}><input type="checkbox" {...register(`infra.${i}`)}/> {i}</label>)}
                          </div>
                       </div>
                    </div>
                 )}
              </div>
           </div>

           {/* LATERAL DERECHO */}
           <div className="space-y-6">
              <div className="bg-red-50 p-6 rounded-2xl border border-red-200">
                 <h3 className="text-red-800 font-bold uppercase mb-4 text-xs tracking-widest flex items-center gap-2"><ShieldCheck size={14}/> Datos Privados (Confidencial)</h3>
                 <div className="space-y-3">
                    <input {...register('owner_name')} placeholder="Nombre Propietario" className="w-full p-3 bg-white border border-red-200 rounded text-sm" />
                    <input {...register('owner_phone')} placeholder="Teléfono" className="w-full p-3 bg-white border border-red-200 rounded text-sm" />
                    <input {...register('email')} placeholder="Correo" className="w-full p-3 bg-white border border-red-200 rounded text-sm" />
                    <input {...register('address_real')} placeholder="Dirección Exacta / Ficha" className="w-full p-3 bg-white border border-red-200 rounded text-sm" />
                 </div>
              </div>

              <button disabled={loading} className={`w-full py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-lg transform active:scale-95 transition-all ${theme.btn}`}>
                 {loading ? 'Guardando...' : 'Publicar Inmueble'}
              </button>
           </div>

        </form>
      </div>
    </div>
  );
};
export default CreateProperty;
