import { Link } from "react-router-dom";

const ManageAdvisors = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Gestión de Asesores</h1>
      <p className="mb-6">Módulo en construcción.</p>
      <Link to="/admin" className="text-blue-600 underline">Volver al Dashboard</Link>
    </div>
  );
};

export default ManageAdvisors;
