import React from 'react';
import { useCartQuery } from '../store/cart-query';
import { useRemoveCart } from '../store/cart-remove';

const Basket = () => {
	const { data, isPending, refetch } = useCartQuery();
	const { mutate } = useRemoveCart();

	if (isPending) return <div>Loading...</div>;
	console.log(data);

	if (data?.length === 0) return <div>Нет данных</div>;

	return (
		<div className="container">
			<button onClick={refetch}>Обновить</button>
			<div className="products">
				{data.map(({ product, quantity }) => (
					<div key={product._id} className="product_block">
						<div>
							<img src={product.image} alt={`${product.name}`} />
						</div>
						<div>
							<h3>{product.name}</h3>
							<p>Количество:{quantity}</p>
						</div>
						<p>{product.price}</p>
						<div className="product_btns">
							<button onClick={() => mutate({ productId: product._id })}>
								Убрать из корзины
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Basket;
