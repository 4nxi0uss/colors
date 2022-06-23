import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://reqres.in/api/products' }),
    tagTypes: ["Page"],
    endpoints: (builder) => ({
        getProducts: builder.query<any, any>({
            query: ({ page, id = false }) => ({
                url: `/?page=${page}&per_page=5${Boolean(id) === true && `&id=${id}`}`,
                method: 'GET',
            }),
            providesTags: ["Page"]
        }),
    }),
})

export const { useGetProductsQuery } = productsApi
