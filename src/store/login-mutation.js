import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { $authApi, $mainApi } from '../lib/api';
import { useAuth } from '../hooks/use-auth';

export const useLoginMutation = () => {
	const navigate = useNavigate();

	const setAuth = useAuth((state) => state.setAuth);

	const { mutate, isPending } = useMutation({
		mutationFn: async (payload) => {
			const response = await $authApi.post('/auth/sign-in', payload);
			return response.data;
		},
		onSuccess: (respData) => {
			localStorage.setItem('access_token', respData.accessToken);
			setAuth(true);
			navigate('/');
		},
		onError: () => {
			alert('Login error');
		},
	});
	return {
		mutate,
		isPending,
	};
};
