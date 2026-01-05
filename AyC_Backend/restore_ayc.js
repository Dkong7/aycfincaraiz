import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

// DATOS RECUPERADOS DE TUS ARCHIVOS JSON (Resumidos para el script)
const dataProperties = [
  {
    "ayc_id": "AYC-1006",
    "listing_type": "Arriendo",
    "property_type": "Apartamento",
    "price_cop": 5000000,
    "price_usd": 1250,
    "address_visible": "Rosales",
    "owner_name": "NN",
    "active": true
  }
];

const dataQuotes = [
  { "text": "Atención personalizada y muy humana.", "author": "Familia Rodríguez", "active": true },
  { "text": "El blindaje jurídico me dio tranquilidad.", "author": "Andrés Valencia", "active": true },
  { "text": "La producción audiovisual resaltó cada detalle.", "author": "Claudia Jiménez", "active": true }
];

const dataBlogs = [
  {
    "title": "¿Dónde Invertir en 2026? Logística y Lujo",
    "excerpt": "Las apuestas seguras para el capital institucional.",
    "author": "Equipo A&C",
    "image_url": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    "active": true
  },
  {
    "title": "El Gran Giro del 2025",
    "excerpt": "Arriendos superan a propietarios.",
    "author": "Alfonso Diaz",
    "image_url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000",
    "active": true
  }
];

async function restore() {
  try {
    console.log('Autenticando...');
    // Intentamos login, si falla asumimos que es base nueva y creamos admin (esto requiere hack manual o setup inicial, 
    // pero intentaremos usar el endpoint de importación si está abierto o crear registros si ya hay auth)
    
    // NOTA: Para restaurar sin UI en una DB vacía, necesitamos el primer admin.
    // Si ya existe admin, usa: await pb.admins.authWithPassword('direccionrevistatribu@gmail.com', 'rtribu234567');
    
    try {
        await pb.admins.authWithPassword('direccionrevistatribu@gmail.com', 'rtribu234567');
    } catch (e) {
        console.log('No se pudo loguear. Asegúrate de haber creado el admin o que la DB no esté corrupta.');
        return;
    }

    console.log('Restaurando Quotes...');
    for (const item of dataQuotes) {
        try { await pb.collection('quotes').create(item); } catch(e) { console.log('Quote existe o error:', e.message); }
    }

    console.log('Restaurando Blogs...');
    for (const item of dataBlogs) {
        try { await pb.collection('blog_posts').create(item); } catch(e) { 
            // Si falla blog_posts, intentamos 'blogs'
             try { await pb.collection('blogs').create(item); } catch(err) { console.log('Blog error:', err.message); }
        }
    }

    console.log('Restaurando Propiedades...');
    for (const item of dataProperties) {
        try { await pb.collection('properties').create(item); } catch(e) { console.log('Property error:', e.message); }
    }
    
    console.log('--- RESTAURACIÓN COMPLETADA ---');

  } catch (err) {
    console.error('Error general:', err);
  }
}

restore();
