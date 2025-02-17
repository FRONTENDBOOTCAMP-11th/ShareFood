import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Slide, toast, ToastContainer } from 'react-toastify';

import useAxiosInstance from '../../hooks/useAxiosInstance';

import Button from '../../components/Button';
import Error from '../../components/Error';
import LoginSignupTitle from '../../components/LoginSignupTitle';
import UserInfo from '../myPage/modifyInfo';

// 서버에 넘길 데이터
interface UserInfo {
  email: string; // 이메일(ID)
  password: string; // 비밀번호
  name: string; // 닉네임
  phone: string; // 전화번호
  type?: string; // data 타입 => seller로 지정
  image: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    clearErrors,
    getValues,
  } = useForm<UserInfo>();

  const navigate = useNavigate();

  // 비밀번호 확인
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // 아이디, 닉네임 중복 확인
  const [emailDuplicationError, setEmailDuplicationError] = useState('');
  const [nameDuplicationError, setNameDuplicationError] = useState('');
  const [isEmailUnique, setIsEmailUnique] = useState(false);
  const [isNameUnique, setIsNameUnique] = useState(false);

  const password = watch('password');

  // 비밀번호, 비밀번호 확인 입력창이 변경될 때마다 렌더링 실행
  // 비밀번호, 비밀번호 확인에 입력된 값이 다르면 메세지 출력
  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  }, [confirmPassword, password]);

  const axiosInstance = useAxiosInstance();
  const addUser = useMutation({
    mutationFn: async (userInfo: UserInfo) => {
      userInfo.type = 'seller'; // 데이터 타입 지정
      userInfo.image = '/files/final07/default4.png';

      // API 호출
      const res = await axiosInstance.post('/users', userInfo);
      return res.data; // 응답 데이터 로그
    },
    onSuccess: (data) => {
      toast.success(
        `${data.item.name}님, 가입을 축하드립니다. 
        잠시 후 로그인 페이지로 이동합니다.`,
        {
          onClose: () => {
            navigate('/login');
          },
        },
      );
    },
    onError: (err) => {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        console.error('Error Response:', axiosError.response.data); // 서버에서 반환된 에러 메시지
      } else {
        console.error('Unexpected Error:', err); // 기타 에러
      }
    },
  });

  // onSubmit에 사용
  const onSubmit = (data: UserInfo) => {
    // 아이디, 닉네임 중복 검사
    // 통과하지 못하는 경우 or 중복검사 하지 않은 경우 에러메세지 출력
    if (!isEmailUnique) {
      setEmailDuplicationError('아이디 중복검사를 해주세요.');
    }
    if (!isNameUnique) {
      setNameDuplicationError('닉네임 중복검사를 해주세요.');
    }
    if (!isEmailUnique || !isNameUnique) {
      return;
    }
    // 통과하면 가입
    addUser.mutate(data);
  };

  // input창 공백 입력 제거
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.target.value = value.replace(/\s/g, '');

    if (name === 'password') {
      clearErrors('password');
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,32}$/;

      if (!value) {
        setPasswordError('');
      } else if (!regex.test(value)) {
        setPasswordError(
          '영문 숫자 혼용하여 8자 이상 32자 이하 입력(공백 제외)',
        );
      } else {
        setPasswordError('');
      }
    }

    if (confirmPassword && confirmPassword !== password) {
      setConfirmPassword('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPassword('');
    }

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }

    if (name === 'email') {
      if (!e.target.value) {
        setEmailDuplicationError('');
        setIsEmailUnique(false);
      }
    }
    if (name === 'name') {
      if (!e.target.value) {
        setNameDuplicationError('');
        setIsNameUnique(false);
      }
    }
  };

  // 버튼 클릭 시 중복된 데이터가 있으면 에러 메세지 출력
  const handleDuplication = async (type: 'email' | 'name') => {
    const allValues = getValues();
    const value = type === 'email' ? allValues.email : allValues.name;

    if (!value || value.trim().length === 0) {
      if (type === 'email') {
        setEmailDuplicationError('아이디를 입력해주세요');
        setIsEmailUnique(false);
      } else {
        setNameDuplicationError('닉네임을 입력해주세요');
        setIsNameUnique(false);
      }
      return;
    }

    // 서버에서 데이터 받아와서 중복 확인
    const res = await axiosInstance.get(`/users?${type}=${value}`);
    const isDuplicate = res.data.item.length > 0;

    if (type === 'email') {
      setEmailDuplicationError(
        isDuplicate
          ? '이미 존재하는 아이디입니다.'
          : '사용 가능한 아이디입니다.',
      );
      setIsEmailUnique(!isDuplicate);
    } else {
      setNameDuplicationError(
        isDuplicate
          ? '이미 존재하는 닉네임입니다.'
          : '사용 가능한 닉네임 입니다.',
      );
      setIsNameUnique(!isDuplicate);
    }
  };

  return (
    <>
      <div className="flex flex-col px-4 justify-center bg-main min-h-screen">
        <LoginSignupTitle>회원가입</LoginSignupTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 mt-6 mb-20"
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
                onChange={handleInputChange}
              />
              <Button
                bg="main"
                color="white"
                text="text-[10px]"
                width="53px"
                height="22px"
                onClick={() => handleDuplication('email')}
              >
                중복체크
              </Button>
            </div>
            <Error
              text="text-[10px]"
              color={isEmailUnique === true ? 'text-main' : 'text-error'}
            >
              {errors.email?.message || emailDuplicationError}
            </Error>

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
              onChange={handleInputChange}
            />
            <Error text="text-[10px]">
              {errors.password?.message || passwordError}
            </Error>

            <input
              className="w-full border-b-[1px] border-line2 mt-2 mb-1"
              type="password"
              placeholder="비밀번호 확인"
              name="confirmPassword"
              onChange={handleInputChange}
            />
            <Error text="text-[10px]">{confirmPasswordError}</Error>
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
                onChange={handleInputChange}
              />
              <Button
                bg="main"
                color="white"
                text="text-[10px]"
                width="53px"
                height="22px"
                onClick={() => handleDuplication('name')}
              >
                중복체크
              </Button>
            </div>
            <Error
              text="text-[10px]"
              color={isNameUnique === true ? 'text-main' : 'text-error'}
            >
              {errors.name?.message || nameDuplicationError}
            </Error>
            <input
              className="w-full border-b-[1px] border-line2 mt-2 mb-1"
              type="text"
              placeholder="휴대전화 번호"
              maxLength={13}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                const phoneNumber = e.currentTarget;
                phoneNumber.value = phoneNumber.value
                  .replace(/[^0-9]/g, '')
                  .replace(/(\d{2,3})(\d{3,4})(\d{4})$/, '$1-$2-$3');
              }}
              {...register('phone', {
                required: '휴대전화 번호를 입력해 주세요.',
                pattern: {
                  value: /^01\d-(\d{3,4})-(\d{4})$/,
                  message: '휴대전화 번호 형식으로 입력해 주세요.',
                },
              })}
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
        toastClassName="mx-4"
      />
    </>
  );
};

export default SignUp;
