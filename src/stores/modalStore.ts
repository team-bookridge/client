import { TModal } from '@/types';
import { create } from 'zustand';

interface ModalState {
  modal: TModal | null;
  setModal: (modal: TModal | null) => void;
}

const useModalStore = create<ModalState>((set) => ({
  modal: null,
  setModal: (modal: TModal) => set(() => ({ modal })),
}));

export default useModalStore;
