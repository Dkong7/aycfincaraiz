import React from "react";
import { 
  Maximize, Home, Calendar, Car, Layout, ShieldCheck, 
  Layers, Bed, Bath, ChefHat, Flame, Grid, Utensils, 
  MapPin, Armchair, CheckCircle2, Ruler, DollarSign,
  TrendingUp, RefreshCw
} from "lucide-react";

// Imports de Lógica
import { useApp } from "../../context/AppContext"; // <--- CONEXIÓN GLOBAL
import { useTRM } from "../../hooks/useTRM";       // <--- HOOK TRM
import { translate as localTranslate } from "./house.config"; // Renombrado para no confundir
import { formatCurrency } from "../../utils/formatters";

// Props esperados (Asegúrate de pasar priceCop y priceUsd desde el padre PropertyDetail)
export default function HouseDetailView({ specs, description, adminFee, priceCop, priceUsd }: any) {
  
  // 1. Hook Global (Idioma y Traductor)
  const { translateDynamic, currency, lang } = useApp();
  
  // 2. Hook TRM
  const trm = useTRM();

  // 3. Helper de Traducción Híbrida
  // Toma el valor técnico (ej: "gas_natural"), lo pasa a español ("Gas Natural") y luego lo traduce si es necesario ("Natural Gas")
  const tr = (key: string) => {
     const spanishLabel = localTranslate(key);
     return translateDynamic(spanishLabel);
  };

  // 4. Lógica de Precios Dinámicos
  const showUsd = currency === "USD";
  const mainPrice = showUsd 
      ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") 
      : `$${formatCurrency(priceCop)}`;
  
  const secondaryPrice = showUsd
      ? `$${formatCurrency(priceCop)} COP`
      : (priceUsd ? `USD $${formatCurrency(priceUsd)}` : null);

  // --- SUB-COMPONENTES UI ---

  const MainStat = ({ label, val, sub, icon: Icon }: any) => (
    <div className="flex flex-col justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-yellow-300 transition-all group h-full">
        <div className="flex justify-between items-start mb-2">
           <div className="p-2 bg-yellow-50 rounded-lg text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
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
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-yellow-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{translateDynamic(label)}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">
            {val ? tr(val) : "N/A"}
        </span>
     </div>
  );

  const LevelCard = ({ lvl, idx }: any) => (
     <div className="flex gap-4 items-start p-3 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
         <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
               {idx + 1}
            </div>
            <div className="w-0.5 h-full bg-gray-200 rounded-full"></div>
         </div>
         <div className="flex-1 pb-2">
            <div className="flex justify-between items-center mb-1">
               <h5 className="font-bold text-gray-800 text-xs uppercase">{translateDynamic(lvl.name)}</h5>
               <div className="flex gap-2 text-[10px] text-gray-500">
                  {lvl.rooms > 0 && <span className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border"><Bed size={10}/> {lvl.rooms}</span>}
                  {lvl.baths > 0 && <span className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded border"><Bath size={10}/> {lvl.baths}</span>}
               </div>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{translateDynamic(lvl.desc)}</p>
         </div>
     </div>
  );

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 font-sans">
       
       {/* SECCIÓN 0: PRECIO Y TRM (NUEVO) */}
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{translateDynamic("Precio de Venta")}</p>
              <div className="flex items-baseline gap-3">
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900">{mainPrice}</h2>
                 {secondaryPrice && <span className="text-sm font-medium text-gray-400">{secondaryPrice}</span>}
              </div>
          </div>
          {/* Indicador TRM */}
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

       {/* SECCIÓN 1: DIMENSIONES Y ESTRUCTURA */}
       <section>
          <div className="flex items-center gap-2 mb-6">
             <Maximize className="text-yellow-500" size={20}/>
             <h3 className="font-black text-sm text-gray-400 uppercase tracking-widest">{translateDynamic("Dimensiones & Estructura")}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MainStat label="Área Lote" val={`${specs.area_lot || 0} m²`} icon={Maximize} sub={`${translateDynamic("Frente")} ${specs.front || 0}m`} />
             <MainStat label="Construida" val={`${specs.area_built || 0} m²`} icon={Home} sub={`${translateDynamic("Fondo")} ${specs.depth || 0}m`} />
             <MainStat label="Antigüedad" val={specs.antiquity} icon={Calendar} />
             <MainStat label="Garajes" val={specs.garages} icon={Car} sub={specs.garage_type} />
          </div>
       </section>

       {/* SECCIÓN 2: GRID PRINCIPAL */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUMNA IZQUIERDA (2/3): Descripción */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Descripción */}
             <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-yellow-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
                <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                   <Layout size={20} className="text-yellow-500"/> {translateDynamic("Descripción de la Propiedad")}
                </h3>
                <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base relative z-10 text-justify">
                   {translateDynamic(description)}
                </p>

                {specs.has_rent && (
                  <div className="mt-8 p-5 bg-blue-50/50 rounded-2xl border border-blue-100 flex gap-4 items-start">
                     <div className="p-3 bg-blue-100 rounded-full text-blue-600"><ShieldCheck size={20}/></div>
                     <div>
                        <h4 className="font-bold text-blue-800 text-sm uppercase mb-1">{translateDynamic("Propiedad con Renta")}</h4>
                        <p className="text-blue-900 font-black text-lg">
                           {formatCurrency(specs.rent_value)} <span className="text-xs font-normal opacity-70">/ {tr(specs.rent_type)}</span>
                        </p>
                        <p className="text-xs text-blue-600 italic mt-1">{translateDynamic(specs.rent_desc)}</p>
                     </div>
                  </div>
                )}
             </div>

             {/* Niveles */}
             {specs.levels_list && specs.levels_list.length > 0 && (
                <div>
                   <h3 className="font-black text-sm text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2 pl-2">
                      <Layers size={16}/> {translateDynamic("Distribución por Niveles")}
                   </h3>
                   <div className="space-y-2">
                      {specs.levels_list.map((lvl: any, idx: number) => <LevelCard key={idx} lvl={lvl} idx={idx} />)}
                   </div>
                </div>
             )}
          </div>

          {/* COLUMNA DERECHA (1/3): Especificaciones */}
          <div className="space-y-6">
             
             {/* TARJETA 1: FICHA TÉCNICA */}
             <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                    <Ruler size={16} className="text-blue-500"/> {translateDynamic("Ficha Técnica")}
                </h3>
                <div className="flex flex-col">
                   <SpecRow label="Habitaciones" val={specs.habs} icon={Bed} />
                   <SpecRow label="Baños Totales" val={specs.baths} icon={Bath} />
                   <SpecRow label="Estrato" val={specs.stratum} icon={Layers} />
                   <SpecRow label="Administración" val={adminFee ? formatCurrency(adminFee) : "N/A"} icon={DollarSign} />
                </div>
             </div>

             {/* TARJETA 2: ACABADOS */}
             <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                    <ChefHat size={16} className="text-yellow-500"/> {translateDynamic("Acabados")}
                </h3>
                <div className="flex flex-col">
                   <SpecRow label="Estilo Cocina" val={specs.kitchen} icon={ChefHat} />
                   <SpecRow label="Tipo de Gas" val={specs.gas_type} icon={Flame} />
                   <SpecRow label="Material Pisos" val={specs.floors} icon={Grid} />
                   <SpecRow label="Zona Comedor" val={specs.dining} icon={Utensils} />
                </div>
             </div>

             {/* Ubicación */}
             <div className="bg-yellow-500 p-6 rounded-3xl text-white shadow-lg shadow-yellow-200">
                <MapPin size={24} className="mb-3 opacity-80"/>
                <h4 className="font-bold text-lg leading-tight mb-2">{translateDynamic("Ubicación Privilegiada")}</h4>
                <p className="text-xs opacity-90 leading-relaxed">
                   {translateDynamic("Esta propiedad cuenta con una excelente ubicación estratégica. Contáctanos para agendar una visita y conocer el punto exacto.")}
                </p>
             </div>
          </div>
       </div>

       {/* SECCIÓN 3: AMENIDADES */}
       {specs.features && specs.features.length > 0 && (
         <section>
            <h3 className="font-black text-sm text-yellow-600 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-yellow-100 pb-2">
               <Armchair size={16}/> {translateDynamic("Comodidades Casa")}
            </h3>
            <div className="flex flex-wrap gap-3">
               {specs.features.map((feat: string) => {
                  // Importante: No usamos HOUSE_ICONS[feat] directo si la key cambia con traducción
                  // Mejor renderizar CheckCircle2 por defecto si no hace match
                  return (
                    <div key={feat} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-600 shadow-sm hover:shadow-md hover:border-yellow-200 transition-all cursor-default">
                       <CheckCircle2 size={16} className="text-yellow-500 shrink-0" /> 
                       <span>{tr(feat)}</span>
                    </div>
                  )
               })}
            </div>
         </section>
       )}

       {/* SECCIÓN 4: CLUB HOUSE */}
       {specs.has_social && specs.social_features && (
          <section className="bg-[#1a1a1a] text-gray-300 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-600/20 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-yellow-500/10 rounded-full blur-[60px] -ml-10 -mb-10 pointer-events-none"></div>

              <div className="relative z-10">
                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-700 pb-4 gap-4">
                    <div>
                       <span className="text-yellow-500 font-bold text-xs uppercase tracking-widest mb-1 block">{translateDynamic("Exteriores")}</span>
                       <h3 className="font-black text-2xl md:text-3xl text-white uppercase tracking-tight">
                          {translateDynamic("Zonas Comunes")} & Club House
                       </h3>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-6 gap-x-4">
                    {specs.social_features.map((feat: string) => (
                          <div key={feat} className="flex items-center gap-3 group">
                             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500 group-hover:bg-yellow-500 group-hover:text-black transition-all">
                                <CheckCircle2 size={14} />
                             </div>
                             <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{tr(feat)}</span>
                          </div>
                    ))}
                 </div>
              </div>
          </section>
       )}

    </div>
  );
}