import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/Modal';
import basicImage from '/images/chef/drawingChef.svg';
import moreImage from '/images/icons/more.svg';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';
import { useAuthStore } from '../../store/authStore';
import { useForm } from 'react-hook-form';

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

interface FormData {
  content: string;
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
  const axios = useAxiosInstance();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // 사용자 로그인 정보
  const { user } = useAuthStore();
  const loginInfo = user?._id;

  const [isEditor, setIsEditor] = useState(false);
  const [viewPayment, setViewPayment] = useState(false);
  const [isModify, setIsModify] = useState(false);

  // 로그인 상태 파악
  useEffect(() => {
    if (_id == loginInfo) setIsEditor(true);
  }, []);

  // 댓글 삭제 기능
  const delComment = useMutation({
    mutationFn: () => axios.delete(`replies/${attach_id}`),
    onSuccess: () => {
      toast.success('댓글이 삭제 되었습니다.');
      refetch();
    },
  });

  // 댓글 수정 기능
  const modifyComment = useMutation({
    mutationFn: (formData: FormData) => {
      const body = {
        content: formData.content,
      };
      return axios.patch(`replies/${attach_id}`, body);
    },
    onSuccess: () => {
      refetch();
      toast.success('댓글이 수정 되었습니다.');
      modifyEnd();
    },
  });

  // 외부영역 클릭 시 댓글 수정 종료 기능
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        modifyEnd();
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [modalRef]);

  const handleModal = () => {
    setViewPayment(true);
  };

  const modifyAttach = () => {
    setIsModify(true);
  };

  const modifyEnd = () => {
    setIsModify(false);
    setViewPayment(false);
  };

  const closeModal = () => {
    setViewPayment(false);
  };

  // 날짜 데이터 전처리
  const date = createdAt.slice(5, 10);

  let profileImage = '';
  if (image != null) {
    if (image.includes('kakao')) {
      profileImage = image;
    } else {
      profileImage = `https://11.fesp.shop${image}`;
    }
  } else profileImage = basicImage;

  if (isModify) {
    return (
      <div ref={modalRef}>
        <div className="flex leading-7">
          <img
            src={profileImage}
            alt="프로필 사진"
            className="max-w-[29px] max-h-[29px] rounded-full"
          />
          <p className="ml-2 font-semibold text-[14px]">{name}</p>
          <p className="ml-auto text-font2">{date}</p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit((data) => modifyComment.mutate(data))}
            className="flex"
          >
            <input
              type="text"
              className="text-[13px] ml-[30px] mt-[6px] grow border rounded-[5px] p-1 outline-none"
              defaultValue={content}
              autoFocus
              {...register('content', {
                required: '내용을 입력해 주세요.',
                maxLength: {
                  value: 50,
                  message: '50자까지 입력할 수 있습니다.',
                },
                minLength: {
                  value: 2,
                  message: '2글자 이상 입력해 주세요.',
                },
              })}
            />
            {/* <p className="text-[13px] ml-[37px] mt-[6px] grow">{content}</p> */}
            <button
              className="ml-3 mr-1 mt-[6px] float-right whitespace-nowrap text-main text-xs border py-1 px-3 rounded-[5px]"
              type="submit"
            >
              수정
            </button>
          </form>
          {errors.content && (
            <p className="text-sm text-error ml-[30px]">
              {errors.content.message}
            </p>
          )}
        </div>
      </div>
    );
  } else {
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
              <button
                className="text-error"
                onClick={() => delComment.mutate()}
              >
                삭제
              </button>
              <hr className="my-4" />
              <button onClick={() => modifyAttach()}>수정</button>
              <hr className="my-4" />
              <button onClick={() => closeModal()}>취소</button>
            </div>
            <br />
          </Modal>
        )}
      </div>
    );
  }
}

export default CommentItem;
