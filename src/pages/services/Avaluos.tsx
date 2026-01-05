import React from "react";
import { BadgeCheck, FileText, TrendingUp } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";

const Avaluos = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white min-h-screen font-sans">
       <Navbar language="ES" toggleLanguage={() => {}} />
       
       <div className="bg-[#0A192F] text-white pt-40 pb-32 px-6 text-center">
          <h1 className="text-5xl font-black uppercase mb-4">{t.services.appraisalTitle}</h1>
          <p className="text-xl text-gray-400">{t.services.appraisalDesc}</p>
       </div>

       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 -mt-16 pb-24">
          {[
             {icon:<BadgeCheck size={40}/>, t:"Certificado RAA", d:"Avaladores inscritos y vigentes."},
             {icon:<FileText size={40}/>, t:"Norma NIIF", d:"Informes válidos para bancos y notarias."},
             {icon:<TrendingUp size={40}/>, t:"Estudio Mercado", d:"Análisis comparativo real."}
          ].map((x,i) => (
             <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-600 hover:-translate-y-2 transition-transform">
                <div className="text-green-600 mb-4">{x.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-[#0A192F]">{x.t}</h3>
                <p className="text-gray-500">{x.d}</p>
             </div>
          ))}
       </div>
       
       <Footer />
    </div>
  );
};
export default Avaluos;
