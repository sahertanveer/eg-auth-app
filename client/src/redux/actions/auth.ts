import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { BackendInstance, config } from '../../config';
import { updateAlert } from './alert';
import {
  SignupFormData,
  SigninFormData,
  IUser,
  AuthState,
} from '../types/auth';
import { setUser, setError, logout as logoutAction } from '../reducers/auth';

// Signup action
export const signup = createAsyncThunk<IUser | null, SignupFormData>(
  'auth/signup',
  async (formData, { dispatch }) => {
    const body = JSON.stringify(formData);

    try {
      const res = await BackendInstance.post('auth/signup', body, config);
      dispatch(
        updateAlert({
          place: 'tc',
          message: 'User registered successfully!',
          type: 'success',
        }),
      );

      const user = res.data as IUser;
      dispatch(setUser(user));

      return user;
    } catch (err: any) {
      const errors = handleError(err);
      errors.forEach((error) => {
        dispatch(updateAlert({ place: 'tc', message: error, type: 'danger' }));
      });

      dispatch(setError('Signup failed'));

      return null;
    }
  },
);

// Signin action
export const signin = createAsyncThunk<IUser | null, SigninFormData>(
  'auth/signin',
  async (formData, { dispatch }) => {
    const body = JSON.stringify(formData);

    try {
      const res = await BackendInstance.post('auth/signin', body, config);
      dispatch(
        updateAlert({
          place: 'tc',
          message: 'Login Successful!',
          type: 'success',
        }),
      );

      const user = res.data as IUser;
      dispatch(setUser(user));

      return user;
    } catch (err: any) {
      const errors = handleError(err);
      errors.forEach((error) => {
        dispatch(updateAlert({ place: 'tc', message: error, type: 'danger' }));
      });

      dispatch(setError('Signin failed'));

      return null;
    }
  },
);

export const loadUser = createAsyncThunk<
  IUser | null,
  void,
  { state: AuthState }
>('auth/userLoaded', async (_, { dispatch, getState }) => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    dispatch(setError('User session expired'));
    return null;
  }

  try {
    const res = await BackendInstance.get('auth/userLoaded', {
      ...config,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const user = res.data as IUser;
    dispatch(setUser(user));

    return user;
  } catch (err: any) {
    const errors = handleError(err);
    errors.forEach((error) => {
      dispatch(updateAlert({ place: 'tc', message: error, type: 'danger' }));
    });

    dispatch(setError('User session expired'));

    return null;
  }
});

export const logout = createAsyncThunk<void, void, { state: AuthState }>(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      const res = await BackendInstance.get('auth/logout', config);
      dispatch(
        updateAlert({
          place: 'tc',
          message: 'Logout Successfully!',
          type: 'success',
        }),
      );

      dispatch(logoutAction());
    } catch (err) {
      const errors = handleError(err);
      errors.forEach((error) => {
        dispatch(updateAlert({ place: 'tc', message: error, type: 'danger' }));
      });

      dispatch(setError('Logout failed'));
    }
  },
);

function handleError(err: any): string[] {
  if (err.response && err.response.data) {
    const errorResponse = err.response.data;
    if (typeof errorResponse === 'object') {
      return [errorResponse.message];
    } else {
      return errorResponse.map((error: any) => error.message);
    }
  } else {
    return ['An error occurred. Please try again.'];
  }
}
