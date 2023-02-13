import axios from 'axios';
import { Spinner } from 'components';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './PizzaPage.module.scss';

interface IPizzaPage {
    imageUrl: string;
    title: string;
    price: number;
}

const PizzaPage = () => {
    const { pizzaId } = useParams();
    const [pizza, setPizza] = useState<IPizzaPage>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchOnePizza(id: string | undefined) {
            try {
                const { data } = await axios.get<IPizzaPage>(
                    `https://63c96cbcc3e2021b2d573b81.mockapi.io/items/${id}`
                );

                setPizza(data);
                setIsLoading(false);
            } catch (e) {
                alert('Произошла ошибка при получении пиццы 😕');
                navigate('/');
            }
        }

        fetchOnePizza(pizzaId);
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className='container'>
            <div className={styles.wrapper} data-testid='pizza-page'>
                <img src={pizza?.imageUrl} alt='pizza' />
                <h2>{pizza?.title}</h2>
                <div className={styles.price}>{pizza?.price} ₽</div>
                <div className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vitae doloribus est non totam, eaque qui maxime impedit
                    laborum a ab laudantium nostrum, nisi autem quasi fugit
                    veniam quas accusamus! Eaque.
                </div>
            </div>
            <Link to='/'>
                <button className='button button--outline button--add'>
                    <span>Назад</span>
                </button>
            </Link>
        </div>
    );
};

export default PizzaPage;
