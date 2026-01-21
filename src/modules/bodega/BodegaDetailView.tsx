import React from "react";
import { 
  Maximize, Ruler, Zap, ArrowUpFromLine, Layers, Warehouse, MapPin, 
  Truck, Briefcase, Store, CheckCircle2, Factory, DollarSign,
  TrendingUp, RefreshCw, Container
} from "lucide-react";

// Imports de Lógica
import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { translate as localTranslate, BODEGA_ICONS } from "./bodega.config";
import { formatCurrency } from "../../utils/formatters";

export default function BodegaDetailView({ specs, description, adminFee, priceCop, priceUsd }: any) {
  
  // 1. Hooks Globales
  const { translateDynamic, currency, lang } = useApp();
  const trm = useTRM();

  // 2. Helper de Traducción
  const tr = (key: string) => {
     const spanishLabel = localTranslate(key);
     return translateDynamic(spanishLabel);
  };

  // 3. Lógica de Precios
  const showUsd = currency === "USD";
  const mainPrice = showUsd 
      ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") 
      : `$${formatCurrency(priceCop)}`;
  
  const secondaryPrice = showUsd
      ? `$${formatCurrency(priceCop)} COP`
      : (priceUsd ? `USD $${formatCurrency(priceUsd)}` : null);

  // --- SUB-COMPONENTES UI (Tema Industrial - Ámbar) ---

  const MainStat = ({ label, val, sub, icon: Icon }: any) => (
    <div className="flex flex-col justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-amber-300 transition-all group h-full">
        <div className="flex justify-between items-start mb-2">
           <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Icon size={20} strokeWidth={2} />
           </div>
           {sub && <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-full">{translateDynamic(sub)}</span>}
        </div>
        <div>
           <p className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{tr(val)}</p>
           <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{translateDynamic(label)}</p>
        </div>
    </div>
  );

  const SpecRow = ({ label, val, icon: Icon }: any) => (
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-amber-50/30 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-amber-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{translateDynamic(label)}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">
            {val ? tr(val) : "N/A"}
        </span>
     </div>
  );

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 font-sans">
       
       {/* SECCIÓN 0: PRECIO Y TRM */}
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{translateDynamic("Precio de Venta")}</p>
              <div className="flex items-baseline gap-3">
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900">{mainPrice}</h2>
                 {secondaryPrice && <span className="text-sm font-medium text-gray-400">{secondaryPrice}</span>}
              </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
              <div className={`p-2 rounded-full ${trm > 0 ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"}`}>
                  {trm > 0 ? <TrendingUp size={18}/> : <RefreshCw size={18} className="animate-spin"/>}
              </div>
              <div>
                  <p className="text-[10px] uppercase font-bold text-gray-400">TRM {lang === "EN" ? "Rate" : "Hoy"}</p>
                  <p className="font-bold text-gray-700">{trm > 0 ? `$${formatCurrency(Math.round(trm))} COP` : "Cargando..."}</p>
              </div>
          </div>
       </div>

       {/* SECCIÓN 1: DATOS CLAVE (BENTO GRID) */}
       <section>
          <div className="flex items-center gap-2 mb-6">
             <Factory className="text-amber-600" size={20}/>
             <h3 className="font-black text-sm text-gray-400 uppercase tracking-widest">{translateDynamic("Ficha Industrial")}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MainStat label="Área Total" val={`${specs.area_total || 0} m²`} icon={Maximize} sub={`Libre ${specs.area_free || 0}m²`} />
             <MainStat label="Altura" val={`${specs.height || 0} m`} icon={ArrowUpFromLine} />
             <MainStat label="Energía" val={specs.energy_kva ? `${specs.energy_kva} KVA` : "Estándar"} icon={Zap} />
             <MainStat label="Ubicación" val={specs.location_type} icon={MapPin} />
          </div>
       </section>

       {/* SECCIÓN 2: GRID PRINCIPAL */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUMNA IZQUIERDA (2/3): Descripción */}
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-amber-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
                <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                   <Warehouse size={20} className="text-amber-600"/> {translateDynamic("Descripción de la Bodega")}
                </h3>
                <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base relative z-10 text-justify">
                   {translateDynamic(description)}
                </p>

                {/* Badge Comercial (Si tiene locales) */}
                {specs.locales_count > 0 && (
                  <div className="mt-8 p-5 bg-amber-50/50 rounded-2xl border border-amber-100 flex gap-4 items-start">
                     <div className="p-3 bg-amber-100 rounded-full text-amber-700"><Store size={20}/></div>
                     <div>
                        <h4 className="font-bold text-amber-800 text-sm uppercase mb-1">{translateDynamic("Potencial Comercial")}</h4>
                        <p className="text-amber-900 font-bold text-lg">
                           {specs.locales_count} Locales <span className="text-xs font-normal opacity-70">/ Renta: {formatCurrency(specs.locales_rent_value)}</span>
                        </p>
                     </div>
                  </div>
                )}
             </div>
          </div>

          {/* COLUMNA DERECHA (1/3): Especificaciones Logísticas */}
          <div className="space-y-6">
             <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                    <Truck size={16} className="text-amber-600"/> {translateDynamic("Logística & Acceso")}
                </h3>
                <div className="flex flex-col">
                   <SpecRow label="Resistencia Piso" val={specs.floor_resistance} icon={Layers} />
                   <SpecRow label="Tipo Portón" val={specs.gate_type} icon={Container} />
                   <SpecRow label="Entradas" val={specs.entry_count} icon={ArrowUpFromLine} />
                   <SpecRow label="Acceso Tractomulas" val={specs.has_truck_access ? "Sí" : "No"} icon={Truck} />
                   <SpecRow label="Oficinas" val={specs.has_offices ? "Sí" : "No"} icon={Briefcase} />
                   <SpecRow label="Administración" val={adminFee ? formatCurrency(adminFee) : "N/A"} icon={DollarSign} />
                </div>
             </div>
          </div>
       </div>

       {/* SECCIÓN 3: EQUIPAMIENTO (TAGS) */}
       {specs.industrial_features && specs.industrial_features.length > 0 && (
         <section>
            <h3 className="font-black text-sm text-amber-600 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-amber-100 pb-2">
               <Zap size={16}/> {translateDynamic("Equipamiento & Seguridad")}
            </h3>
            <div className="flex flex-wrap gap-3">
               {specs.industrial_features.map((feat: string) => {
                  const Icon = BODEGA_ICONS[feat] || CheckCircle2;
                  return (
                    <div key={feat} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-600 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-default border-l-4 border-l-amber-500">
                       <Icon size={16} className="text-amber-600 shrink-0" /> 
                       <span>{tr(feat)}</span>
                    </div>
                  )
               })}
            </div>
         </section>
       )}

    </div>
  );
}