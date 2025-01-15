import React from 'react';
import { useNavigate } from 'react-router-dom';
import greenChef from '/images/chef/cryingChef.svg';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      {/* 우는 이미지 */}
      <img
        src={greenChef}
        alt='Error'
        className='w-32 h-32 mb-6'
      />
      {/* 헤딩 */}
      <h1 className='text-xl font-bold text-main mb-2'>
        일시적인 오류입니다.
      </h1>
      {/* 텍스트 */}
      <p className='text-line1 mb-6'>
        잠시 후에 다시 시도해 주세요.
      </p>
      {/* 버튼 */}
      <button
        onClick={() => navigate(-1)} // 이전 페이지로 이동
        className='px-6 py-2 hover:bg-main text-white font-semibold rounded bg-line1'
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  );
};

export default ErrorPage;
