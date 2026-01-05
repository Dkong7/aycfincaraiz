import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane, faVrCardboard, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Audiovisual = () => (
  <div className="bg-black text-white min-h-screen font-sans">
     <Navbar language="ES" toggleLanguage={() => {}} />
     
     {/* HERO CINEMA */}
     <div className="h-[60vh] bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4')] bg-cover bg-center flex items-center justify-center relative pt-20">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center px-6">
           <h1 className="text-6xl md:text-8xl font-black uppercase mb-4 tracking-tighter drop-shadow-2xl">Cinema A&C</h1>
           <p className="text-xl md:text-2xl text-gray-300 font-light tracking-wide">Narrativa visual que vende.</p>
        </div>
     </div>

     {/* CONTENIDO PRINCIPAL */}
     <div className="max-w-5xl mx-auto py-24 px-6">
        
        {/* VIDEO REEL */}
        <div className="aspect-video bg-gray-900 rounded-2xl border border-gray-800 shadow-[0_0_100px_rgba(34,197,94,0.15)] flex items-center justify-center overflow-hidden relative group">
           <iframe className="w-full h-full" src="https://www.youtube.com/embed/xcsI00fi5_s?autoplay=0&mute=1" title="Demo Reel" allowFullScreen></iframe>
        </div>
        
        {/* CARACTERÍSTICAS (Usando FontAwesome como pediste) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div>
              <span className="text-green-500 font-black uppercase tracking-[0.3em] text-xs mb-6 block">Tecnología de Punta</span>
              <h2 className="text-4xl font-black mb-8 leading-tight">Elevamos el estatus <br/>de tu propiedad.</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                 No solo grabamos videos; creamos piezas cinematográficas que despiertan emociones. Utilizamos drones FPV para interiores y cámaras de cine para capturar la esencia de cada espacio.
              </p>
              <Link to="/contacto" className="inline-flex items-center gap-3 text-green-500 font-bold uppercase tracking-widest hover:text-white transition-colors">
                 Agendar Producción <FontAwesomeIcon icon={faArrowRight} />
              </Link>
           </div>
           
           <div className="grid grid-cols-1 gap-8">
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-green-600/50 transition-colors group">
                 <FontAwesomeIcon icon={faPlane} className="text-green-500 text-3xl mb-4 group-hover:scale-110 transition-transform" />
                 <h3 className="text-xl font-bold mb-2">Drones 4K FPV</h3>
                 <p className="text-sm text-gray-500">Vuelos fluidos por el interior de la propiedad, simulando la vista humana.</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-colors group">
                 <FontAwesomeIcon icon={faVrCardboard} className="text-blue-500 text-3xl mb-4 group-hover:scale-110 transition-transform" />
                 <h3 className="text-xl font-bold mb-2">Recorridos VR 360°</h3>
                 <p className="text-sm text-gray-500">Tours virtuales inmersivos compatibles con gafas de realidad virtual.</p>
              </div>
           </div>
        </div>
     </div>
     
     <Footer />
  </div>
);
export default Audiovisual;
