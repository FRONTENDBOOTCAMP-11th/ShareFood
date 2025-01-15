import { FadeLoader } from 'react-spinners';

const Loading = () => {
  return (
      <div className="h-full flex flex-col gap-3 items-center justify-center">
        <h1>로딩 중..</h1>
        <FadeLoader color="#4CAF50" />
      </div>
  );
};

export default Loading;
