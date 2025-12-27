import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  MapPin, DollarSign, Layout, ArrowLeft, CheckCircle, Maximize, Bed, Bath, Car, FileText, 
  ChefHat, Layers, ShieldCheck, Home, Mountain, Building2, Warehouse, TreePine, Zap, DoorOpen,
  Store, Briefcase, Wifi, Monitor, ShoppingBag, Coffee, Eye
} from 'lucide-react';
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
  
  // CONFIG VISUAL POR TIPO
  const typeConfig = {
     Casa: { icon: <Home/>, color: 'bg-green-600' },
     Apartamento: { icon: <Building2/>, color: 'bg-blue-600' },
     Bodega: { icon: <Warehouse/>, color: 'bg-yellow-600' },
     CasaCampo: { icon: <Mountain/>, color: 'bg-purple-600' },
     Lote: { icon: <Layout/>, color: 'bg-gray-500' },
     Local: { icon: <Store/>, color: 'bg-pink-600' },
     Oficina: { icon: <Briefcase/>, color: 'bg-lime-600' }
  };
  const theme = typeConfig[prop.property_type] || typeConfig['Casa'];

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-sans">
      <NavbarCustom />
      
      {/* HERO */}
      <div className="relative h-[70vh] bg-gray-900 group">
         <img src={allImages[activeImg]} className="w-full h-full object-cover transition-opacity duration-500 opacity-90" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 text-white max-w-7xl mx-auto pt-32">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded mb-4 text-xs font-black uppercase tracking-widest ${theme.color}`}>
               {theme.icon} {prop.property_type}
            </div>
            <h1 className="text-4xl md:text-7xl font-black uppercase leading-none mb-4 drop-shadow-xl">{prop.title || prop.address_visible}</h1>
            <div className="flex items-center gap-4 text-xl font-medium mb-6">
               <span className="flex items-center gap-1"><MapPin size={20} className="text-[#009B4D]"/> {prop.address_visible}</span>
               <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-mono border border-white/30">{prop.ayc_id}</span>
            </div>
            <div className="text-5xl font-black text-[#009B4D]">${new Intl.NumberFormat('es-CO', { notation: "compact" }).format(prop.price_cop)}</div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-2 space-y-10">
            
            {/* ICONOS RESUMEN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-4 gap-4 text-center">
               <div><Maximize className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xl">{prop.area_built || prop.area_lot || prop.area_lot_ha}</span> <span className="text-[10px] uppercase font-bold text-gray-400">{prop.property_type==='CasaCampo'?'Ha':'m²'}</span></div>
               
               {/* Condicionales según tipo */}
               {prop.habs > 0 && <div><Bed className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xl">{prop.habs}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Habs</span></div>}
               {prop.baths > 0 && <div><Bath className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xl">{prop.baths}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Baños</span></div>}
               {prop.parking_type && <div><Car className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xs uppercase pt-2 leading-tight">{prop.parking_type}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Garaje</span></div>}
               
               {/* Específicos Lote/Bodega */}
               {prop.property_type === 'Bodega' && <div><ArrowLeft className="mx-auto text-gray-400 mb-1 rotate-90"/> <span className="block font-black text-xl">{prop.height}m</span> <span className="text-[10px] uppercase font-bold text-gray-400">Altura</span></div>}
               {prop.property_type === 'Lote' && <div><Layout className="mx-auto text-gray-400 mb-1"/> <span className="block font-black text-xs pt-2">{prop.soil_use}</span> <span className="text-[10px] uppercase font-bold text-gray-400">Uso</span></div>}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-4">Descripción</h3>
               <p className="text-gray-600 whitespace-pre-line leading-relaxed">{prop.description}</p>
            </div>

            {/* FICHA TÉCNICA DINÁMICA */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-6 flex items-center gap-2"><Layout size={20}/> Ficha Técnica</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  
                  {/* LOCAL */}
                  {prop.property_type === 'Local' && (
                     <>
                        <div className="flex justify-between border-b pb-2"><span>Vitrina</span> <span className="font-bold">{prop.showcase_front} m</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Centro Comercial</span> <span className="font-bold">{prop.in_shopping_center ? 'Sí' : 'No'}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Piso</span> <span className="font-bold">{prop.floor_number}</span></div>
                     </>
                  )}

                  {/* OFICINA */}
                  {prop.property_type === 'Oficina' && (
                     <>
                        <div className="flex justify-between border-b pb-2"><span>Red Estructurada</span> <span className="font-bold">{prop.has_network ? 'Sí' : 'No'}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Sala Juntas</span> <span className="font-bold">{prop.meeting_room ? 'Sí' : 'No'}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Cafetería</span> <span className="font-bold">{prop.has_cafeteria ? 'Sí' : 'No'}</span></div>
                     </>
                  )}

                  {/* BODEGA */}
                  {prop.property_type === 'Bodega' && (
                     <>
                        <div className="flex justify-between border-b pb-2"><span>Energía</span> <span className="font-bold">{prop.energy_type}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Muelle</span> <span className="font-bold">{prop.dock?'Sí':'No'}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Entradas</span> <span className="font-bold">{prop.entrance_count}</span></div>
                     </>
                  )}

                  {/* CASA CAMPO */}
                  {prop.property_type === 'CasaCampo' && (
                     <>
                        <div className="flex justify-between border-b pb-2"><span>Topografía</span> <span className="font-bold">{prop.topography}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Agua</span> <span className="font-bold">{prop.water_source}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Cerramiento</span> <span className="font-bold">{prop.fencing}</span></div>
                     </>
                  )}

                  {/* LOTE */}
                  {prop.property_type === 'Lote' && (
                     <>
                        <div className="flex justify-between border-b pb-2"><span>Índice Ocupación</span> <span className="font-bold">{prop.occupation_index}</span></div>
                        <div className="flex justify-between border-b pb-2"><span>Índice Construcción</span> <span className="font-bold">{prop.construction_index}</span></div>
                     </>
                  )}

                  {/* COMUNES */}
                  {prop.estrato && <div className="flex justify-between border-b pb-2"><span>Estrato</span> <span className="font-bold">{prop.estrato}</span></div>}
                  {prop.admin_price > 0 && <div className="flex justify-between border-b pb-2"><span>Admon</span> <span className="font-bold">${new Intl.NumberFormat('es-CO').format(prop.admin_price)}</span></div>}
               </div>
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