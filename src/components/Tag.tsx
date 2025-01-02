interface Props {
  children: React.ReactNode;
  tagName: string;
}

const Tag: React.FC<Props> = ({ children, tagName }) => {
  return (
    <div className="flex items-center gap-[3px] border-l-2 px-[10px] font-sans text-[13px]">
      <img className="w-[17px] mr-[5px]" src={`/images/tag/${tagName}.svg`} />
      <div className="line-clamp-2">{children}</div>
    </div>
  );
};

export default Tag;
