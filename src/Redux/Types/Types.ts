//types for state

export interface PageState {
    pageNumber: number,
    search: {
        searchedId: string,
        isSearch: boolean
    },
}

//types for API
export interface ApiQueryTypes {
    page: number,
    id: string
}

export interface ApiResTypes {
    total_pages: number,
    data: [{
        color: string,
        id: number,
        name: string,
        year: number,
    }],
}