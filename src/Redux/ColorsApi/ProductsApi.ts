import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiQueryTypes, ApiResTypes } from '../Types/Types'

//api for fetching data 
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/products' }),
    tagTypes: ["Page"],
    endpoints: (builder) => ({
        getProducts: builder.query<ApiResTypes, ApiQueryTypes>({
            query: ({ page, id = false }) => ({
                url: `/?page=${page}&per_page=5&id=${id}`,
                method: 'GET',
            }),
            providesTags: ["Page"]
        }),
    }),
})

export const { useGetProductsQuery } = productsApi
