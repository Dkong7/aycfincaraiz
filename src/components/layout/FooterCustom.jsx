import React, { useState } from 'react';
import { Facebook, Instagram, Youtube, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FooterCustom = () => {
  const { t } = useLanguage();
  const [testimonyIdx, setTestimonyIdx] = useState(0);

  const testimonials = [
    { name: "Carlos Ruiz", role: "Inversionista", text: "La asesoría legal de A&C me ahorró millones en un trámite complejo. Excelencia total.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
    { name: "Maria Fernanda", role: "Propietaria", text: "Vendieron mi casa en Rosales en tiempo récord gracias a sus videos tipo cine.", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" },
    { name: "Juan David", role: "Comprador", text: "Su transparencia y ética me dieron la confianza para invertir mi patrimonio.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" }
  ];

  const nextTestimony = () => setTestimonyIdx((prev) => (prev + 1) % testimonials.length);
  const prevTestimony = () => setTestimonyIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <footer className="bg-[#0A192F] text-white pt-20 pb-10 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
           
           {/* COL 1: CONTACTO */}
           <div>
              <img src="/ayclogo.svg" className="h-16 mb-6 brightness-0 invert" alt="A&C" />
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                 Bogotá & Cundinamarca<br/>
                 Calle 123 # 45-67, Of. 301<br/>
                 Edificio Torre Central
              </p>
              <div className="flex gap-4">
                 <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--ayc-emerald)] transition-colors"><Instagram size={20}/></a>
                 <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--ayc-emerald)] transition-colors"><Facebook size={20}/></a>
                 <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[var(--ayc-emerald)] transition-colors"><Youtube size={20}/></a>
                 <a href="https://tiktok.com" className="p-2 bg-white/5 rounded-full hover:bg-[var(--ayc-emerald)] transition-colors text-xs font-bold flex items-center justify-center w-9 h-9">Tk</a>
              </div>
           </div>

           {/* COL 2: TESTIMONIOS */}
           <div>
              <h3 className="text-[var(--ayc-emerald)] font-bold uppercase tracking-widest mb-6 text-sm">Testimonios</h3>
              <div className="bg-white/5 p-6 rounded-2xl relative">
                 <div className="flex items-center gap-4 mb-4">
                    <img src={testimonials[testimonyIdx].img} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--ayc-emerald)]" />
                    <div>
                       <p className="font-bold text-white">{testimonials[testimonyIdx].name}</p>
                       <p className="text-xs text-gray-400 uppercase">{testimonials[testimonyIdx].role}</p>
                    </div>
                 </div>
                 <p className="text-gray-300 text-sm italic">"{testimonials[testimonyIdx].text}"</p>
                 
                 <div className="absolute top-4 right-4 flex gap-1">
                    <button onClick={prevTestimony} className="p-1 hover:text-[var(--ayc-emerald)]"><ChevronLeft size={16}/></button>
                    <button onClick={nextTestimony} className="p-1 hover:text-[var(--ayc-emerald)]"><ChevronRight size={16}/></button>
                 </div>
              </div>
           </div>

           {/* COL 3: LEGAL */}
           <div>
              <h3 className="text-[var(--ayc-emerald)] font-bold uppercase tracking-widest mb-6 text-sm">{t.footer.contact}</h3>
              <div className="space-y-4 text-gray-400 text-sm">
                 <p className="flex items-center gap-3"><Phone size={16} className="text-[var(--ayc-emerald)]"/> +57 313 466 3832</p>
                 <p className="flex items-center gap-3"><Mail size={16} className="text-[var(--ayc-emerald)]"/> info@aycfincaraiz.com</p>
              </div>
           </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
           <p>&copy; {new Date().getFullYear()} A&C Finca Raíz. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
export default FooterCustom;