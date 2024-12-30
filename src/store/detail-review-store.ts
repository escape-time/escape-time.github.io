import { create } from 'zustand';
import { v4 } from 'uuid';
import dayjs from 'dayjs';
import { DetailReviewType } from '../type';

interface DetailReview {
  id: string;
  is_success: boolean | undefined;
  group_cnt: number;
  visit_date: dayjs.Dayjs;
  use_hint_cnt: number;
  play_time_minutes: number;
  play_time_seconds: number;
  satisfies_cnt: number;
  story_cnt: number;
  problem_cnt: number;
  interior_cnt: number;
  level: number;
  horror_cnt: number;
  health_cnt: number;
  description: string;
  theme_id: string;
  etc: string;
  isUpdate: boolean;
}

interface DetailReviewActions {
  setSuccess: (value: boolean) => void;
  setGroupCnt: (value: number) => void;
  setVisitDate: (date: dayjs.Dayjs) => void;
  setUseHintCnt: (value: number) => void;
  setPlayTime: (minutes: number, seconds: number) => void;
  setSatisfiesCnt: (value: number) => void;
  setStoryCnt: (value: number) => void;
  setProblemCnt: (value: number) => void;
  setInteriorCnt: (value: number) => void;
  setLevel: (value: number) => void;
  setHorrorCnt: (value: number) => void;
  setHealthCnt: (value: number) => void;
  setDescription: (value: string) => void;
  setThemeId: (value: string) => void;
  setEtc: (value: string) => void;
  resetDetailReview: () => void;
  setDetailReview: (review: DetailReviewType) => void;
  setIsUpdate: (u: boolean) => void;
}

type DetailReviewStore = DetailReview & DetailReviewActions;

const initialState: DetailReview = {
  id: v4(),
  is_success: undefined,
  group_cnt: 0,
  visit_date: dayjs(),
  use_hint_cnt: 0,
  play_time_minutes: 0,
  play_time_seconds: 0,
  satisfies_cnt: 0,
  story_cnt: 0,
  problem_cnt: 0,
  interior_cnt: 0,
  level: 0,
  horror_cnt: 0,
  health_cnt: 0,
  description: '',
  theme_id: '',
  etc: '',
  isUpdate: false,
};

export const detailReviewStore = create<DetailReviewStore>((set) => ({
  ...initialState,
  setSuccess: (value) => set({ is_success: value }),
  setGroupCnt: (value) => set({ group_cnt: value }),
  setVisitDate: (date) => set({ visit_date: date }),
  setUseHintCnt: (value) => set({ use_hint_cnt: value }),
  setPlayTime: (minutes, seconds) => set({ play_time_minutes: minutes, play_time_seconds: seconds }),
  setSatisfiesCnt: (value) => set({ satisfies_cnt: value }),
  setStoryCnt: (value) => set({ story_cnt: value }),
  setProblemCnt: (value) => set({ problem_cnt: value }),
  setInteriorCnt: (value) => set({ interior_cnt: value }),
  setLevel: (value) => set({ level: value }),
  setHorrorCnt: (value) => set({ horror_cnt: value }),
  setHealthCnt: (value) => set({ health_cnt: value }),
  setDescription: (value) => set({ description: value }),
  setThemeId: (value) => set({ theme_id: value }),
  setEtc: (value) => set({ etc: value }),
  resetDetailReview: () => set({ ...initialState, id: v4() }),
  setDetailReview: (review) => set({ ...review, visit_date: dayjs(review.visit_date), isUpdate: true }),
  setIsUpdate: (value) => set({ isUpdate: value }),
}));
