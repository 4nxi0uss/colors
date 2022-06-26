import './Pagination.scss'

import { useSearchParams } from 'react-router-dom';

import { useGetProductsQuery } from '../../../../../../Redux/ColorsApi/ProductsApi';

import { useAppDispatch, useAppSelector } from '../../../../../../Redux/Hook/Hook';
import { decrementPageNumber, incrementPageNumber, setPageNumber } from '../../../../../../Redux/Slice/SearchSlice';

const Pagination = () => {
    // eslint-disable-next-line
    const [searchParams, setSearchParamas] = useSearchParams();

    const dispach = useAppDispatch();

    const pageNumber = useAppSelector(state => state.page.pageNumber);
    const { searchedId, isSearch } = useAppSelector(state => state.page.search);
    const { data, error, isLoading, isError } = useGetProductsQuery({ page: pageNumber, id: !isSearch ? '' : searchedId });

    isError && console.warn(error)

    const handleChangePagePrev = (e: any) => {
        e.preventDefault()
        if (pageNumber <= 1) {
            dispach(setPageNumber(1));
            setSearchParamas({
                page: `${1}`
            })
        } else {
            dispach(decrementPageNumber())
            setSearchParamas({
                page: `${pageNumber - 1}`
            })
        }
    }

    const handleChangePageNext = (e: any) => {
        e.preventDefault()

        if (pageNumber >= data?.total_pages) {
            dispach(setPageNumber(data?.total_pages))
            setSearchParamas({
                page: `${data?.total_pages}`
            })
        } else {
            dispach(incrementPageNumber())
            setSearchParamas({
                page: `${pageNumber + 1}`
            })
        }
    }

    const paginationDiv = () => {
        let pageArr = [];
        for (let i = 1; i <= data?.total_pages; i++) {
            pageArr.push(i);
        }

        return pageArr.map((el) => <li className={`pagination__list__item ${el === pageNumber && "pagination__list__item--active"}`} key={el} onClick={() => {
            dispach(setPageNumber(Number(el))); setSearchParamas({
                page: `${el}`
            })
        }}>{el}</li>)
    };

    return (
        <section>
            <div className='pagination'>
                <button disabled={pageNumber === 1 && true} className={pageNumber !== 1 ? `pagination__btn pagination__btn--prev` : `pagination__btn--disabled`} onClick={handleChangePagePrev}>{`< previous`}</button>
                <ul className='pagination__list'>
                    {!isLoading && paginationDiv()}
                </ul>
                <button disabled={pageNumber === data?.total_pages && true} className={pageNumber !== data?.total_pages ? `pagination__btn pagination__btn--next` : `pagination__btn--disabled`} onClick={handleChangePageNext}>{`next >`}</button>
            </div>
        </section>
    )
}

export default Pagination;