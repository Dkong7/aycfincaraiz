import React from 'react';
import { Facebook, Instagram, Linkedin, ArrowUp } from 'lucide-react';

const FooterCustom = () => {
  return (
    <footer className="bg-[#111] text-white pt-0 relative mt-0 font-sans">
      {/* BARRA VERDE SUPERIOR */}
      <div className="w-full h-2 bg-[#009B4D] absolute top-0 left-0" />

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-black mb-4 flex items-center gap-2">
            <span className="bg-[#004d25] px-2 rounded">A&C</span> FINCA RAÍZ
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Expertos en finca raíz en Bogotá y Cundinamarca. Conectamos sueños con realidades.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="p-2 bg-gray-800 rounded hover:bg-[#39FF14] hover:text-black transition-colors cursor-pointer"><Facebook size={20}/></div>
            <div className="p-2 bg-gray-800 rounded hover:bg-[#39FF14] hover:text-black transition-colors cursor-pointer"><Instagram size={20}/></div>
            <div className="p-2 bg-gray-800 rounded hover:bg-[#39FF14] hover:text-black transition-colors cursor-pointer"><Linkedin size={20}/></div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Enlaces Rápidos</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-[#39FF14] cursor-pointer">Inmuebles</li>
            <li className="hover:text-[#39FF14] cursor-pointer">Avalúos</li>
            <li className="hover:text-[#39FF14] cursor-pointer">Servicios</li>
            <li className="hover:text-[#39FF14] cursor-pointer">Contacto</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6 uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3"><span className="text-[#39FF14]">??</span> Calle 20 Sur # 69B - 80, Bogotá D.C</li>
            <li className="flex items-center gap-3"><span className="text-[#39FF14]">??</span> +57 313 466 3832</li>
            <li className="flex items-center gap-3"><span className="text-[#39FF14]">??</span> info@aycfincaraiz.com</li>
          </ul>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
           <h4 className="font-bold text-xs text-[#39FF14] mb-4 uppercase">Testimonio</h4>
           <p className="italic text-gray-300 text-sm mb-4">"Gracias al avalúo certificado de A&C logramos cerrar la venta..."</p>
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
              <div><p className="font-bold text-sm">Carlos M.</p><p className="text-xs text-gray-500">Logística S.A.S</p></div>
           </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 px-6 bg-black flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2026 A&C Finca Raíz. Todos los derechos reservados.</p>
        <p>Desarrollado por <span className="text-[#39FF14] font-bold">WillowTreeMedia</span></p>
      </div>
      
      <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="fixed bottom-6 right-6 bg-[#0a0a0a] border border-gray-700 p-3 rounded-full hover:bg-[#39FF14] hover:text-black transition-all z-50">
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};
export default FooterCustom;
