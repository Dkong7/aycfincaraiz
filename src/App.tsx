import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';

// Layouts & Components
import NavbarCustom from './components/layout/NavbarCustom';
import FooterCustom from './components/layout/FooterCustom';
import HeroSection from './components/hero/HeroSection';
import { FeaturedProperties, ServicesIntro, LatestBlog } from './components/home/HomeSections';
import { SearchBar } from './components/search/SearchBar'; // <--- IMPORT CORREGIDO

// Pages
import Inmuebles from './pages/Inmuebles';
import About from './pages/About';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import Audiovisual from './pages/services/Audiovisual';

// Auth & Dashboard
import LoginSpecial from './pages/auth/LoginSpecial';
import Dashboard from './pages/dashboard/Dashboard';
import CreateProperty from './pages/dashboard/CreateProperty';

const PagePlaceholder = ({title}: {title: any}) => <div className="pt-32 text-center min-h-screen"><h1 className="text-3xl font-bold text-[#0A192F] uppercase">{title}</h1></div>;

const HomePage = () => (
  <div className="flex flex-col bg-white">
      <div className="mt-20 relative z-0">
        <HeroSection />
      </div>
      <SearchBar />
      <FeaturedProperties />
      <ServicesIntro />
      <LatestBlog />
  </div>
);

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            {/* RUTAS PÚBLICAS */}
            <Route path="/" element={<><NavbarCustom /><HomePage /><FooterCustom /></>} />
            <Route path="/inmuebles" element={<><NavbarCustom /><Inmuebles /><FooterCustom /></>} />
            <Route path="/nosotros" element={<><NavbarCustom /><About /><FooterCustom /></>} />
            <Route path="/blog" element={<><NavbarCustom /><Blog /><FooterCustom /></>} />
            <Route path="/contacto" element={<><NavbarCustom /><Contacto /><FooterCustom /></>} />
            
            {/* SERVICIOS */}
            <Route path="/servicios/audiovisual" element={<><NavbarCustom /><Audiovisual /><FooterCustom /></>} />
            <Route path="/servicios/avaluos" element={<><NavbarCustom /><PagePlaceholder title="Avalúos Comerciales" /><FooterCustom /></>} />
            <Route path="/servicios/juridico" element={<><NavbarCustom /><PagePlaceholder title="Asesoría Jurídica" /><FooterCustom /></>} />

            {/* RUTAS PRIVADAS (SIN NAVBAR PÚBLICO) */}
            <Route path="/claclacla" element={<LoginSpecial />} />
            <Route path="/alfalfalf" element={<LoginSpecial />} />
            <Route path="/agentes" element={<LoginSpecial />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/nuevo" element={<CreateProperty />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;

