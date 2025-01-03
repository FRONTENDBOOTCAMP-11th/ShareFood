import { useState } from 'react';
import Button from '../../components/Button';
import Error from '../../components/Error';
import LoginSignupTitle from '../../components/LoginSignupTitle';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../hooks/axiosInstance';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { useLocalStorage, useSessionStorage } from '../../store/authStore';
import { Slide, toast, ToastContainer } from 'react-toastify';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const navigate = useNavigate();

  // 로그인 상태 유지
  const [active, setActive] = useState<string>('inactive');
  const useLocal = useLocalStorage();
  const useSession = useSessionStorage();

  // 활성, 비활성 따라서 이미지 변경
  const handleActive = () => {
    setActive((active) => (active === 'inactive' ? 'active' : 'inactive'));
  };

  // 로그인 기능
  const login = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post('/users/login', formData);
      return res.data;
    },
    onSuccess: (res) => {
      console.log(res);

      const user = res.item;
      console.log(user);

      // 로그인 정보 저장
      // 로그인 상태 버튼 활성 시 로컬 스토리지 저장
      if (active === 'active') {
        useLocal.setUser({
          _id: user._id,
          name: user.name,
          profile: user.image ? user.image : undefined,
          accessToken: user.token.accessToken,
          refreshToken: user.token.refreshToken,
        });
        // 로그인 상태 버튼 비활성 시 세션 스토리지 저장
      } else {
        useSession.setUser({
          _id: user._id,
          name: user.name,
          profile: user.image ? user.image : undefined,
          accessToken: user.token.accessToken,
          refreshToken: user.token.refreshToken,
        });
      }

      // 로그인 성공 시 알림창 띄우고 메인페이지 이동
      toast.success(`${res.item.name}님, 환영합니다.`, {
        onClose: () => {
          navigate('/main');
        },
      });
    },
    onError: (error: AxiosError) => {
      console.log('Error occurred:', error);
      // 403 에러 : 아이디, 비밀번호가 틀렸을 경우 === 서버에 저장된 데이터에 없는 경우
      if (error.response && error.response.status === 403) {
        setError('email', {
          message: '아이디(이메일) 또는 비밀번호를 확인해 주십시오.',
        });
        setError('password', {
          message: '아이디(이메일) 또는 비밀번호를 확인해 주십시오.',
        });
        // 422 에러 : 공란 또는 형식에 맞지않은 값이 입력된 경우
      } else if (error.response && error.response.status === 422) {
        setError('email', {
          message:
            '아이디(이메일) 또는 비밀번호에 맞는 형식으로 입력해 주십시오.',
        });
        setError('password', {
          message:
            '아이디(이메일) 또는 비밀번호에 맞는 형식으로 입력해 주십시오.',
        });
      }
    },
  });

  // onSubmit에 사용하기 위함
  const onSubmit = (data: FormData) => {
    login.mutate(data);
  };

  return (
    <>
      <div className="flex flex-col px-4 justify-center bg-main min-h-screen">
        <LoginSignupTitle>로그인</LoginSignupTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white my-6 px-4 py-[27px] h-[372px] rounded-[10px] font-sans text-xs"
        >
          <section className="[&_input]:w-full [&_input]:h-[26px] [&_input]:border-b-[1px] [&_input]:border-line2 [&_input]:py-1 [&_input:focus]:outline-none">
            <input
              className="mb-4"
              type="email"
              placeholder="아이디(이메일)"
              {...register('email')}
            />
            <input
              className="mb-2"
              type="password"
              placeholder="비밀번호"
              {...register('password')}
            />
            <Error>{errors.email?.message || errors.password?.message}</Error>
            <label className="mt-6 flex items-center gap-2 w-fit hover:cursor-pointer">
              <button type="button" onClick={() => handleActive()}>
                <img
                  className="size-5"
                  src={`images/check/checkCircle-${active}.svg`}
                />
              </button>
              <p
                className={`${active === 'inactive' ? 'text-font2' : 'text-black'}`}
              >
                로그인 상태 유지
              </p>
            </label>
          </section>
          <section className="flex flex-col justify-center items-center gap-4 mt-9">
            <Button
              height="40px"
              text="text-sm"
              bg="main"
              color="white"
              type="submit"
            >
              로그인
            </Button>
            <Button height="40px" text="text-sm" bg="kakao" color="kakao">
              <div className="flex justify-center items-center gap-2">
                <img src="/images/icons/kakao.svg" />
                <p>카카오계정으로 로그인</p>
              </div>
            </Button>
          </section>
          <section className="my-7 text-center">
            <Link className="text-font2 underline font-semibold " to="/sign-up">
              회원가입하기
            </Link>
          </section>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />
    </>
  );
};

export default Login;
