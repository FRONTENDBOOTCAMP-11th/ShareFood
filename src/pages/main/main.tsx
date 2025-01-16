import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Product } from '../../types/productsTypes';
import { useGetList } from '../../hooks/useGetList';
import { useGetNotification } from '../../hooks/useGetNotification';

//store
import { useFilterStateStore } from '../../store/listStateStore';
import { useListStateStore } from '../../store/listStateStore';

// components
import Header from '../../components/Layout/Header';
import ImageSlide from '../../components/ImageSlide';
import Select from '../../components/Select';
import List from '../../components/List';
import TypeSelector from '../../components/TypeSelector';
import { NoData } from '../../components/NoData';
import Button from '../../components/Button';

// constants
import { BANNERS, BANNERS_LINKS } from '../../constants/banner';

// images
import greenchef from '/images/chef/greenChef.svg';
import search from '/images/icons/search.svg';
import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';
import Loading from '../../components/Loading';
import Modal from '../../components/Modal';
import { viewPaymentStore } from '../../store/detailStore';
import { useAuthStore } from '../../store/authStore';

const Main = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthStore();
  const prevFilters = useRef({
    soldout: true,
    type: 'buy',
    location: '전체지역',
  });
  const resetCalled = useRef(false);

  // 필터링 상태
  const { soldout, setSoldout, location, setLocation, type, setType } =
    useFilterStateStore();
  const {
    items,
    setItems,
    addItems,
    page,
    setPage,
    totalItems,
    setTotalItems,
    resetList,
  } = useListStateStore();

  // 게시글 불러오기
  const { data } = useGetList(soldout, type, location, undefined, page ?? 1, 2);

  // 알림 불러오기
  const { data: notification } = useGetNotification();
  if (notification) console.log(notification);
  // 모달 나타나는 여부, true일 경우 출력
  const { viewPayment, setViewPayment } = viewPaymentStore();

  // 게시글 추가하기
  useEffect(() => {
    if (data) {
      if (data.item.length > 0) {
        if (page === 1) {
          setItems(data.item);
        } else {
          addItems(data.item);
        }
        setTotalItems(data.pagination.total);
        setIsLoading(false);
      } else if (data.item.length === 0) {
        resetList();
      }
    }
  }, [data, page]);

  // 필터 조건 변경 시 상태 초기화
  useEffect(() => {
    // 상태가 변경된 경우에만 resetList 호출
    if (
      !resetCalled.current &&
      (prevFilters.current.soldout !== soldout ||
        prevFilters.current.type !== type ||
        prevFilters.current.location !== location)
    ) {
      resetList();
      resetCalled.current = true;
    }

    // 이전 상태를 현재 상태로 업데이트
    prevFilters.current = { soldout, type, location };

    // 컴포넌트가 언마운트될 때 플래그 초기화
    if (items.length === 0) {
      resetCalled.current = false;
    }
  }, [soldout, type, location, resetList]);

  // 게시글 더 불러오기
  const loadMore = () => {
    setIsLoading(true);
    setPage(page + 1);
  };

  // 배너 클릭 이벤트
  const BannerClick = (index: number) => {
    const link = BANNERS_LINKS[index];
    if (link) {
      window.open(link, '_blank');
    }
  };
  const BannerClickHandler = BANNERS_LINKS.map(
    (_, index) => () => BannerClick(index),
  );

  // 알림 모달 오픈
  const handleModal = () => {
    setViewPayment(true);
  };

  return (
    <div className="pt-14 pb-[100px] bg-back1 min-h-screen">
      {/* 헤더 */}
      <Header>
        <div className="flex justify-between w-full">
          <div className='relative'>
            <img
              src={`${apiUrl}${user?.profile}`}
              className="w-[30px] rounded-full"
              onClick={handleModal}
            />
            {notification && (
              <div className="w-[8px] h-[8px] rounded-full bg-sub absolute top-0 right-0"></div>
            )}
          </div>

          <div className="flex items-center">
            <img src={greenchef} alt="Chef Icon" className="w-6 h-6" />
            <h1 className="text-5 font-bold ml-2 text-font1">Share Food</h1>
          </div>

          <button onClick={() => navigate('/search')}>
            <img src={search} alt="Search Icon" className="w-[24px] h-[24px]" />
          </button>
        </div>
      </Header>

      {/* 이미지 슬라이드 */}
      <ImageSlide
        imageList={BANNERS}
        autoSlide={true}
        onClickHandler={BannerClickHandler}
      />

      {/* 게시글 목록 */}
      <div className="px-[17px] mt-[10px] flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[15px] font-bold text-font1">우리 동네 셰푸들</h2>
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.preventDefault();
                setSoldout((prev) => !prev);
              }}
              className="flex items-center gap-[5px]"
            >
              <img
                src={`${soldout ? checkActive : check}`}
                alt="check"
                className="w-[15px] h-[15px]"
              />
              <p
                className={`text-[13px] ${
                  soldout ? 'text-main' : 'text-font2'
                }`}
              >
                거래 완료 된 상품도 보기
              </p>
            </button>
            <Select
              meetingLocation={location}
              setMeetingLocation={setLocation}
            />
          </div>
          <TypeSelector setProductsType={setType} productsType={type} />
        </div>

        {items.length > 0 ? (
          <div className="flex flex-col gap-[10px]">
            {items.map((products: Product, index: number) => (
              <List
                id={products._id}
                key={index}
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
            ))}
            {isLoading && (
              <div className="pt-3">
                <Loading />
              </div>
            )}
            {/* 더보기 버튼 */}
            {items.length < totalItems && ( // 모든 데이터를 불러온 경우 버튼 숨김
              <button
                onClick={(e) => {
                  e.preventDefault();
                  loadMore();
                  resetCalled.current = false;
                }}
                className="mt-5 p-2 bg-main text-white rounded-md"
              >
                더보기
              </button>
            )}
          </div>
        ) : (
          <NoData />
        )}
      </div>
      {viewPayment && (
        <Modal setViewPayment={setViewPayment}>
          <h2 className='text-[22px] font-bold text-main'>알림 목록</h2>
          <div className="flex flex-col gap-4 py-5 divide-y">
            {notification?.map((key) => (
              <div
                className="flex justify-between items-center pt-2"
                key={key._id}
              >
                <p className="text-font1 font-semibold">
                  {key.user.name}님이 {key.content}
                </p>
                <Button
                  bg="main"
                  color="white"
                  height="40px"
                  width="100px"
                  text="text-sm"
                  onClick={() => {
                    navigate(`/detail/${key.extra.productId}`);
                    setViewPayment(false);
                  }}
                >
                  확인하기
                </Button>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Main;
