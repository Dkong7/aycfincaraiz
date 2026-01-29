import React from "react";
import { Home, Map, Sparkles, Layers } from "lucide-react";

const InputIcon = ({ icon: Icon, label, register, name, placeholder, s }: any) => (
  <div className="w-full">
    <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>{label}</label>
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-current transition-colors">
        <Icon size={14} />
      </div>
      <input 
        {...register(name)} 
        placeholder={placeholder} 
        className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border transition-all ${s.input}`} 
      />
    </div>
  </div>
);

export default function BasicInfo({ register, setValue, getValues, s }: any) {
  
  // --- IA CONTEXTUAL MEJORADA ---
  const handleAIEnrich = () => {
      const title = getValues("title");
      const hood = getValues("neighborhood");
      const city = getValues("municipality");
      const type = getValues("property_type") || "inmueble";
      const stratum = getValues("stratum");
      const currentDesc = getValues("description");

      if (!title || !hood) {
        alert("⚠️ Por favor escribe al menos el Título y el Barrio para que la IA tenga contexto.");
        return;
      }

      setValue("description", "🤖 Redactando descripción persuasiva...");
      
      setTimeout(() => {
        const hooks = [
            `¡EXCLUSIVIDAD Y CONFORT EN ${hood.toUpperCase()}!`,
            `Descubre tu próximo hogar en una de las zonas más valorizadas de ${city}.`,
            `¿Buscas calidad de vida? Este ${type} en ${hood} lo tiene todo.`,
            `Oportunidad única de inversión en el corazón de ${hood}.`
        ];
        const bodies = [
            `Esta propiedad destaca por su diseño inteligente y espacios generosos, pensados para maximizar la entrada de luz natural. Cada rincón ha sido cuidado para ofrecer una atmósfera de calidez y modernidad inigualable.`,
            `Al ingresar, te recibirá un ambiente sofisticado y acogedor. Su distribución es perfecta para familias modernas o ejecutivos que valoran la privacidad sin sacrificar áreas sociales.`
        ];
        const locations = [
            `Su ubicación es estratégica: rodeado de parques, con acceso inmediato a vías principales y cerca de la mejor oferta gastronómica de ${city}.`,
            `Disfruta de la conveniencia de vivir en ${hood}, un sector caracterizado por su seguridad, sus zonas verdes y su cercanía a todo lo que necesitas.`
        ];
        const ctas = [
            `No dejes pasar esta oportunidad. ¡Contáctanos hoy mismo para agendar tu visita!`,
            `Propiedades con estas características no duran mucho. ¡Agenda tu cita ahora!`
        ];

        const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
        const generatedText = `${pick(hooks)}\n\n${pick(bodies)} ${pick(locations)}\n\n${pick(ctas)}`;
        
        const finalDesc = (currentDesc && !currentDesc.includes("🤖") ? currentDesc + "\n\n" : "") + generatedText;
        setValue("description", finalDesc);
      }, 1500);
  };

  return (
    <div className="space-y-4 animate-in fade-in">
       {/* Título */}
       <InputIcon register={register} name="title" label="Título del Anuncio" placeholder="Ej: Espectacular Casa en Santa Ana" icon={Home} s={s} />
       
       {/* Descripción */}
       <div className="relative">
          <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>Descripción Detallada</label>
          <textarea 
            {...register("description")} 
            rows={8} 
            className={`w-full p-3 rounded-lg text-sm outline-none border resize-none ${s.input}`} 
            placeholder="Escribe los detalles que enamoran o usa el botón de IA..."
          ></textarea>
          <button 
            type="button" 
            onClick={handleAIEnrich} 
            className="absolute bottom-3 right-3 bg-purple-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-purple-500 shadow-lg transition-transform hover:scale-105 group"
          >
            <Sparkles size={12} className="group-hover:animate-spin"/> Redactar con IA
          </button>
       </div>

       {/* Ubicación y Detalles */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputIcon register={register} name="municipality" label="Ciudad" placeholder="Bogotá" icon={Map} s={s} />
          <InputIcon register={register} name="neighborhood" label="Barrio" placeholder="Chicó" icon={Map} s={s} />
          
          <div className="w-full">
            <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>Estrato</label>
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-current transition-colors">
                    <Layers size={14} />
                </div>
                <select 
                    {...register("stratum")} 
                    className={`w-full pl-9 pr-3 py-2.5 rounded-lg text-sm outline-none border appearance-none transition-all cursor-pointer ${s.input}`}
                >
                    <option value="">Seleccionar...</option>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>Estrato {num}</option>
                    ))}
                    <option value="Campestre">Campestre / Rural</option>
                    <option value="Comercial">Comercial / Ind.</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 text-[10px]">▼</div>
            </div>
          </div>
       </div>
    </div>
  );
}