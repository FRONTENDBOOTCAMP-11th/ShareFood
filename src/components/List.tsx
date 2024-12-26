import { ListProps } from '../types/listComponentTypes';

// images
import image from '/images/char.svg';
import priceTag from '/images/price.svg';
import map from '/images/map.svg';
import pack from '/images/pack.svg';
import bookmark from '/images/like0.svg';
import time from '/images/time.svg';

const List = ({
  title,
  type,
  total,
  remain,
  location,
  due,
  price,
  date,
  like,
  comments,
  imageScr,
}: ListProps) => {
  const defaultImage = image;

  return (
    <div className="text-font1 flex flex-col rounded-custom px-[19px] py-[13px] shadow-custom bg-white rounded-[6px]">
      <div className="flex justify-between mb-[15px]">
        <p className="text-font1 font-semibold text-[14px]">{title}</p>
        <p className="text-font2 text-[13px]">{date}</p>
      </div>

      <div className="flex">
        <img
          src={imageScr || defaultImage}
          alt="상품 이미지"
          className="mr-[22px] w-[90px] h-[90px]"
        />

        <div className="flex flex-col gap-[12px]">
          <div className="flex gap-[10px] border-l-2 px-[10px]">
            <img src={pack} />
            <p className="text-[13px]">
              <strong className="text-main">{remain}</strong> / {total}
            </p>
          </div>

          <div className="flex gap-[10px] border-l-2 px-[10px]">
            <img src={map} />
            <p className="text-[13px]">{location}</p>
          </div>

          {type === 'together' ? (
            <div className="flex gap-[10px] border-l-2 px-[10px]">
              <img src={time} />
              <p className="text-[13px]">
                <strong className="text-main">{due}</strong> 까지 모집
              </p>
            </div>
          ) : (
            <div className="flex gap-[10px] border-l-2 px-[10px]">
              <img src={priceTag} />
              <p className="text-[13px]">{price}원</p>
            </div>
          )}
        </div>
        {type === 'together' ? (
          <p className="rounded-[4px] bg-back2 py-[4px] px-[10px] text-sub h-[24px] flex justify-center items-center text-[12px] ml-auto">
            같이사요
          </p>
        ) : (
          <p className="rounded-[4px] bg-back2 py-[4px] px-[10px] text-sub h-[24px] flex justify-center items-center text-[12px] ml-auto">
            팔아요
          </p>
        )}
      </div>

      <div className="flex gap-[10px] mt-[17px] pt-[12px] border-t text-font1">
        <img src={bookmark} />
        <p className="text-font1 text-[13px]">관심 {like}</p>
        <p className="text-font1 text-[13px]">댓글 {comments}</p>
      </div>
    </div>
  );
};

export default List;
