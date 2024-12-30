import { useEffect, useState } from 'react';
import Splash from './splash';
import SplashStart from './splashStart';

const SplashTransition: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true); // Splash 화면 표시하기
  const [fadeIn, setFadeIn] = useState(false); // SplashStart 페이드인 상태

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Splash 숨기기
      setTimeout(() => {
        setFadeIn(true); // SplashStart 페이드인 시작
      }, 50); // SplashStart 전환 후 50ms 대기
    }, 2000); // 2초 대기 후 SplashStart 시작하도록

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-main min-h-screen flex items-center justify-center">
      {/* Splash 화면 */}
      {showSplash && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Splash />
        </div>
      )}
      {/* SplashStart 화면 */}
      {!showSplash && (
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <SplashStart />
        </div>
      )}
    </div>
  );
};

export default SplashTransition;
