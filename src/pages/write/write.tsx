import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { AxiosError } from 'axios';
import { Slide, toast, ToastContainer } from 'react-toastify';

import dayjs, { Dayjs } from 'dayjs';

import Button from '../../components/Button';
import Header from '../../components/Layout/Header';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';
import close from '/images/icons/close.svg';
import TypeSelector from '../../components/TypeSelector';
import Error from '../../components/Error';
import Counter from '../../components/Counter';
import KakaoAddressSearch from '../../components/kakaoAddr';
import Picker from '../../components/Picker';

interface FormData {
  price: number; // 상품 가격
  quantity: number; // 모집인원 or 판매 상품 개수
  name: string; // 게시글 제목
  content: string; // 게시글 내용
  mainImages: {
    path: string;
    name: string;
  }[];
  extra: {
    location: string; // 공구, 판매 지역
    subLocation: string; // 공구, 판매 상세 지역
    meetingTime: string; // 공구 마감 시간 or 판매 시간
    type: string; // 판매글 타입
  };
}
interface AxiosErrorResponse {
  errors: { msg: string }[];
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
    reset,
  } = useForm<FormData>({
    defaultValues: {
      extra: {
        meetingTime: '',
      },
    },
  });

  const navigate = useNavigate();

  // counter 컴포넌트 기본값 : 1
  const [num, setNum] = useState(1);

  // TypeSelector : 기본값 'buy'
  const [productsType, setProductsType] = useState('buy');

  const [selectDate, setSelectDate] = useState<Dayjs | null>(null);

  const [subLocation, setSubLocation] = useState('');

  const [uploadImg, setUploadImg] = useState<{ path: string; name: string }[]>(
    [],
  );

  // Selector : 기본값 '전체지역'
  const location = watch('extra.location', '전체지역');

  const axiosInstance = useAxiosInstance();

  // 상품 게시글 등록
  const addPost = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axiosInstance.post('/seller/products', formData);
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);

      // 서버 전송 성공 시 입력값 초기화
      reset();
      setNum(1);
      toast.success('게시글이 등록되었습니다', {
        onClose: () => {
          // toast 닫히면 해당 페이지로 이동
          console.log(data.item._id);
          navigate(`/detail/${data.item._id}`);
        },
      });
    },
    onError: (err) => {
      const axiosError = err as AxiosError<AxiosErrorResponse>;
      if (axiosError.response) {
        console.error('Error Response:', axiosError.response.data); // 서버에서 반환된 에러 메시지
        toast.error(`${axiosError.response.data.errors[0].msg}`);
      } else {
        console.error('Unexpected Error:', err); // 기타 에러
      }
    },
  });

  // onSubmit용 함수
  const onSubmit = (data: FormData) => {
    // 전체지역 유효성 검증
    if (location === '전체지역') {
      setError('extra.location', {
        message: '* 지역을 선택해주세요',
      });
    }

    // 날짜, 시간 유효성 검증
    if (selectDate === null) {
      setError('extra.meetingTime', {
        message: '* 날짜, 시간을 선택해주세요',
      });
    }

    // 전송 값이 input이 아닌 경우 추가
    data.quantity = num;
    data.extra.location = location;
    data.extra.subLocation = subLocation;
    data.extra.type = productsType;

    // 가격 정수 형태로 변경 후 전송
    const integerPrice = Number(data.price.toString().replace(/,/g, ''));
    data.price = integerPrice;

    // 입력한 시간 값 가져옴
    const dateTime = dayjs(selectDate);
    console.log(dateTime);

    // 랜덤 이미지 출력
    const randomNum = Math.floor(Math.random() * 4) + 1;

    // 서버에 저장된 이미지 경로 받아서 다시 저장
    data.mainImages =
      uploadImg.length > 0
        ? uploadImg.map((image) => ({
            path: image.path,
            name: image.path.split('/').pop() || '', // 파일명 추출
          }))
        : [
            {
              path: `/files/final07/default${randomNum}.png`,
              name: `/default${randomNum}`,
            },
          ]; // 이미지 업로드 안되면 대체 이미지 추가

    addPost.mutate(data);
  };

  console.log(uploadImg.length);

  return (
    <>
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
          <ImageUpload
            onChange={(images) => {
              const formattedImages = images.map((image) => ({
                path: image,
                name: image.split('/').pop() || '',
              }));

              setUploadImg((prevState) => {
                const existingPath = prevState.map((img) => img.path);
                const newImg = formattedImages.filter(
                  (img) => !existingPath.includes(img.path),
                );
                return [...prevState, ...newImg];
              });
            }}
          />
          <TypeSelector
            productsType={productsType}
            setProductsType={setProductsType}
          />

          {/* 같이 사요 UI */}
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
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const input = e.currentTarget;
                      input.value = input.value
                        .replace(/,/g, '')
                        .replace(/[^0-9,]/g, '')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }}
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
                  <p className="font-semibold w-[60px]">상세 위치 </p>
                  <KakaoAddressSearch
                    subLocation={subLocation}
                    setSubLocation={(address) => setSubLocation(address)}
                  />
                </div>
                {errors.extra?.subLocation && (
                  <Error>{errors.extra.subLocation?.message}</Error>
                )}
              </div>

              <div className="info-quantity">
                <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
                  <p className="font-semibold">모집 인원</p>
                  <Counter
                    num={num}
                    setNum={setNum}
                    {...register('quantity')}
                  />
                </div>
              </div>

              <div className="info-time">
                <div className="flex flex-col gap-[22px] py-[7px] mb-[7px] ">
                  <p className="font-semibold">마감시간 </p>
                  <Picker
                    selectDate={selectDate}
                    setSelectDate={(date) => {
                      setSelectDate(date);
                      setValue(
                        'extra.meetingTime',
                        date ? dayjs(date).format('YYYY.MM.DD HH:mm') : '',
                      );

                      if (date) {
                        clearErrors('extra.meetingTime');
                      } else {
                        setError('extra.meetingTime', {
                          message: '* 날짜, 시간을 선택해주세요',
                        });
                      }
                    }}
                    {...register('extra.meetingTime', {
                      required: '* 날짜, 시간을 선택해주세요',
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

          {/* 팔아요 UI */}
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
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const input = e.currentTarget;
                      input.value = input.value
                        .replace(/,/g, '')
                        .replace(/[^0-9,]/g, '')
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                    }}
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
                  <p className="font-semibold">상세 위치 </p>
                  <KakaoAddressSearch
                    subLocation={subLocation}
                    setSubLocation={(address) => setSubLocation(address)}
                  />
                </div>
                {errors.extra?.subLocation && (
                  <Error>{errors.extra.subLocation?.message}</Error>
                )}
              </div>

              <div className="info-quantity">
                <div className="flex gap-[22px] items-center py-[7px] mb-[7px]">
                  <p className="font-semibold">판매 개수</p>
                  <Counter
                    num={num}
                    setNum={setNum}
                    {...register('quantity')}
                  />
                </div>
              </div>

              <div className="info-time">
                <div className="flex flex-col gap-[22px] py-[7px] mb-[7px] ">
                  <p className="font-semibold">거래 시간 </p>
                  <Picker
                    selectDate={selectDate}
                    setSelectDate={setSelectDate}
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
    </>
  );
};

export default Write;
