import './Pagination.scss'

import { useGetProductsQuery } from '../../../../../../Redux/ColorsApi/ProductsApi';

import { useAppDispatch, useAppSelector } from '../../../../../../Redux/Hook/Hook';
import { decrementPageNumber, incrementPageNumber, setPageNumber } from '../../../../../../Redux/Slice/SearchSlice';

const Pagination = () => {

    const dispach = useAppDispatch();

    const pageNumber = useAppSelector(state => state.page.pageNumber);
    const search = useAppSelector(state => state.page.search);

    const { data, error, isLoading, isError } = useGetProductsQuery({ page: pageNumber, id: search === '' ? false : search });

    isError && console.warn(error)

    const handleChangePagePrev = (e: any) => {
        e.preventDefault()
        if (pageNumber <= 1) {
            dispach(setPageNumber(1))
        } else {
            dispach(decrementPageNumber())
        }
    }

    const handleChangePageNext = (e: any) => {
        e.preventDefault()

        if (pageNumber >= data?.total_pages) {
            dispach(setPageNumber(data?.total_pages))
        } else {
            dispach(incrementPageNumber())
        }
    }

    const paginationDiv = () => {
        let pageArr = [];
        for (let i = 1; i <= data?.total_pages; i++) {
            pageArr.push(i);
        }

        return pageArr.map((el) => <li className={`pagination__list__item ${el === pageNumber && "pagination__list__item--active"}`} key={el} onClick={() => dispach(setPageNumber(Number(el)))}>{el}</li>)
    };

    return (
        <section>
            <div className='pagination'>
                <button disabled={pageNumber === 1 && true} className={pageNumber !== 1 ? `pagination__btn pagination__btn--prev` : `pagination__btn--disabled`} onClick={handleChangePagePrev}>{`< prev`}</button>
                <ul className='pagination__list'>
                    {!isLoading && paginationDiv()}
                </ul>
                <button disabled={pageNumber === data?.total_pages && true} className={pageNumber !== data?.total_pages ? `pagination__btn pagination__btn--next` : `pagination__btn--disabled`} onClick={handleChangePageNext}>{`next >`}</button>
            </div>
        </section>
    )
}

export default Pagination;