import { useQuery } from '@tanstack/react-query';
import Tag from '../Tag';
import { axiosInstance } from '../../hooks/axiosInstance';
import CheckBuyListItem from './CheckBuyListItem';
import Button from '../Button';

interface CheckBuyListProps {
  data: Data;
  setViewPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Data {
  item: Item;
}

interface Item {
  _id: number;
  buyQuantity: number;
  quantity: number;
}

function CheckBuyList({ data, setViewPayment }: CheckBuyListProps) {
  const axios = axiosInstance;
  const { data: checkBuy } = useQuery({
    queryKey: ['buyList', data.item._id],
    queryFn: () => {
      console.log('실행은 됨?');
      return axios.get(`/seller/products/${data.item._id}`);
    },
    select: (res) => res?.data?.item?.orders,
    staleTime: 1000 * 10,
  });
  let OrderList = [];

  const closeModal = () => {
    setViewPayment(false);
  };

  if (checkBuy) {
    // console.log(checkBuy);
    // console.log(checkBuy[0].user.name); // 김건우
    // console.log(checkBuy[0].user.image); // 파일 경로
    // console.log(checkBuy[0].products[0].quantity); // 구매 개수
    OrderList = checkBuy.map((value) => {
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
}

export default CheckBuyList;
