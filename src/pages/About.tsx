import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHistory, faHandshake, faChartLine, faHeart, faBuilding } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext"; 
import Navbar from "../components/Navbar";
// Footer removido

const About = () => {
  const { t } = useLanguage();

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
    <div className="bg-white min-h-screen font-sans">
      <Navbar /> 
      
      {/* HEADER */}
      <div className="relative bg-[#0A192F] text-white py-24 text-center overflow-hidden pt-32">
        <div className="absolute inset-0 bg-[#0A192F] opacity-90"></div>
        <div className="relative z-10 container mx-auto px-6 animate-fade-in-up">
          
          {/* LOGO (Color Original) */}
          <div className="inline-block mb-10 transform hover:scale-105 transition duration-500 bg-white/5 p-8 rounded-3xl backdrop-blur-sm border border-white/10 shadow-2xl">
             <img 
               src="/ayclogo.svg" 
               alt="A&C Finca Raíz" 
               className="h-32 w-auto object-contain" 
             />
          </div>

          <div className="w-24 h-2 bg-green-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl text-blue-100 font-light max-w-3xl mx-auto leading-relaxed">
             {t.about.heroText}
          </p>
        </div>
        
        {/* Curva inferior (Fix línea fina con translate-y-[1px]) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 translate-y-[1px]">
            <svg className="relative block w-full h-[60px] md:h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
            </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mt-16 lg:mt-24 space-y-24 pb-24">
        
        {/* MISIÓN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1 animate-fade-in-right">
              <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <FontAwesomeIcon icon={faHistory} className="text-2xl" />
                 </div>
                 <span className="font-bold uppercase tracking-widest text-[#0A192F]">{t.about.storyTitle}</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                 {t.about.storyHeadline}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 text-justify">
                {t.about.storyDesc}
              </p>
              <div className="grid grid-cols-3 gap-8 text-center border-t border-gray-100 pt-8">
                 <div>
                    <p className="text-4xl font-bold text-[#0A192F] mb-2">+500</p>
                    <p className="text-sm text-gray-500 uppercase font-bold">{t.about.statsClients}</p>
                 </div>
                 <div>
                    <p className="text-4xl font-bold text-[#0A192F] mb-2">15</p>
                    <p className="text-sm text-gray-500 uppercase font-bold">{t.about.statsExp}</p>
                 </div>
                 <div>
                    <p className="text-4xl font-bold text-[#0A192F] mb-2">$80MM+</p>
                    <p className="text-sm text-gray-500 uppercase font-bold">{t.about.statsSales}</p>
                 </div>
              </div>
           </div>
           <div className="order-1 lg:order-2 relative animate-fade-in-left group">
              <div className="absolute inset-0 bg-[#0A192F] rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform opacity-10"></div>
              <img src="/equipo.jpg" className="rounded-2xl shadow-2xl relative z-10 w-full object-cover transform group-hover:-translate-y-2 transition-transform" alt="Equipo A&C" />
           </div>
        </div>

        {/* VALORES (NUEVO - DINÁMICO) */}
        <div className="bg-slate-50 p-12 rounded-[3rem]">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-[#0A192F]">{t.about.valuesTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                  <FontAwesomeIcon icon={faHandshake} className="text-4xl text-green-500 mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-[#0A192F]">{t.about.val1T}</h3>
                  <p className="text-gray-500 text-sm">{t.about.val1D}</p>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                  <FontAwesomeIcon icon={faChartLine} className="text-4xl text-blue-500 mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-[#0A192F]">{t.about.val2T}</h3>
                  <p className="text-gray-500 text-sm">{t.about.val2D}</p>
               </div>
               <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                  <FontAwesomeIcon icon={faHeart} className="text-4xl text-pink-500 mb-4" />
                  <h3 className="font-bold text-xl mb-2 text-[#0A192F]">{t.about.val3T}</h3>
                  <p className="text-gray-500 text-sm">{t.about.val3D}</p>
               </div>
            </div>
        </div>

        {/* LIDERAZGO */}
        <div>
           <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t.about.teamTitle}</h2>
              <div className="w-24 h-2 bg-green-500 mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {/* CLAUDIA */}
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 to-purple-500"></div>
                <div className="relative w-48 h-48 mx-auto mb-8">
                   <div className="absolute inset-0 rounded-full border-4 border-pink-100 border-dashed animate-spin-slow"></div>
                   <img src="/claudia.png" alt="Claudia Cabrera" className="w-full h-full object-cover rounded-full p-2 border-4 border-white shadow-lg relative z-10" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">Claudia Cabrera</h3>
                <p className="text-pink-600 font-bold text-xs uppercase tracking-widest mb-6">{t.about.founderRole1}</p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {t.about.founderDesc1}
                </p>
                <SocialLinks linkedin="https://linkedin.com" instagram="https://instagram.com" />
             </div>

             {/* ALFONSO */}
             <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-green-500"></div>
                <div className="relative w-48 h-48 mx-auto mb-8">
                   <div className="absolute inset-0 rounded-full border-4 border-blue-100 border-dashed animate-spin-slow"></div>
                   <img src="/alfonso.png" alt="Alfonso Diaz" className="w-full h-full object-cover rounded-full p-2 border-4 border-white shadow-lg relative z-10" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">Alfonso Diaz</h3>
                <p className="text-blue-900 font-bold text-xs uppercase tracking-widest mb-6">{t.about.founderRole2}</p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  {t.about.founderDesc2}
                </p>
                <SocialLinks linkedin="https://linkedin.com" instagram="https://instagram.com" />
             </div>
           </div>
        </div>

        {/* LOGOS ALIADOS (MARQUEE) */}
        <div className="border-t border-gray-100 pt-12 pb-6 overflow-hidden">
            <p className="text-center text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Confían en nosotros</p>
            <div className="flex gap-12 justify-center opacity-40 grayscale">
                {[1,2,3,4,5].map(i => (
                    <FontAwesomeIcon key={i} icon={faBuilding} className="text-4xl hover:text-green-500 hover:grayscale-0 transition-all duration-500" />
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default About;