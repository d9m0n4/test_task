import './Pagination.scss';

type PaginationPropsT = {
  currentPage: number;
  onChangePage: (page: number) => void;
  totalPages: number;
};

export const Pagination = ({ currentPage, onChangePage, totalPages }: PaginationPropsT) => {
  return (
    <div className="products__pagination">
      <button
        disabled={currentPage === 1 || totalPages === 0}
        onClick={() => onChangePage(currentPage - 1)}>
        Назад
      </button>
      <span>{`Страница ${currentPage} из ${totalPages}`}</span>
      <button
        disabled={currentPage === totalPages || totalPages === 0}
        onClick={() => onChangePage(currentPage + 1)}>
        Вперед
      </button>
    </div>
  );
};
