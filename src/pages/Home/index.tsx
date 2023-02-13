import { useRef, memo, useEffect } from 'react';
import { Categories, Sort, Pagination, Skeleton, PizzaBlock } from 'components';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters, SortProperty } from '../../redux/slices/filterSlice';
import { fetchPizzas } from '../../redux/slices/pizzaSlice/pizzasSlice';
import { useAppDispatch, useAppSelector } from 'redux/redux-hook';

const Home = memo(() => {
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const sortBy = useAppSelector(
        (state) => state.filters.sortType.sortProperty
    );
    const activeCategoryIndex = useAppSelector(
        (state) => state.filters.activeCategoryIndex
    );
    const currentPage = useAppSelector((state) => state.filters.currentPage);
    const pizzas = useAppSelector((state) => state.pizzas.items);
    const status = useAppSelector((state) => state.pizzas.status);
    const searchValue = useAppSelector((state) => state.filters.searchValue);

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
            }) as {
                activeCategoryIndex: string;
                sortBy: SortProperty;
                currentPage: string;
            };

            dispatch(
                setFilters({
                    activeCategoryIndex: Number(params.activeCategoryIndex),
                    sortBy: params.sortBy,
                    currentPage: Number(params.currentPage),
                })
            );

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
});

export default Home;
