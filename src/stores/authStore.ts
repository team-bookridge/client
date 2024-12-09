import { TProfile, TWishItem } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  expiresAt: number;
  profile: TProfile | null;
  wishList: TWishItem[];
  // riviewList: null;
  setExpiresAt: () => void;
  setUserInfo: (profile: TProfile | null, wishList: TWishItem[]) => void;
  setNickname: (newNickname: string) => void;
  addWishItem: (wishItem: TWishItem) => void;
  removeWishItem: (contentId: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      expiresAt: 0, // 로컬스토리지에 저장된 정보의 유효 기간
      profile: null, // 유저의 정보
      wishList: [], // 유저의 찜 목록
      // riviewList: null, // 유저의 리뷰 목록

      setExpiresAt: () => {
        const min = 15;
        const SEC = 60;
        const MSEC = 1000;
        const expiresAt = Date.now() + min * SEC * MSEC;
        set(() => ({ expiresAt }));
      },

      setUserInfo: (profile, wishList) => {
        set(() => ({ profile, wishList }));
      },

      setNickname: (newNickname) => {
        set((state) => {
          if (state.profile) {
            return {
              profile: {
                ...state.profile,
                nickname: newNickname,
              },
            };
          }
          return state;
        });
      },
      addWishItem: (wishItem) => {
        set((state) => ({
          wishList: [wishItem, ...state.wishList],
        }));
      },
      removeWishItem: (contentId) => {
        set((state) => ({
          wishList: [
            ...state.wishList.filter((Item) => Item.contentId !== contentId),
          ],
        }));
      },
    }),

    {
      name: 'userInfo',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
