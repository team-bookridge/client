import useAuthStore from '@/stores/authStore';
import { supabase } from '@/supabase';
import { TProfile, TReview, TWishItem } from '@/types';
import { useEffect } from 'react';

function useLoginStateManagement() {
  const { expiresAt, setExpiresAt, setUserInfo } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    const checkSession = async () => {
      const now = Date.now();
      if (expiresAt < now) {
        const { data, error } = await supabase.auth.getSession();

        if (error) return;

        const session = data?.session;

        if (session) {
          const { data: additionalProfileData, error: additionalProfileError } =
            await supabase
              .from('additionalprofiles')
              .select('nickname')
              .eq('id', data.session.user.id)
              .single();

          if (additionalProfileError) return;

          const profiles: TProfile = {
            id: session.user.id,
            email: session.user.user_metadata.email,
            avatar_url: session.user.user_metadata.avatar_url,
            nickname: additionalProfileData.nickname,
          };

          const { data: wishListData, error: wishListDataError } =
            await supabase
              .from('wishlist')
              .select('content_id, content_title, content_author, content_img')
              .order('created_at', { ascending: false })
              .eq('user_id', data.session.user.id);

          if (wishListDataError && wishListDataError.code !== 'PGRST116') {
            return;
          }

          const wishlist: TWishItem[] | undefined = wishListData?.map(
            (item) => {
              const wishItem: TWishItem = {
                contentId: item.content_id,
                contentTitle: item.content_title,
                contentAuthor: item.content_author,
                contentImg: item.content_img,
              };
              return wishItem;
            }
          );

          const { data: reviewListData, error: reviewListError } =
            await supabase
              .from('reviewlist')
              .select('content_id, user_nickname, review, updated_at')
              .order('updated_at', { ascending: false })
              .eq('user_id', session.user.id);

          if (reviewListError && reviewListError.code !== 'PGRST116') {
            return;
          }

          const reviewList: TReview[] | undefined = reviewListData?.map(
            (item) => {
              const review: TReview = {
                contentId: item.content_id,
                userNickname: item.user_nickname,
                review: item.review,
                updatedAt: item.updated_at,
              };
              return review;
            }
          );

          setUserInfo(
            profiles,
            wishlist as TWishItem[],
            reviewList as TReview[]
          );
          setExpiresAt();
        }
      }
    };

    checkSession();
  }, []);
}

export default useLoginStateManagement;
