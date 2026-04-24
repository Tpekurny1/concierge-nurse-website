import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export default function AmbassadorRoute({ children }) {
  const { session, isAmbassador, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <p className="text-slate text-sm">Loading...</p>
      </div>
    );
  }

  if (!session) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/ambassador/login?next=${next}`} replace />;
  }

  if (!isAmbassador && !isAdmin) {
    return <Navigate to="/ambassador/login" replace />;
  }

  return children;
}
