import basicImage from '/images/logos/default_image.svg';

function CommentItem() {
  return (
    <div>
      <div className="flex w-80 leading-7 text-xs">
        <img src={basicImage} alt="기본 이미지" />
        <p className="ml-2 font-semibold text-sm/7">닉네임</p>
        <p className="ml-auto text-font2">날짜</p>
      </div>
      <div>
        <p className="mx-9 mt-1.5 mb-4 text-xs">댓글 내용 어쩌구 저쩌구</p>
      </div>
    </div>
  );
}

export default CommentItem;
