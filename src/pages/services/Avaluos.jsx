import React from 'react';
import { BadgeCheck, FileText, TrendingUp } from 'lucide-react';
const Avaluos = () => (
  <div className="pt-24 bg-white min-h-screen font-sans">
     <div className="bg-[#0A192F] text-white py-32 px-6 text-center">
        <h1 className="text-5xl font-black uppercase mb-4">Avalúos Certificados</h1>
        <p className="text-xl text-gray-400">Norma NIIF y RAA.</p>
     </div>
     <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 -mt-16">
        {[
           {icon:<BadgeCheck size={40}/>, t:"Certificado RAA", d:"Avaladores inscritos y vigentes."},
           {icon:<FileText size={40}/>, t:"Norma NIIF", d:"Informes válidos para bancos y notarias."},
           {icon:<TrendingUp size={40}/>, t:"Estudio Mercado", d:"Análisis comparativo real."}
        ].map((x,i) => (
           <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#009B4D]">
              <div className="text-[#009B4D] mb-4">{x.icon}</div>
              <h3 className="text-xl font-bold mb-2">{x.t}</h3>
              <p className="text-gray-500">{x.d}</p>
           </div>
        ))}
     </div>
  </div>
);
export default Avaluos;