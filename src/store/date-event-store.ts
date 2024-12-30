// stores/calendarStore.ts
import { create } from 'zustand';
import { supabase } from '../utils/supabase';

interface CalendarEvent {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  theme_id: string;
  user_id: string;
  is_always: boolean;
  target_date: string;
  created_at: string;
}

interface CalendarStore {
  events: CalendarEvent[];
  isLoading: boolean;
  error: Error | null;
  getEvents: (userId: string) => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id' | 'created_at'>) => Promise<void>;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: [],
  isLoading: false,
  error: null,

  getEvents: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.from('calendar_events').select().eq('user_id', userId);

      if (error) throw error;

      set({ events: data, isLoading: false });
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },

  addEvent: async (event) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.from('calendar_events').insert(event).select().single();

      if (error) throw error;

      set((state) => ({
        events: [...state.events, data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: error as Error, isLoading: false });
    }
  },
}));
