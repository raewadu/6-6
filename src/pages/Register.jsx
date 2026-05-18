import React, { useState } from 'react';
import { useRegisterMutation } from '../store/register-mutation';

const Register = () => {
	const [login, setLogin] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { mutate, isPending } = useRegisterMutation();

	const register = async (event) => {
		event.preventDefault();
		mutate({
			login,
			email,
			password,
		});
	};

	return (
		<div>
			<h1>Регистрация</h1>
			<form onSubmit={register}>
				<input
					type="text"
					placeholder="Логин"
					value={login}
					onChange={(e) => setLogin(e.target.value)}
				/>
				<input
					type="email"
					placeholder="Электронная почта"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Пароль"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button disabled={isPending}>Зарегистрироваться</button>
			</form>
		</div>
	);
};

export default Register;
