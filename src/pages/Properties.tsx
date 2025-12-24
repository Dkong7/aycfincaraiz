import { useTranslation } from 'react-i18next';

const Properties = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">{t('navbar.properties')}</h1>
      <div className="bg-gray-100 p-12 text-center rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500 text-lg">Aquí se cargará el listado de inmuebles desde el CMS...</p>
      </div>
    </div>
  );
};

export default Properties;
