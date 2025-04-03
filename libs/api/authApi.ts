import apiSlice from '@/libs/api/apiSlice';
import { removeItemFromStorage } from '@/libs/expoSecureStore';
import { User } from '@/@types/auth';
import { setUser, setIsAuthenticated, setToken, logout } from '@/redux/authSlice';

interface LoginResponse {
  token: string;
  userPayload: User;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.token));
          dispatch(setUser(data.userPayload));
          dispatch(setIsAuthenticated(true));
          // await saveItemToStorage('token', data.token);
          // await saveItemToStorage('user', data.userPayload);
        } catch (error) {
          await removeItemFromStorage('token');
          await removeItemFromStorage('user');
        }
      },
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await removeItemFromStorage('token');
          await removeItemFromStorage('user');
          dispatch(logout());
        } catch (error) {
          console.error('Logout failed:', error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useLogoutMutation } = authApi;
