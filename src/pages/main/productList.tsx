import { Product } from '../../types/productsTypes';
import List from '../../components/List';
import { NoData } from '../../components/NoData';

interface ProductListProps {
  items: Product[];
}

const ProductList = ({ items }: ProductListProps) => {
  return (
    <>
      {items?.length > 0 ? (
        <div className="flex flex-col gap-[10px]">
          {items.map((products: Product, index: number) => (
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
        <NoData />
      )}
    </>
  );
};

export default ProductList;
