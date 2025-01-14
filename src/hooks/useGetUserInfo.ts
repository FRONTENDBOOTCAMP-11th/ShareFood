import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from './useAxiosInstance';

export const useGetUserInfo = (axiosInstance: ReturnType<typeof useAxiosInstance>, userId: string | undefined) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () =>
      axiosInstance.get(`/users/${userId}`).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
