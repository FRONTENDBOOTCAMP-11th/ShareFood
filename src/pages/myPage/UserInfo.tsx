import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

import arrow from '/images/arrow/prevArrow.svg';
import profile from '/images/chef/drawingChef.svg';
import gallery from '/images/icons/gallery.svg';

const UserInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-back1 pt-[70px] px-[16px] min-h-screen">
      <Header>
        <div className="flex w-[100%]">
          <button onClick={() => navigate(-1)} className="mr-auto">
            <img src={arrow} />
          </button>

          <h1 className="mr-auto text-font1 font-bold text-[15px]">
            회원 정보 수정
          </h1>
        </div>
      </Header>

      <Layout>
        <div className="flex flex-col gap-4">
          <div className="relative w-[90px] h-[90px] m-auto">
            <img
              src={profile}
              alt="Profile"
              className="rounded-full w-full h-full"
            />

            <button className="absolute top-0 left-0 w-full h-full rounded-full bg-transparent flex items-center justify-center">
              <img
                src={gallery}
                alt="Upload Icon"
                className="w-[30px] h-[30px] absolute bottom-0 right-0 bg-[#969696] rounded-full p-[6px]"
              />
            </button>
          </div>

          <div className="flex flex-col gap-[5px] relative">
            <label
              htmlFor="nickname"
              className="text-[13px] font-semibold text-font1"
            >
              닉네임
            </label>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임"
              className="border-b text-[13px] py-[3px]"
            />
            <div className="absolute right-0 top-[60%] transform -translate-y-1/2">
              <Button
                bg="main"
                color="white"
                text="text-[10px]"
                width="60px"
                height="25px"
              >
                중복체크
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-[5px]">
            <label
              htmlFor="email"
              className="text-[13px] font-semibold text-font1"
            >
              이메일
            </label>
            <input
              type="text"
              id="email"
              placeholder="이메일"
              className="border-b text-[13px] py-[3px]"
            />
          </div>

          <div className="flex flex-col gap-[5px] mb-[50px]">
            <label
              htmlFor="phone"
              className="text-[13px] font-semibold text-font1"
            >
              휴대전화 번호
            </label>
            <input
              type="text"
              id="phone"
              placeholder="휴대전화 번호"
              className="border-b text-[13px] py-[3px]"
            />
          </div>

          <Button height="40px" text="text-sm" bg="main" color="white">
            정보 수정
          </Button>
        </div>
      </Layout>
    </div>
  );
};

export default UserInfo;
