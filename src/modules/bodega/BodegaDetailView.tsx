import React from "react";
import { 
  Maximize, Warehouse, Truck, Weight, Bolt, Ruler, 
  Container, Home, CheckCircle2, DollarSign, ShoppingBag,
  TrendingUp, RefreshCw, ShieldCheck
} from "lucide-react";
import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { formatCurrency } from "../../utils/formatters";

export default function BodegaDetailView({ specs, description, adminFee, priceCop, priceUsd }: any) {
  const { translateDynamic, currency, lang } = useApp();
  const trm = useTRM();
  const tr = (key: string) => translateDynamic(key);

  const showUsd = currency === "USD";
  const mainPrice = showUsd ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") : `$${formatCurrency(priceCop)}`;
  const secondaryPrice = showUsd ? `$${formatCurrency(priceCop)} COP` : (priceUsd ? `USD $${formatCurrency(priceUsd)}` : null);

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
       
       {/* PRECIO */}
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

       {/* ÁREAS */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
               <Maximize className="mx-auto text-amber-500 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.area_lot || 0}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">m² Lote</p>
           </div>
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
               <Warehouse className="mx-auto text-blue-500 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.area_built || 0}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">m² Construidos</p>
           </div>
           
           <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl text-center relative overflow-hidden shadow-sm">
               <div className="absolute top-0 right-0 p-1 bg-amber-200 rounded-bl-lg"><Truck size={12} className="text-amber-800"/></div>
               <Container className="mx-auto text-amber-600 mb-2" size={24}/>
               <p className="text-2xl font-black text-amber-900">{specs.area_free || 0}</p>
               <p className="text-[10px] font-bold text-amber-700 uppercase">m² Bodega Libre</p>
           </div>

           <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-center">
               <Home className="mx-auto text-gray-400 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.area_office || 0}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">m² Oficinas</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                 <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2">
                    <Warehouse size={20} className="text-amber-600"/> {tr("Descripción")}
                 </h3>
                 <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base text-justify">
                    {tr(description)}
                 </p>
                 {/* LOCALES COMERCIALES */}
                 {specs.locales_count > 0 && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-4">
                      <div className="p-3 bg-amber-100 rounded-full text-amber-700"><ShoppingBag size={20}/></div>
                      <div>
                          <p className="text-sm font-bold text-amber-900 uppercase">Incluye Locales Comerciales</p>
                          <p className="text-xs text-amber-700">Cantidad: <strong>{specs.locales_count}</strong> | Renta Estimada: <strong>{formatCurrency(specs.locales_rent_value)}</strong></p>
                      </div>
                  </div>
                 )}
              </div>
          </div>

          <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                 <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                     <Bolt size={16} className="text-amber-600"/> {tr("Ficha Técnica")}
                 </h3>
                 <div className="flex flex-col">
                    <SpecRow label="Altura Libre" val={specs.height ? `${specs.height} m` : null} icon={Ruler} />
                    <SpecRow label="Energía" val={specs.energy_kva ? `${specs.energy_kva} KVA` : null} icon={Bolt} />
                    <SpecRow label="Resistencia Piso" val={specs.floor_resistance ? `${specs.floor_resistance} Ton/m²` : null} icon={Weight} />
                    <SpecRow label="Entradas" val={specs.entry_count} icon={Warehouse} />
                    <SpecRow label="Muelle" val={specs.dock_type} icon={Truck} />
                 </div>
              </div>
          </div>
       </div>
       
       {specs.industrial_features && specs.industrial_features.length > 0 && (
         <div className="bg-gray-900 p-8 rounded-3xl text-gray-300">
            <h3 className="font-black text-sm text-amber-500 uppercase tracking-widest mb-6 flex items-center gap-2">
               <ShieldCheck size={16}/> {tr("Seguridad Industrial")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {specs.industrial_features.map((feat: string) => (
                  <div key={feat} className="flex items-center gap-2 text-sm font-bold">
                     <CheckCircle2 size={14} className="text-amber-500"/> {tr(feat)}
                  </div>
               ))}
            </div>
         </div>
       )}
    </div>
  );
}