import { useCallback, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './use-auth';
import { OneLineReviewType } from '../type';

export const useOneLineReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [oneLineReviewList, setOneLineReviewList] = useState<OneLineReviewType[]>([]);
  const { user } = useAuth();

  const getOneLineReviewList = useCallback(async () => {
    if (!user) return [];
    setIsLoading(true);
    try {
      const { data } = await supabase.from('online_reviews').select('*').eq('user_id', user?.id);
      setOneLineReviewList(data || []);
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const getOneLineReview = async (themeId: string) => {
    try {
      const { data } = await supabase
        .from('online_reviews')
        .select('*')
        .eq('user_id', user?.id)
        .eq('theme_id', themeId);
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  };

  const addOneLineReview = async ({
    id,
    rating,
    text,
    resetReviews,
    themeId,
  }: {
    id: string;
    rating: number;
    text: string;
    resetReviews: () => void;
    themeId: string;
  }) => {
    setIsLoading(true);
    try {
      const result = await supabase.from('online_reviews').insert({
        id,
        rating,
        text,
        theme_id: themeId,
        user_id: user?.id || '',
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      resetReviews();
      setIsLoading(false);
    }
  };

  return {
    getOneLineReviewList,
    oneLineReviewList,
    getOneLineReview,
    addOneLineReview,
    isLoading,
  };
};
