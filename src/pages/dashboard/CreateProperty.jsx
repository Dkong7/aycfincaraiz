import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { 
  DollarSign, ShieldCheck, ArrowLeft, PlusCircle, Trash2, Save, Layout, Home, 
  Building2, Warehouse, Mountain, Map, Upload, X, Wand2, Star, GripVertical, 
  CheckSquare, Maximize, Bed, Bath, Car, ArrowLeftRight, ArrowUpDown, Flame, 
  Briefcase, ArrowUp, Calendar, ChefHat, Eye, Layers, Zap, DoorOpen, Droplets, 
  Siren, Factory, TreePine, Store, Monitor, ShoppingBag, Coffee, Wifi
} from 'lucide-react';
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
  
  // WATCHERS
  const type = watch('property_type');
  const priceCOP = watch('price_cop');
  // Logica Condicional
  const isGated = watch('is_gated'); 
  const hasIndepUnits = watch('has_independent_units'); 
  const isDuplex = watch('is_duplex'); 
  const hasBalcony = watch('has_balcony');
  const hasOffices = watch('has_offices'); 
  const inShoppingCenter = watch('in_shopping_center'); // Local
  
  const [loading, setLoading] = useState(false);
  const [levels, setLevels] = useState([{ id: 1 }]);
  const [gallery, setGallery] = useState([]);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [modal, setModal] = useState({ open: false, config: {} });
  
  const trm = useTRM();
  const navigate = useNavigate();

  // --- UTILS ---
  const addLevel = () => setLevels(prev => [...prev, { id: prev.length + 1 }]);
  const removeLevel = () => setLevels(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  const sanitizeNum = (val) => (val === '' || val === null || isNaN(val)) ? null : parseFloat(val);

  const IconInput = ({ icon: Icon, ...props }) => (
    <div className="relative w-full">
       <Icon size={14} className="absolute left-3 top-3 text-gray-500"/>
       <input {...props} className="w-full bg-black/30 border border-gray-700 p-2 pl-9 rounded text-xs focus:border-white/50 outline-none transition-colors text-white placeholder-gray-500" />
    </div>
  );

  // --- FOTOS ---
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

  // --- INIT ---
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

  const generateAIDescription = () => {
     const val = getValues();
     const txt = `Excelente ${val.property_type} en ${val.address_visible}. Oportunidad de inversión.`;
     setValue('description', txt);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setModal({ open: true, config: { type: 'loading', title: 'Guardando...', theme: 'blue' } });

    try {
        const specs = {
            levels_data: levels.map((l, i) => ({ level: i+1, desc: data[`level_${i+1}_desc`], opts: data[`level_${i+1}_opts`] })),
            amenities: data.amenities, infra: data.infra, common_areas: data.common_areas,
            ...data
        };

        const payload = {
            title: data.title, listing_type: 'Venta', property_type: data.property_type,
            price_cop: sanitizeNum(data.price_cop), price_usd: sanitizeNum(data.price_cop) ? (sanitizeNum(data.price_cop) / trm).toFixed(0) : 0,
            address_visible: data.address_visible, real_address: data.real_address,
            description: data.description, owner_name: data.owner_name, owner_phone: data.owner_phone, owner_email: data.owner_email,
            
            // Financiero & Legal
            admin_price: sanitizeNum(data.admin_price), appraisal_price: sanitizeNum(data.appraisal_price),
            tax_price: sanitizeNum(data.tax_price), rent_value: sanitizeNum(data.rent_value),
            mortgage: data.mortgage, affectation: data.affectation, family_patrimony: data.family_patrimony, succession: data.succession,
            
            // Dimensiones
            area_lot: sanitizeNum(data.area_lot), area_built: sanitizeNum(data.area_built), 
            area_private: sanitizeNum(data.area_private), front: sanitizeNum(data.front), depth: sanitizeNum(data.depth),
            balcony_area: hasBalcony ? sanitizeNum(data.balcony_area) : 0,

            // Detalles
            habs: sanitizeNum(data.habs), baths: sanitizeNum(data.baths), parking_type: data.parking_type,
            gas_type: data.gas_type, floor_type: data.floor_type, kitchen_type: data.kitchen_type, dining_type: data.dining_type,
            bathrooms_type: data.bathrooms_type, // Oficina
            
            // Bools & Checks
            fireplace: data.fireplace, is_gated: data.is_gated, has_independent_units: data.has_independent_units,
            independent_units_details: data.independent_units_details, common_areas: data.common_areas,
            is_duplex: data.is_duplex, duplex_details: data.duplex_details, has_balcony: data.has_balcony,
            has_elevator: data.has_elevator, is_remodeled: data.is_remodeled,
            view_type: data.view_type, view_details: data.view_details,
            
            // Industrial
            height: sanitizeNum(data.height), energy_type: data.energy_type, floor_resistance: data.floor_resistance,
            entrance_count: sanitizeNum(data.entrance_count), gate_type: data.gate_type,
            office_area: sanitizeNum(data.office_area), office_details: data.office_details,
            locals_count: sanitizeNum(data.locals_count), locals_income: sanitizeNum(data.locals_income),
            warehouse_type: data.warehouse_type, has_truck_access: data.has_truck_access,
            has_water_tank: data.has_water_tank, has_sprinklers: data.has_sprinklers, has_fire_alarm: data.has_fire_alarm,
            has_smoke_detectors: data.has_smoke_detectors, has_power_plant: data.has_power_plant, security_24h: data.security_24h,
            zona_franca: data.zona_franca, dock: data.dock, has_offices: data.has_offices,

            // Casa Campo
            topography: data.topography, water_source: data.water_source, area_lot_ha: sanitizeNum(data.area_lot_ha),
            fencing: data.fencing, access_type: data.access_type,
            vereda: data.vereda, property_name: data.property_name,

            // Local & Oficina (Nuevos)
            in_shopping_center: data.in_shopping_center, showcase_front: sanitizeNum(data.showcase_front),
            has_network: data.has_network, has_cafeteria: data.has_cafeteria, meeting_room: data.meeting_room,
            
            // Privados nuevos
            building_name: data.building_name, unit_number: data.unit_number,
            floor_number: sanitizeNum(data.floor_number), building_age: sanitizeNum(data.building_age), 
            
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
    Lote: { color: 'bg-gray-500', border: 'border-gray-500', icon: <Map/>, label: 'Terreno' },
    Local: { color: 'bg-pink-600', border: 'border-pink-600', icon: <Store/>, label: 'Comercial' },
    Oficina: { color: 'bg-lime-600', border: 'border-lime-600', icon: <Briefcase/>, label: 'Corporativo' }
  };
  const theme = typeConfig[type] || typeConfig['Casa'];

  return (
    <div className="min-h-screen bg-[#050b14] text-white p-8 font-sans">
      <SmartModal isOpen={modal.open} onClose={() => setModal({...modal, open: false})} config={modal.config} />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
           <Link to="/dashboard/inventario" className="flex items-center gap-2 text-gray-400 hover:text-white"><ArrowLeft/> Volver</Link>
           <div className="text-right">
              <h1 className="text-3xl font-black uppercase">{id ? 'Editar' : 'Nuevo'} Inmueble</h1>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${theme.color} text-white uppercase tracking-widest`}>{theme.label}</span>
           </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <div className="lg:col-span-2 space-y-6">
              
              {/* TIPO */}
              <div className="bg-[#0f172a] p-4 rounded-2xl border border-gray-800">
                 <div className="grid grid-cols-7 gap-2">
                    {Object.keys(typeConfig).map(t => (
                       <label key={t} className={`p-2 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all border ${type === t ? `${typeConfig[t].color} border-transparent scale-105 shadow-lg` : 'border-gray-700 bg-gray-800 opacity-50 hover:opacity-100'}`}>
                          <input type="radio" value={t} {...register('property_type')} className="hidden"/> 
                          {typeConfig[t].icon} <span className="text-[8px] font-bold uppercase">{t}</span>
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
                    <button type="button" onClick={generateAIDescription} className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg transition-all"><Wand2 size={12}/> IA</button>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <input {...register('address_visible')} placeholder="Barrio / Zona Visible" className="bg-black/30 border border-gray-700 p-2 rounded text-white"/>
                    <select {...register('estrato')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Estrato...</option><option>Industrial</option><option>Comercial</option><option>3</option><option>4</option><option>5</option><option>6</option><option>Rural</option></select>
                 </div>
              </div>

              {/* FINANCIERO */}
              <div className="bg-[#0f2e1d] border border-green-900/50 p-6 rounded-2xl">
                 <h3 className="text-green-500 font-bold uppercase mb-4 flex items-center gap-2"><DollarSign size={18}/> Financiero</h3>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><label className="text-[9px] text-green-400 font-bold">PRECIO COP</label><input {...register('price_cop')} type="number" className="w-full bg-black/30 border border-green-800 p-2 rounded text-white font-mono"/></div>
                    <div><label className="text-[9px] text-green-400 font-bold">USD (TRM {trm})</label><div className="w-full bg-black/30 border border-green-800/50 p-2 rounded text-gray-400 font-mono text-sm">${priceCOP ? new Intl.NumberFormat('en-US').format((priceCOP/trm).toFixed(0)) : '0'}</div></div>
                    <div><label className="text-[9px] text-green-400 font-bold">AVALÚO</label><input {...register('appraisal_price')} type="number" className="w-full bg-black/30 border border-green-800 p-2 rounded text-white"/></div>
                    {['Casa','Apartamento','Local','Oficina'].includes(type) && <div><label className="text-[9px] text-green-400 font-bold">ADMON</label><input {...register('admin_price')} type="number" className="w-full bg-black/30 border border-green-800 p-2 rounded text-white"/></div>}
                 </div>
              </div>

              {/* ==================== FORMATOS MUTABLES ==================== */}
              
              {/* 1. CASA */}
              {type === 'Casa' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-green-600 space-y-6 animate-in fade-in">
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
                       <select {...register('parking_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Garaje...</option><option>Cubierto</option><option>Descubierto</option><option>En Línea</option></select>
                       <select {...register('gas_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Gas...</option><option>Natural</option><option>Propano</option></select>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs">
                       <select {...register('kitchen_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Cocina...</option><option>Integral</option><option>Americana</option><option>Abierta</option></select>
                       <select {...register('dining_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Comedor...</option><option>Independiente</option><option>Un solo espacio</option></select>
                       <select {...register('floor_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Pisos...</option><option>Madera Laminada</option><option>Madera Natural</option><option>Cerámica</option></select>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 border-t border-gray-800 pt-4">
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('fireplace')}/> Chimenea</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Balcón')}/> Balcón</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Terraza')}/> Terraza</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Jardín')}/> Jardín</label>
                       <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Patio')}/> Patio</label>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-gray-800">
                       <div className="flex justify-between items-center mb-4"><span className="text-xs font-bold text-gray-400">NIVELES</span><div className="flex gap-2"><button type="button" onClick={removeLevel} className="text-red-500"><Trash2 size={14}/></button><button type="button" onClick={addLevel} className="text-green-500"><PlusCircle size={14}/></button></div></div>
                       {levels.map((lvl, i) => (
                          <div key={i} className="mb-3 p-3 bg-black/40 rounded border border-gray-700">
                             <span className="text-[10px] font-bold text-green-500 block mb-2">NIVEL {i+1}</span>
                             <textarea {...register(`level_${i+1}_desc`)} placeholder="Descripción..." className="w-full bg-transparent border-b border-gray-600 p-1 text-xs mb-2 h-10 text-white"/>
                          </div>
                       ))}
                    </div>
                    <div className="bg-blue-900/10 border border-blue-800/30 p-4 rounded-xl">
                       <label className="flex items-center gap-2 text-xs font-bold text-blue-400 mb-2 cursor-pointer w-fit"><input type="checkbox" {...register('has_independent_units')} className="accent-blue-500"/> ¿TIENE RENTA (APTO/LOCAL)?</label>
                       {hasIndepUnits && (
                          <div className="grid grid-cols-2 gap-2 animate-in fade-in">
                             <div className="bg-black/30 p-2 rounded"><span className="text-[9px] text-blue-300 block mb-1">LOCALES</span><textarea {...register('locales_detail')} placeholder="Área, baño, renta..." className="w-full bg-transparent text-xs h-12 outline-none text-white"/></div>
                             <div className="bg-black/30 p-2 rounded"><span className="text-[9px] text-blue-300 block mb-1">APTS INDEPENDIENTES</span><textarea {...register('apts_detail')} placeholder="Habs, cocina, estado..." className="w-full bg-transparent text-xs h-12 outline-none text-white"/></div>
                          </div>
                       )}
                    </div>
                 </div>
              )}

              {/* 2. APARTAMENTO */}
              {type === 'Apartamento' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-blue-600 space-y-6 animate-in fade-in">
                    <h3 className="text-blue-500 font-bold uppercase flex items-center gap-2"><Building2 size={18}/> Detalles Apartamento</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <IconInput icon={Layout} {...register('area_built')} placeholder="Área m²" />
                       <IconInput icon={ArrowUp} {...register('floor_number')} placeholder="Piso N°" />
                       <IconInput icon={Calendar} {...register('building_age')} placeholder="Antigüedad" />
                       <IconInput icon={Building2} {...register('height')} placeholder="Total Pisos Ed." />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <IconInput icon={Bed} {...register('habs')} placeholder="Habs" />
                       <IconInput icon={Bath} {...register('baths')} placeholder="Baños" />
                       <select {...register('parking_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Garaje...</option><option>Cubierto</option><option>En Línea</option><option>Independiente</option></select>
                       <select {...register('gas_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Gas...</option><option>Natural</option><option>Propano</option></select>
                    </div>
                    <div className="flex items-center gap-4 bg-blue-900/10 p-3 rounded border border-blue-800/30">
                       <label className="flex items-center gap-2 text-xs font-bold text-blue-300 cursor-pointer"><input type="checkbox" {...register('has_balcony')} className="accent-blue-500"/> BALCÓN / TERRAZA</label>
                       {hasBalcony && <IconInput icon={Maximize} {...register('balcony_area')} placeholder="Área m²" />}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-3 rounded"><span className="text-[10px] text-gray-400 block mb-2 font-bold">VISTA</span><div className="flex gap-2 mb-2"><label className="text-xs text-white"><input type="radio" value="Exterior" {...register('view_type')}/> Ext</label><label className="text-xs text-white"><input type="radio" value="Interior" {...register('view_type')}/> Int</label></div><input {...register('view_details')} placeholder="¿Hacia dónde mira?" className="w-full bg-black/40 border-b border-gray-600 p-1 text-xs text-white"/></div>
                        <div className="bg-black/20 p-3 rounded"><label className="flex items-center gap-2 text-xs font-bold text-blue-300 cursor-pointer mb-2"><input type="checkbox" {...register('is_duplex')} className="accent-blue-500"/> ¿ES DUPLEX?</label>{isDuplex && <textarea {...register('duplex_details')} placeholder="Distribución niveles..." className="w-full bg-black/40 border-b border-gray-600 p-1 text-xs text-white h-12"/>}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                       <select {...register('kitchen_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Cocina...</option><option>Integral</option><option>Americana</option><option>Abierta</option><option>Cerrada</option></select>
                       <select {...register('dining_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Comedor...</option><option>Independiente</option><option>Un solo espacio</option></select>
                       <select {...register('floor_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Pisos...</option><option>Madera Laminada</option><option>Madera Natural</option><option>Cerámica</option></select>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-gray-800">
                       <div className="flex flex-wrap gap-4 mb-4 text-xs font-bold text-blue-300">
                          <label className="flex items-center gap-1"><input type="checkbox" {...register('has_elevator')}/> ASCENSOR</label>
                          <label className="flex items-center gap-1"><input type="checkbox" {...register('is_remodeled')}/> REMODELADO</label>
                          <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.Estudio')}/> ESTUDIO</label>
                          <label className="flex items-center gap-1"><input type="checkbox" {...register('amenities.CBS')}/> CBS</label>
                       </div>
                       <p className="text-[9px] text-gray-500 font-bold mb-2 uppercase">ZONAS COMUNES EDIFICIO</p>
                       <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-300">
                          {['Vigilancia 24h','Salón Comunal','Gimnasio','Piscina','Canchas Squash','Parque Niños','Terraza BBQ','Planta Eléctrica','Caldera'].map(opt => (<label key={opt} className="flex items-center gap-1"><input type="checkbox" {...register(`common_areas.${opt}`)}/> {opt}</label>))}
                       </div>
                    </div>
                 </div>
              )}

              {/* 3. BODEGA */}
              {type === 'Bodega' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-yellow-600 space-y-6 animate-in fade-in">
                    <h3 className="text-yellow-500 font-bold uppercase flex items-center gap-2"><Factory size={18}/> Especificaciones Industriales</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <IconInput icon={Layout} {...register('area_built')} placeholder="Área Total m²" />
                       <IconInput icon={Maximize} {...register('area_private')} placeholder="Área Libre m²" />
                       <IconInput icon={ArrowLeftRight} {...register('front')} placeholder="Frente (m)" />
                       <IconInput icon={ArrowUpDown} {...register('depth')} placeholder="Fondo (m)" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <IconInput icon={ArrowUp} {...register('height')} placeholder="Altura (m)" />
                       <IconInput icon={Zap} {...register('energy_type')} placeholder="Energía (KVA)" />
                       <IconInput icon={Layers} {...register('floor_resistance')} placeholder="Resistencia Piso" />
                       <IconInput icon={DoorOpen} {...register('entrance_count')} placeholder="# Entradas" />
                    </div>
                    <div className="grid grid-cols-3 gap-3 text-xs">
                       <select {...register('gate_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Tipo Portón...</option><option>Corredizo</option><option>Levadizo</option><option>Abatible</option></select>
                       <select {...register('warehouse_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Ubicación...</option><option>Parque Industrial</option><option>Zona Franca</option><option>Exterior</option></select>
                       <select {...register('floor_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-white"><option>Piso...</option><option>Concreto Alta Res.</option><option>Epóxico</option></select>
                    </div>
                    <div className="bg-yellow-900/10 border border-yellow-800/30 p-4 rounded-xl">
                       <div className="flex gap-6 mb-3">
                          <label className="flex items-center gap-2 text-xs font-bold text-yellow-400 cursor-pointer"><input type="checkbox" {...register('has_offices')} className="accent-yellow-500"/> TIENE OFICINAS</label>
                          <label className="flex items-center gap-2 text-xs font-bold text-yellow-400 cursor-pointer"><input type="checkbox" {...register('has_truck_access')} className="accent-yellow-500"/> TRACTOMULAS</label>
                       </div>
                       {hasOffices && (<div className="grid grid-cols-2 gap-2 mb-3 animate-in fade-in"><IconInput icon={Layout} {...register('office_area')} placeholder="Área Oficinas m²" /><input {...register('office_details')} placeholder="Detalle oficinas..." className="w-full bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"/></div>)}
                       <div className="pt-2 border-t border-yellow-800/30"><p className="text-[9px] text-yellow-500 font-bold mb-2">RENTABILIDAD / LOCALES</p><div className="grid grid-cols-2 gap-2"><IconInput icon={Briefcase} {...register('locals_count')} placeholder="# Locales" /><IconInput icon={DollarSign} {...register('locals_income')} placeholder="Valor Arriendo Locales" /></div></div>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-gray-800"><p className="text-[9px] text-gray-500 font-bold mb-2 uppercase flex items-center gap-2"><Siren size={12}/> SEGURIDAD INDUSTRIAL</p><div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] text-gray-300"><label className="flex items-center gap-2"><input type="checkbox" {...register('has_fire_alarm')} className="accent-red-500"/> ALARMA INCENDIO</label><label className="flex items-center gap-2"><input type="checkbox" {...register('has_smoke_detectors')} className="accent-gray-500"/> HUMO</label><label className="flex items-center gap-2"><input type="checkbox" {...register('has_sprinklers')} className="accent-blue-500"/> ROCIADORES</label><label className="flex items-center gap-2"><input type="checkbox" {...register('has_water_tank')} className="accent-blue-500"/> TANQUES AGUA</label><label className="flex items-center gap-2"><input type="checkbox" {...register('has_power_plant')} className="accent-yellow-500"/> PLANTA ELÉCTRICA</label><label className="flex items-center gap-2"><input type="checkbox" {...register('dock')} className="accent-yellow-500"/> MUELLE CARGA</label><label className="flex items-center gap-2"><input type="checkbox" {...register('security_24h')} className="accent-green-500"/> VIGILANCIA</label><label className="flex items-center gap-2"><input type="checkbox" {...register('zona_franca')} className="accent-purple-500"/> ZONA FRANCA</label></div></div>
                 </div>
              )}

              {/* 4. CASA CAMPO */}
              {type === 'CasaCampo' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-purple-600 space-y-6 animate-in fade-in">
                    <h3 className="text-purple-500 font-bold uppercase flex items-center gap-2"><Mountain size={18}/> Finca / Casa de Campo</h3>
                    <div className="bg-purple-900/10 border border-purple-800/30 p-4 rounded-xl">
                       <p className="text-[10px] text-purple-400 font-bold mb-3 uppercase">TERRENO & ACCESO</p>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <IconInput icon={Maximize} {...register('area_lot_ha')} placeholder="Hectáreas" />
                          <IconInput icon={Layout} {...register('area_built')} placeholder="Casa (m²)" />
                          <select {...register('topography')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Topografía...</option><option>Plano</option><option>Ondulado</option><option>Quebrado</option></select>
                          <select {...register('access_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Acceso...</option><option>Pavimentado</option><option>Destapado</option><option>Placa Huella</option></select>
                       </div>
                       <div className="grid grid-cols-2 mt-3 gap-3">
                          <select {...register('fencing')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Cerramiento...</option><option>Malla</option><option>Cerca Viva</option><option>Alambre</option><option>Muro</option></select>
                          <select {...register('water_source')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Agua...</option><option>Acueducto Veredal</option><option>Pozo Propio</option><option>Nacimiento</option></select>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <IconInput icon={Layers} {...register('levels')} placeholder="Niveles" />
                       <IconInput icon={Bed} {...register('habs')} placeholder="Habs" />
                       <IconInput icon={Bath} {...register('baths')} placeholder="Baños" />
                       <select {...register('gas_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Gas...</option><option>Pipeta</option><option>Red Natural</option></select>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-gray-800">
                       <p className="text-[9px] text-gray-500 font-bold mb-2 uppercase flex items-center gap-2"><TreePine size={12}/> AMENIDADES & RECURSOS</p>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] text-gray-300">
                          {['Piscina Privada','Jacuzzi','Kiosko','Zona BBQ','Casa Mayordomo','Caballerizas','Galpones','Frutales'].map(opt => (<label key={opt} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register(`amenities.${opt.replace(' ','')}`)} className="accent-purple-500"/> {opt.toUpperCase()}</label>))}
                       </div>
                    </div>
                 </div>
              )}

              {/* 5. LOCAL (NUEVO) */}
              {type === 'Local' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-pink-600 space-y-6 animate-in fade-in">
                    <h3 className="text-pink-500 font-bold uppercase flex items-center gap-2"><Store size={18}/> Local Comercial</h3>
                    <div className="grid grid-cols-3 gap-3">
                       <IconInput icon={Layout} {...register('area_built')} placeholder="Área Total m²" />
                       <IconInput icon={ArrowUp} {...register('floor_number')} placeholder="Piso / Nivel" />
                       <IconInput icon={Eye} {...register('showcase_front')} placeholder="Frente Vitrina (m)" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <IconInput icon={Bath} {...register('baths')} placeholder="Baños Privados" />
                        <select {...register('bathrooms_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Baños...</option><option>Privados</option><option>Comunales</option><option>Mixtos</option></select>
                    </div>
                    <div className="bg-pink-900/10 border border-pink-800/30 p-4 rounded-xl flex items-center gap-6">
                       <label className="flex items-center gap-2 text-xs font-bold text-pink-400 cursor-pointer"><input type="checkbox" {...register('in_shopping_center')} className="accent-pink-500"/> EN CENTRO COMERCIAL</label>
                       <label className="flex items-center gap-2 text-xs font-bold text-pink-400 cursor-pointer"><input type="checkbox" {...register('amenities.Mezanine')} className="accent-pink-500"/> MEZANINE</label>
                       <label className="flex items-center gap-2 text-xs font-bold text-pink-400 cursor-pointer"><input type="checkbox" {...register('amenities.Terraza')} className="accent-pink-500"/> TERRAZA</label>
                    </div>
                 </div>
              )}

              {/* 6. OFICINA (NUEVO) */}
              {type === 'Oficina' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-lime-600 space-y-6 animate-in fade-in">
                    <h3 className="text-lime-500 font-bold uppercase flex items-center gap-2"><Briefcase size={18}/> Oficina Corporativa</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                       <IconInput icon={Layout} {...register('area_built')} placeholder="Área m²" />
                       <IconInput icon={ArrowUp} {...register('floor_number')} placeholder="Piso" />
                       <IconInput icon={Car} {...register('parking_type')} placeholder="# Garajes" />
                       <select {...register('bathrooms_type')} className="bg-black/30 border border-gray-700 p-2 rounded text-xs text-white"><option>Baños...</option><option>Internos</option><option>En Piso</option></select>
                    </div>
                    <div className="bg-black/20 p-4 rounded-xl border border-gray-800">
                       <p className="text-[9px] text-gray-500 font-bold mb-2 uppercase flex items-center gap-2"><Wifi size={12}/> INFRAESTRUCTURA & REDES</p>
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px] text-gray-300">
                          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('has_network')} className="accent-lime-500"/> CABLEADO ESTRUCTURADO</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('meeting_room')} className="accent-lime-500"/> SALA DE JUNTAS</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('has_cafeteria')} className="accent-lime-500"/> COCINETA / CAFETERÍA</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('has_elevator')} className="accent-lime-500"/> ASCENSORES INTELIGENTES</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('has_power_plant')} className="accent-lime-500"/> PLANTA SUPLENCIA TOTAL</label>
                          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" {...register('security_24h')} className="accent-lime-500"/> RECEPCIÓN / TORNIQUETES</label>
                       </div>
                    </div>
                 </div>
              )}

              {/* 7. LOTE */}
              {type === 'Lote' && (
                 <div className="bg-[#0f172a] p-6 rounded-2xl border-l-4 border-gray-500 space-y-6 animate-in fade-in">
                    <h3 className="text-gray-400 font-bold uppercase flex items-center gap-2"><Map size={18}/> Lote / Terreno</h3>
                    <div className="grid grid-cols-2 gap-4">
                       <IconInput icon={Maximize} {...register('area_lot')} placeholder="Área Total m²" />
                       <IconInput icon={DollarSign} {...register('price_m2')} placeholder="Precio x m²" />
                    </div>
                    <select {...register('soil_use')} className="w-full bg-black/30 border border-gray-700 p-2 rounded text-xs text-gray-300"><option value="">Uso de Suelo...</option><option>Residencial</option><option>Comercial</option><option>Industrial</option><option>Agrícola</option></select>
                    <div className="grid grid-cols-2 gap-4">
                       <IconInput icon={Layers} {...register('occupation_index')} placeholder="Índice Ocupación" />
                       <IconInput icon={Building2} {...register('construction_index')} placeholder="Índice Construcción" />
                    </div>
                 </div>
              )}

              {/* GALERÍA DRAG & DROP */}
              <div className="bg-black/20 p-6 rounded-2xl border border-dashed border-gray-700">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-gray-400 flex items-center gap-2"><Upload size={16}/> GALERÍA FOTOGRÁFICA</h3>
                    <label className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded cursor-pointer text-xs font-bold uppercase flex items-center gap-2 transition-colors">
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
                          onDragEnter={(e) => { e.preventDefault(); dragOverItem.current = i; }} 
                          onDragEnd={handleDrop}
                          onDragOver={(e) => e.preventDefault()}
                          className={`relative aspect-square rounded-lg overflow-hidden group cursor-move border-2 transition-all ${i===0 ? 'border-yellow-500 ring-2 ring-yellow-500/20' : 'border-gray-700'}`}
                       >
                          <img src={src} className="w-full h-full object-cover pointer-events-none"/>
                          <button type="button" onClick={() => removePhoto(i)} className="absolute top-1 right-1 bg-red-500 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"><X size={10}/></button>
                          
                          {/* INDICADOR PORTADA */}
                          <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm text-[8px] text-center text-white py-1 font-bold uppercase">
                             {i === 0 ? <span className="text-yellow-400 flex items-center justify-center gap-1"><Star size={8} fill="currentColor"/> PORTADA</span> : `FOTO ${i+1}`}
                          </div>
                       </div>
                    ))}
                    {gallery.length === 0 && <div className="col-span-full text-center py-8 text-gray-600 text-xs">Arrastra fotos aquí o usa el botón agregar.</div>}
                 </div>
              </div>
           </div>

           {/* COLUMNA PRIVADA (DERECHA) */}
           <div className="bg-red-900/10 p-6 rounded-2xl border border-red-900/30 h-fit space-y-4 sticky top-8">
              <h3 className="text-red-500 font-bold uppercase mb-4 flex items-center gap-2"><ShieldCheck size={18}/> Datos Privados</h3>
              <input {...register('owner_name')} placeholder="Propietario" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-2 text-white"/>
              <input {...register('owner_phone')} placeholder="Teléfono" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-2 text-white"/>
              <input {...register('owner_email')} placeholder="Email" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-2 text-white"/>
              <input {...register('real_address')} placeholder="Dirección Exacta" className="w-full bg-black/30 border border-red-900/30 p-2 rounded mb-4 text-white"/>
              
              {/* PRIVADOS ESPECÍFICOS */}
              {(type === 'Apartamento' || isGated || type === 'Oficina') && (
                 <div className="bg-black/20 p-2 rounded border border-red-900/20">
                    <input {...register('building_name')} placeholder="Nombre Edificio / Conjunto" className="w-full bg-transparent border-b border-red-900/30 p-1 text-xs text-white mb-2"/>
                    <input {...register('unit_number')} placeholder="Apto / Bloque / Interior / Oficina" className="w-full bg-transparent border-b border-red-900/30 p-1 text-xs text-white"/>
                 </div>
              )}
              {type === 'CasaCampo' && (
                 <div className="bg-black/20 p-2 rounded border border-red-900/20">
                    <input {...register('property_name')} placeholder="Nombre de la Finca/Predio" className="w-full bg-transparent border-b border-red-900/30 p-1 text-xs text-white mb-2"/>
                    <input {...register('vereda')} placeholder="Vereda / Ubicación Rural" className="w-full bg-transparent border-b border-red-900/30 p-1 text-xs text-white"/>
                 </div>
              )}

              <div className="pt-4 border-t border-red-900/30">
                 <p className="text-[10px] font-bold text-red-400 mb-2">LEGAL (ESPAÑOL)</p>
                 <div className="grid grid-cols-2 gap-2">
                    {['Hipoteca', 'Afectación', 'Patrimonio', 'Sucesión'].map(f => (
                       <label key={f} className="flex items-center gap-2 text-[10px] font-bold text-red-300 uppercase cursor-pointer"><input type="checkbox" {...register(f.toLowerCase().replace('ó','o').replace('é','e'))} className="accent-red-500"/> {f}</label>
                    ))}
                 </div>
              </div>

              <button disabled={loading} className="w-full mt-6 py-4 bg-green-600 hover:bg-green-500 text-white font-black rounded-xl uppercase tracking-widest shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-105">
                 <Save size={20}/> {loading ? 'Guardando...' : (id ? 'Actualizar' : 'Publicar')}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};
export default CreateProperty;