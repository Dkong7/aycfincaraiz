import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faBalanceScale, faFileContract, faUserShield, faArrowRight, faTimes, faWhatsapp } from "@fortawesome/free-solid-svg-icons";

const LegalService = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="bg-white py-24 px-6 border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
           <div className="flex items-center gap-2 mb-4 text-green-600 font-black uppercase tracking-tighter">
              <FontAwesomeIcon icon={faShieldAlt} /> Seguridad de Patrimonio
           </div>
           <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.9] mb-8">
              Tu tranquilidad <br/><span className="text-green-600">no es negociable.</span>
           </h2>
           <p className="text-xl text-slate-500 font-light mb-10 max-w-lg">
              En A&C no solo cerramos negocios; blindamos sueños. Nuestro equipo jurídico asegura que cada centavo de tu inversión esté protegido bajo las leyes vigentes.
           </p>
           <button onClick={() => setIsOpen(true)} className="bg-slate-900 text-white font-black px-10 py-5 rounded-full hover:bg-green-600 transition-all shadow-xl uppercase text-xs tracking-widest">
              ¿Cómo protegemos tu dinero? <FontAwesomeIcon icon={faArrowRight} className="ml-2"/>
           </button>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4 relative">
           <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center group hover:bg-white transition-all shadow-sm">
              <FontAwesomeIcon icon={faFileContract} className="text-4xl text-slate-400 mb-4 group-hover:text-green-600" />
              <h4 className="font-bold text-slate-800">Estudio de Títulos</h4>
           </div>
           <div className="bg-green-600 p-8 rounded-[3rem] text-white flex flex-col items-center text-center mt-12 shadow-2xl shadow-green-200">
              <FontAwesomeIcon icon={faBalanceScale} className="text-4xl mb-4" />
              <h4 className="font-bold">Saneamiento Real</h4>
           </div>
        </div>
      </div>

      {/* MODAL DETALLADO */}
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/90 backdrop-blur-xl p-4">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl relative animate-fade-in flex flex-col max-h-[90vh]">
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-red-500"><FontAwesomeIcon icon={faTimes} size="2x"/></button>
            <div className="p-12 overflow-y-auto">
              <h3 className="text-4xl font-black text-slate-900 mb-8">Protocolo de Blindaje A&C</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 flex-shrink-0"><FontAwesomeIcon icon={faShieldAlt}/></div>
                    <div><h4 className="font-bold text-lg">Debida Diligencia</h4><p className="text-slate-500 text-sm">Investigación en bases de datos de la Fiscalía, listas restrictivas y antecedentes para prevenir lavado de activos.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0"><FontAwesomeIcon icon={faFileContract}/></div>
                    <div><h4 className="font-bold text-lg">Tradición Garantizada</h4><p className="text-slate-500 text-sm">Revisión de los últimos 20 años de historia del inmueble para evitar falsas tradiciones o herencias ocultas.</p></div>
                  </div>
                </div>
                <div className="space-y-6">
                   <p className="text-slate-600 leading-relaxed">Nuestra asesoría jurídica no termina en la firma. Te acompañamos en la liquidación de impuestos, trámites notariales y registro en la Oficina de Instrumentos Públicos.</p>
                   <a href="https://wa.me/573134663832" target="_blank" className="block w-full bg-green-500 text-white font-black text-center py-6 rounded-2xl shadow-lg hover:bg-green-600 transition-all uppercase tracking-widest">
                      Hablar con un Abogado A&C <FontAwesomeIcon icon={faWhatsapp} className="ml-2"/>
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