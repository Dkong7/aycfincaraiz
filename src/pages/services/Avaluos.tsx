import React, { useState } from "react";
import { 
  Calculator, TrendingUp, ShieldCheck, DollarSign,
  Home, Info, ChevronDown, Play, CheckCircle2, Clock,
  Search, BarChart3, Landmark, FileSignature, Building2, Map, PlusCircle
} from "lucide-react";
import Navbar from "../../components/Navbar";

// --- ICONO OFICIAL WHATSAPP ---
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

// --- ACORDEÓN ---
const AccordionItem = ({ title, icon: Icon, isOpen, onClick, children }: any) => (
  <div className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-800/50 mb-4 transition-all duration-300">
    <button onClick={onClick} className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-slate-700/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><Icon size={24} /></div>
        <span className="font-bold text-lg text-white uppercase tracking-wide">{title}</span>
      </div>
      <ChevronDown size={20} className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="p-6 border-t border-slate-700 bg-slate-900/50">{children}</div>
    </div>
  </div>
);

const Avaluos = () => {
  const [openSection, setOpenSection] = useState<string | null>("residenciales");
  const [playVideo, setPlayVideo] = useState(false);

  const toggleSection = (section: string) => setOpenSection(openSection === section ? null : section);

  // Workflow de Auditoría Valuatoria
  const workflowSteps = [
    { 
      step: "01", 
      title: "Auditoría Física y Legal", 
      desc: "Levantamiento arquitectónico preliminar, verificación de linderos y cruce estricto con el Certificado de Tradición y Libertad.", 
      icon: Search 
    },
    { 
      step: "02", 
      title: "Homologación Estadística", 
      desc: "Depuración de mercado. Descartamos ofertas especulativas y tasamos sobre precios de cierre reales, aplicando factores de vetustez y conservación.", 
      icon: BarChart3 
    },
    { 
      step: "03", 
      title: "Modelación Financiera y POT", 
      desc: "Cálculo de Cap Rate para inmuebles de renta y modelación del método residual (potencial de desarrollo) para lotes bajo la norma urbana vigente.", 
      icon: Landmark 
    },
    { 
      step: "04", 
      title: "Emisión de Dictamen", 
      desc: "Entrega del informe técnico blindado bajo los parámetros de la Resolución 620 / 2008 del IGAC, firmado por peritos certificados.", 
      icon: FileSignature 
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-green-100 selection:text-green-900 relative">
       
       {/* BOTÓN WHATSAPP STICKY */}
       <div className="fixed bottom-6 right-6 z-[100] group flex items-center">
          <a 
             href="https://wa.me/573224822840?text=Hola,%20quisiera%20pedir%20información%20y%20cotizar%20un%20avalúo%20comercial." 
             target="_blank" 
             rel="noopener noreferrer"
             className="relative flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110"
          >
             {/* Animación de pulso detrás del botón */}
             <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping z-[-1]"></span>
             <WhatsAppIcon size={32} />
          </a>
          {/* Tooltip Hover */}
          <div className="absolute right-full mr-4 bg-slate-900 text-white text-sm font-bold py-2 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl whitespace-nowrap border border-slate-700">
             Cotizar Avalúo
             <div className="absolute top-1/2 -right-2 transform -translate-y-1/2 border-8 border-transparent border-l-slate-900"></div>
          </div>
       </div>

       {/* MOTOR DE TRANSFORMACIONES RESPONSIVAS */}
       <style>{`
         .hero-layer { transform-origin: center; z-index: 50; }
         @media (min-width: 768px) {
           .transform-logo { transform: translate(57px, 163.5px) scale(5.275); }
           .transform-title { transform: translate(238.5px, 369px) scale(9.655); z-index: 49; }
           .transform-video { transform: translate(105px, 16.5px) scale(1.495); z-index: 60; }
         }
         @media (max-width: 767px) {
           .transform-logo, .transform-title, .transform-video {
             transform: none !important;
             margin-top: 1rem;
             margin-bottom: 1rem;
             display: block;
           }
           .mobile-stack-gap { gap: 2rem !important; }
         }
       `}</style>

       <Navbar /> 
       
       {/* 1. HERO SECTION */}
       <div className="relative bg-[#0A192F] text-white pt-32 pb-32 border-b-4 border-green-500 min-h-screen overflow-hidden flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599401712217-062e7f864669?q=80&w=1200&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-luminosity pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
             
             <div className="w-full flex flex-col md:flex-row flex-wrap gap-8 md:mb-16 relative md:min-h-[100px] mobile-stack-gap">
                <div className="relative inline-block hero-layer transform-logo transition-transform duration-500 mx-auto md:mx-0">
                   <img src="/logoPlata.png" alt="A&C Finca Raíz" className="h-16 w-auto drop-shadow-lg pointer-events-none select-none" />
                </div>
                
                <div className="relative inline-block hero-layer transform-title transition-transform duration-500 mx-auto md:mx-0">
                   <img src="/avaluosTitulo.png" alt="Avalúos" className="h-10 w-auto drop-shadow-lg pointer-events-none select-none" />
                </div>
             </div>
             
             <div className="flex flex-col lg:flex-row items-center md:items-start gap-12 w-full relative z-30 pt-12 md:pt-0">
                 <div className="lg:w-1/2 w-full flex flex-col space-y-6">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight relative z-20">
                       El mercado no perdona suposiciones. <br />
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200 block mt-2">
                          Conoce el valor exacto de tu capital.
                       </span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed bg-slate-900/50 p-6 rounded-2xl backdrop-blur-sm border border-slate-700 relative z-20">
                       Tasas al 11.25%, un catastro que golpea la rentabilidad y $100 billones en CDTs buscando refugio. Quien no tiene un Avalúo Comercial Técnico, está perdiendo dinero en la mesa de negociación.
                    </p>
                 </div>
                 
                 <div className="lg:w-1/2 w-full relative">
                    <div className="w-full relative inline-block hero-layer transform-video transition-transform duration-500">
                       <div className="bg-slate-900/80 backdrop-blur-md rounded-3xl border-2 border-slate-700 shadow-2xl p-2 relative overflow-hidden aspect-video w-full max-w-[600px] mx-auto">
                          {!playVideo ? (
                             <div 
                                className="w-full h-full relative cursor-pointer group rounded-2xl overflow-hidden" 
                                onClick={() => setPlayVideo(true)}
                             >
                                <img 
                                   src="/miniaturaAvaluos.png" 
                                   alt="Miniatura Avalúos" 
                                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none select-none" 
                                />
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors group-hover:bg-black/10">
                                   <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.7)] transition-transform duration-300 group-hover:scale-110 border-2 border-white/20">
                                      <Play fill="currentColor" className="w-8 h-8 text-white ml-1.5" />
                                   </div>
                                </div>
                             </div>
                          ) : (
                             <iframe 
                                className="w-full h-full rounded-2xl" 
                                src="https://www.youtube.com/embed/ddwcaTG7YXw?autoplay=1&mute=0" 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                             ></iframe>
                          )}
                       </div>
                    </div>
                 </div>
             </div>

          </div>
       </div>

       {/* 2. EVIDENCIA DE AUTORIDAD */}
       <div className="py-20 bg-white relative z-10">
          <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl font-black text-[#0A192F] mb-4">La información es el único antídoto contra la incertidumbre.</h2>
                <p className="text-slate-500">
                   Nuestras valoraciones no se basan en el "ojo del agente", sino en la correlación de datos macroeconómicos y dinámica urbana de Bogotá y la Sabana.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                   <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6"><TrendingUp size={28}/></div>
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Detección de Plusvalía</h4>
                   <p className="text-slate-600 text-sm leading-relaxed">Identificamos el "Valor Oculto". Proximidad a futuras líneas del Metro, cambios en el POT y consolidación de estratos medios que disparan el precio real por metro cuadrado.</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                   <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mb-6"><DollarSign size={28}/></div>
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Modelación de Cap Rate</h4>
                   <p className="text-slate-600 text-sm leading-relaxed">Para inversionistas corporativos, calculamos la tasa de capitalización exacta de oficinas y bodegas cruzando la vacancia estructural frente a rentas de $71,000 COP/m² promedio.</p>
                </div>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                   <div className="w-14 h-14 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mb-6"><ShieldCheck size={28}/></div>
                   <h4 className="text-xl font-bold text-slate-900 mb-3">Blindaje Normativo</h4>
                   <p className="text-slate-600 text-sm leading-relaxed">Garantizamos que el valor ofertado cumpla estrictamente con la normativa vigente y el potencial de edificabilidad, evitando retrocesos legales en la promesa de compraventa.</p>
                </div>
             </div>
          </div>
       </div>

       {/* 3. TARIFARIO COMPLETO DESPLEGABLE */}
       <div id="tarifario" className="py-20 bg-slate-900 text-white border-y border-slate-800 relative z-10">
         <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
               <span className="text-green-400 font-bold uppercase tracking-widest text-sm mb-2 block">Inversión Transparente</span>
               <h2 className="text-3xl md:text-4xl font-black mb-4">Tarifario de Avalúos en Bogotá</h2>
               <p className="text-slate-400">Experiencia local, valor que transforma. Selecciona la categoría de tu inmueble.</p>
            </div>

            {/* SECCIÓN 1: RESIDENCIALES */}
            <AccordionItem title="Avalúos Residenciales" icon={Home} isOpen={openSection === "residenciales"} onClick={() => toggleSection("residenciales")}>
              <div className="overflow-x-auto"><table className="w-full text-left text-sm">
                <thead><tr className="border-b border-slate-700 text-slate-400"><th className="pb-3 font-semibold">Servicio</th><th className="pb-3 font-semibold hidden md:table-cell">Área Aproximada</th><th className="pb-3 font-semibold text-right">Valor</th></tr></thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Apartamento VIS</td><td className="py-3 hidden md:table-cell">Hasta 60 m²</td><td className="py-3 text-right font-medium text-green-400">USD $75 | COP $300.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Apartamento estándar</td><td className="py-3 hidden md:table-cell">60 - 120 m²</td><td className="py-3 text-right font-medium text-green-400">USD $100 | COP $400.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Apartamento premium</td><td className="py-3 hidden md:table-cell">120 - 250 m²</td><td className="py-3 text-right font-medium text-green-400">USD $150 | COP $600.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Penthouse / Luxury</td><td className="py-3 hidden md:table-cell">+250 m²</td><td className="py-3 text-right font-medium text-green-400">Desde USD $250 | COP $1.000.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Casa urbana</td><td className="py-3 hidden md:table-cell">Hasta 200 m²</td><td className="py-3 text-right font-medium text-green-400">USD $150 | COP $600.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Casa premium</td><td className="py-3 hidden md:table-cell">+200 m²</td><td className="py-3 text-right font-medium text-green-400">Desde USD $250 | COP $1.000.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Casa campestre</td><td className="py-3 hidden md:table-cell">Según ubicación</td><td className="py-3 text-right font-medium text-green-400">Desde USD $300 | COP $1.200.000</td></tr>
                </tbody>
              </table></div>
            </AccordionItem>

            {/* SECCIÓN 2: COMERCIALES */}
            <AccordionItem title="Avalúos Comerciales" icon={Building2} isOpen={openSection === "comerciales"} onClick={() => toggleSection("comerciales")}>
              <div className="overflow-x-auto"><table className="w-full text-left text-sm">
                <thead><tr className="border-b border-slate-700 text-slate-400"><th className="pb-3 font-semibold">Servicio</th><th className="pb-3 font-semibold text-right">Valor</th></tr></thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Oficina pequeña</td><td className="py-3 text-right font-medium text-green-400">USD $125 | COP $500.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Oficina corporativa</td><td className="py-3 text-right font-medium text-green-400">Desde USD $250 | COP $1.000.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Local comercial</td><td className="py-3 text-right font-medium text-green-400">Desde USD $175 | COP $700.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Bodega</td><td className="py-3 text-right font-medium text-green-400">Desde USD $250 | COP $1.000.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Edificio comercial</td><td className="py-3 text-right font-medium text-slate-300">Cotización personalizada</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Consultorio</td><td className="py-3 text-right font-medium text-green-400">USD $125 | COP $500.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Hotel / Uso especial</td><td className="py-3 text-right font-medium text-slate-300">Cotización personalizada</td></tr>
                </tbody>
              </table></div>
            </AccordionItem>

            {/* SECCIÓN 3: LOTES Y DESARROLLO */}
            <AccordionItem title="Lotes y Desarrollo" icon={Map} isOpen={openSection === "lotes"} onClick={() => toggleSection("lotes")}>
              <div className="overflow-x-auto"><table className="w-full text-left text-sm">
                <thead><tr className="border-b border-slate-700 text-slate-400"><th className="pb-3 font-semibold">Servicio</th><th className="pb-3 font-semibold text-right">Valor</th></tr></thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Lote urbano</td><td className="py-3 text-right font-medium text-green-400">Desde USD $200 | COP $800.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Lote urbanizable</td><td className="py-3 text-right font-medium text-green-400">Desde USD $375 | COP $1.500.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Análisis POT Bogotá</td><td className="py-3 text-right font-medium text-green-400">Desde USD $250 | COP $1.000.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Estudio normativo urbanístico</td><td className="py-3 text-right font-medium text-green-400">Desde USD $300 | COP $1.200.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Estudio de aprovechamiento</td><td className="py-3 text-right font-medium text-slate-300">Cotización personalizada</td></tr>
                </tbody>
              </table></div>
            </AccordionItem>

            {/* SECCIÓN 4: SERVICIOS COMPLEMENTARIOS */}
            <AccordionItem title="Servicios Complementarios" icon={PlusCircle} isOpen={openSection === "complementarios"} onClick={() => toggleSection("complementarios")}>
              <div className="overflow-x-auto"><table className="w-full text-left text-sm">
                <thead><tr className="border-b border-slate-700 text-slate-400"><th className="pb-3 font-semibold">Servicio</th><th className="pb-3 font-semibold text-right">Valor</th></tr></thead>
                <tbody className="divide-y divide-slate-800/50">
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Avalúo express 24h</td><td className="py-3 text-right font-medium text-amber-400">+30% sobre el valor del avalúo</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Visita adicional</td><td className="py-3 text-right font-medium text-green-400">USD $40 | COP $160.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Actualización de avalúo</td><td className="py-3 text-right font-medium text-green-400">Desde USD $50 | COP $200.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Informe digital PDF</td><td className="py-3 text-right font-medium text-slate-300">Incluido</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Copia física impresa</td><td className="py-3 text-right font-medium text-green-400">USD $12 | COP $50.000</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Avalúo bancario especializado</td><td className="py-3 text-right font-medium text-slate-300">Cotización personalizada</td></tr>
                  <tr className="hover:bg-slate-800/30"><td className="py-3">Investigación de mercado sectorial</td><td className="py-3 text-right font-medium text-green-400">Desde USD $125 | COP $500.000</td></tr>
                </tbody>
              </table></div>
            </AccordionItem>

            {/* SECCIÓN INFERIOR: Qué incluye / Notas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <h4 className="text-white font-bold flex items-center gap-2 mb-4 uppercase text-sm tracking-widest"><ShieldCheck size={18} className="text-green-400"/> ¿Qué Incluye?</h4>
                <ul className="space-y-3">
                  {[
                    "Visita técnica al inmueble", 
                    "Estudio de sector", 
                    "Soporte profesional", 
                    "Registro fotográfico", 
                    "Revisión urbanística básica", 
                    "Análisis comparativo de mercado", 
                    "Informe técnico digital"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300"><CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                <h4 className="text-white font-bold flex items-center gap-2 mb-4 uppercase text-sm tracking-widest"><Info size={18} className="text-blue-400"/> Notas Importantes</h4>
                <ul className="space-y-3 text-sm text-slate-400 list-disc pl-5 marker:text-slate-600">
                  <li>Valores sujetos a ubicación, complejidad y disponibilidad documental.</li>
                  <li>Tarifas referenciales para Bogotá y municipios cercanos.</li>
                  <li>Servicios especiales requieren cotización personalizada.</li>
                  <li><strong className="text-slate-200">Tiempo promedio de entrega:</strong> 2 a 5 días hábiles.</li>
                </ul>
              </div>
            </div>
         </div>
       </div>

       {/* 4. NUEVA METODOLOGÍA: Anatomía del Peritaje */}
       <div id="metodologia" className="py-24 bg-white relative z-10 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
             <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                <div className="md:w-1/2">
                   <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 font-bold uppercase tracking-widest text-xs mb-4 border border-slate-200">Marco Legal: Res. 620 / 2008 IGAC</span>
                   <h2 className="text-4xl md:text-5xl font-black text-[#0A192F] leading-tight">La anatomía de un peritaje exacto.</h2>
                </div>
                <div className="md:w-1/2 text-slate-600 text-lg border-l-4 border-green-500 pl-6">
                   Un avalúo no es una opinión comercial. Nuestro dictamen es el resultado de una auditoría legal, matemática y normativa que blinda el valor de tu patrimonio ante cualquier negociación.
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {workflowSteps.map((item, index) => (
                   <div key={index} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 relative overflow-hidden group hover:bg-[#0A192F] hover:border-[#0A192F] transition-colors duration-300">
                      <div className="absolute -right-6 -top-6 text-[120px] font-black text-slate-100 group-hover:text-slate-800 transition-colors duration-300 z-0">
                         {item.step}
                      </div>
                      <div className="relative z-10">
                         <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:border-slate-700 group-hover:bg-slate-800">
                            <item.icon size={24} className="text-green-600 group-hover:text-green-400 transition-colors duration-300" />
                         </div>
                         <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-white transition-colors duration-300">
                            {item.title}
                         </h4>
                         <p className="text-slate-600 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                            {item.desc}
                         </p>
                      </div>
                   </div>
                ))}
             </div>
          </div>
       </div>

    </div>
  );
};

export default Avaluos;