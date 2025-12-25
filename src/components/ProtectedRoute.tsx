import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Usamos ReactNode en lugar de JSX.Element para máxima compatibilidad
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}