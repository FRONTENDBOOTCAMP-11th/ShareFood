import CommentItem from './CommentItem';

function Comment() {
  const list = <CommentItem />;

  return (
    <div>
      {list}
      <CommentItem />
    </div>
  );
}

export default Comment;
