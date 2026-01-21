import React from "react";
import { 
  Store, ShoppingBag, Flame, Layers, Maximize, 
  MapPin, Utensils, Zap, Truck, Car, Wind, Eye,
  DollarSign, TrendingUp, RefreshCw, Star
} from "lucide-react";
import { useApp } from "../../context/AppContext"; 
import { useTRM } from "../../hooks/useTRM";       
import { translate as localTranslate, LOCAL_ICONS } from "./local.config";
import { formatCurrency } from "../../utils/formatters";

export default function LocalDetailView({ specs, description, adminFee, priceCop, priceUsd }: any) {
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

  const MainStat = ({ label, val, icon: Icon }: any) => (
    <div className="flex flex-col justify-between p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-pink-300 transition-all group h-full">
        <div className="flex justify-between items-start mb-2">
           <div className="p-2 bg-pink-50 rounded-lg text-pink-600 group-hover:bg-pink-500 group-hover:text-white transition-colors">
              <Icon size={20} strokeWidth={2} />
           </div>
        </div>
        <div>
           <p className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">{tr(val)}</p>
           <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">{translateDynamic(label)}</p>
        </div>
    </div>
  );

  const SpecRow = ({ label, val, icon: Icon }: any) => (
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-pink-50/30 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-pink-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{translateDynamic(label)}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">
            {val ? tr(val) : "N/A"}
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
             <Store className="text-pink-600" size={20}/>
             <h3 className="font-black text-sm text-gray-400 uppercase tracking-widest">{translateDynamic("Ficha Comercial")}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <MainStat label="Área Total" val={`${specs.area_total || 0} m²`} icon={Maximize} />
             <MainStat label="Ubicación" val={specs.location_type} icon={MapPin} />
             <MainStat label="Vitrina" val={`${specs.front || 0} m`} icon={Eye} />
             <MainStat label="Baños" val={specs.bathrooms} icon={Utensils} />
          </div>
       </section>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-pink-100 to-transparent rounded-full opacity-50 blur-2xl"></div>
                <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2 relative z-10">
                   <ShoppingBag size={20} className="text-pink-600"/> {translateDynamic("Descripción del Local")}
                </h3>
                <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base relative z-10 text-justify">
                   {translateDynamic(description)}
                </p>
             </div>
          </div>

          <div className="space-y-6">
             <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                    <Star size={16} className="text-pink-600"/> {translateDynamic("Detalles Técnicos")}
                </h3>
                <div className="flex flex-col">
                   <SpecRow label="Estrato" val={specs.stratum} icon={Layers} />
                   <SpecRow label="Pisos" val={specs.floors} icon={Layers} />
                   <SpecRow label="Gas" val={specs.gas_type} icon={Flame} />
                   <SpecRow label="Administración" val={adminFee ? formatCurrency(adminFee) : "N/A"} icon={DollarSign} />
                </div>
             </div>
          </div>
       </div>

       {specs.features && specs.features.length > 0 && (
         <section>
            <h3 className="font-black text-sm text-pink-600 uppercase tracking-widest mb-5 flex items-center gap-2 border-b border-pink-100 pb-2">
               <Zap size={16}/> {translateDynamic("Equipamiento & Adecuaciones")}
            </h3>
            <div className="flex flex-wrap gap-3">
               {specs.features.map((feat: string) => {
                  const Icon = LOCAL_ICONS[feat] || Star;
                  return (
                    <div key={feat} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-bold text-gray-600 shadow-sm hover:shadow-md hover:border-pink-200 transition-all cursor-default border-l-4 border-l-pink-500">
                       <Icon size={16} className="text-pink-600 shrink-0" /> 
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