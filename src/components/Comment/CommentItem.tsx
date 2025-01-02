import basicImage from '/images/chef/drawingChef.svg';

interface CommentItemProps {
  name: string;
  content: string;
  createdAt: string;
  image: string;
}

function CommentItem({ name, content, createdAt, image }: CommentItemProps) {
  console.log(name, content, createdAt, image);
  const date = createdAt.slice(5, 10);
  return (
    <div>
      <div className="flex leading-7">
        <img
          src={image ? `https://11.fesp.shop/${image}` : basicImage}
          alt="프로필 사진"
          className="max-w-[29px] max-h-[29px] rounded-full"
        />
        <p className="ml-2 font-semibold text-[14px]">{name}</p>
        <p className="ml-auto text-font2">{date}</p>
      </div>

      <p className="text-[13px] ml-[37px] mt-[6px]">{content}</p>
    </div>
  );
}

export default CommentItem;
