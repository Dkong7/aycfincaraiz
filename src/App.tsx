import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
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
import BlogManager from "./pages/admin/BlogManager"; 
import CreateBlog from "./pages/admin/CreateBlog"; // IMPORTAR EDITOR

function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* PÚBLICAS */}
                <Route path="/" element={<Home />} />
                <Route path="/inmuebles" element={<Properties />} />
                <Route path="/inmuebles/:id" element={<PropertyDetail />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/servicios/:type" element={<ServicePage />} />

                {/* SECRETAS */}
                <Route path="/claclacla" element={<Login />} />
                <Route path="/alfalfalf" element={<Login />} />
                <Route path="/login" element={<Navigate to="/" replace />} />

                {/* ADMIN PROTEGIDAS */}
                <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                
                {/* INMUEBLES */}
                <Route path="/admin/crear" element={<ProtectedRoute><CreateProperty /></ProtectedRoute>} />
                <Route path="/admin/editar/:id" element={<ProtectedRoute><CreateProperty /></ProtectedRoute>} />
                <Route path="/admin/inmuebles" element={<ProtectedRoute><PropertiesList /></ProtectedRoute>} />
                
                {/* BLOG (Rutas Nuevas) */}
                <Route path="/admin/blog" element={<ProtectedRoute><BlogManager /></ProtectedRoute>} />
                <Route path="/admin/blog/crear" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
                <Route path="/admin/blog/editar/:id" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />

                <Route path="/admin/asesores" element={<ProtectedRoute><ManageAdvisors /></ProtectedRoute>} />
              </Routes>
            </main>
            {!window.location.pathname.startsWith("/admin") && <Footer />}
          </div>
        </Router>
      </AuthProvider>
    </AppProvider>
  );
}

export default App;