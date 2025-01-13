import { create } from 'zustand';
import { Product } from '../types/productsTypes';

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

type FilterState = {
  soldout: boolean;
  setSoldout: (soldout: boolean | ((prev: boolean) => boolean)) => void;
  location: string;
  setLocation: (location: string) => void;
  type: string;
  setType: (type: string) => void;
  // items: string[]
  setInitial: (soldout: boolean, location: string, type: string) => void;
};

export const useFilterStateStore = create<FilterState>((set) => ({
  soldout: false,
  setSoldout: (value) =>
    set((state) => ({
      soldout:
        typeof value === 'function'
          ? (value as (prev: boolean) => boolean)(state.soldout)
          : value,
    })),
  location: '전체지역',
  setLocation: (location) => set({ location }),
  type: 'buy',
  setType: (type) => set({ type }),
  setInitial: (soldout, location, type) => set({ soldout, location, type }),
}));

export const useSearchFilterStateStore = create<FilterState>((set) => ({
  soldout: false,
  setSoldout: (value) =>
    set((state) => ({
      soldout:
        typeof value === 'function'
          ? (value as (prev: boolean) => boolean)(state.soldout)
          : value,
    })),
  location: '전체지역',
  setLocation: (location) => set({ location }),
  type: 'buy',
  setType: (type) => set({ type }),
  setInitial: (soldout, location, type) => set({ soldout, location, type }),
}));

interface ListStoreState {
  items: Product[];
  page: number;
  totalItems: number;
  setItems: (items: Product[]) => void;
  addItems: (newItems: Product[]) => void;
  setPage: (page: number) => void;
  setTotalItems: (total: number) => void;
  resetList: () => void;
}

export const useListStateStore = create<ListStoreState>((set) => ({
  items: [],
  page: 1,
  totalItems: 0,
  setItems: (items) => set({ items }),
  addItems: (newItems) =>
    set((state) => ({ items: [...state.items, ...newItems] })),
  setPage: (page) => set({ page }),
  setTotalItems: (total) => set({ totalItems: total }),
  resetList: () => set({ items: [], page: 1, totalItems: 0 }),
}));