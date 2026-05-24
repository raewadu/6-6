import { useQuery } from '@tanstack/react-query';
import { $authApi, $mainApi } from '../lib/api';
export const useProductQuery = ({ search, minPrice, maxPrice, category }) => {
	return useQuery({
		queryKey: ['products', search, minPrice, maxPrice, category],
		queryFn: async () => {
			const { data } = await $authApi.get('/products', {
				params: {
					search,
					minPrice,
					maxPrice,
					category,
				},
			});
			return data.data;
		},
	});
};
