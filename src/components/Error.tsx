interface Props {
  children: React.ReactNode; // 메세지 내용
  text?: string; // 글자크기
}

const Error: React.FC<Props> = ({ children, text = 'text-xs' }) => {
  return <p className={`text-error ${text}`}>{children}</p>;
};

export default Error;
