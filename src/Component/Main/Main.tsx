import './Main.scss'

import Search from './Subcomponent/Search/Search';
import Table from './Subcomponent/Table/Table';

const Main = () => {
    return (
        <main className='main'>
            <Search />
            <Table />
        </main>
    )
}

export default Main;