import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from './Loader';

// Protege una pagina: sin sesion manda al login; con rol insuficiente, al inicio.
// Uso: <ProtectedRoute rol="admin"><AdminPage /></ProtectedRoute>
export default function ProtectedRoute({ children, rol }) {
  const { user, cargando } = useAuth();
  const location = useLocation();

  if (cargando) return <Loader texto="Verificando sesión…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (rol && user.rol !== rol) return <Navigate to="/" replace />;

  return children;
}
