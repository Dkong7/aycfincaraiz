import React, { useState } from "react";
import { Mail, Phone, ShieldCheck, ArrowRight, Instagram, Youtube, MapPin, MessageCircle } from "lucide-react";
import { useApp } from "../context/AppContext"; 
import Navbar from "../components/Navbar";

const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
);

const Contact = () => {
  const { t } = useApp();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", msg: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.replace(/[<>;'"\\]/g, "") }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-green-100 selection:text-green-900">
       <Navbar />
       
       <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <ShieldCheck size={14}/> {t('contact_secure_badge')}
             </div>
             <h1 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-6 tracking-tight uppercase">Hablemos de negocios.</h1>
             <p className="text-slate-500 text-lg max-w-2xl mx-auto">Tu patrimonio merece una gestión de alto nivel.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             
             {/* COLUMNA IZQUIERDA: DATOS + CTA WHATSAPP */}
             <div className="lg:col-span-4 space-y-8">
                <div className="bg-[#0A192F] p-8 rounded-3xl text-white shadow-2xl">
                   <h3 className="text-xl font-bold mb-8 flex items-center gap-2"><MapPin className="text-green-500" /> Información Directa</h3>
                   
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-green-500 border border-slate-700">
                            <Phone size={20} />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">WhatsApp</p>
                            <p className="font-bold">+57 322 482 2840</p>
                         </div>
                      </div>

                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-blue-500 border border-slate-700">
                            <Mail size={20} />
                         </div>
                         <div>
                            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Email</p>
                            <p className="font-bold">fincaraizayc@gmail.com</p>
                         </div>
                      </div>
                   </div>

                   {/* CTA INTEGRADO */}
                   <a 
                      href="https://wa.me/573224822840?text=Hola,%20quisiera%20pedir%20información%20sobre%20sus%20servicios." 
                      target="_blank" 
                      rel="noreferrer"
                      className="mt-10 flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-400 text-[#0A192F] font-black rounded-2xl transition-all shadow-lg hover:shadow-green-500/20 active:scale-95"
                   >
                      <MessageCircle size={18} /> Iniciar Chat WhatsApp
                   </a>

                   <div className="mt-12 pt-8 border-t border-slate-700">
                      <p className="text-xs text-slate-400 mb-4 uppercase tracking-widest">Síguenos en redes</p>
                      <div className="flex gap-4">
                         {[
                            { icon: Instagram, link: "https://www.instagram.com/aycfincaraiz_/" },
                            { icon: TikTokIcon, link: "https://www.tiktok.com/@aycfincaraiz" },
                            { icon: Youtube, link: "https://www.youtube.com/@AyCFincaRaiz" }
                         ].map((s, i) => (
                            <a key={i} href={s.link} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center hover:bg-green-600 transition-colors">
                               <s.icon size={20} />
                            </a>
                         ))}
                      </div>
                   </div>
                </div>
             </div>

             {/* COLUMNA DERECHA: FORMULARIO */}
             <div className="lg:col-span-8 bg-white p-10 md:p-16 rounded-[2.5rem] shadow-xl border border-slate-100">
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Nombre completo</label>
                      <input name="name" onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold transition-all" placeholder="Juan Pérez"/>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">WhatsApp</label>
                      <input name="phone" onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold transition-all" placeholder="300 000 0000"/>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Correo electrónico</label>
                      <input name="email" onChange={handleChange} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold transition-all" placeholder="tu@email.com"/>
                   </div>
                   <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Mensaje</label>
                      <textarea name="msg" onChange={handleChange} rows={4} className="w-full p-4 bg-slate-50 rounded-2xl border border-slate-200 outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 font-bold transition-all resize-none" placeholder="¿Cómo podemos ayudarte hoy?"/>
                   </div>
                   <button disabled={isSubmitting} className="md:col-span-2 flex items-center justify-center gap-3 w-full py-5 bg-[#0A192F] text-white font-black rounded-2xl hover:bg-green-600 transition-all shadow-lg active:scale-95 uppercase tracking-widest text-sm">
                      {isSubmitting ? "Enviando..." : <>Enviar solicitud <ArrowRight size={18}/></>}
                   </button>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;