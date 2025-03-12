import {
  API_CHILD_LOGIN,
  API_LOGIN,
  API_REGISTER,
} from "../config/url-constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { apiUrl } from "../config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      console.log(localStorage.getItem("token"));
      const token = localStorage.getItem("token");
      headers.set("Accept", "application/json");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string; message: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: API_LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<
      { token: string },
      {
        name: string;
        password: string;
        email: string;
        password_confirmation: string;
      }
    >({
      query: (user) => ({
        url: API_REGISTER,
        method: "POST",
        body: user,
      }),
    }),
    childrenlogin: builder.mutation({
      query: ({ id, parentId, questionId, otp }) => ({
        url: API_CHILD_LOGIN(id),
        method: "POST",
        body: { parentId, questionId, otp },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useChildrenloginMutation,
} = apiSlice;
