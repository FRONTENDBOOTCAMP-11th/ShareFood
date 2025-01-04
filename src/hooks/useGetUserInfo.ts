import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: () => axiosInstance.get(`/seller/products`).then((res) => res.data),
    staleTime: 1000 * 60 * 5,
  });
};
