import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

// routes that are protected from users who are not signed in
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children; 
};

export default PrivateRoute;