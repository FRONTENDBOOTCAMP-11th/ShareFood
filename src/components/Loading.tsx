import { FadeLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="h-full flex flex-col gap-3 items-center justify-center">
      <FadeLoader color="#4CAF50" className="w-[20px] h-[20px]" />
    </div>
  );
};

export default Loading;
