import { create } from 'zustand';

export const useFilters = create((set) => ({
	search: '',
	setSearch: (value) => set({ search: value }),
	minPrice: '',
	setMinPrice: (value) => set({ minPrice: value }),
	maxPrice: '',
	setMaxPrice: (value) => set({ maxPrice: value }),
	category: '',
	setCategory: (value) => set({ category: value }),
}));
