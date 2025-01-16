import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from './useAxiosInstance';

export const useGetNotification = () => {
  const axiosInstance = useAxiosInstance();

  return useQuery({
    queryKey: ['notification'],
    queryFn: async() => {
      const response = await axiosInstance.get('/notifications');
      return response.data;
    },
    select: (data) => data,
    staleTime: 1000 * 10,
  });
};
