import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../hooks/axiosInstance';
import Button from '../../components/Button';
import Header from '../../components/Layout/Header';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';

import close from '/images/icons/close.svg';
import TypeSelector from '../../components/TypeSelector';
import Error from '../../components/Error';

interface FormData {
  title: string;
  location: string;
  time: string;
  text: string;
  type?: string;
}

const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const [productsType, setProductsType] = useState('buy');
  const [meetingLocation, setMeetingLocation] = useState('전체지역');

  const addPost = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.type = 'porduct';
      const res = await axiosInstance.post('/product');
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const onSubmit = (data: FormData) => {
    addPost.mutate(data);
  };

  return (
    <div className="min-h-screen bg-back1 pt-14 pb-[100px]">
      <Header>
        <div className="flex items-center">
          <h1 className="text-[15px] font-bold text-font1">글 작성하기</h1>
        </div>
        <button className="fixed right-[17px]">
          <img
            onClick={() => navigate('/main')}
            src={close}
            alt="Close Icon"
            className="w-5 h-5"
          />
        </button>
      </Header>

      <div className="write-content bg-white mx-[16px] mt-[11px] px-[18px] py-[23px] rounded-md shadow-custom flex flex-col gap-[20px]">
        <ImageUpload />
        <TypeSelector
          productsType={productsType}
          setProductsType={setProductsType}
        />

        <form
          className="flex flex-col gap-[8px] text-[13px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="info-title">
            <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
              <p className="font-semibold">제목 </p>
              <input
                type="text"
                className="outline-none grow"
                placeholder="제목을 입력해주세요."
                {...register('title', {
                  required: '* 제목은 필수입니다',
                })}
              />
            </div>
            <Error>{errors.title?.message}</Error>
          </div>

          <div className="info-location">
            <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
              <p className="font-semibold">공구 위치 </p>
              <Select
                meetingLocation={meetingLocation}
                setMeetingLocation={setMeetingLocation}
              />
            </div>
            <Error children={'* 공구 위치를 선택해주세요.'} />
          </div>

          <div className="info-location-detail">
            <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
              <p className="font-semibold">공구 상세 위치 </p>
              <input
                type="text"
                className="outline-none text-xs grow"
                placeholder="거래 상세 위치를 입력해주세요."
                {...register('location', {
                  required: '* 상세 위치는 필수입니다.',
                })}
              />
            </div>
            <Error>{errors.location?.message}</Error>
          </div>

          <div className="info-time">
            <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
              <p className="font-semibold">마감시간 </p>
              <input
                type="text"
                className="outline-none text-xs grow"
                placeholder="마감 시간을 입력해주세요."
                {...register('time', { required: '* 마감시간은 필수입니다' })}
              />
            </div>
            <Error>{errors.time?.message}</Error>
          </div>

          <div className="info-content mt-[20px] mb-[10px]">
            <h1 className="font-semibold">내용</h1>
            <textarea
              name=""
              id=""
              className="border outline-none text-xs resize-none w-full h-52 py-[5px] px-[10px] mt-[3px] rounded"
              placeholder="상품에 대한 설명을 적어주세요!"
              {...register('text', { required: '* 내용은 필수입니다' })}
            />
            <Error>{errors.title?.message}</Error>
          </div>
          <Button
            type="submit"
            bg="main"
            color="white"
            height="40px"
            text="text-sm"
          >
            작성 완료
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Write;
