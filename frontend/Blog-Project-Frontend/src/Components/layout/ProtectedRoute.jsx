import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();
  
  // Replace with your actual authentication logic (e.g., checking localStorage or context)
  const isAuthenticated = localStorage.getItem('token'); 

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to so you can redirect them back after logging in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;