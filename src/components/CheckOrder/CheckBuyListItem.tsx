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
  return (
    <>
      <li className="flex items-center gap-3">
        <img
          src={image ? `https://11.fesp.shop/${image}` : basicImage}
          alt="프로필 사진"
          className="max-w-[27px] max-h-[27px] rounded-full"
        />
        <p className="grow text-left max-w-[200px] mr-auto">{name}</p>
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
