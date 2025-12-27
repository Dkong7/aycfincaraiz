import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Star, Trash2, Edit, Crown, ArrowLeft, LogOut, Home, Building2, Warehouse, Mountain, Map } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CustomModal from '../../components/ui/CustomModal';

const Inventory = () => {
  const [props, setProps] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, type: 'success', msg: '' });

  const fetchProps = async () => {
    const { data } = await supabase.from('properties').select('*')
      .order('is_hero', { ascending: false })
      .order('is_opportunity', { ascending: false })
      .order('created_at', { ascending: false });
    if(data) setProps(data);
  };

  useEffect(() => { fetchProps(); }, []);

  const toggleSlot = async (id, type) => {
    const rpcName = type === 'hero' ? 'toggle_hero_slot' : 'toggle_opportunity_slot';
    const { data, error } = await supabase.rpc(rpcName, { p_id: id });
    if (error || !data.success) alert(error?.message || data?.msg);
    else fetchProps();
  };

  const deleteProp = async (id) => {
    if(!confirm("¿Eliminar este inmueble?")) return;
    await supabase.from('properties').delete().eq('id', id);
    fetchProps();
  };

  // CONFIGURACIÓN DE TAGS VISUALES
  const typeConfig = {
    Casa: { color: 'bg-green-500/20 text-green-400 border-green-500/50', icon: <Home size={12}/>, label: 'Casa' },
    Apartamento: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/50', icon: <Building2 size={12}/>, label: 'Apto' },
    Bodega: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', icon: <Warehouse size={12}/>, label: 'Bodega' },
    CasaCampo: { color: 'bg-purple-500/20 text-purple-400 border-purple-500/50', icon: <Mountain size={12}/>, label: 'Campo' },
    Lote: { color: 'bg-gray-500/20 text-gray-400 border-gray-500/50', icon: <Map size={12}/>, label: 'Lote' }
  };

  const isAlf = user?.role === 'alfonso';
  
  return (
    <div className={`min-h-screen ${isAlf ? 'bg-black' : 'bg-white'} font-sans pb-20`}>
       <div className={`${isAlf ? 'bg-[#050b14]' : 'bg-pink-50'} p-6 border-b border-gray-800 flex justify-between items-center sticky top-0 z-40 shadow-md`}>
          <div className="flex items-center gap-4">
             <Link to="/dashboard" className="p-2 rounded-full hover:bg-white/10 text-gray-400"><ArrowLeft/></Link>
             <h1 className={`text-xl font-black uppercase ${isAlf ? 'text-white' : 'text-gray-800'}`}>Inventario Maestro</h1>
          </div>
          <button onClick={() => {logout(); navigate('/')}} className="text-red-500 font-bold text-xs uppercase flex items-center gap-2"><LogOut size={14}/> Salir</button>
       </div>

       <div className="max-w-7xl mx-auto p-6">
          <div className="bg-[#0f172a] rounded-2xl border border-gray-800 overflow-hidden shadow-2xl">
             <table className="w-full text-sm text-gray-300">
                <thead className="bg-black/40 text-xs font-bold text-gray-400 uppercase tracking-wider">
                   <tr>
                      <th className="p-4 text-left">Inmueble</th>
                      <th className="p-4 text-center">Tipo</th> {/* COLUMNA NUEVA */}
                      <th className="p-4 text-center text-blue-400"><Star size={14} className="inline"/> Hero</th>
                      <th className="p-4 text-center text-yellow-400"><Crown size={14} className="inline"/> Reina</th>
                      <th className="p-4 text-center text-green-400">Fav</th>
                      <th className="p-4 text-right">Acciones</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                   {props.map(p => {
                      const typeData = typeConfig[p.property_type] || typeConfig['Casa'];
                      return (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                         <td className="p-4">
                            <div className="flex items-center gap-3">
                               <img src={p.main_media_url} className="w-12 h-12 rounded-lg bg-gray-800 object-cover border border-gray-700"/>
                               <div>
                                  <div className="font-bold text-white text-sm">{p.address_visible}</div>
                                  <div className="text-[10px] font-mono text-[#009B4D] opacity-80">{p.ayc_id}</div>
                               </div>
                            </div>
                         </td>
                         
                         {/* TAG DE COLOR ELEGANTE */}
                         <td className="p-4 text-center">
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase border ${typeData.color}`}>
                               {typeData.icon} {typeData.label}
                            </div>
                         </td>

                         <td className="p-4 text-center cursor-pointer hover:bg-blue-900/20 transition-colors" onClick={() => toggleSlot(p.id, 'hero')}>
                            {p.is_hero ? <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto shadow-lg shadow-blue-500/40">{p.hero_order}</div> : <div className="w-8 h-8 rounded-full border border-gray-700 mx-auto opacity-20 hover:border-blue-500"></div>}
                         </td>
                         <td className="p-4 text-center cursor-pointer hover:bg-yellow-900/20 transition-colors" onClick={() => toggleSlot(p.id, 'opportunity')}>
                            <Crown size={24} className={`mx-auto transition-all ${p.is_opportunity ? 'text-yellow-400 fill-yellow-400 scale-110 drop-shadow-lg' : 'text-gray-700 opacity-20 hover:text-yellow-500'}`}/>
                         </td>
                         <td className="p-4 text-center cursor-pointer" onClick={async () => { await supabase.from('properties').update({is_ayc_favorite: !p.is_ayc_favorite}).eq('id', p.id); fetchProps(); }}>
                            <Star size={20} className={`mx-auto transition-all ${p.is_ayc_favorite ? 'text-green-500 fill-green-500 scale-110' : 'text-gray-700 opacity-20 hover:text-green-500'}`}/>
                         </td>
                         <td className="p-4 text-right flex justify-end gap-2">
                            <button onClick={() => navigate(`/dashboard/editar/${p.id}`)} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20"><Edit size={16}/></button>
                            <button onClick={() => deleteProp(p.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-500/20"><Trash2 size={16}/></button>
                         </td>
                      </tr>
                   )})}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};
export default Inventory;