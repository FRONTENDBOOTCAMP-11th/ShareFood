interface Props {
  children: React.ReactNode;
}

const LoginSignupTitle: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="bg-broccoli flex justify-center items-end">
        <div className="flex flex-col">
          <img
            className="size-10 ml-[17px] mb-[-6px]"
            src="images/chef/whiteChef.svg"
          />
          <h1 className="font-BMJUA text-[30px] text-white ">
            셰푸 {children}
          </h1>
        </div>
      </div>
    </>
  );
};

export default LoginSignupTitle;
