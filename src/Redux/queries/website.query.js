import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const websiteQuery = createApi({
  reducerPath: 'websiteQuery',
  baseQuery: fetchBaseQuery({ baseUrl: "https://loud-polished-grouse.glitch.me" }), // Replace localhost with Glitch URL
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
  useLoginUserMutation
} = websiteQuery;
