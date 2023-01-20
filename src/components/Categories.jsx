import { useState } from 'react';

const Categories = () => {
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые',
    ];

    const onClickCategory = (categoryIndex) => {
        setActiveCategoryIndex(categoryIndex);
    };

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
                            onClick={() => onClickCategory(index)}
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
