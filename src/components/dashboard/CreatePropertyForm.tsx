import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { pb } from "../../api";
import { 
  Save, ArrowLeft, X, CheckCircle, MapPin, DollarSign, User, 
  Bed, Bath, Car, Ruler, Layers, Calendar, Utensils, 
  Maximize, Receipt, Shield, Key, Droplet, Zap, AlignJustify,
  Building, Eye, ArrowUpFromLine, FileText, Flame, Phone, Warehouse, Image as ImageIcon,
  Briefcase, Youtube, PlayCircle
} from "lucide-react";
import { SuccessModal } from "../SuccessModal";

import TypeSelector from "./forms/TypeSelector";
import BasicInfo from "./forms/BasicInfo";
import FinancialInfo from "./forms/FinancialInfo";
import PrivateInfo from "./forms/PrivateInfo";
import GalleryUpload from "./forms/GalleryUpload";

import HouseSpecs from "./forms/HouseSpecs";
import ApartmentSpecs from "./forms/ApartmentSpecs";
import BodegaSpecs from "./forms/BodegaSpecs";
import RuralSpecs from "./forms/RuralSpecs";
import LoteSpecs from "./forms/LoteSpecs";
import OfficeSpecs from "./forms/OfficeSpecs";
import LocalSpecs from "./forms/LocalSpecs";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

// Interfaz para lista mixta del modal
interface PreviewItem {
  type: 'video' | 'image';
  id?: string | null;
  url?: string;
}

export default function CreatePropertyForm({ theme, initialData, onSuccess }: any) {
  const [activeType, setActiveType] = useState<string | null>(initialData?.property_type || null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // ESTADOS DE IMÁGENES
  const [images, setImages] = useState<File[]>([]); 
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [sortedPreviewUrls, setSortedPreviewUrls] = useState<string[]>([]);
  
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  const { register, control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: { 
      property_type: initialData?.property_type || "", 
      specs: { levels_list: [], has_rent: false, has_social: false }, 
      ...initialData 
    }
  });

  const s = ((t) => {
    if(t === "claudia") return { card: "bg-white border-pink-200 text-gray-800", btn: "bg-pink-600 hover:bg-pink-700 text-white", label: "text-pink-600", modalHead: "bg-pink-50 text-pink-700", iconText: "text-pink-500", iconBg: "bg-pink-50" };
    if(t === "alfonso") return { card: "bg-[#FDFBF7] border-[#8D6E63] text-[#3E2723] shadow-xl", btn: "bg-[#5D4037] hover:bg-[#3E2723] text-[#FFE0B2] border border-[#8D6E63]", label: "text-[#BF360C]", modalHead: "bg-[#EFEBE9] text-[#5D4037]", iconText: "text-[#BF360C]", iconBg: "bg-[#FBE9E7]" };
    return { card: "bg-white border-gray-200 text-gray-900", btn: "bg-[#009B4D] hover:bg-[#007a3d] text-white", label: "text-[#0A192F]", modalHead: "bg-gray-50 text-gray-800", iconText: "text-[#009B4D]", iconBg: "bg-green-50" };
  })(theme);

  useEffect(() => {
    if (initialData) {
      let parsedSpecs = initialData.specs;
      if (typeof initialData.specs === 'string') { try { parsedSpecs = JSON.parse(initialData.specs); } catch(e) {} }
      reset({ ...initialData, specs: parsedSpecs });
    }
  }, [initialData, reset]);

  const getLabel = (key: string) => {
      const labels: any = { habs: "Habs", rooms: "Habs", baths: "Baños", bathrooms: "Baños", garages: "Garajes", area_built: "Área", area_private: "Privada", area_lot: "Lote", kitchen: "Cocina", stratum: "Estrato", admin: "Admin" };
      return labels[key] || key;
  };
  const getValue = (val: any) => (val === true ? "Sí" : val === false ? "No" : val || "-");

  const getIconElement = (key: string) => {
      const size = 18;
      const icons: any = {
          habs: <Bed size={size}/>, rooms: <Bed size={size}/>, baths: <Bath size={size}/>, bathrooms: <Bath size={size}/>, 
          garages: <Car size={size}/>, area_built: <Ruler size={size}/>, area_private: <Maximize size={size}/>, 
          kitchen: <Utensils size={size}/>, admin: <Receipt size={size}/>, stratum: <Layers size={size}/>
      };
      return icons[key] || <AlignJustify size={size}/>;
  };

  const onPreSubmit = (data: any) => { 
      if(!data.title) { alert("Ingresa un título."); return; }
      setPendingData(data); 
      setShowPreviewModal(true); 
  };

  const handleFinalSave = async () => {
    if (!pendingData) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", pendingData.title);
      formData.append("property_type", activeType || "Casa");
      formData.append("listing_type", pendingData.listing_type || "Venta"); // CRÍTICO: Agregado para evitar error
      formData.append("video_url", pendingData.video_url || "");
      formData.append("description", pendingData.description || "");
      
      const cleanNumber = (val: any) => String(Number(String(val || "0").replace(/\./g, "")) || 0);
      formData.append("price_cop", cleanNumber(pendingData.price_cop));
      formData.append("price_usd", cleanNumber(pendingData.price_usd));
      
      if(!initialData) formData.append("ayc_id", "AYC-" + Math.floor(Math.random()*9000+1000));

      // --- GUARDAR ORDEN DE GALERÍA EN SPECS ---
      const galleryOrder = sortedPreviewUrls.map(url => {
          if (url.startsWith("blob:")) return null; // Las nuevas no tienen nombre aún en DB
          try {
             const parts = url.split("/"); // Extraemos el nombre del archivo de la URL
             return parts[parts.length - 1]; 
          } catch (e) { return null; }
      }).filter(Boolean);

      // Guardamos el orden dentro del objeto specs
      formData.append("specs", JSON.stringify({ ...pendingData.specs, gallery_order: galleryOrder })); 
      
      // Datos extra
      formData.append("municipality", pendingData.municipality || "Bogotá");
      formData.append("neighborhood", pendingData.neighborhood || "");
      formData.append("address_text", pendingData.address_visible || "");
      
      // Privados
      formData.append("owner_name", pendingData.owner_name || "");
      formData.append("owner_phone", pendingData.owner_phone || "");
      formData.append("owner_email", pendingData.owner_email || "");
      formData.append("address_private", pendingData.address_private || "");

      if (pendingData.specs.legal_status && Array.isArray(pendingData.specs.legal_status)) {
          formData.append("legal_status", pendingData.specs.legal_status.join(", "));
      }

      if (pb.authStore.model?.id) formData.append("agent", pb.authStore.model.id);
      
      // Manejo de Imágenes (Borrar y Agregar)
      if (initialData && deletedImages.length > 0) deletedImages.forEach(id => formData.append("images-", id));
      images.forEach(file => formData.append("images", file));

      if (initialData) await pb.collection("properties").update(initialData.id, formData);
      else await pb.collection("properties").create(formData);
      
      setShowPreviewModal(false);
      setShowSuccessModal(true);
    } catch (e: any) { 
        const msg = e.data ? JSON.stringify(e.data, null, 2) : e.message;
        alert(`Error al guardar:\n${msg}`); 
        setLoading(false); 
    }
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (!activeType) return <TypeSelector onSelect={(t) => { setValue("property_type", t); setActiveType(t); }} />;

  // Preview List Unificada (Video Primero)
  const finalPreviewList: PreviewItem[] = [
      ...(pendingData?.video_url && getYoutubeId(pendingData.video_url) ? [{ type: 'video' as const, id: getYoutubeId(pendingData.video_url) }] : []),
      ...sortedPreviewUrls.map(url => ({ type: 'image' as const, url }))
  ];

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} message="Publicación exitosa." onClose={() => { setShowSuccessModal(false); if(onSuccess) onSuccess(); }} />
      
      <form onSubmit={handleSubmit(onPreSubmit)} className={`max-w-7xl mx-auto p-8 rounded-3xl border ${s.card} space-y-8 animate-in slide-in-from-bottom-4`}>
         <div className="flex justify-between items-center border-b pb-6 border-gray-200/20">
           <button type="button" onClick={() => setActiveType(null)} className={`text-xs font-bold uppercase flex items-center gap-2 hover:opacity-70 ${s.label}`}><ArrowLeft size={16}/> Cambiar Tipo</button>
           <div className="text-right"><h1 className="text-2xl font-black uppercase tracking-widest">{initialData ? "Editar" : "Nuevo"} {activeType}</h1></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm"><BasicInfo register={register} setValue={setValue} getValues={getValues} s={s} /></div>
              <div className="bg-[#064e3b] border border-green-800 p-6 rounded-xl shadow-md"><FinancialInfo register={register} setValue={setValue} s={s} /></div>
              {/* Specs Forms */}
              {activeType === "Casa" && <div className="p-6 border-l-4 border-yellow-500 bg-yellow-50/10 rounded-xl shadow-sm"><HouseSpecs register={register} control={control} watch={watch} s={s} /></div>}
              {activeType === "Apartamento" && <div className="p-6 border-l-4 border-blue-500 bg-blue-50/10 rounded-xl shadow-sm"><ApartmentSpecs register={register} watch={watch} s={s} /></div>}
              {activeType === "Bodega" && <div className="p-6 border-l-4 border-amber-600 bg-amber-50/10 rounded-xl shadow-sm"><BodegaSpecs register={register} s={s} /></div>}
              {(activeType === "Finca" || activeType === "Rural" || activeType === "Casa Campestre") && <div className="p-6 border-l-4 border-purple-500 bg-purple-50/10 rounded-xl shadow-sm"><RuralSpecs register={register} s={s} /></div>}
              {(activeType === "Lote" || activeType === "Terreno") && <div className="p-6 border-l-4 border-gray-500 bg-gray-50/10 rounded-xl shadow-sm"><LoteSpecs register={register} s={s} /></div>}
              {activeType === "Oficina" && <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50/10 rounded-xl shadow-sm"><OfficeSpecs register={register} s={s} /></div>}
              {activeType === "Local" && <div className="p-6 border-l-4 border-pink-500 bg-pink-50/10 rounded-xl shadow-sm"><LocalSpecs register={register} s={s} /></div>}
           </div>

           <div className="space-y-6">
              <div className="p-6 border border-red-100 bg-red-50/30 rounded-xl shadow-sm"><PrivateInfo register={register} activeType={activeType} initialData={initialData} /></div>
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                  <GalleryUpload setImages={setImages} setDeletedImages={setDeletedImages} onPreviewChange={setSortedPreviewUrls} initialData={initialData} register={register} watch={watch} />
              </div>
              <button disabled={loading} className={`w-full py-4 rounded-xl font-black text-lg uppercase shadow-xl transition-transform active:scale-95 text-white flex items-center justify-center gap-2 ${s.btn}`}><Save size={20}/> REVISAR Y GUARDAR</button>
           </div>
        </div>
      </form>

      {/* --- MODAL DE PREVIEW ENRIQUECIDO --- */}
      {showPreviewModal && pendingData && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative">
                  <div className={`p-6 border-b flex justify-between items-center ${s.modalHead}`}>
                      <div><h3 className="text-xl font-black uppercase">Confirmar Datos</h3><p className="text-xs opacity-70">Verificación final</p></div>
                      <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors"><X size={20}/></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-700">
                      
                      {/* 1. HEADER & PRECIO */}
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div>
                              <h4 className="font-black text-2xl md:text-3xl text-gray-900 leading-tight mb-2">{pendingData.title || "Sin Título"}</h4>
                              <div className="flex gap-2">
                                  <span className="text-xs uppercase bg-gray-100 px-3 py-1 rounded-full font-bold text-gray-600">{activeType}</span>
                                  <div className="flex items-center gap-1 text-gray-500 text-xs px-2"><MapPin size={14}/> {pendingData.neighborhood}</div>
                              </div>
                          </div>
                          <div className="text-left md:text-right">
                              <p className="text-xs text-gray-400 font-bold uppercase mb-1">Precio de Venta</p>
                              <div className="flex items-center gap-1 text-green-600 font-black text-2xl md:text-3xl">
                                <DollarSign size={24}/> {Number((pendingData.price_cop || "0").toString().replace(/\./g, "")).toLocaleString('es-CO')}
                              </div>
                          </div>
                      </div>

                      {/* 2. BARRA DE ÍCONOS COMPLETA (ICONOS SOLICITADOS) */}
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                          <p className="text-[10px] font-bold uppercase text-gray-400 mb-3">Características Principales</p>
                          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
                               {['habs', 'baths', 'garages', 'area_built', 'kitchen', 'stratum', 'admin'].map(key => {
                                   if (!pendingData.specs[key]) return null;
                                   return (
                                        <div key={key} className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg w-20 h-20 shrink-0 shadow-sm">
                                             <div className={`mb-1 ${s.iconText}`}>{getIconElement(key)}</div>
                                             <span className="block font-black text-gray-800 text-sm">{getValue(pendingData.specs[key])}</span>
                                             <span className="text-[9px] text-gray-400 uppercase tracking-tight">{getLabel(key)}</span>
                                        </div>
                                   );
                               })}
                          </div>
                      </div>

                      {/* 3. DESCRIPCIÓN DEL ANUNCIO */}
                      {pendingData.description && (
                          <div>
                              <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Descripción del Anuncio</p>
                              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                                  {pendingData.description}
                              </div>
                          </div>
                      )}

                      {/* 4. GALERÍA VISUAL (VIDEO FIRST) */}
                      {finalPreviewList.length > 0 && (
                          <div>
                              <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Orden de Galería (Portada a la izquierda)</p>
                              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-200">
                                  {finalPreviewList.map((item, i) => (
                                      <div key={i} className={`relative w-28 h-20 shrink-0 rounded-lg overflow-hidden border-2 ${i===0 ? "border-green-500 ring-2 ring-green-100" : "border-gray-200"}`}>
                                          {item.type === 'video' ? (
                                              <>
                                                <img src={`https://img.youtube.com/vi/${item.id}/default.jpg`} className="w-full h-full object-cover"/>
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center"><Youtube size={24} className="text-white"/></div>
                                                <div className="absolute bottom-0 w-full bg-red-600 text-white text-[8px] px-1 font-bold text-center">VIDEO</div>
                                              </>
                                          ) : (
                                              <img src={item.url} className="w-full h-full object-cover"/>
                                          )}
                                          <div className="absolute top-0 left-0 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg">{i === 0 ? "PORTADA" : `#${i+1}`}</div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )}

                      {/* 5. DATOS PRIVADOS */}
                      <div className="border-t pt-4 mt-2">
                          <p className="text-[10px] font-bold uppercase text-red-400 mb-2">Datos Privados (Solo Interno)</p>
                          <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                              <div><span className="font-bold">Propietario:</span> {pendingData.owner_name}</div>
                              <div><span className="font-bold">Teléfono:</span> {pendingData.owner_phone}</div>
                              <div className="col-span-2"><span className="font-bold">Dir. Exacta:</span> {pendingData.address_private}</div>
                          </div>
                      </div>
                  </div>

                  <div className="p-6 border-t bg-white flex justify-end gap-3 z-10">
                      <button onClick={() => setShowPreviewModal(false)} className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors uppercase text-xs">Corregir</button>
                      <button onClick={handleFinalSave} disabled={loading} className={`px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center gap-2 uppercase text-xs ${s.btn}`}>{loading ? "Subiendo..." : <><CheckCircle size={16}/> Confirmar</>}</button>
                  </div>
              </div>
          </div>
      )}
    </>
  );
}