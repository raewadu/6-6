import React, { useState } from 'react';
import { useLoginMutation } from '../store/login-mutation';
import { useAuth } from '../hooks/use-auth';
import { Navigate } from 'react-router-dom';

const Login = () => {
	const [loginOrEmail, setLoginOrEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mutate, isPending } = useLoginMutation();

	const login = async (event) => {
		event.preventDefault();
		mutate({
			loginOrEmail,
			password,
		});
	};

	return (
		<div>
			<h1>Вход</h1>
			<form onSubmit={login}>
				<input
					type="text"
					placeholder="Логин"
					value={loginOrEmail}
					onChange={(e) => setLoginOrEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button disabled={isPending}>Войти в аккаунт</button>
			</form>
		</div>
	);
};

export default Login;
