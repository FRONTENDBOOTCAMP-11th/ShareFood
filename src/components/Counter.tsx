interface CountProps {
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
}

// 컴포넌트의 매개변수로 state(number), setter 함수를 전달 해줘야 합니다
// ex) const [num, setNum] = useState(0);
// <Counter num={num} setNum={setNum}/>
function Counter({ num, setNum }: CountProps) {
  const handleDown = () => {
    if (num <= 0) {
      alert('0보다 작은 수는 입력할 수 없습니다.');
    } else if (num > 0) {
      setNum(num - 1);
    }
  };

  const handleUp = () => {
    setNum(num + 1);
  };

  return (
    <div className="flex">
      <button
        type="button"
        className="x-2 px-2 bg-gray-300 text-black rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
        onClick={() => handleDown()}
      >
        -
      </button>
      <div className="mx-3.5">{num}</div>
      <button
        type="button"
        className="x-2 px-1.5 bg-gray-300 text-black rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
        onClick={() => handleUp()}
      >
        +
      </button>
    </div>
  );
}

export default Counter;
