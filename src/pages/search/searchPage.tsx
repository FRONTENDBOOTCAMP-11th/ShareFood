import { useState, useEffect } from 'react';

import { useSearchFilterStateStore } from '../../store/listStateStore'; // 필터링 상태 관리
import { useGetList } from '../../hooks/useGetList';

// 컴포넌트
import Header from '../../components/Layout/Header';
import TypeSelector from '../../components/TypeSelector';
import Select from '../../components/Select';
import Search from './search';
import SearchList from './searchList';
import SearchNoResult from './searchNoResult';

// 이미지
import SearchActiveIcon from '/images/icons/search-active.svg';
import SearchIcon from '/images/icons/search.svg'

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>(''); // 실시간 입력 키워드
  const [keywords, setKeywords] = useState<string[]>([]); // 최근 검색어 목록
  const { soldout, setSoldout, location, setLocation, type, setType } = useSearchFilterStateStore(); // 필터링 상태
  const [isSearch, setIsSearch] = useState(false);
  const { data } = useGetList(soldout, type, location, keyword, 1, 0, isSearch); // 기존 `useGetList` 활용

  // 로컬스토리지에서 검색어 불러오기
  useEffect(() => {
    const storedKeywords = localStorage.getItem('recentKeywords');
    if (storedKeywords) {
      setKeywords(JSON.parse(storedKeywords));
    }
  }, []);

  // 검색 실행
  const handleSearch = () => {
    if (!keyword.trim()) {
      alert('검색어를 입력해주세요.');
      return;
    }

    // 최종 검색어 설정
    setIsSearch(true);

    // 최근 검색어 업데이트
    const updatedKeywords = [keyword, ...keywords.filter((k) => k !== keyword)].slice(0, 10);
    setKeywords(updatedKeywords);
    localStorage.setItem('recentKeywords', JSON.stringify(updatedKeywords));
  };

  // 검색어 개별 삭제
  const handleDeleteKeyword = (keywordToDelete: string) => {
    const updatedKeywords = keywords.filter((k) => k !== keywordToDelete);
    setKeywords(updatedKeywords);
    localStorage.setItem('recentKeywords', JSON.stringify(updatedKeywords));
  };

  // 검색어 전체 삭제
  const handleDeleteAll = () => {
    setKeywords([]);
    localStorage.removeItem('recentKeywords');
  };

  function handleSetKeyword(keyword: string) {
    setIsSearch(false);
    setKeyword(keyword);
  }

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
              onChange={(e) => handleSetKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button onClick={handleSearch} className="fixed right-[30px] flex-shrink-0">
            <img
              src="/images/icons/search.svg"
              alt="Search Icon"
              className="w-6 h-6"
              onMouseEnter={(e) => (e.currentTarget.src = SearchActiveIcon)}
              onMouseLeave={(e) => (e.currentTarget.src = SearchIcon)}
            />
          </button>
        </div>
      </Header>

      {/* 검색 전 상태 */}
      {keyword === '' ? (
        <>
          <div className="flex items-center justify-between mb-2 py-3">
            <span className="text-black text-sm">최근 검색어</span>
            <button type="button" onClick={handleDeleteAll} className="text-line1 text-sm">
              전체삭제
            </button>
          </div>
          <Search recentKeywords={keywords} handleDeleteKeyword={handleDeleteKeyword} />
        </>
      ) : !isSearch ? '' : (
        <>
          {/* 필터 */}
          <div className="flex flex-col mt-[18px] gap-[15px]">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSoldout((prev) => !prev)}
                className="flex items-center gap-[5px]"
              >
                <img
                  src={soldout ? '/images/check/check-active.svg' : '/images/check/check.svg'}
                  alt="check"
                  className="w-[15px] h-[15px]"
                />
                <p className={`text-[13px] ${soldout ? 'text-main' : 'text-font2'}`}>
                  거래 완료 된 상품도 보기
                </p>
              </button>
              <Select meetingLocation={location} setMeetingLocation={setLocation} />
            </div>
            <TypeSelector productsType={type} setProductsType={setType} />
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
