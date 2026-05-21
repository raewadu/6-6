import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

export const AuthCheck = () => {
	const isAuth = useAuth((state) => state.isAuth);

	if (isAuth) {
		return <Navigate to="/" replace />;
	}
	return <Outlet />;
};
