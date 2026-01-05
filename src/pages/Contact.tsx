import React from "react";
import { Mail, Phone, Instagram, Facebook, Linkedin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
       <Navbar language="ES" toggleLanguage={() => {}} />
       
       <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* INFO */}
          <div>
             <h1 className="text-5xl font-black text-[#0A192F] uppercase mb-6">{t.contact.title}</h1>
             <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                Estamos listos para escucharte. Ya sea para valorar tu propiedad, buscar tu nuevo hogar o estructurar un negocio inmobiliario, nuestro equipo está a tu disposición.
             </p>
             
             <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-600/10 text-green-600 rounded-full flex items-center justify-center">
                      <Phone size={24}/>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">{t.contact.call}</p>
                      <p className="text-xl font-bold text-[#0A192F]">+57 313 466 3832</p>
                   </div>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-green-600/10 text-green-600 rounded-full flex items-center justify-center">
                      <Mail size={24}/>
                   </div>
                   <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">{t.contact.write}</p>
                      <p className="text-xl font-bold text-[#0A192F]">info@aycfincaraiz.com</p>
                   </div>
                </div>
             </div>

             <div className="flex gap-4">
                <a href="#" className="p-3 bg-white shadow-lg rounded-full hover:bg-green-600 hover:text-white transition-all"><Instagram/></a>
                <a href="#" className="p-3 bg-white shadow-lg rounded-full hover:bg-green-600 hover:text-white transition-all"><Facebook/></a>
                <a href="#" className="p-3 bg-white shadow-lg rounded-full hover:bg-green-600 hover:text-white transition-all"><Linkedin/></a>
             </div>
          </div>

          {/* FORMULARIO */}
          <div className="bg-white p-10 rounded-3xl shadow-2xl h-fit">
             <form className="space-y-6">
                <div>
                   <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">{t.contact.name}</label>
                   <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-600 transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">{t.contact.phone}</label>
                      <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-600 transition-colors" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">{t.contact.email}</label>
                      <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-600 transition-colors" />
                   </div>
                </div>
                <div>
                   <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">{t.contact.msg}</label>
                   <textarea rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-green-600 transition-colors"></textarea>
                </div>
                <button className="w-full py-4 bg-[#0A192F] text-white font-bold rounded-xl hover:bg-green-600 transition-colors uppercase tracking-widest shadow-lg">
                   {t.contact.send}
                </button>
             </form>
          </div>

       </div>
       <Footer />
    </div>
  );
};
export default Contact;
