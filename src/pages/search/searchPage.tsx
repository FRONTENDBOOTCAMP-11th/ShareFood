import { useState } from 'react';

import Header from '../../components/Layout/Header';
import Search from './search';
import SearchList from './searchList';
import SearchNoResult from './searchNoResult';

import prevArrow from '/images/arrow/prevArrow.svg';
import search from '/images/icons/search.svg';
import searchActive from '/images/icons/search-active.svg';
import { useGetList } from '../../hooks/useGetList';

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>(''); // 검색 키워드
  const [showSoldOut, setShowSoldOut] = useState(false);
  const [productsType, setProductsType] = useState('buy');
  const [meetingLocation, setMeetingLocation] = useState('전체지역');
  const [isSearch, setIsSearch] = useState(false);

  //게시글 불러오기
  const { data, refetch } = useGetList(
    showSoldOut,
    productsType,
    meetingLocation,
    keyword,
  );

  const handleShowSoldout = () => {
    setShowSoldOut((prev) => !prev);
  };
  const handleProductsType = (type: string) => {
    setProductsType(type);
  };
  const handleMeetingLoction = (location: string) => {
    setMeetingLocation(location);
  };

  const handleSearch = () => {
    if (!keyword) {
      alert('검색어를 입력해주세요.');
      return;
    }

    setIsSearch(true);
    refetch();
    console.log(data.item);
  };

  return (
    <div className="pt-14 pb-[100px] px-[18px] bg-back1 min-h-screen">
      {/* 헤더 */}
      <Header>
        <div className="flex items-center w-full px-0">
          {/* 뒤로가기 */}
          <button onClick={() => window.history.back()}>
            <img src={prevArrow} alt="preveIcon" className="w-6 h-6" />
          </button>

          {/* 검색 섹션 */}
          <div className="flex items-center pl-2">
            <input
              placeholder="검색어를 입력하세요."
              className="flex-1 ml-2 text-5 placeholder-font2  text-font1 focus:outline-none"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* 검색 버튼 */}
          <button
            onClick={handleSearch}
            className="fixed right-[30px] flex-shrink-0"
          >
            {/* hover 시 활성 색상으로 변경 */}
            <img
              src={search}
              alt="Search Icon"
              className="w-6 h-6"
              onMouseEnter={(e) => (e.currentTarget.src = searchActive)}
              onMouseLeave={(e) => (e.currentTarget.src = search)}
            />
          </button>
        </div>
      </Header>

      {/* 본문 렌더링 */}
      {isSearch ? (
        <>
          {data ? (
            <SearchList
              results={data.item}
              showSoldOut={showSoldOut}
              handleShowSoldout={handleShowSoldout}
              productsType={productsType}
              handleProductsType={handleProductsType}
              meetingLocation={meetingLocation}
              handleMeetingLoction={handleMeetingLoction}
            />
          ) : (
            <SearchNoResult />
          )}
        </>
      ) : (
        <Search />
      )}
    </div>
  );
};

export default SearchPage;
