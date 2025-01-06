import { useState, useEffect } from 'react';

// 라이브러리
import { useGetList } from '../../hooks/useGetList';

// 컴포넌트
import Header from '../../components/Layout/Header';
import TypeSelector from '../../components/TypeSelector';
import Select from '../../components/Select';
import Search from './search';
import SearchList from './searchList';
import SearchNoResult from './searchNoResult';

// 이미지
import search from '/images/icons/search.svg';
import searchActive from '/images/icons/search-active.svg';
import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>(''); // 실시간 입력 키워드
  const [finalKeyword, setFinalKeyword] = useState<string>(''); // 검색 버튼 눌렀을 때의 최종 키워드
  const [showSoldOut, setShowSoldOut] = useState<boolean>(false); // 거래 완료 상품 보기 여부(true | false)
  const [productsType, setProductsType] = useState<'buy' | 'sell'>('buy'); // 상품 유형(default: 'buy')
  const [meetingLocation, setMeetingLocation] = useState<string>('전체지역'); // 지역 선택(default: '전체지역')

  // 최근 검색어: localStorage에서 불러오거나 초기화함
  const [recentKeywords, setRecentKeywords] = useState<string[]>(() => {
    const savedKeywords = localStorage.getItem('recentKeywords');
    return savedKeywords ? JSON.parse(savedKeywords) : [];
  });

  // useGetList 활용
  const { data, refetch } = useGetList(
    showSoldOut,
    productsType,
    meetingLocation,
    finalKeyword
  );

  // 키워드가 비어 있을때는 검색 결과 초기화
  useEffect(() => {
    if (keyword.trim().length === 0) {
      setFinalKeyword(''); // 입력 중일 때 검색 결과 초기화
    }
  }, [keyword]);

  // finalKeyword 변경 시 데이터 재요청
  useEffect(() => {
    if (finalKeyword) {
      refetch();
    }
  }, [finalKeyword, refetch]);

  // 검색 버튼 클릭 시 실행
  const handleSearch = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    // 최종 검색어 설정
    setFinalKeyword(keyword);

    // 최근 검색어 업데이트
    // 이전 상태값을 prev로 받아 리스트 생성
    // filter를 사용해서 중복 키워드는 리스트에서 제거
    setRecentKeywords((prev) => {
      const updatedKeywords = [keyword, ...prev.filter((k) => k !== keyword)].slice(0, 10);
      // localStorage 업데이트
      // 리스트를 JSON 문자열로 변환해서 localStorage에 저장
      // 키 값: 'recentKeywords', 값은 updatedKeywords
      localStorage.setItem('recentKeywords', JSON.stringify(updatedKeywords));
      return updatedKeywords;
    });
  };

  return (
    <div className="pt-14 pb-[100px] px-[18px] bg-back1 min-h-screen flex flex-col">
      {/* 헤더 */}
      <Header>
        <div className="flex items-center w-full px-0">
          <button onClick={() => window.history.back()}>
            <img src="/images/arrow/prevArrow.svg" alt="prevIcon" className="w-6 h-6" />
          </button>
          <div className="flex items-center pl-2">
            <input
              placeholder="검색어를 입력하세요."
              className="flex-1 ml-2 text-5 placeholder-font2 text-font1 focus:outline-none"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <button onClick={handleSearch} className="fixed right-[30px] flex-shrink-0">
            <img
              src="/images/icons/search.svg"
              alt="Search Icon"
              className="w-6 h-6"
              onMouseEnter={(e) => (e.currentTarget.src = searchActive)}
              onMouseLeave={(e) => (e.currentTarget.src = search)}
            />
          </button>
        </div>
      </Header>

      {/* 검색 전 상태 */}
      {finalKeyword === '' ? (
        <Search />
      ) : (
        <>
          {/* 필터 */}
          <div className="flex flex-col mt-[18px] gap-[15px]">
            <div className="flex items-center justify-between">
              {/* 거래 완료 상품 보기 버튼 */}
              <button
                onClick={() => setShowSoldOut((prev) => !prev)}
                className="flex items-center gap-[5px]"
              >
                <img
                  src={showSoldOut ? checkActive : check}
                  alt="check"
                  className="w-[15px] h-[15px]"
                />
                <p className={`text-[13px] ${showSoldOut ? 'text-main' : 'text-font2'}`}>
                  거래 완료 된 상품 보기
                </p>
              </button>
              {/* 지역 선택 드롭다운 */}
              <Select
                meetingLocation={meetingLocation}
                setMeetingLocation={setMeetingLocation}
              />
            </div>
            {/* 상품 유형 선택 */}
            <TypeSelector
              productsType={productsType}
              setProductsType={(type: string) => {
                if (type === 'buy' || type === 'sell') {
                  setProductsType(type); // 타입 변환 후 setter 호출
                }
              }}
            />
          </div>

          {/* 검색 결과 */}
          {data?.item?.length > 0 ? (
            <SearchList data={data.item} />
          ) : (
            <SearchNoResult />
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
