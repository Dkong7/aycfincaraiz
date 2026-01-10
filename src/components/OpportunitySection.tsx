import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface Property { id: string; collectionId: string; title: string; price: number; images: string[]; municipality: string; }

const OpportunitySection: React.FC<{ property: Property | null, currency: string, exchangeRate: number }> = ({ property, currency, exchangeRate }) => {
  const { t, translateDynamic } = useApp();

  if (!property) return null;
  const PB_URL = import.meta.env.VITE_POCKETBASE_URL;

  // Corrección para evitar pantalla blanca si price es null
  const rawPrice = property.price || 0;
  const safeRate = exchangeRate || 1; // Evita división por cero
  const price = currency === 'USD' ? rawPrice / safeRate : rawPrice;

  return (
    <div className="w-full h-[50vh] bg-gray-100 flex items-center justify-center py-10">
       <div className="container mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl font-black text-gray-800 mb-8 uppercase tracking-tighter">
             <span className="text-yellow-600 text-4xl mr-2">♛</span> 
             {t('opportunity_corona')}
          </h2>
          
          <Link to={`/inmuebles/${property.id}`} className="relative group w-full max-w-4xl h-64 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01]"
                style={{ boxShadow: '0 0 30px rgba(234, 179, 8, 0.4)', border: '2px solid #EAB308' }}>
            
            <img src={`${PB_URL}/api/files/${property.collectionId}/${property.id}/${property.images?.[0]}`} 
                 className="absolute inset-0 w-full h-full object-cover" 
                 alt={property.title} />
            
            {/* Overlay Dorado Original */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-900/80 via-transparent to-black/60 flex items-center justify-between px-10">
               <div className="text-white">
                  <h3 className="text-4xl font-bold mb-2">
                    {translateDynamic(property.title || "")}
                  </h3>
                  <p className="text-yellow-300 text-xl font-mono">
                    {translateDynamic(property.municipality || "")}
                  </p>
               </div>
               <div className="bg-yellow-500 text-black font-black px-6 py-3 rounded-lg shadow-lg text-xl animate-pulse">
                  {currency === 'USD' ? '$' : '$ '}
                  {price.toLocaleString(currency === 'USD' ? 'en-US' : 'es-CO', { maximumFractionDigits: 0 })}
               </div>
            </div>
          </Link>
       </div>
    </div>
  );
};
export default OpportunitySection;