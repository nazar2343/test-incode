import React, { useEffect, useRef } from 'react';
import { Sort, sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectFilter,
	setCategoryId,
	setCurrentPageCount,
	setFilters,
} from '../redux/slices/filterSlice';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzasSlice';
import Categories from '../components/Categories';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { categoryId, sort, currentPageCount, searchValue } =
		useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaData);

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (page: number) => {
		dispatch(setCurrentPageCount(page));
	};

	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			// @ts-ignore
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPageCount,
			})
		);

		window.scrollTo(0, 0);
	};

	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPageCount,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPageCount]);

	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			// isSearch.current = true
		}
	}, []);

	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPageCount]);

	const pizzas = items.map((obj: any) => (
		<Link key={obj.id} to={`/pizza/${obj.id}`}>
			<PizzaBlock {...obj} />
		</Link>
	));
	const skeletons = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className='content__title'>Всі піцци</h2>
			{status === 'error' ? (
				<div className='content__error-info'>
					<h2>Произошла ошибка 😕</h2>
					<p>
						К сожалению, не удалось получить питсы. Попробуйте повторить попытку
						позже.
					</p>
				</div>
			) : (
				<div className='content__items'>
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}
			<Pagination value={currentPageCount} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
