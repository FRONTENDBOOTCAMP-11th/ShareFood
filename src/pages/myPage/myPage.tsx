import { useState } from 'react';
import Layout from '../../components/Layout';
import icon from '/images/greenchef.svg';
import check from '/images/icons/check.svg';
import checkActive from '/images/icons/check-active.svg';
import List from '../../components/List';
import Button from '../../components/Button';

const MyPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('작성글');
  const tabs = [
    { label: '작성글', key: 'post' },
    { label: '좋아요한글', key: 'like' },
    { label: '거래신청글', key: 'trade' },
  ];

  return (
    <div className="py-[24px] px-[17px] bg-back1 flex flex-col gap-[13px] h-screen pb-[100px]">
      <Layout>
        <div className="flex items-center">
          <img
            src={icon}
            className="rounded-full w-[47px] h-[47px] bg-line1 mr-[11px]"
          />
          <div className="flex flex-col justify-evenly">
            <p className="text-[14px] text-font1 font-semibold">닉네임</p>
            <p className="text-[13px] text-font1">asdfas@gmail.com</p>
          </div>
          <button className="text-line1 rounded-[6px] border border-line1 ml-auto px-2 py-1 h-fit text-[15px]">
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
          onClick={() => setIsActive((prev) => !prev)}
          className="flex items-center gap-[5px] my-[10px]"
        >
          <img
            src={`${isActive ? checkActive : check}`}
            alt="check"
            className="w-[15px] h-[15px]"
          />
          <p className={`text-[13px] ${isActive ? 'text-main' : 'text-font2'}`}>
            거래 완료 글 숨기기
          </p>
        </button>

        <div className="flex flex-col gap-[10px]">
          {activeTab === '작성글' && (
            <List
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
          )}
          {activeTab === '좋아요한글' && (
            <List
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
          )}
          {activeTab === '거래신청글' && (
            <List
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
          )}
        </div>
      </Layout>

      <div className='mt-auto'>
        <Button
          height="40px"
          text="text-sm"
          bg="white"
          color="main"
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default MyPage;
