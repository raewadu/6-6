import { useQuery } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useCartQuery = () => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['cart'],
		queryFn: async () => {
			const response = await $authApi.get('/cart');
			return response.data.data.items;
		},
	});
	return { data, isPending, refetch };
};
