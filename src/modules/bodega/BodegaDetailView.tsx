import React from "react";
import { 
  Maximize, Warehouse, Truck, Weight, Bolt, Ruler, 
  Container, CheckCircle2, DollarSign, ShoppingBag,
  TrendingUp, RefreshCw, ShieldCheck, Layers, ArrowUpFromLine,
  Briefcase, Utensils, Bath, Car, Factory, Grid, Hash
} from "lucide-react";
import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { formatCurrency } from "../../utils/formatters";
import { translate } from "./bodega.config"; 

// AÑADIDO: 'stratum' en las props
export default function BodegaDetailView({ specs, description, adminFee, priceCop, priceUsd, stratum }: any) {
  const { translateDynamic, currency, lang } = useApp();
  const trm = useTRM();
  const tr = (key: string) => translateDynamic(key);

  const showUsd = currency === "USD";
  const mainPrice = showUsd ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") : `$${formatCurrency(priceCop)}`;
  const secondaryPrice = showUsd ? `$${formatCurrency(priceCop)} COP` : (priceUsd ? `USD $${formatCurrency(priceUsd)}` : null);

  // Helper de UI
  const SpecRow = ({ label, val, icon: Icon }: any) => (
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-amber-50/30 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-amber-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{tr(label)}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">{val ? tr(val) : "N/A"}</span>
     </div>
  );

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 duration-700 font-sans">
       
       {/* SECCIÓN 0: PRECIO */}
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{tr("Valor Venta")}</p>
              <div className="flex items-baseline gap-3">
                 <h2 className="text-3xl md:text-4xl font-black text-gray-900">{mainPrice}</h2>
                 {secondaryPrice && <span className="text-sm font-medium text-gray-400">{secondaryPrice}</span>}
              </div>
          </div>
          {adminFee > 0 && (
             <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl">
                 <p className="text-[10px] font-bold uppercase text-gray-400">Administración</p>
                 <p className="font-bold text-gray-700">{formatCurrency(adminFee)}</p>
             </div>
          )}
       </div>

       {/* SECCIÓN 1: DATOS CLAVE (BENTO GRID) */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {/* Área Lote */}
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
               <Maximize className="mx-auto text-amber-500 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.area_total || 0}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">m² Lote Total</p>
           </div>
           
           {/* Área Libre (Destacada) */}
           <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-center relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 p-1 bg-amber-200 rounded-bl-lg"><Truck size={12} className="text-amber-800"/></div>
               <Container className="mx-auto text-amber-600 mb-2" size={24}/>
               <p className="text-2xl font-black text-amber-900">{specs.area_free || 0}</p>
               <p className="text-[10px] font-bold text-amber-700 uppercase">m² Bodega Libre</p>
           </div>

           {/* Estrato (CONECTADO) */}
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
               <Hash className="mx-auto text-gray-400 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{stratum || "N/A"}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">{tr("Estrato")}</p>
           </div>

           {/* Altura Libre */}
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
               <ArrowUpFromLine className="mx-auto text-gray-400 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.height || 0} m</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">{tr("Altura Libre")}</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUMNA IZQUIERDA (2/3): DESCRIPCIÓN + MÓDULOS */}
          <div className="lg:col-span-2 space-y-8">
              
              {/* Descripción */}
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                 <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2">
                    <Warehouse size={20} className="text-amber-600"/> {tr("Descripción")}
                 </h3>
                 <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base text-justify">
                    {tr(description)}
                 </p>
                 
                 {/* Badge Locales */}
                 {Number(specs.locales_count) > 0 && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-4">
                      <div className="p-3 bg-amber-100 rounded-full text-amber-700"><ShoppingBag size={20}/></div>
                      <div>
                          <p className="text-sm font-bold text-amber-900 uppercase">Incluye Locales Comerciales</p>
                          <p className="text-xs text-amber-700">Cantidad: <strong>{specs.locales_count}</strong> | Renta Estimada: <strong>{formatCurrency(specs.locales_rent_value)}</strong></p>
                      </div>
                  </div>
                 )}
              </div>

              {/* MÓDULO OFICINAS (Si existe) */}
              {specs.has_offices && (
                 <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full"></div>
                    <h3 className="font-black text-sm text-gray-800 uppercase mb-4 flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-500"/> Área Administrativa (Oficinas)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-400 font-bold uppercase mb-1">Área</p>
                          <p className="font-black text-gray-800">{specs.office_area || 0} m²</p>
                       </div>
                       <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-400 font-bold uppercase mb-1">Baños</p>
                          <p className="font-black text-gray-800">{specs.office_bathrooms || 0}</p>
                       </div>
                       <div className="text-center p-3 bg-gray-50 rounded-xl">
                          <p className="text-xs text-gray-400 font-bold uppercase mb-1">Estado</p>
                          <p className="font-black text-gray-800 text-xs">{specs.office_condition || "N/A"}</p>
                       </div>
                       <div className="flex flex-col justify-center gap-1 text-[10px] font-bold text-gray-500">
                          {specs.has_meeting_room && <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-green-500"/> Sala Juntas</span>}
                          {specs.has_structured_cabling && <span className="flex items-center gap-1"><CheckCircle2 size={10} className="text-green-500"/> Cableado</span>}
                       </div>
                    </div>
                 </div>
              )}

              {/* MÓDULO MEZZANINE (Si existe) */}
              {specs.has_mezzanine && (
                 <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                    <h3 className="font-black text-sm text-gray-800 uppercase mb-4 flex items-center gap-2">
                        <Layers size={16} className="text-amber-500"/> Mezzanine de Carga
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                       <div className="text-center">
                          <p className="text-xs text-gray-400 font-bold uppercase">Área</p>
                          <p className="font-black text-gray-800">{specs.mezzanine_area || 0} m²</p>
                       </div>
                       <div className="text-center border-l border-gray-100">
                          <p className="text-xs text-gray-400 font-bold uppercase">Capacidad</p>
                          <p className="font-black text-gray-800">{specs.mezzanine_load || 0} kg/m²</p>
                       </div>
                       <div className="text-center border-l border-gray-100">
                          <p className="text-xs text-gray-400 font-bold uppercase">Material</p>
                          <p className="font-black text-gray-800">{specs.mezzanine_material || "N/A"}</p>
                       </div>
                    </div>
                 </div>
              )}
          </div>

          {/* COLUMNA DERECHA (1/3): ESPECIFICACIONES TÉCNICAS */}
          <div className="space-y-6">
              
              {/* FICHA TÉCNICA PRINCIPAL */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                 <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                     <Bolt size={16} className="text-amber-600"/> {tr("Especificaciones Técnicas")}
                 </h3>
                 <div className="flex flex-col">
                    <SpecRow label="Energía (KVA)" val={specs.energy_kva ? `${specs.energy_kva} KVA` : null} icon={Bolt} />
                    <SpecRow label="Resistencia Piso" val={specs.floor_resistance ? `${specs.floor_resistance} Ton/m²` : null} icon={Weight} />
                    <SpecRow label="Tipo de Piso" val={specs.floor_type} icon={Grid} />
                    <SpecRow label="Niveles Totales" val={specs.levels_qty} icon={Layers} />
                    <SpecRow label="Altura Libre" val={specs.height ? `${specs.height} m` : null} icon={ArrowUpFromLine} />
                    <SpecRow label="Frente x Fondo" val={specs.front && specs.depth ? `${specs.front} x ${specs.depth} m` : null} icon={Ruler} />
                 </div>
              </div>

              {/* LOGÍSTICA Y SERVICIOS */}
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                 <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                     <Truck size={16} className="text-amber-600"/> {tr("Logística & Bienestar")}
                 </h3>
                 <div className="flex flex-col">
                    <SpecRow label="Entradas Camión" val={specs.entry_count} icon={Warehouse} />
                    <SpecRow label="Tipo Portón" val={translate(specs.gate_type)} icon={Container} />
                    <SpecRow label="Acceso Tractomulas" val={specs.has_truck_access ? "Sí" : "No"} icon={Truck} />
                    <SpecRow label="Parqueaderos" val={specs.parking_qty} icon={Car} />
                    <SpecRow label="Baños Operativos" val={specs.bathrooms} icon={Bath} />
                    <SpecRow label="Cocina / Casino" val={translate(specs.kitchen_type)} icon={Utensils} />
                 </div>
              </div>
          </div>
       </div>
       
       {/* SECCIÓN 3: INFRAESTRUCTURA & SEGURIDAD (LISTA COMPLETA) */}
       {specs.features && specs.features.length > 0 && (
         <div className="bg-gray-900 p-8 rounded-3xl text-gray-300 shadow-xl">
            <h3 className="font-black text-sm text-amber-500 uppercase tracking-widest mb-6 flex items-center gap-2">
               <Factory size={16}/> {tr("Infraestructura Industrial & Dotación")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {specs.features.map((feat: string) => (
                  <div key={feat} className="flex items-center gap-2 text-sm font-bold bg-gray-800/50 p-2 rounded-lg border border-gray-700">
                     <CheckCircle2 size={16} className="text-amber-500 shrink-0"/> {tr(feat)}
                  </div>
               ))}
            </div>
         </div>
       )}
    </div>
  );
}