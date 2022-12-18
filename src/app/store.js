import { configureStore } from "@reduxjs/toolkit";
import { cryptoApiSlice } from '../featueres/api/cryptoApi';
import { cryptoNewsApiSlice } from '../featueres/api/cryptoNewsApi';

export default configureStore({
    reducer: {
        [cryptoApiSlice.reducerPath]: cryptoApiSlice.reducer,
        [cryptoNewsApiSlice.reducerPath]: cryptoNewsApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(cryptoApiSlice.middleware, cryptoNewsApiSlice.middleware)
});