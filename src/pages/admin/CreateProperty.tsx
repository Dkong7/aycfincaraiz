import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faSave, faBuilding, faWarehouse, faHome, faTree, faLock, faMagic, faEdit } from "@fortawesome/free-solid-svg-icons";

const CreateProperty = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // SI HAY ID, ESTAMOS EN MODO EDICIÓN
  const isEditing = !!id;

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("Casa"); 

  const [formData, setFormData] = useState({
    title: "", description: "", price: "", 
    city: "Bogotá", neighborhood: "", 
    rooms: "", bathrooms: "", parking: "", area_built: "", 
    stratum: "", admin_price: "0",
    floor_number: "", total_floors: "", has_elevator: false,
    complex_amenities: "", warehouse_height: "", loading_dock: false, lot_area: ""
  });

  const [privateData, setPrivateData] = useState({
    owner_name: "", owner_phone: "", 
    exact_address: "", apt_number: "", complex_name: "", 
    matricula: ""
  });

  const [images, setImages] = useState<string[]>([]);
  const [features, setFeatures] = useState("");
  const [listingId, setListingId] = useState<number | null>(null);

  // --- EFECTO: CARGAR DATOS SI ES EDICIÓN ---
  useEffect(() => {
    if (isEditing) {
      loadProperty();
    }
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("properties").select("*").eq("id", id).single();
    if (error) {
       alert("Error cargando inmueble");
       navigate("/admin/inmuebles");
       return;
    }
    
    if (data) {
       // Mapear datos de la DB al formulario
       setType(data.property_type || "Casa");
       setListingId(data.listing_id);
       setFormData({
          title: data.title,
          description: data.description, // Nota: Si concatenaste info extra, aquí aparecerá junta
          price: data.price.toString(),
          city: data.city,
          neighborhood: data.neighborhood,
          rooms: data.rooms.toString(),
          bathrooms: data.bathrooms.toString(),
          parking: data.parking.toString(),
          area_built: data.area_built.toString(),
          stratum: data.stratum.toString(),
          admin_price: data.admin_price.toString(),
          // Campos específicos (no existen columnas reales, se resetean o se dejan genéricos)
          floor_number: "", total_floors: "", has_elevator: false,
          complex_amenities: "", warehouse_height: "", loading_dock: false, lot_area: ""
       });
       setImages(data.images || []);
       setFeatures(data.features ? data.features.join(", ") : "");
       // Nota: Private Data no se está guardando en DB real en este demo, así que no se puede recuperar.
    }
    setLoading(false);
  };

  const generateCode = () => {
     const date = new Date();
     const prefix = `${date.getFullYear().toString().substr(-2)}${(date.getMonth()+1).toString().padStart(2, "0")}`;
     const rand = Math.floor(100 + Math.random() * 900);
     return parseInt(`${prefix}${rand}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let finalDesc = formData.description;
    // Concatenar info específica solo si es nuevo (para no duplicar en edición) o limpiar antes
    // Para simplificar: guardamos todo.
    if(type === "Apartamento") finalDesc += `\n\n[Detalles Apt: Piso ${formData.floor_number}, Ascensor: ${formData.has_elevator ? "Sí" : "No"}]`;
    if(type === "Bodega") finalDesc += `\n\n[Altura: ${formData.warehouse_height}m, Muelle: ${formData.loading_dock ? "Sí" : "No"}]`;
    if(type === "Casa Campestre") finalDesc += `\n\n[Lote: ${formData.lot_area}m²]`;

    const payload = {
      title: formData.title,
      description: finalDesc,
      price: Number(formData.price),
      city: formData.city,
      neighborhood: formData.neighborhood,
      property_type: type,
      rooms: Number(formData.rooms) || 0,
      bathrooms: Number(formData.bathrooms) || 0,
      parking: Number(formData.parking) || 0,
      area_built: Number(formData.area_built) || 0,
      stratum: Number(formData.stratum) || 0,
      admin_price: Number(formData.admin_price) || 0,
      images: images,
      features: features.split(",").map(f => f.trim()),
    };

    let error;

    if (isEditing) {
       // UPDATE
       const res = await supabase.from("properties").update(payload).eq("id", id);
       error = res.error;
    } else {
       // INSERT
       const autoCode = generateCode();
       const res = await supabase.from("properties").insert([{ ...payload, listing_id: autoCode }]);
       error = res.error;
    }

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert(isEditing ? "Cambios guardados correctamente." : "Inmueble creado con éxito.");
      navigate("/admin/inmuebles");
    }
    setLoading(false);
  };

  const renderSpecificFields = () => {
     switch(type) {
        case "Apartamento":
           return (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                 <div><label className="text-xs font-bold text-blue-900">Piso No.</label><input className="w-full p-2 border rounded" type="number" value={formData.floor_number} onChange={e=>setFormData({...formData, floor_number:e.target.value})} /></div>
                 <div><label className="text-xs font-bold text-blue-900">Total Pisos Ed.</label><input className="w-full p-2 border rounded" type="number" value={formData.total_floors} onChange={e=>setFormData({...formData, total_floors:e.target.value})} /></div>
                 <div className="flex items-center gap-2 mt-4"><input type="checkbox" checked={formData.has_elevator} onChange={e=>setFormData({...formData, has_elevator:e.target.checked})} /> <label className="text-sm">Tiene Ascensor</label></div>
                 <div><label className="text-xs font-bold text-blue-900">Zonas Comunes</label><input className="w-full p-2 border rounded" placeholder="Gym, BBQ..." value={formData.complex_amenities} onChange={e=>setFormData({...formData, complex_amenities:e.target.value})} /></div>
              </div>
           );
        case "Bodega":
           return (
              <div className="grid grid-cols-2 gap-4 p-4 bg-orange-50 rounded-lg border border-orange-100">
                 <div><label className="text-xs font-bold text-orange-900">Altura Libre (m)</label><input className="w-full p-2 border rounded" type="number" value={formData.warehouse_height} onChange={e=>setFormData({...formData, warehouse_height:e.target.value})} /></div>
                 <div className="flex items-center gap-2 mt-4"><input type="checkbox" checked={formData.loading_dock} onChange={e=>setFormData({...formData, loading_dock:e.target.checked})} /> <label className="text-sm font-bold text-orange-900">Tiene Muelle de Carga</label></div>
              </div>
           );
        case "Casa Campestre":
           return (
              <div className="grid grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg border border-green-100">
                 <div><label className="text-xs font-bold text-green-900">Área Lote (m²)</label><input className="w-full p-2 border rounded" type="number" value={formData.lot_area} onChange={e=>setFormData({...formData, lot_area:e.target.value})} /></div>
                 <div><label className="text-xs font-bold text-green-900">Fuente Agua/Riego</label><input className="w-full p-2 border rounded" placeholder="Acueducto, Aljibe..." /></div>
              </div>
           );
        default: return null;
     }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
           <button onClick={() => navigate("/admin/inmuebles")} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
              <FontAwesomeIcon icon={faArrowLeft} /> Cancelar
           </button>
           <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">
              {isEditing ? "Editar Inmueble" : "Nuevo Inmueble"}
           </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                 <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faHome} className="text-yellow-500"/> Información Pública</h3>
                 
                 <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Inmueble</label>
                    <div className="flex gap-2">
                       {["Casa", "Apartamento", "Bodega", "Casa Campestre"].map(t => (
                          <button type="button" key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${type === t ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                             {t}
                          </button>
                       ))}
                    </div>
                 </div>

                 {renderSpecificFields()}

                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <div><label className="text-xs font-bold text-slate-500">Título</label><input required className="w-full p-2 bg-slate-50 border rounded" value={formData.title} onChange={e=>setFormData({...formData, title:e.target.value})} /></div>
                    <div><label className="text-xs font-bold text-slate-500">Precio (COP)</label><input required type="number" className="w-full p-2 bg-slate-50 border rounded" value={formData.price} onChange={e=>setFormData({...formData, price:e.target.value})} /></div>
                 </div>
                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <div><label className="text-xs font-bold text-slate-500">Barrio</label><input required className="w-full p-2 bg-slate-50 border rounded" value={formData.neighborhood} onChange={e=>setFormData({...formData, neighborhood:e.target.value})} /></div>
                    <div><label className="text-xs font-bold text-slate-500">Ciudad</label><input required className="w-full p-2 bg-slate-50 border rounded" value={formData.city} onChange={e=>setFormData({...formData, city:e.target.value})} /></div>
                 </div>
                 <div className="grid grid-cols-4 gap-2 mt-4">
                    <div><label className="text-[10px] font-bold text-slate-500">Habs</label><input type="number" className="w-full p-2 bg-slate-50 border rounded" value={formData.rooms} onChange={e=>setFormData({...formData, rooms:e.target.value})} /></div>
                    <div><label className="text-[10px] font-bold text-slate-500">Baños</label><input type="number" className="w-full p-2 bg-slate-50 border rounded" value={formData.bathrooms} onChange={e=>setFormData({...formData, bathrooms:e.target.value})} /></div>
                    <div><label className="text-[10px] font-bold text-slate-500">Área (m²)</label><input type="number" className="w-full p-2 bg-slate-50 border rounded" value={formData.area_built} onChange={e=>setFormData({...formData, area_built:e.target.value})} /></div>
                    <div><label className="text-[10px] font-bold text-slate-500">Estrato</label><input type="number" className="w-full p-2 bg-slate-50 border rounded" value={formData.stratum} onChange={e=>setFormData({...formData, stratum:e.target.value})} /></div>
                 </div>
                 <div className="mt-4">
                    <label className="text-xs font-bold text-slate-500">Descripción Pública</label>
                    <textarea className="w-full p-3 bg-slate-50 border rounded h-32" value={formData.description} onChange={e=>setFormData({...formData, description:e.target.value})}></textarea>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg text-center">
                 <FontAwesomeIcon icon={faMagic} className="text-yellow-500 text-2xl mb-2" />
                 <p className="text-xs text-slate-400 uppercase">Código</p>
                 <p className="text-2xl font-mono font-bold tracking-widest text-yellow-400">
                    {isEditing && listingId ? listingId : "AUTO-GENERADO"}
                 </p>
              </div>

              <div className="bg-red-50 p-6 rounded-xl border border-red-100 relative overflow-hidden">
                 <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-[10px] font-bold px-2 py-1 rounded-bl">SOLO ADMIN</div>
                 <h3 className="font-bold text-red-900 mb-4 flex items-center gap-2"><FontAwesomeIcon icon={faLock}/> Datos Privados</h3>
                 <div className="space-y-3">
                    <div><label className="text-xs font-bold text-red-800">Nombre Propietario</label><input className="w-full p-2 bg-white border border-red-200 rounded" value={privateData.owner_name} onChange={e=>setPrivateData({...privateData, owner_name:e.target.value})} /></div>
                    <div><label className="text-xs font-bold text-red-800">Teléfono</label><input className="w-full p-2 bg-white border border-red-200 rounded" value={privateData.owner_phone} onChange={e=>setPrivateData({...privateData, owner_phone:e.target.value})} /></div>
                 </div>
              </div>

              <button disabled={loading} type="submit" className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-3 transition transform hover:scale-105">
                 <FontAwesomeIcon icon={isEditing ? faEdit : faSave} className="text-xl"/> {loading ? "Procesando..." : isEditing ? "GUARDAR CAMBIOS" : "PUBLICAR INMUEBLE"}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProperty;