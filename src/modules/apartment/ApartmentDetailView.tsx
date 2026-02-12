import React from "react";
import { 
  Maximize, Building2, Calendar, Car, Layout, ShieldCheck, 
  ArrowUpFromLine, Bed, Bath, ChefHat, Eye, Grid, 
  Armchair, CheckCircle2, Ruler, DollarSign,
  TrendingUp, RefreshCw, Layers, MapPin
} from "lucide-react";

import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { translate as localTranslate, APARTMENT_ICONS } from "./apartment.config";
import { formatCurrency } from "../../utils/formatters";

export default function ApartmentDetailView({ 
    specs, description, adminFee, priceCop, priceUsd, stratum, 
    neighborhood, municipality 
}: any) {
  
  const { translateDynamic, currency, lang } = useApp();
  const trm = useTRM();

  const tr = (key: string) => translateDynamic(localTranslate(key));

  const showUsd = currency === "USD";
  const mainPrice = showUsd 
      ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") 
      : `$${formatCurrency(priceCop)}`;
  
  const secondaryPrice = showUsd
      ? `$${formatCurrency(priceCop)} COP`
      : (priceUsd ? `USD $${formatCurrency(priceUsd)}` : null);

  // --- FIX: Unificar todas las amenidades ---
  const allFeatures = [
      ...(Array.isArray(specs.features) ? specs.features : []),
      ...(Array.isArray(specs.social) ? specs.social : []), // Importante: 'social' es Club House
      ...(Array.isArray(specs.club_features) ? specs.club_features : []) // Legacy support
  ];
  // Filtrar duplicados y vacíos
  const uniqueFeatures = [...new Set(allFeatures)].filter(Boolean);

  // --- MAPA ÚNICO ---
  const locCity = municipality || "Bogotá";
  const locHood = neighborhood || "";
  const query = `${locHood}, ${locCity}, Colombia`;
  const encodedQuery = encodeURIComponent(query);
  
  // Usamos HTTPS para evitar mixed content
  const mapUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=m&z=15&output=embed`;

  // --- ADMIN FEE ROBUSTO ---
  const rawAdmin = adminFee || specs?.admin_fee || "0";
  const cleanAdmin = Number(String(rawAdmin).replace(/\D/g, ""));
  const hasAdmin = cleanAdmin > 0;

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

  const SpecRow = ({ label, val, icon: Icon, isCurrency = false }: any) => (
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-gray-50/50 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-blue-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{translateDynamic(label)}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">
            {val ? (isCurrency ? val : tr(val)) : "N/A"}
        </span>
     </div>
  );

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 font-sans">
       
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

       <section>
          <div className="flex items-center gap-2 mb-6">
             <Building2 className="text-blue-500" size={20}/>
             <h3 className="font-black text-sm text-gray-400 uppercase tracking-widest">{translateDynamic("Resumen del Inmueble")}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MainStat label="Área Privada" val={`${specs.area_built || 0} m²`} icon={Maximize} />
             <MainStat label="Ubicación" val={`${specs.floor_level || "?"}° Piso`} icon={ArrowUpFromLine} sub={specs.view_type} />
             <MainStat label="Estrato" val={stratum} icon={Layers} />
             <MainStat label="Garajes" val={specs.garages} icon={Car} sub={specs.garage_type} />
          </div>
       </section>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
                 <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                    <Layout size={20} className="text-blue-500"/> {translateDynamic("Descripción de la Propiedad")}
                 </h3>
                 <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base relative z-10 text-justify">
                    {translateDynamic(description)}
                 </p>
                 
                 {specs.has_rent && (
                   <div className="mt-8 p-5 bg-green-50/50 rounded-2xl border border-green-100 flex gap-4 items-start">
                      <div className="p-3 bg-green-100 rounded-full text-green-600"><ShieldCheck size={20}/></div>
                      <div>
                         <h4 className="font-bold text-green-800 text-sm uppercase mb-1">{translateDynamic("Propiedad con Renta")}</h4>
                         <p className="text-green-900 font-black text-lg">
                            {formatCurrency(specs.rent_value)} <span className="text-xs font-normal opacity-70">/ {tr(specs.rent_type)}</span>
                         </p>
                      </div>
                   </div>
                 )}
              </div>
          </div>

          <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                 <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                     <Ruler size={16} className="text-blue-500"/> {translateDynamic("Ficha Técnica")}
                 </h3>
                 <div className="flex flex-col">
                    <SpecRow label="Habitaciones" val={specs.habs || specs.rooms} icon={Bed} />
                    <SpecRow label="Baños" val={specs.baths || specs.bathrooms} icon={Bath} />
                    <SpecRow label="Estrato" val={stratum} icon={Layers} />
                    {/* ADMINISTRACIÓN CORREGIDA */}
                    <SpecRow 
                        label="Administración" 
                        val={hasAdmin ? `$${formatCurrency(cleanAdmin)}` : "No aplica"} 
                        icon={DollarSign} 
                        isCurrency={true} 
                    />
                    <SpecRow label="Antigüedad" val={specs.antiquity} icon={Calendar} />
                 </div>
              </div>

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

       {/* COMODIDADES (AMENIDADES UNIFICADAS) */}
       {uniqueFeatures.length > 0 && (
          <section>
              <h3 className="font-black text-sm text-blue-600 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-blue-100 pb-2">
                 <Armchair size={16}/> {translateDynamic("Comodidades & Zonas Comunes")}
              </h3>
              <div className="flex flex-wrap gap-3">
                 {uniqueFeatures.map((feat: string, i: number) => {
                    const Icon = APARTMENT_ICONS[feat] || CheckCircle2;
                    return (
                      <div key={`${feat}-${i}`} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-600 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-default">
                         <Icon size={16} className="text-blue-500 shrink-0" /> 
                         <span>{tr(feat)}</span>
                      </div>
                    )
                 })}
              </div>
          </section>
       )}

       {/* MAPA */}
       {(municipality) && (
           <section className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 mb-4">
                   <MapPin className="text-blue-500" size={20}/>
                   <h3 className="font-black text-sm text-gray-800 uppercase tracking-widest">{translateDynamic("Ubicación y Entorno")}</h3>
               </div>
               
               <div className="w-full h-96 rounded-2xl overflow-hidden bg-gray-100 relative shadow-sm border border-gray-200">
                   <iframe 
                       width="100%" 
                       height="100%" 
                       style={{border:0}} 
                       loading="lazy" 
                       src={mapUrl} 
                       title="Ubicación General"
                   ></iframe>
                   
                   <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl border border-gray-200 shadow-lg text-xs text-gray-600 flex items-start gap-2">
                       <ShieldCheck size={16} className="text-green-600 shrink-0 mt-0.5" />
                       <p>
                           <strong>{translateDynamic("Ubicación Aproximada")}:</strong> {translateDynamic("El mapa muestra la zona aproximada del")} 
                           <span className="font-bold mx-1">{locHood}, {locCity}</span>
                           {translateDynamic("para proteger la privacidad.")}
                       </p>
                   </div>
               </div>
           </section>
       )}
    </div>
  );
}