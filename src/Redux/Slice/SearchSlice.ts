import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    pageNumber: number,
    search: string,
}

const initialState: CounterState = {
    pageNumber: 1,
    search: '',
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
            state.search = action.payload;
        }
    },
})

export const { setPageNumber, incrementPageNumber, decrementPageNumber, searchById } = pageNumberSlice.actions

export default pageNumberSlice.reducer