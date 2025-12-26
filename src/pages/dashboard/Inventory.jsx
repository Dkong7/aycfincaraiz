import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Star, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [props, setProps] = useState([]);

  const fetchProps = async () => {
    const { data } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
    if(data) setProps(data);
  };

  useEffect(() => { fetchProps(); }, []);

  const toggleFeatured = async (id, current) => {
    await supabase.from('properties').update({ is_featured: !current }).eq('id', id);
    fetchProps(); // Recargar
  };

  const deleteProp = async (id) => {
    if(!confirm("¿Borrar inmueble?")) return;
    await supabase.from('properties').delete().eq('id', id);
    fetchProps();
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-white p-8">
       <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-black uppercase">Inventario</h1>
             <Link to="/dashboard/nuevo" className="bg-[#009B4D] px-6 py-2 rounded-full font-bold uppercase text-xs">Nuevo</Link>
          </div>

          <div className="bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-800">
             <table className="w-full">
                <thead className="bg-black/40 text-xs uppercase font-bold text-gray-400">
                   <tr>
                      <th className="p-4 text-left">AYC</th>
                      <th className="p-4 text-left">Inmueble</th>
                      <th className="p-4 text-left">Precio</th>
                      <th className="p-4 text-center">Destacado</th>
                      <th className="p-4 text-right">Acciones</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-800 text-sm">
                   {props.map(p => (
                      <tr key={p.id} className="hover:bg-white/5">
                         <td className="p-4 font-mono text-[#009B4D] font-bold">{p.ayc_id || 'PENDING'}</td>
                         <td className="p-4">
                            <div className="flex items-center gap-3">
                               <img src={p.main_media_url} className="w-10 h-10 rounded object-cover bg-gray-700"/>
                               <div>
                                  <div className="font-bold">{p.address_visible}</div>
                                  <div className="text-xs text-gray-500">{p.property_type}</div>
                               </div>
                            </div>
                         </td>
                         <td className="p-4 font-mono">${new Intl.NumberFormat('es-CO').format(p.price_cop)}</td>
                         <td className="p-4 text-center">
                            <button onClick={() => toggleFeatured(p.id, p.is_featured)} className={`p-2 rounded-full transition-colors ${p.is_featured ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-600 hover:text-gray-400'}`}>
                               <Star size={18} fill={p.is_featured ? "currentColor" : "none"}/>
                            </button>
                         </td>
                         <td className="p-4 text-right flex justify-end gap-2">
                            <button className="p-2 hover:text-blue-400"><Edit size={18}/></button>
                            <button onClick={() => deleteProp(p.id)} className="p-2 hover:text-red-500"><Trash2 size={18}/></button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};
export default Inventory;
