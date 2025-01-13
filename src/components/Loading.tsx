import { FadeLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="relative h-[100px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 ">
        <h1>로딩 중..</h1>
        <FadeLoader color="#4CAF50" />
      </div>
    </div>
  );
};

export default Loading;
