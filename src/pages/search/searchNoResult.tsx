import React from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';

import PrevIcon from '/images/arrow/prevArrow.svg';
import SearchIcon from '/images/icons/search.svg';
import NoResult from '/images/chef/cryingChef.svg'

const SearchNoResult: React.FC = () => {

  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate(-1); // 이전 페이지로 이동하기
  };

  const handleSearchClick = () => {
    console.log('검색 실행'); // 검색 기능 추가 예정
  };

  return (
    <div className='bg-back1 h-screen flex flex-col'>
      {/* 헤더 */}
      <Header>
        <div className='flex items-center justify-between w-full px-4'>
          {/* 뒤로가기 버튼 */}
          <button
            type='button'
            aria-label='뒤로가기'
            className='transition-colors hover:text-main' // hover 시 main 색상으로 변경
            onClick={handlePrevClick}
          >
            <img
              src={PrevIcon}
              alt='뒤로가기'
              className='h-6 w-6'
            />
          </button>
          <span className='text-line1 text-lg font-medium'>검색어를 입력하세요</span>
          {/* 검색 버튼 */}
          <button
            type='button'
            aria-label='검색'
            className='transition-colors text-line1 hover:text-main' // 기본은 line1, hover 시 main 색상
            onClick={handleSearchClick}
          >
            <img
              src={SearchIcon}
              alt='검색'
              className='h-6 w-6'
            />
          </button>
        </div>
      </Header>

      {/* 본문 중앙 정렬 */}
      <div className='flex-grow flex items-center justify-center'>
        <div className='text-center'>
          <img
            src={NoResult}
            alt='검색 결과 없음'
            className='h-24 w-24 mx-auto mb-4'
          />
          <p className='text-gray-500 text-sm'>검색 결과를 찾을 수 없어요</p>
        </div>
      </div>

    </div>
  );
};

export default SearchNoResult;
