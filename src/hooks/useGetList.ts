import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';

interface ParamsType {
  showSoldOut: boolean;
  custom: string;
  keyword?: string;
}

export const useGetList = (
  showSoldOut: boolean,
  productsType: string,
  meetingLocation?: string,
  keyword?: string,
) => {
  return useQuery({
    queryKey: ['products', showSoldOut, productsType, meetingLocation, keyword],
    queryFn: () => {
      const baseParams: ParamsType = {
        showSoldOut,
        keyword: keyword ?? '',
        custom: JSON.stringify({
          'extra.type': productsType,
        }),
      };

      if (meetingLocation !== '전체지역') {
        baseParams.custom = JSON.stringify({
          ...JSON.parse(baseParams.custom),
          'extra.location': meetingLocation,
        });
      }

      return axiosInstance.get('/products', { params: baseParams });
    },
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });
};

export const useGetMyList = (showSoldOut: boolean) => {
  return useQuery({
    queryKey: ['products', showSoldOut],
    queryFn: () =>
      axiosInstance.get(`/seller/products`).then((res) => res.data),
    staleTime: 1000 * 10,
  });
};
