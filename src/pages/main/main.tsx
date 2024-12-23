import { useState } from 'react';

import Header from '../../components/Header';
import { ImageSlide } from '../../components/ImageSlide';

import greenchef from '/images/greenchef.svg';
import search from '/images/icons/search.svg';
import check from '/images/icons/check.svg';
import checkActive from '/images/icons/check-active.svg';
import Select from '../../components/Select';

const Main = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="pt-14">
      {/* 헤더 */}
      <Header>
        <div className="flex items-center">
          <img src={greenchef} alt="Chef Icon" className="w-6 h-6" />
          <h1 className="text-5 font-bold ml-2 text-mainText">Share Food</h1>
        </div>

        <button className="fixed right-[20px]">
          <img src={search} alt="Search Icon" className="w-5 h-5" />
        </button>
      </Header>

      {/* 이미지 슬라이드 */}
      <ImageSlide />

      {/* 게시글 목록 */}
      <div className="px-[13px] mt-[10px] flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-[15px] font-bold text-mainText">
            우리 동네 셰푸들
          </h2>
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
                  isActive ? 'text-main' : 'text-subText'
                }`}
              >
                거래 완료 글 숨기기
              </p>
            </button>
            <Select />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
