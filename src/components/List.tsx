import { ListProps } from '../types/listComponentTypes';

import Tag from './Tag';

// images
import image from '/images/chef/forkChef_back.svg';
import bookmark from '/images/icons/heart.svg';
import PostType from './PostType';
import { useNavigate } from 'react-router-dom';

const List = ({
  id,
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
  const navigate = useNavigate();

  // 날짜 형식 변경
  const parts = date ? date.split(' ')[0].split('.') : ['00', '00'];
  const formattedDate = `${parts[1]}.${parts[2]}`;

  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className="text-font1 flex flex-col rounded-custom px-[19px] py-[13px] shadow-custom bg-white rounded-[6px] relative cursor-pointer"
    >
      <div className="flex justify-between mb-[15px]">
        <p className="text-font1 font-semibold text-[14px] mr-[5px] truncate">
          {title}
        </p>
        {date && <p className="text-font2 text-[13px]">{formattedDate}</p>}
      </div>

      <div className="flex">
        <img
          src={`${apiUrl}${imageScr}` || defaultImage}
          alt="상품 이미지"
          className="min-w-[100px] min-h-[50px] w-[100px] h-[100px] object-cover mr-[10px] rounded-[10px]"
        />

        <div className="flex flex-col gap-[12px] justify-evenly">
          {remain !== undefined ? (
            <div className="border-l-2">
              <Tag tagName={'item'}>
                {remain} / <strong className="text-main">{total}</strong>
              </Tag>
            </div>
          ) : (
            <></>
          )}

          <div className="border-l-2">
            <Tag tagName={'location'}>
              <p className="text-[13px]">{location}</p>
            </Tag>
          </div>

          {type === 'buy' ? (
            <div className="border-l-2">
              <Tag tagName={'time'}>
                <p className="text-[12px]">
                  ~ <strong className="text-main text-[13px]">{due}</strong>
                </p>
              </Tag>
            </div>
          ) : (
            <div className='border-l-2'>
              <Tag tagName={'price'}>
                <p className="text-[12px]">{price}원</p>
              </Tag>
            </div>
          )}
        </div>
        <div className="ml-auto flex-shrink-0">
          <PostType type={type} />
        </div>
      </div>

      {like !== undefined ? (
        <div className="flex gap-[10px] mt-[17px] pt-[12px] border-t text-font1">
          <img src={bookmark} className="w-[12px]" />
          <p className="text-font2 text-[13px]">관심 {like}</p>
          <p className="text-font2 text-[13px]">댓글 {comments}</p>
        </div>
      ) : (
        <></>
      )}
      {total === remain && total !== undefined && (
        <div className="absolute w-[100%] h-[100%] bg-black bg-opacity-40 rounded-[6px] left-0 top-0 flex items-center justify-center text-[20px] text-white font-bold">
          마감
        </div>
      )}
    </div>
  );
};

export default List;
