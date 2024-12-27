interface props {
  setViewPayment: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

// 부모 컴포넌트에 modal 여부를 결정하는 state, Modal 컴포넌트에 setter를 전달해야 합니다.
// ex) const [viewPayment, setViewPayment] = useState(false);
// {viewPayment && <Modal setViewPayment={setViewPayment} />}
function Modal({ setViewPayment, children }: props) {
  const closeModal = () => {
    setViewPayment(false);
  };

  return (
    <div className="fixed justify-normal top-0 left-50 w-[448px] h-full bg-black bg-opacity-20 overflow-hidden">
      <button
        className="fixed top-16 right-40 w-4 h-4 text-3xl text-neutral-50 cursor-pointer"
        onClick={() => closeModal()}
      >
        X
      </button>
      {/* <div className="absolute top-[84%] left-2/4 w-[400px] h-1/3 p-5 text-center bg-white rounded shadow transform -translate-x-1/2 -translate-y-1/2 animate-revealDown"> */}
      <div className="absolute bottom-0 left-1/2 w-[400px] p-5 text-center bg-white rounded shadow transform -translate-x-1/2 animate-revealDown">
        {/* 아래부터 모달 내용 */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
