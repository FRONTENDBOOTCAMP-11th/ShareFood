import Tag from './Tag';
import Button from './Button';

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

  return (
    <div className="absolute justify-normal top-0 left-0 w-full h-full bg-black opacity-20 overflow-hidden">
      <button
        className="absolute top-3 right-6 w-4 h-4 text-3xl text-neutral-50 cursor-pointer"
        onClick={() => closeModal()}
      >
        X
      </button>
      <div className="absolute top-[84%] left-2/4 w-[400px] h-1/3 p-5 text-center bg-white rounded shadow transform -translate-x-1/2  -translate-y-1/2 animate-revealDown">
        {/* 아래부터 모달 내용 */}
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
    </div>
  );
}

export default Modal;
