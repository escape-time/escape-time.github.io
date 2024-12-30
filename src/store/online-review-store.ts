import { create } from 'zustand';
import { v4 } from 'uuid';

export const oneLineReviewStore = create<{
  id: string;
  rating: number;
  text: string;
  isUpdate: boolean;
  updateRating: (r: number) => void;
  updateText: (t: string) => void;
  resetOneLineReviews: () => void;
  setOneLineReview: (review: { id: string; rating: number; text: string }) => void;
  setUpdate: (isUpdate: boolean) => void;
}>((set) => ({
  id: v4(),
  rating: 0,
  text: '',
  isUpdate: false,

  updateRating: (rating: number) => {
    set({
      rating,
    });
  },

  updateText: (text: string) => {
    set({
      text,
    });
  },

  resetOneLineReviews: () => {
    set({ text: '', rating: 0, id: v4() });
  },

  setOneLineReview: (review) => {
    set({ ...review, isUpdate: true });
  },

  setUpdate: (isUpdate: boolean) => {
    set({
      isUpdate,
    });
  },
}));
