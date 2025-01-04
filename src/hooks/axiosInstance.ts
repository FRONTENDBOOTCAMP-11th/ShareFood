import axios from 'axios';

const REQUEST_TIME = 25000;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: REQUEST_TIME,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    'client-id': 'final07',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
