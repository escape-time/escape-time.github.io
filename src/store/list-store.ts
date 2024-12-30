import { create } from 'zustand'; // Use this import statement
import { DetailReviewType, OneLineReviewType } from '../type';

interface ListStore {
  detailReviewList: DetailReviewType[];
  setDetailReviewList: (detailList: DetailReviewType[]) => void;
  oneLineReviewList: OneLineReviewType[];
  setOneLineReviewList: (oneLineList: OneLineReviewType[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const listStore = create<ListStore>((set) => ({
  detailReviewList: [],
  setDetailReviewList: (detailReviewList) => set({ detailReviewList }),
  oneLineReviewList: [],
  setOneLineReviewList: (oneLineReviewList) => set({ oneLineReviewList }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
