import { FadeLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="h-screen">
      <div className="absolute bottom-1/2 left-1/2">
        <h1>로딩 중..</h1>
        <br />
        <FadeLoader color="#4CAF50" />
      </div>
    </div>
  );
};

export default Loading;
