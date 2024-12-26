interface Props {
  children: React.ReactNode;
  text?: string;
}

const Error: React.FC<Props> = ({ children, text = 'text-xs' }) => {
  return <p className={`text-error ${text}`}>{children}</p>;
};

export default Error;
