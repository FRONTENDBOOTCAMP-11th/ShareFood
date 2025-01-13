import { create } from 'zustand';

interface interestStore {
  interest: number;
  increaseInterest: () => void;
  decreaseInterest: () => void;
  setInterest: (interest: number) => void;
}

interface viewPaymentStore {
  viewPayment: boolean;
  setViewPayment: (viewPayment: boolean) => void;
}

interface setIsBuyStore {
  isBuy: boolean;
  setIsBuy: (isBuy: boolean) => void;
}

interface isEditorStore {
  isEditor: boolean;
  setIsEditor: (isEditor: boolean) => void;
}

interface contentStore {
  content: string;
  setContent: (content: string) => void;
}

export const interestStore = create<interestStore>((set) => ({
  interest: 0,
  increaseInterest: () => set((state) => ({ interest: state.interest + 1 })),
  decreaseInterest: () => set((state) => ({ interest: state.interest - 1 })),
  setInterest: (interest: number) => set({ interest }),
}));

export const viewPaymentStore = create<viewPaymentStore>((set) => ({
  viewPayment: false,
  setViewPayment: (viewPayment: boolean) => set({ viewPayment }),
}));

export const isBuyStore = create<setIsBuyStore>((set) => ({
  isBuy: false,
  setIsBuy: (isBuy: boolean) => set({ isBuy }),
}));

export const isEditorStore = create<isEditorStore>((set) => ({
  isEditor: false,
  setIsEditor: (isEditor: boolean) => set({ isEditor }),
}));

export const contentStore = create<contentStore>((set) => ({
  content: '',
  setContent: (content: string) => set({ content }),
}));
