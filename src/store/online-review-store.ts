import { create } from 'zustand';
import { v4 } from 'uuid';
import { OneLineReviewType } from '../type';
import { authStore } from './auth-store';
import { supabase } from '../utils/supabase';

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
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  oneLineReviewList: OneLineReviewType[];
  getOneLineReviewList: () => Promise<void>;
  updateOneLineReview: ({ id, rating, text, theme_id }: OneLineReviewType) => Promise<void>;
  addOneLineReview: ({ id, rating, text, theme_id }: OneLineReviewType) => Promise<void>;
}>((set, get) => ({
  id: v4(),
  rating: 0,
  text: '',
  isUpdate: false,
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  oneLineReviewList: [],

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

  getOneLineReviewList: async () => {
    const user = authStore.getState().user;
    if (!user) return;
    get().setIsLoading(true);
    try {
      const { data } = await supabase.from('online_reviews').select('*').eq('user_id', user?.id);
      set({ oneLineReviewList: data || [] });
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    } finally {
      get().setIsLoading(false);
    }
  },

  addOneLineReview: async ({ id, rating, text, theme_id }: OneLineReviewType) => {
    const user = authStore.getState().user;
    get().setIsLoading(true);
    try {
      await supabase.from('online_reviews').insert({
        id,
        rating,
        text,
        theme_id,
        user_id: user?.id || '',
      });
      await get().getOneLineReviewList();
    } catch (error) {
      console.log(error);
    } finally {
      get().setIsLoading(false);
    }
  },

  updateOneLineReview: async ({ id, rating, text, theme_id }: OneLineReviewType) => {
    const user = authStore.getState().user;
    get().setIsLoading(true);
    try {
      await supabase
        .from('online_reviews')
        .update({
          id,
          rating,
          text,
          theme_id,
          user_id: user?.id || '',
        })
        .eq('id', id);
      await get().getOneLineReviewList();
    } catch (error) {
      console.log(error);
    } finally {
      get().setIsLoading(false);
    }
  },
}));
