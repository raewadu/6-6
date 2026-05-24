import { useMutation, useQueryClient } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useRemoveCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ productId }) => {
			return await $authApi.delete(`/cart/${productId}`);
		},

		onSuccess: () => {
			queryClient.invalidateQueries(['cart']);
		},

		onError: (error) => {
			if (error.response?.status === 401) {
				alert('Пожалуйста, войдите в систему или зарегистрируйтесь');
			}
		},
	});
};
