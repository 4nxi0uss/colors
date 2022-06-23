import { useRef } from 'react';

import { useAppDispatch } from '../../../../Redux/Hook/Hook';
import { searchById } from '../../../../Redux/Slice/SearchSlice';

import './Search.scss'

const Search = () => {
    const inputRef = useRef<any>()

    const dispach = useAppDispatch();

    const handleInputOnKey = (e: any) => {
        if (e.keyCode === 13 && !isNaN(Number(e.target.value))) {
            dispach(searchById(`${Number(e.target.value)}`))
        }
    }
    const handleInput = () => {
        if (!isNaN(Number(inputRef?.current?.value))) {
            dispach(searchById(`${Number(inputRef?.current?.value)}`))
        }
    }

    const handleCleanInput = () => {
        dispach(searchById(''))
        inputRef.current.value = '';
    }

    return (
        <section className='search'>
            <input type="text" placeholder='Search by Id' ref={inputRef} onKeyDown={handleInputOnKey} className='search__input' />
            <div className='search__btn-container'>
                < button className='search__btn search__btn--search' onClick={handleInput}>Search</button>
                <button className='search__btn search__btn--clean' onClick={handleCleanInput}>Clean</button>
            </div>
        </section>
    )
}

export default Search;