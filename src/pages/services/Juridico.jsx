import React from 'react';
import { Scale, Shield } from 'lucide-react';
const Juridico = () => (
  <div className="pt-24 bg-gray-50 min-h-screen font-sans">
     <div className="grid grid-cols-1 md:grid-cols-2 min-h-[70vh]">
        <div className="bg-[#0A192F] text-white p-12 flex flex-col justify-center">
           <Scale size={60} className="text-[#009B4D] mb-6"/>
           <h1 className="text-5xl font-black uppercase mb-6">Blindaje Jurídico</h1>
           <p className="text-gray-400 text-lg mb-8">No firmes promesas sin revisión. Protegemos tu patrimonio en cada etapa.</p>
           <button className="bg-[#009B4D] w-fit px-8 py-3 rounded-full font-bold uppercase">Agendar Consulta</button>
        </div>
        <div className="bg-[url('https://images.unsplash.com/photo-1589829085413-56de8ae18c73')] bg-cover bg-center"></div>
     </div>
  </div>
);
export default Juridico;