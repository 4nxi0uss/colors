import { useGetProductsQuery } from '../../../../Redux/ColorsApi/ProductsApi';
import './Table.scss'

const Table = () => {

    const { data, error, isLoading, isError } = useGetProductsQuery(null);

    isError && console.warn(error)

    const showTableColors = () => !isLoading && data?.data.map((el: any) => (
        <tr style={{ backgroundColor: el.color }}>
            <td>{el.id}</td>
            <td>{el.name}</td>
            <td>{el.year}</td>
        </tr>
    ));

    return (
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
    )
}

export default Table;