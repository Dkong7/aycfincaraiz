import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { DollarSign, ShieldCheck, ArrowLeft, PlusCircle, Trash2, Save, Layout, Home, Building2, Warehouse, Mountain, Map, Upload, X, Wand2, Maximize, Bed, Bath, Car, ArrowLeftRight, ArrowUpDown, Flame, Briefcase, GripVertical } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { useTRM } from '../../hooks/useTRM';
import SmartModal from '../../components/ui/SmartModal';

const CreateProperty = () => {
  const { id } = useParams();
  const { register, watch, handleSubmit, reset, setValue, getValues } = useForm({ 
    defaultValues: { property_type: 'Casa', listing_type: 'Venta', specs: { levels_data: [] } } 
  });
  
  const type = watch('property_type');
  const priceCOP = watch('price_cop');
  const isGated = watch('is_gated');
  const hasIndepUnits = watch('has_independent_units');
  
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([{ id: 1 }]);
  const [gallery, setGallery] = useState([]);
  
  // Refs para Drag & Drop
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [modal, setModal] = useState({ open: false, config: {} });
  const trm = useTRM();
  const navigate = useNavigate();

  // --- FUNCIONES DE NIVELES (DEFINIDAS AL INICIO) ---
  const addLevel = () => {
    setLevels(prev => [...prev, { id: prev.length + 1 }]);
  };

  const removeLevel = () => {
    setLevels(prev => {
        if (prev.length > 1) return prev.slice(0, -1);
        return prev;
    });
  };

  // --- UTILIDAD: Input con Icono ---
  const IconInput = ({ icon: Icon, ...props }) => (
    <div className="relative">
       <Icon size={14} className="absolute left-3 top-3 text-gray-500"/>
       <input {...props} className="w-full bg-black/30 border border-gray-700 p-2 pl-9 rounded text-xs focus:border-green-500 outline-none transition-colors text-white" />
    </div>
  );

  // --- LOGICA FOTOS ---
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => setGallery(prev => [...prev, reader.result]);
        reader.readAsDataURL(file);
    });
  };
  
  const handleDragStart = (e, position) => { dragItem.current = position; };
  const handleDragEnter = (e, position) => { dragOverItem.current = position; };
  const handleDrop = () => {
    const copyList = [...gallery];
    const dragItemContent = copyList[dragItem.current];
    copyList.splice(dragItem.current, 1);
    copyList.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setGallery(copyList);
  };
  const removePhoto = (idx) => setGallery(gallery.filter((_, i) => i !== idx));

  // --- IA GENERATOR ---
  const generateAIDescription = () => {
     const val = getValues();
     const loc = val.address_visible || 'ubicación privilegiada';
     const txt = `Excelente ${val.property_type} en ${loc}. Cuenta con grandes espacios y acabados de calidad. Ideal para inversión. Precio: $${new Intl.NumberFormat('es-CO').format(val.price_cop || 0)}.`;
     setValue('description', txt);
  };

  // --- CARGA DATOS ---
  useEffect(() => {
    if (id) {
       const fetchProp = async () => {
          const { data } = await supabase.from('properties').select('*').eq('id', id).single();
          if (data) {
             const flatData = { ...data, ...data.specs };
             if(data.specs?.levels_data) setLevels(data.specs.levels_data.map((l, i) => ({ id: i+1 })));
             if(data.gallery_images) setGallery(data.gallery_images);
             reset(flatData);
          }
       };
       fetchProp();
    }
  }, [id, reset]);

  const sanitizeNum = (val) => (val === '' || val === null || isNaN(val)) ? null : parseFloat(val);

  const onSubmit = async (data) => {
    setLoading(true);
    setModal({ open: true, config: { type: 'loading', title: 'Guardando...', theme: 'blue' } });

    try {
        const specs = {
            levels_data: levels.map((l, i) => ({ 
                level: i+1, desc: data[`level_${i+1}_desc`], opts: data[`level_${i+1}_opts`]
            })),
            amenities: data.amenities, infra: data.infra, common_areas: data.common_areas,
            ...data
        };

        const payload = {
            title: data.title, listing_type: 'Venta', property_type: data.property_type,
            price_cop: sanitizeNum(data.price_cop), price_usd: sanitizeNum(data.price_cop) ? (sanitizeNum(data.price_cop) / trm).toFixed(0) : 0,
            address_visible: data.address_visible, real_address: data.real_address,
            description: data.description, owner_name: data.owner_name, owner_phone: data.owner_phone, owner_email: data.owner_email,
            admin_price: isGated ? sanitizeNum(data.admin_price) : 0, appraisal_price: sanitizeNum(data.appraisal_price),
            tax_price: sanitizeNum(data.tax_price), rent_value: sanitizeNum(data.rent_value),
            mortgage: data.mortgage, affectation: data.affectation, family_patrimony: data.family_patrimony, succession: data.succession,
            area_lot: sanitizeNum(data.area_lot), area_built: sanitizeNum(data.area_built), area_private: sanitizeNum(data.area_private),
            front: sanitizeNum(data.front), depth: sanitizeNum(data.depth),
            habs: sanitizeNum(data.habs), baths: sanitizeNum(data.baths), parking_type: data.parking_type,
            gas_type: data.gas_type, floor_type: data.floor_type, kitchen_type: data.kitchen_type, dining_type: data.dining_type,
            fireplace: data.fireplace, is_gated: data.is_gated, has_independent_units: data.has_independent_units,
            independent_units_details: data.independent_units_details, common_areas: data.common_areas,
            floor_number: sanitizeNum(data.floor_number), height: sanitizeNum(data.height), energy_type: data.energy_type,
            specs: specs, gallery_images: gallery,
            main_media_url: gallery.length > 0 ? gallery[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa'
        };

        if (id) {
           const { error } = await supabase.from('properties').update(payload).eq('id', id);
           if(error) throw error;
           setModal({ open: true, config: { type: 'success', title: 'Actualizado', msg: 'Cambios guardados.', onConfirm: () => navigate('/dashboard/inventario') } });
        } else {
           const { error } = await supabase.from('properties').insert([payload]);
           if(error) throw error;
           setModal({ open: true, config: { type: 'success', title: 'Creado', msg: 'Propiedad publicada.', onConfirm: () => navigate('/dashboard/inventario') } });
        }
    } catch (e) { 
       setModal({ open: true, config: { type: 'error', title: 'Error', msg: e.message, theme: 'blue', onConfirm: () => setModal({open:false}) } });
    }
    setLoading(false);
  };

  const typeConfig = {
    Casa: { color: 'bg-green-600', border: 'border-green-600', icon: <Home/>, label: 'Residencial' },
    Apartamento: { color: 'bg-blue-600', border: 'border-blue-600', icon: <Building2/>, label: 'Urbano' },
    Bodega: { color: 'bg-yellow-600', border: 'border-yellow-600', icon: <Warehouse/>, label: 'Industrial' },
    CasaCampo: { color: 'bg-purple-600', border: 'border-purple-600', icon: <Mountain/>, label: 'Rural' },
    Lote: { color: 'bg-gray-500', border: 'border-gray-500', icon: <Map/>, label: 'Terreno' }
  };
  const theme = typeConfig[type] || typeConfig['Casa'];

  return (
    <div className="min-h-screen bg-[#050b14] text-white p-8 font-sans">
      <SmartModal isOpen={modal.open} onClose={() => setModal({...modal, open: false})} config={modal.config} />
      
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
           <Link to="/dashboard/inventario" className="flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft/> Volver</Link>
           <div className="text-right">
              <h1 className="text-3xl font-black uppercase">{id ? 'Editar' : 'Nuevo'} Inmueble</h1>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.color} text-white uppercase tracking-widest`}>{theme.label}</span>
           </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <div className="lg:col-span-2 space-y-6">
              
              {/* SELECTOR TIPO */}
              <div className="bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
                 <div className="grid grid-cols-5 gap-2">
                    {Object.keys(typeConfig).map(t => (
                       <label key={t} className={`p-3 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border ${type === t ? `${typeConfig[t].color} border-transparent scale-105 shadow-lg` : 'border-gray-700 bg-gray-800 opacity-50 hover:opacity-100'}`}>
                          <input type="radio" value={t} {...register('property_type')} className="hidden"/> 
                          {typeConfig[t].icon} <span className="text-[10px] font-bold uppercase">{t}</span>
                       </label>
                    ))}
                 </div>
              </div>

              {/* TÍTULO Y DESCRIPCIÓN */}
              <div className="bg-[#0f172a] p-6 rounded-2xl border border-gray-800">
                 <div className="mb-4">
                    <label className="text-xs font-bold text-gray-400 block mb-1">TÍTULO ANUNCIO</label>
                    <input {...register('title')} placeholder="Ej: Espectacular Casa en Santa Ana" className="w-full bg-black/30 border border-gray-700 p-3 rounded text-lg font-bold text-white"/>
                 </div>
                 <div className="relative">
                    <label className="text-xs font-bold text-gray-400 block mb-1">DESCRIPCIÓN</label>
                    <textarea {...register('description')} placeholder="Detalles..." className="w-full bg-black/30 border border-gray-700 p-3 rounded h-32 text-sm text-gray-300"></textarea>
                    <button type="button" onClick={generateAIDescription} className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg transition-all"><Wand2 size={12}/> IA</button>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <input {...register('address_visible')} placeholder="Barrio Visible" className="bg-black/30 border border-gray-700 p-2 rounded text-white"/>
                    <select {...register('estrato')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Estrato...</option><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>Rural</option></select>
                 </div>
              </div>

              {/* FINANCIERO */}
              <div className="bg-[#0f2e1d] border border-green-900/50 p-6 rounded-2xl">
                 <h3 className="text-green-500 font-bold uppercase mb-4 flex items-center gap-2"><DollarSign size={18}/> Financiero</h3>
                 <div className="grid grid-cols-3 gap-4 mb-4">
                    <div><label className="text-[9px] text-green-400 font-bold">PRECIO COP</label><input {...register('price_cop')} type="number" className="w-full bg-black/30 border border-green-800 p-2 rounded text-white"/></div>
                    <div><label className="text-[9px] text-green-400 font-bold">AVALÚO</label><input {...register('appraisal_price')} type="number" className="w-full bg-black/30 border border-green-800 p-2 rounded text-white"/></div>
                    {/* Campos condicionales Admin/Predial */}
                    {['Apartamento','Casa'].includes(type) && <div><label className="text-[9px] text-green-400 font-bold">ADMON</label><input {...register('admin_price')} type="number" className="w-full bg-black/30 border border-green-800 p-2 rounded text-white"/></div>}
                 </div>
                 {type === 'Casa' && (
                    <div className="bg-black/20 p-3 rounded border border-green-800/30">
                       <label className="flex items-center gap-2 text-xs font-bold text-white mb-2 cursor-pointer w-fit"><input type="checkbox" {...register('is_gated')} className="accent-green-500 w-4 h-4"/> ¿ES CONJUNTO / INTERIOR?</label>
                       {isGated && (
                          <div className="animate-in slide-in-from-top-2">
                             <div className="mb-2"><label className="text-[9px] text-green-400 font-bold">VALOR ADMINISTRACIÓN</label><input {...register('admin_price')} type="number" className="w-full bg-black/30 border border-green-800 p-2 rounded text-white"/></div>
                             <p className="text-[9px] text-green-400 font-bold mb-1">ZONAS COMUNES</p>
                             <div className="grid grid-cols-3 gap-2 text-gray-300 text-[10px]">
                                {['Vigilancia 24h','Salón Comunal','Gimnasio','Piscina','Canchas','Parque Niños','Zonas Verdes'].map(opt => (
                                   <label key={opt} className="flex items-center gap-1"><input type="checkbox" {...register(`common_areas.${opt}`)}/> {opt}</label>
                                ))}
                             </div>
                          </div>
                       )}
                    </div>
                 )}
              </div>

              {/* 3. FORMATO CASA (CON ICONOS) */}
              {type === 'Casa' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-green-600 space-y-6">
                    <h3 className="text-green-500 font-bold uppercase flex items-center gap-2"><Home size={18}/> Detalles Casa</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                       <IconInput icon={Maximize} {...register('area_lot')} placeholder="Lote m²" />
                       <IconInput icon={Layout} {...register('area_built')} placeholder="Construida" />
                       <IconInput icon={Layout} {...register('area_private')} placeholder="Privada" />
                       <IconInput icon={ArrowLeftRight} {...register('front')} placeholder="Frente" />
                       <IconInput icon={ArrowUpDown} {...register('depth')} placeholder="Fondo" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <IconInput icon={Bed} {...register('habs')} placeholder="Habs" />
                       <IconInput icon={Bath} {...register('baths')} placeholder="Baños" />
                       <div className="relative">
                          <Car size={14} className="absolute left-3 top-3.5 text-gray-500"/>
                          <select {...register('parking_type')} className="w-full bg-black/30 border border-gray-700 p-2 pl-9 rounded text-xs text-white"><option>Garaje...</option><option>Cubierto</option><option>Descubierto</option><option>En Línea</option><option>Independiente</option></select>
                       </div>
                       <div className="relative">
                          <Flame size={14} className="absolute left-3 top-3.5 text-gray-500"/>
                          <select {...register('gas_type')} className="w-full bg-black/30 border border-gray-700 p-2 pl-9 rounded text-xs text-white"><option>Gas...</option><option>Natural</option><option>Propano</option></select>
                       </div>
                    </div>

                    {/* DETALLES INTERIORES */}
                    <div className="grid grid-cols-3 gap-4 text-xs">
                       <select {...register('kitchen_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Cocina...</option><option>Integral</option><option>Americana</option><option>Abierta</option><option>Isla</option></select>
                       <select {...register('dining_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Comedor...</option><option>Independiente</option><option>Un solo espacio</option></select>
                       <select {...register('floor_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Pisos...</option><option>Madera Laminada</option><option>Madera Granadillo</option><option>Cerámica</option><option>Mármol</option></select>
                    </div>

                    {/* EXTRAS */}
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 border-t border-gray-800 pt-4">
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('fireplace')}/> Chimenea</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Balcón')}/> Balcón</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Terraza')}/> Terraza</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Jardín')}/> Jardín</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Patio')}/> Patio</label>
                    </div>

                    {/* NIVELES */}
                    <div className="bg-black/20 p-4 rounded-xl border border-gray-800">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-bold text-gray-400">DISTRIBUCIÓN POR NIVELES</span>
                          <div className="flex gap-2">
                             <button type="button" onClick={removeLevel} className="text-red-500 hover:text-white"><Trash2 size={14}/></button>
                             <button type="button" onClick={addLevel} className="text-green-500 hover:text-white"><PlusCircle size={14}/></button>
                          </div>
                       </div>
                       {levels.map((lvl, i) => (
                          <div key={i} className="mb-3 p-3 bg-black/40 rounded border border-gray-700">
                             <span className="text-[10px] font-bold text-green-500 block mb-2">NIVEL {i+1}</span>
                             <textarea {...register(`level_${i+1}_desc`)} placeholder="Descripción del nivel..." className="w-full bg-transparent border-b border-gray-600 p-1 text-xs mb-2 h-10 text-white"/>
                             <div className="flex flex-wrap gap-2 text-[10px] text-gray-400">
                                {['Baño','Habitación','Cocina','Estudio','Hall','Balcón'].map(opt => (
                                   <label key={opt}><input type="checkbox" {...register(`level_${i+1}_opts.${opt}`)}/> {opt}</label>
                                ))}
                             </div>
                          </div>
                       ))}
                    </div>

                    {/* RENTAS */}
                    <div className="bg-blue-900/10 border border-blue-800/30 p-4 rounded-xl">
                       <label className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2 cursor-pointer w-fit"><input type="checkbox" {...register('has_independent_units')} className="accent-blue-500"/> ¿TIENE RENTA (APTO/LOCAL)?</label>
                       {hasIndepUnits && (
                          <div className="grid grid-cols-2 gap-2 animate-in fade-in">
                             <div className="bg-black/30 p-2 rounded">
                                <span className="text-[9px] text-blue-300 block mb-1">LOCALES</span>
                                <textarea {...register('locales_detail')} placeholder="Área, baño, renta..." className="w-full bg-transparent text-xs h-12 outline-none text-white"/>
                             </div>
                             <div className="bg-black/30 p-2 rounded">
                                <span className="text-[9px] text-blue-300 block mb-1">APTS INDEPENDIENTES</span>
                                <textarea {...register('apts_detail')} placeholder="Habs, cocina, estado..." className="w-full bg-transparent text-xs h-12 outline-none text-white"/>
                             </div>
                          </div>
                       )}
                    </div>
                 </div>
              )}

              {/* OTROS FORMATOS (Placeholders) */}
              {type !== 'Casa' && (
                 <div className="bg-gray-800 p-6 rounded-2xl text-center text-gray-400">
                    <p>Formato detallado para {type} disponible pronto.</p>
                 </div>
              )}

              {/* GALERÍA DRAG & DROP */}
              <div className="bg-black/20 p-6 rounded-2xl border border-dashed border-gray-700">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-400 flex items-center gap-2"><Upload size={16}/> GALERÍA FOTOGRÁFICA</h3>
                    <label className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-xs font-bold uppercase flex items-center gap-2">
                       <PlusCircle size={14}/> Cargar Fotos
                       <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden"/>
                    </label>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {gallery.map((src, i) => (
                       <div 
                          key={i}
                          draggable
                          onDragStart={(e) => handleDragStart(e, i)}
                          onDragEnter={(e) => { e.preventDefault(); dragOverItem.current = i; }} // FIX: Prevent default here
                          onDragEnd={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                          className={`relative aspect-square rounded-lg overflow-hidden group cursor-move border-2 transition-all ${i===0 ? 'border-yellow-500 ring-2 ring-yellow-500/20' : 'border-gray-700'}`}
                       >
                          <img src={src} className="w-full h-full object-cover pointer-events-none"/>
                          <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={10}/></button>
                          <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm text-[8px] text-center text-white py-1 font-bold uppercase">
                             {i === 0 ? <span className="text-yellow-400 flex items-center justify-center gap-1">★ PORTADA</span> : `FOTO ${i+1}`}
                          </div>
                       </div>
                    ))}
                    {gallery.length === 0 && <div className="col-span-full text-center py-8 text-gray-600 text-xs">Arrastra fotos aquí o usa el botón agregar.</div>}
                 </div>
              </div>
           </div>

           {/* COLUMNA PRIVADA */}
           <div className="bg-red-900/10 p-6 rounded-2xl border border-red-900/30 h-fit space-y-4 sticky top-8">
              <h3 className="text-red-500 font-bold uppercase mb-4 flex items-center gap-2"><ShieldCheck size={18}/> Datos Privados</h3>
              <input {...register('owner_name')} placeholder="Propietario" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-2 text-white"/>
              <input {...register('owner_phone')} placeholder="Teléfono" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-2 text-white"/>
              <input {...register('owner_email')} placeholder="Email" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-2 text-white"/>
              <input {...register('real_address')} placeholder="Dirección Exacta" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-4 text-white"/>
              
              <div className="pt-4 border-t border-red-900/30">
                 <p className="text-[10px] font-bold text-red-400 mb-2">LEGAL</p>
                 <div className="grid grid-cols-2 gap-2">
                    {['mortgage', 'affectation', 'family_patrimony', 'succession'].map(f => (
                       <label key={f} className="flex items-center gap-2 text-[10px] font-bold text-red-300 uppercase cursor-pointer"><input type="checkbox" {...register(f)} className="accent-red-500"/> {f.replace('_',' ')}</label>
                    ))}
                 </div>
              </div>

              <button disabled={loading} className="w-full mt-6 py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105">
                 <Save size={20}/> {loading ? 'Guardando...' : 'Publicar'}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};
export default CreateProperty;