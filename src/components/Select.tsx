import { useState } from 'react';

const Select: React.FC = () => {
  const location: string[] = [
    '서울',
    '경기',
    '강원',
    '충북',
    '충남',
    '경북',
    '경남',
    '전북',
    '전남',
    '제주',
  ];

  const [title, setTitle] = useState<string>('전체지역');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // 클릭 시 토글 나오게
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  // 지역 클릭시 대표 텍스트 교체
  const handleSelectLocation = (location: string) => {
    setTitle(location);
    setIsVisible(false);
  };

  // 리스트 생성
  const list = location.map((item, index) => (
    <li
      key={item}
      className={`flex flex-col items-center text-main ${
        index !== 0
          ? 'before:content-[""] before:w-[60px] before:h-[1px] before:bg-[#D9D9D9]'
          : ''
      }`}
    >
      <button
        className="py-[8px] text-[15px]"
        onClick={() => handleSelectLocation(item)}
      >
        {item}
      </button>
    </li>
  ));

  return (
    <div className="relative w-[84px]">
      <button
        onClick={handleToggle}
        className="flex gap-[3px] items-center justify-center border-main border-[1px] rounded-full text-main text-[13px] px-[13px] py-[4px] bg-white ml-auto"
      >
        {title}
        <img className="size-2" src="images/arrow/down.svg" />
      </button>

      {isVisible && (
        <ul className="absolute right-[1px] selectbox-option hide border border-[#D9D9D9] rounded-[10px] mt-[5px] text-center shadow-custom px-[10px] z-11 bg-white">
          {list}
        </ul>
      )}
    </div>
  );
};

export default Select;
