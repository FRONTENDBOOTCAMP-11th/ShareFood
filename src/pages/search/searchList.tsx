// React
import React, { useEffect, useState } from 'react';

// 라이브러리
import { useNavigate } from 'react-router-dom';
import { useGetList } from '../../hooks/useGetList';

// 타입 정의
import { Product } from '../../types/productsTypes';

// 컴포넌트
import Header from '../../components/Layout/Header';
import TypeSelector from '../../components/TypeSelector';
import Select from '../../components/Select';
import List from '../../components/List';

// 변수/이미지
import prevArrow from '/images/arrow/prevArrow.svg';
import search from '/images/icons/search.svg';
import searchActive from '/images/icons/search-active.svg';
import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';


const SearchList: React.FC = () => {
  // 필터링 상태
  const [showSoldOut, setShowSoldOut] = useState(false);
  const [productsType, setProductsType] = useState('buy');
  const [meetingLocation, setMeetingLocation] = useState('전체지역');

  const navigate = useNavigate();

  //게시글 불러오기
  const { data } = useGetList(
    showSoldOut,
    productsType,
    meetingLocation
  );

  useEffect(() => {
    if (data) {
      console.log(data.item);
    }
  }, [data]);


  return (
    <div className="pt-14 pb-[100px] bg-back1 min-h-screen">
      {/* 헤더 */}
      {/* Header 컴포넌트의 속성과 충돌을 피하기 위해 div로 한 번 감싸기 */}
      <div className='relative w-full max-w-md mx-auto'>
        <Header>
          <div className="flex items-center w-full px-0">
            {/* 뒤로가기 */}
            <button onClick={() => window.history.back()}>
              <img src={prevArrow} alt='preveIcon' className='w-6 h-6' />
            </button>

            {/* 검색 섹션 */}
            <div className="flex items-center pl-2">
              <input placeholder='검색어를 입력하세요.' className="flex-1 ml-2 text-5 placeholder-font2  text-font1 focus:outline-none" />
            </div>

            {/* 검색 버튼 */}
            <button
              onClick={() => navigate('/search')}
              className="fixed right-[30px] flex-shrink-0"
            >
              <img src={search} alt="Search Icon" className='w-6 h-6' onMouseEnter={(e) => (e.currentTarget.src = searchActive)} onMouseLeave={(e) => (e.currentTarget.src = search)} />
            </button>
          </div>
        </Header>
      </div>


      {/* 게시글 목록 */}
      <div className="px-[17px] mt-[10px] flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowSoldOut((prev) => !prev)}
              className="flex items-center gap-[5px]"
            >
              <img
                src={`${showSoldOut ? checkActive : check}`}
                alt="check"
                className="w-[15px] h-[15px]"
              />
              <p
                className={`text-[13px] ${showSoldOut ? 'text-main' : 'text-font2'
                  }`}
              >
                거래 완료 된 상품 보기
              </p>
            </button>
            <Select
              meetingLocation={meetingLocation}
              setMeetingLocation={setMeetingLocation}
            />
          </div>
          <TypeSelector
            setProductsType={setProductsType}
            productsType={productsType}
          />
        </div>

        {data ? (
          <div className="flex flex-col gap-[10px]">
            {data.item.map((products: Product, index: number) => (
              <List
                key={index}
                title={products.name}
                type={products.extra.type}
                total={products.quantity}
                remain={products.buyQuantity}
                location={products.extra.subLocation}
                due={products.extra.meetingTime}
                price={products.price}
                date={products.createdAt}
                like={products.bookmarks}
                comments={products.replies}
                imageScr={products?.mainImages[0]?.path || ''}
              />
            ))}
          </div>
        ) : (
          <div>로딩중...</div>
        )}
      </div>
    </div>
  );
};

export default SearchList;
