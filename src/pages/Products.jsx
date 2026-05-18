import React from 'react';
import { useProductQuery } from '../store/products-query';
import { useToggleFavorite } from '../store/favorites-mutation';
import './style.css';

const Products = () => {
	const { data, isPending } = useProductQuery();
	const { mutate } = useToggleFavorite();

	if (isPending) return <div>Loading...</div>;

	return (
		<div className="container">
			<div className="products">
				{data.map((product) => (
					<div key={product._id} className="product_block">
						<div>
							<img src={product.image} alt={product.name} />
						</div>

						<div>
							<h3>{product.name}</h3>
							<p>{product.description}</p>
						</div>

						<p>{product.price}</p>

						<button
							onClick={() =>
								mutate({
									productId: product._id,
									isFavorite: product.isFavorite,
								})
							}
						>
							{product.isFavorite
								? '❤️ Убрать из избранного'
								: '🤍 Добавить в избранное'}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
