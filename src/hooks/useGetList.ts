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
  keyword?: string
) => {
  return useQuery({
    queryKey: ['products', showSoldOut, productsType, meetingLocation,keyword],
    queryFn: () => {
      const baseParams: ParamsType = {
        showSoldOut,
        custom: JSON.stringify({
          'extra.type': productsType,
          ...(meetingLocation && meetingLocation !== '전체지역' && {
            'extra.location': meetingLocation,
          }),
        }),
        keyword: keyword,
      };

      return axiosInstance.get('/products', { params: baseParams });
    },
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });
};
