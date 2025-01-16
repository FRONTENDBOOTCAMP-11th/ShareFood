import { useNavigate } from 'react-router-dom';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useAuthStore } from '../../store/authStore';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const active = 'inactive';

    const kakaoLogin = async () => {
      try {
        const res = await axiosInstance.post('/users/login/kakao', {
          code: code,
          redirect_uri: import.meta.env.VITE_REDIRECT_URI,
          user: {
            type: 'seller',
          },
        });

        if (res.data.item) {
          setUser(
            {
              _id: res.data.item._id,
              name: res.data.item.name,
              profile: res.data.item.image ? res.data.item.image : undefined,
              accessToken: res.data.item.token.accessToken,
              refreshToken: res.data.item.token.refreshToken,
            },
            active,
          );
          console.log(res);
          toast.success(`${res.data.item.name}님, 환영합니다.`, {
            onClose: () => {
              navigate('/main');
            },
          });
        }
      } catch (error) {
        console.error('로그인 실패, 로그인 페이지로 이동합니다.', error);
        navigate('/login');
      }
    };

    if (code) {
      kakaoLogin();
    } else {
      console.error('인가 코드가 없습니다.');
      navigate('/login');
    }
  }, []);

  return (
    <>
      <p>로그인 처리 중입니다...</p>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
      />
    </>
  );
};

export default KakaoRedirect;
