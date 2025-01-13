import axios from 'axios';
import { toast } from 'react-toastify';

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

// Axios 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      toast.error('로그인이 필요합니다! 로그인 페이지로 이동합니다.');
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Axios 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios 응답 에러:', error);
    return Promise.reject(error);
  },
);
