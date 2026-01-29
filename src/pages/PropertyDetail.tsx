import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { pb } from "../api";
import Navbar from "../components/Navbar";

// Configuración y Contexto
import { PROPERTY_TYPES_THEME } from "../config/propertyConfig";

// COMPONENTES COMUNES
import HeroSection from "../components/property/HeroSection";
import GallerySection from "../components/property/GallerySection";
import ContactSidebar from "../components/property/ContactSidebar";
import SpecsSection from "../components/property/SpecsSection"; 

// --- IMPORTACIÓN DE MÓDULOS ESPECÍFICOS ---
import HouseDetailView from "../modules/house/HouseDetailView";
import ApartmentDetailView from "../modules/apartment/ApartmentDetailView";
import BodegaDetailView from "../modules/bodega/BodegaDetailView";
import RuralDetailView from "../modules/rural/RuralDetailView";
import LoteDetailView from "../modules/lote/LoteDetailView";
import LocalDetailView from "../modules/local/LocalDetailView";
import OficinaDetailView from "../modules/oficina/OficinaDetailView";

const PropertyDetail = () => {
  const { id } = useParams();
  const [prop, setProp] = useState<any>(null);
  const [specs, setSpecs] = useState<any>({}); 
  const [loading, setLoading] = useState(true);
  
  // Estados para Galería
  const [activeImg, setActiveImg] = useState(0); 
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // --- URL FIJA AL SERVIDOR ---
  const PB_URL = "http://209.126.77.41:8080";

  useEffect(() => {
    const fetchProp = async () => {
      setLoading(true);
      try {
        let record;
        // Forzamos $autoCancel: false para evitar cancelaciones
        const options = { $autoCancel: false };

        if (id?.length === 15) {
           record = await pb.collection("properties").getOne(id, options);
        } else {
           const res = await pb.collection("properties").getList(1, 1, { filter: `ayc_id="${id}"`, ...options });
           if (res.items.length > 0) record = res.items[0];
        }
        
        if(record) {
           setProp(record);
           try {
               // Parseamos specs inmediatamente para usarlo en el render
               const parsed = typeof record.specs === 'string' ? JSON.parse(record.specs) : record.specs;
               setSpecs(parsed || {});
           } catch (e) { setSpecs({}); }
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    fetchProp();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white font-bold tracking-widest">CARGANDO...</div>;
  if (!prop) return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center"><h2 className="text-2xl font-bold mb-4 text-gray-800">Inmueble no encontrado</h2><Link to="/inmuebles" className="text-green-600 underline font-bold">Volver al listado</Link></div>;

  // --- LÓGICA DE ORDENAMIENTO DE IMÁGENES (FIX) ---
  let sortedImages = prop.images || [];
  const galleryOrder = specs.gallery_order; // Obtenemos el orden guardado

  if (galleryOrder && Array.isArray(galleryOrder) && galleryOrder.length > 0) {
      // Si existe un orden guardado, reordenamos el array físico
      sortedImages = [...sortedImages].sort((a: string, b: string) => {
          const indexA = galleryOrder.indexOf(a);
          const indexB = galleryOrder.indexOf(b);
          
          // Si la imagen no está en la lista de orden (ej: nueva), va al final (999)
          const valA = indexA === -1 ? 999 : indexA;
          const valB = indexB === -1 ? 999 : indexB;
          
          return valA - valB;
      });
  }

  // Lógica de Media (Video + Fotos Ordenadas)
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYoutubeId(prop.video_url || "");
  
  const mediaList = [
      ...(videoId ? [{ type: 'video', src: videoId, thumb: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` }] : []),
      // Usamos sortedImages en lugar de prop.images directo
      ...sortedImages.map((img: string) => ({ 
          type: 'image', 
          // Agregamos timestamp ?t=updated para romper el caché si la imagen cambió
          src: `${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${img}?t=${prop.updated}` 
      }))
  ];
  
  if (mediaList.length === 0) mediaList.push({ type: 'image', src: "https://via.placeholder.com/1200x800?text=SIN+FOTO" });

  const theme = PROPERTY_TYPES_THEME[prop.property_type] || PROPERTY_TYPES_THEME["default"];

  // --- RENDERIZADO CONDICIONAL DE VISTAS ---
  const renderDetailView = () => {
      switch (prop.property_type) {
          case 'Casa': 
              return <HouseDetailView 
                  specs={specs} 
                  description={prop.description} 
                  adminFee={prop.admin_fee} 
                  priceCop={prop.price_cop} 
                  priceUsd={prop.price_usd}
                  stratum={specs.stratum || prop.stratum}
                  neighborhood={prop.neighborhood}
                  municipality={prop.municipality} 
              />;
          case 'Apartamento': 
              return <ApartmentDetailView 
                  specs={specs} 
                  description={prop.description} 
                  adminFee={prop.admin_fee} 
                  priceCop={prop.price_cop} 
                  priceUsd={prop.price_usd}
                  stratum={specs.stratum || prop.stratum}
                  neighborhood={prop.neighborhood}
                  municipality={prop.municipality}
              />;
          case 'Bodega': 
              return <BodegaDetailView 
                  specs={specs} 
                  description={prop.description} 
                  adminFee={prop.admin_fee} 
                  priceCop={prop.price_cop} 
                  priceUsd={prop.price_usd}
                  stratum={specs.stratum || prop.stratum}
                  neighborhood={prop.neighborhood}
                  municipality={prop.municipality} 
              />;
          case 'CasaCampo':
          case 'Finca': 
          case 'Rural': 
          case 'Casa Campestre': 
              return <RuralDetailView 
                  specs={specs} 
                  description={prop.description} 
                  priceCop={prop.price_cop} 
                  priceUsd={prop.price_usd}
                  neighborhood={prop.neighborhood}
                  municipality={prop.municipality}
              />;
          case 'Lote': 
          case 'Terreno': 
              return <LoteDetailView 
                  specs={specs} 
                  description={prop.description} 
                  adminFee={prop.admin_fee} 
                  priceCop={prop.price_cop} 
                  priceUsd={prop.price_usd}
                  neighborhood={prop.neighborhood}
                  municipality={prop.municipality}
              />;
          case 'Local': 
              return <LocalDetailView 
                  specs={specs} 
                  description={prop.description} 
                  adminFee={prop.admin_fee} 
                  priceCop={prop.price_cop} 
                  priceUsd={prop.price_usd}
                  neighborhood={prop.neighborhood}
                  municipality={prop.municipality}
              />;
          case 'Oficina': 
              return <OficinaDetailView 
                  specs={specs} 
                  description={prop.description} 
                  adminFee={prop.admin_fee} 
                  priceCop={prop.price_cop} 
                  priceUsd={prop.price_usd}
                  stratum={specs.stratum || prop.stratum}
                  neighborhood={prop.neighborhood}
                  municipality={prop.municipality} 
              />;
          default:
              return <SpecsSection specs={specs} theme={theme} description={prop.description} />;
      }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-sans pb-12">
      <Navbar />
      {/* Pasamos mediaList ordenado aquí, así que el Hero mostrará la foto #1 correcta */}
      <HeroSection prop={prop} theme={theme} mediaList={mediaList} activeImg={activeImg} onOpenLightbox={() => setLightboxOpen(true)} />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
         <div className="lg:col-span-2 space-y-8">
            {renderDetailView()}
            <GallerySection mediaList={mediaList} activeImg={activeImg} setActiveImg={setActiveImg} lightboxOpen={lightboxOpen} setLightboxOpen={setLightboxOpen} />
         </div>
         <div className="lg:col-span-1">
             <ContactSidebar prop={prop} />
         </div>
      </div>
    </div>
  );
};
export default PropertyDetail;