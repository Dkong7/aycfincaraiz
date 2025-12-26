import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faArrowRight, faFileLines, faGavel, faScaleBalanced, faHandshake, faUserShield, faBuildingShield } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ServiceLegal = () => {
  return (
    <div className="bg-white">
      <section className="bg-slate-950 py-32 px-6 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-green-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Protocolo de Blindaje</span>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-none tracking-tighter italic">Defensa <span className="text-green-500">Patrimonial</span></h1>
          <p className="text-xl text-slate-400 font-light">Estrategia jurídica de élite para la adquisición y venta de activos inmobiliarios de alto nivel.</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 gap-1">
          {[
            { id: "01", title: "Estudio de Títulos Integral", desc: "Investigamos la historia jurídica del inmueble en los últimos 20 años para asegurar una tradición limpia de pleitos, sucesiones mal llevadas o gravámenes ocultos.", icon: faFileLines },
            { id: "02", title: "Debida Diligencia (Due Diligence)", desc: "Validamos los antecedentes de compradores y vendedores contra listas nacionales e internacionales (Sarlaft, OFAC) para garantizar una transacción ética.", icon: faUserShield },
            { id: "03", title: "Saneamiento de Tradición", desc: "Corregimos áreas, linderos y levantamos medidas cautelares para que el inmueble sea apto para transferencia inmediata.", icon: faScaleBalanced },
            { id: "04", title: "Contratación Blindada", desc: "Redacción técnica de promesas de compraventa y minutas de escritura pública con cláusulas penales y de protección específicas.", icon: faHandshake }
          ].map((item, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-12 py-16 border-b border-slate-100 group">
              <span className="text-7xl font-black text-slate-50 group-hover:text-green-50 transition-colors">{item.id}</span>
              <div className="flex-grow">
                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-slate-500 text-lg max-w-2xl font-light leading-relaxed">{item.desc}</p>
              </div>
              <FontAwesomeIcon icon={item.icon} className="text-6xl text-slate-100 group-hover:text-green-500 transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-24 px-6 text-center">
        <h2 className="text-4xl font-black text-slate-950 mb-12 italic">¿Necesita soporte inmediato?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="https://wa.me/573134663832" target="_blank" className="bg-green-600 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-green-700 transition-all flex items-center justify-center gap-4 shadow-xl">
             <FontAwesomeIcon icon={faWhatsapp} size="lg"/> Hablar con un Abogado
          </a>
          <a href="/contacto" className="bg-slate-900 text-white px-12 py-6 rounded-full font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all flex items-center justify-center gap-4 shadow-xl">
             Solicitar Estudio <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </section>
    </div>
  );
};
export default ServiceLegal;