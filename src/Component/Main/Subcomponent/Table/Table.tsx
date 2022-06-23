import './Table.scss'

import { useGetProductsQuery } from '../../../../Redux/ColorsApi/ProductsApi';
import { useAppSelector } from '../../../../Redux/Hook/Hook';

import Pagination from './Subcomponent/Pagination/Pagination';

const Table = () => {

    const pageNumber = useAppSelector(state => state.page.pageNumber);
    const search = useAppSelector(state => state.page.search);

    const { data, error, isLoading, isError } = useGetProductsQuery({ page: pageNumber, id: search === '' ? false : search });
    console.log(!isLoading && data)

    isError && console.warn(error)

    const showTableColorsArr = () => !isLoading && data?.data.map((el: any) => (
        <tr key={el.id} style={{ backgroundColor: el.color }}>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.year}</td>
        </tr>
    ));

    const showTableColorsObj = () => !isLoading && [data?.data].map((el: any) => (
        <tr key={el.id + 1} style={{ backgroundColor: el.color }}>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.year}</td>
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
                    {search === '' ? showTableColorsArr() : showTableColorsObj()}
                </tbody>
            </table>
            {search === '' && <Pagination />}
        </section>
    )
}

export default Table;