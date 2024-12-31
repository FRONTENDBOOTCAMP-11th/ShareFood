import basicImage from '/images/chef/drawingChef.svg';

function CommentItem() {
  return (
    <div>
      <div className="flex leading-7">
        <img src={basicImage} alt="프로필 사진" />
        <p className="ml-2 font-semibold text-[14px]">닉네임</p>
        <p className="ml-auto text-font2">12.17</p>
      </div>

      <p className="text-[13px] ml-[37px] mt-[6px]">댓글 내용 어쩌구 저쩌구</p>
    </div>
  );
}

export default CommentItem;
