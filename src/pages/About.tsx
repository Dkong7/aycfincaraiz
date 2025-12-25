import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../context/AppContext";

const About = () => {
  const { t } = useApp();

  const SocialLinks = ({ linkedin, instagram }: { linkedin?: string, instagram?: string }) => (
    <div className="flex justify-center gap-4 mt-4">
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      )}
    </div>
  );

  return (
    <div className="bg-white min-h-screen pb-20 font-sans">
      {/* HEADER - CAMBIO DE COLOR A SLATE-800 (Más tenue) */}
      <div className="relative bg-slate-800 text-white py-24 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
        <div className="relative z-10 container mx-auto px-6 animate-fade-in-up">
          
          {/* LOGO GRANDE SIN CAJA BLANCA */}
          <div className="inline-block mb-10 transform hover:scale-105 transition duration-500">
             {/* Se aumentó el tamaño a h-40 (antes h-24) y se quitó el bg-white */}
             <img src="/ayclogo.svg" alt="A&C Finca Raíz" className="h-40 w-auto object-contain drop-shadow-2xl" />
          </div>

          <div className="w-24 h-2 bg-yellow-400 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto leading-relaxed">
             Más de <span className="font-bold text-yellow-400">15 años</span> construyendo confianza y elevando el estándar inmobiliario en Bogotá y la Sabana.
          </p>
        </div>
        
        {/* Curva inferior */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
            <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
            </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 lg:mt-24 space-y-24">
        
        {/* MISIÓN Y FOTO EQUIPO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1 animate-fade-in-right">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                    <FontAwesomeIcon icon={faHistory} className="text-2xl" />
                 </div>
                 <span className="font-bold uppercase tracking-widest text-blue-900">Nuestra Historia</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                 Más que intermediarios, somos tus <span className="text-blue-900 relative after:content-[''] after:block after:w-full after:h-3 after:bg-yellow-400/30 after:absolute after:bottom-1 after:left-0 after:-z-10">aliados patrimoniales</span>.
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
                A&C Finca Raíz nació con una misión clara: <strong className="text-gray-800">transformar la experiencia inmobiliaria</strong> a través de un servicio ético, transparente y profundamente humano. Entendemos que detrás de cada inmueble hay sueños, esfuerzos y proyectos de vida.
              </p>
              <div className="grid grid-cols-3 gap-8 text-center border-t border-gray-100 pt-8">
                 <div>
                    <p className="text-4xl font-bold text-blue-900 mb-2">+500</p>
                    <p className="text-sm text-gray-500 uppercase font-bold">Clientes Felices</p>
                 </div>
                 <div>
                    <p className="text-4xl font-bold text-blue-900 mb-2">15</p>
                    <p className="text-sm text-gray-500 uppercase font-bold">Años de Experiencia</p>
                 </div>
                 <div>
                    <p className="text-4xl font-bold text-blue-900 mb-2">$80MM+</p>
                    <p className="text-sm text-gray-500 uppercase font-bold">En Ventas</p>
                 </div>
              </div>
           </div>
           <div className="order-1 lg:order-2 relative animate-fade-in-left group">
              <div className="absolute inset-0 bg-blue-900 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform opacity-10"></div>
              <img src="/equipo.jpg" className="rounded-2xl shadow-2xl relative z-10 w-full object-cover transform group-hover:-translate-y-2 transition-transform" alt="Equipo A&C" />
           </div>
        </div>

        {/* LIDERAZGO */}
        <div>
           <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Nuestro Liderazgo</h2>
              <div className="w-24 h-2 bg-yellow-400 mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {/* CLAUDIA */}
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="relative w-48 h-48 mx-auto mb-8">
                   <div className="absolute inset-0 rounded-full border-4 border-pink-200 border-dashed animate-spin-slow"></div>
                   <img src="/claudia.png" alt="Claudia Cabrera" className="w-full h-full object-cover rounded-full p-2 border-4 border-white shadow-lg relative z-10" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">Claudia Cabrera</h3>
                <p className="text-pink-600 font-bold text-sm uppercase tracking-wider mb-6 bg-pink-50 inline-block px-4 py-1 rounded-full">{t("founder_role1")}</p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Visionaria y estratega. Su enfoque en las relaciones humanas y la excelencia en el servicio ha sido el pilar fundamental del crecimiento y la reputación de A&C.
                </p>
                <SocialLinks linkedin="https://linkedin.com" instagram="https://instagram.com" />
             </div>

             {/* ALFONSO */}
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                <div className="relative w-48 h-48 mx-auto mb-8">
                   <div className="absolute inset-0 rounded-full border-4 border-blue-200 border-dashed animate-spin-slow"></div>
                   <img src="/alfonso.png" alt="Alfonso Diaz" className="w-full h-full object-cover rounded-full p-2 border-4 border-white shadow-lg relative z-10" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">Alfonso Diaz</h3>
                <p className="text-blue-900 font-bold text-sm uppercase tracking-wider mb-6 bg-blue-50 inline-block px-4 py-1 rounded-full">{t("founder_role2")}</p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Administrador y Avaluador certificado (RAA). Aporta un rigor técnico y analítico invaluable, asegurando la solidez y transparencia en cada operación.
                </p>
                <SocialLinks linkedin="https://linkedin.com" instagram="https://instagram.com" />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;
