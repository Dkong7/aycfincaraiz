import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session } = useAuth();

  if (!session) {
    // SI NO HAY SESIÓN, ENVIAR AL HOME (SILENCIOSO) EN LUGAR DE /LOGIN
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}