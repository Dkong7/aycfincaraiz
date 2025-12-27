import React, { useEffect, useState, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import { Star, X, Save, ArrowLeft, Upload, GripVertical, Image, LayoutTemplate } from 'lucide-react';
import { Link } from 'react-router-dom';
import SmartModal from '../../components/ui/SmartModal';

const ManageHero = () => {
  const [heroProps, setHeroProps] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [photos, setPhotos] = useState([]); 
  
  const [modal, setModal] = useState({ open: false, config: {} });
  
  const dragPropItem = useRef();
  const dragPropOverItem = useRef();
  const dragPhotoItem = useRef();
  const dragPhotoOverItem = useRef();

  const fetchData = async () => {
    const { data } = await supabase.from('properties').select('*').eq('is_hero', true).order('hero_order', { ascending: true });
    if(data) setHeroProps(data);
  };

  useEffect(() => { fetchData(); }, []);

  // --- DRAG INMUEBLES (MACRO) ---
  const handlePropDrop = async () => {
    const copyList = [...heroProps];
    const dragItemContent = copyList[dragPropItem.current];
    copyList.splice(dragPropItem.current, 1);
    copyList.splice(dragPropOverItem.current, 0, dragItemContent);
    
    dragPropItem.current = null;
    dragPropOverItem.current = null;
    setHeroProps(copyList);

    for (let i = 0; i < copyList.length; i++) {
        await supabase.from('properties').update({ hero_order: i + 1 }).eq('id', copyList[i].id);
    }
  };

  // --- DRAG FOTOS (MICRO) ---
  const handlePhotoDragStart = (e, position) => {
    dragPhotoItem.current = position;
  };
  const handlePhotoDragEnter = (e, position) => {
    dragPhotoOverItem.current = position;
  };
  const handlePhotoDrop = () => {
    const copyList = [...photos];
    const dragItemContent = copyList[dragPhotoItem.current];
    copyList.splice(dragPhotoItem.current, 1);
    copyList.splice(dragPhotoOverItem.current, 0, dragItemContent);
    
    dragPhotoItem.current = null;
    dragPhotoOverItem.current = null;
    setPhotos(copyList); // ESTO DISPARA EL RE-RENDER DE LA MINIATURA SUPERIOR
  };

  // --- GESTIÓN ---
  const startEditing = (p) => {
    setEditingId(p.id);
    // Inicializar fotos: Si hay galería úsala, sino usa la main, sino array vacío
    const initPhotos = (p.gallery_images && p.gallery_images.length > 0) 
        ? p.gallery_images 
        : (p.main_media_url ? [p.main_media_url] : []);
    setPhotos(initPhotos);
  };

  const openAddPhotoModal = () => {
     setModal({
        open: true,
        config: {
           type: 'input',
           title: 'Nueva Imagen',
           msg: 'Pega la URL de la imagen:',
           theme: 'blue',
           onConfirm: (url) => { if(url) setPhotos(prev => [...prev, url]); }
        }
     });
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const saveGallery = async (id) => {
    setModal({ open: true, config: { type: 'loading', title: 'Guardando...', theme: 'blue' } });
    await supabase.rpc('sync_main_photo', { p_id: id, new_gallery: photos });
    setEditingId(null);
    await fetchData(); 
    setModal({ open: true, config: { type: 'success', title: 'Portada Actualizada', msg: 'El cambio se refleja en el Home.', theme: 'blue', onConfirm: () => setModal({open:false}) } });
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white p-8 font-sans">
       <SmartModal isOpen={modal.open} onClose={() => setModal({...modal, open: false})} config={modal.config} />

       <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-blue-900/30 pb-4">
             <div className="flex items-center gap-4">
                <Link to="/dashboard" className="p-2 bg-blue-900/20 rounded-full hover:bg-blue-600 transition-colors"><ArrowLeft/></Link>
                <h1 className="text-3xl font-black uppercase text-blue-500">Editor Maestro</h1>
             </div>
             <p className="text-xs text-gray-400">Arrastra Inmuebles o Fotos para definir la Portada</p>
          </div>

          <div className="space-y-6">
             {heroProps.map((p, idx) => {
                const isEditing = editingId === p.id;
                
                // LÓGICA DE VISTA PREVIA:
                // Si editamos, mostramos la foto[0] del array local (photos).
                // Si no, mostramos lo que viene de base de datos.
                const previewImage = (isEditing && photos.length > 0) 
                    ? photos[0] 
                    : (p.gallery_images?.[0] || p.main_media_url);

                return (
                <div 
                   key={p.id}
                   draggable={!isEditing}
                   onDragStart={(e) => dragPropItem.current = idx}
                   onDragEnter={(e) => dragPropOverItem.current = idx}
                   onDragEnd={handlePropDrop}
                   onDragOver={(e) => e.preventDefault()}
                   className={`rounded-xl border transition-all relative overflow-hidden ${
                      idx === 0 
                      ? 'bg-gradient-to-r from-blue-900/40 to-[#0f172a] border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.2)]' 
                      : 'bg-[#0f172a] border-gray-800'
                   } ${isEditing ? 'ring-2 ring-blue-500 z-20 bg-blue-900/10' : ''}`}
                >
                   {/* NUMERO DE FONDO */}
                   <span className="absolute -right-4 -bottom-10 text-[150px] font-black text-white/5 pointer-events-none select-none">{idx + 1}</span>

                   {/* CABECERA */}
                   <div className="p-6 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-6">
                         {!isEditing && <GripVertical className={`cursor-grab hover:text-white ${idx===0 ? 'text-blue-400' : 'text-gray-600'}`}/>}
                         
                         {/* MINIATURA QUE CAMBIA DINÁMICAMENTE */}
                         <div className={`w-24 h-16 rounded-lg bg-black overflow-hidden relative group border transition-all duration-300 ${idx===0 || isEditing ? 'border-blue-400 shadow-lg scale-105' : 'border-gray-700'}`}>
                            <img src={previewImage} className="w-full h-full object-cover transition-opacity duration-300"/>
                            {(idx === 0 || isEditing) && <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center"><Star size={16} className="text-white fill-white animate-in zoom-in"/></div>}
                         </div>
                         
                         <div>
                            {idx === 0 && <span className="bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase mb-1 inline-block shadow-lg">★ PORTADA HOME</span>}
                            <h3 className={`font-bold text-xl ${idx === 0 ? 'text-blue-300' : 'text-gray-300'}`}>{p.address_visible}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-widest">{p.property_type}</p>
                         </div>
                      </div>
                      
                      {editingId !== p.id ? (
                         <button onClick={() => startEditing(p)} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-300 hover:bg-white/10 rounded font-bold text-xs uppercase transition-colors border border-white/10">
                            <Image size={14}/> Gestionar Fotos
                         </button>
                      ) : (
                         <button onClick={() => setEditingId(null)} className="px-3 py-1 text-gray-400 hover:text-white text-xs font-bold uppercase">Cancelar</button>
                      )}
                   </div>

                   {/* ZONA DE EDICIÓN FOTOS */}
                   {isEditing && (
                      <div className="p-6 bg-black/40 border-t border-gray-700 animate-in slide-in-from-top-2">
                         <div className="flex justify-between items-center mb-6">
                             <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase">
                                <LayoutTemplate size={14}/> Arrastra la foto #1 para definir Portada
                             </div>
                             <div className="flex gap-2">
                                <button onClick={openAddPhotoModal} className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs font-bold uppercase flex items-center gap-1"><Upload size={12}/> URL</button>
                                <button onClick={() => saveGallery(p.id)} className="px-4 py-1 bg-green-600 hover:bg-green-500 rounded text-xs font-bold uppercase flex items-center gap-2 shadow-lg hover:shadow-green-500/20"><Save size={14}/> Guardar</button>
                             </div>
                         </div>

                         <div className="flex gap-4 overflow-x-auto pb-4 px-2 min-h-[140px]">
                            {photos.map((url, i) => (
                               <div 
                                  key={i} 
                                  draggable
                                  onDragStart={(e) => handlePhotoDragStart(e, i)}
                                  onDragEnter={(e) => handlePhotoDragEnter(e, i)}
                                  onDragEnd={handlePhotoDrop}
                                  onDragOver={(e) => e.preventDefault()}
                                  className={`relative w-32 h-32 shrink-0 group border-2 rounded-lg overflow-hidden cursor-move transition-all hover:scale-105 ${i === 0 ? 'border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50' : 'border-gray-600'}`}
                               >
                                  <img src={url} className="w-full h-full object-cover pointer-events-none"/>
                                  
                                  <div className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 rounded ${i === 0 ? 'bg-blue-600 text-white' : 'bg-black/70 text-gray-300'}`}>
                                     {i + 1}
                                  </div>
                                  
                                  <button onClick={() => removePhoto(i)} className="absolute top-2 right-2 bg-red-500 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"><X size={12}/></button>
                                  
                                  {i === 0 && <div className="absolute bottom-0 w-full bg-blue-600 text-white text-[9px] font-bold text-center py-1 uppercase tracking-widest animate-pulse">NUEVA PORTADA</div>}
                               </div>
                            ))}
                            {photos.length === 0 && <div className="text-gray-500 text-xs italic flex items-center justify-center w-full">Sin fotos. Agrega una.</div>}
                         </div>
                      </div>
                   )}
                </div>
             )})} 
          </div>
       </div>
    </div>
  );
};
export default ManageHero;