import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Error from '../../components/Error';
import LoginSignupTitle from '../../components/LoginSignupTitle';
import { axiosInstance } from '../../hooks/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import UserInfo from '../myPage/UserInfo';
import { AxiosError } from 'axios';

interface UserInfo {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  type?: string;
}

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<UserInfo>();

  const addUser = useMutation({
    mutationFn: async (userInfo: UserInfo) => {
      userInfo.type = 'user';

      console.log(userInfo);

      try {
        const response = await axiosInstance.post(`/users`, userInfo);
        console.log('Response:', response.data); // 응답 데이터 로그
        return response.data;
      } catch (error) {
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

  const onSubmit = (data: UserInfo) => {
    addUser.mutate(data);
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
              {...register('email')}
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
          <Error text="text-[10px]">이메일 형식으로 입력해주세요</Error>

          <input
            className="w-full border-b-[1px] border-line2 mt-2 mb-1"
            type="password"
            placeholder="비밀번호"
            {...register('password')}
          />
          <Error text="text-[10px]">8자 이상 32자 이하 입력(공백 제외)</Error>

          <input
            className="w-full border-b-[1px] border-line2 mt-2 mb-1"
            type="password"
            placeholder="비밀번호 확인"
            {...register('confirmPassword')}
          />
          <Error text="text-[10px]">입력한 비밀번호와 맞지 않습니다</Error>
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
              {...register('name')}
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
          <Error text="text-[10px]">이미 존재하는 닉네임입니다</Error>
          <input
            className="w-full border-b-[1px] border-line2 mt-2 mb-1"
            type="text"
            placeholder="휴대전화 번호"
            {...register('phoneNumber')}
          />
          <Error text="text-[10px]">휴대전화 번호 형식으로 입력해주세요</Error>
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
