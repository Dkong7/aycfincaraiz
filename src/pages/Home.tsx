import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-primary mb-6">{t('navbar.home')}</h1>
        <p className="text-xl text-gray-600 mb-8">
          Encuentra la propiedad de tus sueños con A&C Finca Raíz. 
          Experiencia, confianza y el mejor portafolio de Bogotá.
        </p>
        <button className="bg-secondary text-white px-8 py-3 rounded-md font-bold hover:bg-green-700 transition-colors">
          Ver Inmuebles Destacados
        </button>
      </div>
    </div>
  );
};

export default Home;
