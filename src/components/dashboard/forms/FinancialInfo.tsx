import React, { useState } from "react";
import { DollarSign } from "lucide-react";

const CURRENT_TRM = 3790; // TRM Fija Enero 2026

const formatCurrency = (val: string | number) => {
  if (!val) return "";
  return String(val).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const parseCurrency = (val: string) => {
  return Number(val.replace(/\./g, ""));
};

export default function FinancialInfo({ register, setValue, s }: any) {
  const [displayCOP, setDisplayCOP] = useState("");
  const [displayUSD, setDisplayUSD] = useState("");

  const handlePriceChange = (e: any) => {
     const rawValue = e.target.value.replace(/\./g, "");
     setDisplayCOP(formatCurrency(rawValue));
     
     // Guardar valor limpio en el form (oculto al usuario, visible para la DB)
     setValue("price_cop", rawValue);

     // Auto Calc USD
     if (rawValue && !isNaN(rawValue)) {
        const usd = Math.round(Number(rawValue) / CURRENT_TRM);
        setDisplayUSD(formatCurrency(usd));
        setValue("price_usd", String(usd));
     } else {
        setDisplayUSD("");
        setValue("price_usd", "0");
     }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 animate-in fade-in">
       {/* Precio COP */}
       <div className="w-full">
          <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Precio COP</label>
          <div className="relative group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
             <input 
               type="text" 
               value={displayCOP} 
               onChange={handlePriceChange}
               placeholder="0" 
               className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white font-mono" 
             />
          </div>
       </div>

       {/* Precio USD (Auto) */}
       <div className="w-full">
          <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">US (Auto)</label>
          <div className="relative group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
             <input 
               type="text" 
               value={displayUSD} 
               readOnly 
               className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white font-mono opacity-60 cursor-not-allowed" 
             />
          </div>
          <span className="text-[9px] text-green-400 block mt-1 ml-1 opacity-50">TRM Ref: ${formatCurrency(CURRENT_TRM)}</span>
       </div>

       {/* Avalúo */}
       <div className="w-full">
          <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Avalúo</label>
          <div className="relative group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
             <input {...register("specs.avaluo")} type="number" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white" />
          </div>
       </div>

       {/* Admon */}
       <div className="w-full">
          <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Admon</label>
          <div className="relative group">
             <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
             <input {...register("specs.admin")} type="number" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white" />
          </div>
       </div>
    </div>
  );
}