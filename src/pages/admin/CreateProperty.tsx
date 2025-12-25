import { useState, useRef, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCloudUploadAlt, faSave, faSpinner, faRotateRight, faHome, 
  faBuilding, faWarehouse, faTrash, faGripVertical, faVideo, 
  faMapMarkedAlt, faUserTie, faLayerGroup, faCheckCircle 
} from "@fortawesome/free-solid-svg-icons";

// --- INTERFACES ---
interface FloorDetail {
  id: string;
  level: string;
  bedrooms: number;
  bathrooms: number;
  hasTerrace: boolean;
  notes: string;
}

// --- COMPONENTES AUXILIARES ---
const MoneyInput = ({ label, name, value, onChange, required = false }: any) => {
  const format = (val: string) => {
    if (!val) return "";
    return "$ " + Number(val).toLocaleString("es-CO");
  };
  return (
    <div>
      <label className="label">{label} {required && "*"}</label>
      <input 
        type="text" value={format(value)}
        onChange={(e) => { const raw = e.target.value.replace(/\D/g, ""); onChange(name, raw); }}
        className="input text-green-700 font-bold font-mono tracking-wide bg-green-50 focus:bg-white border-green-200"
        placeholder="$ 0" required={required}
      />
    </div>
  );
};

const CreateProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Estado para el modal
  const [advisors, setAdvisors] = useState<any[]>([]);
  const [formType, setFormType] = useState<"Casa" | "Apartamento" | "Bodega">("Casa");
  
  // ESTADO DEL FORMULARIO BASE
  const [formData, setFormData] = useState<any>({
    title: "", code: "", city: "Bogotá", neighborhood: "", stratum: 3,
    price: "", admin_price: "", appraisal_value: "", offer_type: "Venta", view_location: "Exterior",
    levels: "", construction_year: "", remodeled: "No", in_condo: "No",
    area_lot: "", area_built: "", area_private: "", area_front: "", area_depth: "",
    rooms: "", bathrooms: "", parking: "",
    garage_type: "Cubierto", garage_arrangement: "Independiente", dining_type: "Un solo espacio", 
    kitchen_type: "Integral", floor_material: "Cerámica", security_type: "Diurna",
    mortgage_details: "", family_affectation: "No", family_patrimony: "No", succession_status: "",
    video_url: "",
    description: "", extra_info: "", features: [] as string[],
    
    // DATOS PRIVADOS
    address: "", owner_name: "", owner_phone: "", owner_contact: "", advisor_id: ""
  });

  // ESTADOS NUEVOS (GAS Y PISOS)
  const [gasType, setGasType] = useState("");
  const [floors, setFloors] = useState<FloorDetail[]>([]);

  const [hasSubUnits, setHasSubUnits] = useState(false);
  const [subUnits, setSubUnits] = useState<any[]>([]);
  
  // IMÁGENES
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoThumb, setVideoThumb] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // DRAG & DROP REFS
  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);

  useEffect(() => {
    const loadAdvisors = async () => {
      const { data } = await supabase.from("advisors").select("*").eq("active", true);
      if(data) setAdvisors(data);
    };
    loadAdvisors();
  }, []);

  // --- LOGICA DE PISOS ---
  const addFloor = () => {
    setFloors([
      ...floors, 
      { 
        id: crypto.randomUUID(), 
        level: `Piso ${floors.length + 1}`, 
        bedrooms: 0, 
        bathrooms: 0, 
        hasTerrace: false, 
        notes: '' 
      }
    ]);
  };

  const updateFloor = (id: string, field: keyof FloorDetail, value: any) => {
    setFloors(floors.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const removeFloor = (id: string) => {
    setFloors(floors.filter(f => f.id !== id));
  };

  // --- LOGICA DE YOUTUBE ---
  const handleVideoChange = (e: any) => {
    const url = e.target.value;
    setFormData({ ...formData, video_url: url });
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      setVideoThumb(`https://img.youtube.com/vi/${match[2]}/0.jpg`);
    } else {
      setVideoThumb("");
    }
  };

  // --- LOGICA DRAG & DROP ---
  const handleSort = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const _images = [...images];
    const _previews = [...imagePreviews];
    const draggedImage = _images.splice(dragItem.current, 1)[0];
    const draggedPreview = _previews.splice(dragItem.current, 1)[0];
    _images.splice(dragOverItem.current, 0, draggedImage);
    _previews.splice(dragOverItem.current, 0, draggedPreview);
    dragItem.current = null;
    dragOverItem.current = null;
    setImages(_images);
    setImagePreviews(_previews);
  };

  // --- LOGICA ROTACIÓN ---
  const rotateImage = async (index: number) => {
    if (!canvasRef.current || !images[index]) return;
    const file = images[index];
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      canvas.width = img.height; canvas.height = img.width;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(90 * Math.PI / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      canvas.toBlob((blob) => {
        if (blob) {
          const newFile = new File([blob], file.name, { type: "image/jpeg" });
          const newImages = [...images]; newImages[index] = newFile; setImages(newImages);
          const newPreviews = [...imagePreviews]; URL.revokeObjectURL(newPreviews[index]); newPreviews[index] = URL.createObjectURL(newFile); setImagePreviews(newPreviews);
        }
      }, "image/jpeg", 0.9);
    };
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1. Subir imágenes
      const imageUrls: string[] = [];
      for (const file of images) {
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
          const { error } = await supabase.storage.from("property-images").upload(fileName, file);
          if (!error) {
             const { data } = supabase.storage.from("property-images").getPublicUrl(fileName);
             imageUrls.push(data.publicUrl);
          }
      }

      // 2. Preparar datos
      const finalData = {
        title: formData.title,
        code: formData.code,
        city: formData.city,
        neighborhood: formData.neighborhood,
        description: formData.description,
        address: formData.address,
        offer_type: formData.offer_type,
        view_location: formData.view_location,
        garage_type: formData.garage_type,
        garage_arrangement: formData.garage_arrangement,
        dining_type: formData.dining_type,
        kitchen_type: formData.kitchen_type,
        floor_material: formData.floor_material,
        security_type: formData.security_type,
        mortgage_details: formData.mortgage_details,
        succession_status: formData.succession_status,
        video_url: formData.video_url,
        extra_info: formData.extra_info,
        owner_name: formData.owner_name,
        owner_phone: formData.owner_phone,
        owner_contact: formData.owner_contact,
        
        property_type: formType,
        gas_type: gasType,
        floor_details: floors,
        features: formData.features,
        
        // CONVERSIÓN NUMÉRICA
        price: Number(formData.price || 0),
        admin_price: Number(formData.admin_price || 0),
        appraisal_value: Number(formData.appraisal_value || 0),
        area_built: Number(formData.area_built || 0),
        area_lot: Number(formData.area_lot || 0),
        area_private: Number(formData.area_private || 0),
        area_front: Number(formData.area_front || 0),
        area_depth: Number(formData.area_depth || 0),
        rooms: Number(formData.rooms || 0),
        bathrooms: Number(formData.bathrooms || 0),
        parking: Number(formData.parking || 0),
        stratum: Number(formData.stratum || 0),
        levels: Number(formData.levels || 0),
        construction_year: Number(formData.construction_year || 0),
        floor_number: Number(formData.floor_number || 0),

        // BOOLEANOS
        remodeled: formData.remodeled === "Si",
        in_condo: formData.in_condo === "Si",
        family_affectation: formData.family_affectation === "Si",
        family_patrimony: formData.family_patrimony === "Si",
        
        sub_units: hasSubUnits ? subUnits : null,
        images: imageUrls,
        advisor_id: formData.advisor_id || null
      };

      // 3. Enviar a Supabase
      const { error } = await supabase.from("properties").insert([finalData]);
      if (error) throw error;
      
      // ACTIVAR MODAL DE ÉXITO
      setShowSuccessModal(true);
      
    } catch (err: any) { 
        console.error("Error al guardar:", err);
        alert("Error al guardar: " + err.message); 
    } finally { 
        setLoading(false); 
    }
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleMoneyChange = (name: string, val: string) => setFormData({ ...formData, [name]: val });
  
  const addSubUnit = () => setSubUnits([...subUnits, { type: "Apto", rooms: 1, bath: 1, rent: "" }]);
  const removeSubUnit = (idx: number) => setSubUnits(subUnits.filter((_, i) => i !== idx));
  const updateSubUnit = (idx: number, field: string, val: string) => {
    const updated = [...subUnits]; updated[idx][field] = val; setSubUnits(updated);
  };
  const toggleFeature = (f: string) => setFormData((prev: any) => ({ ...prev, features: prev.features.includes(f) ? prev.features.filter((i:string) => i !== f) : [...prev.features, f] }));

  const featuresByType = {
    Casa: ["Jardín Interior", "Patio", "Terraza", "Chimenea", "Estudio", "Depósito", "Zona Lavandería", "BBQ", "Antejardín", "Citófono"],
    Apartamento: ["Balcón", "Terraza", "Depósito", "Salón Comunal", "Gimnasio", "Zona Infantil", "Club House", "Ascensor"],
    Bodega: ["Zona Franca", "Muelle Carga", "Oficinas", "Mezanine", "Tanques Agua", "Planta Eléctrica", "Alarma", "Rociadores"]
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-xl min-h-screen border-t-8 border-primary relative">
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      
      {/* MODAL DE ÉXITO */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform scale-100 transition-all border-t-8 border-green-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faCheckCircle} className="text-5xl text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Guardado Exitoso!</h3>
            <p className="text-gray-500 mb-6 text-sm">El inmueble ha sido registrado correctamente en la base de datos y ya está visible.</p>
            <button 
              onClick={() => navigate("/admin")} 
              className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              ENTENDIDO, VOLVER AL ADMIN
            </button>
          </div>
        </div>
      )}

      {/* SELECCIÓN DE FORMATO */}
      <div className="mb-10 flex justify-center gap-4">
          {[
            { type: "Casa", icon: faHome, color: "bg-blue-600", ring: "ring-blue-200" },
            { type: "Apartamento", icon: faBuilding, color: "bg-green-600", ring: "ring-green-200" },
            { type: "Bodega", icon: faWarehouse, color: "bg-slate-600", ring: "ring-slate-200" }
          ].map((item) => (
            <button 
              key={item.type} 
              type="button" 
              onClick={() => setFormType(item.type as any)} 
              className={`px-8 py-4 rounded-xl text-white transition-all transform hover:scale-105 flex flex-col items-center w-40 ${
                formType === item.type 
                  ? item.color + " shadow-xl ring-4 ring-offset-2 " + item.ring 
                  : "bg-gray-200 text-gray-500 hover:bg-gray-300"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-3xl mb-2" />
              <span className="font-bold uppercase tracking-wide">{item.type}</span>
            </button>
          ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
        
        {/* 1. ENCABEZADO */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
           <div className="md:col-span-2"><label className="label">Título Web</label><input name="title" required className="input text-lg font-bold" placeholder="Ej: Casa Esquinera en Modelia" onChange={handleChange} /></div>
           <div><label className="label">Código</label><input name="code" className="input font-mono" onChange={handleChange} /></div>
           <div><label className="label text-blue-800">Asesor</label><select name="advisor_id" className="input bg-blue-50 border-blue-200 font-bold text-blue-900" onChange={handleChange}><option value="">-- Asignar --</option>{advisors.map(adv => <option key={adv.id} value={adv.id}>{adv.name}</option>)}</select></div>
        </div>

        {/* 2. FINANCIERO */}
        <div className="bg-green-50/50 p-6 rounded-lg border border-green-100">
          <h3 className="section-title text-green-800">Información Financiera y Jurídica</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <MoneyInput label="Precio de Venta" name="price" value={formData.price} onChange={handleMoneyChange} required />
            <MoneyInput label="Valor Administración" name="admin_price" value={formData.admin_price} onChange={handleMoneyChange} />
            <MoneyInput label="Precio Avalúo" name="appraisal_value" value={formData.appraisal_value} onChange={handleMoneyChange} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><label className="label">Hipoteca</label><input name="mortgage_details" className="input" placeholder="N/A" onChange={handleChange} /></div>
            <div><label className="label">Sucesión?</label><input name="succession_status" className="input" placeholder="Estado..." onChange={handleChange} /></div>
            <div><label className="label">Afectación Fam.</label><select name="family_affectation" className="input" onChange={handleChange}><option>No</option><option>Si</option></select></div>
            <div><label className="label">Patrimonio Fam.</label><select name="family_patrimony" className="input" onChange={handleChange}><option>No</option><option>Si</option></select></div>
          </div>
        </div>

        {/* 3. DETALLES FÍSICOS */}
        <div>
          <h3 className="section-title text-gray-800">Detalles Físicos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div><label className="label">Barrio</label><input name="neighborhood" className="input" onChange={handleChange} /></div>
            <div><label className="label">Dirección</label><input name="address" className="input" onChange={handleChange} /></div>
            <div><label className="label">Estrato</label><select name="stratum" className="input" onChange={handleChange}>{[1,2,3,4,5,6].map(s=><option key={s} value={s}>{s}</option>)}</select></div>
            
            <div className="bg-yellow-50 p-1 rounded border border-yellow-200"><label className="label text-yellow-800">Área Lote</label><input name="area_lot" type="number" className="input bg-white" onChange={handleChange} /></div>
            <div><label className="label">Área Const.</label><input name="area_built" type="number" className="input" onChange={handleChange} /></div>
            <div><label className="label">Área Privada</label><input name="area_private" type="number" className="input" onChange={handleChange} /></div>
            
            {formType === "Casa" && (
              <>
                <div><label className="label">Frente (mts)</label><input name="area_front" type="number" className="input" onChange={handleChange} /></div>
                <div><label className="label">Fondo (mts)</label><input name="area_depth" type="number" className="input" onChange={handleChange} /></div>
                <div><label className="label">Niveles</label><input name="levels" type="number" className="input" onChange={handleChange} /></div>
                <div><label className="label">Ubicación</label><select name="view_location" className="input" onChange={handleChange}><option>Exterior</option><option>Interior</option></select></div>
              </>
            )}
             {formType === "Apartamento" && (
              <>
                  <div><label className="label">Piso Nº</label><input name="floor_number" type="number" className="input" onChange={handleChange} /></div>
                  <div><label className="label">Vista</label><select name="view_location" className="input" onChange={handleChange}><option>Exterior</option><option>Interior</option></select></div>
              </>
            )}
            
            <div><label className="label">Antigüedad</label><input name="construction_year" type="number" className="input" onChange={handleChange} /></div>
            <div><label className="label">Remodelada?</label><select name="remodeled" className="input" onChange={handleChange}><option>No</option><option>Si</option></select></div>
          </div>
        </div>

        {/* 4. DISTRIBUCIÓN GENERAL Y GAS */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
           <h3 className="section-title">Distribución General</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div><label className="label">Habitaciones</label><input name="rooms" type="number" className="input" onChange={handleChange} /></div>
              <div><label className="label">Baños</label><input name="bathrooms" type="number" className="input" onChange={handleChange} /></div>
              <div><label className="label">Garajes</label><input name="parking" type="number" className="input" onChange={handleChange} /></div>
              <div><label className="label">Tipo Garaje</label><select name="garage_type" className="input" onChange={handleChange}><option>Cubierto</option><option>Descubierto</option></select></div>
              <div><label className="label">Disposición</label><select name="garage_arrangement" className="input" onChange={handleChange}><option>Independiente</option><option>En Línea</option><option>Servidumbre</option></select></div>
              <div><label className="label">Comedor</label><select name="dining_type" className="input" onChange={handleChange}><option>Un solo espacio</option><option>Independiente</option></select></div>
              <div><label className="label">Cocina</label><select name="kitchen_type" className="input" onChange={handleChange}><option>Integral</option><option>Semi-Integral</option><option>Sencilla</option></select></div>
              
              {/* CAMPO GAS NUEVO */}
              <div>
                <label className="label text-blue-800">Tipo de Gas</label>
                <select value={gasType} onChange={(e) => setGasType(e.target.value)} className="input border-blue-200">
                  <option value="">Seleccione...</option>
                  <option value="Natural">Gas Natural</option>
                  <option value="Propano">Gas Propano</option>
                  <option value="No tiene">No tiene</option>
                </select>
              </div>
              
              <div><label className="label">Pisos</label><select name="floor_material" className="input" onChange={handleChange}><option>Cerámica</option><option>Madera Laminada</option><option>Porcelanato</option><option>Mármol</option><option>Alfombra</option></select></div>
           </div>
        </div>

        {/* 4.5 DETALLE POR PISOS (NUEVO) */}
        <div className="bg-white p-6 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <FontAwesomeIcon icon={faLayerGroup} /> Detalle por Niveles
              </h3>
              <button
                type="button"
                onClick={addFloor}
                className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded hover:bg-indigo-700 shadow-sm"
              >
                + AGREGAR NIVEL
              </button>
            </div>

            <div className="space-y-4">
              {floors.length === 0 && <p className="text-sm text-gray-400 italic text-center py-4">No se han detallado pisos específicos.</p>}
              {floors.map((floor) => (
                <div key={floor.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative animate-fade-in">
                  <button 
                      type="button" 
                      onClick={() => removeFloor(floor.id)}
                      className="absolute top-2 right-2 text-red-500 hover:text-red-700 w-6 h-6 flex items-center justify-center"
                      title="Eliminar nivel"
                  >
                      <FontAwesomeIcon icon={faTrash} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                      <div className="md:col-span-1">
                          <label className="label text-xs">Nombre Nivel</label>
                          <input 
                              type="text" 
                              value={floor.level}
                              onChange={(e) => updateFloor(floor.id, "level", e.target.value)}
                              className="input h-9 py-1"
                              placeholder="Ej: Piso 1"
                          />
                          <div className="mt-3">
                            <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer select-none">
                                <input 
                                    type="checkbox"
                                    checked={floor.hasTerrace}
                                    onChange={(e) => updateFloor(floor.id, "hasTerrace", e.target.checked)}
                                    className="h-4 w-4 text-indigo-600 rounded"
                                />
                                Tiene Terraza/Balcón
                            </label>
                          </div>
                      </div>

                      <div className="flex gap-3 md:col-span-1">
                          <div className="flex-1">
                              <label className="label text-xs">Habs</label>
                              <input 
                                  type="number" min="0"
                                  value={floor.bedrooms}
                                  onChange={(e) => updateFloor(floor.id, "bedrooms", parseInt(e.target.value))}
                                  className="input h-9 py-1 text-center"
                              />
                          </div>
                          <div className="flex-1">
                              <label className="label text-xs">Baños</label>
                              <input 
                                  type="number" min="0"
                                  value={floor.bathrooms}
                                  onChange={(e) => updateFloor(floor.id, "bathrooms", parseInt(e.target.value))}
                                  className="input h-9 py-1 text-center"
                              />
                          </div>
                      </div>

                      <div className="md:col-span-2">
                          <label className="label text-xs">Detalles / Acabados</label>
                          <textarea 
                              value={floor.notes}
                              onChange={(e) => updateFloor(floor.id, "notes", e.target.value)}
                              placeholder="Ej: Cocina abierta, piso en mármol, cuarto del servicio..."
                              className="input text-sm h-20 resize-none"
                          />
                      </div>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* 5. SUB-UNIDADES */}
        {formType === "Casa" && (
          <div className="border-2 border-dashed border-blue-200 bg-blue-50/30 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-blue-800">¿Apartamentos/Locales Independientes?</h3>
                <button type="button" onClick={() => setHasSubUnits(!hasSubUnits)} className={"px-4 py-1 rounded font-bold " + (hasSubUnits ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500")}>{hasSubUnits ? "SI, GESTIONAR" : "NO"}</button>
              </div>
              {hasSubUnits && (
                <div className="space-y-3">
                  {subUnits.map((unit, idx) => (
                    <div key={idx} className="flex gap-2 items-end bg-white p-3 rounded shadow-sm">
                       <div className="w-10 font-bold text-gray-400">#{idx+1}</div>
                       <div className="flex-1"><label className="text-xs font-bold">Tipo</label><select className="input h-9 py-1" value={unit.type} onChange={e => updateSubUnit(idx, "type", e.target.value)}><option>Apto</option><option>Local</option></select></div>
                       <div className="w-20"><label className="text-xs font-bold">Habs</label><input type="number" className="input h-9 py-1" value={unit.rooms} onChange={e => updateSubUnit(idx, "rooms", e.target.value)} /></div>
                       <div className="flex-1"><label className="text-xs font-bold">Canon</label><input className="input h-9 py-1" placeholder="$" value={unit.rent} onChange={e => updateSubUnit(idx, "rent", e.target.value)} /></div>
                       <button type="button" onClick={() => removeSubUnit(idx)} className="text-red-500 hover:bg-red-50 p-2 rounded"><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={addSubUnit} className="text-sm font-bold text-blue-600 hover:underline">+ Agregar unidad</button>
                </div>
              )}
          </div>
        )}

        {/* 6. MULTIMEDIA */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
           <h3 className="section-title">Multimedia</h3>
           <div className="mb-6 bg-white p-4 rounded border border-gray-200 flex gap-4 items-start">
             <div className="flex-1">
               <label className="label flex items-center gap-2 mb-2"><FontAwesomeIcon icon={faVideo} className="text-red-600" /> Video Portada (YouTube)</label>
               <input name="video_url" className="input" placeholder="Pegue aquí el link de YouTube..." onChange={handleVideoChange} value={formData.video_url} />
               <p className="text-xs text-gray-400 mt-1">Este video aparecerá destacado en el inmueble.</p>
             </div>
             {videoThumb ? (
               <div className="w-32 h-24 bg-black rounded overflow-hidden shadow-lg border-2 border-red-500 relative group">
                 <img src={videoThumb} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                 <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs bg-black/50">VISTA PREVIA</div>
               </div>
             ) : (
               <div className="w-32 h-24 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs border border-dashed border-gray-300">Sin Video</div>
             )}
           </div>

           <label className="label mb-2 block">Galería de Fotos (Arrastre para ordenar)</label>
           <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center bg-white cursor-pointer relative hover:border-blue-400 transition-colors">
              <input type="file" multiple onChange={(e) => { if (e.target.files) { const files = Array.from(e.target.files); setImages([...images, ...files]); setImagePreviews([...imagePreviews, ...files.map(f => URL.createObjectURL(f))]); } }} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
              <FontAwesomeIcon icon={faCloudUploadAlt} className="text-4xl text-gray-400 mb-2" />
              <p className="text-gray-500">Click o arrastrar fotos aquí</p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 select-none">
             {imagePreviews.map((src, idx) => (
               <div 
                 key={idx}
                 draggable
                 onDragStart={() => (dragItem.current = idx)}
                 onDragEnter={() => (dragOverItem.current = idx)}
                 onDragEnd={handleSort}
                 onDragOver={(e) => e.preventDefault()} 
                 className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
               >
                 <img src={src} className="w-full h-full object-cover pointer-events-none" />
                 <div className="absolute top-0 right-0 p-1 flex gap-1 bg-black/60 w-full justify-end backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-20">
                   <button type="button" onClick={() => rotateImage(idx)} className="bg-blue-600 text-white w-7 h-7 rounded hover:bg-blue-500 shadow-sm"><FontAwesomeIcon icon={faRotateRight} /></button>
                   <button type="button" onClick={() => removeImage(idx)} className="bg-red-600 text-white w-7 h-7 rounded hover:bg-red-500 shadow-sm"><FontAwesomeIcon icon={faTrash} /></button>
                 </div>
                 <div className="absolute bottom-1 left-1 bg-primary text-white text-xs px-2 py-1 rounded font-bold shadow-sm z-10">{idx + 1}</div>
                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity flex items-center justify-center"><FontAwesomeIcon icon={faGripVertical} className="text-white drop-shadow-lg text-2xl" /></div>
               </div>
             ))}
           </div>
        </div>

        {/* 7. CARACTERÍSTICAS */}
        <div>
          <label className="label mb-2 block">Características y Zonas Comunes</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {featuresByType[formType].map(feat => (
              <label key={feat} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer text-xs font-medium">
                <input type="checkbox" checked={formData.features.includes(feat)} onChange={() => toggleFeature(feat)} />
                {feat}
              </label>
            ))}
          </div>
        </div>

        {/* 8. DATOS PROPIETARIO (CONFIDENCIALES) */}
        <div className="bg-red-50 p-6 rounded border border-red-200">
           <div className="text-red-800 font-bold text-sm uppercase mb-4 border-b border-red-200 pb-2 flex items-center gap-2">
             <FontAwesomeIcon icon={faUserTie} /> Datos Privados y Confidenciales
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                 <label className="label text-red-700 flex items-center gap-2"><FontAwesomeIcon icon={faMapMarkedAlt} /> Dirección Exacta del Inmueble</label>
                 <input name="address" required className="input border-red-300 focus:border-red-500" placeholder="Ej: Calle 123 # 45-67 Int 2 Apto 501" onChange={handleChange} />
                 <p className="text-xs text-red-500 mt-1">Esta dirección NO será pública en la web.</p>
              </div>
              <div><label className="label text-red-700">Nombre Propietario</label><input name="owner_name" className="input border-red-300" onChange={handleChange} /></div>
              <div><label className="label text-red-700">Teléfono</label><input name="owner_phone" className="input border-red-300" onChange={handleChange} /></div>
              <div><label className="label text-red-700">Email/Cédula</label><input name="owner_contact" className="input border-red-300" onChange={handleChange} /></div>
           </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:bg-blue-900 transition-all text-lg shadow-lg">
           {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "GUARDAR INMUEBLE"}
        </button>
      </form>
      <style>{`
        .label { display: block; font-size: 0.75rem; font-weight: 800; color: #374151; margin-bottom: 4px; text-transform: uppercase; }
        .input { width: 100%; padding: 10px; border: 1px solid #D1D5DB; rounded: 6px; font-size: 0.95rem; outline: none; transition: all 0.2s; }
        .input:focus { border-color: #00437C; box-shadow: 0 0 0 3px rgba(0, 67, 124, 0.1); }
        .section-title { font-size: 1.1rem; font-weight: 800; margin-bottom: 1rem; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; }
      `}</style>
    </div>
  );
};

export default CreateProperty;