import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeft, ChevronRight, Maximize2, X, Play, Youtube, Grid3X3
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types — matches PropertyDetail.tsx mediaList format exactly
// ─────────────────────────────────────────────────────────────────────────────
interface VideoMedia {
  type: "video";
  src: string;          // YouTube video ID
  embed: string;        // Full embed URL
  thumb: string;        // Thumbnail URL
  isCover: boolean;
  playlistLabel?: boolean;
}
interface ImageMedia { type: "image"; src: string; }
type MediaItem = VideoMedia | ImageMedia;

interface GallerySectionProps {
  mediaList: MediaItem[];
  activeImg: number;
  setActiveImg: (i: number) => void;
  lightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Portrait detection — determines object-fit strategy
// ─────────────────────────────────────────────────────────────────────────────
function useIsPortrait(src: string): boolean {
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    if (!src || src.includes("placeholder") || src.includes("youtube")) return;
    const img = new Image();
    img.onload = () => setPortrait(img.naturalHeight > img.naturalWidth * 1.15);
    img.src = src;
  }, [src]);
  return portrait;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero media renderer
// ─────────────────────────────────────────────────────────────────────────────
function HeroMedia({ item, playing, onPlay }: {
  item: MediaItem; playing: boolean; onPlay: () => void;
}) {
  const portrait = useIsPortrait(item.type === "image" ? item.src : "");

  if (item.type === "video") {
    if (playing) return (
      <iframe
        src={`${(item as VideoMedia).embed}?autoplay=1&rel=0&modestbranding=1`}
        className="absolute inset-0 w-full h-full border-0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen title="Video"
      />
    );
    const v = item as VideoMedia;
    return (
      <div className="absolute inset-0 cursor-pointer" onClick={onPlay}>
        <img src={v.thumb} className="w-full h-full object-cover" alt="Video"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500 rounded-full scale-150 opacity-20 animate-ping"/>
            <div className="relative w-20 h-20 bg-emerald-600 hover:bg-emerald-500 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95">
              <Play size={30} className="text-white ml-1.5" fill="white"/>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full">
          <Youtube size={14} className="text-red-400"/>
          {v.playlistLabel ? "VER PLAYLIST" : "VER VIDEO"}
        </div>
      </div>
    );
  }

  // Image
  return (
    <img
      src={item.src}
      className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
        portrait ? "object-contain bg-gray-950" : "object-cover"
      }`}
      alt="Foto inmueble"
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Thumbnail strip item
// ─────────────────────────────────────────────────────────────────────────────
function Thumb({ item, index, active, onClick }: {
  item: MediaItem; index: number; active: boolean; onClick: () => void;
}) {
  const src = item.type === "video" ? (item as VideoMedia).thumb : item.src;
  return (
    <button
      onClick={onClick}
      className={`group relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none
        ${active
          ? "w-28 h-[4.5rem] ring-2 ring-emerald-400 ring-offset-2 ring-offset-gray-950 opacity-100 scale-100"
          : "w-24 h-16 opacity-50 hover:opacity-80 hover:scale-105"
        }`}
    >
      <img src={src} className="w-full h-full object-cover" alt="" loading="lazy"/>
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-red-600/90 rounded-full p-1.5 shadow">
            <Play size={10} fill="white" className="text-white"/>
          </div>
        </div>
      )}
      {active && (
        <div className="absolute inset-0 ring-inset ring-2 ring-emerald-400 rounded-lg pointer-events-none"/>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-1 px-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-white text-[9px] font-bold">
          {item.type === "video" ? "VIDEO" : `#${index + 1}`}
        </span>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Full-screen lightbox
// ─────────────────────────────────────────────────────────────────────────────
function Lightbox({ items, startAt, onClose }: {
  items: MediaItem[]; startAt: number; onClose: () => void;
}) {
  const [idx, setIdx]       = useState(startAt);
  const [playing, setPlaying] = useState(false); // never autoplay on lightbox open
  const total = items.length;
  const item = items[idx];

  const go = useCallback((dir: number) => {
    const next = (idx + dir + total) % total;
    setPlaying(false);
    setIdx(next);
  }, [idx, total]);

  // Reset playing when switching items
  useEffect(() => { setPlaying(false); }, [idx]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft")  go(-1);
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [go, onClose]);

  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    (rail.children[idx] as HTMLElement)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [idx]);

  const portrait = useIsPortrait(item?.type === "image" ? item.src : "");

  return (
    <div
      className="fixed inset-0 z-[500] bg-black flex flex-col"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          {item.type === "video" && (
            <span className="flex items-center gap-1.5 bg-emerald-600/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-600/30">
              <Youtube size={12}/> VIDEO
            </span>
          )}
          <span className="text-white/40 text-sm font-mono">
            {idx + 1} <span className="text-white/20">/</span> {total}
          </span>
        </div>
        <button onClick={onClose}
          className="bg-emerald-900/40 hover:bg-emerald-700/60 text-white p-2 rounded-full transition-colors">
          <X size={20}/>
        </button>
      </div>

      {/* Main viewer */}
      <div className="flex-1 flex items-center justify-center px-4 min-h-0" onClick={onClose}>
        <div
          className={`relative w-full ${portrait && item.type === "image" ? "max-h-[70vh] max-w-xl" : "max-w-5xl"}`}
          style={{ aspectRatio: portrait && item.type === "image" ? undefined : "16/9" }}
          onClick={e => e.stopPropagation()}
        >
          <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden shadow-2xl">
            <HeroMedia item={item} playing={playing} onPlay={() => setPlaying(true)}/>
            {total > 1 && !playing && (
              <>
                <button onClick={() => go(-1)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#0A192F]/80 hover:bg-emerald-700/80 text-white p-3 rounded-full transition-all backdrop-blur-sm z-10 shadow-lg">
                  <ChevronLeft size={22}/>
                </button>
                <button onClick={() => go(1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A192F]/80 hover:bg-emerald-700/80 text-white p-3 rounded-full transition-all backdrop-blur-sm z-10 shadow-lg">
                  <ChevronRight size={22}/>
                </button>
              </>
            )}
            {playing && (
              <button onClick={() => setPlaying(false)}
                className="absolute top-3 right-3 bg-black/70 text-white p-2 rounded-full z-20 hover:bg-black/90 transition-colors">
                <X size={16}/>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Thumbnail rail */}
      <div className="flex-shrink-0 px-4 pb-4 pt-3" onClick={e => e.stopPropagation()}>
        <div ref={railRef} className="flex gap-2 overflow-x-auto justify-center pb-1" style={{ scrollbarWidth: "none" }}>
          {items.map((it, i) => (
            <button key={i} onClick={() => { setIdx(i); setPlaying(false); }}
              className={`relative flex-shrink-0 w-16 h-11 rounded-lg overflow-hidden transition-all border-2
                ${i === idx ? "border-emerald-400 opacity-100 scale-110" : "border-transparent opacity-40 hover:opacity-70"}`}>
              <img src={it.type === "video" ? (it as VideoMedia).thumb : it.src}
                className="w-full h-full object-cover" alt="" loading="lazy"/>
              {it.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play size={8} fill="white" className="text-white"/>
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-center text-emerald-900/40 text-[10px] mt-2 font-mono">← → navegar · ESC cerrar</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export default function GallerySection({
  mediaList, activeImg, setActiveImg, lightboxOpen, setLightboxOpen,
}: GallerySectionProps) {
  const [playing, setPlaying]     = useState(false);
  const [gridView, setGridView]   = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const total = mediaList.length;

  // Filter out single placeholder
  const isOnlyPlaceholder = total === 0 || (total === 1 && mediaList[0]?.src?.includes("placeholder"));
  if (isOnlyPlaceholder) return null;

  const go = useCallback((dir: number) => {
    setPlaying(false);
    setActiveImg((activeImg + dir + total) % total);
  }, [activeImg, total, setActiveImg]);

  useEffect(() => {
    const rail = railRef.current; if (!rail) return;
    (rail.children[activeImg] as HTMLElement)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeImg]);

  useEffect(() => { setPlaying(false); }, [activeImg]);

  const current = mediaList[activeImg];
  const imageCount = mediaList.filter(m => m.type === "image").length;
  const videoCount = mediaList.filter(m => m.type === "video").length;

  return (
    <>
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* ── Hero viewer ──────────────────────────────────────────── */}
        <div className="relative bg-[#0A192F] cursor-pointer" style={{ aspectRatio: "16/9" }}
          onClick={() => { if (!playing) setLightboxOpen(true); }}>
          <HeroMedia item={current} playing={playing} onPlay={() => setPlaying(true)}/>

          {!playing && (
            <>
              {/* Nav arrows */}
              {total > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); go(-1); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#0A192F]/70 hover:bg-emerald-700/80 text-white p-2.5 rounded-full transition-all backdrop-blur-sm shadow-lg z-10 active:scale-90">
                    <ChevronLeft size={20}/>
                  </button>
                  <button onClick={e => { e.stopPropagation(); go(1); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0A192F]/70 hover:bg-emerald-700/80 text-white p-2.5 rounded-full transition-all backdrop-blur-sm shadow-lg z-10 active:scale-90">
                    <ChevronRight size={20}/>
                  </button>
                </>
              )}

              {/* Top-right actions */}
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                {imageCount > 4 && (
                  <button onClick={e => { e.stopPropagation(); setGridView(true); }}
                    className="bg-[#0A192F]/70 hover:bg-emerald-700/80 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow" title="Ver todas">
                    <Grid3X3 size={15}/>
                  </button>
                )}
                <button onClick={e => { e.stopPropagation(); setPlaying(false); setLightboxOpen(true); }}
                  className="bg-[#0A192F]/70 hover:bg-emerald-700/80 text-white p-2 rounded-full backdrop-blur-sm transition-all shadow" title="Pantalla completa">
                  <Maximize2 size={15}/>
                </button>
              </div>

              {/* Bottom-left counter */}
              <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                <span className="bg-[#0A192F]/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                  {activeImg + 1} / {total}
                </span>
                {videoCount > 0 && (
                  <span className="bg-emerald-700/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow flex items-center gap-1">
                    <Youtube size={11}/> {videoCount} video{videoCount > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </>
          )}

          {playing && (
            <button onClick={e => { e.stopPropagation(); setPlaying(false); }}
              className="absolute top-3 right-3 bg-black/60 text-white p-2 rounded-full z-20 hover:bg-black/80 transition-colors">
              <X size={16}/>
            </button>
          )}
        </div>

        {/* ── Thumbnail strip ──────────────────────────────────────── */}
        {total > 1 && (
          <div className="px-4 py-3 bg-[#0A192F] border-t border-emerald-900/30">
            <div ref={railRef} className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              {mediaList.map((item, i) => (
                <Thumb key={i} item={item} index={i} active={i === activeImg}
                  onClick={() => { setActiveImg(i); setPlaying(false); }}/>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Grid view overlay ───────────────────────────────────────── */}
      {gridView && (
        <div className="fixed inset-0 z-[400] bg-black overflow-y-auto p-6" onClick={() => setGridView(false)}>
          <div className="max-w-4xl mx-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <p className="text-white font-black text-lg uppercase tracking-wider">
                Todas las fotos · {imageCount}
              </p>
              <button onClick={() => setGridView(false)}
                className="text-white/60 hover:text-white p-2 bg-emerald-900/40 hover:bg-emerald-700/60 rounded-full transition-colors">
                <X size={20}/>
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {mediaList.map((item, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => { setActiveImg(i); setPlaying(false); setGridView(false); setLightboxOpen(true); }}>
                  <img
                    src={item.type === "video" ? (item as VideoMedia).thumb : item.src}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt="" loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    {item.type === "video" && (
                      <div className="bg-red-600 rounded-full p-2 shadow opacity-80">
                        <Play size={18} fill="white" className="text-white"/>
                      </div>
                    )}
                  </div>
                  <div className="absolute top-2 left-2 bg-black/60 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {item.type === "video" ? "VIDEO" : `#${i + 1}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Lightbox ─────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <Lightbox items={mediaList} startAt={activeImg} onClose={() => { setLightboxOpen(false); setPlaying(false); }}/>
      )}
    </>
  );
}