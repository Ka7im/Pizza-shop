import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useEffect, useState } from 'react';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://63c96cbcc3e2021b2d573b81.mockapi.io/items')
            .then((data) => data.json())
            .then((res) => {
                setPizzas(res);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);

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
        </div>
    );
};

export default Home;
