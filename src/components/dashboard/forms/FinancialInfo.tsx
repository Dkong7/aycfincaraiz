import React, { useState, useEffect } from "react";
import { DollarSign, RefreshCw, TrendingUp } from "lucide-react";
// No hace falta poner la extensión .ts al importar
import { useTRM } from "../../../hooks/useTRM";
const formatCurrency = (val: string | number) => {
  if (!val) return "";
  return String(val).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function FinancialInfo({ register, setValue, watch, s }: any) {
  // 1. Obtener TRM en tiempo real
  const trm = useTRM(); 
  
  // 2. Estado local visual
  const [displayCOP, setDisplayCOP] = useState("");
  const [displayUSD, setDisplayUSD] = useState("");

  // Observar valores del formulario (para edición)
  const watchedCop = watch("price_cop");

  // EFECTO: Sincronizar visualmente cuando llega la data inicial o cambia la TRM
  useEffect(() => {
    if (watchedCop) {
      const cleanVal = String(watchedCop).replace(/\./g, "");
      setDisplayCOP(formatCurrency(cleanVal));
      
      // Calcular USD si tenemos TRM
      if (trm > 0) {
        const usd = Math.round(Number(cleanVal) / trm);
        setDisplayUSD(formatCurrency(usd));
        setValue("price_usd", String(usd)); // Guardar en DB
      }
    }
  }, [watchedCop, trm, setValue]);

  // MANEJADOR MANUAL
  const handlePriceChange = (e: any) => {
      const rawValue = e.target.value.replace(/\./g, "");
      setDisplayCOP(formatCurrency(rawValue));
      
      // Guardar valor limpio en el form (DB)
      setValue("price_cop", rawValue);

      // Calcular USD inmediatamente
      if (rawValue && !isNaN(Number(rawValue)) && trm > 0) {
        const usd = Math.round(Number(rawValue) / trm);
        setDisplayUSD(formatCurrency(usd));
        setValue("price_usd", String(usd));
      } else {
        setDisplayUSD("0");
        setValue("price_usd", "0");
      }
  };

  return (
    <div className="animate-in fade-in space-y-4">
       
       {/* HEADER: Indicador de TRM */}
       <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-green-300/70 border-b border-green-800/50 pb-2">
          <span className="flex items-center gap-2"><DollarSign size={12}/> Información Financiera</span>
          <div className="flex items-center gap-2 bg-green-900/50 px-2 py-1 rounded">
             {trm > 0 ? (
               <>
                 <TrendingUp size={12} className="text-green-400"/>
                 <span>TRM HOY: ${formatCurrency(Math.round(trm))}</span>
               </>
             ) : (
               <>
                 <RefreshCw size={12} className="animate-spin text-green-400"/>
                 <span>Cargando TRM...</span>
               </>
             )}
          </div>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          
          {/* Precio COP (Input Maestro) */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Precio Venta (COP)</label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input 
                  type="text" 
                  value={displayCOP} 
                  onChange={handlePriceChange}
                  placeholder="0" 
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white font-mono placeholder-green-800/50 focus:border-green-400 focus:ring-1 focus:ring-green-400" 
                />
             </div>
          </div>

          {/* Precio USD (Automático) */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300 flex justify-between">
                <span>Precio USD</span>
                <span className="text-[8px] bg-green-800 px-1 rounded text-white">AUTO</span>
             </label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input 
                  type="text" 
                  value={displayUSD} 
                  readOnly 
                  placeholder="0"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#064e3b] border-green-800 text-green-100 font-mono opacity-80 cursor-not-allowed select-none" 
                />
             </div>
          </div>

          {/* Avalúo */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Avalúo Catastral</label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input 
                  {...register("specs.avaluo")} 
                  type="number" 
                  placeholder="Opcional"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white placeholder-green-800/50 focus:border-green-400" 
                />
             </div>
          </div>

          {/* Administración */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Valor Administración</label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input 
                  {...register("admin_fee")} // Corregido: admin_fee suele estar en la raiz, no en specs
                  type="number" 
                  placeholder="0"
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white placeholder-green-800/50 focus:border-green-400" 
                />
             </div>
          </div>

       </div>
    </div>
  );
}