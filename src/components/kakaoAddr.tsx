import axios from 'axios';
import React, { useState, useEffect } from 'react';

const KakaoAddressSearch: React.FC = () => {
  const [addr1, setAddr1] = useState(''); // 기본 주소 상태
  const [addr2, setAddr2] = useState(''); // 상세 주소 상태

  // 카카오 주소 검색 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  // 주소 검색 함수
  const handleAddressSearch = () => {
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        let fullAddr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          fullAddr = data.roadAddress;
        } else {
          fullAddr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '') {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
          }
          fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
        }

        // 상태 업데이트
        setAddr1(fullAddr);
        // 상세 주소 필드에 포커스 이동
        const addr2Input = document.getElementById('addr2') as HTMLInputElement;
        addr2Input?.focus();
      },
    }).open();
  };

  const handleSubmit = async () => {
    const fullAddress = `${addr1} ${addr2}`;
    console.log('서버로 전송할 주소:', fullAddress);

    try {
      const response = await axios.post('/seller/products', { address: fullAddress });
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('서버 요청 중 오류 발생:', error);
    }
  };

  return (
    <div className="space-y-2 px-2">
      <div className="flex items-center">
        <div className="flex-1 flex items-center space-x-[8px]">
          <input
            type="text"
            id="addr1"
            value={addr1}
            readOnly
            placeholder="주소"
            className="block w-full h-6 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleAddressSearch}
          className="ml-[8px] h-6 flex items-center justify-center border border-gray-300 px-2 py-1 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          주소 검색
        </button>
      </div>
      <div className="flex items-center">
        <div className="flex-1 flex items-center space-x-[8px]">
          <input
            type="text"
            id="addr2"
            value={addr2}
            onChange={(e) => setAddr2(e.target.value)}
            placeholder="상세 주소"
            className="block w-full h-6 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="ml-[8px] h-6 flex items-center justify-center border border-gray-300 px-2 py-1 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          확인
        </button>
      </div>
    </div>
  );
};

export default KakaoAddressSearch;
