import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">{t('navbar.contact')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold mb-4">Envíanos un mensaje</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea rows={4} className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"></textarea>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-900 transition-colors w-full">Enviar</button>
          </form>
        </div>
        
        <div>
          <h3 className="text-2xl font-bold mb-4 text-secondary">Información</h3>
          <p className="text-gray-600 mb-4">Estamos listos para atenderte.</p>
          <ul className="space-y-4 text-gray-700">
            <li><strong>Dirección:</strong> Bogotá, Colombia</li>
            <li><strong>Teléfono:</strong> +57 (300) 123-4567</li>
            <li><strong>Email:</strong> contacto@aycfincaraiz.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
