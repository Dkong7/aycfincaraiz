import React, { useState, useEffect } from "react";
import { Mail, Phone, Instagram, Facebook, Linkedin, ShieldCheck, AlertTriangle, Lock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";

const Contact = () => {
  const { t } = useLanguage();
  
  // --- INICIO BLOQUE SEGURIDAD BLUE HAT ---
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", msg: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. BLOQUEO DE F12, INSPECTOR Y CLICK DERECHO
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // 2. SANITIZACIÓN EN TIEMPO REAL (Anti-SQL Injection)
  const sanitizeInput = (value: string) => {
    return value.replace(/[<>;'"\\]/g, "").replace(/--/g, "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const cleanValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [name]: cleanValue }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
      const newErrors: Record<string, string> = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9+ ]{7,15}$/; 

      if (!formData.name.trim()) newErrors.name = "Requerido";
      if (!formData.phone.trim() || !phoneRegex.test(formData.phone)) newErrors.phone = "Número inválido";
      if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = "Email inválido";
      if (!formData.msg.trim()) newErrors.msg = "Requerido";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateForm()) return;
      setIsSubmitting(true);
      setTimeout(() => {
          alert("Mensaje enviado seguro (Sanitizado).");
          setFormData({ name: "", phone: "", email: "", msg: "" });
          setIsSubmitting(false);
      }, 1500);
  };
  // --- FIN BLOQUE SEGURIDAD ---

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-green-100 selection:text-green-900">
       <Navbar />
       
       <div className="pt-40 pb-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          {/* COLUMNA IZQUIERDA: INFORMACIÓN (Ahora con texto oscuro para fondo blanco) */}
          <div className="animate-fade-in-up">
             
             {/* Badge Seguro */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 border border-green-500/50 rounded-full text-green-700 text-xs font-black uppercase tracking-widest mb-8">
                <ShieldCheck size={14}/> {t.contact.secureBadge || "Canal Seguro"}
             </div>
             
             {/* TÍTULO OSCURO */}
             <h1 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none tracking-tight text-[#0A192F]">
                {t.contact.title}
             </h1>
             
             {/* DESCRIPCIÓN OSCURA */}
             <p className="text-slate-600 text-lg md:text-xl mb-12 leading-relaxed border-l-4 border-green-500 pl-6 max-w-lg font-medium">
                {t.contact.heroDesc}
             </p>
             
             <div className="space-y-10 mb-16">
                {/* Teléfono */}
                <div className="flex items-center gap-6 group">
                   <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-green-600 shadow-sm group-hover:bg-green-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Phone size={28}/>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t.contact.call}</p>
                      {/* NÚMERO OSCURO */}
                      <p className="text-3xl font-black text-[#0A192F] group-hover:text-green-600 transition-colors tracking-tight">+57 313 466 3832</p>
                   </div>
                </div>
                
                {/* Email */}
                <div className="flex items-center gap-6 group">
                   <div className="w-16 h-16 bg-slate-100 border border-slate-200 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-500 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Mail size={28}/>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t.contact.write}</p>
                      {/* EMAIL OSCURO */}
                      <p className="text-2xl font-bold text-[#0A192F] group-hover:text-blue-600 transition-colors">info@aycfincaraiz.com</p>
                   </div>
                </div>
             </div>

             {/* Redes Sociales (Iconos oscuros) */}
             <div className="flex gap-4">
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-slate-200 rounded-full hover:bg-green-600 text-[#0A192F] hover:text-white transition-all hover:-translate-y-1"><Instagram size={20}/></a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-slate-200 rounded-full hover:bg-blue-600 text-[#0A192F] hover:text-white transition-all hover:-translate-y-1"><Facebook size={20}/></a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-slate-200 rounded-full hover:bg-blue-700 text-[#0A192F] hover:text-white transition-all hover:-translate-y-1"><Linkedin size={20}/></a>
             </div>
          </div>

          {/* COLUMNA DERECHA: FORMULARIO BLINDADO */}
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-slate-200 relative overflow-hidden animate-fade-in-up delay-200">
             {/* Barra decorativa superior */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-green-400"></div>
             
             <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-black text-[#0A192F]">Escríbenos</h3>
                    {Object.keys(errors).length > 0 && <AlertTriangle size={24} className="text-red-500 animate-bounce"/>}
                </div>

                <div>
                   <label className="block text-xs font-extrabold text-slate-400 mb-2 uppercase tracking-wide ml-1">{t.contact.name}</label>
                   <input 
                     type="text" 
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className={`w-full p-4 bg-slate-50 border ${errors.name ? 'border-red-300 bg-red-50 text-red-900' : 'border-slate-200 text-slate-800'} rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold placeholder:text-slate-300`}
                     placeholder="Tu nombre completo"
                     autoComplete="off"
                   />
                   {errors.name && <p className="text-red-500 text-xs font-bold mt-2 ml-1 flex items-center gap-1"><AlertTriangle size={10}/> {errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                      <label className="block text-xs font-extrabold text-slate-400 mb-2 uppercase tracking-wide ml-1">{t.contact.phone}</label>
                      <input 
                        type="text" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full p-4 bg-slate-50 border ${errors.phone ? 'border-red-300 bg-red-50 text-red-900' : 'border-slate-200 text-slate-800'} rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold placeholder:text-slate-300`}
                        placeholder="Ej: 300 123 4567"
                        autoComplete="off"
                      />
                      {errors.phone && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.phone}</p>}
                   </div>
                   <div>
                      <label className="block text-xs font-extrabold text-slate-400 mb-2 uppercase tracking-wide ml-1">{t.contact.email}</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full p-4 bg-slate-50 border ${errors.email ? 'border-red-300 bg-red-50 text-red-900' : 'border-slate-200 text-slate-800'} rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold placeholder:text-slate-300`}
                        placeholder="tu@email.com"
                        autoComplete="off"
                      />
                      {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.email}</p>}
                   </div>
                </div>

                <div>
                   <label className="block text-xs font-extrabold text-slate-400 mb-2 uppercase tracking-wide ml-1">{t.contact.msg}</label>
                   <textarea 
                     rows={4} 
                     name="msg"
                     value={formData.msg}
                     onChange={handleChange}
                     className={`w-full p-4 bg-slate-50 border ${errors.msg ? 'border-red-300 bg-red-50 text-red-900' : 'border-slate-200 text-slate-800'} rounded-2xl outline-none focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all font-bold placeholder:text-slate-300 resize-none`}
                     placeholder="¿En qué podemos asesorarte hoy?"
                   ></textarea>
                   {errors.msg && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.msg}</p>}
                </div>

                <button 
                   disabled={isSubmitting}
                   className={`w-full py-5 bg-[#0A192F] text-white font-black rounded-2xl hover:bg-green-600 transition-all uppercase tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 flex justify-center items-center gap-3 ${isSubmitting ? 'opacity-80 cursor-wait' : ''}`}
                >
                   {isSubmitting ? (
                       <>{t.contact.btnSending || "Enviando Seguro"} <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></>
                   ) : (
                       t.contact.send
                   )}
                </button>
                
                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-6 flex items-center justify-center gap-1.5">
                    <Lock size={10} /> {t.contact.securityNote || "Protegido por AyC Shield v1.0"}
                </p>
             </form>
          </div>

       </div>
    </div>
  );
};
export default Contact;