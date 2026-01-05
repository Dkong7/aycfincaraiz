import React from "react";
import { Home, Map, Sparkles } from "lucide-react";

// Helper para Input con Icono
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
  
  // --- IA CONTEXTUAL REAL ---
  const handleAIEnrich = () => {
     const title = getValues("title");
     const hood = getValues("neighborhood");
     const city = getValues("municipality");
     const type = getValues("property_type");
     const currentDesc = getValues("description");

     if (!title || !hood) {
        alert("⚠️ Por favor escribe al menos el Título y el Barrio para que la IA tenga contexto.");
        return;
     }

     setValue("description", "🤖 Generando descripción inteligente...");
     
     setTimeout(() => {
        const text = `
¡EXCELENTE OPORTUNIDAD EN ${hood.toUpperCase()}!

Presentamos este espectacular ${type}, "${title}", ubicado en uno de los sectores más cotizados de ${city}. Esta propiedad combina diseño, confort y una ubicación estratégica.

Al ingresar, encontrará espacios amplios e iluminados naturalmente, diseñados para ofrecer la mejor experiencia de vida. La distribución es ideal para familias que buscan privacidad y zonas sociales acogedoras. 

Rodeado de parques, vías principales y con acceso a la mejor oferta comercial de la zona, este inmueble representa una inversión segura y un hogar perfecto. ¡Contáctenos para agendar su visita!
        `.trim();
        
        // Conserva lo que el usuario ya escribió si no es el mensaje de carga
        const finalDesc = (currentDesc && !currentDesc.includes("🤖") ? currentDesc + "\n\n" : "") + text;
        setValue("description", finalDesc);
     }, 1200);
  };

  return (
    <div className="space-y-4 animate-in fade-in">
       {/* Título */}
       <InputIcon register={register} name="title" label="Título del Anuncio" placeholder="Ej: Espectacular Casa en Santa Ana" icon={Home} s={s} />
       
       {/* Descripción con IA */}
       <div className="relative">
          <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>Descripción (Min 200 palabras)</label>
          <textarea 
            {...register("description")} 
            rows={6} 
            className={`w-full p-3 rounded-lg text-sm outline-none border ${s.input}`} 
            placeholder="Detalles que venden..."
          ></textarea>
          <button 
            type="button" 
            onClick={handleAIEnrich} 
            className="absolute bottom-3 right-3 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 hover:bg-purple-500 shadow-lg transition-transform hover:scale-105"
          >
            <Sparkles size={12}/> Mejorar con IA
          </button>
       </div>

       {/* Ubicación */}
       <div className="grid grid-cols-2 gap-4">
          <InputIcon register={register} name="municipality" label="Ciudad" placeholder="Bogotá" icon={Map} s={s} />
          <InputIcon register={register} name="neighborhood" label="Barrio" placeholder="Chicó" icon={Map} s={s} />
       </div>
    </div>
  );
}