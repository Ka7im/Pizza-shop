import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategoryIndex } from '../redux/slices/filterSlice';

const Categories = () => {
    const dispatch = useDispatch();
    const activeCategoryIndex = useSelector(
        (state) => state.filters.activeCategoryIndex
    );

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];

    return (
        <div className='categories'>
            <ul>
                {categories.map((category, index) => {
                    return (
                        <li
                            key={index}
                            className={
                                activeCategoryIndex === index ? 'active' : ''
                            }
                            onClick={() =>
                                dispatch(setActiveCategoryIndex(index))
                            }
                        >
                            {category}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
