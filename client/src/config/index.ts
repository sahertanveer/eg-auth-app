import axios from 'axios';
export const backendUrl = process.env.REACT_APP_BACKEND_API as string;

export const BackendInstance = axios.create({
  baseURL: `${backendUrl}/`,
  withCredentials: true,
});

export const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};
