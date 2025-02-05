import { Navigate } from 'react-router';
import { useAuth } from '../contexts/useAuth';

type PrivateRouteProps = {
	children: React.ReactNode;
};

export function PrivateRoute ({ children }: PrivateRouteProps) {
	const { user } = useAuth();
	if (user == null) {
		return <Navigate to='/login' />;
	}

	return <>{children}</>;
}