import { addPizza } from '../../redux/slices/cartSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PizzaBlock = ({ id, imageUrl, title, price, types, sizes }) => {
    const dispatch = useDispatch();
    const count = useSelector((state) => {
        const filteredPizzas = state.cart.pizzas.filter(
            (pizza) => pizza.title === title
        );

        return filteredPizzas.reduce(
            (sum, currentPizza) => (sum += currentPizza.count),
            0
        );
    });

    const [activeTypeIndex, setActiveTypeIndex] = useState(0);
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);
    const typesNames = ['тонкое', 'традиционное'];

    const onClickType = (typeIndex) => {
        setActiveTypeIndex(typeIndex);
    };

    const onClickSize = (sizeIndex) => {
        setActiveSizeIndex(sizeIndex);
    };

    const add = (pizza) => {
        dispatch(addPizza(pizza));
    };

    return (
        <div className='pizza-block'>
            <Link to={`pizzas/${id}`}>
                <img
                    className='pizza-block__image'
                    src={imageUrl}
                    alt='Pizza'
                />
                <h4 className='pizza-block__title'>{title}</h4>
            </Link>
            <div className='pizza-block__selector'>
                <ul>
                    {types.map((item, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => onClickType(index)}
                                className={
                                    activeTypeIndex === index ? 'active' : ''
                                }
                            >
                                {typesNames[item]}
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    {sizes.map((size, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => onClickSize(index)}
                                className={
                                    activeSizeIndex === index ? 'active' : ''
                                }
                            >
                                {size} см.
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className='pizza-block__bottom'>
                <div className='pizza-block__price'>от {price} ₽</div>
                <div
                    className='button button--outline button--add'
                    onClick={() =>
                        add({
                            imageUrl,
                            price,
                            title,
                            type: typesNames[types[activeTypeIndex]],
                            size: sizes[activeSizeIndex],
                            count: 1,
                        })
                    }
                >
                    <svg
                        width='12'
                        height='12'
                        viewBox='0 0 12 12'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                            fill='white'
                        />
                    </svg>
                    <span>Добавить</span>
                    {!!count && <i>{count}</i>}
                </div>
            </div>
        </div>
    );
};

export default PizzaBlock;
