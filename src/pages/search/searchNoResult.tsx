import React from 'react';
import NoResult from '/images/chef/cryingChef.svg';

const SearchNoResult: React.FC = () => {


  return (
    <div className="bg-back1 h-screen flex flex-col">

      {/* 본문 중앙 정렬 */}
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <img
            src={NoResult}
            alt="검색 결과 없음"
            className="h-24 w-24 mx-auto mb-4"
          />
          <p className="text-gray-500 text-sm">검색 결과를 찾을 수 없어요.</p>
        </div>
      </div>
    </div>
  );
};

export default SearchNoResult;
