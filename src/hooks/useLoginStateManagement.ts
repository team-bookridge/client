import useAuthStore from '@/stores/authStore';
import { supabase } from '@/supabase';
import { TProfile, TWishItem } from '@/types';
import { useEffect } from 'react';

function useLoginStateManagement() {
  const { expiresAt, setExpiresAt, setUserInfo } = useAuthStore(
    (state) => state
  );

  useEffect(() => {
    const checkSession = async () => {
      const now = Date.now();
      // 유효기간이 지났다면 세션을 다시 받음
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

          if (additionalProfileData) {
            const profiles: TProfile = {
              id: session.user.id,
              email: session.user.user_metadata.email,
              avatar_url: session.user.user_metadata.avatar_url,
              ...additionalProfileData,
            };

            const { data: wishListData, error: wishListDataError } =
              await supabase
                .from('wishlist')
                .select(
                  'content_id, content_title, content_author, content_img'
                )
                .order('created_at', { ascending: false })
                .eq('user_id', data.session.user.id);

            if (wishListDataError && wishListDataError.code !== 'PGRST116') {
              return;
            }

            if (wishListData) {
              const wishlist: TWishItem[] = wishListData.map((item) => {
                const wishItem: TWishItem = {
                  contentId: item.content_id,
                  contentTitle: item.content_title,
                  contentAuthor: item.content_author,
                  contentImg: item.content_img,
                };
                return wishItem;
              });
              setUserInfo(profiles, wishlist);
              setExpiresAt();
            }
          }
        }
      }
    };

    checkSession();
  }, []);
}

export default useLoginStateManagement;
