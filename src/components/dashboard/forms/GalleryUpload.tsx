import React, { useState, useRef, useEffect, useMemo } from "react";
import { Upload, CheckCircle, Trash2, Youtube, Video, RotateCw, Image as ImageIcon } from "lucide-react";

const PB_URL = window.location.origin;

const getYoutubeInfo = (url: string) => {
  if (!url || typeof url !== 'string') return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const videoMatch = url.match(regExp);
  const listMatch = url.match(/[?&]list=([^#\&\?]+)/);
  const videoId = (videoMatch && videoMatch[2].length === 11) ? videoMatch[2] : null;
  const listId = listMatch ? listMatch[1] : null;
  if (videoId) return { type: 'video', id: videoId, listId };
  if (listId) return { type: 'playlist', listId };
  return null;
};

export default function GalleryUpload({
  setImages,
  setDeletedImages,
  initialData,
  register,
  watch,
  setValue,
  getValues,
  onPreviewChange,
}: any) {
  const [previews, setPreviews] = useState<
    { url: string; rotate: number; file?: File; isExisting: boolean; id?: string }[]
  >([]);

  // IDs borrados en esta sesión. Como es un ref, no causa re-renders y
  // persiste entre renders del componente. El useEffect de sincronización
  // lo lee para filtrar initialData.images y no restaurar lo que el usuario borró.
  const localDeletedIds = useRef<Set<string>>(new Set());

  const [localVideos, setLocalVideos] = useState<{ url: string; isCover: boolean }[]>([]);
  const [videoInput, setVideoInput] = useState("");
  const initialized = useRef(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const lastProcessedId = useRef<string | null>(null);

  // ── Init videos ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!initialized.current) {
      let formVids = getValues("videos");
      if (!Array.isArray(formVids) && initialData?.specs) {
        try {
          const parsedSpecs =
            typeof initialData.specs === "string"
              ? JSON.parse(initialData.specs)
              : initialData.specs;
          formVids = parsedSpecs.videos;
        } catch (e) {}
      }
      if (Array.isArray(formVids) && formVids.length > 0) {
        setLocalVideos(formVids);
      } else if (initialData?.video_url) {
        setLocalVideos([{ url: initialData.video_url, isCover: true }]);
      }
      initialized.current = true;
    }
  }, [getValues, initialData]);

  useEffect(() => {
    if (typeof setValue === "function") setValue("videos", localVideos, { shouldDirty: true });
  }, [localVideos, setValue]);

  const coverVideo = useMemo(() => {
    const cover = localVideos.find((v) => v.isCover && v.url);
    if (cover) {
      const info = getYoutubeInfo(cover.url);
      if (info) return { ...info, originalUrl: cover.url };
    }
    return null;
  }, [localVideos]);

  // ── Sincronización de imágenes existentes ─────────────────────────────────
  useEffect(() => {
    const currentPropId = initialData?.id || "new-entry";
    const incomingImages: string[] = Array.isArray(initialData?.images)
      ? initialData.images
      : [];

    if (lastProcessedId.current !== currentPropId) {
      // Cambió el inmueble: reset total incluido el Set de borrados
      localDeletedIds.current = new Set();
      setPreviews([]);
      if (typeof setDeletedImages === "function") setDeletedImages([]);
      if (typeof setImages === "function") setImages([]);
      lastProcessedId.current = currentPropId;
    }

    if (incomingImages.length > 0) {
      // FIX PRINCIPAL: filtrar los IDs que el usuario ya borró en esta sesión.
      // Sin esto, cada re-render que dispare este effect restaura las imágenes
      // borradas porque currentIdsString < incomingIdsString → condición true.
      const filteredIncoming = incomingImages.filter(
        (img) => !localDeletedIds.current.has(img)
      );

      const filteredIdsString = filteredIncoming.join(",");
      const currentIdsString = previews
        .filter((p) => p.isExisting)
        .map((p) => p.id)
        .join(",");

      if (currentIdsString !== filteredIdsString) {
        const existing = filteredIncoming.map((img: string) => ({
          url: `${PB_URL}/api/files/${initialData.collectionId}/${initialData.id}/${img}?t=${Date.now()}`,
          rotate: 0,
          isExisting: true,
          id: img,
        }));
        setPreviews((prev) => {
          const localFiles = prev.filter((p) => !p.isExisting);
          return [...existing, ...localFiles];
        });
      }
    } else {
      setPreviews((prev) => prev.filter((p) => !p.isExisting));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData?.id, initialData?.images]);

  useEffect(() => {
    const newFilesOnly = previews
      .filter((p) => !p.isExisting && p.file)
      .map((p) => p.file as File);
    if (typeof setImages === "function") setImages(newFilesOnly);
    if (typeof onPreviewChange === "function") onPreviewChange(previews.map((p) => p.url));
    return () => {
      previews.forEach((p) => {
        if (!p.isExisting && p.url.startsWith("blob:")) URL.revokeObjectURL(p.url);
      });
    };
  }, [previews, setImages, onPreviewChange]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map((f) => ({
        url: URL.createObjectURL(f),
        rotate: 0,
        file: f,
        isExisting: false,
        id: `temp-${Date.now()}-${f.name}`,
      }));
      setPreviews((prev) => [...prev, ...newPreviews]);
      e.target.value = "";
    }
  };

  const removeImg = (index: number) => {
    const itemToDelete = previews[index];
    if (itemToDelete.isExisting && itemToDelete.id) {
      // Registrar en el ref local ANTES del setState para que el useEffect
      // de sincronización nunca vuelva a renderizar esta imagen.
      localDeletedIds.current.add(itemToDelete.id);
      console.log("🗑️ [Gallery] removeImg — marcando para borrar:", itemToDelete.id);

      if (typeof setDeletedImages === "function") {
        setDeletedImages((prev: string[]) =>
          prev.includes(itemToDelete.id!) ? prev : [...prev, itemToDelete.id!]
        );
      }
    }
    if (!itemToDelete.isExisting && itemToDelete.url)
      URL.revokeObjectURL(itemToDelete.url);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const items = [...previews];
    const item = items.splice(dragItem.current, 1)[0];
    items.splice(dragOverItem.current, 0, item);
    dragItem.current = null;
    dragOverItem.current = null;
    setPreviews(items);
  };

  const handleAddVideo = () => {
    if (!videoInput.trim()) return;
    const info = getYoutubeInfo(videoInput);
    if (!info) {
      alert("Link inválido. Usa un enlace válido de YouTube o Shorts.");
      return;
    }
    setLocalVideos((prev) => [...prev, { url: videoInput.trim(), isCover: false }]);
    setVideoInput("");
  };

  const removeVideo = (index: number) =>
    setLocalVideos((prev) => prev.filter((_, i) => i !== index));

  const setVideoAsCover = (index: number) => {
    setLocalVideos((prev) =>
      prev.map((v, i) => ({ ...v, isCover: i === index ? !v.isCover : false }))
    );
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="animate-in fade-in space-y-8">
      {/* HERO PREVIEW */}
      <div>
        {(previews.length > 0 || coverVideo) && (
          <div className="bg-[#0A192F] rounded-xl overflow-hidden shadow-lg flex items-center p-3 gap-3 border border-blue-900 mb-6 ring-2 ring-blue-500/20">
            <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black relative flex items-center justify-center">
              {coverVideo ? (
                <>
                  {coverVideo.id ? (
                    <img
                      src={`https://img.youtube.com/vi/${coverVideo.id}/mqdefault.jpg`}
                      className="w-full h-full object-cover opacity-70"
                      alt="Video Cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                      <Youtube size={20} className="text-gray-600" />
                    </div>
                  )}
                  <div className="absolute bg-red-600 rounded-full p-1">
                    <Youtube size={14} className="text-white" />
                  </div>
                </>
              ) : (
                <img
                  src={previews[0]?.url}
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ transform: `rotate(${previews[0]?.rotate || 0}deg)` }}
                  alt="Portada"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded w-fit mb-1 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle size={8} /> Portada Actual (Hero) {coverVideo && "- VIDEO"}
              </div>
              <p className="text-white text-xs font-bold truncate">
                {watch("title") || "Sin Título"}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-2">
              <ImageIcon size={14} /> Galería Fotográfica
            </span>
            <p className="text-[10px] text-gray-400 mt-1">
              Arrastra para ordenar. La imagen #1 será portada si no hay video seleccionado.
            </p>
          </div>
          <label className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-bold cursor-pointer shadow-md flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
            <Upload size={14} /> AGREGAR FOTOS
            <input type="file" multiple onChange={handleFiles} className="hidden" accept="image/*" />
          </label>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {previews.map((img, index) => (
            <div
              key={img.id || img.url}
              className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-100 cursor-grab active:cursor-grabbing hover:shadow-lg transition-all"
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                src={img.url}
                className="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: `rotate(${img.rotate}deg)` }}
                alt={`Foto ${index + 1}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-between items-start">
                  <span className="bg-black/60 backdrop-blur text-white text-[10px] font-mono px-1.5 py-0.5 rounded shadow-sm">
                    #{index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImg(index); }}
                    className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 shadow-sm transition-colors"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviews((prev) =>
                      prev.map((p, i) => i === index ? { ...p, rotate: p.rotate + 90 } : p)
                    );
                  }}
                  className="self-center bg-white/20 backdrop-blur text-white p-2 rounded-full hover:bg-blue-600 transition-colors"
                >
                  <RotateCw size={14} />
                </button>
              </div>
              {index === 0 && !coverVideo && (
                <div className="absolute bottom-0 w-full bg-blue-600/90 backdrop-blur text-white text-[8px] font-black text-center py-1 uppercase tracking-widest border-t border-blue-400">
                  PORTADA
                </div>
              )}
            </div>
          ))}
          {previews.length === 0 && (
            <div className="col-span-3 md:col-span-5 h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300 bg-gray-50">
              <Upload size={24} className="mb-2 opacity-50" />
              <span className="text-[10px] font-bold uppercase tracking-wide">Sin imágenes cargadas</span>
            </div>
          )}
        </div>
      </div>

      {/* VIDEOS */}
      <div className="pt-6 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-red-100 text-red-600 rounded-lg">
            <Youtube size={16} />
          </div>
          <div>
            <span className="block text-xs font-bold uppercase text-gray-700">Videos & Recorridos</span>
            <p className="text-[10px] text-gray-400">Pega el link de YouTube (o Shorts) y haz clic en Cargar.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Video size={14} />
            </div>
            <input
              type="text"
              value={videoInput}
              onChange={(e) => setVideoInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddVideo())}
              placeholder="https://www.youtube.com/watch?v=... o youtube.com/shorts/..."
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-red-500 outline-none transition-shadow shadow-sm"
            />
          </div>
          <button
            type="button"
            onClick={handleAddVideo}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Upload size={14} /> Cargar
          </button>
        </div>

        {localVideos.length > 0 && (
          <div className="flex flex-wrap gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl">
            {localVideos.map((video: any, index: number) => {
              const info = getYoutubeInfo(video.url);
              return (
                <div
                  key={index}
                  className={`relative w-48 flex flex-col rounded-xl overflow-hidden shadow-sm border-2 transition-all ${
                    video.isCover ? "border-red-500 ring-4 ring-red-100" : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="relative w-full h-32 bg-gray-200 group">
                    {info && info.type === "video" ? (
                      <img
                        src={`https://img.youtube.com/vi/${info.id}/mqdefault.jpg`}
                        className="w-full h-full object-cover opacity-90"
                        alt="Video preview"
                      />
                    ) : info && info.type === "playlist" ? (
                      <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center">
                        <Youtube size={24} className="text-red-500 mb-1" />
                        <span className="text-[10px] text-white font-bold tracking-widest">PLAYLIST</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase text-center p-2">
                        URL Inválida
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="bg-red-500 text-white p-1.5 rounded-lg hover:bg-red-600 shadow-sm transition-colors"
                        title="Eliminar Video"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 bg-white flex items-center justify-center border-t border-gray-100">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={video.isCover || false}
                        onChange={() => setVideoAsCover(index)}
                        className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-bold text-gray-600 group-hover:text-gray-900 uppercase">
                        Usar como Portada
                      </span>
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}