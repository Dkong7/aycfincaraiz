import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { pb } from "../../api";
import { Save, ArrowLeft } from "lucide-react";
import { SuccessModal } from "../SuccessModal";

// --- COMPONENTES COMPARTIDOS ---
import TypeSelector from "./forms/TypeSelector";
import BasicInfo from "./forms/BasicInfo";
import FinancialInfo from "./forms/FinancialInfo";
import PrivateInfo from "./forms/PrivateInfo";
import GalleryUpload from "./forms/GalleryUpload";

// --- SPECS (FORMULARIOS ESPECÍFICOS) ---
import HouseSpecs from "./forms/HouseSpecs";
import ApartmentSpecs from "./forms/ApartmentSpecs";
import BodegaSpecs from "./forms/BodegaSpecs";
import RuralSpecs from "./forms/RuralSpecs";
import LoteSpecs from "./forms/LoteSpecs";
import OfficeSpecs from "./forms/OfficeSpecs";
import LocalSpecs from "./forms/LocalSpecs";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

export default function CreatePropertyForm({ theme, initialData, onSuccess }: any) {
  // Estado para saber qué formulario mostrar
  const [activeType, setActiveType] = useState<string | null>(initialData?.property_type || null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState<File[]>([]); 

  // React Hook Form
  const { register, control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: { 
      property_type: initialData?.property_type || "", 
      specs: { levels_list: [], has_rent: false, has_social: false }, 
      ...initialData 
    }
  });

  // Estilos del Tema
  const s = ((t) => {
    if(t === "claudia") return { card: "bg-white border-pink-200", btn: "bg-pink-500 hover:bg-pink-600 text-white", label: "text-pink-500" };
    if(t === "alfonso") return { card: "bg-[#111] border-amber-900/30", btn: "bg-amber-700 hover:bg-amber-600 text-white", label: "text-amber-600" };
    return { card: "bg-white border-gray-200", btn: "bg-[#009B4D] hover:bg-[#007a3d] text-white", label: "text-[#0A192F]" };
  })(theme);

  // Carga inicial
  useEffect(() => {
    if (initialData) {
      let parsedSpecs = initialData.specs;
      if (typeof initialData.specs === 'string') { try { parsedSpecs = JSON.parse(initialData.specs); } catch(e) {} }
      reset({ ...initialData, specs: parsedSpecs });
    }
  }, [initialData, reset]);

  // Submit
  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title || "Sin Título");
      formData.append("property_type", activeType || "Casa");
      
      const cleanNumber = (val: any) => String(Number(String(val).replace(/\./g, "")) || 0);
      formData.append("price_cop", cleanNumber(data.price_cop));
      formData.append("price_usd", cleanNumber(data.price_usd));
      
      formData.append("municipality", data.municipality || "Bogotá");
      formData.append("neighborhood", data.neighborhood || "");
      formData.append("address", data.address_visible || ""); 
      
      if(!initialData) formData.append("ayc_id", "AYC-" + Math.floor(Math.random()*9000+1000));
      
      formData.append("specs", JSON.stringify(data.specs)); 
      
      // Datos privados
      formData.append("owner_name", data.owner_name || "");
      formData.append("owner_phone", data.owner_phone || "");
      formData.append("owner_email", data.owner_email || "");
      formData.append("address_private", data.address_private || "");
      
      images.forEach((file) => formData.append("images", file));

      if (initialData) await pb.collection("properties").update(initialData.id, formData);
      else await pb.collection("properties").create(formData);
      
      setShowModal(true);
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 1. Selector
  if (!activeType) {
    return <TypeSelector onSelect={(t) => { setValue("property_type", t); setActiveType(t); }} />;
  }

  // 2. Formulario
  return (
    <>
      <SuccessModal isOpen={showModal} message="Operación exitosa." onClose={() => { setShowModal(false); if(onSuccess) onSuccess(); }} />
      
      <form onSubmit={handleSubmit(onSubmit)} className={`max-w-7xl mx-auto p-8 rounded-3xl border ${s.card} space-y-8 animate-in slide-in-from-bottom-4`}>
        
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-6 border-gray-200/20">
           <button type="button" onClick={() => setActiveType(null)} className={`text-xs font-bold uppercase flex items-center gap-2 hover:opacity-70 ${s.label}`}>
              <ArrowLeft size={16}/> Cambiar Tipo
           </button>
           <div className="text-right">
              <h1 className="text-2xl font-black uppercase tracking-widest">{initialData ? "Editar" : "Nuevo"} {activeType}</h1>
              <span className="text-[10px] text-gray-400 font-mono tracking-widest">{initialData?.ayc_id || "ID: AUTO-GENERADO"}</span>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* === COLUMNA IZQUIERDA === */}
           <div className="lg:col-span-2 space-y-6">
              
              <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm">
                 <BasicInfo register={register} setValue={setValue} getValues={getValues} s={s} />
              </div>

              <div className="bg-[#064e3b] border border-green-800 p-6 rounded-xl shadow-md">
                 <FinancialInfo register={register} setValue={setValue} s={s} />
              </div>

              {/* RENDERIZADO CONDICIONAL POR TIPO */}
              
              {activeType === "Casa" && (
                 <div className="p-6 border-l-4 border-yellow-500 bg-yellow-50/10 rounded-xl shadow-sm">
                    <HouseSpecs register={register} control={control} watch={watch} s={s} />
                 </div>
              )}

              {activeType === "Apartamento" && (
                 <div className="p-6 border-l-4 border-blue-500 bg-blue-50/10 rounded-xl shadow-sm">
                    <ApartmentSpecs register={register} watch={watch} s={s} />
                 </div>
              )}

              {activeType === "Bodega" && (
                 <div className="p-6 border-l-4 border-amber-600 bg-amber-50/10 rounded-xl shadow-sm">
                    <BodegaSpecs register={register} s={s} />
                 </div>
              )}

              {/* AQUÍ ESTABA EL PROBLEMA: AÑADIDO "Casa Campo" y "CasaCampo" */}
              {(activeType === "Finca" || activeType === "Rural" || activeType === "Casa Campestre" || activeType === "Casa Campo" || activeType === "CasaCampo") && (
                 <div className="p-6 border-l-4 border-purple-500 bg-purple-50/10 rounded-xl shadow-sm">
                    <RuralSpecs register={register} s={s} />
                 </div>
              )}

              {(activeType === "Lote" || activeType === "Terreno") && (
                 <div className="p-6 border-l-4 border-gray-500 bg-gray-50/10 rounded-xl shadow-sm">
                    <LoteSpecs register={register} s={s} />
                 </div>
              )}

              {activeType === "Oficina" && (
                 <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50/10 rounded-xl shadow-sm">
                    <OfficeSpecs register={register} s={s} />
                 </div>
              )}

              {activeType === "Local" && (
                 <div className="p-6 border-l-4 border-pink-500 bg-pink-50/10 rounded-xl shadow-sm">
                    <LocalSpecs register={register} s={s} />
                 </div>
              )}

           </div>

           {/* === COLUMNA DERECHA === */}
           <div className="space-y-6">
              <div className="p-6 border border-red-100 bg-red-50/30 rounded-xl shadow-sm">
                 <PrivateInfo register={register} activeType={activeType} initialData={initialData} />
              </div>

              <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                 <GalleryUpload 
                    setImages={setImages} 
                    initialData={initialData} 
                    register={register} 
                    watch={watch} 
                 />
              </div>

              <button disabled={loading} className={`w-full py-4 rounded-xl font-black text-lg uppercase shadow-xl transition-transform active:scale-95 text-white flex items-center justify-center gap-2 ${s.btn}`}>
                 {loading ? "Guardando..." : <><Save size={20}/> PUBLICAR</>}
              </button>
           </div>
        </div>
      </form>
    </>
  );
}