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
      className={`flex flex-col items-center text-broccoli ${
        index !== 0
          ? 'before:content-[""] before:w-[120px] before:h-[1px] before:bg-[#D9D9D9]'
          : ''
      }`}
    >
      <button
        className="py-6 w-full text-xl"
        onClick={() => handleSelectLocation(item)}
      >
        {item}
      </button>
    </li>
  ));

  return (
    <>
      <section className="mx-2 w-[180px] flex flex-col items-center">
        <h2 className="hidden">selectbox</h2>
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center justify-center gap-1 border-broccoli border-[1px] w-[150px] h-[46px] rounded-full font-pretendard text-broccoli"
        >
          {title}
          <img className="size-2" src="src/public/buttonImg/arrowDown.svg" />
        </button>
        {isVisible && (
          <ul className="selectbox-option hide w-[180px] border border-[#D9D9D9] rounded-[10px] mt-[14px] py-8 text-center font-pretendard">
            {list}
          </ul>
        )}
      </section>
    </>
  );
};

export default Select;
