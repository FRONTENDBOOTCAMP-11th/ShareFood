import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignUp from './pages/signUp/signUp';
import Login from './pages/login/login';
import Main from './pages/main/main';
import MyPage from './pages/myPage/myPage';
import Detail from './pages/detail/detail';
import Write from './pages/write/write';
import UserInfo from './pages/myPage/modifyInfo';
import SplashTransition from './pages/splash/splashTransition';
import SearchPage from './pages/search/searchPage';
import KakaoRedirect from './pages/login/kakaoRedirect';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <SplashTransition />,
        },
        {
          path: 'sign-up',
          element: <SignUp />,
        },
        {
          path: 'login',
          element: <Login />,
        },
        {
          path: '/users/login/kakao',
          element: <KakaoRedirect />,
        },
        {
          path: 'main',
          element: <Main />,
        },
        {
          path: 'mypage/:_id',
          element: <MyPage />,
        },
        {
          path: 'userinfo/:_id',
          element: <UserInfo />,
        },
        {
          path: 'search',
          element: <SearchPage />,
        },
        {
          path: 'detail/:_id',
          element: <Detail />,
        },
        {
          path: 'write',
          element: <Write />,
        },
      ],
    },
  ],
  {
    future: {
      // 없으면 콘솔에 경고 표시
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
