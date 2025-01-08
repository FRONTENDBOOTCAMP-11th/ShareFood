interface Props {
  children: React.ReactNode; // 버튼 내용
  text: string; // 버튼 글자 크기
  width?: string; // 버튼 가로 길이
  height: string; // 버튼 높이
  bg?: string; // 버튼 배경색
  color?: string; // 버튼 글자색
  border?: string; // 버튼 border
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']; // 버튼 type 지정
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // 클릭 이벤트
}

const Button: React.FC<Props> = ({
  children,
  text,
  width = '100%',
  height,
  bg = 'white', // 버튼 기본 배경색 - 흰색
  color = 'black', // 버튼 기본 글자색 - 검정색
  border,
  type = 'button',
  onClick,
}) => {
  // 가로, 세로 값
  const styles = {
    width,
    height,
  };

  // 버튼 배경색
  const bgColor: { [key: string]: string } = {
    main: 'bg-main',
    second: 'bg-font2',
    white: 'bg-white',
    kakao: 'bg-[#FFE500]',
    inActive: 'bg-line1',
    sub: 'bg-sub',
  };

  // 버튼 글자색
  const textColor: { [key: string]: string } = {
    white: 'text-white',
    black: 'text-black',
    kakao: 'text-[#33333]',
    main: 'text-main',
    subText: 'text-font2',
  };

  return (
    <>
      <button
        type={type}
        style={styles}
        className={`rounded-[10px] font-sans shadow-button font-semibold 
          ${text} ${border} ${bgColor[bg]} ${textColor[color]}`}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
