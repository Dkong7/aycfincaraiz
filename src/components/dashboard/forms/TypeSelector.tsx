import React from "react";
import { 
  Home, Building2, Warehouse, Mountain, Map, Store, Briefcase 
} from "lucide-react";

// Configuración visual de los botones
const TYPES = [
  { id: "Casa", label: "CASA", icon: <Home size={32}/>, color: "hover:bg-yellow-50 hover:border-yellow-500 hover:text-yellow-600" },
  { id: "Apartamento", label: "APTO", icon: <Building2 size={32}/>, color: "hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600" },
  { id: "Bodega", label: "BODEGA", icon: <Warehouse size={32}/>, color: "hover:bg-amber-50 hover:border-amber-700 hover:text-amber-800" },
  { id: "CasaCampo", label: "RURAL", icon: <Mountain size={32}/>, color: "hover:bg-purple-50 hover:border-purple-500 hover:text-purple-600" },
  { id: "Lote", label: "LOTE", icon: <Map size={32}/>, color: "hover:bg-green-50 hover:border-green-500 hover:text-green-600" },
  { id: "Local", label: "LOCAL", icon: <Store size={32}/>, color: "hover:bg-pink-50 hover:border-pink-500 hover:text-pink-600" },
  { id: "Oficina", label: "OFICINA", icon: <Briefcase size={32}/>, color: "hover:bg-cyan-50 hover:border-cyan-500 hover:text-cyan-600" },
];

export default function TypeSelector({ onSelect }: { onSelect: (type: string) => void }) {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-black text-[#0A192F] uppercase mb-2 text-center tracking-widest">¿Qué vamos a publicar hoy?</h2>
      <p className="text-center text-gray-400 mb-10 text-sm">Selecciona el tipo de inmueble para cargar el formato correcto.</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeIn">
        {TYPES.map((t) => (
          <button 
            key={t.id} 
            onClick={() => onSelect(t.id)}
            className={`flex flex-col items-center justify-center h-40 rounded-3xl border-2 border-dashed border-gray-200 transition-all duration-300 group ${t.color} hover:shadow-xl hover:-translate-y-1 bg-white`}
          >
            <div className="text-gray-300 group-hover:text-current mb-3 transition-colors transform group-hover:scale-110 duration-300">
                {t.icon}
            </div>
            <span className="font-black uppercase text-xs text-gray-400 group-hover:text-current tracking-widest">
                {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}