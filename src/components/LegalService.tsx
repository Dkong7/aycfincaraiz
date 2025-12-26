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
              En A&C la seguridad es la norma. Nuestro protocolo de debida diligencia asegura que su inversión esté protegida bajo los más altos estándares legales.
           </p>
           <button onClick={() => setIsOpen(true)} className="bg-slate-950 text-white font-black px-12 py-6 rounded-full hover:bg-green-600 transition-all shadow-2xl uppercase text-xs tracking-widest">
              Protocolo de seguridad <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
           </button>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-8 relative">
           <div className="bg-slate-50 p-12 rounded-[4rem] border border-slate-100 flex flex-col items-center text-center group hover:bg-white transition-all shadow-sm">
              <FontAwesomeIcon icon={faFileContract} className="text-5xl text-slate-300 mb-6 group-hover:text-green-600" />
              <h4 className="font-black text-slate-950 uppercase text-sm tracking-widest italic">Estudio de <br/>Títulos</h4>
           </div>
           <div className="bg-green-600 p-12 rounded-[4rem] text-white flex flex-col items-center text-center mt-16 shadow-2xl shadow-green-200">
              <FontAwesomeIcon icon={faBalanceScale} className="text-5xl mb-6" />
              <h4 className="font-black uppercase text-sm tracking-widest italic">Saneamiento <br/>Jurídico</h4>
           </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-slate-900/95 backdrop-blur-2xl p-4">
          <div className="bg-white w-full max-w-5xl rounded-[4rem] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
            <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 text-slate-400 hover:text-red-500"><FontAwesomeIcon icon={faTimes} size="2x"/></button>
            <div className="p-16 overflow-y-auto">
              <h3 className="text-5xl font-black text-slate-950 mb-12 italic">Seguridad A&C</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="space-y-10">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 flex-shrink-0 text-2xl"><FontAwesomeIcon icon={faUserShield}/></div>
                    <div><h4 className="font-black text-xl mb-2 text-slate-900 italic">Debida Diligencia</h4><p className="text-slate-500 leading-relaxed font-light font-sans">Investigación profunda de antecedentes de todas las partes involucradas para una transacción transparente.</p></div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 flex-shrink-0 text-2xl"><FontAwesomeIcon icon={faFileContract}/></div>
                    <div><h4 className="font-black text-xl mb-2 text-slate-900 italic">Auditoría de 20 años</h4><p className="text-slate-500 leading-relaxed font-light font-sans">Revisamos la cadena de tradición para descartar litigios ocultos o herencias no resueltas.</p></div>
                  </div>
                </div>
                <div className="bg-slate-50 p-10 rounded-[3rem] flex flex-col justify-center text-center">
                   <p className="text-slate-600 text-lg mb-10 italic">"Su tranquilidad patrimonial es nuestro único objetivo."</p>
                   <a href="https://wa.me/573134663832" target="_blank" className="block w-full bg-green-600 text-white font-black text-center py-8 rounded-[2rem] shadow-xl hover:bg-slate-950 transition-all uppercase tracking-widest text-xs">
                      Hablar con nuestra Dirección Jurídica <FontAwesomeIcon icon={faWhatsapp} className="ml-2 text-xl"/>
                   </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
export default LegalService;