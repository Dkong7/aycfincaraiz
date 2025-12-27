import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { MapPin, DollarSign, Layout, ArrowLeft, CheckCircle, Maximize, Bed, Bath, Car, FileText, ChefHat, Layers, ShieldCheck, Home } from 'lucide-react';
import NavbarCustom from '../components/layout/NavbarCustom';
import FooterCustom from '../components/layout/FooterCustom';
import { useTRM } from '../hooks/useTRM';

const PropertyDetail = () => {
  const { id } = useParams();
  const trm = useTRM();
  const [prop, setProp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchProp = async () => {
      setLoading(true);
      let query = supabase.from('properties').select('*');
      if (id.toString().toUpperCase().includes('AYC')) query = query.eq('ayc_id', id);
      else query = query.eq('id', id);
      const { data } = await query.single();
      if(data) setProp(data);
      setLoading(false);
    };
    fetchProp();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white font-bold">CARGANDO...</div>;
  if (!prop) return <div className="min-h-screen pt-32 text-center">No encontrado.</div>;

  const allImages = [prop.main_media_url, ...(prop.gallery_images || [])].filter(Boolean);

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-sans">
      <NavbarCustom />
      
      {/* HEADER */}
      <div className="relative h-[70vh] bg-gray-900 group">
         <img src={allImages[activeImg]} className="w-full h-full object-cover transition-opacity duration-500 opacity-90" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 text-white max-w-7xl mx-auto pt-32">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded mb-4 text-xs font-black uppercase tracking-widest bg-[#009B4D]">
               <Home size={12}/> {prop.property_type}
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase leading-none mb-4 drop-shadow-xl">{prop.title || prop.address_visible}</h1>
            <div className="flex items-center gap-4 text-xl font-medium mb-6">
               <span className="flex items-center gap-1"><MapPin size={20} className="text-[#009B4D]"/> {prop.address_visible}</span>
               <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-mono border border-white/30">{prop.ayc_id}</span>
            </div>
            <div className="flex gap-8 items-end">
               <div>
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">PRECIO VENTA</p>
                  <div className="text-5xl font-black text-[#009B4D]">${new Intl.NumberFormat('es-CO', { notation: "compact" }).format(prop.price_cop)}</div>
               </div>
               {prop.admin_price > 0 && (
                  <div>
                     <p className="text-xs text-gray-400 font-bold uppercase mb-1">ADMINISTRACIÓN</p>
                     <div className="text-2xl font-bold text-white">${new Intl.NumberFormat('es-CO').format(prop.admin_price)}</div>
                  </div>
               )}
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-10">
            
            {/* ICONOS RESUMEN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-4 gap-4 text-center">
               <div><Maximize className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xl">{prop.area_built || prop.area_lot}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Metros²</span></div>
               {prop.habs && <div><Bed className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xl">{prop.habs}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Habs</span></div>}
               {prop.baths && <div><Bath className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xl">{prop.baths}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Baños</span></div>}
               {prop.parking_type && <div><Car className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xs uppercase pt-2 leading-tight">{prop.parking_type}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Garaje</span></div>}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-4">Descripción</h3>
               <p className="text-gray-600 whitespace-pre-line leading-relaxed">{prop.description}</p>
            </div>

            {/* FICHA TÉCNICA (CASA DETALLADA) */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-6 flex items-center gap-2"><Layout size={20}/> Ficha Técnica</h3>
               
               {/* Dimensiones */}
               <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 border-b pb-1">Dimensiones</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                     {prop.area_lot && <div><span className="text-gray-500 block text-xs">Lote</span> <span className="font-bold">{prop.area_lot} m²</span></div>}
                     {prop.area_built && <div><span className="text-gray-500 block text-xs">Construida</span> <span className="font-bold">{prop.area_built} m²</span></div>}
                     {prop.front && <div><span className="text-gray-500 block text-xs">Frente</span> <span className="font-bold">{prop.front} m</span></div>}
                     {prop.depth && <div><span className="text-gray-500 block text-xs">Fondo</span> <span className="font-bold">{prop.depth} m</span></div>}
                  </div>
               </div>

               {/* Detalles Interior */}
               <div className="mb-6">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 border-b pb-1">Interior</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                     {prop.kitchen_type && <div className="flex items-center gap-2"><ChefHat size={16} className="text-[#009B4D]"/> <span>Cocina {prop.kitchen_type}</span></div>}
                     {prop.dining_type && <div className="flex items-center gap-2"><Layout size={16} className="text-[#009B4D]"/> <span>Comedor {prop.dining_type}</span></div>}
                     {prop.fireplace && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#009B4D]"/> <span>Chimenea</span></div>}
                     {prop.gas_type && <div className="flex items-center gap-2"><CheckCircle size={16} className="text-[#009B4D]"/> <span>Gas {prop.gas_type}</span></div>}
                  </div>
               </div>

               {/* Zonas Comunes (Si es conjunto) */}
               {prop.is_gated && prop.common_areas && (
                  <div className="mb-6">
                     <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 border-b pb-1">Conjunto Cerrado / Zonas Comunes</h4>
                     <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.keys(prop.common_areas).map(area => prop.common_areas[area] && (
                           <div key={area} className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#009B4D]"/> {area}</div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Niveles (Loop) */}
               {prop.specs?.levels_data && prop.specs.levels_data.length > 0 && (
                  <div>
                     <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 border-b pb-1">Distribución por Niveles</h4>
                     <div className="space-y-3">
                        {prop.specs.levels_data.map((lvl, i) => (
                           <div key={i} className="bg-gray-50 p-3 rounded-lg text-sm">
                              <span className="font-bold text-[#009B4D] text-xs uppercase block mb-1">Nivel {lvl.level}</span>
                              <p className="text-gray-600">{lvl.desc}</p>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </div>

            {/* GALERÍA */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {allImages.map((img, i) => (
                  <div key={i} onClick={() => { setActiveImg(i); window.scrollTo({top:0, behavior:'smooth'}); }} className="aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                     <img src={img} className="w-full h-full object-cover"/>
                  </div>
               ))}
            </div>
         </div>

         {/* SIDEBAR */}
         <div className="bg-[#0A192F] text-white p-8 rounded-2xl h-fit sticky top-24 shadow-2xl">
            <h3 className="font-bold text-xl mb-4 text-center">Contáctanos</h3>
            <p className="text-center text-sm text-gray-400 mb-6">Referencia: <span className="font-mono text-white">{prop.ayc_id}</span></p>
            <button className="w-full bg-[#25D366] text-white font-bold py-3 rounded-xl mb-3 hover:brightness-110 transition-all">WhatsApp Agente</button>
            <Link to="/contacto" className="block w-full bg-white text-[#0A192F] font-bold py-3 rounded-xl text-center hover:bg-gray-200 transition-all">Agendar Visita</Link>
         </div>
      </div>
      <FooterCustom />
    </div>
  );
};
export default PropertyDetail;