import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { $authApi, $mainApi } from '../lib/api';

export const useRegisterMutation = () => {
	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: async (payload) => {
			const response = await $authApi.post('/auth/sign-up', payload);
			return response.data;
		},
		onSuccess: (respData) => {
			navigate('/');
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
