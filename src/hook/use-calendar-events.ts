import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { supabase } from '../utils/supabase';

export interface CalendarEvent {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  description: string;
  user_id?: string;
  created_at: string;
}

export interface CreateEventInput {
  title: string;
  start_time: dayjs.Dayjs;
  end_time: dayjs.Dayjs;
  description: string;
}

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 이벤트 조회
  const fetchEvents = async () => {
    console.log('fetchEvents');
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('calendar_events')
        .select('*')
        .order('start_time', { ascending: true });

      console.log(data);
      if (error) throw error;
      setEvents(data || []);
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      console.log('final');
      setLoading(false);
    }
  };

  // 이벤트 생성
  const createEvent = async (input: CreateEventInput) => {
    console.log('createEvent');
    try {
      setLoading(true);

      const { data: test } = await supabase.from('calendar_events').select('*');

      console.log(test);
      return;

      // 현재 로그인한 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log(user);

      const { data, error } = await supabase
        .from('calendar_events')
        .insert([
          {
            ...input,
            start_time: input.start_time.toISOString(),
            end_time: input.end_time.toISOString(),
            user_id: null, // 로그인하지 않은 경우 null
            theme_id: 'asdasd',
          },
        ])
        .select()
        .single();

      if (error) throw error;
      setEvents([...events, data]);
      return data;
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 이벤트 수정
  const updateEvent = async (id: string, input: Partial<CreateEventInput>) => {
    try {
      setLoading(true);
      const updates: any = { ...input };
      if (input.start_time) updates.start_time = input.start_time.toISOString();
      if (input.end_time) updates.end_time = input.end_time.toISOString();

      const { data, error } = await supabase.from('calendar_events').update(updates).eq('id', id).select().single();

      if (error) throw error;
      setEvents(events.map((event) => (event.id === id ? data : event)));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 이벤트 삭제
  const deleteEvent = async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.from('calendar_events').delete().eq('id', id);

      if (error) throw error;
      setEvents(events.filter((event) => event.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    fetchEvents,
  };
};
