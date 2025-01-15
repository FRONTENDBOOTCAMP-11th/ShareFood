const KakaoLogin: React.FC = () => {
  return (
    <>
      <div className="px-5 border min-h-screen">
        <h1 className="text-center mt-11">
          계정 정보 입력으로도 로그인할 수 있어요.
        </h1>
        <section className="flex flex-col gap-1 mt-[30px]">
          <input
            className="border-b h-[43px] focus:outline-none"
            type="text"
            placeholder="카카오메일 아이디, 이메일, 전화번호"
          />
          <input
            className="border-b h-[43px] focus:outline-none"
            type="password"
            placeholder="비밀번호"
          />
          <label className="flex gap-2 mt-6">
            <button>
              <img src="images/check/checkCircle-inactive.svg" />
            </button>
            <p className="text-sm opacity-70">간편로그인 정보 저장</p>
          </label>
          <button className="mt-[30px] h-[50px] bg-[#FEE500] rounded">
            로그인
          </button>
        </section>
        <section className="flex gap-4 justify-center mt-[18px] text-[#7D7D7D]">
          <a href="/">회원가입</a>
          <a
            className="flex items-center gap-4 before:content-[''] before:w-[1px] before:h-[10px] before:bg-black before:opacity-[0.08]"
            href="/"
          >
            계정 찾기
          </a>
          <a
            className="flex items-center gap-4 before:content-[''] before:w-[1px] before:h-[10px] before:bg-black before:opacity-[0.08]"
            href="/"
          >
            비밀번호 찾기
          </a>
        </section>
      </div>
    </>
  );
};

export default KakaoLogin;
