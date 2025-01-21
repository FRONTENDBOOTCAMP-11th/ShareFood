import React, { useState, useEffect } from 'react';

interface AddressProps {
  subLocation: string;
  setSubLocation: (addres: string) => void;
}

const KakaoAddressSearch: React.FC<AddressProps> = ({
  subLocation,
  setSubLocation,
}) => {
  const [addr1, setAddr1] = useState(''); // 기본 주소 상태
  const [position, setPosition] = useState();

  // 카카오 주소 검색 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // 주소 검색 함수
  const handleAddressSearch = () => {
    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {
        let fullAddr = '';

        if (data.userSelectedType === 'R') {
          // 도로명 주소
          fullAddr = data.roadAddress;
        } else {
          // 지번 주소
          fullAddr = data.jibunAddress;
        }

        // 상태 업데이트
        setAddr1(fullAddr);

        // 전체 주소 업데이트
        setSubLocation(fullAddr);
      },
    }).open();
  };

  return (
    <div className="space-y-2 flex flex-col">
      {/* 주소 검색 섹션 */}
      <div className="flex items-center">
        <div className="flex-1 flex items-center space-x-[8px]">
          <input
            type="text"
            id="addr1"
            value={addr1}
            readOnly
            placeholder="만남 상세 주소"
            className="block w-full h-6 border border-gray-300 rounded-md shadow-sm sm:text-sm pl-1 placeholder:text-[12px]"
          />
        </div>
        <button
          type="button"
          onClick={handleAddressSearch}
          className="ml-[8px] h-6 flex items-center justify-center border border-gray-300 px-2 py-1 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          주소 검색
        </button>
      </div>

      {/* 사용자에게 선택 주소 보여줌 */}
      {subLocation && <p className="subLocation ml-0.5">{subLocation}</p>}
    </div>
  );
};

export default KakaoAddressSearch;
