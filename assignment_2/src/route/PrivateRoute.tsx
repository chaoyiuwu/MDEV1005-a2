import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children; 
};

export default PrivateRoute;