import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Reemplaza con tus credenciales si no están en el .env
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'TU_URL_AQUI'; 
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'TU_KEY_AQUI';
const supabase = createClient(supabaseUrl, supabaseKey);

const tables = ['properties', 'agents', 'blog_posts', 'blogs', 'contacts', 'profiles', 'quotes', 'scouting_requests'];

async function exportData() {
  console.log("--- INICIANDO EXTRACCIÓN DE EMERGENCIA (AYC FINCA RAÍZ) ---");
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw error;
      if (data && data.length > 0) {
        fs.writeFileSync(`./backup_ayc_${table}.json`, JSON.stringify(data, null, 2));
        console.log(`✅ EXPORTADA: ${table} (${data.length} registros)`);
      } else {
        console.log(`ℹ️ VACÍA: ${table}`);
      }
    } catch (err) {
      console.error(`❌ ERROR EN ${table}: ${err.message}`);
    }
  }
  console.log("--- PROCESO FINALIZADO. ARCHIVOS LISTOS EN LA RAÍZ ---");
}

exportData();
