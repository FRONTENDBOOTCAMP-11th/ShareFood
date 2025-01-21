import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from '../../hooks/useAxiosInstance';

import Tag from '../Tag';
import CheckBuyListItem from './CheckBuyListItem';
import Button from '../Button';

import image from '/images/chef/cryingChef.svg';
import { useRegisterNotification } from '../../hooks/useRegisterNotification';
import { toast } from 'react-toastify';

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
  seller_id: number;
  name: string;
}

interface Order {
  _id: number;
  user: {
    _id: number;
    name: string;
    image: string;
  };
  products: {
    quantity: number;
  }[];
}

function CheckBuyList({ data, setViewPayment }: CheckBuyListProps) {
  const axiosInstance = useAxiosInstance();
  const [viewSendMessage, setViewSendMessage] = useState(false);
  const [message, setMessage] = useState('');

  const { data: checkBuy } = useQuery({
    queryKey: ['buyList', data.item._id],
    queryFn: () => {
      return axiosInstance.get(`/seller/products/${data.item._id}`);
    },
    select: (res) => res?.data?.item?.orders,
    staleTime: 1000 * 10,
  });
  const { mutate: registerNotification } = useRegisterNotification();
  let OrderList = [];
  let isOrder = false;

  if (checkBuy) {
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

  const closeModal = () => {
    setViewPayment(false);
  };

  // 메시지 검증 및 전달 함수
  const handleSendMessage = () => {
    if (!message.trim()) {
      toast.error('메시지를 입력해주세요.');
      return;
    }
    if (message.length > 300) {
      toast.error('300글자를 넘으면 안됩니다.');
      return;
    }

    for (let i = 0; i < OrderList.length; i++) {
      registerNotification({
        target_id: OrderList[i].props.id,
        content: `${data.item.name}에서 보내는 메시지: ${message}`,
        type: 'message',
        extra: {
          productId: data.item._id,
        },
      });
    }
    toast.success('메시지가 전송되었습니다!');
    setViewSendMessage(false);
    setViewPayment(false);
  };

  // 메시지 작성하기를 눌렀을 때 나타나는 마크업
  if (viewSendMessage) {
    return (
      <div>
        <h2 className="mb-3 font-semibold">메시지 전달 💌</h2>
        <p className="text-[14px]">
          신청자들에게 전달할 메시지를 작성해주세요!
        </p>
        <textarea
          className="w-full min-h-[100px] p-2 bg-back2 my-3 rounded-[10px] placeholder:text-[13px]"
          placeholder="거래시 착장, 장소에 대한 설명, 바뀐 만남 정보등을 입력해주세요!"
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex gap-1 mb-[10px] reverse">
          <p
            className={`ml-auto ${message.length > 300 ? 'text-error' : 'text-main'}`}
          >
            {message.length}
          </p>{' '}
          <p>/ 300</p>
        </div>
        <Button
          height="35px"
          text="text-sm"
          bg="sub"
          color="white"
          onClick={handleSendMessage}
        >
          메시지 전달
        </Button>
      </div>
    );
  }

  if (OrderList.length > 0) isOrder = true;

  // 주문자가 한 명이라도 있을 때 나타나는 마크업
  if (isOrder) {
    return (
      <div>
        <h2 className="mb-3 font-semibold">신청자 목록</h2>
        <div className="flex flex-col gap-5">
          <Tag tagName="member">{`${data.item.buyQuantity} / ${data.item.quantity}`}</Tag>
          <ul className="flex flex-col gap-3 px-2 ">{OrderList}</ul>
        </div>
        <div className="mt-[30px]">
          <Button
            height="35px"
            text="text-sm"
            bg="sub"
            color="white"
            // width="340px"
            onClick={() => setViewSendMessage(true)}
          >
            전달 메시지 작성하기
          </Button>
        </div>
      </div>
    );
  } // 신청자가 없을 때 나타날 마크업
  else {
    return (
      <div>
        <h2 className="mb-3 font-semibold">신청자 목록</h2>
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
