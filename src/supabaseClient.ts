import { createClient } from "@supabase/supabase-js";

// Obtener variables
const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// FAILSAFE: Si no hay variables, usamos valores falsos para que React pueda renderizar sin errores fatales.
// La autenticación fallará, pero la página se verá.
const finalUrl = envUrl && envUrl.length > 0 ? envUrl : "https://placeholder-project.supabase.co";
const finalKey = envKey && envKey.length > 0 ? envKey : "placeholder-key";

if (!envUrl || !envKey) {
  console.warn("⚠️ ALERTA: Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY en el archivo .env");
}

export const supabase = createClient(finalUrl, finalKey);
