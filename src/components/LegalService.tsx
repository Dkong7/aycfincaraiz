import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faBalanceScale, faFileContract, faArrowRight, faTimes, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const LegalService = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="bg-white py-32 px-6 border-b border-slate-100 relative overflow-hidden text-left">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2">
           <div className="flex items-center gap-2 mb-6 text-green-600 font-black uppercase tracking-[0.2em] text-xs">
              <FontAwesomeIcon icon={faShieldAlt} /> Blindaje Inmobiliario
           </div>
           <h2 className="text-5xl md:text-8xl font-black text-slate-950 leading-[0.85] mb-10 tracking-tighter">
              Tu patrimonio <br/><span className="text-green-600 italic">es sagrado.</span>
           </h2>
           <p className="text-xl text-slate-500 font-light mb-12 max-w-lg leading-relaxed">
              En A&C la seguridad es la norma. Nuestro protocolo asegura que su inversión esté protegida.
           </p>
           <button onClick={() => setIsOpen(true)} className="bg-slate-950 text-white font-black px-12 py-6 rounded-full hover:bg-green-600 transition-all shadow-2xl uppercase text-xs tracking-widest">
              Protocolo de seguridad <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
           </button>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-8">
           <div className="bg-slate-50 p-12 rounded-[4rem] flex flex-col items-center text-center group hover:bg-white transition-all shadow-sm">
              <FontAwesomeIcon icon={faFileContract} className="text-5xl text-slate-300 mb-6 group-hover:text-green-600" />
              <h4 className="font-black text-slate-950 uppercase text-sm tracking-widest italic">Estudio de <br/>Títulos</h4>
           </div>
           <div className="bg-green-600 p-12 rounded-[4rem] text-white flex flex-col items-center text-center mt-16 shadow-2xl shadow-green-200">
              <FontAwesomeIcon icon={faBalanceScale} className="text-5xl mb-6" />
              <h4 className="font-black uppercase text-sm tracking-widest italic">Saneamiento <br/>Jurídico</h4>
           </div>
        </div>
      </div>
    </section>
  );
};
export default LegalService;