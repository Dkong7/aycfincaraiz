import { useTranslation } from 'react-i18next';

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:bg-white hover:border-primary hover:shadow-sm transition-all duration-300 group"
      aria-label="Cambiar idioma"
    >
      <span className={`text-xs font-bold transition-colors ${i18n.language === 'es' ? 'text-primary' : 'text-gray-400'}`}>ES</span>
      <div className="h-3 w-[1px] bg-gray-300"></div>
      <span className={`text-xs font-bold transition-colors ${i18n.language === 'en' ? 'text-primary' : 'text-gray-400'}`}>EN</span>
    </button>
  );
};

export default LanguageSwitch;
