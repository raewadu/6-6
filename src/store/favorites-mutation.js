import { useMutation, useQueryClient } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useToggleFavorite = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({ productId, isFavorite }) => {
			if (isFavorite) {
				return await $authApi.delete(`/favorites/${productId}`);
			} else {
				return await $authApi.post('/favorites', {
					productId,
				});
			}
		},

		onSuccess: () => {
			queryClient.invalidateQueries(['products']);
		},

		onError: (error) => {
			if (error.response?.status === 401) {
				alert('Пожалуйста, войдите в систему или зарегистрируйтесь');
			}
		},
	});
};
