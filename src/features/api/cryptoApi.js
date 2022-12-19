import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

export const cryptoApiSlice = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', process.env.REACT_APP_RAPIDAPI_KEY);
            headers.set('X-RapidAPI-Host', process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST);
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
                return `coin/${coinId}/history?timePeriod=${timeperiod}`;
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