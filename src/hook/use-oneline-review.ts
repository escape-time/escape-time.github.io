import { useCallback, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useAuth } from './use-auth';
import { listStore } from '../store/list-store';

export const useOneLineReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setOneLineReviewList, oneLineReviewList } = listStore();
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
  }, [user, setOneLineReviewList]);

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
    themeId,
  }: {
    id: string;
    rating: number;
    text: string;
    themeId: string;
  }) => {
    setIsLoading(true);
    try {
      await supabase.from('online_reviews').insert({
        id,
        rating,
        text,
        theme_id: themeId,
        user_id: user?.id || '',
      });
      await getOneLineReviewList();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOneLineReview = async ({
    id,
    rating,
    text,
    themeId,
  }: {
    id: string;
    rating: number;
    text: string;
    themeId: string;
  }) => {
    setIsLoading(true);
    try {
      await supabase
        .from('online_reviews')
        .update({
          id,
          rating,
          text,
          theme_id: themeId,
          user_id: user?.id || '',
        })
        .eq('id', id);
      await getOneLineReviewList();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getOneLineReviewList,
    oneLineReviewList,
    getOneLineReview,
    addOneLineReview,
    isLoading,
    updateOneLineReview,
  };
};
