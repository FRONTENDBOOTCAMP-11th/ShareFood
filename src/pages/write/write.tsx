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
import Counter from '../../components/Counter';

interface FormData {
  price: number;
  quantity: number;
  name: string;
  content: string;
  extra: {
    location: string;
    subLocation: string;
    meetingTime: string;
    type?: string;
  };
}

const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormData>();

  const navigate = useNavigate();

  const [num, setNum] = useState(1);

  // TypeSelector : 기본값 'buy'
  const [productsType, setProductsType] = useState('buy');

  // Selector : 기본값 '전체지역'
  const location = watch('extra.location', '전체지역');

  // 상품 게시글 등록
  const addPost = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post('/seller/products', formData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  // onSubmit용 함수
  const onSubmit = (data: FormData) => {
    // 전체지역
    if (location === '전체지역') {
      setError('extra.location', {
        message: '* 위치를 선택해주세요',
      });
    }
    data.extra.location = location;

    const transformData = {
      ...data,
      price: 3000,
      quantity: 7,
    };
    console.log(transformData);
    addPost.mutate(transformData);
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

        {productsType === 'buy' && (
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
                  {...register('name', {
                    required: '* 제목은 필수입니다',
                  })}
                />
              </div>
              <Error>{errors.name?.message}</Error>
            </div>

            <div className="info-price">
              <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
                <p className="font-semibold">가격</p>
                <input
                  type="text"
                  className="outline-none grow"
                  placeholder="가격을 입력해주세요"
                  {...register('price', {
                    required: '* 가격은 필수입니다',
                  })}
                />
              </div>
              <Error>{errors.price?.message}</Error>
            </div>

            <div className="info-location">
              <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
                <p className="font-semibold">공구 위치 </p>
                <Select
                  meetingLocation={location}
                  setMeetingLocation={(value) => {
                    setValue('extra.location', value);
                    if (value !== '전체지역') {
                      clearErrors('extra.location');
                    } else {
                      setError('extra.location', {
                        message: '* 공구 위치를 선택해주세요.',
                      });
                    }
                  }}
                  {...register('extra.location', {
                    required: '*공구 위치를 선택해주세요',
                  })}
                />
              </div>
              {errors.extra?.location && (
                <Error>{errors.extra.location?.message}</Error>
              )}
            </div>

            <div className="info-location-detail">
              <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
                <p className="font-semibold">공구 상세 위치 </p>
                <input
                  type="text"
                  className="outline-none text-xs grow"
                  placeholder="거래 상세 위치를 입력해주세요."
                  {...register('extra.subLocation', {
                    required: '* 상세 위치는 필수입니다.',
                  })}
                />
              </div>
              {errors.extra?.subLocation && (
                <Error>{errors.extra.subLocation?.message}</Error>
              )}
            </div>

            <div className="info-quantity">
              <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
                <p className="font-semibold">모집 인원</p>
                <Counter num={num} setNum={setNum} {...register('quantity')} />
              </div>
            </div>

            <div className="info-time">
              <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
                <p className="font-semibold">마감시간 </p>
                <input
                  type="text"
                  className="outline-none text-xs grow"
                  placeholder="마감 시간을 입력해주세요."
                  {...register('extra.meetingTime', {
                    required: '* 마감시간은 필수입니다',
                  })}
                />
              </div>
              {errors.extra?.meetingTime && (
                <Error>{errors.extra.meetingTime?.message}</Error>
              )}
            </div>

            <div className="info-content mt-[20px] mb-[10px]">
              <h1 className="font-semibold">내용</h1>
              <textarea
                className="border outline-none text-xs resize-none w-full h-52 py-[5px] px-[10px] mt-[3px] rounded"
                placeholder="상품에 대한 설명을 적어주세요!"
                {...register('content', { required: '* 내용은 필수입니다' })}
              />
              <Error>{errors.content?.message}</Error>
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
        )}

        {productsType === 'sell' && (
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
                  {...register('name', {
                    required: '* 제목은 필수입니다',
                  })}
                />
              </div>
              <Error>{errors.name?.message}</Error>
            </div>

            <div className="info-price">
              <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
                <p className="font-semibold">가격</p>
                <input
                  type="text"
                  className="outline-none grow"
                  placeholder="가격을 입력해주세요"
                  {...register('price', {
                    required: '* 가격은 필수입니다',
                  })}
                />
              </div>
              <Error>{errors.price?.message}</Error>
            </div>

            <div className="info-location">
              <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
                <p className="font-semibold">판매 위치</p>
                <Select
                  meetingLocation={location}
                  setMeetingLocation={(value) => {
                    setValue('extra.location', value);
                    if (value !== '전체지역') {
                      clearErrors('extra.location');
                    } else {
                      setError('extra.location', {
                        message: '* 판매 위치를 선택해주세요.',
                      });
                    }
                  }}
                  {...register('extra.location', {
                    required: '*판매 위치를 선택해주세요',
                  })}
                />
              </div>
              {errors.extra?.location && (
                <Error>{errors.extra.location?.message}</Error>
              )}
            </div>

            <div className="info-location-detail">
              <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
                <p className="font-semibold">판매 상세 위치 </p>
                <input
                  type="text"
                  className="outline-none text-xs grow"
                  placeholder="거래 상세 위치를 입력해주세요."
                  {...register('extra.subLocation', {
                    required: '* 상세 위치는 필수입니다.',
                  })}
                />
              </div>
              {errors.extra?.subLocation && (
                <Error>{errors.extra.subLocation?.message}</Error>
              )}
            </div>

            <div className="info-quantity">
              <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
                <p className="font-semibold">판매 개수</p>
                <Counter num={num} setNum={setNum} {...register('quantity')} />
              </div>
            </div>

            <div className="info-time">
              <div className="flex gap-[22px] py-[7px] mb-[7px] border-b">
                <p className="font-semibold">거래 시간 </p>
                <input
                  type="text"
                  className="outline-none text-xs grow"
                  placeholder="거래 시간을 입력해주세요."
                  {...register('extra.meetingTime', {
                    required: '* 거래 시간은 필수입니다',
                  })}
                />
              </div>
              {errors.extra?.meetingTime && (
                <Error>{errors.extra.meetingTime?.message}</Error>
              )}
            </div>

            <div className="info-content mt-[20px] mb-[10px]">
              <h1 className="font-semibold">내용</h1>
              <textarea
                className="border outline-none text-xs resize-none w-full h-52 py-[5px] px-[10px] mt-[3px] rounded"
                placeholder="상품에 대한 설명을 적어주세요!"
                {...register('content', { required: '* 내용은 필수입니다' })}
              />
              <Error>{errors.content?.message}</Error>
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
        )}
      </div>
    </div>
  );
};

export default Write;
