import React from "react";
import { 
  Home, Building2, Warehouse, Mountain, Map, Store, Briefcase 
} from "lucide-react";

// Configuración visual mejorada
const TYPES = [
  { 
    id: "Casa", 
    label: "CASA", 
    icon: <Home size={28}/>, 
    // Clases dinámicas para hover/active
    theme: "hover:border-yellow-400 hover:bg-yellow-50 text-gray-400 hover:text-yellow-700",
    bgIcon: "bg-gray-50 group-hover:bg-yellow-100"
  },
  { 
    id: "Apartamento", 
    label: "APTO", 
    icon: <Building2 size={28}/>, 
    theme: "hover:border-blue-400 hover:bg-blue-50 text-gray-400 hover:text-blue-700",
    bgIcon: "bg-gray-50 group-hover:bg-blue-100"
  },
  { 
    id: "Bodega", 
    label: "BODEGA", 
    icon: <Warehouse size={28}/>, 
    theme: "hover:border-amber-500 hover:bg-amber-50 text-gray-400 hover:text-amber-800",
    bgIcon: "bg-gray-50 group-hover:bg-amber-100"
  },
  { 
    id: "CasaCampo", 
    label: "RURAL", 
    icon: <Mountain size={28}/>, 
    theme: "hover:border-purple-400 hover:bg-purple-50 text-gray-400 hover:text-purple-700",
    bgIcon: "bg-gray-50 group-hover:bg-purple-100"
  },
  { 
    id: "Lote", 
    label: "LOTE", 
    icon: <Map size={28}/>, 
    theme: "hover:border-green-400 hover:bg-green-50 text-gray-400 hover:text-green-700",
    bgIcon: "bg-gray-50 group-hover:bg-green-100"
  },
  { 
    id: "Local", 
    label: "LOCAL", 
    icon: <Store size={28}/>, 
    theme: "hover:border-pink-400 hover:bg-pink-50 text-gray-400 hover:text-pink-700",
    bgIcon: "bg-gray-50 group-hover:bg-pink-100"
  },
  { 
    id: "Oficina", 
    label: "OFICINA", 
    icon: <Briefcase size={28}/>, 
    theme: "hover:border-cyan-400 hover:bg-cyan-50 text-gray-400 hover:text-cyan-700",
    bgIcon: "bg-gray-50 group-hover:bg-cyan-100"
  },
];

export default function TypeSelector({ onSelect }: { onSelect: (type: string) => void }) {
  return (
    <div className="max-w-5xl mx-auto py-8 md:py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#0A192F] uppercase mb-3 tracking-widest">
            ¿Qué vamos a publicar?
        </h2>
        <p className="text-gray-400 text-sm md:text-base font-medium">
            Selecciona el formato para cargar las especificaciones correctas.
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-fadeIn">
        {TYPES.map((t) => (
          <button 
            key={t.id} 
            onClick={() => onSelect(t.id)}
            className={`
                group relative flex flex-col items-center justify-center 
                h-36 md:h-44 rounded-2xl border-2 border-gray-100 bg-white 
                shadow-sm transition-all duration-300 ease-out
                hover:shadow-xl hover:-translate-y-1 hover:border-transparent
                active:scale-95 active:shadow-inner
                ${t.theme}
            `}
          >
            {/* Círculo decorativo detrás del icono */}
            <div className={`
                w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 md:mb-4 
                transition-colors duration-300 ${t.bgIcon}
            `}>
                {/* El icono hereda el color del texto del botón padre */}
                <div className="transform transition-transform duration-300 group-hover:scale-110">
                    {t.icon}
                </div>
            </div>
            
            <span className="font-black uppercase text-xs md:text-sm tracking-[0.15em]">
                {t.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}