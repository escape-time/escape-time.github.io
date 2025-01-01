// stores/calendarStore.ts
import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import dayjs from 'dayjs';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  theme_id: string;
  user_id: string;
  is_always: boolean;
  created_at: string;
  color: string;
}

interface CalendarStore {
  events: CalendarEvent[];
  isLoading: boolean;
  error: Error | null;
  getEvents: (userId: string) => Promise<void>;
  addEvent: (event: Omit<CalendarEvent, 'id' | 'created_at'>) => Promise<void>;
  updateEvent: (event: Omit<CalendarEvent, 'created_at'>) => Promise<void>;
  setSelectDate: (d: string) => void;
  showVisible: () => void;
  hideVisible: () => void;
  selectDate: string;
  isModalVisible: boolean;
}

export const useCalendarStore = create<CalendarStore>((set) => ({
  events: [],
  isLoading: false,
  error: null,
  selectDate: dayjs().format('YYYY-MM-DD'),
  isModalVisible: false,

  showVisible: () => set({ isModalVisible: true }),
  hideVisible: () => set({ isModalVisible: false }),

  setSelectDate: (selectDate: string) => {
    set({ selectDate });
  },

  getEvents: async (userId: string) => {
    if (!userId) return;
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

  updateEvent: async (event) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.from('calendar_events').update(event).select().single();

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
