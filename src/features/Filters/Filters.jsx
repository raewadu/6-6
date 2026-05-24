import React from 'react';
import './Filters.css';
import { useFilters } from '../../hooks/use-filter';
import { useCategoriesQuery } from '../../store/categories-query';

const Filters = () => {
	const { data, isLoading } = useCategoriesQuery();
	const {
		search,
		setSearch,
		category,
		setCategory,
		minPrice,
		setMinPrice,
		maxPrice,
		setMaxPrice,
	} = useFilters();

	if (isLoading) return <div>Loading...</div>;
	return (
		<div>
			<input
				type="text"
				placeholder="Введите поиск"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<select value={category} onChange={(e) => setCategory(e.target.value)}>
				<option value="">Все</option>

				{data.map((item) => (
					<option value={item._id} key={item._id}>
						{item.name}
					</option>
				))}
			</select>
			<input
				type="number"
				placeholder="От"
				value={minPrice}
				onChange={(e) => setMinPrice(e.target.value)}
			/>

			<input
				type="number"
				placeholder="До"
				value={maxPrice}
				onChange={(e) => setMaxPrice(e.target.value)}
			/>
		</div>
	);
};

export default Filters;
