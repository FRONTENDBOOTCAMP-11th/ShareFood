import { Product } from '../../types/productsTypes';

import List from '../../components/List';
import TypeSelector from '../../components/TypeSelector';
import Select from '../../components/Select';

import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';

interface SearchListProps {
  results: Product[];
  showSoldOut: boolean;
  handleShowSoldout: () => void;
  productsType: string;
  handleProductsType: (type: string) => void;
  meetingLocation: string;
  handleMeetingLoction: (location: string) => void;
}

const SearchList: React.FC<SearchListProps> = ({
  results,
  showSoldOut,
  handleShowSoldout,
  productsType,
  handleProductsType,
  meetingLocation,
  handleMeetingLoction,
}) => {
  return (
    <>
      <div className="pt-14 bg-back1 h-screen flex flex-col">
        <div className="flex items-center justify-between">
          <button
            onClick={handleShowSoldout}
            className="flex items-center gap-[5px]"
          >
            <img
              src={`${showSoldOut ? checkActive : check}`}
              alt="check"
              className="w-[15px] h-[15px]"
            />
            <p
              className={`text-[13px] ${
                showSoldOut ? 'text-main' : 'text-font2'
              }`}
            >
              거래 완료 된 상품 보기
            </p>
          </button>
          <Select
            meetingLocation={meetingLocation}
            setMeetingLocation={handleMeetingLoction}
          />
        </div>
        <div className="px-4 flex flex-col gap-[10px] mt-4">
          <TypeSelector
            setProductsType={handleProductsType}
            productsType={productsType}
          />
          {results ? (
            <div className="flex flex-col gap-[10px]">
              {results.map((products: Product, index: number) => (
                <List
                  key={index}
                  id={products._id}
                  title={products.name}
                  type={products.extra.type}
                  total={products.quantity}
                  remain={products.buyQuantity}
                  location={products.extra.subLocation}
                  due={products.extra.meetingTime}
                  price={products.price}
                  date={products.createdAt}
                  like={products.bookmarks}
                  comments={products.replies}
                  imageScr={products?.mainImages[0]?.path || ''}
                />
              ))}
            </div>
          ) : (
            <div>로딩중...</div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchList;
