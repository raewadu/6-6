import { useMutation, useQueryClient } from '@tanstack/react-query';
import { $authApi } from '../lib/api';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useOrdersMutation = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: async (payload) => {
			return await $authApi.post('/orders', payload);
		},

		onSuccess: async () => {
			await $authApi.delete('/cart');
			toast.success('Заказ успешно оформлен');

			queryClient.invalidateQueries(['orders']);
			queryClient.invalidateQueries(['cart']);

			setTimeout(() => {
				navigate('/orders');
			}, 300);
		},

		onError: (error) => {
			if (error.response?.status === 401) {
				alert('Пожалуйста, войдите в систему или зарегистрируйтесь');
			}
		},
	});
	return { mutate, isPending };
};
