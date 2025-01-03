import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';

export const useGetUserInfo = (userId:number) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => axiosInstance.get(`/users/${userId}`).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
