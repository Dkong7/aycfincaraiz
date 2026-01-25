import React from "react";
import { 
  Maximize, Building2, Calendar, Car, Layout, ShieldCheck, 
  ArrowUpFromLine, Bed, Bath, ChefHat, Eye, Grid, 
  MapPin, Armchair, CheckCircle2, Ruler, DollarSign,
  TrendingUp, RefreshCw, Layers
} from "lucide-react";

// Imports de Lógica
import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { translate as localTranslate, APARTMENT_ICONS } from "./apartment.config";
import { formatCurrency } from "../../utils/formatters";

// AÑADIDO: 'stratum' en las props
export default function ApartmentDetailView({ specs, description, adminFee, priceCop, priceUsd, stratum }: any) {
  
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

  // --- SUB-COMPONENTES UI ---

  const MainStat = ({ label, val, sub, icon: Icon }: any) => (
    <div className="flex flex-col justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all group h-full">
        <div className="flex justify-between items-start mb-2">
           <div className="p-2 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
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
           <div className="text-gray-300 group-hover:text-blue-500 transition-colors"><Icon size={16}/></div>
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

       {/* SECCIÓN 1: DATOS CLAVE */}
       <section>
          <div className="flex items-center gap-2 mb-6">
             <Building2 className="text-blue-500" size={20}/>
             <h3 className="font-black text-sm text-gray-400 uppercase tracking-widest">{translateDynamic("Resumen del Inmueble")}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MainStat label="Área Privada" val={`${specs.area_built || 0} m²`} icon={Maximize} />
             <MainStat label="Ubicación" val={`${specs.floor_level || "?"}° Piso`} icon={ArrowUpFromLine} sub={specs.view_type} />
             
             {/* ESTRATO AÑADIDO AQUÍ */}
             <MainStat label="Estrato" val={stratum} icon={Layers} />
             
             <MainStat label="Garajes" val={specs.garages} icon={Car} sub={specs.garage_type} />
          </div>
       </section>

       {/* SECCIÓN 2: GRID PRINCIPAL */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUMNA IZQUIERDA (2/3): Descripción */}
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
                 <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                    <Layout size={20} className="text-blue-500"/> {translateDynamic("Descripción de la Propiedad")}
                 </h3>
                 <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base relative z-10 text-justify">
                    {translateDynamic(description)}
                 </p>

                 {/* Badge Renta */}
                 {specs.has_rent && (
                   <div className="mt-8 p-5 bg-green-50/50 rounded-2xl border border-green-100 flex gap-4 items-start">
                      <div className="p-3 bg-green-100 rounded-full text-green-600"><ShieldCheck size={20}/></div>
                      <div>
                         <h4 className="font-bold text-green-800 text-sm uppercase mb-1">{translateDynamic("Propiedad con Renta")}</h4>
                         <p className="text-green-900 font-black text-lg">
                            {formatCurrency(specs.rent_value)} <span className="text-xs font-normal opacity-70">/ {tr(specs.rent_type)}</span>
                         </p>
                         <p className="text-xs text-green-700 italic mt-1">{translateDynamic(specs.rent_desc)}</p>
                      </div>
                   </div>
                 )}
              </div>
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
                    <SpecRow label="Baños" val={specs.baths} icon={Bath} />
                    
                    {/* ESTRATO AÑADIDO AQUÍ TAMBIÉN */}
                    <SpecRow label="Estrato" val={stratum} icon={Layers} />
                    
                    <SpecRow label="Administración" val={adminFee ? formatCurrency(adminFee) : "No aplica"} icon={DollarSign} />
                    <SpecRow label="Antigüedad" val={specs.antiquity} icon={Calendar} />
                 </div>
              </div>

              {/* TARJETA 2: ACABADOS */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                 <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                     <ChefHat size={16} className="text-blue-500"/> {translateDynamic("Acabados")}
                 </h3>
                 <div className="flex flex-col">
                    <SpecRow label="Estilo Cocina" val={specs.kitchen} icon={ChefHat} />
                    <SpecRow label="Material Pisos" val={specs.floors} icon={Grid} />
                    <SpecRow label="Vista" val={specs.view_type} icon={Eye} />
                 </div>
              </div>
          </div>
       </div>

       {/* SECCIÓN 3: AMENIDADES (TAGS) */}
       {specs.features && specs.features.length > 0 && (
          <section>
             <h3 className="font-black text-sm text-blue-600 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-blue-100 pb-2">
                <Armchair size={16}/> {translateDynamic("Comodidades & Zonas Comunes")}
             </h3>
             <div className="flex flex-wrap gap-3">
                {specs.features.map((feat: string) => {
                   const Icon = APARTMENT_ICONS[feat] || CheckCircle2;
                   return (
                     <div key={feat} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-600 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default">
                        <Icon size={16} className="text-blue-500 shrink-0" /> 
                        <span>{tr(feat)}</span>
                     </div>
                   )
                })}
             </div>
          </section>
       )}

       {/* SECCIÓN 4: CLUB HOUSE (Si aplica) */}
       {specs.has_club_house && (
          <section className="bg-[#1e3a8a] text-blue-100 p-8 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <h3 className="font-black text-lg text-white uppercase tracking-widest mb-6 relative z-10">
                  {translateDynamic("Club House & Zonas Comunes")}
              </h3>
              <p className="relative z-10 text-sm opacity-80 italic">
                  {translateDynamic("Este conjunto cuenta con amenidades tipo Club House para el disfrute de toda la familia.")}
              </p>
          </section>
       )}

    </div>
  );
}