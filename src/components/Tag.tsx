interface Props {
  children: React.ReactNode;
  tagName: string;
}

const Tag: React.FC<Props> = ({ children, tagName }) => {
  return (
    <div className="flex items-center gap-[10px] ml-2 font-sans">
      <img className="size-5" src={`/images/tagImg/${tagName}.svg`} />
      {children}
    </div>
  );
};

export default Tag;
