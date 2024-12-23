export interface HeaderProps {
  title?: string;
}

export default function Header({
  title
}: HeaderProps) {

    return (
      <header className="bg-white h-14 flex items-center justify-center px-4 fixed top-0 left-0 w-full z-10">
        {title &&
          <h1 className="font-bold">{title}</h1>
        }
      </header>
    );
  }