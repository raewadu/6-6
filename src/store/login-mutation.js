import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { $authApi, $mainApi } from '../lib/api';

export const useLoginMutation = () => {
	const navigate = useNavigate();
	const { mutate, isPending } = useMutation({
		mutationFn: async (payload) => {
			const response = await $authApi.post('/auth/sign-in', payload);
			return response.data;
		},
		onSuccess: (respData) => {
			navigate('/');
			localStorage.setItem('access_token', respData.accessToken);
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
