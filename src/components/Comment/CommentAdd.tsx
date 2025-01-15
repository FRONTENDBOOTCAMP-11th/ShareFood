import { useForm } from 'react-hook-form';
import useAxiosInstance from '../../hooks/useAxiosInstance';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from '@tanstack/react-query';

interface CommentAddProps {
  _id: string | undefined;
  onRefetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>,
  ) => Promise<QueryObserverResult<object, Error>>;
  // object가 안 된다면 any로..
}

interface FormData {
  content: string;
}

interface CustomErr {
  response: Response;
}

interface Response {
  status: number;
}

function CommentAdd({ _id, onRefetch }: CommentAddProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>();

  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const addComment = useMutation({
    mutationFn: (formData: FormData) => {
      const body = {
        order_id: Number(_id),
        product_id: Number(_id),
        content: formData.content,
      };
      console.log(body);
      return axiosInstance.post('/replies', body);
    },
    onSuccess: () => {
      onRefetch();
      toast.success('댓글이 등록 되었습니다.');
      resetField('content');
    },
    onError: (err: CustomErr) => {
      if (err.response.status === 401) {
        alert('로그인 되지 않은 상태입니다. 로그인 페이지로 이동합니다.');
        navigate(`/login`);
      } else alert('잠시 후 다시 시도해주세요.');
    },
  });

  return (
    <div className="mt-[18px] mb-[35px]">
      <form
        onSubmit={handleSubmit((data) => addComment.mutate(data))}
        className="flex"
      >
        <input
          type="text"
          id="content"
          required
          placeholder="댓글을 입력하세요."
          className="border-b-2 w-full pl-1.5 py-1.5 text-sm outline-none"
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
