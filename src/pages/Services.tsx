import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- CORRECCIÓN DE RUTAS DE IMPORTACIÓN ---
// Ahora apuntan a 'components/sections/services/...'
import { AppraisalSection } from '../components/sections/services/AppraisalSection';
import { LegalSection } from '../components/sections/services/LegalSection';
import { CinemaSection } from '../components/sections/services/CinemaSection';

const Services = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      
      {/* Header General */}
      <div className="bg-[#0B1120] text-white pt-40 pb-20 px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              Nuestros Servicios
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Soluciones integrales para potenciar, proteger y vender tu patrimonio inmobiliario.
          </p>
      </div>

      {/* 1. SECCIÓN AVALÚOS */}
      <AppraisalSection />

      {/* 2. SECCIÓN JURÍDICA */}
      <LegalSection />

      {/* 3. SECCIÓN AUDIOVISUAL */}
      <CinemaSection />

      <Footer />
    </div>
  );
};

export default Services;