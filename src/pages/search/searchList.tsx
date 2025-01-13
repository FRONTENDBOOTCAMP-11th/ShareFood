import { Product } from '../../types/productsTypes';

import List from '../../components/List';

interface SearchListProps {
  data: Product[];
}

const SearchList: React.FC<SearchListProps> = ({ data }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-[10px] mt-4">
          {data ? (
            <div className="flex flex-col gap-[10px]">
              {data.map((products: Product, index: number) => (
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
