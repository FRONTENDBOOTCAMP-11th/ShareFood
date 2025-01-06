import { create } from 'zustand';

type ListState = {
  list: string;
  setList: (list: string) => void;
};

// 메인 게시글 리스트 카테고리
export const useMainListStateStore = create<ListState>((set) => ({
  list: 'buy',
  setList: (list) => set({ list }),
}));

// 마이페이지 게시글 리스트 카테고리
export const useMyListStateStore = create<ListState>((set) => ({
  list: '작성글',
  setList: (list) => set({ list }),
}));
