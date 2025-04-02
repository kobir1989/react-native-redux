import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { env } from '@/libs/config/env';
import { getItemFromStorage } from '@/libs/expoSecureStore';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = getItemFromStorage('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (_builder) => ({}),
});

export default apiSlice;
