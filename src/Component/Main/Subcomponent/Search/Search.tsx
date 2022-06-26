import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../../Redux/Hook/Hook';
import { cleanSearch, searchById, setPageNumber } from '../../../../Redux/Slice/SearchSlice';

import './Search.scss'

const Search = () => {
    const [searchParams, setSearchParamas] = useSearchParams();

    const [search, setSearch] = useState<string>(searchParams.get('id') ?? '');

    const inputRef = useRef<HTMLInputElement>(null)

    const dispach = useAppDispatch();

    const pageNumber = useAppSelector(state => state.page.pageNumber);

    useEffect(() => {
        //geting data from url
        dispach(setPageNumber(Number(searchParams.get('page') !== '0' ? searchParams.get('page') ?? 1 : 1)))
        Boolean(searchParams.get('id')) && dispach(searchById(String(searchParams.get('id'))))

        //showing data in url
        setSearchParamas({
            page: `${searchParams.get('page') !== '0' ? searchParams.get('page') ?? 1 : 1}`,
            id: `${!Boolean(searchParams.get('id')) ? search : searchParams.get('id')}`
        })
        // eslint-disable-next-line
    }, [])

    //handle search on enter key
    const handleSearchOnKey = (e: any) => {
        if (e.keyCode === 13 && !isNaN(Number(e.target?.value)) && Number(e.target?.value) !== 0) {
            dispach(searchById(search))
            setSearchParamas({
                page: `${pageNumber}`,
                id: e.target?.value,
            })
        }
    }

    //handle search on btn click 
    const handleSearchOnclick = () => {
        if (!isNaN(Number(inputRef?.current?.value)) && Number(inputRef?.current?.value) !== 0) {
            dispach(searchById(`${Number(inputRef?.current?.value)}`))
            setSearchParamas({
                page: `${pageNumber}`,
                id: `${inputRef?.current?.value}`,
            })
        }
    }

    //adding data to state from input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value))) {
            setSearch(`${Number(e.target.value)}`)
        }
    }

    //clean fun
    const handleCleanInput = () => {
        dispach(cleanSearch())
        setSearch('')
        setSearchParamas({
            page: `${searchParams.get('page') !== '0' ? searchParams.get('page') ?? 1 : 1}`,
            id: '',
        })
    }

    return (
        <section className='search'>
            <input type="text" placeholder='Search by Id' ref={inputRef} value={search} onChange={handleInputChange} onKeyDown={handleSearchOnKey} className='search__input' />
            <div className='search__btn-container'>
                < button className='search__btn search__btn--search' onClick={handleSearchOnclick}>Search</button>
                <button className='search__btn search__btn--clean' onClick={handleCleanInput}>Clean</button>
            </div>
        </section>
    )
}

export default Search;