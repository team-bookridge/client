import useAuthStore from '@/stores/authStore';
import useModalStore from '@/stores/modalStore';
import { setUserNickname } from '@/supabase';
import { useState } from 'react';

function SetNickNameModal() {
  const [input, setInput] = useState('');
  const { profile, setNickname } = useAuthStore();
  const { setModal } = useModalStore();

  const close = () => {
    setModal(null);
  };

  const confirm = async () => {
    if (!profile) {
      alert('사용자 정보가 없습니다. 다시 로그인 해주세요.');
      close();
      return;
    }

    if (!input.trim()) {
      alert('닉네임을 입력해 주세요.');
      return;
    }

    const isSuccess = await setUserNickname(profile.id, input.trim());

    if (isSuccess) {
      setNickname(input.trim());
      close();
      alert('닉네임 변경에 성공하였습니다.');
    } else {
      alert('닉네임 변경을 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-400 bg-opacity-70 z-50"
      onClick={close}
      aria-hidden="true">
      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-1/3 h-auto rounded-md shadow-md p-5">
        <div className="text-xl font-bold text-center mb-4">닉네임 변경</div>

        <hr className="border-t border-[#C0CFB2] mb-6" />

        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="새 닉네임을 입력하세요"
            className="w-[70%] px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button
            type="button"
            onClick={confirm}
            className="px-4 py-2 bg-[#C0CFB2] text-white rounded-md hover:bg-[#45624E]">
            변경
          </button>
        </div>
      </button>
    </div>
  );
}

export default SetNickNameModal;
