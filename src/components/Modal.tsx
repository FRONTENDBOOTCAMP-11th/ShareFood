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
      <div className="absolute top-[84%] left-2/4 w-[400px] h-1/3 p-20px text-center bg-white rounded shadow transform -translate-x-1/2  -translate-y-1/2 animate-revealDown">
        {/* 아래부터 모달 내용 */}
        <h2>공구 장소, 시간을 확인하세요</h2>
        <p>공릉2동 주공아파트 3단지 놀이터 앞</p>
        <p>10:00</p>
      </div>
    </div>
  );
}

export default Modal;
