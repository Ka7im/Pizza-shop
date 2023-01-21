const Categories = ({ onClickCategory, activeCategoryIndex }) => {
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
