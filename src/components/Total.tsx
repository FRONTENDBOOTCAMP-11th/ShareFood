import { useState } from 'react';
import emptyHeart from '/images/icons/heart.svg';
import fullHeart from '/images/icons/full_heart.svg';

interface TotalProps {
  interest: number;
  setInterest: React.Dispatch<React.SetStateAction<number>>;
  data: object;
}

// 매개변수로 관심 수 state, 관심 setter, 댓글 수 state 필요
function Total({ interest, setInterest, data }: TotalProps) {
  // 버튼 클릭 시 이미지 버튼을 위한 state
  const [imageSrc, setImageSrc] = useState(emptyHeart);
  const [isClicked, setIsClicked] = useState(false);
  console.log('total 랜더링');

  // const addInterest = useMutation({
  //   mutationFn: (data.item._id) =>
  // })

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
    <div className="border-b border-main pb-3 flex gap-2 text-[13px]">
      <button onClick={handleClick}>
        <img src={imageSrc} alt="" className="w-[16px]" />
      </button>
      <p className="ml-1.5 text-font2">
        관심 <span className="text-main">{data.item.bookmarks}</span>
      </p>
      <p className="ml-3 text-font2">
        댓글 <span className="text-main">{data.item.replies.length}</span>
      </p>
    </div>
  );
}

export default Total;
