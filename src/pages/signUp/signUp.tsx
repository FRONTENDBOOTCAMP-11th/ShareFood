import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Error from '../../components/Error';
import LoginSignupTitle from '../../components/LoginSignupTitle';
import { axiosInstance } from '../../hooks/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import UserInfo from '../myPage/UserInfo';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

// 서버에 넘길 데이터
interface UserInfo {
  email: string; // 이메일(ID)
  password: string; // 비밀번호
  name: string; // 닉네임
  phone: string; // 전화번호
  type?: string; // data 타입 => user로 지정
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm<UserInfo>();

  // 비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phone, setPhone] = useState('휴대전화 번호');

  const password = watch('password');

  // 비밀번호, 비밀번호 확인 입력창이 변경될 때마다 렌더링 실행
  // 비밀번호, 비밀번호 확인에 입력된 값이 다르면 메세지 출력
  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  }, [confirmPassword, password]);

  const addUser = useMutation({
    mutationFn: async (userInfo: UserInfo) => {
      userInfo.type = 'user'; // 데이터 타입 지정

      console.log(userInfo);

      try {
        // 응답 성공 시
        const response = await axiosInstance.post(`/users`, userInfo);
        console.log('Response:', response.data); // 응답 데이터 로그
        return response.data;
      } catch (error) {
        // 응답 실패 시
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.log('Error Response:', axiosError.response.data); // 에러 응답 데이터 로그
        } else {
          console.error('Error:', error);
        }
        throw error;
      }
    },
  });

  // onSubmit에 사용
  const onSubmit = (data: UserInfo) => {
    addUser.mutate(data);
  };

  // input창 공백 입력 제거
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.target.value = value.replace(/\s/g, '');

    if (name === 'password') {
      clearErrors('password');
    }

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  // 휴대전화 번호 자동 하이픈
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');

    setPhone(value);
    e.target.value = value;
    clearErrors('phone');
  };

  return (
    <div className="flex flex-col px-4 bg-main py-[120px] rounded-[10px]">
      <LoginSignupTitle>회원가입</LoginSignupTitle>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mb-14"
      >
        <section
          className="bg-white p-4 rounded-[10px] [&_input:focus]:outline-none 
        [&_input]:h-[26px] text-xs"
        >
          <div className="flex items-center border-b-[1px] border-line2 mb-1">
            <input
              className="grow"
              type="text"
              placeholder="아이디(이메일)"
              {...register('email', {
                required: '아이디(이메일)을 입력해 주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: '이메일 형식으로 입력해 주세요.',
                },
              })}
            />
            <Button
              bg="main"
              color="white"
              text="text-[10px]"
              width="53px"
              height="22px"
            >
              중복체크
            </Button>
          </div>
          <Error text="text-[10px]">{errors.email?.message}</Error>

          <input
            className="w-full border-b-[1px] border-line2 mt-2 mb-1"
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력해 주세요.',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,32}$/,
                message:
                  '영문 숫자 혼용하여 8자 이상 32자 이하 입력(공백 제외)',
              },
            })}
            onChange={handlePasswordChange}
          />
          <Error text="text-[10px]">{errors.password?.message}</Error>

          <input
            className="w-full border-b-[1px] border-line2 mt-2 mb-1"
            type="password"
            placeholder="비밀번호 확인"
            name="confirmPassword"
            onChange={handlePasswordChange}
          />
          <Error text="text-[10px]">{passwordError}</Error>
        </section>
        <section
          className="bg-white p-4 rounded-[10px] 
        [&_input:focus]:outline-none [&_input]:h-[26px] text-xs"
        >
          <div className="flex items-center border-b-[1px] border-line2 mb-1">
            <input
              className="grow"
              type="text"
              placeholder="닉네임"
              {...register('name', {
                required: '닉네임을 입력해주세요.',
                pattern: {
                  value: /^[0-9a-zA-Z가-힣]*$/,
                  message: '특수문자는 사용할 수 없습니다.',
                },
              })}
            />
            <Button
              bg="main"
              color="white"
              text="text-[10px]"
              width="53px"
              height="22px"
            >
              중복체크
            </Button>
          </div>
          <Error text="text-[10px]">{errors.name?.message}</Error>
          <input
            className="w-full border-b-[1px] border-line2 mt-2 mb-1"
            type="text"
            placeholder={phone}
            {...register('phone', {
              required: '휴대전화 번호를 입력해 주세요.',
              pattern: {
                value: /^(\d{3})-(\d{4})-(\d{4})/,
                message: '휴대전화 번호 형식으로 입력해 주세요.',
              },
            })}
            onChange={handlePhoneChange}
          />
          <Error text="text-[10px]">{errors.phone?.message}</Error>
        </section>
        <Button
          type="submit"
          bg="white"
          color="main"
          height="40px"
          text="text-sm"
        >
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
