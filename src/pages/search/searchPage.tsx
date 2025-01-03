import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { axiosInstance } from "../../hooks/axiosInstance";

import { Product } from '../../types/productsTypes';

import Header from "../../components/Layout/Header";
import Search from "./search";
import SearchList from "./searchList";
import SearchNoResult from "./searchNoResult";

import prevArrow from '/images/arrow/prevArrow.svg';
import search from '/images/icons/search.svg';
import searchActive from '/images/icons/search-active.svg';

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('') // 검색 키워드
  const [searchResults, setSearchResults] = useState<Product[]>([]); // 검색 결과
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const { user } = useAuthStore(); // 사용자 인증 정보 가져오기

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = async () => {
    // 키워드를 입력하지 않았을 경우, alert 띄움
    if (keyword.trim().length === 0) {
      alert('검색어를 입력해주세요.');
      return;
    }
    setLoading(true); // 로딩 상태 활성화
    try {
      const { data } = await axiosInstance.get('/products', {
        params: { keyword },
        headers: {
          Authorization: `Bearer ${user?.accessToken}`, // 인증 토큰 추가하기
        },
      });

      // 검색 결과
      setSearchResults(data.items && data.items.length > 0 ? data.items : []);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]); // 에러 발생 시 결과 없음 처리
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

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
              onClick={handleSearch}
              className="fixed right-[30px] flex-shrink-0"
            >
              {/* hover 시 활성 색상으로 변경 */}
              <img src={search} alt="Search Icon" className='w-6 h-6' onMouseEnter={(e) => (e.currentTarget.src = searchActive)} onMouseLeave={(e) => (e.currentTarget.src = search)} />
            </button>
          </div>
        </Header>
      </div>

      {/* 본문 렌더링 */}
      <div>
        {/* 검색 결과가 있을 경우 */}
        {searchResults.length > 0 ? (
          <SearchList results={searchResults} />
        ) : (
          keyword.trim().length > 0 && <SearchNoResult />
        )}
      </div>

      {/* 첫 렌더링 화면 */}
      {keyword.trim().length === 0 && <Search />}
    </div>
  )
}

export default SearchPage;