const Error: React.FC<Props> = ({ children, text }) => {
  return <p className={`text-error ${text}`}>{children}</p>;
};

export default Error;
