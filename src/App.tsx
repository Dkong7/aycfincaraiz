import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext"; // Importante: AuthProvider debe envolver todo
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
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* RUTAS PÚBLICAS */}
                <Route path="/" element={<Home />} />
                <Route path="/inmuebles" element={<Properties />} />
                <Route path="/inmuebles/:id" element={<PropertyDetail />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/servicios/:type" element={<ServicePage />} />

                {/* RUTAS SECRETAS DE ACCESO (Login) */}
                <Route path="/claclacla" element={<Login />} />
                <Route path="/alfalfalf" element={<Login />} />
                {/* Redirigir /login estándar al home para ocultarlo, o simplemente no definirlo */}
                <Route path="/login" element={<Navigate to="/" replace />} />

                {/* RUTAS PROTEGIDAS (DASHBOARD) */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/crear" element={<ProtectedRoute><CreateProperty /></ProtectedRoute>} />
                <Route path="/admin/inmuebles" element={<ProtectedRoute><PropertiesList /></ProtectedRoute>} />
                <Route path="/admin/asesores" element={<ProtectedRoute><ManageAdvisors /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;