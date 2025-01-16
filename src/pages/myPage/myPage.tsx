import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import {
  useGetBuyList,
  useGetLikeList,
  useGetMyList,
} from '../../hooks/useGetList';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useGetNotification } from '../../hooks/useGetNotification';

import { useAuthStore } from '../../store/authStore';
import { useMyListStateStore } from '../../store/listStateStore';

import { LikeProducts, MyProducts, Product } from '../../types/productsTypes';

import Layout from '../../components/Layout';
import List from '../../components/List';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import whiteChef from '/images/chef/whiteChef.svg';

const MyPage = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const { _id } = useParams<{ _id: string }>();

  // 게시물 토글 유지
  const tabs = [
    { label: '작성글', key: 'post' },
    { label: '좋아요한글', key: 'like' },
    { label: '거래신청글', key: 'trade' },
  ];
  const { list, setList } = useMyListStateStore();
  const axiosInstance = useAxiosInstance();

  // 회원정보 조회
  const { data: userInfo } = useGetUserInfo(axiosInstance, _id);

  // 내 작성글 조회
  const { data: myList } = useGetMyList(false);

  // 내가 좋아요한 글 조회
  const { data: myLikeList } = useGetLikeList(false, _id);

  // 거래 신청 글 조회
  const { data: myBuyList } = useGetBuyList(false);

  const { resetUser } = useAuthStore();

  // 알림 불러오기
  const [isNoti, setIsNoti] = useState<number[]>([]);
  const { data: notification } = useGetNotification();
  useEffect(() => {
    if (notification) {
      console.log(notification);
      notification.forEach((key) => {
        setIsNoti((prev) => {
          if (!prev.includes(key.extra.productId)) {
            return [...prev, key.extra.productId];
          }
          return prev;
        });
      });
    }
  }, [notification]);

  useEffect(() => {
    console.log(isNoti);
  }, [isNoti]);

  // 로그아웃
  const handleLogout = () => {
    resetUser();

    // 로그아웃 후 리다이렉트
    window.location.href = '/';
  };

  if (!userInfo)
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="pt-[24px] pb-[100px] px-[17px] bg-back1 flex flex-col gap-[13px] min-h-screen">
      <Layout>
        <div className="flex items-center">
          <img
            src={`${apiUrl}${userInfo.item.image}`}
            className="rounded-full w-[47px] h-[47px] bg-line1 mr-[11px]"
          />
          <div className="flex flex-col justify-evenly">
            <p className="text-[14px] text-font1 font-semibold">
              {userInfo.item.name}
            </p>
            <p className="text-[13px] text-font1">{userInfo.item.email}</p>
          </div>
          <button
            onClick={() => navigate(`/userinfo/${_id}`)}
            className="text-line1 rounded-[6px] border border-line1 ml-auto px-2 py-1 h-fit text-[15px]"
          >
            수정
          </button>
        </div>
      </Layout>
      <Layout>
        <div className="flex gap-3 border-b mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`text-[13px] font-semibold py-1 ${
                list === tab.label
                  ? 'border-b-2 border-font1 text-font1'
                  : 'text-font2'
              }`}
              onClick={() => setList(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {list === '작성글' && (
          <div className="flex flex-col gap-[10px]">
            {myList ? (
              myList.item.map((products: Product, index: number) => (
                <div className="relative" key={index}>
                  <List
                    id={products._id}
                    title={products.name}
                    type={products.extra.type}
                    total={products.quantity}
                    remain={products.buyQuantity}
                    location={products.extra.subLocation}
                    due={products.extra.meetingTime}
                    price={products.price}
                    date={products.createdAt}
                    like={products.bookmarks}
                    comments={products.replies}
                    imageScr={products?.mainImages[0]?.path || ''}
                  />
                  {isNoti.includes(products._id) && (
                    <div className="absolute h-[30px] bg-sub rounded-full bottom-[7px] right-[7px] p-1 flex gap-[5px] items-center px-2">
                      <img src={whiteChef} className="w-[17px]" />
                      <span className="text-[13px] text-white font-medium">
                        신청자가 있어요!
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div>등록한 상품이 없습니다.</div>
            )}
          </div>
        )}
        {list === '좋아요한글' && (
          <div className="flex flex-col gap-[10px]">
            {myLikeList ? (
              myLikeList.item.product.map(
                (products: LikeProducts, index: number) => (
                  <List
                    id={products.product._id}
                    key={index}
                    title={products.product.name}
                    type={products.product.extra?.type}
                    total={products.product.quantity}
                    remain={products.product.buyQuantity}
                    location={products.product.extra.subLocation}
                    due={products.product.extra?.meetingTime}
                    price={products.product.price}
                    imageScr={products?.product.mainImages[0]?.path || ''}
                  />
                ),
              )
            ) : (
              <div>좋아요한 상품이 없습니다.</div>
            )}
          </div>
        )}
        {list === '거래신청글' && (
          <div className="flex flex-col gap-[10px]">
            {myBuyList ? (
              myBuyList.item.map((product: MyProducts, index: number) => (
                <List
                  id={product.products[0]._id}
                  key={index}
                  title={product.products[0].name}
                  type={product.products[0].extra?.type}
                  location={product.products[0].extra?.subLocation}
                  due={product.products[0].extra?.meetingTime}
                  price={product.products[0].price}
                  imageScr={product?.products[0].image.path || ''}
                />
              ))
            ) : (
              <div>거래 신청 상품이 없습니다.</div>
            )}
          </div>
        )}
      </Layout>

      <div className="mt-auto">
        <Button
          height="40px"
          text="text-sm"
          bg="white"
          color="main"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default MyPage;
