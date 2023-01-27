import React from 'react';
import styles from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
	value: number;
	onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ onChangePage, value }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel='...'
			nextLabel='>'
			previousLabel='<'
			onPageChange={(event) => onChangePage(event.selected + 1)}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={value - 1}
		/>
	);
};

export default Pagination;
