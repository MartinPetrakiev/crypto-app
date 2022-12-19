import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

export const cryptoNewsApiSlice = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-BingApis-SDK', 'true');
            headers.set('X-RapidAPI-Key', process.env.REACT_APP_RAPIDAPI_KEY);
            headers.set('X-RapidAPI-Host', process.env.REACT_APP_NEWS_RAPIDAPI_HOST);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) => {
                return `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Week&count=${count}`;
            }
        })
    })
});

export const { useGetCryptoNewsQuery } = cryptoNewsApiSlice; 