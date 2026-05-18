import React from 'react';
import { useFavoriteQuery } from '../store/favorites-query';

const Favorites = () => {
	const { data, isPending } = useFavoriteQuery();
	if (isPending) return <div>Loading...</div>;

	if (data?.length === 0) return <div>Нет данных</div>;

	return (
		<div className="container">
			<div className="products">
				{data.map((product) => (
					<div key={product._id} className="product_block">
						<div>
							<img src={product.image} alt={`${product.name}`} />
						</div>
						<div>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
						</div>
						<p>{product.price}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
