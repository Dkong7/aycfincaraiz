import React, { useState, useEffect } from "react";
import { DollarSign, RefreshCw, TrendingUp } from "lucide-react";
import { useTRM } from "../../../hooks/useTRM";

// Helper: 1000000 -> 1.000.000
const formatCurrency = (val: string | number) => {
  if (!val) return "";
  return String(val).replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export default function FinancialInfo({ register, setValue, watch, s }: any) {
  const trm = useTRM(); 
  
  // Estados Visuales (con puntos)
  const [displayCOP, setDisplayCOP] = useState("");
  const [displayUSD, setDisplayUSD] = useState("");
  const [displayAvaluo, setDisplayAvaluo] = useState("");
  const [displayAdmin, setDisplayAdmin] = useState("");

  // Observamos los valores REALES de la DB (sin puntos)
  const watchedCop = watch("price_cop");
  const watchedAvaluo = watch("specs.avaluo");
  const watchedAdmin = watch("admin_fee"); 

  // 1. REGISTRO MANUAL DE CAMPOS (Incluyendo admin_fee)
  useEffect(() => {
    register("price_cop");
    register("price_usd");
    register("specs.avaluo");
    register("admin_fee", { valueAsNumber: true }); // Forzar número
  }, [register]);

  // 2. SINCRONIZACIÓN INICIAL (Carga de datos al editar)
  useEffect(() => {
    // Precio
    if (watchedCop) {
        const clean = String(watchedCop).replace(/\D/g, "");
        setDisplayCOP(formatCurrency(clean));
        if (trm > 0) {
            const usd = Math.round(Number(clean) / trm);
            setDisplayUSD(formatCurrency(usd));
            setValue("price_usd", usd); 
        }
    } else {
        setDisplayCOP("");
    }

    // Avalúo
    if (watchedAvaluo) setDisplayAvaluo(formatCurrency(watchedAvaluo));
    else setDisplayAvaluo("");

    // Administración (FIX: Asegurar que se muestre si existe)
    if (watchedAdmin) {
        setDisplayAdmin(formatCurrency(watchedAdmin));
    } else {
        setDisplayAdmin("");
    }
  }, [watchedCop, watchedAvaluo, watchedAdmin, trm, setValue]);

  // --- MANEJADORES ---

  const handlePriceChange = (e: any) => {
      const raw = e.target.value.replace(/\D/g, "");
      setDisplayCOP(formatCurrency(raw));
      const valNum = raw ? Number(raw) : 0;
      setValue("price_cop", valNum, { shouldDirty: true, shouldValidate: true });

      if (raw && trm > 0) {
        const usd = Math.round(valNum / trm);
        setDisplayUSD(formatCurrency(usd));
        setValue("price_usd", usd, { shouldDirty: true });
      }
  };

  const handleAvaluoChange = (e: any) => {
      const raw = e.target.value.replace(/\D/g, "");
      setDisplayAvaluo(formatCurrency(raw));
      setValue("specs.avaluo", raw ? Number(raw) : 0, { shouldDirty: true });
  };

  const handleAdminChange = (e: any) => {
      const raw = e.target.value.replace(/\D/g, "");
      setDisplayAdmin(formatCurrency(raw));
      // FIX: Guardar explícitamente en el formulario y forzar validación
      setValue("admin_fee", raw ? Number(raw) : 0, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <div className="animate-in fade-in space-y-4">
       {/* HEADER TRM */}
       <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-green-300/70 border-b border-green-800/50 pb-2">
          <span className="flex items-center gap-2"><DollarSign size={12}/> Información Financiera</span>
          <div className="flex items-center gap-2 bg-green-900/50 px-2 py-1 rounded">
             {trm > 0 ? (
               <><TrendingUp size={12} className="text-green-400"/><span>TRM: ${formatCurrency(Math.round(trm))}</span></>
             ) : (
               <><RefreshCw size={12} className="animate-spin text-green-400"/><span>Cargando...</span></>
             )}
          </div>
       </div>

       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          {/* Precio COP */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Precio Venta (COP)</label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input type="text" value={displayCOP} onChange={handlePriceChange} placeholder="0" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white font-mono placeholder-green-800/50 focus:border-green-400 focus:ring-1 focus:ring-green-400" />
             </div>
          </div>

          {/* Precio USD */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300 flex justify-between"><span>Precio USD</span><span className="text-[8px] bg-green-800 px-1 rounded text-white">AUTO</span></label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input type="text" value={displayUSD} readOnly className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#064e3b] border-green-800 text-green-100 font-mono opacity-80 cursor-not-allowed select-none" />
             </div>
          </div>

          {/* Avalúo */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Avalúo Catastral</label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input type="text" value={displayAvaluo} onChange={handleAvaluoChange} placeholder="Opcional" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white placeholder-green-800/50 focus:border-green-400" />
             </div>
          </div>

          {/* Administración (PROBLEMA SOLUCIONADO) */}
          <div className="w-full">
             <label className="text-[10px] font-bold uppercase mb-1 block opacity-70 text-green-300">Valor Administración</label>
             <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400"><DollarSign size={14}/></div>
                <input type="text" value={displayAdmin} onChange={handleAdminChange} placeholder="0" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all bg-[#022c22] border-green-700 text-white placeholder-green-800/50 focus:border-green-400" />
             </div>
          </div>
       </div>
    </div>
  );
}