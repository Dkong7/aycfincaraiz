import React, { useState, useRef, useEffect } from "react";
import { Upload, X, RotateCw, CheckCircle, Trash2 } from "lucide-react";
import { pb } from "../../../api";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

export default function GalleryUpload({ setImages, initialData, register, watch }: any) {
  // Estado local mixto (Fotos existentes URL + Fotos nuevas File)
  const [previews, setPreviews] = useState<{url: string, rotate: number, file?: File, isExisting: boolean}[]>([]);
  
  // Refs para Drag & Drop
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Carga inicial de fotos existentes
  useEffect(() => {
    if (initialData?.images?.length > 0) {
       const existing = initialData.images.map((img: string) => ({
          url: `${PB_URL}/api/files/${initialData.collectionId}/${initialData.id}/${img}`,
          rotate: 0,
          isExisting: true
       }));
       setPreviews(existing);
    }
  }, [initialData]);

  // Sincronizar con el Padre (Cada vez que cambia previews, actualizamos la lista de Files nuevos en el padre)
  useEffect(() => {
     const newFilesOnly = previews.filter(p => !p.isExisting && p.file).map(p => p.file as File);
     setImages(newFilesOnly);
  }, [previews, setImages]);

  // Handlers
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
    setPreviews(prev => prev.filter((_, i) => i !== index));
    // Nota: Para borrar existentes de la DB se requiere lógica extra, 
    // aquí solo los quitamos de la vista y del array de subida si son nuevos.
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

  return (
    <div className="animate-in fade-in">
       
       {/* HEADER VISUAL (MINI-THUMBNAIL DE PORTADA) */}
       {previews.length > 0 && (
          <div className="bg-[#0A192F] rounded-xl overflow-hidden shadow-lg flex items-center p-3 gap-3 border border-blue-900 mb-6 ring-2 ring-blue-500/20">
             <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/20 shrink-0 bg-black relative">
                <img 
                   src={previews[0].url} 
                   className="w-full h-full object-cover" 
                   style={{ transform: `rotate(${previews[0].rotate}deg)` }}
                />
             </div>
             <div className="flex-1 min-w-0">
                <div className="bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded w-fit mb-1 uppercase tracking-wider flex items-center gap-1">
                   <CheckCircle size={8}/> Portada Actual
                </div>
                <p className="text-white text-xs font-bold truncate">{watch("title") || "Sin Título"}</p>
                <p className="text-gray-400 text-[10px] uppercase font-mono">
                   {previews.length} FOTO{previews.length !== 1 ? "S" : ""}
                </p>
             </div>
          </div>
       )}

       {/* ÁREA DE CARGA */}
       <div className="flex justify-between items-end mb-4">
          <div>
             <span className="text-xs font-bold uppercase text-gray-500">Galería Fotográfica</span>
             <p className="text-[10px] text-gray-400">Arrastra para ordenar. La #1 es la portada.</p>
          </div>
          <label className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer shadow-md flex items-center gap-2 transition-all">
             <Upload size={12}/> AGREGAR
             <input type="file" multiple onChange={handleFiles} className="hidden" accept="image/*"/>
          </label>
       </div>

       {/* GRID DRAG & DROP */}
       <div className="grid grid-cols-3 gap-2">
          {previews.map((img, index) => (
             <div 
                key={index} 
                className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
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
                />
                
                {/* CONTROLES OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-1.5">
                   <div className="flex justify-between items-start">
                      <span className="bg-black/60 backdrop-blur text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                         #{index + 1}
                      </span>
                      <button type="button" onClick={() => removeImg(index)} className="bg-red-500 text-white p-1 rounded hover:bg-red-600 shadow-sm transition-colors">
                         <Trash2 size={10}/>
                      </button>
                   </div>
                   <button type="button" onClick={() => rotateImg(index)} className="self-center bg-white/20 backdrop-blur text-white p-1.5 rounded-full hover:bg-blue-600 transition-colors">
                      <RotateCw size={12}/>
                   </button>
                </div>

                {/* ETIQUETA PORTADA */}
                {index === 0 && (
                   <div className="absolute bottom-0 w-full bg-blue-600/90 backdrop-blur text-white text-[7px] font-black text-center py-1 uppercase tracking-widest border-t border-blue-400">
                      PORTADA
                   </div>
                )}
             </div>
          ))}
          
          {/* PLACEHOLDER SI ESTÁ VACÍO */}
          {previews.length === 0 && (
             <div className="col-span-3 h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300">
                <Upload size={24} className="mb-2 opacity-50"/>
                <span className="text-[10px] font-bold">Sin imágenes</span>
             </div>
          )}
       </div>
    </div>
  );
}