import { useNavigate } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

import Button from '../../components/Button';
import Header from '../../components/Layout/Header';
import Layout from '../../components/Layout';

import arrow from '/images/arrow/prevArrow.svg';
import gallery from '/images/icons/gallery.svg';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { uploadImg } from '../../hooks/useUploadImg';

type modifyInfoTypes = {
  name: string;
  profileImg: string | null;
  phone: string;
};

const UserInfo = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // 회원 정보 조회
  const { data: userInfo } = useGetUserInfo(1);
  useEffect(() => {
    console.log(userInfo.item.image);
    setImgUrl(userInfo.item.image);
  }, [userInfo]);

  // use-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<modifyInfoTypes>({
    defaultValues: {
      name: userInfo.item.name,
      profileImg: userInfo.item.image,
      phone: userInfo.item.phone,
    },
  });

  // 이미지 업로드 통신 + 이미지 src 바꿔 렌더링
  const handleImgChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const filePath = await uploadImg([file]);
        setImgUrl(`${filePath.path}`);
        setValue('profileImg', filePath.name);
      } catch (error) {
        console.error('이미지 업로드 중 오류 발생:', error);
      }
    }
  };

  // 제출
  const onSubmit = (data: modifyInfoTypes) => {
    console.log(data);
  };

  if (!userInfo) return <div>Loading...</div>;

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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* 프로필 이미지 */}
          <div className="relative w-[90px] h-[90px] m-auto">
            <img
              src={`${apiUrl}${imgUrl}`}
              alt="Profile"
              className="rounded-full w-full h-full"
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('fileInput')?.click();
              }}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-transparent flex items-center justify-center"
            >
              <img
                src={gallery}
                alt="Upload Icon"
                className="w-[30px] h-[30px] absolute bottom-0 right-0 bg-[#969696] rounded-full p-[6px]"
              />
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleImgChange}
              className="hidden"
            />
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-[5px] relative">
            <label
              htmlFor="nickname"
              className="text-[13px] font-semibold text-font1"
            >
              닉네임
            </label>
            <input
              {...register('name', { required: '닉네임을 입력해주세요.' })}
              type="text"
              id="nickname"
              placeholder="닉네임"
              className="border-b text-[13px] py-[3px]"
            />
            {errors.name && (
              <p className="text-error text-[10px]">{errors.name.message}</p>
            )}
            <div className="absolute right-0 top-[60%] transform -translate-y-1/2">
              <Button
                bg="main"
                color="white"
                text="text-[10px]"
                width="60px"
                height="25px"
                type="button"
              >
                중복체크
              </Button>
            </div>
          </div>

          {/* 이메일(수정 불가) */}
          <div className="flex flex-col gap-[5px]">
            <label
              htmlFor="email"
              className="text-[13px] font-semibold text-font1"
            >
              이메일
            </label>
            <p className="border-b text-[13px] py-[3px]" id="email">
              {userInfo.item.email}
            </p>
          </div>

          {/* 휴대전화 번호 */}
          <div className="flex flex-col gap-[5px] mb-[50px]">
            <label
              htmlFor="phone"
              className="text-[13px] font-semibold text-font1"
            >
              휴대전화 번호
            </label>
            <input
              {...register('phone', {
                required: '휴대전화 번호를 입력해주세요.',
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: '유효한 전화번호를 입력해주세요.',
                },
              })}
              type="text"
              id="phone"
              placeholder="휴대전화 번호"
              className="border-b text-[13px] py-[3px]"
              value={userInfo.item.phone}
            />
            {errors.phone && (
              <p className="text-error text-[10px]">{errors.phone.message}</p>
            )}
          </div>

          <Button
            height="40px"
            text="text-sm"
            bg="main"
            color="white"
            type="submit"
          >
            정보 수정
          </Button>
        </form>
      </Layout>
    </div>
  );
};

export default UserInfo;
