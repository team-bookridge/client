import { TAuthProvider, TWishItem } from '@/types';
import { createClient } from '@supabase/supabase-js';
import Swal from 'sweetalert2';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const signInWithProvider = async (provider: TAuthProvider) => {
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.href,
    },
  });
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
  const { isConfirmed } = await Swal.fire({
    icon: 'warning',
    title: '회원탈퇴',
    text: '회원님의 정보가 전부 삭제됩니다',
    showDenyButton: true,
    confirmButtonText: '탈퇴하기',
    denyButtonText: `취소`,
  });
  if (!isConfirmed) return;

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

export const addReview = async (
  userId: string,
  userNickname: string,
  contentId: string,
  review: string
) => {
  const { error } = await supabase.from('reviewlist').insert([
    {
      user_id: userId,
      user_nickname: userNickname,
      content_id: contentId,
      review,
    },
  ]);
  if (error) return false;
  return true;
};

export const updateReview = async (
  userId: string,
  contentId: string,
  review: string
) => {
  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    text: '리뷰를 수정하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '수정하기',
    denyButtonText: `취소`,
  });
  if (!isConfirmed) return false;
  const { error } = await supabase
    .from('reviewlist')
    .update([
      {
        review,
        updated_at: new Date(),
      },
    ])
    .eq('user_id', userId)
    .eq('content_id', contentId);

  if (error) return false;
  return true;
};

export const deleteReview = async (userId: string, contentId: string) => {
  const { isConfirmed } = await Swal.fire({
    icon: 'question',
    text: '리뷰를 삭제하시겠습니까?',
    showDenyButton: true,
    confirmButtonText: '삭제하기',
    denyButtonText: `취소`,
  });
  if (!isConfirmed) return false;

  const { error } = await supabase
    .from('reviewlist')
    .delete()
    .eq('user_id', userId)
    .eq('content_id', contentId);

  if (error) return false;
  return true;
};

export const getReviewsByContent = async (contentId: string) => {
  const { data, error } = await supabase
    .from('reviewlist')
    .select('content_id, user_nickname, review, updated_at')
    .order('updated_at', { ascending: false })
    .eq('content_id', contentId);

  if (error) {
    return [];
  }

  return data;
};
