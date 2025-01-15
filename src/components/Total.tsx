import { useEffect, useState } from 'react';
import emptyHeart from '/images/icons/heart.svg';
import fullHeart from '/images/icons/full_heart.svg';
import { useMutation } from '@tanstack/react-query';
import useAxiosInstance from '../hooks/useAxiosInstance';
import { useNavigate } from 'react-router-dom';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { interestStore } from '../store/detailStore';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';

interface TotalProps {
  // interest: number;
  // setInterest: React.Dispatch<React.SetStateAction<number>>;
  data: Data;
  onRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<object, Error>>;
}

interface Data {
  item: Item;
}

interface Item {
  _id: string;
  bookmarks: number;
  replies: Array<string>;
  myBookmarkId: number;
}

interface CustomErr {
  response: Response;
}

interface Response {
  status: number;
}

// 매개변수로 관심 수 state, 관심 setter, 댓글 수 state 필요
// { interest, setInterest, data, onRefetch }
function Total({ data, onRefetch }: TotalProps) {
  // 버튼 클릭 시 이미지 버튼을 위한 state
  const [imageSrc, setImageSrc] = useState(emptyHeart);
  const [isClicked, setIsClicked] = useState(false);
  const { interest, increaseInterest, decreaseInterest, setInterest } =
    interestStore();

  const navigate = useNavigate();

  // api 접근
  const axiosInstance = useAxiosInstance();

  // 관심 추가
  const addInterest = useMutation({
    mutationFn: async () => {
      const body = {
        target_id: data.item._id,
      };
      return await axiosInstance.post('/bookmarks/product', body);
    },
    onSuccess: () => {
      onRefetch();
      toast.success('관심이 추가 되었습니다.');
      // setInterest((n) => n + 1);
      increaseInterest();
      setIsClicked(true);
      setImageSrc(fullHeart);
    },
    onError: (err: CustomErr) => {
      if (err.response.status === 401) {
        alert('로그인 되지 않은 상태입니다. 로그인 페이지로 이동합니다.');
        navigate(`/login`);
      } else alert('잠시 후 다시 시도해주세요.');
    },
  });

  // 관심 삭제
  const deleteInterest = useMutation({
    mutationFn: () => {
      // console.log('삭제할 관심 번호 : ', data.item.myBookmarkId);
      return axiosInstance.delete(`/bookmarks/${data.item.myBookmarkId}`);
    },
    onSuccess: () => {
      onRefetch();
      toast.success('관심이 삭제 되었습니다.');
      setImageSrc(emptyHeart);
      setIsClicked(false);
      decreaseInterest();
      // setInterest((n) => n - 1);
    },
    onError: (err: CustomErr) => {
      if (err.response.status === 401) {
        alert('로그인 되지 않은 상태입니다. 로그인 페이지로 이동합니다.');
        navigate(`/login`);
      } else alert('잠시 후 다시 시도해주세요.');
    },
  });

  // 최초 상태 설정 및 관심 상태 확인
  useEffect(() => {
    if (data.item?.myBookmarkId) {
      setImageSrc(fullHeart);
      setIsClicked(true);
    }
    setInterest(data.item.bookmarks);
  }, [data]);

  const handleClick = () => {
    if (isClicked) {
      deleteInterest.mutate();
    } else {
      addInterest.mutate();
    }
  };

  // console.log(data);

  return (
    <div className="border-b border-main pb-3 flex gap-2 text-[13px]">
      <button onClick={handleClick}>
        <img src={imageSrc} alt="" className="w-[16px]" />
      </button>
      <p className="ml-1.5 text-font2">
        관심 <span className="text-main">{interest}</span>
      </p>
      <p className="ml-3 text-font2">
        댓글 <span className="text-main">{data.item.replies.length}</span>
      </p>
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
}

export default Total;
