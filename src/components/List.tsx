import { ListProps } from '../types/listComponentTypes';

import Tag from './Tag';

// images
import image from '/images/chef/forkChef_back.svg';
import bookmark from '/images/icons/heart.svg';
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
  const apiUrl = import.meta.env.VITE_BASE_URL;

  // 날짜 형식 변경
  const parts = date.split(' ')[0].split('.');
  const formattedDate = `${parts[1]}.${parts[2]}`;

  return (
    <div className="text-font1 flex flex-col rounded-custom px-[19px] py-[13px] shadow-custom bg-white rounded-[6px] relative">
      <div className="flex justify-between mb-[15px]">
        <p className="text-font1 font-semibold text-[14px]">{title}</p>
        <p className="text-font2 text-[13px]">{formattedDate}</p>
      </div>

      <div className="flex">
        <img
          src={`${apiUrl}${imageScr}` || defaultImage}
          alt="상품 이미지"
          className="min-w-[100px] min-h-[50px] w-[100px] h-[100px] object-cover mr-[10px] rounded-[10px]"
        />

        <div className="flex flex-col gap-[12px] justify-evenly">
          <Tag tagName={'item'}>
            {remain} / <strong className="text-main">{total}</strong>
          </Tag>

          <Tag tagName={'location'}>
            <p className="text-[13px]">{location}</p>
          </Tag>

          {type === 'buy' ? (
            <Tag tagName={'time'}>
              <p className="text-[13px]">
                <strong className="text-main">{due}</strong> 까지
              </p>
            </Tag>
          ) : (
            <Tag tagName={'price'}>
              <p className="text-[13px]">{price}원</p>
            </Tag>
          )}
        </div>
        <div className="ml-auto flex-shrink-0">
          <PostType type={type} />
        </div>
      </div>

      <div className="flex gap-[10px] mt-[17px] pt-[12px] border-t text-font1">
        <img src={bookmark} className="w-[12px]" />
        <p className="text-font2 text-[13px]">관심 {like}</p>
        <p className="text-font2 text-[13px]">댓글 {comments}</p>
      </div>
      {total === remain && <div className='absolute w-[100%] h-[100%] bg-black bg-opacity-40 rounded-[6px] left-0 top-0 flex items-center justify-center text-[20px] text-white font-bold'>마감</div>}
    </div>
  );
};

export default List;
