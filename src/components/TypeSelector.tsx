interface TypeSelectorTypes {
  productsType: string;
  setProductsType: (type: string) => void;
  onClick?: (page: number) => void;
}

const TypeSelector = ({
  productsType,
  setProductsType,
  onClick,
}: TypeSelectorTypes) => {
  return (
    <div className="bg-white p-[2px] rounded-[5px] flex border">
      <button
        type="button"
        onClick={() => {
          if (onClick) {
            onClick(1);
          }
          setProductsType('buy');
        }}
        className={`text-[14px] w-[50%] py-3 rounded-[5px] font-medium ${
          productsType === 'buy' ? 'bg-main text-white' : 'bg-white text-font1'
        }`}
      >
        같이 사요
      </button>

      <button
        type="button"
        onClick={() => {
          if (onClick) {
            onClick(1);
          }
          setProductsType('sell');
        }}
        className={`text-[14px] w-[50%] py-3 rounded-[5px] font-medium ${
          productsType === 'sell' ? 'bg-main text-white' : 'bg-white text-font1'
        }`}
      >
        팔아요
      </button>
    </div>
  );
};

export default TypeSelector;
