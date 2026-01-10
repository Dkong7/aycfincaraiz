// src/components/property/GallerySection.tsx
import React from "react";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection({ mediaList, activeImg, setActiveImg, lightboxOpen, setLightboxOpen }: any) {
  
  if (mediaList.length <= 1) return null;

  const nextImage = (e?: any) => {
    e?.stopPropagation();
    setActiveImg((prev: number) => (prev + 1) % mediaList.length);
  };
  
  const prevImage = (e?: any) => {
    e?.stopPropagation();
    setActiveImg((prev: number) => (prev - 1 + mediaList.length) % mediaList.length);
  };

  return (
    <>
        {/* GRID PEQUEÑA */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
            <h3 className="text-sm font-black uppercase text-gray-400 mb-4 tracking-widest">Galería Completa</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mediaList.map((media: any, i: number) => (
                    <div key={i} onClick={() => { setActiveImg(i); setLightboxOpen(true); }} 
                        className={`aspect-square rounded-xl overflow-hidden cursor-pointer transition-all border-4 relative ${activeImg === i ? "border-green-500 shadow-lg scale-95" : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"}`}>
                    {media.type === 'video' ? (
                        <>
                            <img src={media.thumb} className="w-full h-full object-cover" alt="video thumb"/>
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><Play size={32} className="text-white fill-white"/></div>
                            <div className="absolute bottom-0 w-full bg-red-600 text-white text-[10px] text-center font-bold">VIDEO</div>
                        </>
                    ) : (
                        <img src={media.src} className="w-full h-full object-cover" alt="gallery"/>
                    )}
                    </div>
                ))}
            </div>
        </div>

        {/* LIGHTBOX MODAL */}
        {lightboxOpen && (
            <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center animate-in fade-in duration-200" onClick={() => setLightboxOpen(false)}>
                <button onClick={() => setLightboxOpen(false)} className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-50"><X size={32} /></button>
                <button onClick={prevImage} className="absolute left-4 md:left-8 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-50"><ChevronLeft size={48} /></button>

                <div className="relative max-w-[90vw] max-h-[85vh] w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    {mediaList[activeImg].type === 'video' ? (
                        <iframe 
                            className="w-full h-[60vh] md:h-[80vh] shadow-2xl rounded-lg"
                            src={`https://www.youtube.com/embed/${mediaList[activeImg].src}?autoplay=1`}
                            title="Lightbox Video"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img 
                            src={mediaList[activeImg].src} 
                            className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                            alt={`Galería ${activeImg + 1}`}
                        />
                    )}
                    <div className="absolute bottom-[-40px] left-0 w-full text-center text-white/50 text-sm font-mono tracking-widest">
                        {activeImg + 1} / {mediaList.length} {mediaList[activeImg].type === 'video' ? '(VIDEO)' : ''}
                    </div>
                </div>

                <button onClick={nextImage} className="absolute right-4 md:right-8 text-white/50 hover:text-white p-4 hover:bg-white/10 rounded-full transition-all z-50"><ChevronRight size={48} /></button>
            </div>
        )}
    </>
  );
}