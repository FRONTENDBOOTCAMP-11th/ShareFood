interface Props {
  children: React.ReactNode; // 메세지 내용
  text?: string; // 글자 크기
  color?: string; // 글자 색상
}

const Error: React.FC<Props> = ({
  children,
  text = 'text-xs',
  color = 'text-error',
}) => {
  return <p className={`${color} ${text}`}>{children}</p>;
};

export default Error;
