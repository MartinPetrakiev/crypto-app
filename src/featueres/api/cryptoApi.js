import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://coinranking1.p.rapidapi.com';

export const cryptoApiSlice = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '10dbc9f8c7msh6744ea8363ff946p1e23dejsn664f2f043285');
            headers.set('X-RapidAPI-Host', 'coinranking1.p.rapidapi.com',);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => '/coins'
        })
    })
});

export const { useGetCryptosQuery } = cryptoApiSlice; 