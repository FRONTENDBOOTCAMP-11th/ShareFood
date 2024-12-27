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
      <div className="absolute bottom-1/3 left-1/2 w-[400px] p-5 bg-white rounded shadow transform -translate-x-1/2 animate-revealDown ">
        <button
          className="fixed top-4 right-2 size-6 text-3xl text-neutral-50 cursor-pointer"
          onClick={() => closeModal()}
        >
          <img src="images/icons/close.svg" />
        </button>
        {/* 아래부터 모달 내용 */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
