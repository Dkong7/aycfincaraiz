import React, { useState } from 'react';
import { X, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export const SearchBar = () => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* BARRA EN HOME */}
      <section className="relative z-20 -mt-10 px-6 mb-16">
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6 md:p-8 transform transition-transform hover:-translate-y-1">
           <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] text-center mb-6 uppercase tracking-tight">
             {t.home.searchTitle}
           </h2>
           <div className="relative flex gap-2">
             <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                <input 
                  type="text" 
                  readOnly // Solo lectura para forzar el modal al click
                  onClick={() => setModalOpen(true)}
                  placeholder={t.home.placeholder}
                  className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 ring-[#15803d] text-lg cursor-pointer hover:bg-gray-100 transition-colors" 
                />
             </div>
             <button onClick={() => setModalOpen(true)} className="bg-[#15803d] text-white font-bold py-2 px-8 rounded-xl hover:bg-[#14532d] transition-colors uppercase shadow-lg">
               {t.home.searchBtn}
             </button>
           </div>
        </div>
      </section>

      {/* MODAL DE BÚSQUEDA */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A192F]/90 backdrop-blur-sm flex items-start justify-center p-4 pt-20 animate-in fade-in duration-200">
           <div className="bg-white w-full max-w-3xl rounded-2xl p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
              <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                <X size={20}/>
              </button>
              
              <h3 className="text-xl font-black text-[#0A192F] mb-6 uppercase border-b pb-4">Últimas Oportunidades</h3>
              
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                 {/* Mock Data de Inmuebles Recientes */}
                 {[1,2,3].map(i => (
                    <Link to={`/inmuebles/${i}`} key={i} onClick={() => setModalOpen(false)} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 hover:border-[#15803d]/30 transition-all group">
                       <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                          <img src={`https://source.unsplash.com/random/200x200?apartment&sig=${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start">
                             <h4 className="font-bold text-[#0A192F] group-hover:text-[#15803d] transition-colors">Penthouse en Rosales</h4>
                             <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded text-gray-500">COD: 100{i}</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">3 Hab • 4 Baños • 200m²</p>
                          <p className="text-[#15803d] font-black text-lg mt-1">$1.250.000.000</p>
                       </div>
                       <ArrowRight className="text-gray-300 group-hover:text-[#15803d] group-hover:translate-x-1 transition-all" />
                    </Link>
                 ))}
              </div>

              <div className="mt-6 pt-4 border-t text-center">
                 <Link to="/inmuebles" onClick={() => setModalOpen(false)} className="inline-flex items-center gap-2 text-[#0A192F] font-bold hover:text-[#15803d] uppercase text-sm tracking-widest">
                    Ver todo el inventario <ArrowRight size={16}/>
                 </Link>
              </div>
           </div>
        </div>
      )}
    </>
  );
};
