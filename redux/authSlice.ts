import { RootState } from '@/redux';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, token } = useSelector(
    (state: RootState) => state.root.auth
  );
  return { user, isAuthenticated, isLoading, token };
};

export const { setUser, setIsAuthenticated, setIsLoading, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
