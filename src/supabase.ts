import { TAuthProvider, TWishItem } from '@/types';
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

  localStorage.removeItem('userInfo');

  if (!error) window.location.href = '/';
};

export const setUserNickname = async (userId: string, newNickname: string) => {
  const { error } = await supabase
    .from('additionalprofiles')
    .update({ nickname: newNickname })
    .eq('id', userId);

  if (error) return false;

  return true;
};

export const deleteUserData = async (userId: string) => {
  const confirmed = window.confirm(
    '정말로 회원 탈퇴를 진행하시겠습니까?\n(탈퇴하면 회원님의 찜목록, 리뷰 목록이 전부 사라집니다!)'
  );
  if (!confirmed) return;

  const { error: deleteUserArror } =
    await supabase.auth.admin.deleteUser(userId);

  if (deleteUserArror) return;

  signOut();
};

export const addOrDeleteWishItem = async (
  userId: string,
  wishitem: TWishItem,
  wishList: TWishItem[]
) => {
  const isAdded =
    wishList.find((item) => item.contentId === wishitem.contentId) !==
    undefined;

  if (isAdded) {
    const { error: deleteError } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('content_id', wishitem.contentId);

    if (deleteError) {
      return '실패';
    }
    return '삭제성공';
  }
  const { error: insertError } = await supabase.from('wishlist').insert([
    {
      user_id: userId,
      content_id: wishitem.contentId,
      content_title: wishitem.contentTitle,
      content_author: wishitem.contentAuthor,
      content_img: wishitem.contentImg,
    },
  ]);

  if (insertError) {
    return '실패';
  }
  return '추가성공';
};

export const deleteSelectedWishItems = async (
  userId: string,
  contentIds: number[]
) => {
  if (contentIds.length === 0) {
    return false;
  }

  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .in('content_id', contentIds);

  if (error) {
    return false;
  }
  return true;
};
