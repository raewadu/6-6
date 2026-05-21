import { useMutation, useQueryClient } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useRemoveFromCart = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (productId) => {
			return await $authApi.delete(`/cart/${productId}`);
		},

		onSuccess: () => {
			queryClient.invalidateQueries(['cart']);
		},
	});
};
