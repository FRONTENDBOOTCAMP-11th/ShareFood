import { ReactNode } from "react";

export interface HeaderProps {
  children: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="bg-white h-14 flex items-center justify-center px-4 fixed top-0 left-0 w-full z-10">
      {children}
    </header>
  );
}
