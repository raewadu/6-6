import React from 'react';
import { useProductQuery } from '../store/products-query';
import { useToggleFavorite } from '../store/favorites-mutation';
import './style.css';
import { useAuth } from '../hooks/use-auth';
import { toast } from 'sonner';
import { useCartQuery } from '../store/cart-query';
import { useAddCart } from '../store/cart-add';
import Search from '../features/Filters/Filters';
import { useFilters } from '../hooks/use-filter';
import { useDebounce } from '../hooks/use-debounce';

const Products = () => {
	const search = useFilters((state) => state.search);
	const selectCategory = useFilters((state) => state.category);
	const minPrice = useFilters((state) => state.minPrice);
	const maxPrice = useFilters((state) => state.maxPrice);

	const debouncedSearch = useDebounce(search, 300);

	const { data, isPending } = useProductQuery({
		search: debouncedSearch,
		category: selectCategory,
		minPrice: minPrice || undefined,
		maxPrice: maxPrice || undefined,
	});
	const { mutate } = useToggleFavorite();
	const { mutate: addToCart } = useAddCart();

	const isAuth = useAuth((state) => state.isAuth);

	const addToBasket = () => {
		if (isAuth) {
		} else {
			toast.info('Сперва войдите в аккаунт');
		}
	};

	return (
		<div className="container">
			<Search />

			<div className="products">
				{isPending ? (
					<div>Loading...</div>
				) : (
					data?.map((product) => (
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
								<button onClick={() => addToCart({ productId: product._id })}>
									В корзину
								</button>
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
					))
				)}
			</div>
		</div>
	);
};

export default Products;
