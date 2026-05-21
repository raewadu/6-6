import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { $authApi, $mainApi } from '../lib/api';
import { useAuth } from '../hooks/use-auth';

export const useLogoutMutation = () => {
	const navigate = useNavigate();

	const setAuth = useAuth((state) => state.clear);

	const { mutate, isPending } = useMutation({
		mutationFn: async () => {
			await $mainApi.post('/auth/logout');
		},
		onSuccess: (respData) => {
			navigate('/login');
			setAuth(false);
			localStorage.removeItem('access_token');
		},
	});
	return {
		mutate,
		isPending,
	};
};
