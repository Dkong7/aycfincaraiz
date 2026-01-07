import React from "react";
import { Link } from "react-router-dom";
import { Shield, Scale, FileSearch, Lock } from "lucide-react";

export const LegalSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Centrado */}
        <div className="text-center max-w-3xl mx-auto mb-16">
           <div className="inline-flex items-center gap-2 mb-4 text-blue-600 font-black uppercase tracking-widest text-xs bg-blue-50 px-4 py-2 rounded-full">
              <Shield size={14} /> Seguridad Jurídica
           </div>
           <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 uppercase leading-none">
              Blindaje Inmobiliario <br/><span className="text-slate-300">Total.</span>
           </h2>
           <p className="text-lg text-slate-500">
              Tu patrimonio es sagrado. No firmes promesas de compraventa ni contratos sin la revisión de nuestro equipo jurídico experto en derecho inmobiliario y urbanístico.
           </p>
        </div>

        {/* Grid de Servicios Jurídicos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
           {/* Card 1 */}
           <div className="group relative bg-slate-50 hover:bg-slate-900 rounded-[2.5rem] p-10 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                 <FileSearch size={120} className="text-slate-900 group-hover:text-white"/>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm mb-8 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <FileSearch size={28}/>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-2">Estudio de Títulos</h3>
                    <p className="text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed">
                       Análisis de 20 años de tradición para descartar embargos, falsas tradiciones o problemas sucesorales.
                    </p>
                 </div>
              </div>
           </div>

           {/* Card 2 (Destacada) */}
           <div className="group relative bg-slate-900 rounded-[2.5rem] p-10 transform md:-translate-y-4 shadow-2xl shadow-slate-200">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                 <Scale size={120} className="text-white"/>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 animate-pulse">
                    <Scale size={28}/>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-white mb-2">Saneamiento Predial</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                       Corregimos áreas, linderos y cabidas. Resolvemos problemas de falsa tradición y sucesiones complejas.
                    </p>
                 </div>
                 <Link to="/contacto" className="mt-8 text-center py-3 rounded-xl bg-white text-slate-900 font-bold uppercase text-xs tracking-wider hover:bg-blue-50 transition-colors">
                    Consultar Caso
                 </Link>
              </div>
           </div>

           {/* Card 3 */}
           <div className="group relative bg-slate-50 hover:bg-slate-900 rounded-[2.5rem] p-10 transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                 <Lock size={120} className="text-slate-900 group-hover:text-white"/>
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                 <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm mb-8 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Lock size={28}/>
                 </div>
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-white mb-2">Contratos Seguros</h3>
                    <p className="text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed">
                       Redacción y revisión de promesas de compraventa y contratos de arrendamiento con cláusulas de protección.
                    </p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};