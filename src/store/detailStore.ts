import { create } from 'zustand';

interface interestStore {
  interest: number;
  increaseInterest: () => void;
  decreaseInterest: () => void;
  setInterest: (interest: number) => void;
}

export const interestStore = create<interestStore>((set) => ({
  interest: 0,
  increaseInterest: () => set((state) => ({ interest: state.interest + 1 })),
  decreaseInterest: () => set((state) => ({ interest: state.interest - 1 })),
  setInterest: (interest: number) => set({ interest }),
}));
