import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { useAuthStore } from '../../store/authStore';
import { PulseLoader } from 'react-spinners';

import useAxiosInstance from '../../hooks/useAxiosInstance';

import forkChef from '/images/chef/forkChef.svg';

const KakaoRedirect = () => {
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const active = 'active';

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
      <div className="kakao-login-loading">
        <div className="flex flex-col justify-center items-center bg-main min-h-screen">
          <div className="flex flex-col items-center">
            <img className="size-[100px]" src={forkChef} alt="셰푸 이미지" />
            <div className="flex flex-row items-center gap-1 mb-1">
              <p className="text-white font-BMJUA text-xl">로그인 중입니다</p>
              <PulseLoader
                color="#ffffff"
                loading
                size={8}
                speedMultiplier={0.7}
              />
            </div>
          </div>
        </div>
      </div>
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
