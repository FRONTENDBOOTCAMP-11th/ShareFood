interface props {
  type: string;
}

// 매개변수 값에 따라 출력 내용 변경
// const typeSell: string = 'sell';
// const typeBuy: string = 'buy';
{
  /* <PostType type={typeSell} />
<PostType type={typeBuy} /> */
}
function PostType({ type }: props) {
  let buttonValue: string = '';
  if (type == 'sell') buttonValue = '팔아요';
  else if (type == 'buy') buttonValue = '같이 사요';

  return (
    <>
      <p className="border w-fit bg-amber-50 text-amber-500 border-transparent text-xs py-1 px-3 text-center rounded">
        {buttonValue}
      </p>
    </>
  );
}

export default PostType;
