import { useState } from 'react';

import { ImageSlideDetail } from '../../components/ImageSlideDetail';
import Header from '../../components/Header';
import Total from '../../components/Total';
import PostType from '../../components/PostType';
import Comment from '../../components/Comment';
import CommentAdd from '../../components/CommentAdd';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Tag from '../../components/Tag';

import close from '/images/icons/close.svg';
import basicImage from '/images/chef/drawingChef.svg';
import map from '/images/tag/location.svg';
import time from '/images/tag/time.svg';
import member from '/images/tag/member.svg';
import Modal from '../../components/Modal';
import Tag from '../../components/Tag';

const Detail = () => {
  // 공구인지, 판매하기인지에 따라 멘트 구별
  const typeSell: string = 'sell';
  const typeBuy: string = 'buy';

  // 관심 및 댓글의 수
  const [interest, setInterest] = useState(7);
  const [commentNum, setCommentNum] = useState(5);

  const [viewPayment, setViewPayment] = useState(false);

  // counter 상태 관리
  // const [num, setNum] = useState(0);

  // modal 상태 관리
  // 상세페이지에서 버튼 클릭했을 때 정보를 받아서 모달 콘텐츠가 알맞게 나오게 하면 될 것 같습니다.
  // 임시로 공구하기, 구매자 확인만 동작하게 만들었습니다.
  const [content, setContent] = useState(typeBuy);

  const handleModal = (contentType: string) => {
    setContent(contentType);
    setViewPayment(true);
  };

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
              <img
                src={map}
                alt="장소"
                className="ml-[7px] mr-[9.5px] w-[16px] h-[20px]"
              />
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
          <Button
            height="40px"
            text="text-sm"
            bg="main"
            color="white"
            // handleModal 변수에 따라서 모달 내용 변경되게
            onClick={() => handleModal(typeBuy)}
          >
            공구하기
          </Button>
        </div>
        {viewPayment && (
          <Modal setViewPayment={setViewPayment}>
            {/* content에 입력된 정보에 따라서 modal 내용이 변경될 수 있게 */}
            {content === typeBuy && (
              <div>
                <h2 className="mb-5 font-semibold">
                  공구 장소, 시간을 확인하세요
                </h2>
                <div className="flex flex-col gap-4 mb-8">
                  <Tag tagName="location">
                    공릉2동 주공아파트 3단지 놀이터 앞
                  </Tag>
                  <Tag tagName="time">10:00</Tag>
                  <Tag tagName="people">2/10</Tag>
                </div>
                <Button bg="main" color="white" height="40px" text="text-sm">
                  공구하기
                </Button>
              </div>
            )}
            {/* {content === ??? && (
                <div>
                  <h2 className="mb-5 font-semibold">
                    거래 가격, 장소, 개수를 확인하세요
                  </h2>
                  <div className="flex flex-col gap-4 mb-8">
                    <Tag tagName="cash">총가격 : 9,000원</Tag>
                    <Tag tagName="location">
                      공릉2동 주공아파트 3단지 놀이터 앞
                    </Tag>
                    <Tag tagName="item">
                      구매 개수 <Counter num={num} setNum={setNum}></Counter>
                    </Tag>
                    <Tag tagName="time">10:00</Tag>
                  </div>
                  <Button bg="main" color="white" height="40px" text="text-sm">
                    구매하기
                  </Button>
                </div>
              )} */}
            {/* 구매자 늘어나면 스크롤 넣어야 될것 같습니다. */}
            {content === typeSell && (
              <div>
                <h2 className="mb-3">구매 신청자 목록</h2>
                <div className="flex flex-col gap-5">
                  <Tag tagName="people">2/10</Tag>
                  <ul className="mr-7 flex flex-col gap-3">
                    <li className="flex items-center gap-3">
                      <img src="images/logos/default_image.svg" />
                      <p className="grow text-left">장유진</p>
                      <Tag tagName="item">1/6</Tag>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="images/logos/default_image.svg" />
                      <p className="grow text-left">이선재</p>
                      <Tag tagName="item">1/6</Tag>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="images/logos/default_image.svg" />
                      <p className="grow text-left">이현종</p>
                      <Tag tagName="item">1/6</Tag>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="images/logos/default_image.svg" />
                      <p className="grow text-left">김건우</p>
                      <Tag tagName="item">1/6</Tag>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Detail;
