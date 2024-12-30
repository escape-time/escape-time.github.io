import { useCallback, useState } from 'react';
import { useAuth } from './use-auth';
import { supabase } from '../utils/supabase';
import { DetailReviewType } from '../type';

export const useDetailReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [detailReviewList, setDetailReviewList] = useState<DetailReviewType[]>([]);
  const { user } = useAuth();

  const getDetailReviewList = useCallback(async () => {
    if (!user) return [];
    try {
      const { data } = await supabase.from('detail_reviews').select('*').eq('user_id', user?.id);
      setDetailReviewList(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  }, [user]);

  const addDetailReview = async (params: DetailReviewType) => {
    setIsLoading(true);
    try {
      // 리뷰 생성
      const { data } = await supabase
        .from('detail_reviews')
        .insert([
          {
            is_success: params.is_success,
            group_cnt: params.group_cnt,
            visit_date: params.visit_date,
            use_hint_cnt: params.use_hint_cnt,
            play_time_minutes: params.play_time_minutes,
            play_time_seconds: params.play_time_seconds,
            satisfies_cnt: params.satisfies_cnt,
            story_cnt: params.story_cnt,
            problem_cnt: params.problem_cnt,
            interior_cnt: params.interior_cnt,
            level: params.level,
            horror_cnt: params.horror_cnt,
            health_cnt: params.health_cnt,
            description: params.description,
            theme_id: params.theme_id,
            etc: params.etc,
            user_id: user?.id,
          },
        ])
        .select()
        .single();
      await getDetailReviewList();
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDetailReview = async (params: DetailReviewType) => {
    setIsLoading(true);
    try {
      // 리뷰 생성
      await supabase
        .from('detail_reviews')
        .update({
          is_success: params.is_success,
          group_cnt: params.group_cnt,
          visit_date: params.visit_date,
          use_hint_cnt: params.use_hint_cnt,
          play_time_minutes: params.play_time_minutes,
          play_time_seconds: params.play_time_seconds,
          satisfies_cnt: params.satisfies_cnt,
          story_cnt: params.story_cnt,
          problem_cnt: params.problem_cnt,
          interior_cnt: params.interior_cnt,
          level: params.level,
          horror_cnt: params.horror_cnt,
          health_cnt: params.health_cnt,
          description: params.description,
          theme_id: params.theme_id,
          etc: params.etc,
          user_id: user?.id,
        })
        .eq('id', params.id)
        .select()
        .single();
      await getDetailReviewList();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { detailReviewList, getDetailReviewList, addDetailReview, isLoading, updateDetailReview };
};
