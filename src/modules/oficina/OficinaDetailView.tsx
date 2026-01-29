import React from "react";
import { 
  Maximize, Building2, Calendar, Car, Layout, 
  ArrowUpFromLine, Briefcase, Bath, Network, 
  CheckCircle2, DollarSign, Layers, 
  Zap, Ruler, MapPin, TrendingUp, RefreshCw
} from "lucide-react";

import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { formatCurrency } from "../../utils/formatters";
import { translate as localTranslate } from "./oficina.config";

// Props: Incluye 'stratum', 'adminFee', 'neighborhood', 'municipality'
export default function OficinaDetailView({ specs, description, adminFee, priceCop, priceUsd, stratum, neighborhood, municipality }: any) {
  
  const { translateDynamic, currency, lang } = useApp();
  const trm = useTRM();
  const tr = (key: string) => translateDynamic(localTranslate(key));

  // Lógica de Precios
  const showUsd = currency === "USD";
  const mainPrice = showUsd 
      ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") 
      : `$${formatCurrency(priceCop)}`;
  
  const secondaryPrice = showUsd
      ? `$${formatCurrency(priceCop)} COP`
      : (priceUsd ? `USD $${formatCurrency(priceUsd)}` : null);

  // --- MAPA ÚNICO (CORREGIDO) ---
  const locCity = municipality || "Bogotá";
  const locHood = neighborhood || "";
  const query = `${locHood}, ${locCity}, Colombia`;
  const encodedQuery = encodeURIComponent(query);
  const mapUrl = `https://maps.google.com/maps?q=${encodedQuery}&t=m&z=15&output=embed`;

  // --- ADMIN FEE ROBUSTO ---
  const rawAdmin = adminFee || specs?.admin_fee || "0";
  const cleanAdmin = Number(String(rawAdmin).replace(/\D/g, ""));
  const hasAdmin = cleanAdmin > 0;

  // --- SUB-COMPONENTES UI (Tema Emerald/Verde Corporativo) ---

  const MainStat = ({ label, val, sub, icon: Icon }: any) => (
    <div className="flex flex-col justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-300 transition-all group h-full">
        <div className="flex justify-between items-start mb-2">
           <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
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
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-emerald-50/30 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-emerald-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{tr(label)}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">
            {val ? (isCurrency ? val : tr(val)) : "N/A"}
        </span>
     </div>
  );

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 font-sans">
       
       {/* SECCIÓN 0: PRECIO Y ADMINISTRACIÓN */}
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{tr("Valor Venta")}</p>
              <div className="flex items-baseline gap-3">
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900">{mainPrice}</h2>
                 {secondaryPrice && <span className="text-sm font-medium text-gray-400">{secondaryPrice}</span>}
              </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
              {/* TRM */}
              <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                  <div className={`p-2 rounded-full ${trm > 0 ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-400"}`}>
                      {trm > 0 ? <TrendingUp size={18}/> : <RefreshCw size={18} className="animate-spin"/>}
                  </div>
                  <div>
                      <p className="text-[10px] uppercase font-bold text-gray-400">TRM {lang === "EN" ? "Rate" : "Hoy"}</p>
                      <p className="font-bold text-gray-700">{trm > 0 ? `$${formatCurrency(Math.round(trm))} COP` : "Cargando..."}</p>
                  </div>
              </div>

              {/* Badge de Administración */}
              {hasAdmin && (
                  <div className="px-4 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-right w-full">
                      <p className="text-[9px] font-bold uppercase text-emerald-600">Admin: <span className="text-emerald-800 text-sm ml-1">${formatCurrency(cleanAdmin)}</span></p>
                  </div>
              )}
          </div>
       </div>

       {/* SECCIÓN 1: DATOS CLAVE */}
       <section>
          <div className="flex items-center gap-2 mb-6">
             <Building2 className="text-emerald-500" size={20}/>
             <h3 className="font-black text-sm text-gray-400 uppercase tracking-widest">{translateDynamic("Resumen Corporativo")}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MainStat label="Área Privada" val={`${specs.area || 0} m²`} icon={Maximize} />
             <MainStat label="Ubicación" val={`${specs.floor_level || "?"}° Piso`} icon={ArrowUpFromLine} />
             <MainStat label="Estrato" val={stratum} icon={Layers} />
             <MainStat label="Garajes Privados" val={specs.garages} icon={Car} />
          </div>
       </section>

       {/* SECCIÓN 2: GRID PRINCIPAL */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUMNA IZQUIERDA (2/3): DESCRIPCIÓN + INFRAESTRUCTURA */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Descripción */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-emerald-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
                 <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                    <Briefcase size={20} className="text-emerald-500"/> {translateDynamic("Descripción de la Oficina")}
                 </h3>
                 <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base relative z-10 text-justify">
                    {translateDynamic(description)}
                 </p>
              </div>

              {/* LISTA: INFRAESTRUCTURA TÉCNICA */}
              {specs.features && specs.features.length > 0 && (
                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                    <h3 className="font-black text-sm text-emerald-700 uppercase mb-4 flex items-center gap-2">
                        <Network size={16}/> {tr("Infraestructura Técnica")}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                       {specs.features.map((feat: string) => (
                          <div key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                             <CheckCircle2 size={14} className="text-emerald-500 shrink-0"/> 
                             {tr(feat)}
                          </div>
                       ))}
                    </div>
                 </div>
              )}

              {/* LISTA: AMENIDADES EDIFICIO */}
              {specs.amenities && specs.amenities.length > 0 && (
                 <div className="bg-emerald-900 p-6 rounded-3xl text-emerald-50 shadow-lg">
                    <h3 className="font-black text-sm text-emerald-300 uppercase mb-4 flex items-center gap-2">
                        <Building2 size={16}/> {tr("Amenidades del Edificio (PH)")}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                       {specs.amenities.map((item: string) => (
                          <div key={item} className="flex items-center gap-2 text-sm font-medium">
                             <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div> 
                             {tr(item)}
                          </div>
                       ))}
                    </div>
                 </div>
              )}
          </div>

          {/* COLUMNA DERECHA (1/3): FICHA TÉCNICA */}
          <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                 <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                     <Ruler size={16} className="text-emerald-500"/> {translateDynamic("Ficha Técnica")}
                 </h3>
                 <div className="flex flex-col">
                    <SpecRow label="Estado Entrega" val={specs.condition} icon={Briefcase} />
                    <SpecRow label="Antigüedad" val={specs.antiquity} icon={Calendar} />
                    
                    {/* DETALLE DE BAÑOS */}
                    <SpecRow label="Tipo de Baños" val={specs.bathrooms_type} icon={Bath} />
                    <SpecRow label="Baños Internos" val={specs.bathrooms} icon={Bath} />
                    
                    {/* ASCENSORES */}
                    {(Number(specs.elevators_public) > 0 || Number(specs.elevators_service) > 0) && (
                        <div className="py-2 border-b border-gray-100">
                            <div className="flex items-center gap-3 mb-1">
                                <div className="text-gray-300"><ArrowUpFromLine size={16}/></div>
                                <span className="text-sm font-bold text-gray-600">{tr("Ascensores")}</span>
                            </div>
                            <div className="pl-7 text-xs text-gray-500 flex flex-col">
                                {Number(specs.elevators_public) > 0 && <span>• {specs.elevators_public} Públicos / Inteligentes</span>}
                                {Number(specs.elevators_service) > 0 && <span>• {specs.elevators_service} de Carga / Servicio</span>}
                            </div>
                        </div>
                    )}

                    <SpecRow label="Estrato" val={stratum} icon={Layers} />
                    <SpecRow label="Garajes" val={specs.garages} icon={Car} />
                 </div>
              </div>

              {/* MAPA ÚNICO (Solo si hay municipio) */}
              {(municipality) && (
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                      <div className="flex items-center gap-2 mb-4">
                          <MapPin className="text-emerald-600" size={20}/>
                          <h3 className="font-black text-sm text-emerald-800 uppercase tracking-widest">{translateDynamic("Ubicación Corporativa")}</h3>
                      </div>
                      <div className="w-full h-64 rounded-2xl overflow-hidden bg-white relative shadow-sm border border-emerald-200">
                          <iframe 
                              width="100%" 
                              height="100%" 
                              style={{border:0}} 
                              loading="lazy" 
                              src={mapUrl} 
                              title="Mapa Oficina"
                          ></iframe>
                      </div>
                  </div>
              )}
          </div>
       </div>

    </div>
  );
}