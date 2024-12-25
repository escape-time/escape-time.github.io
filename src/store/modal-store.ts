import { create } from 'zustand';
import dayjs, { Dayjs } from 'dayjs';

interface ModalState {
  isVisible: boolean;
  selectedTime: Dayjs; // 분 단위로 저장 (예: 14:30 -> 870)
  selectedDate: Dayjs;
  selectedId: string;
  // Actions
  setIsVisible: (isVisible: boolean) => void;
  setTime: (date: Dayjs) => void;
  setDate: (date: Dayjs) => void;
  setSelectedId: (id: string) => void;
  resetModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  // Initial state
  isVisible: false,
  selectedTime: dayjs(),
  selectedDate: dayjs(),
  selectedId: '',

  // Actions
  setIsVisible: (isVisible) => set({ isVisible }),

  setTime: (minutes) => set({ selectedTime: minutes }),

  setSelectedId: (selectedId) => set({ selectedId }),

  setDate: (date) => set({ selectedDate: date }),

  resetModal: () =>
    set({
      isVisible: false,
      selectedTime: dayjs(),
      selectedDate: dayjs(),
    }),
}));
