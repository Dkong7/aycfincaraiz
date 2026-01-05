import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import DashboardInventario from "./pages/DashboardInventario";
import DashboardBlog from "./pages/DashboardBlog"; // <--- IMPORTACIÓN NUEVA
import Login from "./pages/Login";
import About from "./pages/About"; 
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Audiovisual from "./pages/services/Audiovisual"; 
import Juridico from "./pages/services/Juridico";
import Avaluos from "./pages/services/Avaluos";

const MainLayout = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <main className="flex-grow">
        <Routes>
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<Home />} />
          <Route path="/inmuebles" element={<Properties />} />
          <Route path="/inmuebles/:id" element={<PropertyDetail />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contacto" element={<Contact />} />
          
          <Route path="/servicios/audiovisual" element={<Audiovisual />} />
          <Route path="/servicios/juridico" element={<Juridico />} />
          <Route path="/servicios/avaluos" element={<Avaluos />} />
          
          {/* RUTAS PRIVADAS (DASHBOARD) */}
          <Route path="/dashboard/inventario" element={<DashboardInventario />} />
          <Route path="/dashboard/blog" element={<DashboardBlog />} /> {/* <--- RUTA NUEVA */}
          
          {/* LOGINS */}
          <Route path="/claclacla" element={<Login />} />
          <Route path="/alfalfalf" element={<Login />} />
          <Route path="/agentes" element={<Login />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <MainLayout />
      </Router>
    </LanguageProvider>
  );
}
export default App;