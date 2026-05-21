import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { $authApi, $mainApi } from '../lib/api';
import { useAuth } from '../hooks/use-auth';

export const useRegisterMutation = () => {
	const navigate = useNavigate();

	const setAuth = useAuth((state) => state.setAuth);

	const { mutate, isPending } = useMutation({
		mutationFn: async (payload) => {
			const response = await $authApi.post('/auth/sign-up', payload);
			return response.data;
		},
		onSuccess: (respData) => {
			navigate('/');
			setAuth(true);
			localStorage.setItem('access_token', respData.accessToken);
		},
		onError: () => {
			alert('Register error');
		},
	});
	return {
		mutate,
		isPending,
	};
};
