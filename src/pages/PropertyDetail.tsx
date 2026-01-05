import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { pb } from "../api";
import { 
  MapPin, Maximize, Bed, Bath, Car, ArrowLeft, Home, 
  Mountain, Building2, Warehouse, Store, Briefcase, Layout
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PropertyDetail = () => {
  const { id } = useParams();
  const [prop, setProp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

  useEffect(() => {
    const fetchProp = async () => {
      setLoading(true);
      try {
        let record;
        // Detectar si buscamos por ID de PocketBase (15 chars) o código AYC
        if (id?.length === 15) {
           record = await pb.collection("properties").getOne(id);
        } else {
           const res = await pb.collection("properties").getList(1, 1, { filter: `ayc_id="${id}"` });
           if (res.items.length > 0) record = res.items[0];
        }
        
        if(record) setProp(record);
      } catch (e) {
        console.error("Error buscando inmueble:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProp();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white font-bold">CARGANDO...</div>;
  if (!prop) return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4">Inmueble no encontrado</h2><Link to="/inmuebles" className="text-green-600 underline">Volver al listado</Link></div>;

  // Construir URLs de imágenes para PocketBase
  const images = prop.images?.map((img: string) => `${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${img}`) || [];
  
  // Si no hay imágenes, usar placeholder
  const displayImages = images.length > 0 ? images : ["https://via.placeholder.com/1200x800?text=SIN+FOTO"];

  // CONFIG VISUAL POR TIPO
  const typeConfig: any = {
     "Casa": { icon: <Home/>, color: "bg-green-600" },
     "Apartamento": { icon: <Building2/>, color: "bg-blue-600" },
     "Bodega": { icon: <Warehouse/>, color: "bg-yellow-600" },
     "CasaCampo": { icon: <Mountain/>, color: "bg-purple-600" },
     "Lote": { icon: <Layout/>, color: "bg-gray-500" },
     "Local": { icon: <Store/>, color: "bg-pink-600" },
     "Oficina": { icon: <Briefcase/>, color: "bg-lime-600" }
  };
  // Fallback si el tipo no coincide exacto
  const theme = typeConfig[prop.property_type] || typeConfig["Casa"];

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-sans">
      <Navbar language="ES" toggleLanguage={() => {}} />
      
      {/* HERO SECTION */}
      <div className="relative h-[70vh] bg-gray-900 group">
         <img src={displayImages[activeImg]} className="w-full h-full object-cover transition-opacity duration-500 opacity-90" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
         
         {/* INFO SOBRE IMAGEN */}
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 text-white max-w-7xl mx-auto pt-32">
            <Link to="/inmuebles" className="inline-flex items-center text-gray-300 hover:text-white mb-4 text-sm font-bold uppercase tracking-wider"><ArrowLeft size={16} className="mr-2"/> Volver</Link>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded mb-4 text-xs font-black uppercase tracking-widest ${theme.color} text-white`}>
               {theme.icon} {prop.property_type}
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black uppercase leading-none mb-4 drop-shadow-xl">
               {prop.title || "Inmueble Sin Título"}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-xl font-medium mb-6">
               <span className="flex items-center gap-1"><MapPin size={20} className="text-green-500"/> {prop.municipality} {prop.neighborhood && `- ${prop.neighborhood}`}</span>
               <span className="bg-white/20 px-2 py-0.5 rounded text-sm font-mono border border-white/30 w-fit">{prop.ayc_id || "REF-XXX"}</span>
            </div>
            
            <div className="text-5xl font-black text-green-500">
               ${new Intl.NumberFormat("es-CO", { notation: "compact", maximumFractionDigits: 1 }).format(prop.price_cop)}
            </div>
         </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
         
         {/* COLUMNA IZQUIERDA (DETALLES) */}
         <div className="lg:col-span-2 space-y-10">
            
            {/* ICONOS RESUMEN */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-4 gap-4 text-center">
               {/* Área */}
               {(prop.area_built || prop.area_lot) && (
                  <div>
                     <Maximize className="mx-auto text-gray-400 mb-1"/> 
                     <span className="block font-black text-xl">{prop.area_built || prop.area_lot}</span> 
                     <span className="text-[10px] uppercase font-bold text-gray-400">m²</span>
                  </div>
               )}
               
               {/* Habitaciones */}
               {prop.habs > 0 && (
                  <div>
                     <Bed className="mx-auto text-gray-400 mb-1"/> 
                     <span className="block font-black text-xl">{prop.habs}</span> 
                     <span className="text-[10px] uppercase font-bold text-gray-400">Habs</span>
                  </div>
               )}

               {/* Baños */}
               {prop.baths > 0 && (
                  <div>
                     <Bath className="mx-auto text-gray-400 mb-1"/> 
                     <span className="block font-black text-xl">{prop.baths}</span> 
                     <span className="text-[10px] uppercase font-bold text-gray-400">Baños</span>
                  </div>
               )}

               {/* Garajes (Si existe el campo en tu DB) */}
               <div>
                  <Car className="mx-auto text-gray-400 mb-1"/> 
                  <span className="block font-black text-xs uppercase pt-2 leading-tight">Consultar</span> 
                  <span className="text-[10px] uppercase font-bold text-gray-400">Garaje</span>
               </div>
            </div>

            {/* DESCRIPCIÓN */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-4">Descripción</h3>
               <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  {prop.description || "Sin descripción detallada disponible."}
               </p>
            </div>

            {/* FICHA TÉCNICA DINÁMICA */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-6 flex items-center gap-2"><Layout size={20}/> Ficha Técnica</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                  
                  {/* COMUNES */}
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span>Estrato</span> <span className="font-bold text-gray-800">{prop.estrato || "N/A"}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span>Administración</span> <span className="font-bold text-gray-800">${prop.admin_price ? prop.admin_price.toLocaleString("es-CO") : "0"}</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span>Dirección / Barrio</span> <span className="font-bold text-gray-800">{prop.address || prop.municipality}</span></div>

                  {/* ESPECÍFICOS - BODEGA */}
                  {prop.property_type === "Bodega" && (
                     <>
                        <div className="flex justify-between border-b border-gray-100 pb-2"><span>Altura</span> <span className="font-bold text-gray-800">{prop.height || "N/A"} m</span></div>
                        <div className="flex justify-between border-b border-gray-100 pb-2"><span>Energía</span> <span className="font-bold text-gray-800">{prop.energy_kva || "N/A"} KVA</span></div>
                     </>
                  )}

                  {/* ESPECÍFICOS - LOTE */}
                  {prop.property_type === "Lote" && (
                     <div className="flex justify-between border-b border-gray-100 pb-2"><span>Uso de Suelo</span> <span className="font-bold text-gray-800">{prop.soil_use || "Mixto"}</span></div>
                  )}

               </div>
            </div>

            {/* GALERÍA */}
            {displayImages.length > 1 && (
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {displayImages.map((img: string, i: number) => (
                     <div key={i} onClick={() => { setActiveImg(i); window.scrollTo({top:0, behavior:"smooth"}); }} 
                          className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${activeImg === i ? "border-green-500 opacity-100" : "border-transparent opacity-70 hover:opacity-100"}`}>
                        <img src={img} className="w-full h-full object-cover"/>
                     </div>
                  ))}
               </div>
            )}
         </div>

         {/* COLUMNA DERECHA (CONTACTO) */}
         <div className="bg-[#0A192F] text-white p-8 rounded-2xl h-fit sticky top-24 shadow-2xl">
            <h3 className="font-bold text-xl mb-4 text-center uppercase tracking-widest">¿Te Interesa?</h3>
            <p className="text-center text-sm text-gray-400 mb-6">Referencia: <span className="font-mono text-white font-bold">{prop.ayc_id || "N/A"}</span></p>
            
            <a href={`https://wa.me/573134663832?text=Hola, estoy interesado en el inmueble ${prop.ayc_id}`} target="_blank" className="block w-full bg-[#25D366] text-white font-bold py-3 rounded-xl mb-3 text-center hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2">
               WhatsApp Agente
            </a>
            
            <Link to="/contacto" className="block w-full bg-white text-[#0A192F] font-bold py-3 rounded-xl text-center hover:bg-gray-200 transition-all shadow-lg">
               Agendar Visita
            </Link>

            <div className="mt-8 pt-6 border-t border-white/10 text-center">
               <p className="text-xs text-gray-500">¿Necesitas ayuda con tu crédito?</p>
               <Link to="/servicios" className="text-green-500 text-xs font-bold hover:underline">Consultar aliados financieros</Link>
            </div>
         </div>

      </div>
      <Footer />
    </div>
  );
};
export default PropertyDetail;
