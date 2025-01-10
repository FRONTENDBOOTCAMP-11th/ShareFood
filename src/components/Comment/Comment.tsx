import image from '/images/chef/cryingChef.svg';

import CommentItem from './CommentItem';

interface CommentProps {
  replies: Reply[];
}

interface User {
  name: string;
  image: string;
}

interface Reply {
  _id: number;
  user: User;
  content: string;
  createdAt: string; // 날짜 형식에 따라 string 대신 Date를 사용할 수도 있습니다.
}

function Comment({ replies }: CommentProps) {
  let isAttach = false;
  const CommentList = replies.map((value) => {
    // console.log(value.user.name); // 이선재, 이현종, 이현종
    // console.log(value.content); // 내용들
    // console.log(value.createdAt); // 작성 날짜
    // console.log(value.user.image); // 사용자 이미지
    return (
      <CommentItem
        key={value._id}
        name={value.user.name}
        content={value.content}
        createdAt={value.createdAt}
        image={value.user.image}
      />
    );
  });

  if (CommentList.length > 0) isAttach = true;

  if (isAttach) {
    return <div className="flex flex-col gap-[16px]">{CommentList}</div>;
  } else {
    return (
      <div className="w-fit mx-auto my-[35px]">
        <img src={image} alt="기본 이미지" className="mx-auto rounded-full" />
        <p className="mt-[30px]">등록된 댓글이 없습니다</p>
      </div>
    );
  }
}

export default Comment;
