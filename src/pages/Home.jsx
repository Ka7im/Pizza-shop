import { useRef } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useEffect } from 'react';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const Home = () => {
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sortBy = useSelector((state) => state.filters.sortType.sortProperty);
    const activeCategoryIndex = useSelector(
        (state) => state.filters.activeCategoryIndex
    );
    const currentPage = useSelector((state) => state.filters.currentPage);
    const pizzas = useSelector((state) => state.pizzas.items);
    const status = useSelector((state) => state.pizzas.status);
    const searchValue = useSelector((state) => state.filters.searchValue);

    const categorySort =
        activeCategoryIndex === 0 ? '' : `category=${activeCategoryIndex}`;

    const getPizzas = async () => {
        try {
            dispatch(
                fetchPizzas({ categorySort, sortBy, currentPage, searchValue })
            );
        } catch (error) {
            alert('Ошибка при получении пицц');
        }
    };

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search, {
                ignoreQueryPrefix: true,
            });

            dispatch(setFilters(params));

            isSearch.current = true;
        }
    }, []);

    useEffect(() => {
        if (
            !isSearch.current ||
            window.location.search ===
                '?activeCategoryIndex=0&sortBy=rating&currentPage=1'
        ) {
            getPizzas();
        }

        isSearch.current = false;

        window.scrollTo(0, 0);
    }, [categorySort, sortBy, currentPage, searchValue]);

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify(
                {
                    activeCategoryIndex,
                    sortBy,
                    currentPage,
                },
                { addQueryPrefix: true }
            );

            navigate(queryString);
        }

        isMounted.current = true;
    }, [activeCategoryIndex, sortBy, currentPage]);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            {status === 'error' ? (
                <div className='content__error-info'>
                    <h2>
                        Произошла ошибка <span>😕</span>
                    </h2>
                    <p>
                        К сожалению, не удалось получить питсы. Попробуйте
                        повторить попытку позже.
                    </p>
                </div>
            ) : (
                <div className='content__items'>
                    {status === 'loading'
                        ? [...new Array(4)].map((_, index) => {
                              return <Skeleton key={index} />;
                          })
                        : pizzas.map((pizza) => {
                              return <PizzaBlock key={pizza.id} {...pizza} />;
                          })}
                </div>
            )}
            <Pagination />
        </div>
    );
};

export default Home;
