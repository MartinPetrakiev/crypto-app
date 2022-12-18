import { configureStore } from "@reduxjs/toolkit";
import { cryptoApiSlice } from '../features/api/cryptoApi';
import { cryptoNewsApiSlice } from '../features/api/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApiSlice.reducerPath]: cryptoApiSlice.reducer,
        [cryptoNewsApiSlice.reducerPath]: cryptoNewsApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(cryptoApiSlice.middleware, cryptoNewsApiSlice.middleware)
});