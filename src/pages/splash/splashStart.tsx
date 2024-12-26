import React from 'react';
import whitechef from '/images/logos/logo1.svg';
import Button from '../../components/Button.tsx';
import { useNavigate } from 'react-router-dom';

const SplashStart: React.FC = () => {

  const navigate = useNavigate(); // useNavigate 훅 호출

  const handleClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };


  return (
    <div className="flex flex-col justify-between px-4 bg-main" h-screen>
      <div className = 'flex flex-col items-center justify-center flex-grow'>
        <img
          src = { whitechef } // 이미지 경로
          alt = '셰푸 아이콘'
          className = 'w-[80px] h-[80px] mx-auto mb-4'
        />
        <h2 className = 'text-white text-lg font-normal font-BMJUA'>우리동네 Share Food</h2>
        <h1 className = 'text-white text-3xl font-BMJUA mt-2'>셰푸</h1>
      </div>
      <div className='flex justify-center mt-[60px]'>
        <Button
          text='text-lg'
          width='270px'
          height='40px'
          bg='white'
          color='black'
          border='border-none'
          onClick={handleClick}
        >
          시작하기
        </Button>
      </div>
    </div>

  );
};

export default SplashStart;