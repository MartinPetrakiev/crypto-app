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
            query: (count) => {
                return `/coins?limit=${count}`;
            }
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => {
                return `/coin/${coinId}`;
            },
        }),
        getCryptoHistory: builder.query({
            query: ({ coinId, timeperiod }) => {
                return `coin/${coinId}/history?timeperiod=${timeperiod}`;
            },
        }),

        // Note: To access this endpoint you need premium plan
        getExchanges: builder.query({
            query: () => {
                return '/exchanges';
            },
        }),
    })
});

export const {
    useGetCryptosQuery,
    useGetCryptoDetailsQuery,
    useGetExchangesQuery,
    useGetCryptoHistoryQuery,
} = cryptoApiSlice; 