const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-secondary mb-2">Ventas</h3>
          <p className="text-gray-600">Gestionamos la venta de tu inmueble con la mejor estrategia comercial.</p>
        </div>
        {/* Card 2 */}
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-secondary mb-2">Arriendos</h3>
          <p className="text-gray-600">Encontramos el inquilino ideal con estudio de asegurabilidad.</p>
        </div>
        {/* Card 3 */}
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-secondary mb-2">Avalúos</h3>
          <p className="text-gray-600">Conoce el valor real de tu propiedad con peritos certificados.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
