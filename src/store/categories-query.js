// store/categories-query.js
import { useQuery } from '@tanstack/react-query';
import { $authApi } from '../lib/api';

export const useCategoriesQuery = () => {
	return useQuery({
		queryKey: ['categories'],
		queryFn: async () => {
			const { data } = await $authApi.get('/categories');
			return data.data;
		},
	});
};
