import { useState } from 'react';
import emptyHeart from '/images/icons/heart.svg';
import fullHeart from '/images/icons/full_heart.svg';

interface TotalProps {
  interest: number;
  setInterest: React.Dispatch<React.SetStateAction<number>>;
  commentNum: number;
}

// 매개변수로 관심 수 state, 관심 setter, 댓글 수 state 필요
function Total({ interest, setInterest, commentNum }: TotalProps) {
  // 버튼 클릭 시 이미지 버튼을 위한 state
  const [imageSrc, setImageSrc] = useState(emptyHeart);
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    if (isClicked) {
      setImageSrc(emptyHeart);
      setIsClicked(false);
      setInterest(interest - 1);
    } else {
      setImageSrc(fullHeart);
      setInterest(interest + 1);
      setIsClicked(true);
    }
  };

  return (
    <div className="mx-[24px]">
      <div className="flex text-xs leading-6">
        <button onClick={handleClick}>
          <img src={imageSrc} alt="" className="w-[12px]"/>
        </button>
        <p className="ml-1.5 text-font2">
          관심 <span className="text-main">{interest}</span>
        </p>
        <p className="ml-3 text-font2">
          댓글 <span className="text-main">{commentNum}</span>
        </p>
      </div>
      <div>
        <hr className="w-88 mt-3 h-[1.2px] bg-main" />
      </div>
    </div>
  );
}

export default Total;
