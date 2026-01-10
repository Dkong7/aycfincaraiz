import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { pb } from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Configuración y Contexto
import { PROPERTY_TYPES_THEME } from "../config/propertyConfig";

// NUEVOS COMPONENTES SEGMENTADOS
import HeroSection from "../components/property/HeroSection";
import SpecsSection from "../components/property/SpecsSection";
import GallerySection from "../components/property/GallerySection";
import ContactSidebar from "../components/property/ContactSidebar";

const PropertyDetail = () => {
  const { id } = useParams();
  const [prop, setProp] = useState<any>(null);
  const [specs, setSpecs] = useState<any>({}); 
  const [loading, setLoading] = useState(true);
  
  // Estados para Galería
  const [activeImg, setActiveImg] = useState(0); 
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

  useEffect(() => {
    const fetchProp = async () => {
      setLoading(true);
      try {
        let record;
        if (id?.length === 15) {
           record = await pb.collection("properties").getOne(id);
        } else {
           const res = await pb.collection("properties").getList(1, 1, { filter: `ayc_id="${id}"` });
           if (res.items.length > 0) record = res.items[0];
        }
        
        if(record) {
            setProp(record);
            try {
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

  // Lógica de Media
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const videoId = getYoutubeId(prop.video_url || "");
  const mediaList = [
      ...(videoId ? [{ type: 'video', src: videoId, thumb: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` }] : []),
      ...(prop.images?.map((img: string) => ({ type: 'image', src: `${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${img}` })) || [])
  ];
  if (mediaList.length === 0) mediaList.push({ type: 'image', src: "https://via.placeholder.com/1200x800?text=SIN+FOTO" });

  // Tema Visual
  const theme = PROPERTY_TYPES_THEME[prop.property_type] || PROPERTY_TYPES_THEME["Casa"];

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-sans">
      <Navbar />
      
      <HeroSection 
         prop={prop} 
         theme={theme} 
         mediaList={mediaList} 
         activeImg={activeImg} 
         onOpenLightbox={() => setLightboxOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
         
         <div className="lg:col-span-2 space-y-8">
            <SpecsSection specs={specs} theme={theme} description={prop.description} />
            
            <GallerySection 
               mediaList={mediaList} 
               activeImg={activeImg} 
               setActiveImg={setActiveImg} 
               lightboxOpen={lightboxOpen} 
               setLightboxOpen={setLightboxOpen}
            />
         </div>

         <div className="lg:col-span-1">
             <ContactSidebar prop={prop} />
         </div>

      </div>
      <Footer />
    </div>
  );
};
export default PropertyDetail;