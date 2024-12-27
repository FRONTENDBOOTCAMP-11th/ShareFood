import { useState } from 'react';

import { ImageSlideDetail } from '../../components/ImageSlideDetail';
import Header from '../../components/Header';
import Total from '../../components/Total';
import PostType from '../../components/PostType';
import Comment from '../../components/Comment';
import CommentAdd from '../../components/CommentAdd';
import Button from '../../components/Button';

import close from '/images/icons/close.svg';
import basicImage from '/images/chef/drawingChef.svg';
import map from '/images/tag/location.svg';
import time from '/images/tag/time.svg';
import member from '/images/tag/member.svg';

const Detail = () => {
  // 공구인지, 판매하기인지에 따라 멘트 구별
  const typeSell: string = 'sell';
  const typeBuy: string = 'buy';

  // 관심 및 댓글의 수
  const [interest, setInterest] = useState(7);
  const [commentNum, setCommentNum] = useState(5);
  return (
    <div className="pt-14 pb-[100px] h-screen">
      <Header>
        <div className="flex items-center">
          <h1 className="text-5 font-bold ml-2 text-font1">
            포도 함께 사실 분~!
          </h1>
        </div>
        <button className="fixed right-[17px]">
          <img src={close} alt="Close Icon" className="w-5 h-5" />
          {/* X 버튼 누를 시 이번트 설정 必 */}
        </button>
      </Header>

      {/* 이미지 슬라이드 */}
      <ImageSlideDetail />

      <div className="main">
        <div className="board-info">
          <div className="board-title flex mt-4 pl-7 pr-6">
            <h1 className="grow font-bold text-xl">포도 함께 사실 분~!</h1>
            <PostType type={typeBuy} />
          </div>
          <div className="board-author flex mt-6 items-center">
            <img src={basicImage} alt="기본 이미지" className="ml-7" />
            <h2 className="grow ml-3 font-medium text-sm">닉네임</h2>
            <div className="mr-5 border w-[60px] h-[25px] border-main rounded-full">
              <p className="w-fit mx-auto text-xs font-normal text-main leading-6">
                서울
              </p>
            </div>
          </div>
          <div className="board-transinfo mt-[26px] ml-[28px] flex flex-col gap-y-3">
            <div className="location flex border-l-2">
              <img src={map} alt="장소" className="ml-[7px] mr-[9.5px] w-[16px] h-[20px]" />
              <p>공릉2동 주공아파트 3단지 놀이터 앞</p>
            </div>
            <div className="time flex border-l-2">
              <img src={time} alt="시간" className="ml-[7px] mr-[9.5px]" />
              <p>10:00</p>
            </div>
            <div className="member flex border-l-2">
              <img
                src={member}
                alt="구매자 현황"
                className="ml-[7px] mr-[9.5px]"
              />
              <p>2 / 10</p>
            </div>
          </div>
          <div className="board-content mt-[18px] mx-[28px] mb-[22px]">
            <p className="whitespace-pre-wrap">
              상태 좋고 맛있어요
              <br />
              얼른 가져가세요 ~
            </p>
          </div>
          <Total
            interest={interest}
            setInterest={setInterest}
            commentNum={commentNum}
          />
        </div>
        <div className="board-attach">
          <div className="attach-title mx-[26px] mt-[16px] mb-[18px]">
            <h1 className="text-base font-bold">댓글</h1>
          </div>
          <Comment />
          <CommentAdd />
          <Button height="40px" text="text-sm" bg="main" color="white">
            공구하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
