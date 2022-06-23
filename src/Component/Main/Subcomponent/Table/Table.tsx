import { useState } from 'react';

import './Table.scss'

import { useGetProductsQuery, useNextPageMutation } from '../../../../Redux/ColorsApi/ProductsApi';

const Table = () => {

    const [pageNumber, setPageNumber] = useState<number>(2);

    const { data, error, isLoading, isError } = useGetProductsQuery(pageNumber);

    const [updatePages, result] = useNextPageMutation();

    console.log("dara", data)
    console.log("rws", result)

    isError && console.warn(error)

    const showTableColors = () => !isLoading && data?.data.map((el: any) => (
        <tr key={el.id} style={{ backgroundColor: el.color }}>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.year}</td>
        </tr>
    ));

    const handleChangePagePrev = (e: any) => {
        e.preventDefault()

        if (pageNumber <= 1) {
            setPageNumber(1);
        } else {
            setPageNumber((state) => (state -= 1))
        }
    }

    const handleChangePageNext = (e: any) => {
        e.preventDefault()

        if (pageNumber >= data?.total_pages) {
            setPageNumber(data?.total_pages);
        } else {
            setPageNumber((state) => (state += 1))
        }
    }

    const paginationDiv = () => { updatePages(3) };

    console.log(pageNumber);
    return (
        <section>
            <table className='table'>
                <thead className='table__head'>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Year</th>
                    </tr>
                </thead>
                <tbody className='table__body'>
                    {showTableColors()}
                </tbody>
            </table>
            <div className='pagination'>
                <button className='pagination__btn pagination__btn--prev' onClick={handleChangePagePrev}>Prev</button>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <button className='pagination__btn pagination__btn--next' onClick={handleChangePageNext}>Next</button>
                <button className='pagination__next' onClick={paginationDiv}>test</button>
            </div>
        </section>
    )
}

export default Table;