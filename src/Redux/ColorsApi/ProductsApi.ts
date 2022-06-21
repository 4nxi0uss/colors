import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/products' }),
    endpoints: (builder) => ({
        getProducts: builder.query<any, any>({
            query: () => ({
                url: "/?per_page=5",
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetProductsQuery } = productsApi
