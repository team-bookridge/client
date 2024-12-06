import { TAuthProvider } from '@/types';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const signInWithProvider = async (provider: TAuthProvider) => {
  await supabase.auth.signInWithOAuth({ provider });
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (!error) window.location.href = '/';
};

export const setUserNickname = async (userId: string, newNickname: string) => {
  const { error } = await supabase
    .from('profiles')
    .update({ nickname: newNickname })
    .eq('id', userId);

  if (!error) window.location.href = '/Mypage';
};

export const deleteUserData = async (userId: string) => {
  const confirmed = window.confirm(
    '정말로 회원 탈퇴를 진행하시겠습니까?\n(탈퇴하면 회원님의 찜목록, 리뷰 목록이 전부 사라집니다!)'
  );
  if (!confirmed) return;

  const { error: deleteUserArror } =
    await supabase.auth.admin.deleteUser(userId);

  if (deleteUserArror) return;

  const { error: signOutError } = await supabase.auth.signOut();

  if (signOutError) return;
  window.location.href = '/';
};
