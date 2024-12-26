import React from 'react';
import whitechef from '/images/logos/logo1.svg';

const Splash: React.FC = () => {
  return (
    <div className = 'flex items-center justify-center px-4 bg-main h-screen'>
      <div className="text-center">
        <img
          src = { whitechef } // 이미지 경로
          alt = '셰푸 아이콘'
          className = 'w-[80px] h-[80px] mx-auto mb-4'
        />
        <h2 className = 'text-white text-lg font-normal font-BMJUA'>우리동네 Share Food</h2>
        <h1 className = 'text-white text-3xl font-BMJUA mt-2'>셰푸</h1>
      </div>
    </div>
  );
};

export default Splash;