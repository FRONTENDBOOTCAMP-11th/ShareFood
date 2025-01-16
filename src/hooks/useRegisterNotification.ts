import { useMutation } from '@tanstack/react-query';
import useAxiosInstance from './useAxiosInstance';

// 알림등록
export const useRegisterNotification = () => {
  const axiosInstance = useAxiosInstance();
  return useMutation({
    mutationFn: async ({
      target_id,
      content,
      extra,
    }: {
      target_id: number;
      content: string;
      extra: { productId: number };
    }) => {
      const response = await axiosInstance.post('/notifications', {
        target_id,
        content,
        extra,
      });
      return response.data;
    },
    onSuccess: () => {},
    onError: () => {},
  });
};
