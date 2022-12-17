import { configureStore } from "@reduxjs/toolkit";
import { createApi, cryptoApiSlice } from '../featueres/api/cryptoApi';

export default configureStore({
    reducer: {
        [cryptoApiSlice.reducerPath]: cryptoApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(cryptoApiSlice.middleware)
});