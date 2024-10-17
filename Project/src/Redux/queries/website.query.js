import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const websiteQuery = createApi({
  reducerPath: 'websiteQuery', // Changed from 'productsApi' to 'websiteQuery'
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/products',
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/websiteUsers',
        method: 'POST',
        body: userData,
      }),
    }),
    // Add the loginUser mutation
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: '/websiteUsers',
        method: 'GET',
        params: { name: credentials.name, password: credentials.password },
      }),
    }),
  }),
});

export const { 
  useGetAllProductsQuery, 
  useGetAllOrdersQuery, 
  useRegisterUserMutation, 
  useLoginUserMutation // Expose the mutation
} = websiteQuery;