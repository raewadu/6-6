import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { useLogoutMutation } from '../../store/logout-mutation';
import { useAuth } from '../../hooks/use-auth';
const navItems = [
	{
		label: 'Главная',
		path: '/',
	},
	{
		label: 'Корзина',
		path: '/basket',
	},
	{
		label: 'Избранное',
		path: '/favorites',
	},
	{
		label: 'Заказы',
		path: '/orders',
	},
];
const Header = () => {
	const { mutate, isPending } = useLogoutMutation();

	const isAuth = useAuth((state) => state.isAuth);
	return (
		<header>
			<div>Market</div>
			<nav>
				<ul>
					{navItems.map((item) => (
						<li key={item.path}>
							<NavLink to={item.path}>{item.label}</NavLink>
						</li>
					))}
					{isAuth && (
						<li>
							<button onClick={mutate} disabled={isPending}>
								Выйти из аккаунта
							</button>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Header;
