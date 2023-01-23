import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

const Pagination = ({ onClickPage }) => {
    const dispatch = useDispatch();

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
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
