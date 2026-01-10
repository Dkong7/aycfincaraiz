import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { pb } from "../../api";
import { Save, ArrowLeft } from "lucide-react";
import { SuccessModal } from "../SuccessModal"; // Ajuste ruta según tu tree (está en components)
import { getUserTheme } from "../../utils/formatters"; 

// Importamos el nuevo componente Modal
import PropertyPreviewModal from "../admin/PropertyPreviewModal";

// Importamos los formularios (están en la carpeta ./forms relativa a este archivo)
import TypeSelector from "./forms/TypeSelector";
import BasicInfo from "./forms/BasicInfo";
import FinancialInfo from "./forms/FinancialInfo";
import PrivateInfo from "./forms/PrivateInfo";
import GalleryUpload from "./forms/GalleryUpload";

// Importamos los Specs
import HouseSpecs from "./forms/HouseSpecs";
import ApartmentSpecs from "./forms/ApartmentSpecs";
import BodegaSpecs from "./forms/BodegaSpecs";
import RuralSpecs from "./forms/RuralSpecs";
import LoteSpecs from "./forms/LoteSpecs";
import OfficeSpecs from "./forms/OfficeSpecs";
import LocalSpecs from "./forms/LocalSpecs";

export default function CreatePropertyForm({ initialData, onSuccess }: any) {
  const [activeType, setActiveType] = useState<string | null>(initialData?.property_type || null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // ESTADOS DE IMÁGENES
  const [images, setImages] = useState<File[]>([]); 
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [sortedPreviewUrls, setSortedPreviewUrls] = useState<string[]>([]);
  
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  // OBTENER TEMA (Usando tu lógica unificada)
  const userEmail = pb.authStore.model?.email;
  const { classes: s } = getUserTheme(userEmail); 

  const { register, control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: { 
      property_type: initialData?.property_type || "", 
      specs: { levels_list: [], has_rent: false, has_social: false }, 
      status: "borrador", // DEFAULT STATUS
      ...initialData 
    }
  });

  useEffect(() => {
    if (initialData) {
      let parsedSpecs = initialData.specs;
      if (typeof initialData.specs === 'string') { try { parsedSpecs = JSON.parse(initialData.specs); } catch(e) {} }
      reset({ ...initialData, specs: parsedSpecs });
    }
  }, [initialData, reset]);

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
      formData.append("listing_type", pendingData.listing_type || "Venta");
      formData.append("video_url", pendingData.video_url || "");
      formData.append("description", pendingData.description || "");
      
      // Status management
      formData.append("status", pendingData.status || "borrador");

      const cleanNumber = (val: any) => String(Number(String(val || "0").replace(/\./g, "")) || 0);
      formData.append("price_cop", cleanNumber(pendingData.price_cop));
      formData.append("price_usd", cleanNumber(pendingData.price_usd));
      
      if(!initialData) formData.append("ayc_id", "AYC-" + Math.floor(Math.random()*9000+1000));

      // --- GUARDAR ORDEN DE GALERÍA EN SPECS ---
      const galleryOrder = sortedPreviewUrls.map(url => {
          if (url.startsWith("blob:")) return null; 
          try {
             const parts = url.split("/"); 
             return parts[parts.length - 1]; 
          } catch (e) { return null; }
      }).filter(Boolean);

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

  if (!activeType) return <TypeSelector onSelect={(t: string) => { setValue("property_type", t); setActiveType(t); }} />;

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} message="Publicación exitosa." onClose={() => { setShowSuccessModal(false); if(onSuccess) onSuccess(); }} />
      
<form onSubmit={handleSubmit(onPreSubmit)} className={`max-w-7xl mx-auto p-8 rounded-3xl border space-y-8 animate-in slide-in-from-bottom-4 shadow-xl ${s.bg} ${s.border}`}>         <div className="flex justify-between items-center border-b pb-6 border-gray-200/20">
           <button type="button" onClick={() => setActiveType(null)} className={`text-xs font-bold uppercase flex items-center gap-2 hover:opacity-70 ${s.text}`}><ArrowLeft size={16}/> Cambiar Tipo</button>
           <div className="text-right"><h1 className="text-2xl font-black uppercase tracking-widest">{initialData ? "Editar" : "Nuevo"} {activeType}</h1></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm"><BasicInfo register={register} setValue={setValue} getValues={getValues} s={s} /></div>
              <div className="bg-[#064e3b] border border-green-800 p-6 rounded-xl shadow-md"><FinancialInfo register={register} setValue={setValue} s={s} /></div>
              
              {/* Specs Forms Dinámicos */}
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
              <button disabled={loading} className={`w-full py-4 rounded-xl font-black text-lg uppercase shadow-xl transition-transform active:scale-95 text-white flex items-center justify-center gap-2 ${s.bg} ${s.border}`}><Save size={20}/> REVISAR Y GUARDAR</button>
           </div>
        </div>
      </form>

      {/* --- EL MODAL LIMPIO --- */}
      {showPreviewModal && pendingData && activeType && (
          <PropertyPreviewModal 
              data={pendingData}
              activeType={activeType}
              onClose={() => setShowPreviewModal(false)}
              onConfirm={handleFinalSave}
              loading={loading}
              sortedPreviewUrls={sortedPreviewUrls}
          />
      )}
    </>
  );
}