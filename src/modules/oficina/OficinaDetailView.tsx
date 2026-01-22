import React from "react";
import { 
  Maximize, Building2, Calendar, Car, Layout, ShieldCheck, 
  Layers, DollarSign, Briefcase, CheckCircle2, Bath, ArrowUpFromLine
} from "lucide-react";
import { useApp } from "../../context/AppContext"; 
import { formatCurrency } from "../../utils/formatters";

const SpecRow = ({ label, val, icon: Icon, tr }: any) => (
     <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0 group hover:bg-emerald-50/30 px-2 rounded transition-colors">
        <div className="flex items-center gap-3">
           <div className="text-gray-300 group-hover:text-emerald-500 transition-colors"><Icon size={16}/></div>
           <span className="text-sm font-bold text-gray-600">{label}</span>
        </div>
        <span className="text-sm font-medium text-gray-800 text-right capitalize">
            {val ? val : "N/A"}
        </span>
     </div>
);

export default function OficinaDetailView({ specs, description, adminFee, priceCop, priceUsd }: any) {
  const { translateDynamic, currency } = useApp();
  const tr = (key: string) => translateDynamic(key);

  const showUsd = currency === "USD";
  const mainPrice = showUsd ? (priceUsd ? `USD $${formatCurrency(priceUsd)}` : "USD --") : `$${formatCurrency(priceCop)}`;

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-4 font-sans">
       
       <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{tr("Valor Venta")}</p>
               <h2 className="text-3xl md:text-4xl font-black text-gray-900">{mainPrice}</h2>
           </div>
           {adminFee > 0 && (
               <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                   <p className="text-[10px] font-bold uppercase opacity-70">Administración</p>
                   <p className="font-bold text-lg">{formatCurrency(adminFee)}</p>
               </div>
           )}
       </div>

       {/* KEY STATS */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
               <Maximize className="mx-auto text-emerald-500 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.area || 0}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">m² Privados</p>
           </div>
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
               <ArrowUpFromLine className="mx-auto text-blue-400 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.floor_level || "-"}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">Piso</p>
           </div>
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
               <Car className="mx-auto text-gray-400 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.garages || 0}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">Garajes</p>
           </div>
           <div className="p-4 bg-white border border-gray-100 rounded-2xl text-center">
               <Layers className="mx-auto text-purple-400 mb-2" size={24}/>
               <p className="text-2xl font-black text-gray-800">{specs.stratum || "-"}</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase">Estrato</p>
           </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                 <h3 className="font-black text-xl text-gray-800 mb-4 flex items-center gap-2">
                    <Briefcase size={20} className="text-emerald-500"/> {tr("Descripción")}
                 </h3>
                 <p className="whitespace-pre-line text-gray-600 leading-7 text-sm md:text-base text-justify">
                    {tr(description)}
                 </p>
              </div>

              {/* AMENIDADES (Features + Amenities) */}
              {((specs.features && specs.features.length > 0) || (specs.amenities && specs.amenities.length > 0)) && (
                 <div className="bg-white p-8 rounded-[2rem] border border-gray-100">
                    <h3 className="font-black text-sm text-emerald-600 uppercase tracking-widest mb-5 border-b border-emerald-100 pb-2">
                       Características Corporativas
                    </h3>
                    <div className="flex flex-wrap gap-3">
                       {/* Unimos ambas listas si existen */}
                       {[...(specs.features || []), ...(specs.amenities || [])].map((feat: string) => (
                          <div key={feat} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-gray-600">
                             <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> 
                             <span>{tr(feat)}</span>
                          </div>
                       ))}
                    </div>
                 </div>
              )}
          </div>

          <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                 <h3 className="font-black text-sm text-gray-800 uppercase mb-4 border-b pb-2 flex items-center gap-2">
                     <Building2 size={16} className="text-emerald-500"/> {tr("Ficha Técnica")}
                 </h3>
                 <div className="flex flex-col">
                    <SpecRow label="Antigüedad" val={specs.antiquity} icon={Calendar} tr={tr} />
                    <SpecRow label="Estrato" val={specs.stratum} icon={Layers} tr={tr} />
                    <SpecRow label="Baños" val={specs.bathrooms} icon={Bath} tr={tr} />
                    <SpecRow label="Estado" val={specs.condition} icon={Layout} tr={tr} />
                    <SpecRow label="Vigilancia" val={specs.security_type} icon={ShieldCheck} tr={tr} />
                 </div>
              </div>
          </div>
       </div>
    </div>
  );
}