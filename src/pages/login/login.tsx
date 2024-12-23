import Button from '../../components/Button';
import LoginSignupTitle from '../../components/LoginSignupTitle';

const Login: React.FC = () => {
  return (
    <>
      <div className="flex flex-col px-4 bg-main py-[120px] my-10">
        <LoginSignupTitle>로그인</LoginSignupTitle>
        <main className="bg-white mt-6 px-4 py-[27px] h-[372px] rounded-[10px] font-sans text-xs">
          <section className="[&_input]:w-full [&_input]:h-[26px] [&_input]:border-b-[1px] [&_input]:border-[#CCCCCC] [&_input]:py-1 [&_input:focus]:outline-none">
            <input className="mb-4" type="email" placeholder="아이디(이메일)" />
            <input type="password" placeholder="비밀번호" />
            <p className="text-red-500 h-[21px] leading-[21px]">* 에러메세지</p>
            <div className="mt-6 text-subText flex items-center gap-2">
              <img className="size-5" src="images/btnImg/checkInactive.svg" />
              <p>로그인 상태 유지</p>
            </div>
          </section>
          <section className="flex flex-col justify-center items-center gap-4 mt-9">
            <Button
              width="332px"
              height="40px"
              text="text-sm"
              bg="main"
              color="white"
            >
              로그인
            </Button>
            <Button
              width="332px"
              height="40px"
              text="text-sm"
              bg="kakao"
              color="kakao"
            >
              <div className="flex justify-center items-center gap-2">
                <img src="/images/kakao.svg" />
                <p>카카오계정으로 로그인</p>
              </div>
            </Button>
          </section>
          <section className="my-7 text-center">
            <a className="text-subText underline font-semibold " href="/">
              회원가입하기
            </a>
          </section>
        </main>
      </div>
    </>
  );
};

export default Login;
