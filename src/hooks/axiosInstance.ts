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
    // localStorage에서 데이터 가져오기
    const userData = localStorage.getItem('user');

    // 데이터가 존재할 경우 처리
    let token = null; // token 변수 선언

    if (userData) {
      try {
        // JSON 문자열을 객체로 변환
        const parsedData = JSON.parse(userData);

        // accessToken 값 추출 후 token 변수에 저장
        token = parsedData?.state?.user?.accessToken || null;

      } catch (error) {
        console.error('JSON 파싱 오류:', error);
      }
    } else {
      console.log('localStorage에 "user" 데이터가 없습니다.');
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
