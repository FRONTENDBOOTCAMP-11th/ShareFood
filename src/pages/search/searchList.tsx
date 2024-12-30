import { useNavigate } from 'react-router-dom';

import Header from '../../components/Layout/Header';
import TypeSelector from '../../components/TypeSelector';
import List from '../../components/List';
import PrevIcon from '/images/arrow/prevArrow.svg';
import SearchIcon from '/images/icons/search.svg';

const SearchList: React.FC = () => {
  const navigate = useNavigate();

  const handlePrevClick = () => {
    navigate(-1); // 이전 페이지로 이동하기
  };

  const handleSearchClick = () => {
    console.log('검색 실행'); // 검색 기능 추가 예정
  };

  return (
    <>
      <div className="pt-14 bg-back1 h-screen flex flex-col">
        {/* 헤더 */}
        <Header>
          <div className="flex items-center justify-between w-full px-4">
            {/* 뒤로가기 버튼 */}
            <button
              type="button"
              aria-label="뒤로가기"
              className="transition-colors hover:text-main" // hover 시 main 색상으로 변경
              onClick={handlePrevClick}
            >
              <img src={PrevIcon} alt="뒤로가기" className="h-6 w-6" />
            </button>
            <span className="text-line1 text-lg font-medium">
              검색어를 입력하세요
            </span>
            {/* 검색 버튼 */}
            <button
              type="button"
              aria-label="검색"
              className="transition-colors text-line1 hover:text-main" // 기본은 line1, hover 시 main 색상
              onClick={handleSearchClick}
            >
              <img src={SearchIcon} alt="검색" className="w-5 h-5" />
            </button>
          </div>
        </Header>
        <div className="px-4 flex flex-col gap-[10px] mt-4">
          <TypeSelector />
          <div className="flex flex-col gap-[14px]">
            <List
              title={'포도 두 송이 남는데 구매하실 분~'}
              type={'buy'}
              total={10}
              remain={7}
              location={'공릉 2동'}
              due={'12/31'}
              price={3000}
              date={'12/17'}
              like={8}
              comments={5}
            />
            <List
              title={'귤은 겨울에 먹어야 해요'}
              type={'buy'}
              total={3}
              remain={2}
              location={'공릉 2동'}
              due={'12/17'}
              price={3000}
              date={'12/17'}
              like={7}
              comments={10}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchList;
