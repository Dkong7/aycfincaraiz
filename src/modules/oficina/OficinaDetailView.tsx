import React from "react";
import { 
  Maximize, Building2, Calendar, Car, Layout, 
  ArrowUpFromLine, Briefcase, Bath, Network, 
  Users, CheckCircle2, DollarSign, Layers, 
  Zap, Lock, Ruler
} from "lucide-react";

import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { formatCurrency } from "../../utils/formatters";

// Props: Incluye 'stratum' y 'adminFee'
export default function OficinaDetailView({ specs, description, adminFee, priceCop, priceUsd, stratum }: any) {
  
  const { translateDynamic, currency } = useApp();
  const trm = useTRM();
  const tr = (key: string) => translateDynamic(key);

  // Lógica de Precios
  const showUsd = currency === "USD";
  const mainPrice = showUsd 
      ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") 
      : `$${formatCurrency(priceCop)}`;
  
  const secondaryPrice = showUsd
      ? `$${formatCurrency(priceCop)} COP`
      : (priceUsd ? `USD $${formatCurrency(priceUsd)}` : null);

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

  const SpecRow = ({ label, val, icon: Icon }: any) => (
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-emerald-50/30 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-emerald-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{tr(label)}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">
            {val ? tr(val) : "N/A"}
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
          
          {/* Badge de Administración (Crucial en Oficinas) */}
          <div className="flex flex-col items-end">
              {Number(adminFee) > 0 ? (
                  <div className="px-5 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-right">
                      <p className="text-[10px] font-bold uppercase text-emerald-600">Cuota de Administración</p>
                      <p className="font-black text-emerald-800 text-lg">{formatCurrency(adminFee)}</p>
                  </div>
              ) : (
                  <span className="text-xs text-gray-400 italic">Administración no definida</span>
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
             
             {/* ESTRATO CONECTADO */}
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
                    
                    {/* DETALLE DE BAÑOS */}
                    <SpecRow label="Tipo de Baños" val={specs.bathrooms_type} icon={Bath} />
                    <SpecRow label="Baños Internos" val={specs.bathrooms} icon={Bath} />
                    
                    {/* ASCENSORES (NUEVO) */}
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

              {/* BARRA DE VALOR AGREGADO */}
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 text-center">
                 <Zap size={24} className="mx-auto text-emerald-500 mb-2"/>
                 <h4 className="font-bold text-emerald-800 text-sm mb-1">{tr("Eficiencia & Conectividad")}</h4>
                 <p className="text-xs text-emerald-600 leading-relaxed">
                    {tr("Espacios diseñados para potenciar la productividad de tu equipo con estándares corporativos.")}
                 </p>
              </div>
          </div>
       </div>

    </div>
  );
}