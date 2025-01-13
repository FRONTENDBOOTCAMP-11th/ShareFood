import React from 'react';

interface SearchProps {
  recentKeywords: string[];
  handleDeleteKeyword: (keywordToDelete: string) => void;
  handleClickKeyword: (keyword: string) => void;
}

const Search: React.FC<SearchProps> = ({ recentKeywords, handleDeleteKeyword, handleClickKeyword }) => {

  return (
    <div>
      {recentKeywords.length > 0 ? (
        <>
          <div className="flex flex-wrap gap-x-1.5 gap-y-4 max-h-[calc(2*26px+16px)] overflow-hidden">
            {recentKeywords.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center px-4 h-[26px] rounded-[20px] text-black text-sm border line1 overflow-hidden whitespace-nowrap text-ellipsis" onClick={() => handleClickKeyword(keyword)}
              >
                <span className="hover:text-main cursor-pointer">{keyword}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // 클릭 이벤트 버블링 방지
                    handleDeleteKeyword(keyword);
                  }}
                  className="ml-2 text-line1 group-hover:text-main cursor-pointer"
                  aria-label={`${keyword} 삭제`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className='text-font2'>저장된 검색어가 없습니다.</p>
      )}
    </div>
  );

};

export default Search;
