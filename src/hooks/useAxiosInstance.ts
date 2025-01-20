import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';

const REFRESH_URL = '/auth/refresh';

function useAxiosInstance() {
  const { user, setUser } = useAuthStore();

  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000 * 15,
    headers: {
      'Content-Type': 'application/json', // request의 데이터 타입
      accept: 'application/json', // response의 데이터 타입
      'client-id': 'final07',
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use((config) => {
    // refresh 요청일 경우 Authorization 헤더는 이미 refresh token으로 지정되어 있음
    if (user && config.url !== REFRESH_URL) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    }

    // 요청이 전달되기 전에 필요한 공통 작업 수행
    config.params = {
      ...config.params, // 기존 쿼리스트링 복사
    };
    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    (response) => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    },
    async (error) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error('인터셉터', error);
      const { config, response } = error;

      if (response?.status === 401) {
        // 인증 실패
        if (config.url === REFRESH_URL) {

          // refresh token 만료
          navigateLogin();
          return Promise.reject(error);
        } else if (user) {
          // 로그인 했으나 access token 만료된 경우
          // refresh 토큰으로 access 토큰 재발급 요청
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });
          setUser({ ...user, accessToken }, 'active');
          // 갱신된 accessToken으로 재요청
          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        } else {
          // 로그인 안한 경우
          navigateLogin();
        }
      }
      return Promise.reject(error);
    },
  );

  function navigateLogin() {
    toast.error('로그인 후 이용 가능합니다.\n로그인 페이지로 이동합니다');
    navigate('/login');
  }

  return instance;
}

export default useAxiosInstance;
