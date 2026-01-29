import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; 
import { pb } from "../../api";
import { ArrowRight, ArrowLeft, FileText, Eye, ExternalLink } from "lucide-react"; 
import { SuccessModal } from "../SuccessModal";
import { getUserTheme } from "../../utils/formatters"; 
import PropertyPreviewModal from "../admin/PropertyPreviewModal";

import TypeSelector from "./forms/TypeSelector";
import BasicInfo from "./forms/BasicInfo";
import FinancialInfo from "./forms/FinancialInfo";
import PrivateInfo from "./forms/PrivateInfo"; 
import GalleryUpload from "./forms/GalleryUpload";

import HouseForm from "../../modules/house/HouseForm";
import ApartmentForm from "../../modules/apartment/ApartmentForm";
import BodegaForm from "../../modules/bodega/BodegaForm";
import RuralForm from "../../modules/rural/RuralForm";
import LoteForm from "../../modules/lote/LoteForm";
import LocalForm from "../../modules/local/LocalForm";
import OficinaForm from "../../modules/oficina/OficinaForm";

export default function CreatePropertyForm({ initialData, onSuccess }: any) {
  const [activeType, setActiveType] = useState<string | null>(initialData?.property_type || null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("Publicación exitosa.");
  
  const [images, setImages] = useState<File[]>([]); 
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [sortedPreviewUrls, setSortedPreviewUrls] = useState<string[]>([]);
  
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  const userEmail = pb.authStore.model?.email;
  const { classes: s } = getUserTheme(userEmail); 

  const { register, control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: { 
      property_type: "", 
      stratum: "", 
      municipality: "Bogotá", 
      neighborhood: "",
      specs: { levels_list: [], has_rent: false, has_social: false }, 
      status: "borrador", 
      admin_fee: 0, 
      ...initialData 
    }
  });

  // --- 1. CARGA DE DATOS (FIX DE ADMIN Y FOTOS) ---
  useEffect(() => {
    if (initialData) {
      setImages([]);
      setDeletedImages([]);
      setSortedPreviewUrls([]); 
      
      let parsedSpecs: any = {};
      if (typeof initialData.specs === 'string') { 
          try { parsedSpecs = JSON.parse(initialData.specs); } catch(e) { parsedSpecs = {}; } 
      } else {
          parsedSpecs = initialData.specs || {};
      }
      
      // FIX CRÍTICO: Recuperar Admin Fee robustamente
      // A veces viene como "300.000" (string) y el input espera number.
      // A veces está en 'admin_fee' y a veces quedó guardado en 'specs.admin_fee'.
      const rawAdmin = initialData.admin_fee || parsedSpecs.admin_fee || 0;
      const cleanAdmin = Number(String(rawAdmin).replace(/\D/g, ""));

      reset({ 
          ...initialData, 
          stratum: initialData.stratum || parsedSpecs.stratum || "", 
          specs: parsedSpecs, 
          price_cop: initialData.price_cop, 
          price_usd: initialData.price_usd,
          admin_fee: cleanAdmin // Inyectamos el valor limpio
      });
    }
  }, [initialData, reset]);

  const calculateCompleteness = (data: any) => {
      let points = 0;
      if (data.title && data.title.length > 5) points++;
      if (data.municipality && data.neighborhood) points++;
      if (Number(String(data.price_cop || "0").replace(/\D/g, "")) > 0) points++;
      if (data.owner_name && data.owner_name.length > 2) points++;
      if (data.description && data.description.length > 20) points++;
      if (sortedPreviewUrls.length > 0) points++;
      return (points / 6) * 100;
  };

  const saveToBackend = async (data: any, targetStatus: string) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title || "Borrador sin título");
      formData.append("property_type", activeType || "Casa");
      formData.append("listing_type", data.listing_type || "Venta");
      formData.append("video_url", data.video_url || "");
      formData.append("description", data.description || "");
      formData.append("status", targetStatus);

      // Limpieza de números
      const cleanNumber = (val: any) => String(Number(String(val || "0").replace(/\D/g, "")) || 0);
      formData.append("price_cop", cleanNumber(data.price_cop));
      formData.append("price_usd", cleanNumber(data.price_usd));
      
      // FIX: Guardamos admin_fee asegurado
      const finalAdminFee = cleanNumber(data.admin_fee);
      formData.append("admin_fee", finalAdminFee); 
      
      let currentId = initialData?.ayc_id || "";
      if ((!currentId || currentId.includes("DRAFT")) && targetStatus === "publicado") {
          currentId = "AYC-" + Math.floor(Math.random() * 9000 + 1000);
      } else if (!currentId) {
          currentId = "DRAFT-" + Math.floor(Math.random() * 9000 + 1000);
      }
      formData.append("ayc_id", currentId);

      const galleryOrder = sortedPreviewUrls.map(url => {
          if (url.startsWith("blob:")) return null; 
          try { 
             const urlObj = new URL(url);
             const pathParts = urlObj.pathname.split("/");
             return pathParts[pathParts.length - 1]; 
          } catch (e) { return null; }
      }).filter(Boolean);

      // Guardamos admin_fee TAMBIÉN en specs como respaldo
      const finalSpecs = { 
          ...data.specs, 
          stratum: data.stratum, 
          gallery_order: galleryOrder,
          admin_fee: finalAdminFee 
      };
      
      formData.append("specs", JSON.stringify(finalSpecs)); 
      formData.append("stratum", data.stratum || ""); 
      formData.append("municipality", data.municipality || "Bogotá");
      formData.append("neighborhood", data.neighborhood || "");
      formData.append("address_text", data.address_visible || ""); 
      formData.append("owner_name", data.owner_name || "");
      formData.append("owner_phone", data.owner_phone || "");
      formData.append("owner_email", data.owner_email || "");
      formData.append("address_private", data.address_private || "");

      if (data.specs?.legal_status && Array.isArray(data.specs.legal_status)) {
          formData.append("legal_status", data.specs.legal_status.join(", "));
      }

      if (pb.authStore.model?.id) formData.append("agent", pb.authStore.model.id);
      
      if (initialData && deletedImages.length > 0) {
          const uniqueDeletes = [...new Set(deletedImages)];
          uniqueDeletes.forEach(id => formData.append("images-", id));
      }
      images.forEach(file => formData.append("images", file));

      if (initialData) await pb.collection("properties").update(initialData.id, formData);
      else await pb.collection("properties").create(formData);
      
      setImages([]); 
      setDeletedImages([]); 
      setSortedPreviewUrls([]);
      
      setSuccessMsg(targetStatus === "publicado" ? `¡Propiedad Publicada! Código: ${currentId}` : "Borrador Guardado");
      setShowPreviewModal(false);
      setShowSuccessModal(true);

    } catch (e: any) { 
        alert(`Error al guardar:\n${e.message}`); 
    } finally {
        setLoading(false);
    }
  };

  const onPreSubmit = (data: any) => { 
      if (!data.owner_name) return alert("Falta el Nombre del Propietario.");
      
      // Pasamos admin_fee explícitamente al preview
      const previewData = { 
          ...data, 
          specs: { ...data.specs, stratum: data.stratum }, 
          admin_fee: data.admin_fee 
      };
      setPendingData(previewData); 
      setShowPreviewModal(true); 
  };

  const handleFinalPublish = () => {
    if (pendingData) {
        const status = calculateCompleteness(pendingData) >= 50 ? "publicado" : "borrador";
        saveToBackend(pendingData, status);
    }
  };

  if (!activeType) return <TypeSelector onSelect={(t: string) => { setValue("property_type", t); setActiveType(t); }} />;

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} message={successMsg} onClose={() => { setShowSuccessModal(false); if(onSuccess) onSuccess(); }} />
      
      <form onSubmit={handleSubmit(onPreSubmit)} className={`max-w-7xl mx-auto p-8 rounded-3xl border space-y-8 animate-in slide-in-from-bottom-4 shadow-xl ${s.bg} ${s.border}`}>
        <div className="flex justify-between items-center border-b pb-6 gap-4">
            <Link to="/admin" className={`text-xs font-bold uppercase flex items-center gap-2 ${s.text}`}><ArrowLeft size={16}/> Volver</Link>
            <div className="flex items-center gap-3">
                <button type="button" onClick={handleSubmit(onPreSubmit)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold uppercase flex items-center gap-2 border border-gray-300"><Eye size={14}/> Previsualizar</button>
                <div className="text-right ml-2"><h1 className="text-xl font-black uppercase">{activeType}</h1></div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
               <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm"><BasicInfo register={register} setValue={setValue} getValues={getValues} s={s} /></div>
               <div className="bg-[#064e3b] border border-green-800 p-6 rounded-xl shadow-md">
                   <FinancialInfo register={register} setValue={setValue} watch={watch} s={s} />
               </div>
               {activeType === "Casa" && <div className="p-6 border-l-4 border-yellow-500 bg-yellow-50/10 rounded-xl"><HouseForm register={register} control={control} watch={watch} s={s} /></div>}
               {activeType === "Apartamento" && <div className="p-6 border-l-4 border-blue-500 bg-blue-50/10 rounded-xl"><ApartmentForm register={register} watch={watch} s={s} /></div>}
               {activeType === "Bodega" && <div className="p-6 border-l-4 border-amber-600 bg-amber-50/10 rounded-xl"><BodegaForm register={register} watch={watch} s={s} /></div>}
               {["Finca","Rural","CasaCampo"].includes(activeType!) && <div className="p-6 border-l-4 border-purple-500 bg-purple-50/10 rounded-xl"><RuralForm register={register} s={s} /></div>}
               {["Lote","Terreno"].includes(activeType!) && <div className="p-6 border-l-4 border-gray-500 bg-gray-50/10 rounded-xl"><LoteForm register={register} s={s} /></div>}
               {activeType === "Local" && <div className="p-6 border-l-4 border-pink-500 bg-pink-50/10 rounded-xl"><LocalForm register={register} s={s} /></div>}
               {activeType === "Oficina" && <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50/10 rounded-xl"><OficinaForm register={register} s={s} /></div>}
            </div>

            <div className="space-y-6">
               <div className="p-6 border border-red-100 bg-red-50/30 rounded-xl"><PrivateInfo register={register} activeType={activeType} initialData={initialData} /></div>
               <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                   <GalleryUpload setImages={setImages} setDeletedImages={setDeletedImages} onPreviewChange={setSortedPreviewUrls} initialData={initialData} register={register} watch={watch} />
               </div>
               <button disabled={loading} className="w-full py-4 px-6 rounded-2xl font-black text-lg uppercase text-white bg-emerald-600 hover:bg-emerald-500 flex justify-between items-center group">
                   {loading ? "Procesando..." : <><span className="text-left">REVISAR Y<br/>GUARDAR</span><ArrowRight size={24}/></>}
               </button>
            </div>
        </div>
      </form>

      {showPreviewModal && pendingData && (
          <PropertyPreviewModal data={pendingData} activeType={activeType} onClose={() => setShowPreviewModal(false)} onConfirm={handleFinalPublish} loading={loading} sortedPreviewUrls={sortedPreviewUrls} />
      )}
    </>
  );
}