import List from "../../components/List";
import { Product } from '../../types/productsTypes';
import TypeSelector from '../../components/TypeSelector';
import Select from "../../components/Select";
import { useEffect, useState } from "react";
import { useGetList } from "../../hooks/useGetList";
import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';

interface SearchListProps {
  results: Product[]; // 검색 결과 타입 정의 (구체적으로 알면 any 대신 해당 타입 사용)
}

const SearchList: React.FC<SearchListProps> = () => {

  const [showSoldOut, setShowSoldOut] = useState(false);
  const [productsType, setProductsType] = useState('buy');
  const [meetingLocation, setMeetingLocation] = useState('전체지역');

  //게시글 불러오기
  const { data } = useGetList(showSoldOut, productsType, meetingLocation, keyword);

  useEffect(() => {
    if (data) {
      console.log(data.item);
    }
  }, [data]);

  return (
    <>
      <div className="pt-14 bg-back1 h-screen flex flex-col">

        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSoldOut((prev) => !prev)}
            className="flex items-center gap-[5px]"
          >
            <img
              src={`${showSoldOut ? checkActive : check}`}
              alt="check"
              className="w-[15px] h-[15px]"
            />
            <p
              className={`text-[13px] ${showSoldOut ? 'text-main' : 'text-font2'
                }`}
            >
              거래 완료 된 상품 보기
            </p>
          </button>
          <Select
            meetingLocation={meetingLocation}
            setMeetingLocation={setMeetingLocation}
          />
        </div>
        <div className="px-4 flex flex-col gap-[10px] mt-4">
          <TypeSelector
            setProductsType={setProductsType}
            productsType={productsType}
          />
          {data ? (
            <div className="flex flex-col gap-[10px]">
              {data.item.map((products: Product, index: number) => (
                <List
                  id={products._id}
                  key={index}
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
