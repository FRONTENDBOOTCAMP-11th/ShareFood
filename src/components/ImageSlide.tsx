import { useState, useEffect } from 'react';

interface ImageSlidePropsType {
  imageList: string[];
  autoSlide: boolean;
  onClickHandler?: (() => void)[];
}

const ImageSlide = ({
  imageList,
  autoSlide,
  onClickHandler,
}: ImageSlidePropsType) => {
  // 현재 슬라이드 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 애니메이션 진행상황
  const [isAnimating, setIsAnimating] = useState(false);

  // 2초마다 슬라이드 전환
  useEffect(() => {
    if (autoSlide) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [currentIndex]);

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    // 애니메이션(슬라이드) 실행 여부 확인 - 중복 방지
    if (isAnimating) return;

    // 애니메이션 실행
    setIsAnimating(true);

    // 첫장이면 마지막 슬라이드로, 아니면 이전 슬라이드로
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imageList.length - 1 : prevIndex - 1,
      );
      setIsAnimating(false);
    }, 500);
  };

  // 다음 슬라이드로 이동 - 기능은 이전 슬라이드와 동일
  const handleNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === imageList.length - 1 ? 0 : prevIndex + 1,
      );
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center bg-back1">
      <div className="relative w-full max-w-[1000px] overflow-hidden max-h-[375px]">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {imageList.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              className="w-full h-full max-h-[375px] object-cover"
              onClick={
                onClickHandler && onClickHandler[index]
                  ? onClickHandler[index]
                  : undefined
              }
            />
          ))}
        </div>
        {imageList.length > 2 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-[13px] top-1/2 transform -translate-y-1/2 bg-prev-icon bg-no-repeat bg-center bg-contain w-[10px] h-[18px]"
            ></button>
            <button
              onClick={handleNext}
              className="absolute right-[13px] top-1/2 transform -translate-y-1/2 bg-next-icon bg-no-repeat bg-center bg-contain w-[10px] h-[18px]"
            ></button>
          </>
        )}
        <div className="flex gap-2 absolute bottom-[14px] left-1/2 transform -translate-x-1/2">
          {imageList.map((_, index) => (
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

export default ImageSlide;
