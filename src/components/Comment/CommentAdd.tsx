import { useForm } from 'react-hook-form';
import { axiosInstance } from '../../hooks/axiosInstance';
import { useMutation } from '@tanstack/react-query';

interface CommentAddProps {
  _id: number | undefined;
}

function CommentAdd({ _id }: CommentAddProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axios = axiosInstance;

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
          {...register('content', { required: '내용을 입력해주세요.' })}
        />
        <button
          type="submit"
          className="ml-3 float-right whitespace-nowrap text-main text-sm border py-1 px-3 rounded-[5px]"
        >
          등록
        </button>
      </form>
    </div>
  );
}

export default CommentAdd;
