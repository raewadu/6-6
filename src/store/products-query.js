import { useQuery } from '@tanstack/react-query';
import { $mainApi } from '../lib/api';
export const useProductQuery = () => {
	const { data, isPending } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const { data } = await $mainApi.get('/products');
			return data.data;
		},
	});
	return {
		data,
		isPending,
	};
};
