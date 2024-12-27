import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';

import PrevIcon from '/images/arrow/prevArrow.svg';
import SearchIcon from '/images/icons/search.svg';

const Search: React.FC = () => {
  const [keywords, setKeywords] = useState<string[]>([
    '대파', '운동기구', '시계', '아령', '체중계', '세탁바구니', '아이폰', '아메리카노',
  ]);

  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate(-1); // 이전 페이지로 이동하기
  };

  const handleSearchClick = () => {
    console.log('검색 실행'); // 검색 기능 추가 예정
  };

  return (
    <div className='bg-back1 h-screen'>
      <Header>
        <div className='flex items-center justify-between w-full px-4'>
          {/* 뒤로가기 버튼 */}
          <button
            aria-label='뒤로가기'
            className='transition-colors hover:text-main' // hover 시 main 색상으로 변경
            onClick={handlePrevClick}
          >
            <img
              src={PrevIcon}
              alt='뒤로가기'
              className='h-5 w-5'
            />
          </button>
          <span className='text-line1 text-lg font-medium'>검색어를 입력하세요</span>
          {/* 검색 버튼 */}
          <button
            aria-label='검색'
            className='transition-colors text-line1 hover:text-main' // 기본은 line1, hover 시 main 색상
            onClick={handleSearchClick}
          >
            <img
              src={SearchIcon}
              alt='검색'
              className='w-5 h-5'
            />
          </button>
        </div>
      </Header>

      <div className='px-4 pt-[64px]'>
        {/* 최근 검색어 */}
        <div className='flex items-center justify-between mb-2 py-3'>
          <span className='text-black text-sm'>최근 검색어</span>
          <button
            onClick={() => setKeywords([])} // 키워드 전체 삭제
            className='text-line1 text-sm'
          >
            전체삭제
          </button>
        </div>

        {/* 키워드 리스트 */}
        <div
          className='flex flex-wrap gap-x-1.5 gap-y-4'
          style={{
            maxHeight: 'calc(2 * 26px + 16px)', // 두 줄까지만 표시
            overflow: 'hidden', // 두 줄 넘칠 경우 숨기기
          }}
        >
          {keywords.map((keyword) => (
            <div
              key={keyword}
              className='flex items-center px-[10px] rounded-[20px] text-black text-sm border line1'
              style={{
                height: '26px', // 키워드 박스 고정 높이
                lineHeight: '1.5',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              <span>{keyword}</span>
              <button
                onClick={() => setKeywords((prev) => prev.filter((k) => k !== keyword))} // 특정 키워드 삭제
                className='ml-2 text-line1'
                aria-label={`${keyword} 삭제`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
