/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import config from "./../../../../../config/apiConfig";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: `${config.apiUrl}`,
    baseUrl: "http://localhost:7000/api/V1",

    
  }),

  tagTypes: [
    "task",
    
  ],
  endpoints: (builder) => ({}),
});