import React from "react";
import { 
  Home, Building2, Warehouse, Mountain, Map, Store, Briefcase 
} from "lucide-react";

// --- CONFIGURACIÓN: PATRONES DE ALTO CONTRASTE ---
const THEMES: any = {
  yellow: { 
    bg: "bg-amber-500", 
    pattern: "radial-gradient(circle, rgba(255,255,255,0.5) 3px, transparent 3.5px)", 
    size: "18px 18px",
    hover: "hover:bg-amber-400 shadow-amber-500/60"
  },
  blue: { 
    bg: "bg-blue-700", 
    pattern: "repeating-linear-gradient(45deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 2px, transparent 2px, transparent 12px)",
    size: "12px 12px",
    hover: "hover:bg-blue-600 shadow-blue-700/60"
  },
  amber: { 
    bg: "bg-orange-800", 
    pattern: "linear-gradient(30deg, #ffffff30 12%, transparent 12.5%, transparent 87%, #ffffff30 87.5%, #ffffff30), linear-gradient(150deg, #ffffff30 12%, transparent 12.5%, transparent 87%, #ffffff30 87.5%, #ffffff30), linear-gradient(60deg, #ffffff30 25%, transparent 25.5%, transparent 75%, #ffffff30 75%, #ffffff30)",
    size: "30px 50px",
    hover: "hover:bg-orange-700 shadow-orange-800/60"
  },
  purple: { 
    bg: "bg-purple-800", 
    pattern: "radial-gradient(rgba(255,255,255,0.4) 2px, transparent 2px)",
    size: "12px 12px",
    hover: "hover:bg-purple-700 shadow-purple-800/60"
  },
  green: { 
    bg: "bg-emerald-800", 
    pattern: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 2px, transparent 2px, transparent 8px)",
    size: "10px 10px",
    hover: "hover:bg-emerald-700 shadow-emerald-800/60"
  },
  pink: { 
    bg: "bg-pink-700", 
    pattern: "linear-gradient(135deg, rgba(255,255,255,0.3) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.3) 25%, transparent 25%), linear-gradient(45deg, rgba(255,255,255,0.3) 25%, transparent 25%), linear-gradient(315deg, rgba(255,255,255,0.3) 25%, transparent 25%)",
    size: "24px 24px",
    hover: "hover:bg-pink-600 shadow-pink-700/60"
  },
  cyan: { 
    bg: "bg-cyan-700", 
    pattern: "radial-gradient(circle, transparent 20%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent 80%, transparent)",
    size: "20px 20px",
    hover: "hover:bg-cyan-600 shadow-cyan-700/60"
  },
};

const HexagonBtn = ({ id, label, icon, color, onClick }: any) => {
  const t = THEMES[color];

  return (
    <div 
      onClick={() => onClick(id)}
      className={`
        relative group cursor-pointer flex flex-col items-center justify-center
        /* Tamaños */
        w-36 h-40       /* Móvil */
        md:w-48 md:h-56 /* Desktop */
        
        transition-all duration-300 ease-out
        hover:scale-105 hover:z-20
        filter drop-shadow-md hover:drop-shadow-2xl
      `}
      style={{ 
        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
      }}
    >
      {/* 1. Fondo Base */}
      <div className={`absolute inset-0 ${t.bg} ${t.hover} transition-colors duration-300`}></div>
      
      {/* 2. Patrón (Alta Visibilidad) */}
      <div 
          className="absolute inset-0 opacity-100 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: t.pattern, backgroundSize: t.size }}
      ></div>

      {/* 3. Gradiente Sombra Interior (Para dar volumen) */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/30 pointer-events-none"></div>

      {/* 4. Contenido */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-white transform group-hover:-translate-y-1 transition-transform">
        <div className="p-3 md:p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/20 group-hover:bg-white/20 transition-all shadow-lg">
           {React.cloneElement(icon, { size: 32, strokeWidth: 2.5, className: "md:w-10 md:h-10" })}
        </div>
        
        <div className="text-center">
            <span className="block font-black uppercase tracking-[0.2em] text-xs md:text-sm drop-shadow-lg">
                {label}
            </span>
            <span className="block text-[9px] uppercase font-bold text-white/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Crear
            </span>
        </div>
      </div>
    </div>
  );
};

export default function TypeSelector({ onSelect }: { onSelect: (type: string) => void }) {
  
  const handleSelect = (visualId: string) => {
      // MAPEO EXACTO PARA POCKETBASE:
      // Si el botón dice "Rural", enviamos "CasaCampo" a la BD.
      const dbValue = visualId === "Rural" ? "CasaCampo" : visualId;
      onSelect(dbValue);
  };

  return (
    <div className="min-h-[85vh] w-full flex flex-col lg:flex-row items-center justify-center animate-in fade-in zoom-in duration-500 overflow-hidden bg-gray-50/50">
      
      {/* --- SECCIÓN IZQUIERDA: EL GRID (FLEX-GROW) --- */}
      <div className="flex-1 flex justify-center items-center py-10 lg:py-0 w-full order-2 lg:order-1">
          
          <div className="transform scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 transition-transform duration-500 ease-out">
            <div className="flex flex-row items-center justify-center gap-2 md:gap-5">
                
                {/* COLUMNA 1 */}
                <div className="flex flex-col gap-2 md:gap-5">
                   <HexagonBtn id="Local" label="Local" color="pink" icon={<Store/>} onClick={handleSelect} />
                   <HexagonBtn id="Lote" label="Lote" color="green" icon={<Map/>} onClick={handleSelect} />
                </div>

                {/* COLUMNA 2 (CENTRAL) */}
                <div className="flex flex-col gap-2 md:gap-5">
                   <HexagonBtn id="Apartamento" label="Apto" color="blue" icon={<Building2/>} onClick={handleSelect} />
                   <HexagonBtn id="Casa" label="Casa" color="yellow" icon={<Home/>} onClick={handleSelect} />
                   {/* NOTA: El ID visual es 'Rural', el handler lo convierte a 'CasaCampo' */}
                   <HexagonBtn id="Rural" label="Rural" color="purple" icon={<Mountain/>} onClick={handleSelect} />
                </div>

                {/* COLUMNA 3 */}
                <div className="flex flex-col gap-2 md:gap-5">
                   <HexagonBtn id="Oficina" label="Oficina" color="cyan" icon={<Briefcase/>} onClick={handleSelect} />
                   <HexagonBtn id="Bodega" label="Bodega" color="amber" icon={<Warehouse/>} onClick={handleSelect} />
                </div>

            </div>
          </div>
      </div>

      {/* --- SECCIÓN DERECHA: EL TÍTULO VERTICAL --- */}
      <div className="
            w-full lg:w-32 lg:h-[80vh] 
            flex flex-col items-center justify-center 
            order-1 lg:order-2 
            relative lg:border-l lg:border-gray-200
            mb-4 lg:mb-0
      ">
          <div className="lg:[writing-mode:vertical-rl] lg:rotate-180 flex items-center gap-4">
              <h2 className="text-4xl md:text-6xl font-black text-[#0A192F] uppercase tracking-widest opacity-10 lg:opacity-100 transition-opacity">
                  NUEVO
              </h2>
              <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#0A192F] to-gray-500 uppercase tracking-widest">
                  PROYECTO
              </h2>
          </div>
          
          <div className="hidden lg:block absolute bottom-10 animate-bounce text-gray-400">
             <div className="h-16 w-[1px] bg-gray-300 mx-auto"></div>
          </div>
      </div>

    </div>
  );
}