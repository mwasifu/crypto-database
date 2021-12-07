import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// creating API handlers and managing API


const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '99fbf52345msh33518343a11ef70p10679djsnf13218da7d62'
} 

const baseUrl = 'https://coinranking1.p.rapidapi.com';
const createRequest = (url) => ({
    url, headers: cryptoApiHeaders
})


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/${timePeriod}`)
        }),
        getCryptoHExchange: builder.query({
            query: (exchanges) => createRequest(`/exchanges`)
        })
    })
}); 

export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetCryptoHExchangeQuery} = cryptoApi;

