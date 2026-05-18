import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
				</ul>
			</nav>
		</header>
	);
};

export default Header;
