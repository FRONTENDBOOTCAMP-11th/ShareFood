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
      <p className="border h-fit bg-back2 text-sub border-transparent text-[12px] py-1 px-2 text-center rounded-[4px]">
        {buttonValue}
      </p>
  );
}

export default PostType;
