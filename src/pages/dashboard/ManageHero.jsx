import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Star, Image, X, Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageHero = () => {
  const [heroProps, setHeroProps] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [galleryUrls, setGalleryUrls] = useState("");

  const fetchData = async () => {
    // Traer los 5 del Hero
    const { data: heroes } = await supabase.from('properties').select('*').eq('is_hero', true).order('hero_order');
    // Traer el resto del inventario
    const { data: inv } = await supabase.from('properties').select('*').eq('is_hero', false).order('created_at', { ascending: false }).limit(20);
    
    if(heroes) setHeroProps(heroes);
    if(inv) setInventory(inv);
  };

  useEffect(() => { fetchData(); }, []);

  const addToHero = async (id) => {
    if (heroProps.length >= 5) return alert("¡El Hero está lleno (Máx 5)! Quita una propiedad primero.");
    const { error } = await supabase.from('properties').update({ is_hero: true, hero_order: heroProps.length + 1 }).eq('id', id);
    if(error) alert("Error: " + error.message);
    fetchData();
  };

  const removeFromHero = async (id) => {
    await supabase.from('properties').update({ is_hero: false, hero_order: null }).eq('id', id);
    fetchData();
  };

  const saveGallery = async (id) => {
    // Convertir texto de textarea a Array
    const urls = galleryUrls.split(',').map(u => u.trim()).filter(u => u !== "");
    await supabase.from('properties').update({ gallery_images: urls }).eq('id', id);
    setEditingId(null);
    setGalleryUrls("");
    alert("Galería actualizada");
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white p-8 font-sans">
       <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-blue-900/30 pb-4">
             <div>
                <h1 className="text-3xl font-black uppercase text-blue-500">Gestor de Portada (Hero)</h1>
                <p className="text-xs text-blue-300">Bienvenido, Alfonso. Aquí decides qué ven los clientes al entrar.</p>
             </div>
             <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={16}/> Volver al Panel
             </Link>
          </div>

          {/* ZONA SUPERIOR: EL HERO ACTUAL */}
          <div className="mb-12">
             <h3 className="text-sm font-bold uppercase text-blue-400 mb-4 tracking-widest">Actualmente en Portada (Máx 5)</h3>
             <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {heroProps.map((p, idx) => (
                   <div key={p.id} className="bg-[#0f172a] rounded-xl overflow-hidden border border-blue-500/50 relative group shadow-lg shadow-blue-900/20">
                      <div className="absolute top-2 left-2 bg-blue-600 text-xs font-bold px-2 py-1 rounded shadow z-10">POSICIÓN {idx + 1}</div>
                      <button onClick={() => removeFromHero(p.id)} className="absolute top-2 right-2 bg-red-500 p-1 rounded hover:bg-red-600 z-10 shadow"><X size={14}/></button>
                      
                      <div className="h-40 bg-gray-800 relative">
                         <img src={p.main_media_url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"/>
                      </div>
                      
                      <div className="p-4">
                         <p className="font-bold text-sm truncate text-white mb-1">{p.address_visible}</p>
                         <p className="text-xs text-gray-400 mb-3">{p.property_type}</p>
                         
                         {/* EDICIÓN DE GALERÍA (MINIATURAS) */}
                         {editingId === p.id ? (
                           <div className="bg-black/40 p-2 rounded border border-blue-500/30 animate-in fade-in zoom-in duration-200">
                              <label className="text-[10px] text-blue-300 block mb-1">URLs de fotos (separadas por coma)</label>
                              <textarea 
                                className="w-full bg-black/50 text-xs p-2 border border-gray-600 rounded text-gray-300 focus:border-blue-500 outline-none h-20" 
                                placeholder="https://..., https://..."
                                value={galleryUrls}
                                onChange={e => setGalleryUrls(e.target.value)}
                              />
                              <div className="flex gap-2 mt-2">
                                 <button onClick={() => saveGallery(p.id)} className="flex-1 bg-green-600 text-xs font-bold py-1 rounded hover:bg-green-500 flex justify-center gap-1"><Save size={12}/> Guardar</button>
                                 <button onClick={() => setEditingId(null)} className="px-2 bg-gray-700 text-xs font-bold py-1 rounded hover:bg-gray-600">X</button>
                              </div>
                           </div>
                         ) : (
                           <button onClick={() => { setEditingId(p.id); setGalleryUrls(p.gallery_images?.join(', ') || ''); }} className="w-full bg-blue-900/40 text-blue-300 text-xs py-2 rounded hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-2 border border-blue-500/20">
                              <Image size={14}/> Gestionar {p.gallery_images?.length || 0} Fotos
                           </button>
                         )}
                      </div>
                   </div>
                ))}
                
                {/* SLOTS VACÍOS */}
                {[...Array(5 - heroProps.length)].map((_, i) => (
                   <div key={i} className="bg-[#0f172a]/30 rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center text-gray-600 text-xs font-bold uppercase p-4 min-h-[200px]">
                      <span className="mb-2 text-2xl opacity-20">+</span>
                      Espacio Disponible
                   </div>
                ))}
             </div>
          </div>

          {/* ZONA INFERIOR: INVENTARIO */}
          <div className="bg-[#0f172a] rounded-2xl border border-gray-800 p-6">
             <h3 className="text-xl font-bold uppercase mb-6 text-gray-300 border-b border-gray-700 pb-2">Seleccionar del Inventario</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                   <thead className="bg-black/20 text-gray-400 uppercase text-xs">
                      <tr>
                         <th className="p-4 rounded-l-lg">Propiedad</th>
                         <th className="p-4">Tipo</th>
                         <th className="p-4">Precio</th>
                         <th className="p-4 rounded-r-lg text-right">Acción</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-800">
                      {inventory.map(p => (
                         <tr key={p.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded bg-gray-700 overflow-hidden">
                                     <img src={p.main_media_url} className="w-full h-full object-cover"/>
                                  </div>
                                  <span className="font-bold text-white">{p.address_visible}</span>
                               </div>
                            </td>
                            <td className="p-4 text-gray-400">{p.property_type}</td>
                            <td className="p-4 font-mono text-blue-400">${new Intl.NumberFormat('es-CO').format(p.price_cop)}</td>
                            <td className="p-4 text-right">
                               <button onClick={() => addToHero(p.id)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase flex items-center gap-2 ml-auto shadow-lg shadow-blue-900/50 transition-all hover:scale-105">
                                  <Star size={14}/> Destacar
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
       </div>
    </div>
  );
};
export default ManageHero;