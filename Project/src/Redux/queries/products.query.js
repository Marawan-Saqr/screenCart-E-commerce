import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsQuery = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/products',
    }),
  }),
});



export const { useGetAllProductsQuery } = productsQuery;