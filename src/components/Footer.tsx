import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const footerItems = [
    {
      label: '홈',
      iconSrc: '/images/home.svg',
      activeIconSrc: '/images/home-active.svg',
      route: '/main',
    },
    {
      label: '글쓰기',
      iconSrc: '/images/write.svg',
      activeIconSrc: '/images/write-active.svg',
      route: '/write',
    },
    {
      label: '마이페이지',
      iconSrc: '/images/myPage.svg',
      activeIconSrc: '/images/myPage-active.svg',
      route: '/mypage',
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white h-[86px] flex items-center px-4 z-10 rounded-tl-[10px] rounded-tr-[10px] shadow-md">
      <div className="flex justify-between w-full">
      {footerItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.route)} // 설정해놓은 경로 이동
          className="flex flex-col items-center text-sm flex-1"
        >
          <img
            src={
              location.pathname === item.route
                ? item.activeIconSrc
                : item.iconSrc
            } // 현재 경로랑 비교해서 아이콘 변경
            alt={item.label}
            className="w-6 h-6 mb-1"
            style={{ width: '24px', height: '24px' }}
          />
          <span
            className={`${
              location.pathname === item.route
                ? 'text-[#4CAF50]'
                : 'text-[#B8B8B8]'
            } font-pretendard font-normal`}
          >
            {item.label}
          </span>
        </button>
      ))}
      </div>
    </footer>
  );
}
