import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { productsApi } from '../ColorsApi/ProductsApi'
import pageNumberSlice from '../Slice/SearchSlice'

export const store = configureStore({
    reducer: {
        page: pageNumberSlice,
        [productsApi.reducerPath]: productsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
})
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
