import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateProperty from "./pages/admin/CreateProperty";
import PropertiesList from "./pages/admin/PropertiesList";
import ManageAdvisors from "./pages/admin/ManageAdvisors";
import ProtectedRoute from "./components/ProtectedRoute";
import ServicePage from "./pages/ServicePage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail"; // IMPORTAR
import Contact from "./pages/Contact";

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-28 md:pt-32"> {/* PADDING TOP PARA COMPENSAR EL NAVBAR FLOTANTE */}
            <Routes>
              {/* PUBLIC */}
              <Route path="/" element={<Home />} />
              <Route path="/inmuebles" element={<Properties />} />
              <Route path="/inmuebles/:id" element={<PropertyDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} /> {/* RUTA NUEVA */}
              <Route path="/contacto" element={<Contact />} />
              <Route path="/servicios/:type" element={<ServicePage />} />

              {/* ADMIN */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/crear" element={<ProtectedRoute><CreateProperty /></ProtectedRoute>} />
              <Route path="/admin/inmuebles" element={<ProtectedRoute><PropertiesList /></ProtectedRoute>} />
              <Route path="/admin/asesores" element={<ProtectedRoute><ManageAdvisors /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
