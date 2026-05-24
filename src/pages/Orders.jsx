import React from 'react';
import { useOrdersQuery } from '../store/order-query';

const Orders = () => {
	const { data, isPending, refetch } = useOrdersQuery();

	if (isPending) return <div>Loading...</div>;

	if (data?.length === 0) return <div>Нет данных</div>;
	console.log(data[0].items);

	return (
		<div className="container">
			<button onClick={refetch}>Обновить</button>
			<div className="products">
				{data.map((order) => (
					<div key={order._id} className="order_block">
						<div className="order-info">
							<h2>Номер заказа: {order._id}</h2>
							<h4>Адрес доставки: {order.deliveryAddress}</h4>
							<p>Комментарий: {order.comment}</p>
							<p>Дата создания: {order.createdAt}</p>
							<p>Status: {order.status}</p>
							<p className="price">Итоговая сумма: {order.totalPrice} сом</p>
						</div>
						{order.items.map((item) => (
							<div key={order.createdAt} className="order_item">
								<img src={item.product?.image} alt={item.product?.name} />
								<h4>{item.product?.name}</h4>
								<p>Количество: {item.quantity}</p>
								<p className="price">{item.price} сом</p>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default Orders;
