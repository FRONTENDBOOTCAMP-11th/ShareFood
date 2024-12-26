import { useEffect, useState } from 'react';
import Splash from './splash';
import SplashStart from './splashStart';

const SplashTransition: React.FC = () => {
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      { splash ? <Splash /> : <SplashStart />}
    </div>
  )
}

export default SplashTransition;