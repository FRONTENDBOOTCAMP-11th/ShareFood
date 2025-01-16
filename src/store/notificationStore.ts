import { create } from 'zustand';

type notificationProps = {
  notification: boolean;
  setNotification: (noti: boolean) => void;
};

export const notificationStore = create<notificationProps>((set) => ({
  notification: false,
  setNotification: (notification: boolean) => set({ notification }),
}));
