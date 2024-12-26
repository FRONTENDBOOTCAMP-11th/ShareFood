import React from 'react';
import whitechef from '/images/logos/logo1.svg';
import Button from '../../components/Button.tsx';
import { useNavigate } from 'react-router-dom';

const SplashStart: React.FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };


  return (
    <div
      className='flex flex-col items-center justify-center px-4 bg-main'
      style={{
        height: '100vh', // 화면 전체 높이
      }}
    >
      <div className='flex flex-col items-center'>
        <img
          src={ whitechef }
          alt='셰푸 아이콘'
          className='w-[80px] h-[80px] mx-auto mb-4'
        />
        <h2 className='text-white text-lg font-normal font-BMJUA'>
          우리동네 Share Food
        </h2>
        <h1 className='text-white text-3xl font-BMJUA mt-2'>셰푸</h1>

        <div className='mt-[60px]'>
          <Button
            text='시작하기'
            width='270px'
            height='40px'
            bg='white'
            color='black'
            border='border-none'
            onClick={ handleClick }
          >
            시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SplashStart;