import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { pb } from "../api";
import Navbar from "../components/Navbar";
import { Youtube, Play } from "lucide-react";

import { PROPERTY_TYPES_THEME } from "../config/propertyConfig";
import HeroSection    from "../components/property/HeroSection";
import GallerySection from "../components/property/GallerySection";
import ContactSidebar from "../components/property/ContactSidebar";
import SpecsSection   from "../components/property/SpecsSection";

import HouseDetailView     from "../modules/house/HouseDetailView";
import ApartmentDetailView from "../modules/apartment/ApartmentDetailView";
import BodegaDetailView    from "../modules/bodega/BodegaDetailView";
import RuralDetailView     from "../modules/rural/RuralDetailView";
import LoteDetailView      from "../modules/lote/LoteDetailView";
import LocalDetailView     from "../modules/local/LocalDetailView";
import OficinaDetailView   from "../modules/oficina/OficinaDetailView";

// ── YouTube parser — Watch, Shorts, youtu.be, Embed, Playlists ───────────────
const getYoutubeInfo = (url: string) => {
  if (!url || typeof url !== "string") return null;
  const videoMatch = url.match(/(?:youtu\.be\/|watch\?v=|&v=|embed\/|shorts\/|v\/)([^#&?]{11})/);
  const listMatch  = url.match(/[?&]list=([^#&?]+)/);
  const videoId = videoMatch?.[1] ?? null;
  const listId  = listMatch?.[1]  ?? null;
  if (videoId) return { type: "video"    as const, id: videoId, listId };
  if (listId)  return { type: "playlist" as const, id: null,    listId };
  return null;
};

// ── Standalone video card — each card has its own play state ─────────────────
function VideoCard({ video }: { video: any }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden bg-[#0A192F] shadow-lg border border-emerald-900/30">
      {playing ? (
        <div className="relative aspect-video">
          <iframe
            src={`${video.embed}?autoplay=1&rel=0&modestbranding=1`}
            className="absolute inset-0 w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Video inmueble"
          />
          <button
            onClick={() => setPlaying(false)}
            className="absolute top-3 right-3 bg-[#0A192F]/80 hover:bg-emerald-800 text-white text-sm font-bold px-3 py-1.5 rounded-full z-10 transition-colors"
          >
            ✕ Cerrar
          </button>
        </div>
      ) : (
        <div className="relative aspect-video cursor-pointer group" onClick={() => setPlaying(true)}>
          {video.thumb ? (
            <img
              src={video.thumb}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              alt="Video thumbnail"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0A192F]">
              <Youtube size={48} className="text-emerald-500"/>
            </div>
          )}
          <div className="absolute inset-0 bg-[#0A192F]/40 group-hover:bg-[#0A192F]/20 transition-colors flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500 rounded-full scale-150 opacity-20 animate-ping"/>
              <div className="relative w-16 h-16 bg-emerald-600 group-hover:bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                <Play size={26} className="text-white ml-1.5" fill="white"/>
              </div>
            </div>
          </div>
          {video.playlistLabel && (
            <div className="absolute top-3 left-3 bg-emerald-600/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
              <Youtube size={12}/> PLAYLIST
            </div>
          )}
        </div>
      )}
      <div className="px-4 py-3 flex items-center gap-2">
        <Youtube size={15} className="text-emerald-400 shrink-0"/>
        <span className="text-white/50 text-xs font-medium">
          {video.playlistLabel ? "Lista de reproducción" : "Recorrido virtual"}
        </span>
      </div>
    </div>
  );
}

// ── Main page component ───────────────────────────────────────────────────────
const PropertyDetail = () => {
  const { id } = useParams();
  const [prop, setProp]       = useState<any>(null);
  const [specs, setSpecs]     = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg]       = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const PB_URL = window.location.origin;

  useEffect(() => {
    const fetchProp = async () => {
      setLoading(true);
      try {
        let record;
        const opts = { $autoCancel: false };
        if (id?.length === 15) {
          record = await pb.collection("properties").getOne(id, opts);
        } else {
          const res = await pb.collection("properties").getList(1, 1, { filter: `ayc_id="${id}"`, ...opts });
          if (res.items.length > 0) record = res.items[0];
        }
        if (record) {
          setProp(record);
          try {
            setSpecs(typeof record.specs === "string" ? JSON.parse(record.specs) : record.specs || {});
          } catch { setSpecs({}); }
        }
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchProp();
  }, [id]);

  // ── Separate images and videos completely ───────────────────────────────────
  const { imageList, videoList } = useMemo(() => {
    if (!prop) return { imageList: [], videoList: [] };

    // Videos
    let formVideos: { url: string; isCover: boolean }[] = Array.isArray(specs.videos)
      ? specs.videos : [];
    if (formVideos.length === 0 && prop.video_url) {
      formVideos = [{ url: prop.video_url, isCover: true }];
    }

    const videos = formVideos.map((v) => {
      const info = getYoutubeInfo(v.url);
      if (!info) return null;
      const isPlaylist = info.type === "playlist";
      return {
        embed:         isPlaylist
          ? `https://www.youtube.com/embed/videoseries?list=${info.listId}`
          : `https://www.youtube.com/embed/${info.id}`,
        thumb:         info.id ? `https://img.youtube.com/vi/${info.id}/maxresdefault.jpg` : null,
        isCover:       v.isCover === true,
        playlistLabel: isPlaylist,
      };
    }).filter(Boolean) as any[];

    // Cover video first
    const ci = videos.findIndex((v: any) => v.isCover);
    if (ci > 0) { const [c] = videos.splice(ci, 1); videos.unshift(c); }

    // Images ordered by gallery_order
    let sorted: string[] = prop.images || [];
    const order: string[] | undefined = specs.gallery_order;
    if (order?.length) {
      sorted = [
        ...order.filter((f: string) => sorted.includes(f)),
        ...sorted.filter((f: string) => !order.includes(f)),
      ];
    }
    const images = sorted.map((img: string) => ({
      type: "image" as const,
      src:  `${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${img}?t=${prop.updated}`,
    }));
    if (images.length === 0) {
      images.push({ type: "image", src: "https://via.placeholder.com/1200x800?text=SIN+FOTO" });
    }

    return { imageList: images, videoList: videos };
  }, [prop, specs, PB_URL]);

  if (loading) return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center text-white font-bold tracking-widest">
      CARGANDO...
    </div>
  );
  if (!prop) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Inmueble no encontrado</h2>
      <Link to="/inmuebles" className="text-green-600 underline font-bold">Volver al listado</Link>
    </div>
  );

  const theme = PROPERTY_TYPES_THEME[prop.property_type] || PROPERTY_TYPES_THEME["default"];

  const renderDetailView = () => {
    const p = {
      specs, description: prop.description, adminFee: prop.admin_fee,
      priceCop: prop.price_cop, priceUsd: prop.price_usd,
      stratum: specs.stratum || prop.stratum,
      neighborhood: prop.neighborhood, municipality: prop.municipality,
    };
    switch (prop.property_type) {
      case "Casa":        return <HouseDetailView    {...p}/>;
      case "Apartamento": return <ApartmentDetailView {...p}/>;
      case "Bodega":      return <BodegaDetailView    {...p}/>;
      case "CasaCampo": case "Finca": case "Rural": case "Casa Campestre":
        return <RuralDetailView specs={specs} description={prop.description} priceCop={prop.price_cop} priceUsd={prop.price_usd} neighborhood={prop.neighborhood} municipality={prop.municipality}/>;
      case "Lote": case "Terreno":
        return <LoteDetailView specs={specs} description={prop.description} adminFee={prop.admin_fee} priceCop={prop.price_cop} priceUsd={prop.price_usd} neighborhood={prop.neighborhood} municipality={prop.municipality}/>;
      case "Local":   return <LocalDetailView   {...p}/>;
      case "Oficina": return <OficinaDetailView  {...p}/>;
      default:        return <SpecsSection specs={specs} theme={theme} description={prop.description}/>;
    }
  };

  return (
    <div className="bg-[#F3F4F6] min-h-screen font-sans pb-12">
      <Navbar />

      {/* Hero — imágenes solamente, sin autoplay de video */}
      <HeroSection
        prop={prop}
        theme={theme}
        mediaList={imageList}
        activeImg={activeImg}
        onOpenLightbox={() => setLightboxOpen(true)}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-10 relative z-10">
        <div className="lg:col-span-2 space-y-8">

          {/* Características del inmueble */}
          {renderDetailView()}

          {/* Galería de FOTOS únicamente */}
          <GallerySection
            mediaList={imageList}
            activeImg={activeImg}
            setActiveImg={setActiveImg}
            lightboxOpen={lightboxOpen}
            setLightboxOpen={setLightboxOpen}
          />

          {/* Videos — sección separada, cada card es independiente */}
          {videoList.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 px-1">
                <div className="w-1 h-6 bg-emerald-500 rounded-full"/>
                <h3 className="text-sm font-black uppercase tracking-widest text-[#0A192F]">
                  Videos &amp; Recorridos
                </h3>
                <span className="text-xs text-gray-400 font-medium">
                  {videoList.length} {videoList.length === 1 ? "video" : "videos"}
                </span>
              </div>
              <div className={`grid gap-4 ${videoList.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
                {videoList.map((video: any, i: number) => (
                  <VideoCard key={i} video={video}/>
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="lg:col-span-1">
          <ContactSidebar prop={prop}/>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;