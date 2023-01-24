import React, { useContext, useRef } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { setFilters } from '../redux/slices/filterSlice';

const Home = () => {
    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const sortBy = useSelector((state) => state.filters.sortType.sortProperty);
    const activeCategoryIndex = useSelector(
        (state) => state.filters.activeCategoryIndex
    );
    const currentPage = useSelector((state) => state.filters.currentPage);
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { searchValue } = useContext(SearchContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categorySort =
        activeCategoryIndex === 0 ? '' : `category=${activeCategoryIndex}`;

    const fetchPizzas = () => {
        setIsLoading(true);

        axios
            .get(
                `https://63c96cbcc3e2021b2d573b81.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=asc&${categorySort}&search=${searchValue}`
            )
            .then((response) => {
                setPizzas(response.data);
                setIsLoading(false);
            });
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
            fetchPizzas();
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
            <div className='content__items'>
                {isLoading
                    ? [...new Array(8)].map((_, index) => {
                          return <Skeleton key={index} />;
                      })
                    : pizzas.map((pizza) => {
                          return <PizzaBlock key={pizza.id} {...pizza} />;
                      })}
            </div>
            <Pagination />
        </div>
    );
};

export default Home;
