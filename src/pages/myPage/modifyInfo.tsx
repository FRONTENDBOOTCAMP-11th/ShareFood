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
import { isDuplicate } from '../../hooks/isDuplicate';
import { axiosInstance } from '../../hooks/axiosInstance';
import { toast } from 'react-toastify';

type modifyInfoTypes = {
  name: string;
  profileImg: string | null;
  phone: string;
};

const UserInfo = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [isChangeInfo, setIsChangeInfo] = useState(false);
  const [nameValue, setNameValue] = useState<string | null>(null);
  const [phoneValue, setPhoneValue] = useState<string>('');
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // 회원 정보 조회
  const { data: userInfo } = useGetUserInfo(1);

  // use-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<modifyInfoTypes>({
    defaultValues: {
      name: userInfo.item.name,
      profileImg: userInfo.item.image,
      phone: userInfo.item.phone,
    },
  });

  // 초기 값 설정
  useEffect(() => {
    setImgUrl(userInfo.item.image);
    setPhoneValue(userInfo.item.phone);
    setNameValue(userInfo.item.name);
    setIsChangeInfo(false);
  }, [userInfo]);

  // 닉네임 및 전화번호 변경 여부 확인
  useEffect(() => {
    const hasChanged =
      nameValue !== userInfo.item.name || phoneValue !== userInfo.item.phone;

    if (hasChanged && !errors.phone && isNameChecked) {
      setIsChangeInfo(true);
    } else {
      setIsChangeInfo(false);
    }
  }, [nameValue, phoneValue, isNameChecked, errors.phone, userInfo]);

  // 닉네임 중복 검사
  const handleCheckName = async () => {
    if (nameValue) {
      const result = await isDuplicate('name', nameValue);
      if (!result) {
        setError('name', { message: '중복된 닉네임 입니다' });
        setIsNameChecked(false);
        alert('이미 존재하는 닉네임입니다.');
      } else {
        clearErrors('name');
        setIsNameChecked(true);
        alert('사용가능한 닉네임입니다.');
      }
    }
  };

  // 이미지 업로드 핸들러
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
  const onSubmit = async () => {
    try {
      // 변경된 데이터를 동적으로 병합
      const updatedData = {
        phone: phoneValue || userInfo.item.phone,
        name: nameValue || userInfo.item.name,
        image: imgUrl || userInfo.item.image,
      };

      // 서버에 요청 보내기
      const result = await axiosInstance.patch(`/users/1`, updatedData);
      console.log('수정 완료:', result.data);
      alert('수정이 완료되었습니다.');
      navigate('/mypage');
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
      alert('수정에 실패했습니다.');
    }
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
              onChange={(e) => {
                setNameValue(e.target.value);
                setIsNameChecked(false); // 값 변경 시 중복 검사 초기화
              }}
              type="text"
              id="nickname"
              placeholder="닉네임"
              className="border-b text-[13px] py-[3px]"
            />
            {errors.name && (
              <p className="text-error text-[10px]">{errors.name.message}</p>
            )}
            <div className="absolute right-0 top-[60%] transform -translate-y-1/2">
              {nameValue !== userInfo.item.name ? (
                <Button
                  bg="main"
                  color="white"
                  text="text-[10px]"
                  width="60px"
                  height="25px"
                  type="button"
                  onClick={handleCheckName}
                >
                  중복체크
                </Button>
              ) : (
                <Button
                  bg="inActive"
                  color="white"
                  text="text-[10px]"
                  width="60px"
                  height="25px"
                  type="button"
                >
                  중복체크
                </Button>
              )}
            </div>
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
                onChange: (e) => {
                  setPhoneValue(e.target.value);
                  if (!/^[0-9]{10,11}$/.test(e.target.value)) {
                    setError('phone', {
                      message: '유효한 전화번호를 입력해주세요.',
                    });
                  } else {
                    clearErrors('phone');
                  }
                },
              })}
              type="text"
              id="phone"
              placeholder="휴대전화 번호"
              className="border-b text-[13px] py-[3px]"
              value={phoneValue}
            />
            {errors.phone && (
              <p className="text-error text-[10px]">{errors.phone.message}</p>
            )}
          </div>

          {/* 정보 수정 버튼 */}
          {isChangeInfo ? (
            <Button
              height="40px"
              text="text-sm"
              bg="main"
              color="white"
              type="submit"
            >
              정보 수정
            </Button>
          ) : (
            <Button
              height="40px"
              text="text-sm"
              bg="inActive"
              color="white"
              type="submit"
            >
              정보 수정
            </Button>
          )}
        </form>
      </Layout>
    </div>
  );
};

export default UserInfo;
