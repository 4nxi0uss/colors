import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PageState } from '../Types/Types';

//initial state
const initialState: PageState = {
    pageNumber: 1,
    search: {
        searchedId: '',
        isSearch: false
    },
}

export const pageNumberSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        incrementPageNumber: (state) => {
            state.pageNumber += 1;
        },
        decrementPageNumber: (state) => {
            state.pageNumber -= 1;
        },
        setPageNumber: (state, action: PayloadAction<number>) => {
            state.pageNumber = action.payload;
        },
        searchById: (state, action: PayloadAction<string>) => {
            state.search.searchedId = action.payload;
            state.search.isSearch = true;
        },
        cleanSearch: (state) => {
            state.search.searchedId = '';
            state.search.isSearch = false;
        }
    },
})

export const { setPageNumber, incrementPageNumber, decrementPageNumber, searchById, cleanSearch } = pageNumberSlice.actions

export default pageNumberSlice.reducer