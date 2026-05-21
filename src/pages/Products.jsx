import React from 'react';
import { useProductQuery } from '../store/products-query';
import { useToggleFavorite } from '../store/favorites-mutation';
import './style.css';
import { useAuth } from '../hooks/use-auth';
import { toast } from 'sonner';
import { useAddToCart } from '../store/cart-add';

const Products = () => {
	const { data, isPending } = useProductQuery();
	const { mutate } = useToggleFavorite();
	const { mutate: addToCart } = useAddToCart();

	const isAuth = useAuth((state) => state.isAuth);

	if (isPending) return <div>Loading...</div>;

	const addToBasket = () => {
		if (isAuth) {
		} else {
			toast.info('Сперва войдите в аккаунт');
		}
	};

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
						<div className="product_btns">
							<button onClick={() => addToCart(product.id)}>В корзину</button>
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
					</div>
				))}
			</div>
		</div>
	);
};

export default Products;
