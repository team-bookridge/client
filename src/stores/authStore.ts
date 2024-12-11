import { TProfile, TReview, TWishItem } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  expiresAt: number;
  profile: TProfile | null;
  wishList: TWishItem[];
  reviewList: TReview[];
  setExpiresAt: () => void;
  setUserInfo: (
    profile: TProfile | null,
    wishList: TWishItem[],
    reviewList: TReview[]
  ) => void;
  setNickname: (newNickname: string) => void;
  addWishItem: (wishItem: TWishItem) => void;
  removeWishItem: (contentId: string) => void;
  removeSelectWishItems: (contentIds: string[]) => void;
  authAddReview: (
    contentId: string,
    userNickname: string,
    review: string
  ) => void;
  authDeleteReview: (contentId: string) => void;
  authUpdateReview: (contentId: string, newReview: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      expiresAt: 0, // 로컬스토리지에 저장된 정보의 유효 기간
      profile: null, // 유저의 정보
      wishList: [], // 유저의 찜 목록
      reviewList: [], // 유저의 리뷰 목록

      setExpiresAt: () => {
        const min = 15;
        const SEC = 60;
        const MSEC = 1000;
        const expiresAt = Date.now() + min * SEC * MSEC;
        set(() => ({ expiresAt }));
      },

      setUserInfo: (profile, wishList, reviewList) => {
        set(() => ({ profile, wishList, reviewList }));
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
            ...state.wishList.filter((item) => item.contentId !== contentId),
          ],
        }));
      },
      removeSelectWishItems: (contentIds) => {
        const ids = contentIds;
        set((state) => ({
          wishList: [
            ...state.wishList.filter((item) => {
              const isExist = ids.includes(item.contentId);
              return !isExist;
            }),
          ],
        }));
      },

      authAddReview: (
        contentId: string,
        userNickname: string,
        reviewText: string
      ) => {
        const review: TReview = {
          contentId,
          userNickname,
          review: reviewText,
          updatedAt: String(Date.now()),
        };

        set((state) => ({
          reviewList: [review, ...state.reviewList],
        }));
      },

      authDeleteReview: (contentId) => {
        set((state) => ({
          reviewList: [
            ...state.reviewList.filter((item) => item.contentId !== contentId),
          ],
        }));
      },

      authUpdateReview: (contentId, newReview) => {
        set((state) => ({
          reviewList: [
            ...state.reviewList.map((item) => {
              if (item.contentId === contentId) {
                const updateReview: TReview = {
                  contentId: item.contentId,
                  userNickname: item.userNickname,
                  review: newReview,
                  updatedAt: item.updatedAt,
                };
                return updateReview;
              }
              return item;
            }),
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
