import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../../hooks/axiosInstance';
import { AxiosError } from 'axios';
import { Slide, toast, ToastContainer } from 'react-toastify';

import dayjs, { Dayjs } from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Button from '../../components/Button';
import Header from '../../components/Layout/Header';
import ImageUpload from '../../components/ImageUpload';
import Select from '../../components/Select';
import close from '/images/icons/close.svg';
import TypeSelector from '../../components/TypeSelector';
import Error from '../../components/Error';
import Counter from '../../components/Counter';

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
  } = useForm<FormData>();

  const navigate = useNavigate();

  // counter 컴포넌트 기본값 : 1
  const [num, setNum] = useState(1);

  // TypeSelector : 기본값 'buy'
  const [productsType, setProductsType] = useState('buy');

  const [selectDate, setSelectDate] = useState<Dayjs | null>(null);

  const [uploadImg, setUploadImg] = useState<{ path: string; name: string }[]>(
    [],
  );

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
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        console.error('Error Response:', axiosError.response.data); // 서버에서 반환된 에러 메시지
      } else {
        console.error('Unexpected Error:', err); // 기타 에러
      }
    },
  });

  // onSubmit용 함수
  const onSubmit = (data: FormData) => {
    // 전체지역
    if (location === '전체지역') {
      setError('extra.location', {
        message: '* 지역을 선택해주세요',
      });
    }

    // 전송 값이 input이 아닌 경우 추가
    data.quantity = num;
    data.extra.location = location;
    data.extra.type = productsType;

    // 입력한 시간 값 가져옴
    const dateTime = dayjs(selectDate);

    // 입력값이 날짜+시간 인지 날짜 인지 검증
    if (dateTime.isValid()) {
      const hour = dateTime.hour();
      const minute = dateTime.minute();

      // 날짜만 있는 경우 시간 추가
      if (hour === 0 && minute === 0) {
        data.extra.meetingTime = dateTime
          .hour(23)
          .minute(59)
          .format('YYYY.MM.DD HH:mm');
      }
      // 날짜 + 시간의 경우 그대로 추가
      else {
        data.extra.meetingTime = dateTime.format('YYYY.MM.DD HH:mm');
      }
    }

    const randomNum = Math.floor(Math.random() * 4) + 1;
    console.log(randomNum);

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

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
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
              setUploadImg(formattedImages);
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
                  {/* <input
                    type="text"
                    className="outline-none text-xs grow"
                    placeholder="마감 시간을 입력해주세요."
                    {...register('extra.meetingTime', {
                      required: '* 마감시간은 필수입니다',
                      pattern: {
                        value: new RegExp('^[0-9\\-\\./:\\s]+$'),
                        message:
                          '* 정수와 특수문자 (-, /, ., :)만 입력 가능합니다',
                      },
                    })}
                  /> */}
                  <DateTimePicker
                    label={'마감 시간을 선택주세요'}
                    value={selectDate}
                    onChange={(value) => setSelectDate(value)}
                    format="YYYY.MM.DD HH:mm"
                    minDate={dayjs('2025.01.01')}
                    ampm={false}
                    slotProps={{
                      textField: {
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#4CAF50', // 포커스 시 테두리 색상
                              borderWidth: '2px',
                            },
                          },
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#BDBDBD', // 테두리 색상
                          },
                          '& .MuiSvgIcon-root': {
                            color: '#4CAF50', // 아이콘 색상
                          },
                          '& .MuiInputLabel-root': {
                            color: '#757575', // 기본 라벨 색상
                            '&.Mui-focused': {
                              color: '#4CAF50', // 포커스 시 라벨 색상
                            },
                          },
                        },
                      },
                      popper: {
                        sx: {
                          '& .Mui-selected': {
                            backgroundColor: '#4CAF50 !important', // 선택된 날짜 색상
                            color: '#fff',
                          },
                          '& .MuiPaper-root': {
                            display: 'flex',
                            width: 470, // 팝업(달력+시간 선택창) 너비
                            height: 400, // 팝업 높이
                          },
                          '& .MuiMultiSectionDigitalClockSection-root': {
                            width: 80,
                          },
                        },
                      },
                    }}
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
                  <Counter
                    num={num}
                    setNum={setNum}
                    {...register('quantity')}
                  />
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
                      pattern: {
                        value: new RegExp('^[0-9\\-\\./:\\s]+$'),
                        message:
                          '* 정수와 특수문자 (-, /, ., :)만 입력 가능합니다',
                      },
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
    </>
  );
};

export default Write;
