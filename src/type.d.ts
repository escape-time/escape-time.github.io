import dayjs, { Dayjs } from 'dayjs';

export type ITEM_TYPE = {
  id: string;
  title: string;
  location: string;
  area: string;
  address: string;
  description: string;
  playtime: number;
  isHorror: boolean;
  page: string;
  price: number;
  reservePageUrl: string;
  branchName: string;
  branchTel: string;
};

export interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  description: string;
  user_id: string;
  created_at: string;
}

export interface CreateEventInput {
  title: string;
  start_time: Dayjs;
  end_time: Dayjs;
  description: string;
}

export interface UpdateEventInput {
  title?: string;
  start_time?: Dayjs;
  end_time?: Dayjs;
  description?: string;
}

export interface OneLineReviewType {
  id: string;
  rating: number;
  text: string;
  theme_id: string;
}

export interface DetailReviewType {
  is_success?: boolean;
  group_cnt: number;
  visit_date: dayjs;
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
  etc?: string;
  id?: string;
}

export interface CommentType {
  id: string;
  rating: number;
  comment_text: string;
  nickname: string;
  review_id: string;
  created_at: string;
}
