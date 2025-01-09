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
