import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const REQUEST_TIME = 25000;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: REQUEST_TIME,
  headers: {
    'Content-Type': 'application/json', // request의 데이터 타입
    accept: 'application/json', // response의 데이터 타입
    'client-id': 'final07',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().user?.accessToken;
    if (useAuthStore.getState().user?.accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
); 
