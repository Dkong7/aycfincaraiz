import React, { useState } from "react";
import { Home, Map, Sparkles, Layers, Loader2 } from "lucide-react";

// LLAVE DE DEEPSEEK (Asegúrate de que es correcta)
const DEEPSEEK_KEY = "sk-f30ff134c2204bd6b0b754aee9879e86";

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
  const [isGenerating, setIsGenerating] = useState(false);

  // --- IA CONTEXTUAL CON DEEPSEEK ---
  const handleAIEnrich = async () => {
      const title = getValues("title");
      const hood = getValues("neighborhood");
      const city = getValues("municipality");
      const type = getValues("property_type") || "inmueble";
      const stratum = getValues("stratum");
      const currentDesc = getValues("description") || "";
      const price = getValues("price_cop") || "";

      if (!title || !hood) {
        alert("⚠️ Escribe al menos el Título y el Barrio para que la IA sepa de qué trata el inmueble.");
        return;
      }

      setIsGenerating(true);
      setValue("description", "🤖 Pensando y redactando una descripción experta...\n\n(Esto puede tomar unos segundos)");

      try {
          const prompt = `Eres un redactor experto en marketing inmobiliario para AYC Finca Raíz (Colombia).
Tu objetivo es escribir una descripción atractiva, profesional y persuasiva para este inmueble, basada en los siguientes datos:
- Tipo: ${type}
- Título actual: ${title}
- Ubicación: ${hood}, ${city}
- Estrato: ${stratum || 'No especificado'}
- Precio: ${price ? '$' + price + ' COP' : 'No especificado'}
- Notas adicionales del asesor: ${currentDesc}

REGLAS:
1. NO saludes ni te despidas. Ve directo a la descripción.
2. Usa un tono elegante, persuasivo y comercial (sin exagerar con adjetivos vacíos).
3. Estructura el texto en 3 párrafos cortos: 
   - Párrafo 1: El "gancho" inicial y la ubicación.
   - Párrafo 2: Características del inmueble y estilo de vida.
   - Párrafo 3: Llamado a la acción (Contacta a AYC Finca Raíz para agendar tu visita).
4. Evita los emojis excesivos (máximo 3 en todo el texto).`;

          const res = await fetch('https://api.deepseek.com/chat/completions', {
              method: 'POST',
              headers: {
                  'Authorization': `Bearer ${DEEPSEEK_KEY}`,
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  model: "deepseek-chat",
                  messages: [
                      { role: "system", content: "Eres experto en copywriting inmobiliario." },
                      { role: "user", content: prompt }
                  ],
                  temperature: 0.7
              })
          });

          if (!res.ok) throw new Error("Fallo en la comunicación con la IA");

          const data = await res.json();
          const generatedText = data.choices[0].message.content.trim();
          
          setValue("description", generatedText);

      } catch (error) {
          console.error(error);
          setValue("description", currentDesc); // Restaura si falla
          alert("❌ Error conectando con la IA. Por favor, intenta de nuevo más tarde.");
      } finally {
          setIsGenerating(false);
      }
  };

  return (
    <div className="space-y-4 animate-in fade-in">
       <InputIcon register={register} name="title" label="Título del Anuncio" placeholder="Ej: Espectacular Casa en Santa Ana" icon={Home} s={s} />
       
       <div className="relative">
          <label className={`text-[10px] font-bold uppercase mb-1 block opacity-70 ${s.label}`}>Descripción Detallada</label>
          <textarea 
            {...register("description")} 
            rows={8} 
            disabled={isGenerating}
            className={`w-full p-3 rounded-lg text-sm outline-none border resize-none ${s.input} ${isGenerating ? 'opacity-50 bg-gray-50' : ''}`} 
            placeholder="Escribe los detalles aquí, o dale algunas palabras clave y presiona 'Redactar con IA' para que DeepSeek haga la magia..."
          ></textarea>
          
          <button 
            type="button" 
            onClick={handleAIEnrich}
            disabled={isGenerating}
            className={`absolute bottom-3 right-3 text-white text-[10px] font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all ${isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 hover:scale-105 group'}`}
          >
            {isGenerating ? (
                <><Loader2 size={14} className="animate-spin"/> Generando...</>
            ) : (
                <><Sparkles size={14} className="group-hover:animate-spin"/> Redactar con IA</>
            )}
          </button>
       </div>

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