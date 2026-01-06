import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { pb } from "../../api";
import { 
  Save, ArrowLeft, X, CheckCircle, MapPin, DollarSign, User, 
  Bed, Bath, Car, Ruler, Layers, Calendar, Utensils, 
  Maximize, Receipt, Shield, Key, Droplet, Zap, AlignJustify,
  Building, Eye, ArrowUpFromLine, FileText, Flame, Phone, TreePine,
  Armchair, MoveHorizontal, MoveVertical, Hammer, Warehouse, Image as ImageIcon,
  Lock, Briefcase
} from "lucide-react";
import { SuccessModal } from "../SuccessModal";

// --- COMPONENTES COMPARTIDOS ---
import TypeSelector from "./forms/TypeSelector";
import BasicInfo from "./forms/BasicInfo";
import FinancialInfo from "./forms/FinancialInfo";
import PrivateInfo from "./forms/PrivateInfo";
import GalleryUpload from "./forms/GalleryUpload";

// --- SPECS ---
import HouseSpecs from "./forms/HouseSpecs";
import ApartmentSpecs from "./forms/ApartmentSpecs";
import BodegaSpecs from "./forms/BodegaSpecs";
import RuralSpecs from "./forms/RuralSpecs";
import LoteSpecs from "./forms/LoteSpecs";
import OfficeSpecs from "./forms/OfficeSpecs";
import LocalSpecs from "./forms/LocalSpecs";

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || "http://127.0.0.1:8090";

export default function CreatePropertyForm({ theme, initialData, onSuccess }: any) {
  const [activeType, setActiveType] = useState<string | null>(initialData?.property_type || null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [images, setImages] = useState<File[]>([]); 
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [pendingData, setPendingData] = useState<any>(null);

  // Calcular imágenes para preview (mezcla nuevas y existentes)
  const previewImages = [
      ...images.map(file => URL.createObjectURL(file)), // Nuevas (blob)
      ...(initialData?.images?.map((img: string) => `${PB_URL}/api/files/${initialData.collectionId}/${initialData.id}/${img}`) || []) // Existentes (URL)
  ];

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

  // --- DICCIONARIO MAESTRO ---
  const getLabel = (key: string) => {
      const labels: any = {
          habs: "Habitaciones", rooms: "Habitaciones", 
          baths: "Baños", bathrooms: "Baños",
          garages: "Garajes", garage_type: "Tipo Garaje",
          area_built: "Área Cons.", area_private: "Área Priv.", area_lot: "Área Lote",
          area_total: "Área Total", area_free: "Área Libre",
          kitchen: "Cocina", kitchen_type: "Tipo Cocina", 
          dining: "Comedor", study: "Estudio", 
          floors: "Pisos", floor_material: "Material Pisos",
          view_type: "Tipo Vista", view_direction: "Dir. Vista", 
          has_balcony: "Tiene Balcón", balcony_area: "Área Balcón",
          floor_number: "Piso Nº", total_floors: "Total Pisos",
          building_age: "Edad Edif.", antiquity: "Antigüedad",
          building_name: "Edificio", unit_detail: "Int/Apto",
          admin: "Administración", maintenance_fee: "Cuota Admin", 
          stratum: "Estrato", legal_status: "Estado Legal", admin_contact: "Contacto Admin",
          industrial_gas: "Gas Ind.", gas_type: "Tipo Gas", 
          three_phase: "Trifásica", energy_kva: "KVA",
          loading_zone: "Zona Carga", grease_trap: "Trampa Grasa", 
          height: "Altura (m)",
          has_rent: "Rentado", rent_type: "Tipo Renta", rent_desc: "Desc. Renta",
          water_source: "Fuente Agua", topography: "Topografía",
          has_social: "Salón Social", has_surveillance: "Vigilancia",
          building_features: "Amenidades", features: "Características"
      };
      return labels[key] || key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  const getValue = (val: any) => {
      if (val === true) return "Sí";
      if (val === false) return "No";
      if (Array.isArray(val)) return val.length > 0 ? val.join(", ") : "-";
      if (typeof val === 'object' && val !== null) {
          const active = Object.entries(val).filter(([_, v]) => v === true).map(([k]) => getLabel(k));
          return active.length > 0 ? active.join(", ") : "Ninguna";
      }
      if (!val) return "-";
      return String(val);
  };

  // --- MAPEO DE ICONOS (Devuelve elemento directo para evitar error TS) ---
  const getIconElement = (key: string) => {
      const size = 18;
      const icons: any = {
          habs: <Bed size={size}/>, rooms: <Bed size={size}/>, 
          baths: <Bath size={size}/>, bathrooms: <Bath size={size}/>, 
          garages: <Car size={size}/>, garage_type: <Car size={size}/>,
          area_built: <Ruler size={size}/>, area_private: <Maximize size={size}/>, area_lot: <Maximize size={size}/>, balcony_area: <Maximize size={size}/>,
          area_total: <Maximize size={size}/>, area_free: <Maximize size={size}/>,
          kitchen: <Utensils size={size}/>, kitchen_type: <Utensils size={size}/>, dining: <Utensils size={size}/>,
          admin: <Receipt size={size}/>, maintenance_fee: <Receipt size={size}/>, 
          stratum: <Layers size={size}/>, floor_number: <ArrowUpFromLine size={size}/>, total_floors: <Building size={size}/>,
          antiquity: <Calendar size={size}/>, building_age: <Calendar size={size}/>,
          has_surveillance: <Shield size={size}/>, has_rent: <Key size={size}/>, legal_status: <FileText size={size}/>, admin_contact: <Phone size={size}/>,
          view_type: <Eye size={size}/>, view_direction: <Eye size={size}/>,
          industrial_gas: <Flame size={size}/>, gas_type: <Flame size={size}/>, energy_kva: <Zap size={size}/>, three_phase: <Zap size={size}/>,
          loading_zone: <Warehouse size={size}/>, height: <ArrowUpFromLine size={size}/>,
          building_features: <Briefcase size={size}/>
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
      formData.append("title", pendingData.title || "Sin Título");
      formData.append("property_type", activeType || "Casa");
      
      const cleanNumber = (val: any) => String(Number(String(val || "0").replace(/\./g, "")) || 0);
      formData.append("price_cop", cleanNumber(pendingData.price_cop));
      formData.append("price_usd", cleanNumber(pendingData.price_usd));
      formData.append("municipality", pendingData.municipality || "Bogotá");
      formData.append("neighborhood", pendingData.neighborhood || "");
      formData.append("address", pendingData.address_visible || ""); 
      
      if(!initialData) formData.append("ayc_id", "AYC-" + Math.floor(Math.random()*9000+1000));
      formData.append("specs", JSON.stringify(pendingData.specs)); 
      formData.append("owner_name", pendingData.owner_name || "");
      formData.append("owner_phone", pendingData.owner_phone || "");
      formData.append("owner_email", pendingData.owner_email || "");
      formData.append("address_private", pendingData.address_private || "");
      
      if (pb.authStore.model?.id) formData.append("agent", pb.authStore.model.id);
      images.forEach((file) => formData.append("images", file));

      if (initialData) await pb.collection("properties").update(initialData.id, formData);
      else await pb.collection("properties").create(formData);
      
      setShowPreviewModal(false);
      setShowSuccessModal(true);
    } catch (e: any) { alert(`Error: ${e.message}`); setShowPreviewModal(false); } finally { setLoading(false); }
  };

  if (!activeType) return <TypeSelector onSelect={(t) => { setValue("property_type", t); setActiveType(t); }} />;

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
              <div className="p-6 border-2 border-dashed border-gray-200 rounded-xl bg-white"><GalleryUpload setImages={setImages} initialData={initialData} register={register} watch={watch} /></div>
              <button disabled={loading} className={`w-full py-4 rounded-xl font-black text-lg uppercase shadow-xl transition-transform active:scale-95 text-white flex items-center justify-center gap-2 ${s.btn}`}><Save size={20}/> REVISAR Y GUARDAR</button>
           </div>
        </div>
      </form>

      {/* --- MODAL DE PREVIEW --- */}
      {showPreviewModal && pendingData && (
          <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative">
                  <div className={`p-6 border-b flex justify-between items-center ${s.modalHead}`}>
                      <div><h3 className="text-xl font-black uppercase">Confirmar Datos</h3><p className="text-xs opacity-70">Verificación final</p></div>
                      <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-black/10 rounded-full transition-colors"><X size={20}/></button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-gray-700">
                      
                      {/* 1. HERO INFO */}
                      <div className="flex gap-6 items-start">
                          {previewImages.length > 0 ? (
                              <img src={previewImages[0]} className="w-32 h-32 object-cover rounded-xl shadow-md border border-gray-200" alt="Preview"/>
                          ) : (
                              <div className="w-32 h-32 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-xs text-gray-400 font-bold border"><ImageIcon size={32} className="mb-1 opacity-50"/>SIN FOTO</div>
                          )}
                          <div className="flex-1 space-y-2">
                              <h4 className="font-black text-2xl text-gray-900 leading-tight">{pendingData.title || "Sin Título"}</h4>
                              <p className="text-xs uppercase tracking-wide bg-gray-100 px-3 py-1 rounded-full inline-block font-bold text-gray-600">{activeType}</p>
                              <div className="flex items-center gap-2 text-gray-500 text-sm"><MapPin size={16}/> {pendingData.address_visible || "N/A"}, {pendingData.neighborhood}</div>
                              <div className="flex items-center gap-1 text-green-600 font-black text-2xl mt-1">
                                <DollarSign size={20}/> {Number((pendingData.price_cop || "0").toString().replace(/\./g, "")).toLocaleString('es-CO')} <span className="text-xs text-gray-400 ml-1">COP</span>
                              </div>
                          </div>
                      </div>

                      {/* 2. DESCRIPCIÓN */}
                      {pendingData.description && (
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-600 text-xs italic">
                              "{pendingData.description.substring(0, 200)}{pendingData.description.length > 200 ? "..." : ""}"
                          </div>
                      )}

                      {/* 3. GALERÍA VISUAL (Horizontal Scroll) */}
                      {previewImages.length > 0 && (
                          <div>
                              <p className="text-[10px] font-bold uppercase text-gray-400 mb-2">Galería ({previewImages.length})</p>
                              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-200">
                                  {previewImages.map((img, i) => (
                                      <img key={i} src={img} className="h-20 w-20 object-cover rounded-lg border border-gray-200 shrink-0 shadow-sm" title={`Foto ${i+1}`}/>
                                  ))}
                              </div>
                          </div>
                      )}

                      {/* 4. ICONOS EN UNA SOLA FILA (Scroll Horizontal) */}
                      <div className="overflow-x-auto pb-2 -mx-2 px-2">
                          <div className="flex gap-3 min-w-max">
                               {['habs', 'rooms', 'baths', 'bathrooms', 'garages', 'area_built', 'area_total', 'stratum', 'antiquity', 'building_age', 'floor_number', 'total_floors'].map(key => {
                                   if (!pendingData.specs[key]) return null;
                                   return (
                                       <div key={key} className={`${s.iconBg} w-24 h-24 rounded-xl flex flex-col items-center justify-center text-center p-2 shrink-0`}>
                                           <div className={`mb-2 ${s.iconText}`}>{getIconElement(key)}</div>
                                           <span className="block font-black text-gray-800 leading-none text-sm mb-1">{getValue(pendingData.specs[key])}</span>
                                           <span className="text-[8px] text-gray-500 uppercase tracking-wide leading-tight">{getLabel(key).split(" ")[0]}</span>
                                       </div>
                                   );
                               })}
                          </div>
                      </div>

                      {/* 5. LISTA DE DETALLES */}
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs border-t border-gray-100 pt-4">
                          {Object.entries(pendingData.specs).map(([key, val]) => {
                              if (!val || val === "false" || val === false || (Array.isArray(val) && val.length === 0)) return null;
                              if (['habs', 'rooms', 'baths', 'bathrooms', 'garages', 'area_built', 'area_total', 'stratum', 'antiquity', 'building_age', 'floor_number', 'total_floors'].includes(key)) return null;
                              if (typeof val === 'object' && Object.values(val as any).every(v => v === false)) return null;

                              return (
                                  <div key={key} className="flex justify-between border-b border-dashed border-gray-200 pb-1">
                                      <span className="opacity-70 font-bold capitalize text-gray-500">{getLabel(key)}</span>
                                      <span className="font-bold text-gray-900 text-right max-w-[60%] truncate">{getValue(val)}</span>
                                  </div>
                              );
                          })}
                      </div>

                      {/* 6. FOOTER */}
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex justify-between items-center mt-6">
                          <div><span className="block text-[10px] uppercase font-bold text-gray-400">Propietario</span><p className="font-bold text-gray-800">{pendingData.owner_name || "N/A"}</p><p className="text-xs text-gray-500">{pendingData.owner_phone || "N/A"}</p></div>
                          <div className="text-right"><span className="block text-[10px] uppercase font-bold text-gray-400">Agente</span><div className="flex items-center gap-2 justify-end mt-1"><User size={14} className="text-blue-500"/><span className="text-xs font-bold text-blue-600">{pb.authStore.model?.name || "Usuario Actual"}</span></div></div>
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