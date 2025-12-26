import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faShieldAlt, faArrowRight, faFileLines, faScaleBalanced, 
  faHandshake, faUserShield, faBuildingShield, faStamp,
  faGavel, faSearchPlus, faFileSignature
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ServiceLegal = () => {
  const services = [
    {
      id: "01",
      title: "Estudio de Títulos Pro",
      desc: "Análisis exhaustivo de la historia jurídica del inmueble (últimos 20 años). Verificamos que la tradición sea impecable y libre de vicios.",
      icon: faSearchPlus
    },
    {
      id: "02",
      title: "Due Diligence de Partes",
      desc: "Investigación en listas restrictivas y antecedentes de compradores/vendedores. Seguridad total contra riesgos de lavado de activos.",
      icon: faUserShield
    },
    {
      id: "03",
      title: "Saneamiento de Tradición",
      desc: "Expertos en corregir áreas, linderos y levantar medidas cautelares o gravámenes que impidan la venta inmediata.",
      icon: faScaleBalanced
    },
    {
      id: "04",
      title: "Blindaje Contractual",
      desc: "Estructuramos Promesas de Compraventa y Minutas de Escritura con cláusulas de protección patrimonial nivel Élite.",
      icon: faFileSignature
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECCIÓN: IMPACTO INICIAL */}
      <section className="bg-slate-950 pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-600/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
            <div className="max-w-3xl text-left">
              <span className="text-green-500 font-black uppercase tracking-[0.4em] text-[10px] mb-6 block border-l-4 border-green-600 pl-4">
                High-Level Legal Defense
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter italic">
                Inversión <br/><span className="text-green-600 underline decoration-slate-800">Garantizada.</span>
              </h1>
            </div>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem] hidden lg:block">
              <FontAwesomeIcon icon={faShieldAlt} className="text-green-500 text-5xl mb-4" />
              <p className="text-white font-bold text-xl leading-tight">Protocolo A&C <br/> <span className="text-green-500 text-sm font-light">Cero Riesgos Legales</span></p>
            </div>
          </div>
          <p className="text-xl text-slate-400 font-light max-w-2xl text-left">
            No permitimos que el azar decida el destino de su capital. Implementamos ingeniería jurídica para blindar cada etapa de su transacción inmobiliaria.
          </p>
        </div>
      </section>

      {/* INFOGRAFÍA DE SERVICIOS: LISTADO DINÁMICO */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-2">
          {services.map((s, i) => (
            <div key={i} className="group flex flex-col py-16 border-b border-slate-100 hover:bg-slate-50/50 transition-all px-8 rounded-[3rem]">
              <div className="flex justify-between items-start mb-8">
                <span className="text-6xl font-black text-slate-100 group-hover:text-green-100 transition-colors font-serif italic">
                  {s.id}
                </span>
                <div className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center text-green-600 text-2xl group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                  <FontAwesomeIcon icon={s.icon} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-slate-950 mb-6 uppercase tracking-tighter italic">
                {s.title}
              </h3>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-8">
                {s.desc}
              </p>
              <div className="mt-auto">
                <div className="h-1 w-12 bg-slate-200 group-hover:w-full group-hover:bg-green-500 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALOR AGREGADO: POR QUÉ NOSOTROS */}
      <section className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          <div className="md:col-span-1">
             <h2 className="text-4xl font-black text-slate-950 leading-none tracking-tighter uppercase italic mb-6">
                Por qué confiar <br/><span className="text-green-600">en A&C Legal.</span>
             </h2>
             <div className="w-20 h-2 bg-green-600"></div>
          </div>
          <div className="space-y-8">
            <div className="flex gap-4">
              <FontAwesomeIcon icon={faStamp} className="text-green-600 text-xl" />
              <p className="text-slate-600"><strong className="text-slate-950">Experticia Notarial:</strong> Gestión directa ante notarías de confianza para agilizar procesos de escrituración.</p>
            </div>
            <div className="flex gap-4">
              <FontAwesomeIcon icon={faGavel} className="text-green-600 text-xl" />
              <p className="text-slate-600"><strong className="text-slate-950">Derecho Civil:</strong> Especialistas en litigio preventivo para evitar futuros reclamos de terceros.</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="flex gap-4">
              <FontAwesomeIcon icon={faBuildingShield} className="text-green-600 text-xl" />
              <p className="text-slate-600"><strong className="text-slate-950">Seguridad Financiera:</strong> Revisión de medios de pago y licitud de fondos bajo normatividad Sarlaft.</p>
            </div>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-green-600 transition-colors">
              Volver al inicio <FontAwesomeIcon icon={faArrowRight} className="-rotate-45" />
            </button>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION: PERSUASIÓN FINAL */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-slate-950 p-12 md:p-24 rounded-[4rem] shadow-3xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-600/10 rounded-full blur-[80px]"></div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 italic tracking-tighter">
            ¿Su patrimonio está <br/><span className="text-green-500">realmente seguro?</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
            <a href="https://wa.me/573134663832" target="_blank" className="bg-green-600 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-all flex items-center justify-center gap-4 shadow-xl">
               <FontAwesomeIcon icon={faWhatsapp} size="lg"/> Consultar un Abogado
            </a>
            <a href="/contacto" className="bg-white text-slate-950 px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-4 shadow-xl">
               Solicitar Scouting <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
          <p className="text-slate-500 mt-10 text-[10px] uppercase tracking-[0.3em]">Respuesta en menos de 24 horas hábiles</p>
        </div>
      </section>
    </div>
  );
};
export default ServiceLegal;