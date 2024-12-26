import CommentItem from './CommentItem';

function Comment() {
  const list = <CommentItem />;

  return (
    <>
      <br />
      {list}
      <CommentItem />
    </>
  );
}

export default Comment;
