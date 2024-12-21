import { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router 사용

interface FooterItem {
  label: string; // 예: 홈, 글쓰기, 마이페이지
  iconSrc: string; // 아이콘 이미지 경로
  activeIconSrc: string; // 활성화된 아이콘 이미지 경로
  route: string; // 이동할 경로
}

interface FooterProps {
  items: FooterItem[]; // 푸터 아이템 배열
}

export default function Footer({ items }: FooterProps) {
  const [activeIndex, setActiveIndex] = useState(0); // 현재 활성화된 아이템 인덱스
  const navigate = useNavigate(); // 페이지 이동 함수

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white h-[86px] flex justify-around items-center px-4 z-10">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveIndex(index); // 활성화된 아이템 변경
            navigate(item.route); // 해당 경로로 이동
          }}
          className="flex flex-col items-center text-sm"
        >
          <img
            src={activeIndex === index ? item.activeIconSrc : item.iconSrc}
            alt={item.label}
            className="w-6 h-6 mb-1"
          />
          <span
            className={`${
              activeIndex === index ? "text-green-500" : "text-gray-400"
            }`}
          >
            {item.label}
          </span>
        </button>
      ))}
    </footer>
  );
}
