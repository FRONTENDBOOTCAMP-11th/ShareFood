import Tag from './Tag';
import Button from './Button';
import Counter from './Counter';
import { useState } from 'react';

interface props {
  setViewPayment: React.Dispatch<React.SetStateAction<boolean>>;
}

// 부모 컴포넌트에 modal 여부를 결정하는 state, Modal 컴포넌트에 setter를 전달해야 합니다.
// ex) const [viewPayment, setViewPayment] = useState(false);
// {viewPayment && <Modal setViewPayment={setViewPayment} />}
function Modal({ setViewPayment }: props) {
  const closeModal = () => {
    setViewPayment(false);
  };

  // counter 상태 관리
  const [num, setNum] = useState(0);

  // modal 상태 관리
  // 임시로 1, 2, 3으로 지정했고 추후에 상세페이지에서 버튼 클릭했을 때
  // 정보를 받아서 모달 콘텐츠가 알맞게 나오게 하면 될 것 같습니다.
  const [content] = useState(2);

  return (
    <div className="absolute justify-normal top-0 left-0 w-full h-full bg-black bg-opacity-20 overflow-hidden">
      <button
        className="absolute top-3 right-6 w-4 h-4 text-3xl text-neutral-50 cursor-pointer"
        onClick={() => closeModal()}
      >
        X
      </button>
      {/* <div className="absolute top-[84%] left-2/4 w-[400px] h-1/3 p-5 text-center bg-white rounded shadow transform -translate-x-1/2 -translate-y-1/2 animate-revealDown"> */}
      <div className="absolute bottom-0 left-1/2 w-[400px] p-5 text-center bg-white rounded shadow transform -translate-x-1/2 animate-revealDown">
        {/* 아래부터 모달 내용 */}
        {/* content에 입력된 정보에 따라서 modal 내용이 변경될 수 있게 */}
        {content === 1 && (
          <div>
            <h2 className="mb-5 font-semibold">공구 장소, 시간을 확인하세요</h2>
            <div className="flex flex-col gap-4 mb-8">
              <Tag tagName="location">공릉2동 주공아파트 3단지 놀이터 앞</Tag>
              <Tag tagName="time">10:00</Tag>
              <Tag tagName="people">2/10</Tag>
            </div>
            <Button bg="main" color="white" height="40px" text="text-sm">
              공구하기
            </Button>
          </div>
        )}
        {content === 2 && (
          <div>
            <h2 className="mb-5 font-semibold">
              거래 가격, 장소, 개수를 확인하세요
            </h2>
            <div className="flex flex-col gap-4 mb-8">
              <Tag tagName="cash">총가격 : 9,000원</Tag>
              <Tag tagName="location">공릉2동 주공아파트 3단지 놀이터 앞</Tag>
              <Tag tagName="item">
                구매 개수 <Counter num={num} setNum={setNum}></Counter>
              </Tag>
              <Tag tagName="time">10:00</Tag>
            </div>
            <Button bg="main" color="white" height="40px" text="text-sm">
              구매하기
            </Button>
          </div>
        )}

        {/* 구매자 늘어나면 스크롤 넣어야 될것 같습니다. */}
        {content === 3 && (
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
      </div>
    </div>
  );
}

export default Modal;
