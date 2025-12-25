import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useApp } from "../context/AppContext";

const Contact = () => {
  const { t } = useApp();
  const PHONE = "+57 313 466 3832";
  const ADDRESS = "Calle 20 Sur # 69B - 80";

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-blue-900 text-white py-24 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url(''https://www.transparenttextures.com/patterns/carbon-fibre.png'')] opacity-20"></div>
         <h1 className="text-5xl font-bold relative z-10 mb-2">{t("nav_contact")}</h1>
         <p className="text-blue-200 relative z-10 text-xl font-light">Estamos listos para asesorarte</p>
      </div>
      <div className="max-w-5xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-2xl shadow-xl h-fit border-t-8 border-yellow-500">
             <h3 className="text-2xl font-bold mb-8 text-blue-900">Información de Contacto</h3>
             <ul className="space-y-8">
                <li className="flex gap-5 items-start"><div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 text-xl"><FontAwesomeIcon icon={faMapMarkerAlt} /></div><div><p className="font-bold text-gray-800 text-lg">Ubicación</p><p className="text-gray-500 text-sm leading-relaxed">{ADDRESS}<br/>Bogotá D.C.</p></div></li>
                <li className="flex gap-5 items-start"><div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 text-xl"><FontAwesomeIcon icon={faWhatsapp} /></div><div><p className="font-bold text-gray-800 text-lg">WhatsApp & Móvil</p><p className="text-gray-500 text-lg font-mono font-bold">{PHONE}</p></div></li>
                <li className="flex gap-5 items-start"><div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-yellow-600 text-xl"><FontAwesomeIcon icon={faEnvelope} /></div><div><p className="font-bold text-gray-800 text-lg">Email</p><p className="text-gray-500 text-sm">info@aycfincaraiz.com</p></div></li>
             </ul>
          </div>
          <div className="bg-blue-900 p-10 rounded-2xl shadow-xl text-white">
             <h3 className="text-2xl font-bold mb-2">Escríbenos</h3>
             <p className="text-blue-200 mb-8 text-sm">Responderemos a tu solicitud en breve.</p>
             <form className="space-y-5">
                <div><label className="block text-xs font-bold text-blue-200 uppercase mb-2">Nombre Completo</label><input type="text" className="w-full p-4 bg-blue-800 border border-blue-700 rounded-lg focus:bg-blue-700 outline-none transition text-white placeholder-blue-400" placeholder="Tu nombre" /></div>
                <div><label className="block text-xs font-bold text-blue-200 uppercase mb-2">Teléfono</label><input type="tel" className="w-full p-4 bg-blue-800 border border-blue-700 rounded-lg focus:bg-blue-700 outline-none transition text-white placeholder-blue-400" placeholder="+57 ..." /></div>
                <div><label className="block text-xs font-bold text-blue-200 uppercase mb-2">Mensaje</label><textarea rows={4} className="w-full p-4 bg-blue-800 border border-blue-700 rounded-lg focus:bg-blue-700 outline-none transition text-white placeholder-blue-400" placeholder="Estoy interesado en..."></textarea></div>
                <button type="submit" className="w-full bg-yellow-500 text-blue-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition flex items-center justify-center gap-3 shadow-lg mt-4"><FontAwesomeIcon icon={faPaperPlane} /> ENVIAR</button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contact;