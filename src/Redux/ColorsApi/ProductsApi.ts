import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/products' }),
    tagTypes: ["Page"],
    endpoints: (builder) => ({
        getProducts: builder.query<any, number>({
            query: (page) => ({
                url: `/?page=${page}&per_page=5`,
                method: 'GET',
            }),
            providesTags: ["Page"]
        }),
        nextPage: builder.mutation<any, number>({
            query: (page) => ({
                url: `/?page=${page}&per_page=5`,
                method: 'GET',
            }),
            invalidatesTags: ["Page"]
        }),
    }),
})

export const { useGetProductsQuery, useNextPageMutation } = productsApi
