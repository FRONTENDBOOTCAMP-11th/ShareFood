import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Footer() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 데이터 가져오기 함수
  function getUserData() {
    let userDataString = localStorage.getItem('user');

    if (!userDataString) {
      userDataString = sessionStorage.getItem('user');
    }

    // 데이터가 있으면 파싱하여 반환, 없으면 null 반환
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        return userData.state.user;
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
        return null;
      }
    }
    return null;
  }

  // 컴포넌트가 마운트될 때 사용자 ID 추출
  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setUserId(userData._id || '');
      console.log(userId)
    } else {
      console.log('user 데이터가 없습니다.');
    }
  }, []);

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
      route: `/mypage/${userId}`,
    },
  ];

  return ['/', '/login', '/sign-up'].includes(location.pathname) ? (
    <></>
  ) : (
    <footer className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-md w-full bg-white h-[86px] flex justify-around items-center px-4 z-10 rounded-tl-[10px] rounded-tr-[10px] shadow-custom">
      {footerItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.route)} // 경로 이동
          className="flex flex-col items-center text-sm w-[61px]"
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
    </footer>
  );
}
