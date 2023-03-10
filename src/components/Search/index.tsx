import { useRef, useState, memo } from 'react';
import styles from './Search.module.scss';
import closeIcon from '../../assets/img/closeIcon.svg';
import { useDebounce } from '../../hooks/useDebounce';
import { setSearchValue } from '../../redux/slices/filterSlice';
import { useAppDispatch } from 'redux/redux-hook';

const Search = memo(() => {
    const dispatch = useAppDispatch();
    const [value, setValue] = useState('');

    const search = (value: string) => dispatch(setSearchValue(value));

    const debouncedSearch = useDebounce(search, 500);

    const inputRef = useRef<HTMLInputElement>(null);

    const onClickClear = () => {
        setValue('');
        dispatch(setSearchValue(''));
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                viewBox='0 0 32 32'
                xmlns='http://www.w3.org/2000/svg'
            >
                <title />
                <g id='search'>
                    <path d='M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z' />
                </g>
            </svg>
            <input
                ref={inputRef}
                className={styles.input}
                placeholder='Поиск пиццы ...'
                onChange={(e) => {
                    setValue(e.target.value);
                    debouncedSearch(e.target.value);
                }}
                value={value}
            />
            {value && (
                <img
                    src={closeIcon}
                    alt='closeIcon'
                    className={styles.closeIcon}
                    onClick={onClickClear}
                />
            )}
        </div>
    );
});

export default Search;
