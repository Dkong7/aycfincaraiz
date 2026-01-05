import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient('https://upsvufgoawiqcukzkkkw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwc3Z1ZmdvYXdpcWN1a3pra2t3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY2Mjg5MDEsImV4cCI6MjA4MjIwNDkwMX0.x59DlAxQ1qOidpPHoXYibJ-39jFwC9Qifm2KipeO2aU');
const tables = ['properties', 'agents', 'blog_posts', 'blogs', 'contacts', 'profiles', 'quotes', 'scouting_requests'];

async function exportData() {
  console.log('--- RESCATE DE DATOS AYC FINCA RAÍZ ---');
  for (const table of tables) {
    try {
      const { data, error } = await supabase.from(table).select('*');
      if (error) throw error;
      if (data && data.length > 0) {
        fs.writeFileSync('./backup_ayc_' + table + '.json', JSON.stringify(data, null, 2));
        console.log('✅ EXPORTADA: ' + table + ' (' + data.length + ' registros)');
      } else {
        console.log('ℹ️ VACÍA: ' + table);
      }
    } catch (err) {
      console.error('❌ ERROR EN ' + table + ': ' + err.message);
    }
  }
  console.log('--- PROCESO FINALIZADO ---');
}
exportData();
