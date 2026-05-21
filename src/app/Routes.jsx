import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout';
import Products from '../pages/products';
import Basket from '../pages/Basket';
import Orders from '../pages/Orders';
import Favorites from '../pages/Favorites';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import { Providers } from './Providers';
import { AuthGuard } from './auth-guard';
import { AuthCheck } from './auth-check';

const Routes = createBrowserRouter([
	{
		element: (
			<Providers>
				<Layout />
			</Providers>
		),
		children: [
			{
				element: <AuthGuard />,
				children: [
					{
						path: '/Basket',
						element: <Basket />,
					},
					{
						path: '/orders',
						element: <Orders />,
					},
					{
						path: '/favorites',
						element: <Favorites />,
					},
				],
			},
			{
				path: '/',
				element: <Products />,
			},
			{
				element: <AuthCheck />,
				children: [
					{
						path: '/login',
						element: <Login />,
					},
					{
						path: '/register',
						element: <Register />,
					},
				],
			},

			{
				path: '*',
				element: <Error />,
			},
		],
	},
]);

export default Routes;
