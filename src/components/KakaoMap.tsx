import React, { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type KaKaoMapProps = {
  position: { Ma: number, La: number }; // 주소로 장소를 표시하기 위한 필수 props
};

declare global {
  interface Window {
    kakao: any;
  }
}

const KaKaoMap: React.FC<KaKaoMapProps> = ({ position }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=efbbbdc3a8e7a2cdb093bb64282cff32&libraries=services';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [position]);

  return (
    <Map
      center={{ lat: position.Ma, lng: position.La }}
      className='w-full h-[150px]'
    >
      <MapMarker position={{ lat: position.Ma, lng: position.La }}>
        <div className='h-[30px] w-auto flex items-center justify-center text-main text-sm font-semibold p-2 rounded shadow-lg'>
          <span className="text-main text-sm font-bold">좌표 테스트</span>
        </div>
      </MapMarker>
    </Map>
  );
};

export default KaKaoMap;
