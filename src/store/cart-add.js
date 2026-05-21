import { useMutation, useQueryClient } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useAddToCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (productId) => {
			return await $authApi.post('/cart', {
				productId,
			});
		},

		onSuccess: () => {
			queryClient.invalidateQueries(['cart']);
		},
	});
};
