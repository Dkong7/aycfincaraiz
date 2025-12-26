import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faArrowRight, faFileContract, faGavel, faCheckDouble } from "@fortawesome/free-solid-svg-icons";

const LegalService = () => (
  <section className="bg-white py-24 px-6 border-b border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      <div className="lg:w-1/2">
        <div className="flex items-center gap-2 mb-4 text-green-600 font-black uppercase tracking-widest text-xs">
          <FontAwesomeIcon icon={faShieldAlt} /> Seguridad Jurídica
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 leading-none mb-8">
          Tu patrimonio <br/><span className="text-green-600">blindado.</span>
        </h2>
        <p className="text-xl text-slate-500 font-light mb-10 max-w-lg">
          No permitas que una mala revisión arriesgue tus ahorros. Nuestros abogados expertos garantizan una transacción 100% segura.
        </p>
        <div className="space-y-4 mb-10">
          {["Estudio de Títulos Express", "Saneamiento de Falsa Tradición", "Acompañamiento Notarial"].map((t) => (
            <div key={t} className="flex items-center gap-3 text-slate-700 font-bold">
              <FontAwesomeIcon icon={faCheckDouble} className="text-green-500" /> {t}
            </div>
          ))}
        </div>
        <Link to="/servicios/legal" className="inline-block bg-slate-900 text-white font-black px-10 py-5 rounded-full hover:bg-green-600 transition-all shadow-xl uppercase text-xs tracking-widest">
          Consultar Abogados <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
        </Link>
      </div>
      <div className="lg:w-1/2 grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-8 rounded-[2rem] border border-gray-100 flex flex-col justify-center items-center text-center">
          <FontAwesomeIcon icon={faFileContract} className="text-4xl text-slate-800 mb-4" />
          <span className="text-2xl font-black text-slate-900">100%</span>
          <p className="text-[10px] text-slate-400 uppercase font-bold">Efectividad Legal</p>
        </div>
        <div className="bg-green-600 p-8 rounded-[2rem] text-white flex flex-col justify-center items-center text-center mt-12 shadow-2xl shadow-green-200">
          <FontAwesomeIcon icon={faGavel} className="text-4xl mb-4" />
          <span className="text-2xl font-black">Certificado</span>
          <p className="text-[10px] uppercase font-bold opacity-80">Garantía A&C</p>
        </div>
      </div>
    </div>
  </section>
);
export default LegalService;