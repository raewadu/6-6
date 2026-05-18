import { Outlet } from 'react-router-dom';
import Header from '../features/Header/Header';

export function Layout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
