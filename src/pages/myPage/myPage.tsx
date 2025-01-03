import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

import Layout from '../../components/Layout';
import List from '../../components/List';
import Button from '../../components/Button';

import check from '/images/check/check.svg';
import checkActive from '/images/check/check-active.svg';

const MyPage = () => {
  const [showSoldOut, setShowSoldOut] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('작성글');
  const tabs = [
    { label: '작성글', key: 'post' },
    { label: '좋아요한글', key: 'like' },
    { label: '거래신청글', key: 'trade' },
  ];

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_BASE_URL;

  const { data: userInfo } = useGetUserInfo(1);
  console.log(userInfo);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="pt-[24px] pb-[100px] px-[17px] bg-back1 flex flex-col gap-[13px] min-h-screen">
      <Layout>
        <div className="flex items-center">
          <img
            src={`${apiUrl}${userInfo.item.image}`}
            className="rounded-full w-[47px] h-[47px] bg-line1 mr-[11px]"
          />
          <div className="flex flex-col justify-evenly">
            <p className="text-[14px] text-font1 font-semibold">
              {userInfo.item.name}
            </p>
            <p className="text-[13px] text-font1">{userInfo.item.email}</p>
          </div>
          <button
            onClick={() => navigate('/userinfo')}
            className="text-line1 rounded-[6px] border border-line1 ml-auto px-2 py-1 h-fit text-[15px]"
          >
            수정
          </button>
        </div>
      </Layout>
      <Layout>
        <div className="flex gap-3 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`text-[13px] font-semibold py-1 ${
                activeTab === tab.label
                  ? 'border-b-2 border-font1 text-font1'
                  : 'text-font2'
              }`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowSoldOut((prev) => !prev)}
          className="flex items-center gap-[5px] my-[10px]"
        >
          <img
            src={`${showSoldOut ? checkActive : check}`}
            alt="check"
            className="w-[15px] h-[15px]"
          />
          <p
            className={`text-[13px] ${showSoldOut ? 'text-main' : 'text-font2'}`}
          >
            거래 완료 된 상품 보기
          </p>
        </button>

        {activeTab === '작성글' && (
          <div className="flex flex-col gap-[10px]">
            <List
              id={1}
              title={'귤은 겨울에 먹어야 해요1'}
              type={'sell'}
              total={10}
              remain={2}
              location={'제주도 제주시'}
              due={'12/31'}
              price={3000}
              date={'12/31'}
              like={5}
              comments={7}
            />
            <List
              id={1}
              title={'귤은 겨울에 먹어야 해요1'}
              type={'sell'}
              total={10}
              remain={2}
              location={'제주도 제주시'}
              due={'12/31'}
              price={3000}
              date={'12/31'}
              like={5}
              comments={7}
            />
            <List
              id={1}
              title={'귤은 겨울에 먹어야 해요1'}
              type={'sell'}
              total={10}
              remain={2}
              location={'제주도 제주시'}
              due={'12/31'}
              price={3000}
              date={'12/31'}
              like={5}
              comments={7}
            />
          </div>
        )}
        {activeTab === '좋아요한글' && (
          <div className="flex flex-col gap-[10px]">
            <List
              id={1}
              title={'귤은 겨울에 먹어야 해요2'}
              type={'sell'}
              total={10}
              remain={2}
              location={'제주도 제주시'}
              due={'12/31'}
              price={3000}
              date={'12/31'}
              like={5}
              comments={7}
            />
          </div>
        )}
        {activeTab === '거래신청글' && (
          <div className="flex flex-col gap-[10px]">
            <List
              id={1}
              title={'귤은 겨울에 먹어야 해요3'}
              type={'sell'}
              total={10}
              remain={2}
              location={'제주도 제주시'}
              due={'12/31'}
              price={3000}
              date={'12/31'}
              like={5}
              comments={7}
            />
          </div>
        )}
      </Layout>

      <div className="mt-auto">
        <Button height="40px" text="text-sm" bg="white" color="main">
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default MyPage;
