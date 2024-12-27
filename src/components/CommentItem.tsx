import basicImage from '/images/chef/drawingChef.svg';

function CommentItem() {
  return (
    <div className="mb-[27px]">
      <div className="flex mx-[26px]  leading-7 text-xs">
        <img src={basicImage} alt="기본 이미지" />
        <p className="ml-2 font-semibold text-sm/7">닉네임</p>
        <p className="ml-auto text-font2">12.17</p>
      </div>
      <div>
        <p className="mx-[64px] mt-1.5 mb-4 text-xs">댓글 내용 어쩌구 저쩌구</p>
      </div>
    </div>
  );
}

export default CommentItem;
