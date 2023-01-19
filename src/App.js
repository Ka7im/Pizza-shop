import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import { useEffect, useState } from 'react';

function App() {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch('https://63c96cbcc3e2021b2d573b81.mockapi.io/items')
            .then((data) => data.json())
            .then((res) => setPizzas(res));
    }, []);

    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <div className='container'>
                    <div className='content__top'>
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className='content__title'>Все пиццы</h2>
                    <div className='content__items'>
                        {pizzas.map((pizza) => {
                            return <PizzaBlock key={pizza.id} {...pizza} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
