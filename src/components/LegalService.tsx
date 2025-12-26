import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faShieldAlt, faArrowRight, faFileSignature, faSearchLocation, faGavel } from "@fortawesome/free-solid-svg-icons";

const LegalService = () => {
  return (
    <section className="relative bg-white py-32 px-6 overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"></div>
          <h2 className="text-[10rem] font-black text-gray-50 absolute -top-32 -left-10 select-none uppercase">A&C</h2>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
              Blindaje Jurídico <br/> <span className="text-green-600 italic">Patrimonial</span>
            </h3>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-10 max-w-lg">
              Protegemos su inversión con rigor técnico. Realizamos estudios de títulos exhaustivos para garantizar transacciones libres de riesgos legales.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-12">
               <div className="flex items-center gap-3 font-bold text-slate-700"><FontAwesomeIcon icon={faShieldAlt} className="text-green-500"/> Cero Riesgos</div>
               <div className="flex items-center gap-3 font-bold text-slate-700"><FontAwesomeIcon icon={faSearchLocation} className="text-green-500"/> Títulos Limpios</div>
               <div className="flex items-center gap-3 font-bold text-slate-700"><FontAwesomeIcon icon={faGavel} className="text-green-500"/> Saneamiento</div>
               <div className="flex items-center gap-3 font-bold text-slate-700"><FontAwesomeIcon icon={faFileSignature} className="text-green-500"/> Notaría VIP</div>
            </div>
            <Link to="/servicios/legal" className="group inline-flex items-center gap-4 bg-slate-900 text-white font-bold uppercase tracking-widest text-xs px-10 py-5 rounded-full hover:bg-green-600 transition-all shadow-xl">
              Consultar Especialistas <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
           <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100"><FontAwesomeIcon icon={faBalanceScale} className="text-4xl text-slate-800 mb-4"/><h4 className="font-bold">Ética Legal</h4><p className="text-xs text-gray-500 mt-2">Acompañamiento en cada firma del proceso.</p></div>
           <div className="bg-green-600 p-8 rounded-3xl text-white mt-8 shadow-2xl shadow-green-200"><FontAwesomeIcon icon={faShieldAlt} className="text-4xl mb-4"/><h4 className="font-bold">Garantía A&C</h4><p className="text-xs opacity-80 mt-2">Seguridad documental verificada al 100%.</p></div>
        </div>
      </div>
    </section>
  );
};
export default LegalService;