import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">{t('navbar.us')}</h1>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <p className="text-gray-600 leading-relaxed">
          Somos una inmobiliaria comprometida con la excelencia y la transparencia. 
          Con años de experiencia en el mercado de Bogotá, ayudamos a familias y empresas 
          a encontrar su espacio ideal.
        </p>
      </div>
    </div>
  );
};

export default About;
