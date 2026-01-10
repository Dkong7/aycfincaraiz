import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// PAGES
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import DashboardInventario from "./pages/DashboardInventario";
import DashboardBlog from "./pages/DashboardBlog"; 
import DashboardTeam from "./pages/DashboardTeam";
import Login from "./pages/Login";
import About from "./pages/About"; 
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Audiovisual from "./pages/services/Audiovisual"; 
import Juridico from "./pages/services/Juridico";
import Avaluos from "./pages/services/Avaluos";

// --- LAYOUT PARA LA WEB PÚBLICA (Navbar + Footer) ---
const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar /> 
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
        <Routes>
          {/* RUTAS PÚBLICAS (Usan PublicLayout) */}
          <Route element={<PublicLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/inmuebles" element={<Properties />} />
              <Route path="/inmuebles/:id" element={<PropertyDetail />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contacto" element={<Contact />} />
              
              {/* SERVICIOS */}
              <Route path="/servicios/audiovisual" element={<Audiovisual />} />
              <Route path="/servicios/juridico" element={<Juridico />} />
              <Route path="/servicios/avaluos" element={<Avaluos />} />

              {/* RUTAS DE ACCESO / LOGIN */}
              <Route path="/claclacla" element={<Login />} />
              <Route path="/alfalfalf" element={<Login />} />
              <Route path="/agentes" element={<Login />} />
          </Route>

          {/* RUTAS DASHBOARD (Sin Navbar Pública) */}
          <Route path="/dashboard/inventario" element={<DashboardInventario />} />
          <Route path="/dashboard/blog" element={<DashboardBlog />} />
          <Route path="/dashboard/equipo" element={<DashboardTeam />} />
        </Routes>
    </Router>
  );
}

export default App;