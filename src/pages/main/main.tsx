import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import { ImageSlide } from '../../components/ImageSlide';
import Select from '../../components/Select';
import List from '../../components/List';
import TypeSelector from '../../components/TypeSelector';

import greenchef from '/images/chef/greenChef.svg';
import search from '/images/icons/search.svg';
import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';

const Main = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="pt-14 pb-[100px] bg-back1">
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
      <ImageSlide />

      {/* 게시글 목록 */}
      <div className="px-[17px] mt-[10px] flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[15px] font-bold text-font1">우리 동네 셰푸들</h2>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsActive((prev) => !prev)}
              className="flex items-center gap-[5px]"
            >
              <img
                src={`${isActive ? checkActive : check}`}
                alt="check"
                className="w-[15px] h-[15px]"
              />
              <p
                className={`text-[13px] ${
                  isActive ? 'text-main' : 'text-font2'
                }`}
              >
                거래 완료 글 숨기기
              </p>
            </button>
            <Select />
          </div>
          <TypeSelector />
        </div>

        <div className="flex flex-col gap-[10px]">
          <List
            title={'귤은 겨울에 먹어야 해요'}
            type={'sell'}
            total={10}
            remain={2}
            location={'제주도 제주시'}
            due={'12/31'}
            price={3000}
            date={'12/31'}
            like={5}
            comments={7}
          />
          <List
            title={'겨울엔 딸기도 맛있다'}
            type={'buy'}
            total={7}
            remain={3}
            location={'이마트 부천시청점'}
            due={'12/31'}
            price={8000}
            date={'12/31'}
            like={15}
            comments={21}
          />
          <List
            title={'귤은 겨울에 먹어야 해요'}
            type={'sell'}
            total={10}
            remain={2}
            location={'제주도 제주시'}
            due={'12/31'}
            price={3000}
            date={'12/31'}
            like={5}
            comments={7}
          />
          <List
            title={'겨울엔 딸기도 맛있다'}
            type={'buy'}
            total={7}
            remain={3}
            location={'이마트 부천시청점'}
            due={'12/31'}
            price={8000}
            date={'12/31'}
            like={15}
            comments={21}
          />
          <List
            title={'귤은 겨울에 먹어야 해요'}
            type={'sell'}
            total={10}
            remain={2}
            location={'제주도 제주시'}
            due={'12/31'}
            price={3000}
            date={'12/31'}
            like={5}
            comments={7}
          />
          <List
            title={'겨울엔 딸기도 맛있다'}
            type={'buy'}
            total={7}
            remain={3}
            location={'이마트 부천시청점'}
            due={'12/31'}
            price={8000}
            date={'12/31'}
            like={15}
            comments={21}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
