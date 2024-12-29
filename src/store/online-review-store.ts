import { create } from 'zustand';
import { v4 } from 'uuid';

export const oneLineReviewStore = create<{
  id: string;
  rating: number;
  text: string;
  updateRating: (r: number) => void;
  updateText: (t: string) => void;
  resetReviews: () => void;
  setOneLineReview: (review: { id: string; rating: number; text: string }) => void;
}>((set) => ({
  id: v4(),
  rating: 0,
  text: '',

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

  resetReviews: () => {
    set({ text: '', rating: 0, id: v4() });
  },

  setOneLineReview: (review) => {
    set({ ...review });
  },
}));
