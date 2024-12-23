import LoginSignupTitle from '../../components/LoginSignupTitle';

const Login: React.FC = () => {
  return (
    <>
      <div className="flex flex-col px-4 bg-main py-[120px]">
        <LoginSignupTitle>로그인</LoginSignupTitle>
        <section className="bg-white mt-6 h-[372px] rounded-[10px] font-sans text-xs">
          <div className="px-4 py-[27px] [&_input]:w-full [&_input]:h-[26px] [&_input]:border-b-[1px] [&_input]:border-[#CCCCCC] [&_input]:py-1 [&_input:focus]:outline-none">
            <input className="mb-4" type="email" placeholder="아이디(이메일)" />
            <input type="password" placeholder="비밀번호" />
            <div className="mt-6 text-inactive flex items-center gap-2">
              <img className="size-5" src="images/btnImg/checkInactive.svg" />
              <p>로그인 상태 유지</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
