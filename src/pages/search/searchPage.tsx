import { useState, useEffect } from 'react';
import { useGetList } from '../../hooks/useGetList';

import Header from '../../components/Layout/Header';
import TypeSelector from '../../components/TypeSelector';
import Select from '../../components/Select';
import Search from './search';
import SearchList from './searchList';
import SearchNoResult from './searchNoResult';

import prevArrow from '/images/arrow/prevArrow.svg';
import search from '/images/icons/search.svg';
import searchActive from '/images/icons/search-active.svg';
import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>(''); // 실시간 입력 키워드
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>(''); // 최종 요청 키워드
  const [showSoldOut, setShowSoldOut] = useState(false);
  const [productsType, setProductsType] = useState('buy');
  const [meetingLocation, setMeetingLocation] = useState('전체지역');
  const [isSearch, setIsSearch] = useState(false);

  // 게시글 불러오기
  const { data, refetch } = useGetList(
    showSoldOut,
    productsType,
    meetingLocation,
    debouncedKeyword
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);

    return () => clearTimeout(timer); // 입력이 계속되면 타이머 초기화
  }, [keyword]);

  // 검색 버튼 클릭 시 요청 수행
  const handleSearch = () => {
    if (!debouncedKeyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    setIsSearch(true);
    refetch();
  };

  return (
    <div className="pt-14 pb-[100px] px-[18px] bg-back1 min-h-screen flex flex-col">
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
              className="flex-1 ml-2 text-5 placeholder-font2 text-font1 focus:outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {/* 검색 버튼 */}
          <button
            onClick={handleSearch}
            className="fixed right-[30px] flex-shrink-0"
          >
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

      {isSearch && (
        <div className="flex flex-col mt-[18px] gap-[15px]">
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
                className={`text-[13px] ${
                  showSoldOut ? 'text-main' : 'text-font2'
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
      )}

      {/* 본문 렌더링 */}
      {isSearch ? (
        <>
          {data?.item?.length > 0 ? (
            <SearchList data={data.item} />
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
