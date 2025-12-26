import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale, faShieldAlt, faSearchLocation, faGavel, faFileSignature, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ServiceLegal = () => {
  return (
    <div className="bg-white min-h-screen">
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-green-500 font-black uppercase tracking-widest text-xs mb-4 block">Seguridad para su inversión</span>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-none">Asesoría Jurídica <br/><span className="text-green-500 italic">Especializada</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl font-light">En A&C, sabemos que comprar un inmueble es una decisión de vida. Por eso, blindamos cada etapa del proceso con rigor legal y transparencia total.</p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-black text-slate-900 mb-8 border-l-4 border-green-600 pl-6">Nuestros servicios de blindaje</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-2xl flex-shrink-0 shadow-sm border border-green-100"><FontAwesomeIcon icon={faSearchLocation}/></div>
              <div><h3 className="font-bold text-slate-900 text-xl mb-2">Estudio de Títulos</h3><p className="text-slate-500">Análisis detallado de la tradición del inmueble para detectar gravámenes, limitaciones de dominio o afectaciones jurídicas.</p></div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-2xl flex-shrink-0 shadow-sm border border-green-100"><FontAwesomeIcon icon={faGavel}/></div>
              <div><h3 className="font-bold text-slate-900 text-xl mb-2">Saneamiento Inmobiliario</h3><p className="text-slate-500">Gestión de trámites para limpiar la tradición del inmueble, corrección de escrituras y cancelación de medidas cautelares.</p></div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 text-2xl flex-shrink-0 shadow-sm border border-green-100"><FontAwesomeIcon icon={faFileSignature}/></div>
              <div><h3 className="font-bold text-slate-900 text-xl mb-2">Acompañamiento Notarial</h3><p className="text-slate-500">Asesoría presencial y técnica en el proceso de escrituración para asegurar que los intereses de ambas partes estén protegidos.</p></div>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 shadow-inner flex flex-col justify-center">
          <div className="text-center mb-10"><FontAwesomeIcon icon={faShieldAlt} className="text-6xl text-green-600 mb-6"/><h2 className="text-3xl font-black text-slate-900">¿Por qué confiar en A&C?</h2></div>
          <div className="grid grid-cols-1 gap-4">
            {["Transparencia en el manejo de capital.", "Garantía de títulos libres de vicios legales.", "Equipo de abogados con 15+ años de experiencia.", "Gestión ágil de documentos ante notariado y registro."].map(item => (
              <div key={item} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm"><FontAwesomeIcon icon={faCheckCircle} className="text-green-500"/><p className="text-slate-700 font-medium text-sm">{item}</p></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default ServiceLegal;