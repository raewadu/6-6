import { useQuery } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useOrdersQuery = () => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['orders'],
		queryFn: async () => {
			const response = await $authApi.get('/orders');
			return response.data.data;
		},
	});
	return { data, isPending, refetch };
};
