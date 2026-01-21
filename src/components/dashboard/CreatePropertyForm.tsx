import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; // <--- IMPORTANTE: Para la navegación
import { pb } from "../../api";
import { 
  ArrowRight, ArrowLeft, FileText, Eye, ExternalLink, List 
} from "lucide-react"; // <--- ICONOS NUEVOS
import { SuccessModal } from "../SuccessModal";
import { getUserTheme } from "../../utils/formatters"; 
import PropertyPreviewModal from "../admin/PropertyPreviewModal";

// --- FORMULARIOS COMUNES (CORE) ---
import TypeSelector from "./forms/TypeSelector";
import BasicInfo from "./forms/BasicInfo";
import FinancialInfo from "./forms/FinancialInfo";
import PrivateInfo from "./forms/PrivateInfo"; 
import GalleryUpload from "./forms/GalleryUpload";

// --- FORMULARIOS MODULARES (NUEVA ARQUITECTURA) ---
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
  
  // ESTADOS DE IMÁGENES
  const [images, setImages] = useState<File[]>([]); 
  const [deletedImages, setDeletedImages] = useState<string[]>([]);
  const [sortedPreviewUrls, setSortedPreviewUrls] = useState<string[]>([]);
  
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  // OBTENER TEMA (Color según usuario)
  const userEmail = pb.authStore.model?.email;
  const { classes: s } = getUserTheme(userEmail); 

  const { register, control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: { 
      property_type: "", 
      specs: { levels_list: [], has_rent: false, has_social: false }, 
      status: "borrador", 
      ...initialData 
    }
  });

  // EFECTO: Carga de datos iniciales para EDICIÓN
  useEffect(() => {
    if (initialData) {
      let parsedSpecs = initialData.specs;
      if (typeof initialData.specs === 'string') { try { parsedSpecs = JSON.parse(initialData.specs); } catch(e) {} }
      
      // REINICIO FORZADO
      reset({ 
          ...initialData, 
          specs: parsedSpecs,
          price_cop: initialData.price_cop, 
          price_usd: initialData.price_usd 
      });
    }
  }, [initialData, reset]);

  // CALCULAR PROGRESO
  const calculateCompleteness = (data: any) => {
      let points = 0;
      if (data.title && data.title.length > 5) points++;
      if (data.municipality && data.neighborhood) points++;
      const priceStr = String(data.price_cop || "0").replace(/\./g, "");
      if (Number(priceStr) > 0) points++;
      if (data.owner_name && data.owner_name.length > 2) points++;
      if (data.description && data.description.length > 20) points++;
      if (sortedPreviewUrls.length > 0) points++;
      return (points / 6) * 100;
  };

  // --- GUARDADO EN BACKEND ---
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
      const cleanNumber = (val: any) => String(Number(String(val || "0").replace(/\./g, "")) || 0);
      formData.append("price_cop", cleanNumber(data.price_cop));
      formData.append("price_usd", cleanNumber(data.price_usd));
      formData.append("admin_fee", cleanNumber(data.admin_fee)); 
      
      if(!initialData) formData.append("ayc_id", "AYC-" + Math.floor(Math.random()*9000+1000));

      const galleryOrder = sortedPreviewUrls.map(url => {
          if (url.startsWith("blob:")) return null; 
          try { const parts = url.split("/"); return parts[parts.length - 1]; } catch (e) { return null; }
      }).filter(Boolean);

      formData.append("specs", JSON.stringify({ ...data.specs, gallery_order: galleryOrder })); 
      formData.append("municipality", data.municipality || "Bogotá");
      formData.append("neighborhood", data.neighborhood || "");
      formData.append("address_text", data.address_visible || "");
      
      // Privados
      formData.append("owner_name", data.owner_name || "");
      formData.append("owner_phone", data.owner_phone || "");
      formData.append("owner_email", data.owner_email || "");
      formData.append("address_private", data.address_private || "");

      if (data.specs?.legal_status && Array.isArray(data.specs.legal_status)) {
          formData.append("legal_status", data.specs.legal_status.join(", "));
      }

      if (pb.authStore.model?.id) formData.append("agent", pb.authStore.model.id);
      
      if (initialData && deletedImages.length > 0) deletedImages.forEach(id => formData.append("images-", id));
      images.forEach(file => formData.append("images", file));

      if (initialData) await pb.collection("properties").update(initialData.id, formData);
      else await pb.collection("properties").create(formData);
      
      setSuccessMsg(targetStatus === "publicado" ? "¡Propiedad Publicada!" : "Borrador Guardado");
      setShowPreviewModal(false);
      setShowSuccessModal(true);
    } catch (e: any) { 
        const msg = e.data ? JSON.stringify(e.data, null, 2) : e.message;
        alert(`Error al guardar:\n${msg}`); 
    } finally {
        setLoading(false);
    }
  };

  const onPreSubmit = (data: any) => { 
      const progress = calculateCompleteness(data);
      const hasOwnerInfo = data.owner_name && data.owner_name.length > 2;

      if (!hasOwnerInfo) {
          alert("⚠️ Mínimo Requerido:\n\nPor favor ingresa al menos el NOMBRE DEL PROPIETARIO en la sección 'Datos Privados' para crear un borrador.");
          return;
      }
      // NOTA: Para el botón de "Previsualizar", queremos ver el modal aunque no esté listo para publicar
      setPendingData(data); 
      setShowPreviewModal(true); 
  };

  const handleFinalPublish = () => {
    if (pendingData) {
        const progress = calculateCompleteness(pendingData);
        // Solo publica si tiene > 50% info, sino guarda borrador
        const status = progress >= 50 ? "publicado" : "borrador";
        saveToBackend(pendingData, status);
    }
  };

  if (!activeType) return <TypeSelector onSelect={(t: string) => { setValue("property_type", t); setActiveType(t); }} />;

  return (
    <>
      <SuccessModal isOpen={showSuccessModal} message={successMsg} onClose={() => { setShowSuccessModal(false); if(onSuccess) onSuccess(); }} />
      
      <form onSubmit={handleSubmit(onPreSubmit)} className={`max-w-7xl mx-auto p-8 rounded-3xl border space-y-8 animate-in slide-in-from-bottom-4 shadow-xl ${s.bg} ${s.border}`}>
        
        {/* --- HEADER CON BARRA DE HERRAMIENTAS --- */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-6 border-gray-200/20 gap-4">
           
           {/* IZQUIERDA: Navegación */}
           <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
               <Link to="/admin" className={`text-xs font-bold uppercase flex items-center gap-2 hover:opacity-70 transition-opacity ${s.text}`}>
                   <ArrowLeft size={16}/> Volver
               </Link>
               
               <div className="h-4 w-px bg-gray-300 hidden md:block"></div>
               
               <button type="button" onClick={() => setActiveType(null)} className={`text-xs font-bold uppercase flex items-center gap-2 hover:opacity-70 transition-opacity ${s.text}`}>
                   <FileText size={16}/> Cambiar Tipo
               </button>
           </div>

           {/* DERECHA: Acciones Rápidas */}
           <div className="flex items-center gap-3 w-full md:w-auto justify-end">
               {/* Ver en Web (Solo si ya existe/editando) */}
               {initialData?.id && (
                   <Link 
                       to={`/inmuebles/${initialData.ayc_id || initialData.id}`} 
                       target="_blank"
                       className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold uppercase flex items-center gap-2 hover:bg-blue-100 transition-colors border border-blue-200"
                       title="Ver como lo ve el cliente"
                   >
                       <ExternalLink size={14}/> <span className="hidden sm:inline">Ver en Web</span>
                   </Link>
               )}

               {/* Previsualizar (Abre el Modal) */}
               <button 
                   type="button" 
                   onClick={handleSubmit(onPreSubmit)} 
                   className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold uppercase flex items-center gap-2 hover:bg-gray-200 transition-colors border border-gray-300"
                   title="Previsualizar cambios"
               >
                   <Eye size={14}/> <span className="hidden sm:inline">Previsualizar</span>
               </button>

               <div className="text-right ml-2">
                   <h1 className="text-xl font-black uppercase tracking-widest leading-none">{activeType}</h1>
                   <span className="text-[10px] opacity-60 font-bold uppercase">{initialData ? "Editando" : "Creando Nuevo"}</span>
               </div>
           </div>
        </div>

        {/* --- CONTENIDO DEL FORMULARIO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* COLUMNA IZQUIERDA: DATOS PÚBLICOS */}
           <div className="lg:col-span-2 space-y-6">
              <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-sm"><BasicInfo register={register} setValue={setValue} getValues={getValues} s={s} /></div>
              
              <div className="bg-[#064e3b] border border-green-800 p-6 rounded-xl shadow-md">
                  <FinancialInfo register={register} setValue={setValue} watch={watch} s={s} />
              </div>
              
              {/* --- RENDERIZADO MODULAR --- */}
              {activeType === "Casa" && <div className="p-6 border-l-4 border-yellow-500 bg-yellow-50/10 rounded-xl shadow-sm"><HouseForm register={register} control={control} watch={watch} s={s} /></div>}
              {activeType === "Apartamento" && <div className="p-6 border-l-4 border-blue-500 bg-blue-50/10 rounded-xl shadow-sm"><ApartmentForm register={register} watch={watch} s={s} /></div>}
              {activeType === "Bodega" && <div className="p-6 border-l-4 border-amber-600 bg-amber-50/10 rounded-xl shadow-sm"><BodegaForm register={register} s={s} /></div>}
              {(activeType === "CasaCampo" || activeType === "Finca" || activeType === "Rural") && <div className="p-6 border-l-4 border-purple-500 bg-purple-50/10 rounded-xl shadow-sm"><RuralForm register={register} s={s} /></div>}
              {(activeType === "Lote" || activeType === "Terreno") && <div className="p-6 border-l-4 border-gray-500 bg-gray-50/10 rounded-xl shadow-sm"><LoteForm register={register} s={s} /></div>}
              {activeType === "Local" && <div className="p-6 border-l-4 border-pink-500 bg-pink-50/10 rounded-xl shadow-sm"><LocalForm register={register} s={s} /></div>}
              {activeType === "Oficina" && <div className="p-6 border-l-4 border-emerald-500 bg-emerald-50/10 rounded-xl shadow-sm"><OficinaForm register={register} s={s} /></div>}
           </div>

           {/* COLUMNA DERECHA: DATOS PRIVADOS & GUARDAR */}
           <div className="space-y-6">
              <div className="p-6 border border-red-100 bg-red-50/30 rounded-xl shadow-sm"><PrivateInfo register={register} activeType={activeType} initialData={initialData} /></div>
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white">
                  <GalleryUpload setImages={setImages} setDeletedImages={setDeletedImages} onPreviewChange={setSortedPreviewUrls} initialData={initialData} register={register} watch={watch} />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 text-xs text-blue-800 flex gap-3 items-start">
                 <FileText size={18} className="shrink-0 mt-0.5 text-blue-600"/>
                 <div>
                    <p className="font-bold mb-1">Sistema de Guardado</p>
                    <ul className="list-disc pl-3 space-y-1 opacity-80">
                        <li>Si solo llenas <strong>Datos del Propietario</strong>, se guarda como <strong>Borrador</strong>.</li>
                        <li>Si llenas más del 50%, podrás <strong>Publicar</strong>.</li>
                    </ul>
                 </div>
              </div>

              <button 
                  disabled={loading} 
                  className={`
                    w-full py-4 px-6 rounded-2xl font-black text-lg uppercase tracking-wider
                    text-white shadow-xl transition-all duration-300 ease-out
                    bg-emerald-600 border border-emerald-800
                    hover:bg-emerald-500 hover:shadow-emerald-200/50 hover:shadow-2xl hover:-translate-y-1
                    active:scale-[0.98] active:translate-y-0
                    disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-xl
                    flex items-center justify-between gap-4 group relative overflow-hidden
                  `}
              >
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-1/2 z-0"></div>
                  {loading ? (
                    <div className="flex items-center justify-center w-full gap-3 relative z-10">
                         <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         <span>Procesando...</span>
                    </div>
                  ) : (
                    <>
                       <span className="text-left leading-tight relative z-10">REVISAR Y<br/>GUARDAR</span>
                       <div className="bg-emerald-800/30 p-2 rounded-full transition-transform group-hover:translate-x-1 relative z-10">
                          <ArrowRight size={24} className="stroke-[3]"/>
                       </div>
                    </>
                  )}
              </button>
           </div>
        </div>
      </form>

      {/* MODAL DE CONFIRMACIÓN */}
      {showPreviewModal && pendingData && activeType && (
          <PropertyPreviewModal 
              data={pendingData}
              activeType={activeType}
              onClose={() => setShowPreviewModal(false)}
              onConfirm={handleFinalPublish}
              loading={loading}
              sortedPreviewUrls={sortedPreviewUrls}
          />
      )}
    </>
  );
}