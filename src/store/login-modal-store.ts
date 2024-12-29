import { create } from 'zustand';

interface LoginModalStore {
  isVisible: boolean;
  showVisible: () => void;
  hideVisible: () => void;
}

export const loginModalStore = create<LoginModalStore>((set) => ({
  isVisible: false,
  showVisible: () => {
    set({
      isVisible: true,
    });
  },
  hideVisible: () => {
    set({
      isVisible: false,
    });
  },
}));
