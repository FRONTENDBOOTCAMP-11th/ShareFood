import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';

import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { uploadImg } from '../../hooks/useUploadImg';
import { isDuplicate } from '../../hooks/isDuplicate';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useAuthStore } from '../../store/authStore';

import Button from '../../components/Button';
import Header from '../../components/Layout/Header';
import Layout from '../../components/Layout';

import arrow from '/images/arrow/prevArrow.svg';
import gallery from '/images/icons/gallery.svg';

type modifyInfoTypes = {
  name: string;
  profileImg: string | null;
  phone: string;
};

// 📌 전화번호 자동 하이픈 추가 함수
const formatPhoneNumber = (value: string) => {
  const numbersOnly = value.replace(/[^0-9]/g, ''); // 숫자만 남기기

  if (numbersOnly.length <= 3) {
    return numbersOnly;
  } else if (numbersOnly.length <= 7) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  } else {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  }
};

const UserInfo = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const axiosInstance = useAxiosInstance();

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [nameValue, setNameValue] = useState<string | null>(null);
  const [isNameChecked, setIsNameChecked] = useState(false);
  const [phoneValue, setPhoneValue] = useState<string>('');
  const [isChangeInfo, setIsChangeInfo] = useState(false);

  const { user } = useAuthStore();

  // 회원 정보 조회
  const { data: userInfo } = useGetUserInfo(axiosInstance, String(user?._id));

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
    if (userInfo?.item) {
      setImgUrl(userInfo.item.image);
      setNameValue(userInfo.item.name);
      const formattedPhone = formatPhoneNumber(userInfo.item.phone); // 초기값 변환
      setPhoneValue(formattedPhone);
      setValue('phone', formattedPhone);
      setIsChangeInfo(false);
    }
  }, [userInfo, setValue]);

  // 닉네임 및 전화번호 변경 여부 확인
  useEffect(() => {
    const nameChanged = nameValue !== userInfo?.item?.name;
    const phoneChanged = phoneValue !== userInfo?.item?.phone;

    if (nameChanged && !isNameChecked) {
      setIsChangeInfo(false); // 닉네임이 변경되었으나 중복 확인이 안 됨 → 비활성화
    } else if (nameChanged || phoneChanged) {
      setIsChangeInfo(true); // 하나라도 변경되었으면 활성화
    } else {
      setIsChangeInfo(false);
    }
  }, [nameValue, phoneValue, isNameChecked, userInfo]);

  // 닉네임 중복 검사
  const handleCheckName = async () => {
    if (!nameValue || nameValue.trim() === '') {
      toast.error('닉네임을 입력해주세요.');
      return;
    }

    try {
      const result = await isDuplicate(axiosInstance, 'name', nameValue);
      if (!result) {
        setError('name', { message: '중복된 닉네임 입니다' });
        setIsNameChecked(false);
        toast.error('이미 존재하는 닉네임입니다.');
      } else {
        clearErrors('name');
        setIsNameChecked(true);
        toast.success('사용가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error('닉네임 중복 검사 오류:', error);
      toast.error('닉네임 중복 검사 중 오류가 발생했습니다.');
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
    if (!isChangeInfo) {
      toast.error ('수정에 실패했습니다. 수정사항을 확인해주세요')
      return;
    }
    try {
      // 변경된 데이터를 동적으로 병합
      const updatedData = {
        phone: phoneValue || userInfo.item.phone,
        name: nameValue || userInfo.item.name,
        image: imgUrl || userInfo.item.image,
      };

      // 서버에 요청 보내기
      const result = await axiosInstance.patch(
        `/users/${user?._id}`,
        updatedData,
      );
      console.log('수정 완료:', result.data);
      toast.success('수정이 완료되었습니다.');
      navigate(`/mypage/${user?._id}`);
    } catch (error) {
      console.error('수정 중 오류 발생:', error);
      toast.error('수정에 실패했습니다.');
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
              className="rounded-full w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('fileInput')?.click();
              }}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-transparent flex items-center justify-center object-cover"
            >
              <img
                src={gallery}
                alt="Upload Icon"
                className="w-[30px] h-[30px] absolute bottom-0 right-0 bg-[#969696] rounded-full p-[6px] object-cover"
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
                  value: /^\d{3}-\d{3,4}-\d{4}$/,
                  message: '유효한 전화번호를 입력해주세요.',
                },
              })}
              type="text"
              id="phone"
              placeholder="휴대전화 번호"
              className="border-b text-[13px] py-[3px]"
              value={phoneValue}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                setPhoneValue(formatted);
                setValue('phone', formatted);
                if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formatted)) {
                  setError('phone', {
                    message: '유효한 전화번호를 입력해주세요.',
                  });
                } else {
                  clearErrors('phone');
                }
              }}
              maxLength={13}
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
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Slide}
        toastClassName="mx-4"
      />
    </div>
  );
};

export default UserInfo;
