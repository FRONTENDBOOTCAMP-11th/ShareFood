import React, { useState } from 'react';

const Search: React.FC = () => {
  // localStorage에서 'recentKeywords'를 가져와서 초기화
  const [keywords, setKeywords] = useState<string[]>(() => {
    const storedKeywords = localStorage.getItem('recentKeywords');
    // 저장된 검색어가 있으면 파싱, 없으면 빈 배열 반환
    return storedKeywords ? JSON.parse(storedKeywords) : [];
  });

  // 검색어 전체 삭제
  const handleDeleteAll = () => {
    setKeywords([]);
    localStorage.removeItem('recentKeywords');
  };

  // 개별 검색어 삭제
  const handleDeleteKeyword = (keyword: string) => {
    // 삭제할 검색어를 제외한 새로운 배열 생성
    const updatedKeywords = keywords.filter((k) => k !== keyword);
    setKeywords(updatedKeywords);
    // localStorage에 업데이트 된 검색어 저장
    localStorage.setItem('recentKeywords', JSON.stringify(updatedKeywords));
  };

  return (
    <div>
      {/* 최근 검색어 헤더 */}
      <div className="flex items-center justify-between mb-2 py-3">
        <span className="text-black text-sm">최근 검색어</span>
        <button type="button" onClick={handleDeleteAll} className="text-line1 text-sm">
          전체삭제
        </button>
      </div>

      {/* 키워드 리스트 */}
      <div className="flex flex-wrap gap-x-1.5 gap-y-4 max-h-[calc(2*26px+16px)] overflow-hidden">
        {keywords.map((keyword) => (
          <div
            key={keyword}
            className="flex items-center px-4 h-[26px] rounded-[20px] text-black text-sm border line1 overflow-hidden whitespace-nowrap text-ellipsis"
          >
            <span>{keyword}</span>
            <button
              type="button"
              onClick={() => handleDeleteKeyword(keyword)}
              className="ml-2 text-line1"
              aria-label={`${keyword} 삭제`}
            >
              ✕
            </button>
          </div>
        ))}
        {/* 검색어가 없을 경우 */}
        {keywords.length === 0 && (
          <p className="text-line1 text-m mt-1">저장된 검색어가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
