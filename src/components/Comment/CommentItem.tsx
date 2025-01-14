import { useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import basicImage from '/images/chef/drawingChef.svg';
import moreImage from '/images/icons/more.svg';
import { axiosInstance } from '../../hooks/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';

interface CommentItemProps {
  _id: number;
  attach_id: number;
  name: string;
  content: string;
  createdAt: string;
  image: string;
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<object, Error>>;
}

function CommentItem({
  _id,
  attach_id,
  name,
  content,
  createdAt,
  image,
  refetch,
}: CommentItemProps) {
  const axios = axiosInstance;

  // 사용자 로그인 정보
  const login = localStorage.getItem('user') || sessionStorage.getItem('user');

  const loginInfo = JSON.parse(login).state.user._id;

  const [isEditor, setIsEditor] = useState(false);
  const [viewPayment, setViewPayment] = useState(false);

  useEffect(() => {
    if (_id == loginInfo) setIsEditor(true);
  }, []);

  const delComment = useMutation({
    mutationFn: () => axios.delete(`replies/${attach_id}`),
    onSuccess: () => {
      toast.success('관심이 삭제 되었습니다.');
      refetch();
    },
  });

  const handleModal = () => {
    setViewPayment(true);
  };

  const closeModal = () => {
    setViewPayment(false);
  };

  // 날짜 데이터 전처리
  const date = createdAt.slice(5, 10);

  return (
    <div>
      <div className="flex leading-7">
        <img
          src={image ? `https://11.fesp.shop/${image}` : basicImage}
          alt="프로필 사진"
          className="max-w-[29px] max-h-[29px] rounded-full"
        />
        <p className="ml-2 font-semibold text-[14px]">{name}</p>
        <p className="ml-auto text-font2">{date}</p>
      </div>
      <div className="flex">
        <p className="text-[13px] ml-[37px] mt-[6px] grow">{content}</p>
        {isEditor && (
          <button className="mr-3 ml-3" onClick={() => handleModal()}>
            <img
              src={moreImage}
              alt="더 보기 이미지"
              className="min-w-[12px] min-h-[3px]"
            />
          </button>
        )}
      </div>
      {viewPayment && (
        <Modal setViewPayment={setViewPayment}>
          <br />
          <br />
          <div className="flex flex-col">
            <button className="text-error" onClick={() => delComment.mutate()}>
              삭제
            </button>
            <hr className="my-4" />
            <button onClick={() => closeModal()}>취소</button>
          </div>
          <br />
        </Modal>
      )}
    </div>
  );
}

export default CommentItem;
