import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Product } from '../../types/productsTypes';

import { useGetList } from '../../hooks/useGetList';
import { useGetNotification } from '../../hooks/useGetNotification';

//store
import { useFilterStateStore } from '../../store/listStateStore';
import { viewPaymentStore } from '../../store/detailStore';
import { useAuthStore } from '../../store/authStore';

// components
import Header from '../../components/Layout/Header';
import ImageSlide from '../../components/ImageSlide';
import Select from '../../components/Select';
import TypeSelector from '../../components/TypeSelector';
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
import noticeChef from '/images/chef/noticeChef.svg';
import rightArrow from '/images/arrow/rightArrow.svg';
import ProductList from './productList';

const Main = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Product[]>([]);

  const { user } = useAuthStore();

  // 필터링 상태
  const { soldout, setSoldout, location, setLocation, type, setType } =
    useFilterStateStore();

  // 게시글 불러오기
  const { data, isLoading } = useGetList(
    soldout,
    type,
    location,
    undefined,
    page ?? 1,
    2,
  );

  // 알림 불러오기
  const { data: notification } = useGetNotification();

  // 모달 나타나는 여부, true일 경우 출력
  const { viewPayment, setViewPayment } = viewPaymentStore();

  useEffect(() => {
    if (data) {
      let newItems = data.item;
      if (page > 1) {
        newItems = [...items, ...data.item];
      }
      setItems(newItems);
    }
  }, [data]);

  const handleChangeLocation = (location: string) => {
    setPage(1);
    setLocation(location);
  };

  // 게시글 더 불러오기
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  // 거래 완료된 상품 보기/숨기기
  const viewSoldout = () => {
    setPage(1);
    setSoldout((prev) => !prev);
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
          <div className="relative">
            <img
              src={`${apiUrl}${user?.profile}`}
              className="w-[35px] h-[35px] rounded-full object-cover"
              onClick={handleModal}
            />
            {notification && notification?.length > 0 && (
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
          <h2 className="text-[15px] font-bold text-font1">
            우리 동네 셰푸들 {data && `(${data.pagination.total}건)`}
          </h2>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={viewSoldout}
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
              setMeetingLocation={handleChangeLocation}
            />
          </div>
          <TypeSelector setProductsType={setType} productsType={type} />
        </div>

        {isLoading && page === 1 ? <Loading /> : <ProductList items={items} />}

        {isLoading && page !== 1 && <Loading />}

        {page < data?.pagination.totalPages && ( // 모든 데이터를 불러온 경우 버튼 숨김
          <button
            onClick={() => {
              loadMore();
            }}
            className="mt-5 p-2 bg-main text-white rounded-md"
          >
            더보기
          </button>
        )}
      </div>
      {viewPayment && (
        <Modal setViewPayment={setViewPayment}>
          <div className="flex gap-1">
            <h2 className="text-[22px] font-bold text-main">알림 목록</h2>
            <img src={noticeChef} className="w-[30px]" />
          </div>
          <div className="flex flex-col gap-4 py-5 divide-y">
            {notification && notification.length > 0 ? (
              notification.map((key) => (
                <div
                  className="flex justify-between items-center pt-2"
                  key={key._id}
                >
                  <div
                    className={`flex gap-[2px] ${key.content.length > 15 ? 'flex-col' : 'flex-row'}`}
                  >
                    <p className="text-font1 text-[14px] font-semibold max-w-[200px]">
                      {key.user.name}님이
                    </p>
                    <p className="text-main text-[14px] font-semibold max-w-[200px]">
                      {key.content}
                    </p>
                    {key.type === 'message' && (
                      <p className="text-font1 text-[14px] font-semibold">
                        라는 메시지를 보냈어요!
                      </p>
                    )}
                  </div>
                  {key.type === 'product' && (
                    <Button
                      bg="main"
                      color="white"
                      height="30px"
                      width="40px"
                      text="text-sm"
                      onClick={() => {
                        navigate(`/detail/${key.extra.productId}`);
                        setViewPayment(false);
                      }}
                    >
                      <img src={rightArrow} className="m-auto w-[20px]" />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <p>알림이 없습니다</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Main;
