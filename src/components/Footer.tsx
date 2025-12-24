import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMapMarkerAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Marca */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-wider">A&C <span className="text-secondary">FINCA RAÍZ</span></h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transformamos la experiencia inmobiliaria con transparencia, tecnología y un servicio de excelencia.
            </p>
            <div className="flex gap-4 pt-2">
               <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-secondary transition-all duration-300 hover:-translate-y-1">
                 <FontAwesomeIcon icon={faFacebookF} />
               </a>
               <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-secondary transition-all duration-300 hover:-translate-y-1">
                 <FontAwesomeIcon icon={faInstagram} />
               </a>
               <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-secondary transition-all duration-300 hover:-translate-y-1">
                 <FontAwesomeIcon icon={faWhatsapp} />
               </a>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b-2 border-secondary inline-block pb-1">Menú</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-secondary transition-colors inline-block hover:translate-x-1 duration-200">{t('navbar.home')}</Link></li>
              <li><Link to="/nosotros" className="hover:text-secondary transition-colors inline-block hover:translate-x-1 duration-200">{t('navbar.us')}</Link></li>
              <li><Link to="/inmuebles" className="hover:text-secondary transition-colors inline-block hover:translate-x-1 duration-200">{t('navbar.properties')}</Link></li>
              <li><Link to="/blog" className="hover:text-secondary transition-colors inline-block hover:translate-x-1 duration-200">Blog Inmobiliario</Link></li>
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b-2 border-secondary inline-block pb-1">Servicios</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="hover:text-secondary transition-colors cursor-pointer">Venta de Propiedades</li>
              <li className="hover:text-secondary transition-colors cursor-pointer">Arrendamientos</li>
              <li className="hover:text-secondary transition-colors cursor-pointer">Avalúos Certificados</li>
              <li className="hover:text-secondary transition-colors cursor-pointer">Asesoría Jurídica</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b-2 border-secondary inline-block pb-1">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-secondary mt-1" />
                <span>Bogotá D.C., Colombia<br/>Zona Norte y Chapinero</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-secondary" />
                <span>+57 (300) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-secondary" />
                <span>info@aycfincaraiz.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} A&C Finca Raíz. Todos los derechos reservados. | Diseño y Desarrollo por Willow Tree.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
