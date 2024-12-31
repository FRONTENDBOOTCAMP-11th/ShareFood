import CommentItem from './CommentItem';

function Comment() {

  return (
    <div className='flex flex-col gap-[16px]'>
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}

export default Comment;
