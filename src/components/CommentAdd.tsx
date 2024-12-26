function CommentAdd() {
  return (
    <form action="#" className="w-80 flex">
      <input
        type="text"
        required
        placeholder="댓글을 입력하세요."
        className="border-b-2 w-full pl-1.5 py-1 text-sm outline-none"
      />
      <button
        type="submit"
        className="ml-3 float-right whitespace-nowrap text-main text-sm border py-1 px-3 rounded"
      >
        등록
      </button>
    </form>
  );
}

export default CommentAdd;
