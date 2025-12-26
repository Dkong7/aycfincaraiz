import React from 'react';

const About = () => {
  return (
    <div className="pt-24 bg-white min-h-screen font-sans">
      
      {/* HEADER */}
      <div className="bg-[#0A192F] text-white py-24 px-6 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
           <h1 className="text-5xl font-black uppercase mb-6 tracking-tighter">Nuestra Historia</h1>
           <p className="text-2xl text-gray-300 leading-relaxed font-light mb-8">
             Más que intermediarios, somos tus <span className="text-[var(--ayc-emerald)] font-bold">aliados patrimoniales</span>.
           </p>
           <p className="text-gray-400 max-w-2xl mx-auto text-lg">
             A&C Finca Raíz nació con una misión clara: transformar la experiencia inmobiliaria a través de un servicio ético, transparente y profundamente humano. Entendemos que detrás de cada inmueble hay sueños, esfuerzos y proyectos de vida.
           </p>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="bg-[var(--ayc-emerald)] py-16 -mt-10 relative z-20 mx-4 md:mx-10 rounded-2xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white divide-y md:divide-y-0 md:divide-x divide-white/20">
           <div className="p-4">
              <div className="text-5xl font-black mb-2">+500</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-90">Clientes Felices</div>
           </div>
           <div className="p-4">
              <div className="text-5xl font-black mb-2">15</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-90">Años de Experiencia</div>
           </div>
           <div className="p-4">
              <div className="text-5xl font-black mb-2">$80MM+</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-90">En Ventas</div>
           </div>
        </div>
      </div>

      {/* FUNDADORES */}
      <div className="max-w-7xl mx-auto px-6 py-32">
        <h2 className="text-4xl font-black text-[#0A192F] text-center mb-20 uppercase">Nuestro Liderazgo</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
           {/* CLAUDIA */}
           <div className="flex flex-col items-center text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mb-8 border-8 border-gray-100 shadow-xl relative group">
                 <img src="/claudia.png" alt="Claudia Cabrera" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-3xl font-black text-[#0A192F] mb-1">Claudia Cabrera</h3>
              <span className="text-[var(--ayc-emerald)] font-bold text-sm tracking-widest uppercase mb-6 block">Founder</span>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
                 Visionaria y estratega. Su enfoque en las relaciones humanas y la excelencia en el servicio ha sido el pilar fundamental del crecimiento y la reputación de A&C.
              </p>
           </div>

           {/* ALFONSO */}
           <div className="flex flex-col items-center text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mb-8 border-8 border-gray-100 shadow-xl relative group">
                 <img src="/alfonso.png" alt="Alfonso Diaz" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <h3 className="text-3xl font-black text-[#0A192F] mb-1">Alfonso Diaz</h3>
              <span className="text-[var(--ayc-emerald)] font-bold text-sm tracking-widest uppercase mb-6 block">Co-Founder</span>
              <p className="text-gray-600 text-lg leading-relaxed max-w-sm">
                 Administrador y Avaluador certificado (RAA). Aporta un rigor técnico y analítico invaluable, asegurando la solidez y transparencia en cada operación.
              </p>
           </div>
        </div>
      </div>

      {/* EQUIPO */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
         <div className="rounded-3xl overflow-hidden shadow-2xl relative h-[500px] group">
            <img src="/equipo.jpg" alt="Equipo A&C" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/40 to-transparent flex items-end p-10 md:p-16">
               <div className="max-w-2xl">
                  <h3 className="text-white text-3xl md:text-4xl font-bold mb-4">Un equipo comprometido con tu futuro.</h3>
                  <p className="text-gray-200 text-lg">Profesionales apasionados trabajando unidos para encontrar el lugar donde tu historia continúa.</p>
               </div>
            </div>
         </div>
      </div>

    </div>
  );
};
export default About;
