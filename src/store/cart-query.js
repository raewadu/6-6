import { useQuery } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useCartQuery = () => {
	return useQuery({
		queryKey: ['cart'],
		queryFn: async () => {
			const { data } = await $authApi.get('/cart');
			return data;
		},
	});
};
