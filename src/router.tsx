import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./pages/signUp/signUp";
import Login from "./pages/login/login";
import Main from "./pages/main/main";
import Splash from "./pages/splash/splash";
import MyPage from "./pages/myPage/myPage";
import Search from "./pages/search/search";
import Detail from "./pages/detail/detail";
import Write from "./pages/write/write";
import UserInfo from "./pages/myPage/UserInfo";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Splash />,
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
        path: 'main',
        element: <Main />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'userinfo',
        element: <UserInfo />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'detail',
        element: <Detail />,
      },
      {
        path: 'write',
        element: <Write />,
      },
    ],
  },
], {
  future: {
    // 없으면 콘솔에 경고 표시
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});