import basicImage from '/images/chef/drawingChef.svg';

import Tag from '../Tag';

interface CheckBuyListItemProps {
  name: string;
  image: string;
  quantity: number;
  totalQuantity: number;
}

function CheckBuyListItem({
  name,
  image,
  quantity,
  totalQuantity,
}: CheckBuyListItemProps) {
  let profileImage = '';
  if (image != null) {
    if (image.includes('kakao')) {
      profileImage = image;
    } else {
      profileImage = `https://11.fesp.shop${image}`;
    }
  } else profileImage = basicImage;
  return (
    <>
      <li className="flex items-center gap-3">
        <img
          src={profileImage}
          alt="프로필 사진"
          className="max-w-[27px] max-h-[27px] rounded-full"
        />
        <p className="grow text-left w-[180px] max-w-[180px]">{name}</p>
        <div className="min-w-[70.92px]">
          <Tag tagName="item">
            {quantity} / {totalQuantity}
          </Tag>
        </div>
      </li>
    </>
  );
}

export default CheckBuyListItem;
