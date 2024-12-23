import Header from '../../components/Header';
import { ImageSlide } from '../../components/ImageSlide';

import greenchef from '/images/greenchef.svg';
import search from '/images/icons/search.svg';

const Main = () => {
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
        <div>
          <h2 className='font-sans'>우리 동네 셰푸들</h2>
        </div>
      </div>
    </div>
  );
};

export default Main;
