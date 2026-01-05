import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient('https://upsvufgoawiqcukzkkkw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwc3Z1ZmdvYXdpcWN1a3pra2t3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjYyODkwMSwiZXhwIjoyMDgyMjA0OTAxfQ.AFoqlsK1LsZw6qMRceiqRVxVJQexWe0gN4Gqa3OGtvc', {
  auth: { persistSession: false }
});

const tables = ['properties', 'agents', 'contacts', 'quotes', 'profiles', 'scouting_requests'];

async function emergencyExport() {
  console.log('--- RESCATE MAESTRO: BYPASS DE SEGURIDAD ACTIVADO ---');
  for (const table of tables) {
    try {
      console.log('Extrayendo tabla: ' + table + '...');
      // Service role ignora recursión infinita y políticas RLS
      const { data, error } = await supabase.from(table).select('*');
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        fs.writeFileSync('./SALVADO_' + table + '.json', JSON.stringify(data, null, 2));
        console.log('✅ ' + table + ' SALVADA: ' + data.length + ' registros.');
      } else {
        console.log('ℹ️ ' + table + ' no tiene registros.');
      }
    } catch (err) {
      console.error('❌ FALLO EN ' + table + ': ' + err.message);
    }
  }
  console.log('--- PROCESO TERMINADO: DATOS A SALVO ---');
}
emergencyExport();
