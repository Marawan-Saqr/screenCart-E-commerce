import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const websiteQuery = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/products',
    }),
    getAllOrders: builder.query({
      query: () => '/orders',
    }),
  }),
});

export const { useGetAllProductsQuery, useGetAllOrdersQuery } = websiteQuery;