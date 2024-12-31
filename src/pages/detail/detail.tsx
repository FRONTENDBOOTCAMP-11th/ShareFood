import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Header from '../../components/Layout/Header';
import Total from '../../components/Total';
import PostType from '../../components/PostType';
import Comment from '../../components/Comment/Comment';
import CommentAdd from '../../components/Comment/CommentAdd';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Tag from '../../components/Tag';
import { axiosInstance } from '../../hooks/axiosInstance';

import close from '/images/icons/close.svg';
import basicImage from '/images/chef/drawingChef.svg';

import { ImageSlideDetail } from '../../components/ImageSlideDetail';

const Detail = () => {
  // 공구인지, 판매하기인지에 따라 멘트 구별
  // const typeSell: string = 'sell';
  // const typeBuy: string = 'buy';

  const axios = axiosInstance;
  // postNum에 useParams를 사용해서 값을 가져올 거임 ㅇㅇ
  // 임시로 하드 코딩
  const postNum: number = 1;
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => axios.get(`/products/${postNum}`),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  const navigate = useNavigate();

  // 관심 및 댓글의 수
  const [interest, setInterest] = useState(7);
  const [commentNum, setCommentNum] = useState(5);

  const [viewPayment, setViewPayment] = useState(false);

  // counter 상태 관리
  // const [num, setNum] = useState(0);

  // modal 상태 관리
  // 상세페이지에서 버튼 클릭했을 때 정보를 받아서 모달 콘텐츠가 알맞게 나오게 하면 될 것 같습니다.
  // 임시로 공구하기, 구매자 확인만 동작하게 만들었습니다.
  const [content, setContent] = useState<string>();

  const handleModal = (contentType: string) => {
    setContent(contentType);
    setViewPayment(true);
  };

  if (!data) {
    return <div>로딩중...</div>;
  }

  const productType: string = data.item.extra.type;

  return (
    <div className="pt-14 pb-[100px] min-h-screen">
      <Header>
        <div className="flex items-center">
          <h1 className="text-5 font-bold ml-2 text-font1">{data.item.name}</h1>
        </div>
        <button onClick={() => navigate(-1)} className="fixed right-[17px]">
          <img src={close} alt="Close Icon" className="w-5 h-5" />
        </button>
      </Header>

      {/* 이미지 슬라이드 */}
      <div className="max-w-[448px] min-h-[212px] overflow-hidden">
        <ImageSlideDetail imageList={data.item.mainImages} autoSlide={false} />
      </div>

      <div className="px-[28px] py-[15px] flex flex-col gap-[20px]">
        <div className="flex">
          <h1 className="grow font-bold text-xl">{data.item.name}</h1>
          <PostType type={productType} />
        </div>

        <div className="board-author flex items-center">
          <img
            className="w-[38px] h-[38px] rounded-full"
            src={
              data.item.seller.image
                ? `https://11.fesp.shop${data.item.seller.image}`
                : basicImage
            }
            alt="기본 이미지"
          />
          <h2 className="grow ml-3 font-medium text-sm">
            {data.item.seller.name}
          </h2>
          <div className="border border-main rounded-full px-5 py-[1px]">
            <p className="text-xs font-normal text-main leading-6 text-center">
              {data.item.extra.location}
            </p>
          </div>
        </div>

        <div className="board-transinfo flex flex-col gap-[10px]">
          <div className="border-l-2 pl-[10px]">
            <Tag children={data.item.extra.subLocation} tagName={'location'} />
          </div>
          <div className="border-l-2 pl-[10px]">
            <Tag children={data.item.extra.meetingTime} tagName={'time'} />
          </div>
          <div className="border-l-2 pl-[10px]">
            <Tag
              children={`${data.item.buyQuantity} / ${data.item.quantity}`}
              tagName={'member'}
            />
          </div>
        </div>

        <p className="whitespace-pre-wrap text-[15px]">{data.item.content}</p>

        <Total
          interest={interest}
          setInterest={setInterest}
          commentNum={commentNum}
        />

        <div className="board-attach">
          <h2 className="text-base font-bold mb-[15px]">댓글</h2>
          <Comment />
          <CommentAdd />
          <Button
            height="40px"
            text="text-sm"
            bg="main"
            color="white"
            onClick={() => handleModal(productType)}
          >
            공구하기
          </Button>
        </div>

        {viewPayment && (
          <Modal setViewPayment={setViewPayment}>
            {/* content에 입력된 정보에 따라서 modal 내용이 변경될 수 있게 */}
            {content === productType && (
              <div>
                <h2 className="mb-5 font-semibold">
                  공구 장소, 시간을 확인하세요
                </h2>
                <div className="flex flex-col gap-4 mb-8">
                  <Tag tagName="location">
                    공릉2동 주공아파트 3단지 놀이터 앞
                  </Tag>
                  <Tag tagName="time">10:00</Tag>
                  <Tag tagName="member">2/10</Tag>
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
            {content === productType && (
              <div>
                <h2 className="mb-3">구매 신청자 목록</h2>
                <div className="flex flex-col gap-5">
                  <Tag tagName="member">2/10</Tag>
                  <ul className="mr-7 flex flex-col gap-3">
                    <li className="flex items-center gap-3">
                      <img src="images/chef/greenChef.svg" />
                      <p className="grow text-left">장유진</p>
                      <Tag tagName="item">1/6</Tag>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="images/chef/greenChef.svg" />
                      <p className="grow text-left">이선재</p>
                      <Tag tagName="item">1/6</Tag>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="images/chef/greenChef.svg" />
                      <p className="grow text-left">이현종</p>
                      <Tag tagName="item">1/6</Tag>
                    </li>
                    <li className="flex items-center gap-3">
                      <img src="images/chef/greenChef.svg" />
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
