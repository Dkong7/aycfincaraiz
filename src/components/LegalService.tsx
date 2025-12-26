import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faShieldAlt, faArrowRight, faFileSignature } from "@fortawesome/free-solid-svg-icons";

const LegalService = () => {
  return (
    <div className="relative bg-white py-24 px-8 md:px-20 overflow-hidden border-y border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* LADO VISUAL: TIPOGRAFÍA IMPACTANTE */}
        <div className="lg:w-1/2 relative">
          <h2 className="text-[8rem] md:text-[12rem] font-black text-slate-50 absolute -top-20 -left-10 select-none leading-none">
            LAW
          </h2>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">
              Blindaje <br/> <span className="text-blue-600 italic font-serif">Patrimonial</span>
            </h3>
            <div className="h-2 w-20 bg-blue-600 mb-8"></div>
          </div>
        </div>

        {/* LADO CONTENIDO: AIRE Y LISTADO LIMPIO */}
        <div className="lg:w-1/2">
          <p className="text-xl text-slate-500 font-light leading-relaxed mb-10 max-w-lg italic">
            "La seguridad jurídica no es un trámite, es la garantía de su tranquilidad futura."
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="flex gap-4">
              <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-slate-800">Cero Riesgos</h4>
                <p className="text-sm text-slate-400">Estudio de títulos minucioso.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <FontAwesomeIcon icon={faFileSignature} className="text-blue-600 text-xl mt-1" />
              <div>
                <h4 className="font-bold text-slate-800">Saneamiento</h4>
                <p className="text-sm text-slate-400">Expertos en falsa tradición.</p>
              </div>
            </div>
          </div>

          <Link to="/servicios/legal" className="group inline-flex items-center gap-4 text-slate-900 font-black uppercase tracking-[0.3em] text-xs border border-slate-900 px-10 py-5 hover:bg-slate-900 hover:text-white transition-all duration-500">
            Consultar Abogados <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LegalService;