import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { pb } from "../api";
import { 
  MapPin, Maximize, Bed, Bath, Car, ArrowLeft, Home, 
  Mountain, Building2, Warehouse, Store, Briefcase, Layout,
  Ruler, Layers, Calendar, Utensils, Receipt, Shield, Key, Droplet, 
  Zap, AlignJustify, Eye, ArrowUpFromLine, FileText, Flame, Phone, 
  TreePine, User, CheckCircle, X, ChevronLeft, ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PropertyDetail = () => {
  const { id } = useParams();
  const [prop, setProp] = useState<any>(null);
  const [specs, setSpecs] = useState<any>({}); 
  const [loading, setLoading] = useState(true);
  
  // Estados para Lightbox (Galería pantalla completa)
  const [activeImg, setActiveImg] = useState(0); 
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
        
        if(record) {
            setProp(record);
            // Parsear specs de forma segura (puede venir como string o JSON)
            try {
                const parsed = typeof record.specs === 'string' ? JSON.parse(record.specs) : record.specs;
                setSpecs(parsed || {});
            } catch (e) {
                console.error("Error parseando specs", e);
                setSpecs({});
            }
        }
      } catch (e) {
        console.error("Error buscando inmueble:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchProp();
  }, [id]);

  // Manejo de Teclado para Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, activeImg]);

  if (loading) return <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white font-bold tracking-widest">CARGANDO...</div>;
  if (!prop) return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4 text-gray-800">Inmueble no encontrado</h2><Link to="/inmuebles" className="text-green-600 underline font-bold">Volver al listado</Link></div>;

  // Construcción de imágenes
  const images = prop.images?.map((img: string) => `${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${img}`) || [];
  const displayImages = images.length > 0 ? images : ["https://via.placeholder.com/1200x800?text=SIN+FOTO"];

  // Funciones de Navegación Lightbox
  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImg((prev) => (prev + 1) % displayImages.length);
  };
  
  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImg((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  // Configuración de Tema según Tipo
  const typeConfig: any = {
     "Casa": { icon: <Home/>, color: "bg-green-600", text: "text-green-600" },
     "Apartamento": { icon: <Building2/>, color: "bg-blue-600", text: "text-blue-600" },
     "Bodega": { icon: <Warehouse/>, color: "bg-yellow-600", text: "text-yellow-600" },
     "Casa Campestre": { icon: <Mountain/>, color: "bg-purple-600", text: "text-purple-600" },
     "Finca": { icon: <Mountain/>, color: "bg-purple-600", text: "text-purple-600" },
     "Lote": { icon: <Layout/>, color: "bg-gray-500", text: "text-gray-600" },
     "Local": { icon: <Store/>, color: "bg-pink-600", text: "text-pink-600" },
     "Oficina": { icon: <Briefcase/>, color: "bg-emerald-600", text: "text-emerald-600" }
  };
  const theme = typeConfig[prop.property_type] || typeConfig["Casa"];

  // --- DICCIONARIO PARA DETALLES ---
  const getLabel = (key: string) => {
      const labels: any = {
          has_rent: "Rentado", avaluo: "Avalúo", admin: "Administración", 
          antiquity: "Antigüedad", stratum: "Estrato", levels_list: "Niveles", remodelado: "Remodelado", 
          esquine: "Esquinero", maintenance_fee: "Cuota Admin", view_type: "Vista", 
          view_direction: "Dir. Vista", has_balcony: "Balcón", balcony_area: "Área Balcón", 
          floor_number: "Piso", total_floors: "Total Pisos", building_age: "Edad Edif.", 
          building_features: "Amenidades", garage_type: "Tipo Garaje", gas_type: "Tipo Gas", 
          building_name: "Edificio", unit_detail: "Int/Apto", kitchen_type: "Cocina", 
          floor_material: "Pisos", study: "Estudio", garden: "Jardín", terrace: "Terraza",
          industrial_gas: "Gas Ind.", three_phase: "Energía 3F", loading_zone: "Zona Carga", 
          grease_trap: "Trampa Grasa", height: "Altura Libre", capacity_kVA: "KVA",
          front: "Frente", depth: "Fondo", legal_status: "Estado Legal", admin_contact: "Contacto", 
          water_source: "Fuente Agua", topography: "Topografía", crops: "Cultivos",
          has_social: "Salón Social", has_gym: "Gimnasio", has_elevator: "Ascensor", 
          has_surveillance: "Vigilancia", has_pool: "Piscina", has_bbq: "BBQ",
          rooms: "Habitaciones", bathrooms: "Baños", garages: "Garajes", area_built: "Área Cons.", 
          area_private: "Área Priv.", habs: "Habitaciones", baths: "Baños", area_total: "Área Total"
      };
      return labels[key] || key.replace(/_/g, " ");
  };

  const getValue = (val: any) => {
      if (val === true) return "Sí";
      if (val === false) return "No";
      if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "Ninguna";
      if (typeof val === 'object' && val !== null) {
          const active = Object.entries(val).filter(([_, v]) => v === true).map(([k]) => getLabel(k));
          return active.length > 0 ? active.join(", ") : "N/A";
      }
      return val || "-";
  };

  const getIconComponent = (key: string) => {
      const icons: any = {
          rooms: Bed, habs: Bed, bathrooms: Bath, baths: Bath, garages: Car, garage_type: Car,
          area_built: Ruler, area_private: Maximize, area_lot: Maximize, balcony_area: Maximize, area_total: Maximize,
          kitchen_type: Utensils, kitchen: Utensils, dining: Utensils,
          admin: Receipt, maintenance_fee: Receipt, stratum: Layers, 
          floor_number: ArrowUpFromLine, total_floors: Building2, levels_list: Layers,
          antiquity: Calendar, building_age: Calendar,
          has_surveillance: Shield, has_rent: Key, legal_status: FileText,
          water: Droplet, energy: Zap, industrial_gas: Flame, gas_type: Flame,
          view_type: Eye, view: Eye, building_name: Building2, unit_detail: MapPin, 
          garden: TreePine, front: Maximize, depth: Maximize, height: ArrowUpFromLine
      };
      return icons[key] || AlignJustify;
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-sans">
      <Navbar language="ES" toggleLanguage={() => {}} />
      
      {/* HERO SECTION - Abre Lightbox al hacer click */}
      <div 
        className="relative h-[60vh] md:h-[70vh] bg-gray-900 group cursor-pointer"
        onClick={() => setLightboxOpen(true)}
      >
         <img src={displayImages[activeImg]} className="w-full h-full object-cover transition-opacity duration-500 opacity-80" />
         <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-90"></div>
         
         {/* Icono de expandir */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 p-4 rounded-full backdrop-blur-sm text-white">
            <Maximize size={32}/>
         </div>

         <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto pt-32 cursor-auto" onClick={(e) => e.stopPropagation()}>
            <Link to="/inmuebles" className="inline-flex items-center text-gray-300 hover:text-white mb-6 text-xs font-bold uppercase tracking-wider bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10 transition-all hover:bg-black/50"><ArrowLeft size={14} className="mr-2"/> Volver al inventario</Link>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded mb-4 text-xs font-black uppercase tracking-widest ${theme.color} text-white shadow-lg`}>
               {theme.icon} {prop.property_type}
            </div>
            
            <h1 className="text-3xl md:text-6xl font-black uppercase leading-tight mb-4 text-white drop-shadow-2xl">
               {prop.title || "Inmueble Sin Título"}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-lg font-medium mb-6 text-gray-200">
               <span className="flex items-center gap-1">
                   <MapPin size={20} className="text-green-400"/> 
                   {/* AQUÍ SE MUESTRAN DIRECCIÓN Y BARRIO */}
                   {prop.address_text || prop.address || prop.municipality}, {prop.neighborhood}
               </span>
               <span className="bg-white/10 px-3 py-1 rounded text-sm font-mono border border-white/20">{prop.ayc_id || "REF-XXX"}</span>
            </div>
            
            <div className="text-4xl md:text-5xl font-black text-green-400 drop-shadow-md">
               ${new Intl.NumberFormat("es-CO").format(prop.price_cop)} <span className="text-lg font-bold text-gray-400">COP</span>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
         
         {/* COLUMNA IZQUIERDA */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* ICONOS PRINCIPALES (Resumen) */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
               {[
                 { k: 'area_built', v: specs.area_built || specs.area_total, unit: 'm²' },
                 { k: 'habs', v: specs.habs || specs.rooms },
                 { k: 'baths', v: specs.baths || specs.bathrooms },
                 { k: 'garages', v: specs.garages },
                 { k: 'stratum', v: specs.stratum },
                 { k: 'antiquity', v: specs.antiquity || specs.building_age, unit: 'años' },
                 { k: 'height', v: specs.height, unit: 'm' }
               ].map((item) => {
                   if(!item.v) return null;
                   const IconComp = getIconComponent(item.k);
                   return (
                       <div key={item.k} className="flex flex-col items-center justify-center p-2">
                           <div className={`${theme.text} mb-2`}><IconComp size={32}/></div>
                           <span className="block font-black text-2xl text-gray-800">{item.v}</span>
                           <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{getLabel(item.k)} {item.unit && `(${item.unit})`}</span>
                       </div>
                   )
               })}
            </div>

            {/* DESCRIPCIÓN */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-6 flex items-center gap-2">
                   <FileText size={24} className="text-gray-400"/> Descripción
               </h3>
               <p className="text-gray-600 whitespace-pre-line leading-relaxed text-base">
                  {prop.description || "Sin descripción detallada disponible."}
               </p>
            </div>

            {/* FICHA TÉCNICA DETALLADA */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-black uppercase text-[#0A192F] mb-8 flex items-center gap-2"><Layout size={24} className="text-gray-400"/> Detalles</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {Object.entries(specs).map(([key, val]) => {
                      if (!val || val === "false" || val === false || (Array.isArray(val) && val.length === 0)) return null;
                      if (['rooms', 'habs', 'baths', 'bathrooms', 'garages', 'area_built', 'area_total', 'height', 'lat', 'lng'].includes(key)) return null;
                      const IconComp = getIconComponent(key);
                      return (
                          <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2 px-2">
                              <span className="text-sm font-medium text-gray-500 flex items-center gap-2 capitalize">
                                  <span className={`${theme.text} opacity-70`}><IconComp size={16}/></span>{getLabel(key)}
                              </span>
                              <span className="font-bold text-gray-800 text-sm text-right max-w-[50%]">{getValue(val)}</span>
                          </div>
                      );
                  })}
                  {/* Fila extra para valor admin si existe */}
                  {specs.admin && (
                      <div className="flex justify-between items-center border-b border-gray-100 pb-2 px-2">
                          <span className="text-sm font-medium text-gray-500 flex items-center gap-2"><Receipt size={16} className={`${theme.text} opacity-70`}/> Administración</span>
                          <span className="font-bold text-gray-800 text-sm">${Number(String(specs.admin).replace(/\./g, "")).toLocaleString('es-CO')}</span>
                      </div>
                  )}
               </div>
            </div>

            {/* GALERÍA GRID */}
            {displayImages.length > 1 && (
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                   <h3 className="text-sm font-black uppercase text-gray-400 mb-4 tracking-widest">Galería Completa</h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {displayImages.map((img: string, i: number) => (
                         <div key={i} onClick={() => { setActiveImg(i); setLightboxOpen(true); }} 
                              className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all border-4 ${activeImg === i ? "border-green-500 shadow-lg scale-95" : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"}`}>
                            <img src={img} className="w-full h-full object-cover"/>
                         </div>
                      ))}
                   </div>
               </div>
            )}
         </div>

         {/* COLUMNA DERECHA (CONTACTO) */}
         <div className="lg:col-span-1">
             <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-24">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center border-2 border-green-100"><User size={32} className="text-green-600"/></div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Agente Responsable</p>
                    <h3 className="text-xl font-black text-gray-900">AyC Inmobiliaria</h3>
                </div>

                <div className="space-y-3">
                    <a href={`https://wa.me/573134663832?text=Hola, estoy interesado en el inmueble ${prop.ayc_id} (${prop.title})`} target="_blank" 
                       className="block w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-black py-4 rounded-xl text-center transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-3">
                       CONTACTAR POR WHATSAPP
                    </a>
                    
                    <button className="block w-full bg-[#0A192F] hover:bg-[#112] text-white font-bold py-4 rounded-xl text-center transition-all shadow-lg flex items-center justify-center gap-2">
                       <Calendar size={18}/> AGENDAR VISITA
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                   <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                       <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={18}/>
                       <div>
                           <h4 className="font-bold text-sm text-green-800">¿Necesitas Crédito?</h4>
                           <p className="text-xs text-green-700 mt-1 leading-relaxed">Tenemos aliados financieros para ayudarte a conseguir este inmueble.</p>
                           <Link to="/servicios" className="text-xs font-black text-green-800 underline mt-2 block hover:text-green-900">Ver Aliados</Link>
                       </div>
                   </div>
                </div>
             </div>
         </div>

      </div>
      <Footer />

      {/* --- LIGHTBOX MODAL (OSCURO) --- */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-in fade-in duration-200" onClick={() => setLightboxOpen(false)}>
            
            {/* Cerrar */}
            <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-50">
                <X size={32} />
            </button>

            {/* Navegación Izquierda */}
            <button onClick={prevImage} className="absolute left-4 md:left-8 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-50">
                <ChevronLeft size={48} />
            </button>

            {/* Imagen Principal */}
            <div className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
                <img 
                    src={displayImages[activeImg]} 
                    className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                    alt={`Galería ${activeImg + 1}`}
                />
                <div className="absolute bottom-[-40px] left-0 w-full text-center text-white/50 text-sm font-mono tracking-widest">
                    {activeImg + 1} / {displayImages.length}
                </div>
            </div>

            {/* Navegación Derecha */}
            <button onClick={nextImage} className="absolute right-4 md:right-8 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-50">
                <ChevronRight size={48} />
            </button>
        </div>
      )}
    </div>
  );
};
export default PropertyDetail;