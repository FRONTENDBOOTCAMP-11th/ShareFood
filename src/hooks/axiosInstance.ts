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

// Axios 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // const userData =
    //   localStorage.getItem('user') || sessionStorage.getItem('user');

    const userData =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');

    let token = null;

    if (userData) {
      try {
        // const parsedData = JSON.parse(userData);
        // token = parsedData?.state?.accessToken || null;

        // accessToken 값 추출 후 token 변수에 저장
        token = userData || null;
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
      }
    } else {
      console.log('저장된 정보가 없습니다.');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
