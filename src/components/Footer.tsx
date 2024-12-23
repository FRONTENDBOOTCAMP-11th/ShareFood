import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // 초기값을 null로 설정
  const navigate = useNavigate();

  const footerItems = [
    {
      label: "홈",
      iconSrc: "/images/home.svg",
      activeIconSrc: "/images/home-active.svg",
      route: "/main",
    },
    {
      label: "글쓰기",
      iconSrc: "/images/write.svg",
      activeIconSrc: "/images/write-active.svg",
      route: "/write",
    },
    {
      label: "마이페이지",
      iconSrc: "/images/myPage.svg",
      activeIconSrc: "/images/myPage-active.svg",
      route: "/mypage",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white h-[86px] flex justify-around items-center px-4 z-10 rounded-tl-[10px] rounded-tr-[10px] shadow-md">
      {footerItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            setActiveIndex(index); // 버튼 클릭 시 활성화 상태로로 변경
            navigate(item.route);
          }}
          className="flex flex-col items-center text-sm"
        >
          <img
            src={activeIndex === index ? item.activeIconSrc : item.iconSrc} // 활성화된 아이콘과 기본 아이콘 구분
            alt={item.label}
            className="w-6 h-6 mb-1"
            style={{ width: "24px", height: "24px" }} // 아이콘 크기 24px 설정
          />
          <span
            style={{
              color: activeIndex === index ? "#4CAF50" : "#B8B8B8",
              fontFamily: "Pretendard, sans-serif",
              fontWeight: "400",
            }}
          >
            {item.label}
          </span>
        </button>
      ))}
    </footer>
  );
}
