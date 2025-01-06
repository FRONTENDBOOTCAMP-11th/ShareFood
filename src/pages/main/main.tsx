import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Product } from '../../types/productsTypes';
import { useGetList } from '../../hooks/useGetList';
import { useFilterStateStore } from '../../store/listStateStore';

// components
import Header from '../../components/Layout/Header';
import ImageSlide from '../../components/ImageSlide';
import Select from '../../components/Select';
import List from '../../components/List';
import TypeSelector from '../../components/TypeSelector';

// images
import greenchef from '/images/chef/greenChef.svg';
import search from '/images/icons/search.svg';
import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';
import banner1 from '/images/banner/banner1.png';
import banner2 from '/images/banner/banner2.png';

const Main = () => {
  // 필터링 상태
  const {
    soldout,
    setSoldout,
    location,
    setLocation,
    type,
    setType,
  } = useFilterStateStore();

  const navigate = useNavigate();

  //게시글 불러오기
  const { data } = useGetList(soldout, type, location);

  useEffect(() => {
    if (data) {
      console.log(data.item);
    }
  }, [data]);

  // 배너
  const images = [banner1, banner2, banner1, banner2];
  const handleImage1Click = () => alert('Image 1 Clicked!');
  const handleImage2Click = () => {
    window.open(
      'https://blog.naver.com/kies84/223697413966?trackingCode=external',
      '_blank',
    );
  };
  const handleImage3Click = () => alert('Image 3 Clicked!');
  const handleImage4Click = () => alert('Image 4 Clicked!');

  return (
    <div className="pt-14 pb-[100px] bg-back1 min-h-screen">
      {/* 헤더 */}
      <Header>
        <div className="flex items-center">
          <img src={greenchef} alt="Chef Icon" className="w-6 h-6" />
          <h1 className="text-5 font-bold ml-2 text-font1">Share Food</h1>
        </div>

        <button
          onClick={() => navigate('/search')}
          className="fixed right-[30px]"
        >
          <img src={search} alt="Search Icon" className="w-5 h-5" />
        </button>
      </Header>

      {/* 이미지 슬라이드 */}
      <ImageSlide
        imageList={images}
        autoSlide={true}
        onClickHandler={[
          handleImage1Click,
          handleImage2Click,
          handleImage3Click,
          handleImage4Click,
        ]}
      />

      {/* 게시글 목록 */}
      <div className="px-[17px] mt-[10px] flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[15px] font-bold text-font1">우리 동네 셰푸들</h2>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSoldout((prev) => !prev)}
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
          <TypeSelector
            setProductsType={setType}
            productsType={type}
          />
        </div>

        {data ? (
          <div className="flex flex-col gap-[10px]">
            {data.item.map((products: Product, index: number) => (
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
          </div>
        ) : (
          <div>로딩중...</div>
        )}
      </div>
    </div>
  );
};

export default Main;
