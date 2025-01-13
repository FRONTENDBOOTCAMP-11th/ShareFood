interface props {
  setViewPayment: (viewPayment: boolean) => void;
  // setViewPayment: React.Dispatch<React.SetStateAction<boolean>>;
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
    <div
      onClick={closeModal}
      className="fixed inset-0 z-[110] bg-black bg-opacity-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-[400px] p-5 bg-white rounded-[10px] shadow-custom animate-revealDown max-h-[500px] overflow-scroll [&::-webkit-scrollbar]:hidden"
      >
        <button
          className="absolute top-4 right-4 size-6 text-3xl text-neutral-500 cursor-pointer"
          onClick={closeModal}
        >
          <img src="/images/icons/close.svg" alt="닫기" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
