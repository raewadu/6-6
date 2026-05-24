import React, { useState } from 'react';
import { useCartQuery } from '../store/cart-query';
import { useRemoveCart } from '../store/cart-remove';
import { Button, Flex, Input } from 'antd';
import { useOrdersMutation } from '../store/order-mutation';

const Basket = () => {
	const { TextArea } = Input;

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const [address, setAddress] = useState('');
	const [comment, setComment] = useState('');

	const { data, isPending, refetch } = useCartQuery();
	const { mutate, isPending: removePending } = useRemoveCart();

	const { mutate: createOrder, isPending: orderPending } = useOrdersMutation();

	const items =
		data?.map(({ product, quantity }) => ({
			productId: product._id,
			quantity,
			price: product.price,
		})) || [];

	if (isPending) return <div>Loading...</div>;

	if (orderPending) return <div>Loading...</div>;

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
						<p className="price">{product.price} сом</p>
						<div className="product_btns">
							<button
								disabled={removePending}
								onClick={() => mutate({ productId: product._id })}
							>
								Убрать из корзины
							</button>
						</div>
					</div>
				))}
			</div>
			<div className="order">
				<h2
					style={{
						width: 1200,
					}}
				>
					Оформление заказа
				</h2>
				<Input
					required
					placeholder="Адрес доставки"
					className="order-input"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<TextArea
					showCount
					maxLength={100}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Комментарий к заказу"
					className="order-input"
				/>
				<button
					disabled={!address}
					onClick={() =>
						createOrder({
							items,
							deliveryAddress: address,
							comment: comment || undefined,
						})
					}
				>
					Оформить заказ
				</button>
			</div>
		</div>
	);
};

export default Basket;
