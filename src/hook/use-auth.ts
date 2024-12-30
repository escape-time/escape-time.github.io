import { supabase } from '../utils/supabase';

export const useAuth = () => {
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'kakao',
    });
    if (error) throw error;
  };

  const signOutKakao = async () => {
    localStorage.removeItem('sb-mrwmlolbchfvqrbfuxwd-auth-token');
    location.reload();
  };

  // 로그아웃
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      if (error) throw error;
      location.reload();
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    signInWithGoogle,
    signInWithKakao,
    signOut,
    signOutKakao,
  };
};
