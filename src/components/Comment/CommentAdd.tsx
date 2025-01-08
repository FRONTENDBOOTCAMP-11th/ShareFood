import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../hooks/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface CommentAddProps {
  _id: string | undefined;
  onRefetch: (options?: {
    throwOnError?: boolean;
  }) => Promise<QueryObserverResult<MyData, MyError>>;
}

function CommentAdd({ _id, onRefetch }: CommentAddProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const axios = axiosInstance;
  const navigate = useNavigate();

  const addComment = useMutation({
    mutationFn: (formData) => {
      const body = {
        order_id: Number(_id),
        product_id: Number(_id),
        content: formData.content,
      };
      console.log(body);
      return axios.post('/replies', body);
    },
    onSuccess: () => {
      onRefetch();
      toast.success('댓글이 추가 되었습니다.');
      resetField('content');
    },
    onError: (err) => {
      if (err.response.status === 401) {
        alert('로그인 되지 않은 상태입니다. 로그인 페이지로 이동합니다.');
        navigate(`/login`);
      } else alert('잠시 후 다시 시도해주세요.');
    },
  });

  return (
    <div className="my-[18px]">
      <form onSubmit={handleSubmit(addComment.mutate)} className="flex">
        <input
          type="text"
          id="content"
          required
          placeholder="댓글을 입력하세요."
          className="border-b-2 w-full pl-1.5 py-1.5 text-sm outline-none"
          {...register('content', {
            maxLength: {
              value: 50,
              message: '50자까지 입력할 수 있습니다.',
            },
          })}
        />
        <button
          type="submit"
          className="ml-3 float-right whitespace-nowrap text-main text-sm border py-1 px-3 rounded-[5px]"
        >
          등록
        </button>
      </form>
      {errors.content && (
        <p className="text-sm text-error">{errors.content.message}</p>
      )}
    </div>
  );
}

export default CommentAdd;
