import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ onClickPage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel='...'
            nextLabel='>'
            onPageChange={({ selected }) => {
                onClickPage(++selected);
            }}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel='<'
            renderOnZeroPageCount={null}
        />
    );
};

export default Pagination;
