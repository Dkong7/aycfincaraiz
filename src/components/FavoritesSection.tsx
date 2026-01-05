import React from 'react';
import { Link } from 'react-router-dom';

interface Property { id: string; collectionId: string; title: string; price: number; images: string[]; municipality: string; }

const FavoritesSection: React.FC<{ properties: Property[], currency: string, exchangeRate: number }> = ({ properties, currency, exchangeRate }) => {
  if (properties.length === 0) return null;
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL;

  return (
    <div className="w-full bg-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-black text-gray-900 mb-10 border-l-8 border-green-600 pl-4 uppercase">
          Favoritos AyC
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((prop) => {
             const price = currency === 'USD' ? prop.price / exchangeRate : prop.price;
             return (
               <Link key={prop.id} to={`/inmuebles/${prop.id}`} className="group bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-xl transition-all border border-gray-100">
                  <div className="h-48 overflow-hidden relative">
                    <img src={`${PB_URL}/api/files/${prop.collectionId}/${prop.id}/${prop.images?.[0]}`} 
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                  </div>
                  <div className="p-4">
                     <h3 className="font-bold text-gray-800 truncate">{prop.title}</h3>
                     <p className="text-green-600 font-bold mt-2">
                        {currency === 'USD' ? '$' : '$ '}{price.toLocaleString(currency === 'USD' ? 'en-US' : 'es-CO', { maximumFractionDigits: 0 })}
                     </p>
                     <p className="text-gray-400 text-xs mt-1 uppercase">{prop.municipality}</p>
                  </div>
               </Link>
             );
          })}
        </div>
      </div>
    </div>
  );
};
export default FavoritesSection;
