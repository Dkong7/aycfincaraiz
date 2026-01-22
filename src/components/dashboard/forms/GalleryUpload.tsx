import React, { useState, useRef, useEffect } from "react";
import { Upload, CheckCircle, Trash2, Youtube, Video, RotateCw } from "lucide-react";
import { pb } from "../../../api";

// --- FIX CRÍTICO: URL FIJA AL SERVIDOR (NO LOCALHOST) ---
const PB_URL = "http://209.126.77.41:8080";

export default function GalleryUpload({ setImages, setDeletedImages, initialData, register, watch, onPreviewChange }: any) {
  const [previews, setPreviews] = useState<{url: string, rotate: number, file?: File, isExisting: boolean, id?: string}[]>([]);
  
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Carga inicial
  useEffect(() => {
    if (initialData?.images?.length > 0) {
       const existing = initialData.images.map((img: string) => ({
         url: `${PB_URL}/api/files/${initialData.collectionId}/${initialData.id}/${img}`,
         rotate: 0,
         isExisting: true,
         id: img 
       }));
       setPreviews(existing);
    }
  }, [initialData]);

  // COMUNICACIÓN CON PADRE
  useEffect(() => {
     const newFilesOnly = previews.filter(p => !p.isExisting && p.file).map(p => p.file as File);
     setImages(newFilesOnly);
     
     if (onPreviewChange) {
         onPreviewChange(previews.map(p => p.url));
     }
  }, [previews, setImages, onPreviewChange]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newPreviews = files.map(f => ({ url: URL.createObjectURL(f), rotate: 0, file: f, isExisting: false }));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const rotateImg = (index: number) => {
    setPreviews(prev => prev.map((p, i) => i === index ? { ...p, rotate: p.rotate + 90 } : p));
  };

  const removeImg = (index: number) => {
    const itemToDelete = previews[index];
    if (itemToDelete.isExisting && itemToDelete.id && setDeletedImages) {
        setDeletedImages((prev: string[]) => [...prev, itemToDelete.id]);
    }
    setPreviews(prev => prev.filter((_, i) => i !== index));
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

  const videoUrl = watch("video_url");

  return (
    <div className="animate-in fade-in space-y-8">
       <div>
           {previews.length > 0 && (
             <div className="bg-[#0A192F] rounded-xl overflow-hidden shadow-lg flex items-center p-3 gap-3 border border-blue-900 mb-6 ring-2 ring-blue-500/20">
                 <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black relative">
                    <img src={previews[0].url} className="w-full h-full object-cover" style={{ transform: `rotate(${previews[0].rotate}deg)` }}/>
                 </div>
                 <div className="flex-1 min-w-0">
                    <div className="bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded w-fit mb-1 uppercase tracking-wider flex items-center gap-1">
                       <CheckCircle size={8}/> Portada Actual (Hero)
                    </div>
                    <p className="text-white text-xs font-bold truncate">{watch("title") || "Sin Título"}</p>
                 </div>
             </div>
           )}

           <div className="flex justify-between items-end mb-4">
             <div>
                 <span className="text-xs font-bold uppercase text-gray-500">Galería Fotográfica</span>
                 <p className="text-[10px] text-gray-400">Arrastra para ordenar. La #1 es la portada.</p>
             </div>
             <label className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer shadow-md flex items-center gap-2 transition-all">
                 <Upload size={12}/> AGREGAR FOTOS
                 <input type="file" multiple onChange={handleFiles} className="hidden" accept="image/*"/>
             </label>
           </div>

           <div className="grid grid-cols-3 gap-2">
             {previews.map((img, index) => (
                 <div key={index} 
                   className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
                   draggable
                   onDragStart={() => (dragItem.current = index)}
                   onDragEnter={() => (dragOverItem.current = index)}
                   onDragEnd={handleSort}
                   onDragOver={(e) => e.preventDefault()}
                 >
                    <img src={img.url} className="w-full h-full object-cover transition-transform duration-300" style={{ transform: `rotate(${img.rotate}deg)` }} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                       <div className="flex justify-between items-start">
                          <span className="bg-black/60 backdrop-blur text-white text-[9px] font-mono px-1.5 py-0.5 rounded">#{index + 1}</span>
                          <button type="button" onClick={() => removeImg(index)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600 shadow-sm transition-colors"><Trash2 size={10}/></button>
                       </div>
                       <button type="button" onClick={() => rotateImg(index)} className="self-center bg-white/20 backdrop-blur text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors"><RotateCw size={12}/></button>
                    </div>
                    {index === 0 && <div className="absolute bottom-0 w-full bg-blue-600/90 backdrop-blur text-white text-[7px] font-black text-center py-1 uppercase tracking-widest border-t border-blue-400">PORTADA</div>}
                 </div>
             ))}
             
             {previews.length === 0 && (
                <div className="col-span-3 h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300">
                   <Upload size={24} className="mb-2 opacity-50"/>
                   <span className="text-[10px] font-bold">Sin imágenes</span>
                </div>
             )}
           </div>
       </div>

       <div className="pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 mb-3">
             <div className="p-1.5 bg-red-100 text-red-600 rounded-lg"><Youtube size={16} /></div>
             <div>
                <span className="block text-xs font-bold uppercase text-gray-700">Video Promocional</span>
                <p className="text-[10px] text-gray-400">Si agregas link, será la portada en Hero (reemplaza foto).</p>
             </div>
          </div>
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400"><Video size={14} /></div>
             <input type="text" {...register("video_url")} placeholder="https://www.youtube.com/watch?v=..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 outline-none"/>
          </div>
          {videoUrl && (
             <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-100 flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-[10px] font-medium text-red-700 truncate flex-1">{videoUrl}</span>
                 <span className="text-[9px] font-bold bg-white px-2 py-0.5 rounded text-red-500 border border-red-200 uppercase">Detectado</span>
             </div>
          )}
       </div>
    </div>
  );
}