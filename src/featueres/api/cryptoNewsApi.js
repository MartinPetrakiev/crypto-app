import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';

export const cryptoNewsApiSlice = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('X-BingApis-SDK', 'true');
            headers.set('X-RapidAPI-Key', '10dbc9f8c7msh6744ea8363ff946p1e23dejsn664f2f043285');
            headers.set('X-RapidAPI-Host', 'bing-news-search1.p.rapidapi.com',);
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