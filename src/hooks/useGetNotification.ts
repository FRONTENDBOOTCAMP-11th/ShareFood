import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from './useAxiosInstance';

interface NotificationItem {
  _id: number;
  target_id: number;
  content: string;
  extra: {
    lecture_id: number;
    productId: number;
  };
  user: {
    email: string;
    image: string;
    name: string;
    _id: number;
  };
  isRead: boolean;
  channel: string;
  createdAt: string;
  updatedAt: string;
}


export const useGetNotification = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery<NotificationItem[]>({
    queryKey: ['notification'],
    queryFn: async() => {
      const response = await axiosInstance.get('/notifications');
      return response.data.item;
    },
    select: (data) => data,
    staleTime: 1000 * 10,
  });
};
