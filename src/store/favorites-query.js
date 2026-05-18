import { useQuery } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useFavoriteQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ['favorites'],
		queryFn: async () => {
			const response = await $authApi.get('/favorites');
			return response.data.data.products;
		},
	});
	return { data, isPending };
};
