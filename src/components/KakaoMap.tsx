import React, { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

type KaKaoMapProps = {
  // 주소로 장소를 표시하기 위한 필수 props
  position: {
    lat: number,
    lng: number
  },
  subLocation: string
};

declare global {
  interface Window {
    kakao: object;
  }
}

const KaKaoMap: React.FC<KaKaoMapProps> = ({ position, subLocation }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_JS_KEY}&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [position]);

  return (
    <Map
      center={position}
      className='w-full h-[150px]'
    >
      <MapMarker position={position}>
        <div className='h-[30px] w-auto flex px-2 items-center justify-center overflow-hidden text-ellipsis  whitespace-nowrap rounded shadow-lg'>
          <span className="text-sm">{subLocation}</span>
        </div>
      </MapMarker>
    </Map >
  );
};

export default KaKaoMap;
