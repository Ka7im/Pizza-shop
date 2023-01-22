import React, { useContext } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const [activeSortIndex, setActiveSortIndex] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const { searchValue } = useContext(SearchContext);

    let sortBy;

    switch (activeSortIndex) {
        case 0:
            sortBy = 'rating';
            break;
        case 1:
            sortBy = 'price';
            break;
        case 2:
            sortBy = 'title';
            break;
        default:
            throw Error('Unknown active sort index');
    }

    const categorySort =
        activeCategoryIndex === 0 ? '' : `category=${activeCategoryIndex}`;

    const onClickCategory = (categoryIndex) => {
        setActiveCategoryIndex(categoryIndex);
    };

    const onClickItem = (item, index) => {
        setActiveSortIndex(index);
        setIsVisible(false);
    };

    useEffect(() => {
        setIsLoading(true);
        fetch(
            `https://63c96cbcc3e2021b2d573b81.mockapi.io/items?page=${currentPage}&limit=4&sortBy=${sortBy}&order=asc&${categorySort}&search=${searchValue}`
        )
            .then((data) => data.json())
            .then((res) => {
                setPizzas(res);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categorySort, sortBy, currentPage, searchValue]);

    return (
        <div className='container'>
            <div className='content__top'>
                <Categories
                    onClickCategory={onClickCategory}
                    activeCategoryIndex={activeCategoryIndex}
                />
                <Sort
                    onClickItem={onClickItem}
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                    activeSortIndex={activeSortIndex}
                />
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
            <Pagination onClickPage={(page) => setCurrentPage(page)} />
        </div>
    );
};

export default Home;
