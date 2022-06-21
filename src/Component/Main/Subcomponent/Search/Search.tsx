import { useState } from 'react';

import './Search.scss'

const Search = () => {
    const [search, setSearch] = useState<string>('')

    return (
        <section className='search'>
            <input type="text" onChange={(e) => { setSearch(e.target.value) }} className='search__input' />
            <div className='search__btns-container'>
                < button className='search__btn search__btn--search'>Search</button>
                <button className='search__btn search__btn--clean'>Clean</button>
            </div>
        </section>
    )
}

export default Search;