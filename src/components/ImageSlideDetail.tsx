import { useState } from 'react';

// images
import grape1 from '/images/sample/grape1.jpg';
import grape2 from '/images/sample/grape2.jpg';

export const ImageSlideDetail = () => {
  const images = [grape1, grape2, grape1, grape2];
  // 현재 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    // 첫장이면 마지막 슬라이드로, 아니면 이전 슬라이드로
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1,
      );
    }, 500);
  };

  // 다음 슬라이드로 이동 - 기능은 이전 슬라이드와 동일
  const handleNext = () => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 500);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-[1000px] max-h-[268px] overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-[13px] top-1/2 transform -translate-y-1/2 bg-prev-icon bg-no-repeat bg-center bg-contain w-[10px] h-[18px]"
        ></button>

        <button
          onClick={handleNext}
          className="absolute right-[13px] top-1/2 transform -translate-y-1/2 bg-next-icon bg-no-repeat bg-center bg-contain w-[10px] h-[18px]"
        ></button>

        <div className="flex gap-2 absolute bottom-[14px] left-1/2 transform -translate-x-1/2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-[10px] h-[10px] rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-line1'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
