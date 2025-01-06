import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './axiosInstance';

interface ParamsType {
  showSoldOut: boolean;
  custom: string;
  keyword?: string;
}

// 게시물 목록
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
          ...(meetingLocation &&
            meetingLocation !== '전체지역' && {
              'extra.location': meetingLocation,
            }),
        }),
      };

      return axiosInstance.get('/products', { params: baseParams });
    },
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });
};

// 내가 작성한 글
export const useGetMyList = (showSoldOut: boolean) => {
  return useQuery({
    queryKey: ['myProducts', showSoldOut],
    queryFn: () =>
      axiosInstance.get(`/seller/products`).then((res) => res.data),
    staleTime: 1000 * 10,
  });
};

// 북마크 목록
export const useGetLikeList = (showSoldOut: boolean, id: string) => {
  return useQuery({
    queryKey: ['likeProducts', showSoldOut, id],
    queryFn: () =>
      axiosInstance.get(`/users/${id}/bookmarks`).then((res) => res.data),
    staleTime: 1000 * 10,
  });
};


// 거래신청글
export const useGetBuyList = (showSoldOut: boolean) => {
  return useQuery({
    queryKey: ['nuyProducts', showSoldOut],
    queryFn: () =>
      axiosInstance.get(`/orders`).then((res) => res.data),
    staleTime: 1000 * 10,
  });
}