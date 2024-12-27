import { ListProps } from '../types/listComponentTypes';

// images
import image from '/images/chef/forkChef_back.svg';
import priceTag from '/images/tag/price.svg';
import map from '/images/tag/location.svg';
import pack from '/images/tag/item.svg';
import bookmark from '/images/icons/heart.svg';
import time from '/images/tag/time.svg';
import PostType from './PostType';

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
            <img src={pack} className="w-[18px] h-[18px]" />
            <p className="text-[13px]">
              {remain} / <strong className="text-main">{total}</strong>
            </p>
          </div>

          <div className="flex gap-[10px] border-l-2 px-[10px]">
            <img src={map} className="w-[16px] h-[20px]" />
            <p className="text-[13px]">{location}</p>
          </div>

          {type === 'buy' ? (
            <div className="flex gap-[10px] border-l-2 px-[10px]">
              <img src={time} className="w-[18px] h-[18px]" />
              <p className="text-[13px]">
                <strong className="text-main">{due}</strong> 까지 모집
              </p>
            </div>
          ) : (
            <div className="flex gap-[10px] border-l-2 px-[10px]">
              <img src={priceTag} className="w-[18px] h-[18px]" />
              <p className="text-[13px]">{price}원</p>
            </div>
          )}
        </div>
        <div className="ml-auto">
          <PostType type={type} />
        </div>
      </div>

      <div className="flex gap-[10px] mt-[17px] pt-[12px] border-t text-font1">
        <img src={bookmark} className="w-[12px]" />
        <p className="text-font2 text-[13px]">관심 {like}</p>
        <p className="text-font2 text-[13px]">댓글 {comments}</p>
      </div>
    </div>
  );
};

export default List;
