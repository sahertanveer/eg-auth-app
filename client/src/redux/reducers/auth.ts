import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../types/auth';

const initialState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const { setUser, setError, logout } = authSlice.actions;

export default authSlice.reducer;
