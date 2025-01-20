import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useGetNotification } from '../../hooks/useGetNotification';

export default function Footer() {
  //const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 데이터 가져오기
  const { user } = useAuthStore();

  
  const { data: notification } = useGetNotification();

  const footerItems = [
    {
      label: '홈',
      iconSrc: '/images/icons/home.svg',
      activeIconSrc: '/images/icons/home-active.svg',
      route: '/main',
    },
    {
      label: '글쓰기',
      iconSrc: '/images/icons/write.svg',
      activeIconSrc: '/images/icons/write-active.svg',
      route: '/write',
    },
    {
      label: '마이페이지',
      iconSrc: '/images/icons/myPage.svg',
      activeIconSrc: '/images/icons/myPage-active.svg',
      route: `/mypage/${user?._id}`,
    },
  ];

  return ['/', '/login', '/sign-up', '/users/login/kakao'].includes(
    location.pathname,
  ) ? (
    <></>
  ) : (
    <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white h-[86px] flex justify-around items-center px-4 z-10 rounded-tl-[10px] rounded-tr-[10px] shadow-custom">
      {footerItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.route)} // 경로 이동
          className="flex flex-col items-center text-sm w-[61px] relative"
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
          {notification && notification.length > 0 && item.label === '마이페이지' && location.pathname !== `/mypage/${user?._id}` && (
            <div className="absolute top-[-5px] right-[10px] bg-sub w-[7px] h-[7px] rounded-full"></div>
          )}
        </button>
      ))}
    </footer>
  );
}
