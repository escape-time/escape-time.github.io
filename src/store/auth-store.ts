import { create } from 'zustand';
import { supabase } from '../utils/supabase'; // Supabase 인스턴스 불러오기
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  setAuth: (session: Session | null) => void;
}

export const authStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,
  setAuth: (session) =>
    set({
      session,
      user: session?.user ?? null,
      loading: false,
    }),
}));

// Supabase 인증 상태 변화를 감지하고 상태 업데이트
supabase.auth.getSession().then(({ data: { session } }) => {
  console.log('getSession');
  authStore.getState().setAuth(session);
});

supabase.auth.onAuthStateChange((_event, session) => {
  console.log('onAuthStateChange');
  authStore.getState().setAuth(session);
});
