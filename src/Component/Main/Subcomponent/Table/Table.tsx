import './Table.scss'

import { useGetProductsQuery } from '../../../../Redux/ColorsApi/ProductsApi';
import { useAppSelector } from '../../../../Redux/Hook/Hook';

import Pagination from './Subcomponent/Pagination/Pagination';

const Table = () => {
    //redux state
    const pageNumber = useAppSelector(state => state.page.pageNumber);
    const { searchedId, isSearch } = useAppSelector(state => state.page.search);

    //redux api
    const { data, error, isLoading, isError } = useGetProductsQuery({ page: pageNumber, id: !isSearch ? '' : searchedId });

    isError && console.warn(error)

    //fun showing all paginated data 
    const showTableColorsArr = () => !isLoading && data?.data.map((el) => (
        <tr key={el.id} style={{ backgroundColor: el.color }}>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.year}</td>
        </tr>
    ));

    //fun showing one paginated data
    const showTableColorsObj = () => !isLoading && [data?.data].map((el: any) => (
        <tr key={el?.id + 1} style={{ backgroundColor: el?.color }}>
            <td>{el?.id}</td>
            <td>{el?.name}</td>
            <td>{el?.year}</td>
        </tr>
    ));

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
                    {isLoading
                        ? <tr >
                            <td className='table__body--spinner'></td>
                        </tr>
                        : Boolean(pageNumber > Number(data?.total_pages))
                            ? <tr>
                                <td className='table__body--warn'>Page not found, please try another one</td>
                            </tr>
                            : isError
                                ? <tr>
                                    <td className='table__body--warn'>Color not foud, please search another one!</td>
                                </tr>
                                : !isSearch && data?.data?.length !== 1
                                    ? showTableColorsArr()
                                    : showTableColorsObj()}
                </tbody>
            </table>
            {!isSearch && <Pagination />}
        </section>
    )
}

export default Table;