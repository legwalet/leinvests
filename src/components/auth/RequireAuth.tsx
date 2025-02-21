import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import LoadingSpinner from '../common/LoadingSpinner';
import Navbar from '../layout/Navbar';

const RequireAuth = () => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RequireAuth; 