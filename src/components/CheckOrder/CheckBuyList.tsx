import { useQuery } from '@tanstack/react-query';
import Tag from '../Tag';
import { axiosInstance } from '../../hooks/axiosInstance';
import CheckBuyListItem from './CheckBuyListItem';
import Button from '../Button';
import image from '/images/chef/cryingChef.svg';

interface CheckBuyListProps {
  data: Data;
  setViewPayment: (viewPayment: boolean) => void;
  // setViewPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Data {
  item: Item;
}

interface Item {
  _id: number;
  buyQuantity: number;
  quantity: number;
}

interface Order {
  _id: number;
  user: {
    name: string;
    image: string;
  };
  products: {
    quantity: number;
  }[];
}

function CheckBuyList({ data, setViewPayment }: CheckBuyListProps) {
  const axios = axiosInstance;
  const { data: checkBuy } = useQuery({
    queryKey: ['buyList', data.item._id],
    queryFn: () => {
      return axios.get(`/seller/products/${data.item._id}`);
    },
    select: (res) => res?.data?.item?.orders,
    staleTime: 1000 * 10,
  });
  let OrderList = [];
  let isOrder = false;

  const closeModal = () => {
    setViewPayment(false);
  };

  if (checkBuy) {
    // console.log(checkBuy);
    // console.log(checkBuy[0].user.name); // 김건우
    // console.log(checkBuy[0].user.image); // 파일 경로
    // console.log(checkBuy[0].products[0].quantity); // 구매 개수
    OrderList = checkBuy.map((value: Order) => {
      return (
        <CheckBuyListItem
          key={value._id}
          name={value.user.name}
          image={value.user.image}
          quantity={value.products[0].quantity}
          totalQuantity={data.item.quantity}
        />
      );
    });
  }

  if (OrderList.length > 0) isOrder = true;

  if (isOrder) {
    return (
      <div>
        <h2 className="mb-3">신청자 목록</h2>
        <div className="flex flex-col gap-5">
          <Tag tagName="member">{`${data.item.buyQuantity} / ${data.item.quantity}`}</Tag>
          <ul className="flex flex-col gap-3 px-[10px]">{OrderList}</ul>
        </div>
        <div className="mt-[30px]">
          <Button
            height="35px"
            text="text-sm"
            bg="main"
            color="white"
            // width="340px"
            onClick={closeModal}
          >
            닫 기
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className="mb-3">신청자 목록</h2>
        <div className="flex flex-col gap-5">
          <Tag tagName="member">{`${data.item.buyQuantity} / ${data.item.quantity}`}</Tag>
          <ul className="flex flex-col gap-3 px-[10px]">{OrderList}</ul>
        </div>
        <div className="w-fit mx-auto">
          <img src={image} alt="기본 이미지" className="mx-auto rounded-full" />
          <p className="mt-[30px]">신청자가 없습니다</p>
        </div>
        <div className="mt-[30px]">
          <Button
            height="35px"
            text="text-sm"
            bg="main"
            color="white"
            // width="340px"
            onClick={closeModal}
          >
            닫 기
          </Button>
        </div>
      </div>
    );
  }
}

export default CheckBuyList;
