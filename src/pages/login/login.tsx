import { useState } from 'react';
import Button from '../../components/Button';
import Error from '../../components/Error';
import LoginSignupTitle from '../../components/LoginSignupTitle';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../hooks/axiosInstance';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { handleSubmit } = useForm<FormData>();

  // 로그인 상태 유지
  const [active, setActive] = useState<string>('inactive');

  // 활성, 비활성 따라서 이미지 변경
  const handleActive = () => {
    setActive((active) => (active === 'inactive' ? 'active' : 'inactive'));
  };

  const login = useMutation({
    mutationFn: async (formData: FormData) =>
      axiosInstance.post('/users/login', formData),
    onSuccess: (res) => {
      console.log(res);

      const user = res.data.item;

      console.log(user);

      alert(user.name + '님, 안녕하세요');
    },
  });

  return (
    <>
      <div className="flex flex-col px-4 justify-center bg-main min-h-screen">
        <LoginSignupTitle>로그인</LoginSignupTitle>
        <main className="bg-white my-6 px-4 py-[27px] h-[372px] rounded-[10px] font-sans text-xs">
          <section className="[&_input]:w-full [&_input]:h-[26px] [&_input]:border-b-[1px] [&_input]:border-line2 [&_input]:py-1 [&_input:focus]:outline-none">
            <input className="mb-4" type="email" placeholder="아이디(이메일)" />
            <input className="mb-2" type="password" placeholder="비밀번호" />
            <Error>* 아이디(이메일), 비밀번호를 확인해 주십시오</Error>
            <label className="mt-6 flex items-center gap-2 w-fit hover:cursor-pointer">
              <button onClick={() => handleActive()}>
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
            <Button height="40px" text="text-sm" bg="main" color="white">
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
        </main>
      </div>
    </>
  );
};

export default Login;
