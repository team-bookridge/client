import { TProfile } from '@/types';
import { create } from 'zustand';

interface AuthState {
  profile: TProfile | null;
  login: (profile: TProfile | null) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  profile: null,
  login: (profile: TProfile | null) => {
    set(() => ({ profile }));
  },
  logout: () => {
    set({ profile: null });
  },
}));

export default useAuthStore;
