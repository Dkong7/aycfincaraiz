import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faArrowRight, faCheckCircle, faGavel, faFileContract, faUserShield, faHandshake, faHistory, faScaleBalanced, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LegalService = () => {
  const highlights = [
    { icon: faFileContract, title: "Estudio de Títulos", desc: "Análisis técnico de 20 años de tradición." },
    { icon: faUserShield, title: "Debida Diligencia", desc: "Verificación en listas restrictivas y penales." },
    { icon: faScaleBalanced, title: "Saneamiento", desc: "Cancelación de embargos y medidas cautelares." },
    { icon: faHandshake, title: "Promesa Segura", desc: "Redacción de contratos sin cláusulas abusivas." },
    { icon: faHistory, title: "Trazabilidad", desc: "Control total de cadena de pertenencia." },
    { icon: faGavel, title: "Trámite Notarial", desc: "Acompañamiento en firma de escrituras." },
    { icon: faShieldAlt, title: "Blindaje Patrimonial", desc: "Protección legal ante terceros." },
    { icon: faSearch, title: "Derecho Urbanístico", desc: "Validación de usos de suelo y licencias." }
  ];

  return (
    <section className="bg-white py-32 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/3 sticky top-32">
            <span className="text-green-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Seguridad A&C</span>
            <h2 className="text-5xl md:text-7xl font-black text-slate-950 leading-none mb-8 tracking-tighter">
              Invierta con <br/><span className="text-green-600 italic">Certeza Legal.</span>
            </h2>
            <p className="text-lg text-slate-500 font-light mb-10 leading-relaxed">
              No permitimos que el azar decida el futuro de su patrimonio. Nuestro equipo jurídico es la muralla entre su dinero y cualquier riesgo legal.
            </p>
            <Link to="/servicios/legal" className="inline-flex items-center gap-4 bg-slate-950 text-white font-black px-10 py-5 rounded-full hover:bg-green-600 transition-all uppercase text-xs tracking-widest shadow-2xl">
              Ampliar Información <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
          
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-6 items-start border-l-2 border-slate-50 pl-6 hover:border-green-500 transition-colors">
                <FontAwesomeIcon icon={h.icon} className="text-green-600 text-2xl mt-1" />
                <div>
                  <h4 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-2">{h.title}</h4>
                  <p className="text-sm text-slate-500 font-light">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default LegalService;