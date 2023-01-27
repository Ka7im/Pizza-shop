import ReactPaginate from 'react-paginate';
import { useAppDispatch } from 'redux/redux-hook';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { memo } from 'react';

import styles from './Pagination.module.scss';

const Pagination = memo(() => {
    const dispatch = useAppDispatch();

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel='...'
            nextLabel='>'
            onPageChange={({ selected }) =>
                dispatch(setCurrentPage(++selected))
            }
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel='<'
            renderOnZeroPageCount={undefined}
        />
    );
});

export default Pagination;
