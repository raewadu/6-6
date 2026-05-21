import React from 'react';
import { useCartQuery } from '../store/cart-query';
import { useRemoveFromCart } from '../store/cart-remove';

const Basket = () => {
	const { data, isPending } = useCartQuery();
	const { mutate: removeFromCart } = useRemoveFromCart;

	if (isPending) return <div>Loading...</div>;

	if (!data || data.length === 0) return <div>Корзина пуста</div>;

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

						<button onClick={() => removeFromCart(product._id)}>Удалить</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Basket;
