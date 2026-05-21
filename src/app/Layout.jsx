import { Outlet } from 'react-router-dom';
import Header from '../features/Header/Header';
import { Toaster } from 'sonner';
import { use, useEffect, useState } from 'react';
import { $authApi } from '../lib/api';
import { useAuth } from '../hooks/use-auth';

export function Layout() {
	const setUser = useAuth((state) => state.setUser);
	const clear = useAuth((state) => state.clear);
	const setAuth = useAuth((state) => state.setAuth);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const accessToken = localStorage.getItem('access_token');

			if (!accessToken) {
				clear();
				return;
			}

			setLoading(true);

			try {
				const { data } = await $authApi.get('/auth/profile');
				setUser(data);
				setAuth(true);
			} catch {
				clear();
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);
	if (loading) {
		return <div>Загрузка...</div>;
	}
	return (
		<>
			<Header />
			<Outlet />
			<Toaster position="top-right" richColors />
		</>
	);
}
